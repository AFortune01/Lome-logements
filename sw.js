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
    "url": "manifest.json",
    "revision": "f58f5f66fe9318790f076b0cc5d46d3e"
  }, {
    "url": "logo-lome-logement.png",
    "revision": "fb70a04d8d77e6f0a090f4f398b2cbc3"
  }, {
    "url": "index.html",
    "revision": "b3baf299156f9b151e00b541a4698610"
  }, {
    "url": "index-pnSFC0dR.css",
    "revision": "c773adbaf0dc9b7c6136c520d6772f43"
  }, {
    "url": "index-Drb6OWnS.js",
    "revision": "e83edc5ec9db05841c92c3486f997fed"
  }, {
    "url": "icon.svg",
    "revision": "a873a78047c356d8347b3b8ec4c3ca7c"
  }, {
    "url": "favicon.ico",
    "revision": "06727b59b9bbbd40404f047874e78439"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "026a4a1fc32bce801df4c56a5d987dcf"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "026a4a1fc32bce801df4c56a5d987dcf"
  }, {
    "url": "favicon.ico",
    "revision": "06727b59b9bbbd40404f047874e78439"
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
    "revision": "6ed1a9879d57bbb6da66e77cbe21c130"
  }, {
    "url": "sitemap.xml",
    "revision": "028bf4952e0645e43d5b567a96579916"
  }, {
    "url": "manifest.webmanifest",
    "revision": "58b25ca87307a65b01ff8464b730d042"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
