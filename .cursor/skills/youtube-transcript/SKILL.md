---
name: youtube-transcript
description: Fetches transcript text from a YouTube URL using a self-contained script in this skill folder. Use when the user asks to get, print, or save a YouTube transcript from a link.
---

# YouTube Transcript

## Quick start

1. Install script dependencies once (Node.js required):

```bash
cd .cursor/skills/youtube-transcript/scripts && npm install
```

2. Fetch a transcript:

```bash
node .cursor/skills/youtube-transcript/scripts/fetch_transcript.js "https://www.youtube.com/watch?v=VIDEO_ID"
```

Accepts full YouTube URLs (`watch`, `youtu.be`, `embed`, `shorts`) or an 11-character video ID.

## Workflow

**Get or print:** Run the script and return the stdout text to the user.

**Save:** Use `--output` to write a `.txt` file, or redirect stdout. Confirm the saved path.

**Language:** If the user names a language, pass `--lang <code>` (e.g. `en`, `ro`). On failure, retry without `--lang` or report available-language errors from the script.

**Recap or quiz:** This skill only extracts the transcript. For recap, quiz, or discussion questions, use the `transcript-recap-quiz` skill on the saved file or returned text.

## Script reference

Run from the repository root:

| Goal | Command |
|------|---------|
| Print transcript | `node .cursor/skills/youtube-transcript/scripts/fetch_transcript.js "<url>"` |
| Save to file | `node .cursor/skills/youtube-transcript/scripts/fetch_transcript.js "<url>" -o transcript.txt` |
| Timed segments (JSON) | `node .cursor/skills/youtube-transcript/scripts/fetch_transcript.js "<url>" --json` |
| Preferred language | `node .cursor/skills/youtube-transcript/scripts/fetch_transcript.js "<url>" --lang en` |

If `node_modules` is missing, run `npm install` in `scripts/` before retrying.

## Errors

- **Transcript disabled / unavailable:** Tell the user the video has no captions.
- **Too many requests:** YouTube rate-limited the IP; ask the user to retry later.
- **Video unavailable:** Invalid or removed video ID.

Do not scrape YouTube manually; always use `scripts/fetch_transcript.js`.
