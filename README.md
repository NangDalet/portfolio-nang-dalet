# Nang Dalet Portfolio

Next.js portfolio site with a Telegram-backed contact form.

## Local development

1. Install dependencies with `npm ci --legacy-peer-deps` (the existing date picker declares a React 18 peer dependency).
2. Copy `.env.example` to `.env.local`.
3. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
4. Start the app with `npm run dev`.

Environment variables are loaded when the server starts, so restart the server after changing them.

## Interactive portfolio

The entrance is a full-screen Three.js world inspired by the first website (Active Theory) in the supplied reference video. Scroll to travel through seven floating project panels, or use the scene index and previous/next controls. The camera responds to mouse movement; the particle field, metallic fragments, and entrance ribbons are generated locally. Project textures use the existing local screenshots. No external models or textures are required.

The pause control stops ambient animation while preserving scroll navigation. Reduced-motion preferences disable ambient and cursor motion and switch the camera between stationary scenes. Rendering stops when the world leaves the viewport or the tab is hidden. Static imagery and project links remain available if WebGL is unavailable. Skip links lead directly to the conventional about and project sections.

Project cards tilt on desktop pointer movement. Phone layouts retain normal scrolling and touch navigation. The theme toggle supports both light and dark appearances.

Check changes with `npx tsc --noEmit` and `npm run build`. The existing `next/font` setup requires network access to Google Fonts during a fresh build.

## Production deployment

Add these server-side environment variables in the hosting provider before deploying:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

For Vercel, add them under **Project Settings > Environment Variables** for Production (and Preview when needed), then redeploy. Do not add a `NEXT_PUBLIC_` prefix: both values must remain server-only.

After deployment, request `GET /api/send-telegram`. A configured deployment returns HTTP 200 with `{"status":"ok"}`. The health check does not send a Telegram message.
