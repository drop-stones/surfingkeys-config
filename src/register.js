const registerKey = (keymap, mode, domain) => {
  const dom = (domain === "global") ? null : domain
  if (keymap.hasOwnProperty("new_keystroke") && keymap.hasOwnProperty("old_keystroke")) {
    const annotation = keymap.hasOwnProperty("annotation") ? keymap.annotation : null
    if (mode === "normal") {
      api.map(keymap.new_keystroke, keymap.old_keystroke, dom, annotation)
    } else if (mode === "insert") {
      api.imap(keymap.new_keystroke, keymap.old_keystroke, dom, annotation)
    } else if (mode === "visual") {
      api.vmap(keymap.new_keystroke, keymap.old_keystroke, dom, annotation)
    } else if (mode === "omnibar") {
      api.cmap(keymap.new_keystroke, keymap.old_keystroke, dom, annotation)
    }
  } else if (keymap.hasOwnProperty("keys") && keymap.hasOwnProperty("annotation") && keymap.hasOwnProperty("jscode")) {
    if (mode === "normal") {
      api.mapkey(keymap.keys, keymap.annotation, keymap.jscode, { domain: dom })
    } else if (mode === "insert") {
      api.imapkey(keymap.keys, keymap.annotation, keymap.jscode, { domain: dom })
    } else if (mode === "visual") {
      api.vmapkey(keymap.keys, keymap.annotation, keymap.jscode, { domain: dom })
    }
  } else if (keymap.hasOwnProperty("lhs") && keymap.hasOwnProperty("rhs") && keymap.hasOwnProperty("mode")) {
    api.aceVimMap(keymap.lhs, keymap.rhs, keymap.mode)
  }
}

const unregisterKey = (keystroke, mode, domain) => {
  const dom = (domain === "global") ? null : domain
  if (mode === "normal") {
    api.unmap(keystroke, dom)
  } else if (mode === "insert") {
    api.iunmap(keystroke, dom)
  } else if (mode === "visual") {
    api.vunmap(keystroke, dom)
  }
}

const registerSearchEngine = (search_engine, search_leader) => {
  api.addSearchAlias(
    search_engine.alias,
    search_engine.prompt,
    search_engine.search_url,
    "", // search_leader_key from clipboard
    search_engine.suggestion_url,
    search_engine.callback_to_parse_suggestion,
    search_engine.only_this_site_key, // only_this_site_key
    search_engine.options,
  )
}

const registerKeys = (maps) => {
  Object.entries(maps).forEach(([domain, maps]) => {
    Object.entries(maps).forEach(([mode, keystrokes]) => {
      keystrokes.forEach((keystroke) => {
        registerKey(keystroke, mode, domain)
      })
    })
  })
}

const unregisterKeys = (unmaps) => {
  Object.entries(unmaps).forEach(([domain, maps]) => {
    Object.entries(maps).forEach(([mode, keystrokes]) => {
      keystrokes.forEach((keystroke) => {
        unregisterKey(keystroke, mode, domain)
      })
    })
  })
}

const registerSearchEngines = (search_engines) => {
  search_engines.forEach((search_engine) => {
    registerSearchEngine(search_engine, "o")
  })
}

export default {
  registerKeys,
  unregisterKeys,
  registerSearchEngines,
}
