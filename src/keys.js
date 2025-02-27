import { unmaps as priv_unmaps } from "./private.js"
import { maps as priv_maps } from "./private.js"
const { RUNTIME } = api
import utils from "./utils.js"

// Remove unused default mappings
var unmaps = {
  global: {
    normal: ["e", "E", "R", "S", "D"],
    insert: [],
    visual: [],
  }
}

// Add new mappings
// - map(new_keystroke, old_keystroke[, domain, new_annotation])
// - mapkey(keys, annotation,, jscode[, object])
var maps = {
  global: {
    normal: [
      // #1: Mouse Click
      {
        new_keystroke: "F",
        old_keystroke: "af",
        annotation: "#1Open a link in active new tab"
      },
      // #4: Page Navigation
      {
        keys: "J",
        annotation: "#4Go back in history",
        jscode: function () {
          history.go(-1);
        },
        options: { repeatIgnore: true },
      },
      {
        keys: "K",
        annotation: "#4Go forward in history",
        jscode: function () {
          history.go(1);
        },
        options: { repeatIgnore: true },
      },
    ],
    insert: [],
    visual: [],
  },
  // domain-specific mappings
}

if (priv_unmaps) {
  unmaps = mergeMaps(unmaps, priv_unmaps);
}

if (priv_maps) {
  maps = mergeMaps(maps, priv_maps);
}

export default {
  unmaps,
  maps,
}
