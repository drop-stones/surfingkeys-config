import conf_settings from "./settings.js"
import keys from "./keys.js"

const {
  mapkey,
  imapkey,
  vmapkey,
  map,
  imap,
  vmap,
  unmap,
  iunmap,
  vunmap,
} = api;

const unregisterKey = (keystroke, mode, domain) => {
  const dom = (domain === "global") ? null : domain
  if (mode === "normal") {
    unmap(keystroke, dom)
  } else if (mode === "insert") {
    iunmap(keystroke, dom)
  } else if (mode === "visual") {
    vunmap(keystroke, dom)
  }
}

const registerKey = (keymap, mode, domain) => {
  const dom = (domain === "global") ? null : domain
  if (keymap.hasOwnProperty("new_keystroke") && keymap.hasOwnProperty("old_keystroke")) {
    const annotation = keymap.hasOwnProperty("annotation") ? keymap.annotation : null
    if (mode === "normal") {
      map(keymap.new_keystroke, keymap.old_keystroke, dom, annotation)
    } else if (mode === "insert") {
      imap(keymap.new_keystroke, keymap.old_keystroke, dom, annotation)
    } else if (mode === "visual") {
      vmap(keymap.new_keystroke, keymap.old_keystroke, dom, annotation)
    }
  } else if (keymap.hasOwnProperty("keys") && keymap.hasOwnProperty("annotation") && keymap.hasOwnProperty("jscode")) {
    if (mode === "normal") {
      mapkey(keymap.keys, keymap.annotation, keymap.jscode, { domain: dom })
    } else if (mode === "insert") {
      imapkey(keymap.keys, keymap.annotation, keymap.jscode, { domain: dom })
    } else if (mode === "visual") {
      vmapkey(keymap.keys, keymap.annotation, keymap.jscode, { domain: dom })
    }
  }
}

// settings
Object.assign(settings, conf_settings)

// keys
if (keys && keys.hasOwnProperty("unmaps")) {
  Object.entries(keys.unmaps).forEach(([domain, maps]) => {
    Object.entries(maps).forEach(([mode, keystrokes]) => {
      keystrokes.forEach((keystroke) => {
        unregisterKey(keystroke, mode, domain)
      })
    })
  })
}
if (keys && keys.hasOwnProperty("maps")) {
  Object.entries(keys.maps).forEach(([domain, maps]) => {
    Object.entries(maps).forEach(([mode, keystrokes]) => {
      keystrokes.forEach((keystroke) => {
        registerKey(keystroke, mode, domain)
      })
    })
  })
}
