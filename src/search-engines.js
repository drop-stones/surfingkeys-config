import { search_engines as priv_search_engines } from "./private.js"

const createSuggestionEntry = (title, url, { desc = null, query = null } = {}) => {
  const descElement = desc ? `<div>${desc}</div>` : ""
  const li = document.createElement('li')
  li.innerHTML = `
  <div>
    <div style="font-weight: bold">${title}</div>
    ${descElement}
    <div style="opacity: 0.7; line-height: 1.3em">${url}</div>
  </div>
  `

  return {
    html: li.outerHTML,
    props: { url: url, query: query ?? title },
  }
}

var search_engines = [
  {
    alias: "gh",
    prompt: "github",
    search_url: "https://github.com/search?q=",
    suggestion_url: "https://api.github.com/search/repositories?sort=stars&order=desc&q=",
    callback_to_parse_suggestion: (response) =>
      JSON.parse(response.text).items.map((s) => {
        let prefix = ""
        if (s.stargazers_count) {
          prefix += `[★${parseInt(s.stargazers_count, 10)}] `
        }
        return createSuggestionEntry(prefix + s.full_name, s.html_url, {
          query: s.full_name,
          desc: s.description,
        })
      }),
  },
  {
    alias: "am",
    prompt: "amazon.co.jp",
    search_url: "https://amazon.co.jp/s/?field-keywords=",
  },
]

if (priv_search_engines && Array.isArray(priv_search_engines)) {
  search_engines = [...search_engines, ...priv_search_engines]
}

export default search_engines
