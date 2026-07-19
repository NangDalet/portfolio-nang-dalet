import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export const dynamic = "force-dynamic"

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(5).max(200),
  message: z.string().trim().min(10).max(5000),
})

function getTelegramConfig() {
  const botToken = "8658047435:AAGow6G3kOOoEmvfT_1NKEt35f4F5JG79Sc"
  const chatId = 5009934788

  return {
    botToken,
    chatId,
    configured: Boolean(botToken && chatId),
  }
}

function fallbackResponse() {
  return {
    email: "nangdalet@gmail.com",
    telegram: "@nangdalet",
  }
}

export async function GET() {
  const { configured } = getTelegramConfig()

  return NextResponse.json(
    {
      status: configured ? "ok" : "unavailable",
      service: "contact-form",
      configured,
    },
    {
      status: configured ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  )
}

export async function POST(request: NextRequest) {
  const { botToken, chatId, configured } = getTelegramConfig()

  if (!configured || !botToken || !chatId) {
    console.error("Telegram contact service is not configured")
    return NextResponse.json(
      {
        error: "Server configuration error",
        code: "MISSING_CONFIG",
        message: "The contact form is temporarily unavailable.",
        fallback: fallbackResponse(),
      },
      { status: 503 },
    )
  }

  let requestBody: unknown

  try {
    requestBody = await request.json()
  } catch {
    return NextResponse.json(
      {
        error: "Invalid request body",
        code: "VALIDATION_ERROR",
        details: ["Please submit the form again."],
      },
      { status: 400 },
    )
  }

  const parsed = contactSchema.safeParse(requestBody)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        code: "VALIDATION_ERROR",
        details: parsed.error.issues.map((issue) => issue.message),
      },
      { status: 400 },
    )
  }

  const { name, email, subject, message } = parsed.data
  const telegramMessage = [
    "New Contact Form Message",
    "",
    `From: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
    "",
    `Received: ${new Date().toISOString()}`,
    "",
    "Sent from Portfolio Website",
  ].join("\n")

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    })

    const result = (await response.json()) as {
      ok?: boolean
      description?: string
      result?: { message_id?: number }
    }

    if (!response.ok || !result.ok) {
      console.error("Telegram API rejected a contact message", {
        status: response.status,
        description: result.description,
      })
      return NextResponse.json(
        {
          error: "Failed to send message",
          code: "TELEGRAM_API_ERROR",
          details: "Please try again or use an alternative contact method.",
          fallback: fallbackResponse(),
        },
        { status: 502 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      messageId: result.result?.message_id,
    })
  } catch (error) {
    console.error("Telegram contact request failed", error)
    return NextResponse.json(
      {
        error: "Contact service unavailable",
        code: "UPSTREAM_UNAVAILABLE",
        details: "Please try again or use an alternative contact method.",
        fallback: fallbackResponse(),
      },
      { status: 502 },
    )
  }
}
