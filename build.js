import esbuild from "esbuild"
import path from "path"
import os from "os"
import fs from "fs"
import { execSync } from "child_process"

const build = async (entryPoint, outfile) => {
  return esbuild.build({
    entryPoints: [`src/${entryPoint}`],
    outfile: `build/${outfile}`,
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

const install = (outfile) => {
  const destPath = path.join(os.homedir(), ".config", outfile)

  try {
    if (os.platform() === "win32") {
      execSync(`copy /Y build\\${outfile} ${destPath}`);
    } else if (os.platform() === "darwin" || os.platform() === "linux") {
      execSync(`cp build/${outfile} ${destPath}`)
    }
    console.log(`Installed to ${destPath}`);
  } catch (err) {
    console.error("Copy failed: ", err);
    process.exit(1);
  }
}

const action = process.argv.includes("install") ? "install" : "build";
const isVivaldi = process.argv.includes("--vivaldi");
const entryPoint = isVivaldi ? "index.vivaldi.js" : "index.js";
const outfile = isVivaldi ? "surfingkeys.vivaldi.js" : "surfingkeys.js"

setup_private().then(() => {
  if (action === "install") {
    build(entryPoint, outfile).then(() => install(outfile));
  } else {
    build(entryPoint, outfile);
  }
})
