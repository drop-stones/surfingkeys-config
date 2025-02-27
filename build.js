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
  // Get HOME directory from environment variables
  const homeDir = process.env.HOME || process.env.USERPROFILE || os.homedir();
  const destPath = path.join(homeDir, ".config", outfile)

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

const getVivaldiPreferencesPath = () => {
  let preferencesPath;
  switch (os.platform()) {
    case "win32":
      preferencesPath = path.join(os.homedir(), "AppData", "Local", "Vivaldi", "User Data", "Default", "Preferences");
      break;
    case "darwin":
      preferencesPath = path.join(os.homedir(), "Library", "Application Support", "Vivaldi", "User Data", "Default", "Preferences");
      break;
    case "linux":
      preferencesPath = path.join(os.homedir(), ".config", "vivaldi", "User Data", "Default", "Preferences");
      break;
    default:
      throw new Error("Unsupported OS");
  }
  return preferencesPath;
}

const updateVivaldiPreferences = () => {
  const preferencesPath = getVivaldiPreferencesPath();
  try {
    const data = fs.readFileSync(preferencesPath, "utf-8");
    const preferences = JSON.parse(data);

    if (!preferences.vivaldi) {
      preferences.vivaldi = {};
    }
    if (!preferences.vivaldi.actions) {
      preferences.vivaldi.actions = [{}];
    }

    // Add forward tab switching by `L`
    if (!preferences.vivaldi.actions[0].COMMAND_TAB_SWITCH_FORWARD_SETTING) {
      preferences.vivaldi.actions[0].COMMAND_TAB_SWITCH_FORWARD_SETTING = { shortcuts: [] };
    }
    const tab_switch_forward_shortcuts = preferences.vivaldi.actions[0].COMMAND_TAB_SWITCH_FORWARD_SETTING.shortcuts;
    if (!tab_switch_forward_shortcuts.includes("shift+l")) {
      tab_switch_forward_shortcuts.push("shift+l");
    }

    // Add backward tab switching by `H`
    if (!preferences.vivaldi.actions[0].COMMAND_TAB_SWITCH_BACK_SETTING) {
      preferences.vivaldi.actions[0].COMMAND_TAB_SWITCH_BACK_SETTING = { shortcuts: [] };
    }
    const tab_switch_back_shortcuts = preferences.vivaldi.actions[0].COMMAND_TAB_SWITCH_BACK_SETTING.shortcuts;
    if (!tab_switch_back_shortcuts.includes("shift+h")) {
      tab_switch_back_shortcuts.push("shift+h");
    }

    // Hide tab visualization
    if (!preferences.vivaldi.tabs) {
      preferences.vivaldi.tabs = {};
    }
    if (!preferences.vivaldi.tabs.visual_switch) {
      preferences.vivaldi.tabs.visual_switch = {};
    }
    preferences.vivaldi.tabs.visual_switch.enable = false;

    fs.writeFileSync(preferencesPath, JSON.stringify(preferences, null, 2), "utf-8");
    console.log("Setup vivaldi");
    return preferences;
  } catch (error) {
    console.error("Error reading or parsing Preferences file: ", error);
    return null;
  }
}

const action = process.argv.includes("setup-vivaldi") ? "setup-vivaldi" : process.argv.includes("install") ? "install" : "build";
const vivaldi = process.argv.includes("--vivaldi");

if (action === "setup-vivaldi") {
  updateVivaldiPreferences();
} else {
  const entryPoint = vivaldi ? "index.vivaldi.js" : "index.js";
  const outfile = vivaldi ? "surfingkeys.vivaldi.js" : "surfingkeys.js"

  setup_private();
  if (action === "install") {
    build(entryPoint, outfile).then(() => install(outfile));
  } else {
    build(entryPoint, outfile);
  }
}
