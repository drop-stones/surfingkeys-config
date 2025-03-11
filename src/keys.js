import { unmaps as priv_unmaps } from "./private.js"
import { maps as priv_maps } from "./private.js"
import utils from "./utils.js"

// Remove unused default mappings
var unmaps = {
  global: {
    normal: [
      // #1: Mouse Click
      ";m", // mouse out last element
      ";fs", // Display hints to focus scrollable elements
      ";di", // Download image
      "<Ctrl-h>", // Mouse over elements
      "<Ctrl-j>", // Mouse out elements
      "<Ctrl-i>", // Go to edit box with vim editor
      // #2: Scroll Page / Element
      "e", // Scroll half page up
      // #3: Tabs
      "T", // Choose a tab
      "E", // Go one tab left
      "R", // Go one tab right
      "<<", // Move current tab to left
      ">>", // Move current tab to right
      "yt", // Duplicate current tab
      "yT", // Duplicate current tab in background
      "g0", // Go to the first tab
      "g$", // Go to the last tab
      "gx0", // Close all tabs on left
      "gxt", // Close tab on left
      "gxT", // Close tab on right
      "gx$", // Close all tabs on right
      "gxx", // Close all tabs except current one
      "gxp", // Close playing tab
      ";gt", // Gather filtered tabs into current window
      ";gw", // Gather all tabs into current window
      // #4: Page Navigation
      "gT", // Go to first activated tab
      "gt", // Go to last activated tab
      "g?", // Reload current page without query string(all parts after question mark)
      "g#", // Reload current page without hash fragment
      "U", // Scroll full page up
      "P", // Scroll full page down
      "%", // Scroll to percentage of current page
      ";w", // Focus top window
      "<Ctrl-6>", // Go to last used tab
      // #5: Sessions
      "ZZ", // Save session and quit
      "ZR", // Restore last session
      // #6: Search selected with
      "sd", // Search selected with duckduckgo
      "se", // Search selected with wikipedia
      "sb", // Search selected with baidu
      "sw", // Search selected with bing
      "ss", // Search selected with stackoverflow
      // #7: Clipboard
      "yG", // Capture current full page
      "yg", // Capture current page
      "yS", // Capture scrolling element
      "yj", // Copy current settings
      "yl", // Copy current page's title
      "yQ", // Copy all query history of OmniQuery.
      "yf", // Copy form data in JSON on current page
      "yp", // Copy form data for POST on current page
      "yd", // Copy current downloading URL
      "yc", // Copy a column of a table
      "yq", // Copy pre text
      "ys", // Copy current page's source
      "yY", // Copy all tabs's url
      "yh", // Copy current page's host
      "cq", // Query word with Hints
      ";pp", // Paste html on current page
      ";pj", // Restore settings data from clipboard
      ";pf", // Fill form with data from yf
      ";cq", // Clear all URLs in queue to be opened
      // #8: Omnibar
      "ob", // Open omnibar for baidu search
      "od", // Open omnibar for duckduckgo search
      "ow", // Open omnibar for bing search
      "oe", // Open Omnibar for wikipedia Search
      "os", // Open Omnibar for stackoverflow Search
      // #12: Chrome URLs
      "gc", // Open Chrome Cache
      ";j", // Close Downloads Shelf
      // #13: Proxy
      "cp", // Toggle proxy for current site
      ";pa", // set proxy mode `always`
      ";pb", // set proxy mode `byhost`
      ";pd", // set proxy mode `direct`
      ";ps", // set proxy mode `system`
      ";pc", // set proxy mode `clear`
      ";cp", // Copy proxy info
      ";ap", // Apply proxy info from clipboard
      // #14: Misc
      "gr", // Read selected text or text from clipboard
      ";ph", // Put histories from clipboard
    ],
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
      // #3: Tabs
      {
        keys: "H",
        annotation: "#3Go one tab left",
        jscode: function () {
          api.RUNTIME("previousTab");
        },
        options: { repeatIgnore: true },
      },
      {
        keys: "L",
        annotation: "#3Go one tab right",
        jscode: function () {
          api.RUNTIME("nextTab");
        },
        options: { repeatIgnore: true },
      },
      {
        keys: "<",
        annotation: "#3Move current tab to left",
        jscode: function () {
          api.RUNTIME('moveTab', { step: -1 })
        },
        options: { repeatIgnore: true },
      },
      {
        keys: ">",
        annotation: "#3Move current tab to right",
        jscode: function () {
          api.RUNTIME('moveTab', { step: 1 })
        },
        options: { repeatIgnore: true },
      },
      {
        keys: "T",
        annotation: "#3Choose a tab with omnibar",
        jscode: function () {
          api.Front.openOmnibar({ type: "Tabs" });
        },
        options: { repeatIgnore: true },
      },
    ],
    insert: [],
    visual: [],
    omnibar: [],
    vim: [
      {
        lhs: "jk",
        rhs: "<Esc>",
        mode: "insert",
      },
    ],
  },
}

if (priv_unmaps) {
  unmaps = utils.mergeMaps(unmaps, priv_unmaps);
}

if (priv_maps) {
  maps = utils.mergeMaps(maps, priv_maps);
}

export default {
  unmaps,
  maps,
}
