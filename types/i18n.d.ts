export type TranslationKeys =
    | "actions.alreadyRecording"
    | "actions.command.failed"
    | "actions.command.success"
    | "actions.command.successWithOutput"
    | "actions.rss.clipboard"
    | "actions.rss.header"
    | "actions.rss.notFound"
    | "actions.toc.title"
    | "actions.toc.top"
    | "actions.translations.errors.deepl"
    | "actions.translations.errors.general"
    | "actions.translations.errors.libretranslate"
    | "adblocker.aborted"
    | "adblocker.failed"
    | "adblocker.missing"
    | "adblocker.updated"
    | "adblocker.updating"
    | "commands.arguments.folderMissing"
    | "commands.buffers"
    | "commands.clear.argCount"
    | "commands.clear.intervalInvalid"
    | "commands.clear.intervalMissing"
    | "commands.clear.typeInvalid"
    | "commands.clear.typeMissing"
    | "commands.close.noMatch"
    | "commands.close.range"
    | "commands.colorscheme.argCount"
    | "commands.colorscheme.current"
    | "commands.colorscheme.missing"
    | "commands.command.builtin"
    | "commands.command.combined"
    | "commands.command.duplicate"
    | "commands.command.list"
    | "commands.command.listSingle"
    | "commands.command.missing"
    | "commands.command.none"
    | "commands.command.slashes"
    | "commands.command.special"
    | "commands.delcommand.argCount"
    | "commands.delcommand.missing"
    | "commands.deletepointerpos.overridePath"
    | "commands.deletepointerpos.toofew"
    | "commands.deletepointerpos.toomany"
    | "commands.deletescrollpos.overridePath"
    | "commands.deletescrollpos.toofew"
    | "commands.deletescrollpos.toomany"
    | "commands.delmarks.argCount"
    | "commands.delmarks.keyname"
    | "commands.devtools.argCount"
    | "commands.devtools.invalid"
    | "commands.execute.ambiguous"
    | "commands.execute.argCount"
    | "commands.execute.invalidJSON"
    | "commands.execute.noConfirm"
    | "commands.execute.noRange"
    | "commands.execute.notFound"
    | "commands.execute.unmatched"
    | "commands.externalcommand.missing"
    | "commands.help.argCount"
    | "commands.hide.range"
    | "commands.hide.visible"
    | "commands.makedefault.failed"
    | "commands.makedefault.installed"
    | "commands.makedefault.other"
    | "commands.marks.argCount"
    | "commands.marks.list"
    | "commands.marks.noKey"
    | "commands.marks.none"
    | "commands.marks.url"
    | "commands.mkviebrc.argCount"
    | "commands.mkviebrc.invalid"
    | "commands.mute.argCount"
    | "commands.mute.noMatch"
    | "commands.mute.range"
    | "commands.pin.argCount"
    | "commands.pin.noMatch"
    | "commands.pin.range"
    | "commands.pointerpos.argCount"
    | "commands.pointerpos.list"
    | "commands.pointerpos.location"
    | "commands.pointerpos.noKey"
    | "commands.pointerpos.none"
    | "commands.ranges.combined"
    | "commands.ranges.commas"
    | "commands.ranges.flags"
    | "commands.ranges.indexOrSearch"
    | "commands.ranges.invalid"
    | "commands.restoremark.argCount"
    | "commands.restoremark.keyname"
    | "commands.restoremark.position"
    | "commands.restorepointerpos.argCount"
    | "commands.restorepointerpos.keyname"
    | "commands.restorescrollpos.argCount"
    | "commands.restorescrollpos.keyname"
    | "commands.screencopy.argCount"
    | "commands.screencopy.dimensions"
    | "commands.screenshot.argCount"
    | "commands.screenshot.dimensions"
    | "commands.screenshot.failed"
    | "commands.screenshot.success"
    | "commands.scriptnames.argType"
    | "commands.scriptnames.editor"
    | "commands.scriptnames.noArgs"
    | "commands.scriptnames.notFound"
    | "commands.scriptnames.singleArg"
    | "commands.scrollpos.argCount"
    | "commands.scrollpos.list"
    | "commands.scrollpos.noKey"
    | "commands.scrollpos.none"
    | "commands.scrollpos.pixels"
    | "commands.settings.invalidJSON"
    | "commands.settings.invalidStructure"
    | "commands.settings.listSingle"
    | "commands.settings.missing"
    | "commands.settings.noChanges"
    | "commands.settings.noFlipping"
    | "commands.settings.noModify"
    | "commands.settings.optionsList"
    | "commands.settings.reserved"
    | "commands.source.absolute"
    | "commands.source.argCount"
    | "commands.source.missing"
    | "commands.source.readError"
    | "commands.source.recursive"
    | "commands.source.startup"
    | "commands.split.range"
    | "commands.split.visible"
    | "commands.suspend.range"
    | "commands.suspend.visible"
    | "commands.translatepage.apiKey"
    | "commands.translatepage.argCount"
    | "commands.translatepage.language"
    | "commands.write.argCount"
    | "commands.write.combined"
    | "commands.write.failed"
    | "commands.write.success"
    | "commands.write.type"
    | "contextmenu.general.copy"
    | "contextmenu.general.copyImage"
    | "contextmenu.general.copyLink"
    | "contextmenu.general.download"
    | "contextmenu.general.execute"
    | "contextmenu.general.external"
    | "contextmenu.general.go"
    | "contextmenu.general.navigate"
    | "contextmenu.general.newtab"
    | "contextmenu.general.search"
    | "contextmenu.general.split"
    | "contextmenu.general.vsplit"
    | "contextmenu.groups.audio"
    | "contextmenu.groups.frame"
    | "contextmenu.groups.general"
    | "contextmenu.groups.image"
    | "contextmenu.groups.link"
    | "contextmenu.groups.suggestions"
    | "contextmenu.groups.text"
    | "contextmenu.groups.video"
    | "contextmenu.tab.add"
    | "contextmenu.tab.addHere"
    | "contextmenu.tab.cloneEdit"
    | "contextmenu.tab.cloneGo"
    | "contextmenu.tab.close"
    | "contextmenu.tab.copy"
    | "contextmenu.tab.hideControls"
    | "contextmenu.tab.inspect"
    | "contextmenu.tab.loop"
    | "contextmenu.tab.mute"
    | "contextmenu.tab.next"
    | "contextmenu.tab.pause"
    | "contextmenu.tab.pin"
    | "contextmenu.tab.play"
    | "contextmenu.tab.playbackDown"
    | "contextmenu.tab.playbackUp"
    | "contextmenu.tab.previous"
    | "contextmenu.tab.refresh"
    | "contextmenu.tab.reopen"
    | "contextmenu.tab.save"
    | "contextmenu.tab.showControls"
    | "contextmenu.tab.suspend"
    | "contextmenu.tab.unloop"
    | "contextmenu.tab.unmute"
    | "contextmenu.tab.unpin"
    | "contextmenu.tab.unsuspend"
    | "contextmenu.tab.volumeDown"
    | "contextmenu.tab.volumeUp"
    | "contextmenu.text.copy"
    | "contextmenu.text.cut"
    | "contextmenu.text.paste"
    | "contextmenu.text.pasteGo"
    | "contextmenu.text.selectAll"
    | "downloads.failed"
    | "downloads.finished"
    | "downloads.started"
    | "mappings.defaultMapping"
    | "mappings.defaultMappingForKey"
    | "mappings.errors.overwritten"
    | "mappings.errors.unmapArgCount"
    | "mappings.errors.unmatched"
    | "mappings.errors.unsupported"
    | "mappings.list"
    | "mappings.noMappings"
    | "mappings.noMappingsForKey"
    | "pages.cookies.empty"
    | "pages.cookies.filterEmpty"
    | "pages.cookies.filterPlaceholder"
    | "pages.cookies.loading"
    | "pages.cookies.title"
    | "pages.downloads.clickToOpen"
    | "pages.downloads.loading"
    | "pages.downloads.nothing"
    | "pages.downloads.states.cancelled"
    | "pages.downloads.states.completed"
    | "pages.downloads.states.downloading"
    | "pages.downloads.states.paused"
    | "pages.downloads.states.removed"
    | "pages.downloads.states.waiting_to_start"
    | "pages.downloads.title"
    | "pages.failedload.otherError"
    | "pages.failedload.sslError"
    | "pages.filebrowser.empty"
    | "pages.filebrowser.permissionDenied"
    | "pages.help.examples.chromium"
    | "pages.help.examples.firefox"
    | "pages.help.examples.pentadactyl"
    | "pages.help.examples.qutebrowser"
    | "pages.help.examples.sakakey"
    | "pages.help.examples.surfingkeys"
    | "pages.help.examples.tridactyl"
    | "pages.help.examples.vimium"
    | "pages.help.examples.vimvixen"
    | "pages.help.examples.vivaldi"
    | "pages.help.title"
    | "pages.history.filterEmpty"
    | "pages.history.filterNoResults"
    | "pages.history.filterPlaceholder"
    | "pages.history.loading"
    | "pages.history.perpage"
    | "pages.history.readingProgress"
    | "pages.history.title"
    | "pages.newtab.favorites"
    | "pages.newtab.title"
    | "pages.newtab.topsites"
    | "pages.notifications.clickToOpen"
    | "pages.notifications.empty"
    | "pages.notifications.loading"
    | "pages.notifications.title"
    | "pages.version.alreadyNewer"
    | "pages.version.changelog"
    | "pages.version.checkUpdate"
    | "pages.version.description"
    | "pages.version.discussions"
    | "pages.version.donate"
    | "pages.version.failed"
    | "pages.version.faq"
    | "pages.version.homepage"
    | "pages.version.latest"
    | "pages.version.loading"
    | "pages.version.matrix"
    | "pages.version.newerFound"
    | "pages.version.notChecked"
    | "pages.version.releases"
    | "pages.version.repository"
    | "pages.version.sponsor"
    | "pages.version.telegram"
    | "pages.version.title"
    | "permissions.ask.allowButton"
    | "permissions.ask.body"
    | "permissions.ask.bodyCertificate"
    | "permissions.ask.bodyExternal"
    | "permissions.ask.denyButton"
    | "permissions.ask.label"
    | "permissions.ask.title"
    | "permissions.domainCachedAllowed"
    | "permissions.notify.ask"
    | "permissions.notify.auto"
    | "permissions.notify.global"
    | "permissions.notify.manual"
    | "permissions.notifyLevels.allow"
    | "permissions.notifyLevels.allowfull"
    | "permissions.notifyLevels.allowkind"
    | "permissions.notifyLevels.block"
    | "popups.alert.block"
    | "popups.alert.ok"
    | "popups.alert.title"
    | "popups.confirm.block"
    | "popups.confirm.cancel"
    | "popups.confirm.ok"
    | "popups.confirm.title"
    | "popups.display.audio"
    | "popups.display.currentTab"
    | "popups.display.echo"
    | "popups.display.title"
    | "popups.login.info"
    | "popups.login.password"
    | "popups.login.title"
    | "popups.login.username"
    | "popups.notification.shortcuts"
    | "popups.prompt.block"
    | "popups.prompt.title"
    | "settings.errors.clearhistoryinterval"
    | "settings.errors.container.colorName"
    | "settings.errors.container.colorRegex"
    | "settings.errors.container.colorSeparator"
    | "settings.errors.container.invalidspecial"
    | "settings.errors.container.namesNewtab"
    | "settings.errors.container.namesRegex"
    | "settings.errors.container.namesSeparator"
    | "settings.errors.container.specialchars"
    | "settings.errors.darkreader.blocklistRegex"
    | "settings.errors.darkreader.color"
    | "settings.errors.darkreader.missing"
    | "settings.errors.downloadpathIsFolder"
    | "settings.errors.downloadpathMissing"
    | "settings.errors.favoritepages"
    | "settings.errors.fileload"
    | "settings.errors.followchars.duplicate"
    | "settings.errors.followchars.invalidSet"
    | "settings.errors.followchars.notEnough"
    | "settings.errors.followelement"
    | "settings.errors.invalidScope"
    | "settings.errors.markpersistencetype"
    | "settings.errors.missing"
    | "settings.errors.modifiers"
    | "settings.errors.mouseFeature"
    | "settings.errors.newtaburl"
    | "settings.errors.numberRange"
    | "settings.errors.oneof"
    | "settings.errors.passthrough.keyname"
    | "settings.errors.passthrough.keys"
    | "settings.errors.passthrough.regex"
    | "settings.errors.permission.captureallowed"
    | "settings.errors.permission.hidasked"
    | "settings.errors.permission.mediadevicesasked"
    | "settings.errors.permission.name"
    | "settings.errors.permission.regex"
    | "settings.errors.permission.separator"
    | "settings.errors.permission.serialasked"
    | "settings.errors.permission.usbasked"
    | "settings.errors.redirect.regex"
    | "settings.errors.redirect.separator"
    | "settings.errors.resources.regex"
    | "settings.errors.resources.type"
    | "settings.errors.searchengine.replace"
    | "settings.errors.searchengine.url"
    | "settings.errors.searchwords.duplicate"
    | "settings.errors.searchwords.separator"
    | "settings.errors.searchwords.url"
    | "settings.errors.spelllang"
    | "settings.errors.sponsorblock.color"
    | "settings.errors.sponsorblock.duplicate"
    | "settings.errors.sponsorblock.name"
    | "settings.errors.startuppages.invalidopts"
    | "settings.errors.startuppages.name"
    | "settings.errors.startuppages.toomany"
    | "settings.errors.startuppages.url"
    | "settings.errors.storenewvisits"
    | "settings.errors.suggestorder.duplicateCount"
    | "settings.errors.suggestorder.duplicateSort"
    | "settings.errors.suggestorder.empty"
    | "settings.errors.suggestorder.invalidSort"
    | "settings.errors.suggestorder.tilde"
    | "settings.errors.suggestorder.type"
    | "settings.errors.tocpages"
    | "settings.errors.translateurl"
    | "settings.errors.type"
    | "settings.errors.unchanged"
    | "settings.errors.windowsize.format"
    | "settings.errors.windowsize.minimum"
    | "settings.files.failed"
    | "settings.files.missingloc"
    | "settings.files.success"
    | "util.and"
    | "util.catchphrase"
    | "util.comma"
    | "util.commaSpaced"
    | "util.doubleQuoteEnd"
    | "util.doubleQuoteStart"
    | "util.none"
    | "util.or"
    | "util.singleQuoteEnd"
    | "util.singleQuoteStart"
    | "util.untranslated"
