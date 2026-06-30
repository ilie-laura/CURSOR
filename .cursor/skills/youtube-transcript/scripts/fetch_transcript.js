#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { YoutubeTranscript } = require("youtube-transcript");

function usage() {
  console.error(`Usage: node fetch_transcript.js <youtube-url-or-id> [options]

Options:
  -o, --output <file>   Write transcript text to a file
  --json                Print segments as JSON (offset, duration, text)
  --lang <code>         Preferred language (ISO 639-1, e.g. en, ro)
  -h, --help            Show this help
`);
}

function parseArgs(argv) {
  const args = { url: null, output: null, json: false, lang: undefined };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "-h" || arg === "--help") {
      args.help = true;
      return args;
    }
    if (arg === "--json") {
      args.json = true;
      continue;
    }
    if (arg === "-o" || arg === "--output") {
      args.output = argv[++i];
      if (!args.output) throw new Error("Missing value for --output");
      continue;
    }
    if (arg === "--lang") {
      args.lang = argv[++i];
      if (!args.lang) throw new Error("Missing value for --lang");
      continue;
    }
    if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    }
    if (!args.url) {
      args.url = arg;
      continue;
    }
    throw new Error(`Unexpected argument: ${arg}`);
  }

  return args;
}

function segmentsToText(segments) {
  return segments.map((segment) => segment.text.trim()).filter(Boolean).join("\n");
}

async function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    usage();
    process.exit(0);
  }

  if (!args.url) {
    usage();
    process.exit(1);
  }

  const config = args.lang ? { lang: args.lang } : undefined;
  const segments = await YoutubeTranscript.fetchTranscript(args.url, config);

  if (args.json) {
    const payload = JSON.stringify(segments, null, 2);
    if (args.output) {
      fs.writeFileSync(path.resolve(args.output), payload, "utf8");
      console.error(`Wrote JSON transcript to ${path.resolve(args.output)}`);
    } else {
      process.stdout.write(`${payload}\n`);
    }
    return;
  }

  const text = segmentsToText(segments);
  if (args.output) {
    fs.writeFileSync(path.resolve(args.output), text, "utf8");
    console.error(`Wrote transcript (${segments.length} segments) to ${path.resolve(args.output)}`);
  } else {
    process.stdout.write(`${text}\n`);
  }
}

main().catch((error) => {
  console.error(error.message || String(error));
  process.exit(1);
});
