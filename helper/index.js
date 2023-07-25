import { exec } from "child_process";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pjson = require("../package.json");

export function openLink(url) {
  let command;

  // Check the operating system to determine the appropriate command
  if (process.platform === "darwin") {
    // macOS
    command = `open ${url}`;
  } else if (process.platform === "win32") {
    // Windows
    command = `start ${url}`;
  } else {
    // Linux or other platforms
    command = `xdg-open ${url}`;
  }

  // Execute the command
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Failed to open link: ${error.message}`);
      return;
    }
  });
}

export function upgrade() {
  console.log("Current version: " + pjson.version.cyan);
  console.log("Running `npm i -g ngenly@latest`".bgBlue);
  exec(`npm i -g ngenly@latest`, (error, stdout, stderr) => {
    if (error) {
      console.error(error.message);
      return;
    }
    console.log(stdout);
    console.log("UPGRADED".bgGreen + " Ngenly API and CRUD generator");
    console.log("made with 💗 by Mart Salazar");
  });
}
