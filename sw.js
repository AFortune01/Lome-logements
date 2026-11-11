/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "c40617deae5bd700cc537655db664728"
  }, {
    "url": "pwa-512x512.png",
    "revision": "c40617deae5bd700cc537655db664728"
  }, {
    "url": "pwa-192x192.png",
    "revision": "a90906d56caf488a20a7b2c7a58960f1"
  }, {
    "url": "logo-lome-logement.png",
    "revision": "fb70a04d8d77e6f0a090f4f398b2cbc3"
  }, {
    "url": "a-propos.html",
    "revision": "5138b62420ca2b2d35b7bc1aafe72863"
  }, {
    "url": "guide-locataire.html",
    "revision": "c94dc7d7e68d88a184c442b128c9587c"
  }, {
    "url": "guide-agent.html",
    "revision": "aac84372a7ba9d0108e52adfe8c01c26"
  }, {
    "url": "mentions-legales.html",
    "revision": "8a835776f5d368e25b66877a456dedc9"
  }, {
    "url": "conditions.html",
    "revision": "194ea085583f8595a1933de11415b89f"
  }, {
    "url": "confidentialite.html",
    "revision": "9bea59aa89d2b369c62c803922d63beb"
  }, {
    "url": "suppression-donnees.html",
    "revision": "2a5473b125314bd1be74ed0292972775"
  }, {
    "url": "faq.html",
    "revision": "e0aa4b64a02139603ff495104c8c8f69"
  }, {
    "url": "contact.html",
    "revision": "1c85181e02a85e4abe9fb8ac201bb4aa"
  }, {
    "url": "favicon-48x48.png",
    "revision": "3e2d792d7d15fbc33bab9ffe99710f04"
  }, {
    "url": "favicon-96x96.png",
    "revision": "adecb6f113e48b6bcd568a09b411af7e"
  }, {
    "url": "favicon-192x192.png",
    "revision": "b35db618bd2a11d99049dedf9f325793"
  }, {
    "url": "index.html",
    "revision": "510d5e2c411339bb816d2e0b5de367e3"
  }, {
    "url": "index-pnSFC0dR.css",
    "revision": "c773adbaf0dc9b7c6136c520d6772f43"
  }, {
    "url": "index-EANRSFpY.js",
    "revision": "8780b6089a97e1569478d57ffd2caf16"
  }, {
    "url": "icon.svg",
    "revision": "a873a78047c356d8347b3b8ec4c3ca7c"
  }, {
    "url": "favicon.ico",
    "revision": "afeb3fafff32b07499ad39cab88182e2"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "026a4a1fc32bce801df4c56a5d987dcf"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "026a4a1fc32bce801df4c56a5d987dcf"
  }, {
    "url": "favicon.ico",
    "revision": "afeb3fafff32b07499ad39cab88182e2"
  }, {
    "url": "icon.svg",
    "revision": "a873a78047c356d8347b3b8ec4c3ca7c"
  }, {
    "url": "logo-lome-logement.png",
    "revision": "fb70a04d8d77e6f0a090f4f398b2cbc3"
  }, {
    "url": "pwa-192x192.png",
    "revision": "a90906d56caf488a20a7b2c7a58960f1"
  }, {
    "url": "pwa-512x512.png",
    "revision": "c40617deae5bd700cc537655db664728"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "c40617deae5bd700cc537655db664728"
  }, {
    "url": "robots.txt",
    "revision": "740bcf1e48fdf438e7e8678fbf5a8cd7"
  }, {
    "url": "sitemap.xml",
    "revision": "cd924f95594d297177ca910283941bd8"
  }, {
    "url": "manifest.webmanifest",
    "revision": "9830e30f2b0eab67c18b07f994b196ba"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {denylist: [/^\/(a-propos|faq|guide-locataire|guide-agent|contact|mentions-legales|conditions|confidentialite|suppression-donnees)(\.html)?$/]}));

}));
