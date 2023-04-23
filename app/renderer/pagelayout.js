/*
* Vieb - Vim Inspired Electron Browser
* Copyright (C) 2020-2023 Jelmer van Arnhem
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

const {
    listTabs,
    currentPage,
    getSetting,
    tabForPage,
    listFakePages,
    listRealPages,
    listPages
} = require("./common")

const {propPixels} = require("../util")

const layoutDivById = id => document.querySelector(
    `#pagelayout div[link-id='${id}']`)
/** @type {{[id: string]: Number}} */
const timers = {}
/** @type {string|null} */
let lastTabId = null
let recentlySwitched = false
/** @type {number|null} */
let scrollbarHideTimer = null
/** @type {number|null} */
let scrollbarHideIgnoreTimer = null

const switchView = (oldViewOrId, newView) => {
    let oldId = oldViewOrId
    if (oldViewOrId && !["number", "string"].includes(typeof oldViewOrId)) {
        oldId = oldViewOrId.getAttribute("link-id")
    }
    const newId = newView.getAttribute("link-id")
    if (oldId) {
        if (!layoutDivById(newId)) {
            layoutDivById(oldId)?.setAttribute("link-id", newId)
        }
    } else if (document.getElementById("pagelayout").children.length === 0) {
        document.getElementById("pagelayout").classList.add("hor")
        const singleView = document.createElement("div")
        singleView.setAttribute("link-id", newId)
        document.getElementById("pagelayout").appendChild(singleView)
    }
    applyLayout()
}

/**
 * Hide a page from view
 *
 * @param {Electron.WebviewTag|HTMLDivElement} view
 * @param {boolean} close
 */
const hide = (view, close = false) => {
    removeRedundantContainers()
    if (!document.getElementById("pages").classList.contains("multiple")) {
        return
    }
    const inLayout = layoutDivById(view.getAttribute("link-id"))
    const parent = inLayout.parentElement
    const sibling = inLayout.nextElementSibling
    inLayout.remove()
    ;[...parent.children, parent].forEach(element => {
        if (element instanceof HTMLElement) {
            element.style.flexGrow = null
        }
    })
    if (view.id === "current-page") {
        const visibleTabs = listTabs().filter(
            t => t.classList.contains("visible-tab"))
        let newTab = null
        if (sibling) {
            newTab = visibleTabs.find(t => t.getAttribute("link-id")
                === sibling.getAttribute("link-id"))
        }
        if (!newTab && parent.children[0]) {
            newTab = visibleTabs.find(t => t.getAttribute("link-id")
                === parent.children[0].getAttribute("link-id"))
        }
        if (!newTab) {
            newTab = visibleTabs.find(t => t.getAttribute("link-id")
                !== view.getAttribute("link-id"))
        }
        if (close) {
            tabForPage(view).remove()
            try {
                if (!(view instanceof HTMLDivElement)) {
                    view.closeDevTools()
                }
            } catch {
                // Webview already destroyed by the page,
                // most often happens when a page closes itself.
            }
            view.remove()
        }
        const {switchToTab} = require("./tabs")
        switchToTab(newTab)
    } else if (close) {
        tabForPage(view).remove()
        try {
            if (!(view instanceof HTMLDivElement)) {
                view.closeDevTools()
            }
        } catch {
            // Webview already destroyed by the page,
            // most often happens when a page closes itself.
        }
        view.remove()
    }
    applyLayout()
}

