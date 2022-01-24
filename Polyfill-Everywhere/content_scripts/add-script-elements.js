var debug      = false
var parentNode = null

var getParentNode = function() {
  if (!parentNode) {
    parentNode = window.document.getElementsByTagName('head')[0]
  }
  if (!parentNode && window.document.documentElement) {
    parentNode = window.document.createElement('head')
    window.document.documentElement.appendChild(parentNode)
  }
}

var add_remote_script_element = function(url) {
  getParentNode()
  if (!parentNode) return

  var el = window.document.createElement('script')
  el.setAttribute('src', url)
  parentNode.appendChild(el)
}

var add_remote_script_elements = function(urls) {
  for (var i=0; i < urls.length; i++) {
    add_remote_script_element(urls[i])
  }
}

var add_embedded_script_element = function(path) {
  var url = chrome.runtime.getURL(path)
  add_remote_script_element(url)
}

var add_embedded_script_elements = function(paths) {
  for (var i=0; i < paths.length; i++) {
    add_embedded_script_element(paths[i])
  }
}

var add_inline_script_element = function(text) {
  getParentNode()
  if (!parentNode) return

  var el = window.document.createElement('script')
  el.innerHTML = text
  parentNode.appendChild(el)
}

// -----------------------------------------------------------------------------
// https://github.com/zloirock/core-js
// https://cdnjs.com/libraries/core-js

/*
add_remote_script_elements([
  'https://cdnjs.cloudflare.com/ajax/libs/core-js/3.20.3/minified.min.js'
])
*/

add_embedded_script_elements([
  'js/core-js.js'
])

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
