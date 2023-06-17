import { exec } from "child_process";

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
