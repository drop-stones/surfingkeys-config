// Remove unused default mappings
const unmaps = {
  global: {
    normal: ["e"],
    insert: [],
    visual: [],
  }
}

// Add new mappings
// - map(new_keystroke, old_keystroke[, domain, new_annotation])
// - mapkey(keys, annotation,, jscode[, object])
const maps = {
  global: {
    normal: [
      {
        new_keystroke: "F",
        old_keystroke: "gf",
      },
    ],
    insert: [],
    visual: [],
  },
  // domain-specific mappings
}

export default {
  unmaps,
  maps,
}
