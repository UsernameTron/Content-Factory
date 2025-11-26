# MirrorUniverse Pete - Deployment Guide

## Quick Deploy Options

### Option 1: Deploy via GitHub (Recommended)

1. **Create a GitHub repository** and push this project
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repo
5. Netlify will auto-detect the build settings from `netlify.toml`
6. **Before deploying**, add your environment variable:
   - Go to Site Settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY` = your Anthropic API key

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy (from project root)
netlify deploy --prod

# Or create a new site and deploy
netlify deploy --prod --create-site
```

Then add your `ANTHROPIC_API_KEY` in Netlify Dashboard → Site Settings → Environment Variables.

### Option 3: Manual Deploy

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag the `dist` folder
3. ⚠️ Note: This won't include the serverless function, so API calls won't work
4. For full functionality, use GitHub integration

## Environment Variable Required

After deployment, you MUST set this environment variable in Netlify:

| Variable | Value |
|----------|-------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key from [console.anthropic.com](https://console.anthropic.com) |

**Steps:**
1. Go to your Netlify site dashboard
2. Site Settings → Environment Variables
3. Add new variable: `ANTHROPIC_API_KEY`
4. Paste your API key as the value
5. Redeploy the site

## Project Structure

```
pete-content-factory/
├── src/
│   ├── App.jsx          # Main React component
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind CSS
├── netlify/
│   └── functions/
│       └── generate.js  # Serverless function for Claude API
├── dist/                # Built static files
├── netlify.toml         # Netlify configuration
├── package.json
└── vite.config.js
```

## How It Works

1. **Frontend** (React + Tailwind): User enters topic, clicks generate
2. **Serverless Function** (Netlify Function): Proxies request to Claude API
3. **Claude API**: Generates platform-specific content
4. **Frontend**: Displays content with copy buttons

The serverless function keeps your API key secure (server-side only).

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# For local function testing
netlify dev
```

Note: `netlify dev` runs both the Vite dev server and local function emulation.

## Troubleshooting

### "ANTHROPIC_API_KEY not configured"
- Add the environment variable in Netlify Dashboard
- Redeploy after adding

### Function returns 500 error
- Check Netlify function logs: Site Dashboard → Functions → generate
- Verify API key is correct

### Build fails
- Ensure Node.js 18+ is used
- Check `netlify.toml` settings

---

*Every word is a weapon. Make them count.*
