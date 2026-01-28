# Social Coach by Tristan - Chat Widget

Ein professionelles Chat-Widget mit n8n Webhook-Integration für Social Media Coaching.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nesla12/social-media-widget-ui)

## ✨ Features

- 🤖 **n8n Webhook Integration** - Direkte Verbindung zu n8n Workflows
- 💬 **Chat Export** - Speichere Unterhaltungen als Text oder JSON
- 💾 **localStorage Persistenz** - Chat-Verlauf bleibt erhalten
- 🎨 **Social Coach Branding** - Tristan Weithaler Design
- 📱 **Responsive Design** - Funktioniert auf allen Geräten
- ⚡ **Next.js 14** - Schnell und modern
- 🔥 **Markdown Support** - Formatierte Antworten mit Bold, Listen, Headings

## 🚀 Live Demo

**Production:** https://social-media-widget-ui.vercel.app

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Backend:** n8n Webhook
- **Deployment:** Vercel

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/nesla12/social-media-widget-ui.git
cd social-media-widget-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## ⚙️ Konfiguration

### n8n Webhook URL

Die Webhook-URL wird in `src/app/api/chat/route.ts` konfiguriert:

```typescript
const WEBHOOK_URL = 'https://n8n.srv919758.hstgr.cloud/webhook/chat';
```

### Chat-Verlauf

Der Chat-Verlauf wird automatisch in `localStorage` unter dem Key `social-coach-chat-history` gespeichert.

## 🎯 Verwendung

### Als iframe einbetten

**Standard Embed:**
```html
<iframe
  src="https://social-media-widget-ui.vercel.app"
  width="100%"
  height="600"
  frameborder="0"
  style="border: none; border-radius: 10px;"
></iframe>
```

**Floating Chat Button (wie Intercom):**
```html
<iframe
  src="https://social-media-widget-ui.vercel.app"
  style="position: fixed; bottom: 20px; right: 20px;
         width: 400px; height: 600px; border: none;
         border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.3);
         z-index: 9999;"
></iframe>
```

Siehe `test-embed.html` für vollständige Beispiele.

## 📋 Chat Features

### Export Funktionen

- **Text Export** - Download als `.txt` mit Timestamps
- **JSON Export** - Download als `.json` für weitere Verarbeitung

### Chat Management

- **Chat leeren** - Löscht den Verlauf mit Bestätigung
- **Persistenz** - Automatisches Speichern in localStorage
- **Markdown** - Unterstützt Bold (`**text**`), Listen (`• item`), Headings (`# title`)

## 🎨 Anpassungen

### Branding ändern

**Logo & Avatar:**
- Datei: `src/components/Chat.tsx` (Zeile 192)

**Farben:**
- Primärfarbe (Rot): `#dc2626` (Tailwind: `red-600`)
- Akzentfarbe: `#991b1b` (Tailwind: `red-800`)
- Hintergrund: `#000000` (Schwarz)

**Texte:**
- Willkommensnachricht: `src/components/Chat.tsx` (Zeile 8-16)
- Header-Titel: `src/components/Chat.tsx` (Zeile 199)

## 🚀 Deployment

### Vercel (Empfohlen)

```bash
# Vercel CLI
npm i -g vercel
vercel
```

Oder via GitHub Integration:
1. Push zu GitHub
2. Gehe zu [vercel.com](https://vercel.com)
3. Import Repository
4. Deploy!

### Umgebungsvariablen

Keine Umgebungsvariablen erforderlich - die Webhook-URL ist im Code konfiguriert.

## 📁 Projektstruktur

```
social-media-widget-ui/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts          # n8n Webhook Integration
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── Chat.tsx                  # Hauptkomponente
│   └── types/
│       └── index.ts                  # TypeScript Typen
├── test-embed.html                   # Embed-Beispiele
├── next.config.mjs
└── package.json
```

## 🔗 Links

- **Website:** [tristanweithaler.com](https://www.tristanweithaler.com/)
- **n8n Webhook:** `https://n8n.srv919758.hstgr.cloud/webhook/chat`
- **Vercel App:** [social-media-widget-ui.vercel.app](https://social-media-widget-ui.vercel.app)

## 📝 Lizenz

Privates Projekt - Alle Rechte vorbehalten

## 🙏 Credits

Entwickelt für **Tristan Weithaler** - Social Media & Business Coach

---

**Made with ❤️ using Next.js & n8n**