const add = (viewOrId, method, leftOrAbove) => {
    let id = viewOrId
    if (!["number", "string"].includes(typeof viewOrId)) {
        id = viewOrId.getAttribute("link-id")
    }
    const inLayout = layoutDivById(currentPage().getAttribute("link-id"))
    if ([...document.querySelectorAll("#pagelayout *[link-id]")].length === 1) {
        document.getElementById("pagelayout").className = method
    }
    if (inLayout.parentElement.classList.contains(method)) {
        const singleView = document.createElement("div")
        singleView.setAttribute("link-id", id)
        if (leftOrAbove) {
            inLayout.parentElement.insertBefore(singleView, inLayout)
        } else {
            inLayout.parentElement.insertBefore(
                singleView, inLayout.nextSibling)
        }
    } else {
        const verContainer = document.createElement("div")
        verContainer.className = method
        if (leftOrAbove) {
            const singleView = document.createElement("div")
            singleView.setAttribute("link-id", id)
            verContainer.appendChild(singleView)
        }
        const existingView = document.createElement("div")
        existingView.setAttribute("link-id", inLayout.getAttribute("link-id"))
        verContainer.appendChild(existingView)
        if (!leftOrAbove) {
            const singleView = document.createElement("div")
            singleView.setAttribute("link-id", id)
            verContainer.appendChild(singleView)
        }
        inLayout.parentElement.insertBefore(verContainer, inLayout)
        inLayout.remove()
    }
    [
        ...layoutDivById(id).parentElement.children,
        layoutDivById(id).parentElement
    ].forEach(element => {
        if (element instanceof HTMLElement) {
            element.style.flexGrow = null
        }
    })
    applyLayout()
}

const rotateForward = () => {
    removeRedundantContainers()
    if (!document.getElementById("pages").classList.contains("multiple")) {
        return
    }
    const current = layoutDivById(currentPage().getAttribute("link-id"))
    const parent = current.parentNode
    parent.insertBefore(parent.lastChild, parent.firstChild)
    applyLayout()
}

const rotateReverse = () => {
    removeRedundantContainers()
    if (!document.getElementById("pages").classList.contains("multiple")) {
        return
    }
    const current = layoutDivById(currentPage().getAttribute("link-id"))
    const parent = current.parentNode
    parent.appendChild(parent.firstChild)
    applyLayout()
}

const exchange = () => {
    removeRedundantContainers()
    if (!document.getElementById("pages").classList.contains("multiple")) {
        return
    }
    const current = layoutDivById(currentPage().getAttribute("link-id"))
    const parent = current.parentNode
    if ([...parent.children].some(c => c.className)) {
        return
    }
    let newId = null
    if (parent.lastChild === current) {
        newId = current.previousElementSibling.getAttribute("link-id")
        parent.appendChild(current.previousElementSibling)
    } else {
        newId = current.nextElementSibling.getAttribute("link-id")
        parent.insertBefore(current, current.nextSibling.nextSibling)
    }
    const tab = listTabs().find(t => t.getAttribute("link-id") === newId)
    const {switchToTab} = require("./tabs")
    switchToTab(tab)
    applyLayout()
}

const toTop = direction => {
    removeRedundantContainers()
    if (!document.getElementById("pages").classList.contains("multiple")) {
        return
    }
    const current = layoutDivById(currentPage().getAttribute("link-id"))
    const layout = document.getElementById("pagelayout")
    const hor = layout.classList.contains("hor")
    const ver = layout.classList.contains("ver")
    if (direction === "left" && hor || direction === "top" && ver) {
        layout.insertBefore(current, layout.firstChild)
    } else if (direction === "right" && hor || direction === "bottom" && ver) {
        layout.appendChild(current)
    } else {
        let pageLayoutClass = "hor"
        let subLayoutClass = "ver"
        if (["top", "bottom"].includes(direction)) {
            pageLayoutClass = "ver"
            subLayoutClass = "hor"
        }
        const subLayout = document.createElement("div")
        subLayout.className = subLayoutClass
        layout.className = pageLayoutClass
        ;[...layout.children].forEach(child => subLayout.appendChild(child))
        layout.appendChild(subLayout)
        if (["left", "top"].includes(direction)) {
            layout.insertBefore(current, layout.firstChild)
        } else {
            layout.appendChild(current)
        }
    }
    resetResizing()
}

