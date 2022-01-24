// ==UserScript==
// @name         Polyfill Everywhere
// @description  Inject the 'core-js' ES6+ polyfill library into all pages on all websites.. to make older browsers compatible with websites that require modern javascript features.
// @version      1.0.0
// @include      *
// @icon         https://github.com/google/material-design-icons/raw/6ebe181c634f9ced978b526e13db6d7d5cb1c1ba/png/social/hive/materialiconsoutlined/48dp/2x/outline_hive_black_48dp.png
// @run-at       document-start
// @homepage     https://github.com/warren-bank/crx-polyfill-everywhere/tree/greasemonkey-userscript
// @supportURL   https://github.com/warren-bank/crx-polyfill-everywhere/issues
// @downloadURL  https://github.com/warren-bank/crx-polyfill-everywhere/raw/greasemonkey-userscript/greasemonkey-userscript/polyfill-everywhere.user.js
// @updateURL    https://github.com/warren-bank/crx-polyfill-everywhere/raw/greasemonkey-userscript/greasemonkey-userscript/polyfill-everywhere.user.js
// @namespace    warren-bank
// @author       Warren Bank
// @copyright    Warren Bank
// ==/UserScript==

var debug      = false
var parentNode = null

var getParentNode = function() {
  if (!parentNode) {
    parentNode = unsafeWindow.document.getElementsByTagName('head')[0]
  }
  if (!parentNode && unsafeWindow.document.documentElement) {
    parentNode = unsafeWindow.document.createElement('head')
    unsafeWindow.document.documentElement.appendChild(parentNode)
  }
}

var add_remote_script_element = function(url) {
  getParentNode()
  if (!parentNode) return

  var el = unsafeWindow.document.createElement('script')
  el.setAttribute('src', url)
  parentNode.appendChild(el)
}

var add_inline_script_element = function(text) {
  getParentNode()
  if (!parentNode) return

  var el = unsafeWindow.document.createElement('script')
  el.innerHTML = text
  parentNode.appendChild(el)
}

// -----------------------------------------------------------------------------
// https://github.com/zloirock/core-js
// https://cdnjs.com/libraries/core-js

add_remote_script_element('https://cdnjs.cloudflare.com/ajax/libs/core-js/3.20.3/minified.min.js')

// -----------------------------------------------------------------------------
// optional dubug output:

if (debug) {
  add_inline_script_element(
    [
      'console.log("Uint8Array =", window.Uint8Array)',
      'console.log("Symbol     =", window.Symbol)',
      'console.log("WeakMap    =", window.WeakMap)',

      'window.setTimeout(',
      '  function(){',
      '    console.log("Uint8Array =", window.Uint8Array)',
      '    console.log("Symbol     =", window.Symbol)',
      '    console.log("WeakMap    =", window.WeakMap)',
      '  },',
      '  1000',
      ')'
    ].join("\n")
  )
}
