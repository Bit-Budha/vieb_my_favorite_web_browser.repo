/*
* Vieb - Vim Inspired Electron Browser
* Copyright (C) 2019-2023 Jelmer van Arnhem
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
"use strict"

// Always load the misc action functions (such as scrolling before page loads)
require("./actions")
// Always load follow mode JavaScript
require("./follow")

const {pathToSpecialPageName} = require("../util")
const specialPage = pathToSpecialPageName(window.location.href)
const skipProtocols = ["sourceviewer:", "readerview:", "markdownviewer:"]
if (specialPage.name) {
    // Load the special page specific JavaScript
    require(`./${specialPage.name}`)
    // Load the scrollbar styling override if not loading all the styling
    require("./scrollbar")
} else if (skipProtocols.find(p => window.location.href.startsWith(p))) {
    // Load the scrollbar styling override if not loading all the styling
    require("./scrollbar")
} else {
    // Load the failed page information handler for nonspecial pages
    require("./failedload")
    // Load the local directory browser for nonspecial pages
    require("./filebrowser")
    // Load the privacy related fixes for nonspecial pages
    require("./privacy")
    // Load the custom styling such as colors, fontsizes and darkreader
    require("./styling")
    // Load optional plugins and extensions
    require("./extensions")
}
