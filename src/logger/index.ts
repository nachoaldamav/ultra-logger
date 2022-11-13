import { stdout as output } from "node:process";

export function log(
  event: string,
  message: string,
  options?: {
    prefix?: string;
    success?: boolean;
    failed?: boolean;
    indent?: number;
    start?: boolean;
  }
) {
  // If the event is not in the events object, add it.
  if (!events[event]) {
    const line = ++lastLine;

    events[event] = {
      message,
      line,
      prefix: options?.prefix,
      success: options?.success,
      failed: options?.failed,
      indent: options?.indent,
      start: options?.start,
    };
  }

  // If the event is in the events object, update it.
  if (events[event]) {
    events[event].message = message;

    if (options?.prefix) {
      events[event].prefix = options.prefix;
    }

    if (options?.failed) {
      events[event].failed = options.failed;
    }

    if (options?.indent) {
      events[event].indent = options.indent;
    }
  }

  // Move the cursor to exactly the line the event is on
  output.cursorTo(0, events[event].line - 1);

  // Clear the line
  output.clearLine(0);

  if (events[event].indent) {
    output.write(`${" ".repeat(events[event].indent)}`);
  }

  if (events[event].prefix) {
    output.write(`${events[event].prefix} `);
  }

  if (events[event].failed) {
    output.write("❌ ");
  }

  if (events[event].success) {
    output.write("✔️  ");
  }

  output.write(`${events[event].message}\n`);

  // If the event is the last event, print a blank line
  if (event === Object.keys(events)[Object.keys(events).length - 1]) {
    output.write("");
  }

  // Move the cursor to the bottom of the screen
  output.cursorTo(0, lastLine);
}
