export default `
.sk_theme {
    font-family: Input Sans Condensed, Charcoal, sans-serif;
    font-size: 10pt;
    background: #181818e0;
    color: #E0E0E0;
}
.sk_theme tbody {
    color: #E0E0E0;
}
.sk_theme input {
    color: #E0E0E0;
}
.sk_theme .url {
    color: #7aa2f7;
}
.sk_theme .annotation {
    color: #9aa5ce;
}
.sk_theme .omnibar_highlight {
    color: #bb9af7;
}
.sk_theme .omnibar_timestamp {
    color: #e0af68;
}
.sk_theme .omnibar_visitcount {
    color: #9ece6a;
}
.sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
    background: #303030e0;
}
.sk_theme #sk_omnibarSearchResult ul li.focused {
    background: #515151e0;
}
#sk_status, #sk_find {
    font-size: 20pt;
    background: #242424e0;
    color: #E0E0E0;
}

/* ACE editor */
:root {
    --theme-ace-bg:#181818ab;
    --theme-ace-bg-accent:#303030ab;
    --theme-ace-fg:#e0e0e0;
    --theme-ace-fg-accent:#bb9af7;
    --theme-ace-cursor:#9aa5cea0;
    --theme-ace-select:#3b4261;
}
#sk_editor {
    background: var(--theme-ace-bg) !important;
}
.ace_dialog-bottom {
    border-top: 1px solid var(--theme-ace-bg) !important;
}
.ace-chrome .ace_print-margin, .ace_gutter, .ace_gutter-cell, .ace_dialog {
    background: var(--theme-ace-bg-accent) !important;
}
.ace-chrome {
    color: var(--theme-ace-fg) !important;
}
.ace_gutter, .ace_dialog {
    color: var(--theme-ace-fg-accent) !important;
}
.ace_cursor {
    color: var(--theme-ace-cursor) !important;
}
.normal-mode .ace_cursor {
    background-color: var(--theme-ace-cursor) !important;
    border: var(--theme-ace-cursor) !important;
}
.ace_marker-layer .ace_selection {
    background: var(--theme-ace-select) !important;
}
`;
