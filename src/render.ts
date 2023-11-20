// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

import { createElement, getHtmlElement } from "./utilities/html";
import { App } from "./template/utilities";
import { textToColor } from "./utilities/string";

export function render(app: App) {
  const element = createElement(
    "div",
    `<div class="header">
        <div class="name">${
          app.website
            ? `<a href="${app.website}" target="_blank"><span itemprop="name">${app.name}</span></a>`
            : `<span itemprop="name">${app.name}</span>`
        }</div>
        ${
          app.website
            ? `<a href="${app.website}" target="_blank">${renderImage(app)}</a>`
            : renderImage(app)
        }
      </div>
      <div class="description"><span itemprop="description">${
        app.description
      }</span> ${
      app.documentation
        ? `<a href="${app.documentation}" target="_blank">Documentation</a>`
        : ""
    }</div>
      ${
        app.website
          ? `<a class="link" href="${app.website}" target="_blank" title="Website" itemprop="url"><i class="far fa-map"></i></a>`
          : ""
      }

      ${
        app.install.asin
          ? `<a class="link" href="https://www.amazon.com/dp/${app.install.asin}" target="_blank" title="Amazon Appstore" itemprop="installUrl"><i class="fab fa-amazon"></i></a>`
          : ""
      }
      ${
        app.install.fDroidID
          ? `<a class="link" href="https://f-droid.org/repository/browse/?fdid=${app.install.fDroidID}" target="_blank" title="F-Droid" itemprop="installUrl"><i class="fab fa-android"></i></a>`
          : ""
      }
      ${
        app.install.googlePlayID
          ? `<a class="link" href="https://play.google.com/store/apps/details?id=${app.install.googlePlayID}" target="_blank" title="Google Play" itemprop="installUrl"><i class="fab fa-google-play"></i></a>`
          : ""
      }
      ${
        app.install.huaweiAppGalleryID
          ? `<a class="link" href="https://appgallery.huawei.com/#/app/${app.install.huaweiAppGalleryID}" target="_blank" title="Huawei App Gallery" itemprop="installUrl"><i class="fas fa-shopping-bag"></i></a>`
          : ""
      }
      ${
        app.install.appleStoreID
          ? `<a class="link" href="https://itunes.apple.com/app/${
              app.install.appleStoreID.toUpperCase().startsWith("ID")
                ? app.install.appleStoreID
                : `id${app.install.appleStoreID}`
            }" target="_blank" title="iTunes App Store" itemprop="installUrl"><i class="fab fa-app-store-ios"></i></a>`
          : ""
      }
      ${
        app.install.macAppStoreID
          ? `<a class="link" href="https://itunes.apple.com/app/${
              app.install.macAppStoreID.toUpperCase().startsWith("ID")
                ? app.install.macAppStoreID
                : `id${app.install.macAppStoreID}`
            }" target="_blank" title="Mac App Store" itemprop="installUrl"><i class="fab fa-app-store"></i></a>`
          : ""
      }
      ${
        app.install.microsoftAppID
          ? `<a class="link" href="http://www.windowsphone.com/s?appid=${app.install.microsoftAppID}" target="_blank" title="Microsoft Store" itemprop="installUrl"><i class="fab fa-microsoft"></i></a>`
          : ""
      }
      <div class="topics" itemprop="applicationCategory" content="${[
        ...["Map"],
        ...app.topics,
      ].join(", ")}">${app.topics
      .map((t) => {
        const background = textToColor(t);

        const yiq =
          (background.r * 299 + background.g * 587 + background.b * 114) / 1000;

        return `<span class="topic" style="background: rgb(${background.r},${
          background.g
        },${background.b}); color:${
          yiq >= 128 ? "black" : "white"
        };">${t}</span>`;
      })
      .join("")}</div>

            <a class="more-infos-button" href="#">More <i class="fas fa-angle-down"></i></a>
            <div class="more-infos" style="display:none;">
        <div class="more-infos-title">Informations</div>
        ${
          app.author
            ? `<div class="more-info">
          <span class="more-info-title">Author</span> <span class="more-info-text" itemprop="author">${app.author}</span>
        </div>`
            : ""
        }
        ${
          app.platform.length > 0
            ? `<div class="more-info">
          <span class="more-info-title">Platforms</span> <span class="more-info-text" itemprop="operatingSystem">${app.platform.join(
            ", "
          )}</span>
        </div>`
            : ""
        }
        ${
          app.lastRelease
            ? `<div class="more-info">
          <span class="more-info-title">Last release</span> <span class="more-info-text" itemprop="softwareVersion">${app.lastRelease}</span>
        </div>`
            : ""
        }
        ${
          app.languagesUrl
            ? `<a class="more-info" href="${app.languagesUrl}" target="_blank">
                <span class="more-info-title">Languages</span> <span class="more-info-text">${
                  app.languages.length > 0
                    ? app.languages.join(", ")
                    : `<i class="fas fa-language"></i>`
                }</span>
              </a>`
            : app.languages.length > 0
            ? `<div class="more-info">
          <span class="more-info-title">Languages</span> <span class="more-info-text">${app.languages.join(
            ", "
          )}</span>
        </div>`
            : ""
        }
        ${
          app.license
            ? `<div class="more-info">
          <span class="more-info-title">License</span> <span class="more-info-text" itemprop="license">${app.license}</span>
        </div>`
            : ""
        }
        ${
          app.sourceCode
            ? `<a class="more-info" href="${app.sourceCode}" target="_blank">
          <span class="more-info-title">Source code</span> <span class="more-info-text"><i class="fas fa-code"></i></span>
        </a>`
            : ""
        }
        <div class="more-info">
        <span class="more-info-title">Source</span> <span class="more-info-text">${app.source
          .map((s) => `<a href="${s.url}" target="_blank">${s.name}</a>`)
          .join(", ")}</span>
        </div>
        `,
    ["app"]
  );
  element.setAttribute("itemscope", "");
  element.setAttribute("itemtype", "https://schema.org/SoftwareApplication");

  const moreButton = element.querySelector(
    ".more-infos-button"
  ) as HTMLButtonElement;

  const moreInfos = element.querySelector(".more-infos") as HTMLElement;

  moreButton?.addEventListener("click", (ev) => {
    moreButton?.setAttribute("style", "display: none;");
    moreInfos?.setAttribute("style", "");

    ev.preventDefault();
  });

  getHtmlElement("#list").appendChild(element);
}

function renderImage(obj: App) {
  const defaultImage =
    "https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png";

  if (obj.images.length > 0) {
    return `<img class="img" src="${defaultImage}" dynamic-src="${obj.images.join(
      " "
    )} ${defaultImage}"/>`;
  } else {
    return `<img class="img" style="${obj.filter}" src="${defaultImage}"/>`;
  }
}
