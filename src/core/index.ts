import { stdin as input, stdout as output } from "node:process";
import cliCursor from "cli-cursor";
import cliSpinners from "cli-spinners";

function init() {
  setInterval(() => {
    // Loop through the events object and print each event
    for (const event in events) {
    }
  }, 100);
}

cliCursor.hide();
init();

// Clear the screen
output.write("\x1Bc");
