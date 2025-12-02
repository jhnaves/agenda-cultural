# Vercel Deployment Guide

To deploy this project on Vercel, you need to configure the following environment variables in your Vercel Project Settings.

## Environment Variables

These variables are required to fetch the event data from the Google Sheet during the build process.

| Variable Name | Description | Required | Example Value |
| :--- | :--- | :--- | :--- |
| `SHEET_ID` | The ID of the Google Sheet containing events. | **Yes** | `1oGitc3LEkTCSHSxsyJP5YwEfdxmZeHCFMIF-CG03NKU` |
| `SHEET_GID` | The Grid ID of the specific worksheet. | No (defaults to first) | `897604607` |
| `SHEET_PUBLISH_URL` | Direct link to published CSV (optional override). | No | `https://docs.google.com/.../pub?output=csv` |

## Build Settings

Vercel should automatically detect Astro, but if you need to configure it manually:

-   **Framework Preset:** Astro
-   **Build Command:** `npm run build` (which now runs `astro build`)
-   **Output Directory:** `dist`
-   **Install Command:** `npm install`
