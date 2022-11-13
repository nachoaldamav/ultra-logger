import { stdout as output } from "node:process";
import cliSpinners from "cli-spinners";
import cliCursor from "cli-cursor";

cliCursor.hide();

export async function start(event: string) {
  if (!events[event]) {
    throw new Error(`Event ${event} does not exist.`);
  }

  events[event].start = true;
  events[event].frame = 0;

  let frame = 0;

  while (
    events[event].start === true ||
    !events[event].success ||
    !events[event].failed
  ) {
    // Move the cursor to exactly the line the event is on
    output.cursorTo(0, events[event].line - 1);

    // Clear the line
    output.clearLine(0);

    // Print the spinner
    output.write(`${cliSpinners.dots.frames[events[event].frame]} `);

    if (events[event].indent) {
      output.write(`${" ".repeat(events[event].indent)}`);
    }

    if (events[event].prefix) {
      output.write(`${events[event].prefix} `);
    }

    if (events[event].failed) {
      output.write("❌ ");
    }

    output.write(events[event].message);

    frame = ++frame % cliSpinners.dots.frames.length;

    events[event].frame = frame;

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return;
}
