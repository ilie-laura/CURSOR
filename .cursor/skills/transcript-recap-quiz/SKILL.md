---
name: transcript-recap-quiz
description: Generates recap and quiz from transcript text or a saved transcript file. Use when the user asks for recapitulare, quiz, intrebari grila, or discussion questions from a transcript — not for fetching YouTube links.
---

# Transcript Recap + Quiz

## Input

Read the transcript from whichever source the user provides:

- A saved `.txt` file in given language (e.g. from `youtube-transcript`)
- Pasted transcript text in chat
- A file the user attaches with `@`

If no transcript is available yet, ask the user to provide one or use `youtube-transcript` first to fetch it from a YouTube URL.

## Cursor command prompt

Recap + quiz din transcript

Task:
Citeste transcriptul primit (fisier salvat sau text returnat) si genereaza:
1) recapitulare in 8-10 puncte
2) quiz cu 10 intrebari (grila + raspuns corect)
3) 3 intrebari deschise pentru discutie

## Output format

Use clear headings in the user's language (default Romanian if they write in Romanian):

1. **Recapitulare** — numbered list, 8–10 bullet points covering the main ideas.
2. **Quiz** — 10 multiple-choice questions (a–d), mark the correct answer (e.g. `✓` or **Răspuns: b**).
3. **Întrebări deschise** — 3 questions that invite discussion, not yes/no answers.

Base every item strictly on the transcript content; do not invent facts not present in the text.

## Optional

If the user asks, save the output to a file (e.g. `recap-quiz.md`) in the project root or a path they specify.
