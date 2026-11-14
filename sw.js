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
    "revision": "4738e9ab12c2b30e9010c76805c05020"
  }, {
    "url": "guide-locataire.html",
    "revision": "353668b1eb92375057edc28309e25d48"
  }, {
    "url": "guide-agent.html",
    "revision": "2d0622dcb46be8db8b406e3f2abcf4f7"
  }, {
    "url": "conditions.html",
    "revision": "ac20ae864b5f37ff509c897cbb502c3a"
  }, {
    "url": "confidentialite.html",
    "revision": "d97260a3a9a2a44a845097b149f4b268"
  }, {
    "url": "suppression-donnees.html",
    "revision": "9486f247d513f888e0b1c1da64034906"
  }, {
    "url": "faq.html",
    "revision": "d2556e328417d5bb76e2eca9c68ef919"
  }, {
    "url": "contact.html",
    "revision": "d20d3f42714e610e06549319769efb03"
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
    "revision": "95699d9eaf36e55d3df1b158704d7191"
  }, {
    "url": "index-pnSFC0dR.css",
    "revision": "c773adbaf0dc9b7c6136c520d6772f43"
  }, {
    "url": "index-7raqvtTx.js",
    "revision": "a3bdf778a0d7f31c45c8249a16652502"
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
    "revision": "4d3db3b957c16ad8f229ecfed66d7921"
  }, {
    "url": "manifest.webmanifest",
    "revision": "80a41aaed025a4f3aa6aae858cf3c51d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {denylist: [/^\/(a-propos|faq|guide-locataire|guide-agent|contact|conditions|confidentialite|suppression-donnees)(\.html)?$/]}));

}));