const moveFocus = direction => {
    removeRedundantContainers()
    if (!document.getElementById("pages").classList.contains("multiple")) {
        return
    }
    const current = layoutDivById(currentPage().getAttribute("link-id"))
    const id = current.getAttribute("link-id")
    const dims = current.getBoundingClientRect()
    let x = dims.x + dims.width / 2
    let y = dims.y + dims.height / 2
    let newView = document.elementsFromPoint(x, y).find(
        el => el.matches("#pagelayout *[link-id]"))
    while (newView?.getAttribute("link-id") === id) {
        if (direction === "left") {
            x -= 10
        } else if (direction === "top") {
            y -= 10
        } else if (direction === "bottom") {
            y += 10
        } else if (direction === "right") {
            x += 10
        } else {
            break
        }
        newView = document.elementsFromPoint(x, y).find(
            el => el.matches("#pagelayout *[link-id]"))
    }
    if (newView) {
        const newId = newView.getAttribute("link-id")
        if (newId && newId !== id) {
            const tab = listTabs().find(
                t => t.getAttribute("link-id") === newId)
            const {switchToTab} = require("./tabs")
            switchToTab(tab)
        }
    }
}

const resize = (orientation, change) => {
    removeRedundantContainers()
    if (!document.getElementById("pages").classList.contains("multiple")) {
        return
    }
    let element = layoutDivById(currentPage().getAttribute("link-id"))
    const base = document.getElementById("pagelayout")
    while (!element.parentElement.classList.contains(orientation)) {
        element = element.parentElement
        if (element === base) {
            return
        }
    }
    let flexGrow = propPixels(element, "flexGrow") || 1
    if (change === "grow") {
        flexGrow *= 1.5
    } else if (change === "shrink") {
        flexGrow /= 1.5
    }
    if (flexGrow < 1) {
        [...element.parentNode.children].forEach(child => {
            if (child instanceof HTMLElement) {
                const current = propPixels(child, "flexGrow") || 1
                child.style.flexGrow = `${current / flexGrow}`
            }
        })
        flexGrow = 1
    }
    if (flexGrow > 10) {
        [...element.parentNode.children].forEach(child => {
            if (child instanceof HTMLElement) {
                const current = propPixels(child, "flexGrow") || 1
                child.style.flexGrow = `${current / (flexGrow / 10)}`
            }
        })
        flexGrow = 10
    }
    [...element.parentNode.children].forEach(child => {
        if (child instanceof HTMLElement) {
            const current = propPixels(child, "flexGrow") || 1
            child.style.flexGrow = `${Math.min(10, Math.max(1, current))}`
        }
    })
    if (element instanceof HTMLElement) {
        element.style.flexGrow = `${flexGrow}`
    }
    applyLayout()
}

const firstSplit = () => {
    const first = document.querySelector("#pagelayout *[link-id]")
    const {switchToTab} = require("./tabs")
    const tab = listTabs().find(
        t => t.getAttribute("link-id") === first.getAttribute("link-id"))
    if (tab) {
        switchToTab(tab)
    }
}

const previousSplit = () => {
    const views = [...document.querySelectorAll("#pagelayout *[link-id]")]
    const current = layoutDivById(currentPage()?.getAttribute("link-id"))
    const next = views[views.indexOf(current) - 1] || views[views.length - 1]
    const {switchToTab} = require("./tabs")
    const tab = listTabs().find(
        t => t.getAttribute("link-id") === next.getAttribute("link-id"))
    if (tab) {
        switchToTab(tab)
    }
}

const nextSplit = () => {
    const views = [...document.querySelectorAll("#pagelayout *[link-id]")]
    const current = layoutDivById(currentPage()?.getAttribute("link-id"))
    const next = views[views.indexOf(current) + 1] || views[0]
    const {switchToTab} = require("./tabs")
    const tab = listTabs().find(
        t => t.getAttribute("link-id") === next.getAttribute("link-id"))
    if (tab) {
        switchToTab(tab)
    }
}

const lastSplit = () => {
    const views = [...document.querySelectorAll("#pagelayout *[link-id]")]
    const last = views[views.length - 1]
    const {switchToTab} = require("./tabs")
    const tab = listTabs().find(
        t => t.getAttribute("link-id") === last.getAttribute("link-id"))
    if (tab) {
        switchToTab(tab)
    }
}

const only = () => {
    const linkId = currentPage()?.getAttribute("link-id") ?? ""
    const singleView = document.createElement("div")
    singleView.setAttribute("link-id", linkId)
    document.getElementById("pagelayout").textContent = ""
    document.getElementById("pagelayout").appendChild(singleView)
    applyLayout()
}

const setLastUsedTab = id => {
    if (recentlySwitched) {
        if (currentPage()?.getAttribute("link-id") === lastTabId) {
            lastTabId = id
        }
        return
    }
    if (!lastTabId || currentPage()?.getAttribute("link-id") !== id) {
        lastTabId = id
        recentlySwitched = true
        setTimeout(() => {
            recentlySwitched = false
        }, getSetting("timeoutlen"))
    }
}

const resetResizing = () => {
    [...document.querySelectorAll("#pagelayout *")].forEach(element => {
        if (element instanceof HTMLElement) {
            element.style.flexGrow = ""
        }
    })
    applyLayout()
}

const removeRedundantContainers = () => {
    const base = document.getElementById("pagelayout")
    ;[...document.querySelectorAll("#pagelayout .hor, #pagelayout .ver"), base]
        .forEach(container => {
            if (container.children.length < 2 && container !== base) {
                const [lonelyView] = container.children
                if (lonelyView instanceof HTMLElement) {
                    lonelyView.style.flexGrow = null
                    container.parentNode.insertBefore(lonelyView, container)
                }
                container.remove()
            }
            [...container.children].forEach(child => {
                if (!child.getAttribute("link-id")) {
                    if (child.className === container.className) {
                        [...child.children].forEach(subChild => {
                            container.insertBefore(subChild, child)
                        })
                        child.remove()
                    }
                }
            })
        })
}

const restartSuspendTimeouts = () => {
    for (const linkId of Object.keys(timers)) {
        window.clearTimeout(timers[linkId])
        delete timers[linkId]
    }
    applyLayout()
}

const applyLayout = () => {
    const pagelayout = document.getElementById("pagelayout")
    if (!pagelayout) {
        return
    }
    pagelayout.querySelectorAll("*[link-id]").forEach(element => {
        const id = element.getAttribute("link-id")
        const page = document.querySelector(`#pages .webview[link-id='${id}']`)
        if (!page) {
            element.remove()
        }
    })
    removeRedundantContainers()
    if (pagelayout.children.length === 0) {
        pagelayout.classList.add("hor")
        const cur = document.getElementById("current-page")
        if (cur) {
            const view = document.createElement("div")
            view.setAttribute("link-id", cur.getAttribute("link-id") ?? "")
            pagelayout.appendChild(view)
        }
    }
    /** @type {(Electron.WebviewTag|HTMLDivElement)[]} */
    const visiblePages = []
    /** @type {HTMLSpanElement[]} */
    const visibleTabs = []
    pagelayout.querySelectorAll("*[link-id]").forEach(element => {
        const id = element.getAttribute("link-id")
        const page = listPages().find(p => p.getAttribute("link-id") === id)
        const tab = listTabs().find(t => t.getAttribute("link-id") === id)
        if (!page || !tab) {
            return
        }
        visiblePages.push(page)
        visibleTabs.push(tab)
        const dimensions = element.getBoundingClientRect()
        page.style.left = `${Math.round(dimensions.x)}px`
        page.style.top = `${Math.round(dimensions.y)}px`
        page.style.width = `${Math.round(dimensions.width)}px`
        page.style.height = `${Math.round(dimensions.height)}px`
    })
    if (visiblePages.length > 1) {
        document.getElementById("pages")?.classList.add("multiple")
        document.getElementById("tabs")?.classList.add("multiple")
    } else {
        document.getElementById("pages")?.classList.remove("multiple")
        document.getElementById("tabs")?.classList.remove("multiple")
    }
    listFakePages().forEach(page => page.classList.remove("visible-page"))
    listRealPages().forEach(page => {
        if (visiblePages.includes(page)) {
            page.classList.add("visible-page")
        } else {
            page.classList.remove("visible-page")
        }
    })
    const susCall = (tab, linkId, timeout) => {
        const shouldSuspend = getSetting("suspendplayingtab")
            || !tab.hasAttribute("media-playing")
        if (shouldSuspend) {
            delete timers[linkId]
            const {suspendTab} = require("./tabs")
            suspendTab(tab)
        } else {
            timers[linkId] = window.setTimeout(
                () => susCall(tab, linkId, timeout), timeout)
        }
    }
    const timeout = getSetting("suspendtimeout")
    listTabs().forEach(tab => {
        const linkId = tab.getAttribute("link-id") ?? ""
        if (visibleTabs.includes(tab)) {
            tab.classList.add("visible-tab")
            window.clearTimeout(timers[linkId])
            delete timers[linkId]
        } else {
            tab.classList.remove("visible-tab")
            if (timeout && !timers[linkId] && !tab.getAttribute("suspended")) {
                timers[linkId] = window.setTimeout(
                    () => susCall(tab, linkId, timeout), timeout)
            }
        }
    })
    const cur = currentPage()
    const follow = document.getElementById("follow")
    if (cur && follow) {
        if (document.getElementById("pages")?.classList.contains("multiple")) {
            const bor = propPixels(cur, "borderWidth")
            follow.style.top = `${Math.round(propPixels(
                cur.style, "top") + bor)}px`
            follow.style.left = `${Math.round(propPixels(
                cur.style, "left") + bor)}px`
            follow.style.width = `${Math.round(propPixels(
                cur.style, "width") - bor * 2)}px`
            follow.style.height = `${Math.round(propPixels(
                cur.style, "height") - bor * 2)}px`
        } else {
            follow.style.top = cur.style.top
            follow.style.left = cur.style.left
            follow.style.width = cur.style.width
            follow.style.height = cur.style.height
        }
    }
}

const showScrollbar = () => {
    if (scrollbarHideIgnoreTimer) {
        return
    }
    listRealPages().forEach(p => p.send("show-scrollbar"))
}

const hideScrollbar = () => {
    if (scrollbarHideIgnoreTimer) {
        return
    }
    scrollbarHideIgnoreTimer = window.setTimeout(() => {
        scrollbarHideIgnoreTimer = null
    }, 500)
    listRealPages().forEach(p => p.send("hide-scrollbar"))
}

const resetScrollbarTimer = (event = "none") => {
    const setting = getSetting("guiscrollbar")
    const timeout = getSetting("guihidetimeout")
    if (setting === "onmove" || setting === "onscroll") {
        if (event === "scroll" || setting === "onmove" && event !== "none") {
            window.clearTimeout(scrollbarHideTimer ?? undefined)
            showScrollbar()
            scrollbarHideTimer = window.setTimeout(
                () => hideScrollbar(), timeout)
        }
        return
    }
    if (setting === "always") {
        showScrollbar()
    } else {
        hideScrollbar()
    }
}

const getLastTabId = () => lastTabId

module.exports = {
    add,
    applyLayout,
    exchange,
    firstSplit,
    getLastTabId,
    hide,
    hideScrollbar,
    lastSplit,
    layoutDivById,
    moveFocus,
    nextSplit,
    only,
    previousSplit,
    resetResizing,
    resetScrollbarTimer,
    resize,
    restartSuspendTimeouts,
    rotateForward,
    rotateReverse,
    setLastUsedTab,
    showScrollbar,
    switchView,
    toTop
}
