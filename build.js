import esbuild from "esbuild"
import path from "path"
import os from "os"
import fs from "fs"
import { execSync } from "child_process"

// Get HOME directory from environment variables
const homeDir = process.env.HOME || process.env.USERPROFILE || os.homedir();
const destPath = path.join(homeDir, ".config", "surfingkeys.js")

const build = () => {
  return esbuild.build({
    entryPoints: ["src/main.js"],
    outfile: "build/surfingkeys.js",
    bundle: true, // bundle all dependencies
    format: "esm", // ES module format
    minify: false, // optimization
    platform: "browser",
  }).then(() => {
    console.log("Build completed!");
  }).catch((err) => {
    console.error("Build failed: ", err);
    process.exit(1);
  });
};

const setup_private = async () => {
  try {
    await fs.promises.stat("src/private.js")
  } catch (e) {
    console.log("Setup src/private.js")
    try {
      fs.promises.copyFile("src/private.example.js", "src/private.js", fs.constants.COPYFILE_EXCL);
    } catch (err) {
      console.error("Copy failed: ", err);
      process.exit(1);
    }
  }
}

const install = () => {
  try {
    if (os.platform() === "win32") {
      execSync(`copy /Y build\\surfingkeys.js ${destPath}`);
    } else if (os.platform() === "darwin" || os.platform() === "linux") {
      execSync(`cp build/surfingkeys.js ${destPath}`)
    }
    console.log(`Installed to ${destPath}`);
  } catch (err) {
    console.error("Copy failed: ", err);
    process.exit(1);
  }
}

const action = process.argv.includes("install") ? "install" : "build";

if (action === "install") {
  setup_private();
  build().then(() => install());
} else {
  setup_private();
  build();
}
