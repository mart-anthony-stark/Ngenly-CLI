import { exec } from "child_process";
import colors from "colors";
import Loader from "./loader.js";

const log = console.log;
const loader = new Loader();

const download = async (templateLink, projName) => {
  loader.startLoading();

  exec(`npx degit ${templateLink} ${projName}`, (error, stdout, output) => {
    if (error) {
      throw error;
    }
    loader.stopLoading();
    if (output) {
      log(`${output}`.green);
      log();
      log(`Successfully downloaded boilerplate!`.green);
      log("\tTo get started:".blue);
      log(`\t\tcd ${projName}`.cyan);
      log(`\t\tnpm install`.cyan);
      log(`\t\tnpm start`.cyan);
    }
  });
};

export default download;
