/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
;(function (window) {
  'use strict'

  let document = window.document

  let loadCSS = function (href, options) {
    options = options || Object.create(null)

    let attributes = options.attributes || Object.create(null)
    let media = options.media || 'all'

    let appendTo = options.appendTo
    let insertBefore = options.insertBefore

    if (!insertBefore && !appendTo) {
      appendTo = (document.documentElement.lastChild)
    }

    let stylesheetLink = document.createElement('link')
    let linkedStylesheets = document.styleSheets

    for (let attributeName in attributes) {
      if (attributes.hasOwnProperty(attributeName)) {
        stylesheetLink.setAttribute(attributeName, attributes[attributeName])
      }
    }

    stylesheetLink.rel = 'stylesheet'
    stylesheetLink.href = href
    let resolvedHref = stylesheetLink.href

    stylesheetLink.media = 'only x'

    onBody(function () {
      if (appendTo) {
        appendTo.appendChild(stylesheetLink)
      } else {
        insertBefore.parentNode.insertBefore(stylesheetLink, insertBefore)
      }
    })

    stylesheetLink.onloadcsslinked = onlink
    onlink(activateStylesheet)

    return stylesheetLink

    function onlink(loadEventHandler) {
      let i = linkedStylesheets.length

      while (i--) {
        if (linkedStylesheets[i].href === resolvedHref) {
          loadEventHandler()
          return
        }
      }

      setTimeout(function () {
        onlink(loadEventHandler)
      })
    }

    function activateStylesheet() {
      stylesheetLink.media = media
    }
  }

  function onBody(cb) {
    if (document.body) {
      return cb()
    }

    setTimeout(function () {
      onBody(cb)
    })
  }

  window.loadCSS = loadCSS
})(typeof global !== 'undefined' ? global : this)
