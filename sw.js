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
    "revision": "e94eafae236d96cce156b84bc80133c6"
  }, {
    "url": "guide-locataire.html",
    "revision": "73d86adc7a5ea4e20bb7201f9fe1d49e"
  }, {
    "url": "guide-agent.html",
    "revision": "44b6246610d3dd0a26f2c92f0cd9733e"
  }, {
    "url": "mentions-legales.html",
    "revision": "2c831ed01d62f54502aa65e5694c295c"
  }, {
    "url": "conditions.html",
    "revision": "dd28ebb0fd63809ea972a42395026efb"
  }, {
    "url": "confidentialite.html",
    "revision": "47949d28271a5140da0a048a9f510b65"
  }, {
    "url": "suppression-donnees.html",
    "revision": "0253e4e26ac3a6372133f7ada41a9304"
  }, {
    "url": "faq.html",
    "revision": "7e435281159e0268d2dd92be41e26dce"
  }, {
    "url": "contact.html",
    "revision": "37ddad52372dc3d5bf21509ff3674159"
  }, {
    "url": "index.html",
    "revision": "fbb4e649968b239e26cf8858d0fb43dd"
  }, {
    "url": "index-pnSFC0dR.css",
    "revision": "c773adbaf0dc9b7c6136c520d6772f43"
  }, {
    "url": "index-qjtYt8mb.js",
    "revision": "d3f7f51941da0f18b78a2c45e98d7774"
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
