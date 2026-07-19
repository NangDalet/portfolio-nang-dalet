# Nang Dalet Portfolio

Next.js portfolio site with a Telegram-backed contact form.

## Local development

1. Copy `.env.example` to `.env.local`.
2. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
3. Start the app with `npm run dev`.

Environment variables are loaded when the server starts, so restart the server after changing them.

## Production deployment

Add these server-side environment variables in the hosting provider before deploying:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

For Vercel, add them under **Project Settings > Environment Variables** for Production (and Preview when needed), then redeploy. Do not add a `NEXT_PUBLIC_` prefix: both values must remain server-only.

After deployment, request `GET /api/send-telegram`. A configured deployment returns HTTP 200 with `{"status":"ok"}`. The health check does not send a Telegram message.
