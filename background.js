"use strict";

/*
Rewrite the HTTP-Referer header to something conditional on origin.
*/
function rewriteRefererHeader(e) {
  console.error("KFF: in rewriteRefererHeader()");
  for (var header of e.requestHeaders) {
    if (header.name.toLowerCase() === "http-referer") {
      header.value = "http://example.com/fish";
    }
  }
  return {requestHeaders: e.requestHeaders};
}

/*
Add rewriteRefererHeader as a listener to onBeforeSendHeaders,
only for the target page.

Make it "blocking" so we can modify the headers.
*/
browser.webRequest.onBeforeSendHeaders.addListener(
    // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Match_patterns
    rewriteRefererHeader, {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]);

: