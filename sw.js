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
  },
  {
    "url": "pwa-maskable-512x512.png",
    "revision": "3da65c71ddece381bd7e7c3ce4c1b008"
  },
  {
    "url": "pwa-512x512.png",
    "revision": "3da65c71ddece381bd7e7c3ce4c1b008"
  },
  {
    "url": "pwa-192x192.png",
    "revision": "ab98eb869c4008643d2ad349e91d66a8"
  },
  {
    "url": "page_images.json",
    "revision": "f96f8cd40cec89d800abf22a84b880e2"
  },
  {
    "url": "manifest.json",
    "revision": "b75bcd0345d1946fd12d2290f655b21c"
  },
  {
    "url": "logo-lome-logement.png",
    "revision": "107b8ad2836c1e4d66101ffc43f8aa6b"
  },
  {
    "url": "index.html",
    "revision": "d43c2955c541c941755954bfb0178ba1"
  },
  {
    "url": "index-50c5a9e2.js",
    "revision": "50c5a9e29c94b2a85cbe812d89887877"
  },
  {
    "url": "index-BuEEFDxi.css",
    "revision": "88e695275ed95f4ef7f063e320559670"
  },
  {
    "url": "icon.svg",
    "revision": "a873a78047c356d8347b3b8ec4c3ca7c"
  },
  {
    "url": "favicon.ico",
    "revision": "f55468a23b36bf4cc2ffffc4648bf191"
  },
  {
    "url": "apple-touch-icon.png",
    "revision": "06f3f7660d790a37df184e753813de2a"
  },
  {
    "url": "robots.txt",
    "revision": "6ed1a9879d57bbb6da66e77cbe21c130"
  },
  {
    "url": "sitemap.xml",
    "revision": "028bf4952e0645e43d5b567a96579916"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "7fc210d9aa7afcd57e8956cb08b04390"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
