import colors from "colors";

class Loader {
  constructor() {
    this.loading = null;
  }

  startLoading() {
    let P = ["\\", "|", "/", "-"];
    let x = 0;
    this.loading = setInterval(() => {
      process.stdout.write(
        "  Downloading Template...".cyan + "\r" + P[x++].red + "   "
      );
      x &= 3;
    }, 50);
  }

  stopLoading() {
    clearInterval(this.loading);
    process.stdout.write("\r");
  }
}

export default Loader;
