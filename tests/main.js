import chalk from "chalk";
import { log, start } from "../build/index.js";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  log("start", "Starting...");
  log("fetch", "Fetching...");
  await sleep(1000);

  // Loop from steps
  for await (const step of steps) {
    log(step.event, step.name, {
      prefix: step.prefix || undefined,
      indent: step.indent || undefined,
    });

    if (step.start) {
      start(step.event);
    }

    await sleep(step.duration);
  }

  log("end", chalk.red("Failed succesfully!"), {
    indent: 4,
    success: true,
  });

  process.exit(0);
}

const steps = [
  {
    name: chalk.green("Package A"),
    event: "fetch",
    start: true,
    prefix: "🔍",
    duration: 250,
  },
  {
    name: chalk.green("Package B"),
    event: "fetch",
    duration: 1000,
  },
  {
    name: "Package A",
    event: "download",
    prefix: "📦",
    duration: 2000,
  },
  {
    name: "Package C",
    event: "fetch",
    duration: 500,
  },
  {
    name: "Package B",
    event: "download",
    duration: 1000,
  },
  {
    name: "Package C",
    event: "download",
    duration: 1000,
  },
  {
    name: chalk.green("Fetched 3 packages"),
    event: "fetch",
    duration: 0,
  },
  {
    name: chalk.blue("Downloaded 3 packages"),
    event: "download",
    duration: 0,
  },
];

main();
