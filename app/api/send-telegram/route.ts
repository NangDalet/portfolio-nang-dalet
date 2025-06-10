import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  console.log("=== GET /api/send-telegram - Testing Configuration ===")

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

  console.log("Environment check:")
  console.log("- Bot token exists:", !!TELEGRAM_BOT_TOKEN)
  console.log("- Chat ID exists:", !!TELEGRAM_CHAT_ID)
  console.log("- Bot token preview:", TELEGRAM_BOT_TOKEN ? `${TELEGRAM_BOT_TOKEN.substring(0, 10)}...` : "not set")
  console.log("- Chat ID value:", TELEGRAM_CHAT_ID || "not set")

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return NextResponse.json(
      {
        error: "Missing environment variables",
        details: {
          botToken: !!TELEGRAM_BOT_TOKEN,
          chatId: !!TELEGRAM_CHAT_ID,
        },
        instructions: [
          "1. Check if .env.local exists in project root",
          "2. Verify TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are set",
          "3. Restart your development server",
          "4. Make sure there are no quotes around the values",
        ],
      },
      { status: 500 },
    )
  }

  try {
    // Test bot token
    console.log("Testing bot token...")
    const botResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`)
    const botData = await botResponse.json()

    if (!botData.ok) {
      console.error("Bot token test failed:", botData)
      return NextResponse.json(
        {
          error: "Invalid bot token",
          details: botData.description,
          instructions: [
            "1. Verify your bot token is correct",
            "2. Make sure the bot is active",
            "3. Check for any typos in the token",
          ],
        },
        { status: 400 },
      )
    }

    console.log("✅ Bot token valid:", botData.result)

    // Test sending message
    console.log("Testing message send...")
    const testMessage = `🧪 *Test Message*

This is a test from your portfolio website!

✅ Bot token: Valid
✅ Chat ID: ${TELEGRAM_CHAT_ID}
✅ API connection: Working

*Timestamp:* ${new Date().toISOString()}

If you see this message, your Telegram integration is working perfectly! 🎉`

    const messageResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: testMessage,
        parse_mode: "Markdown",
      }),
    })

    const messageData = await messageResponse.json()

    if (!messageData.ok) {
      console.error("Message send failed:", messageData)

      let instructions = ["1. Check your chat ID is correct"]

      if (messageData.error_code === 400) {
        instructions = [
          "1. Start a conversation with your bot in Telegram",
          "2. Send at least one message to the bot",
          "3. Verify the chat ID is correct",
          "4. Make sure the bot has permission to send messages",
        ]
      }

      return NextResponse.json(
        {
          error: "Failed to send test message",
          details: messageData.description,
          errorCode: messageData.error_code,
          instructions,
        },
        { status: 400 },
      )
    }

    console.log("✅ Test message sent successfully!")

    return NextResponse.json({
      success: true,
      message: "Telegram integration is working perfectly!",
      botInfo: botData.result,
      testMessage: {
        messageId: messageData.result.message_id,
        chatId: messageData.result.chat.id,
        date: new Date(messageData.result.date * 1000).toISOString(),
      },
    })
  } catch (error) {
    console.error("Network error:", error)
    return NextResponse.json(
      {
        error: "Network error",
        details: error instanceof Error ? error.message : "Unknown error",
        instructions: [
          "1. Check your internet connection",
          "2. Verify Telegram API is accessible",
          "3. Try again in a few moments",
        ],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  console.log("=== POST /api/send-telegram - Processing Contact Form ===")

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Missing environment variables")
    return NextResponse.json({ error: "Server configuration error", code: "MISSING_CONFIG" }, { status: 500 })
  }

  try {
    const formData = await request.json()
    const { name, email, subject, message } = formData

    // Validation
    const errors = []
    if (!name?.trim()) errors.push("Name is required")
    if (!email?.trim() || !email.includes("@")) errors.push("Valid email is required")
    if (!subject?.trim()) errors.push("Subject is required")
    if (!message?.trim()) errors.push("Message is required")

    if (errors.length > 0) {
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 })
    }

    // Create message
    const telegramMessage = `🔔 *New Contact Form Message*

*From:* ${name.trim()}
*Email:* ${email.trim()}
*Subject:* ${subject.trim()}

*Message:*
${message.trim()}

*Received:* ${new Date().toLocaleString()}

---
Sent from Portfolio Website`

    console.log("Sending contact form message to Telegram...")

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    })

    const result = await response.json()

    if (!result.ok) {
      console.error("Telegram API error:", result)
      return NextResponse.json({ error: "Failed to send message", details: result.description }, { status: 502 })
    }

    console.log("✅ Contact form message sent successfully!")

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      messageId: result.result.message_id,
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
