import { createElement, getHtmlElement } from "./utilities/html";
import { App } from "./transformTemplates";

export function render(obj: App) {
  const defaultImage =
    "https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png";

  const element = createElement(
    "div",
    `<div class="header">
        <div class="name">${
          obj.website
            ? `<a href="${obj.website}" target="_blank">${obj.name}</a>`
            : obj.name
        }</div>
        ${
          obj.website
            ? `<a href="${obj.website}" target="_blank">${
                obj.images.length > 0
                  ? `<img class="img" src="${defaultImage}" dynamic-src="${obj.images.join(
                      " "
                    )} ${defaultImage}"/>`
                  : `<img class="img" src="${defaultImage}"/>`
              }</a>`
            : obj.images.length > 0
            ? `<img class="img" src="${defaultImage}" dynamic-src="${obj.images.join(
                " "
              )} ${defaultImage}"/>`
            : `<img class="img" src="${defaultImage}"/>`
        }
      </div>
      <div class="description">${obj.description} ${
      obj.wiki ? `<a href="${obj.wiki}" target="_blank">Wiki</a>` : ""
    }</div>
      ${
        obj.website
          ? `<a class="link" href="${obj.website}" target="_blank" title="Website"><i class="far fa-map"></i></a>`
          : ""
      }

      ${
        obj.install.asin
          ? `<a class="link" href="https://www.amazon.com/dp/${obj.install.asin}" target="_blank" title="Amazon Appstore"><i class="fab fa-amazon"></i></a>`
          : ""
      }
      ${
        obj.install.bbWorldID
          ? `<a class="link" href="https://appworld.blackberry.com/webstore/content/${obj.install.bbWorldID}/" target="_blank" title="BlackBerry World"><i class="fab fa-blackberry"></i></a>`
          : ""
      }
      ${
        obj.install.fDroidID
          ? `<a class="link" href="https://f-droid.org/repository/browse/?fdid=${obj.install.fDroidID}" target="_blank" title="F-Droid"><i class="fab fa-android"></i></a>`
          : ""
      }
      ${
        obj.install.googlePlayID
          ? `<a class="link" href="https://play.google.com/store/apps/details?id=${obj.install.googlePlayID}" target="_blank" title="Google Play"><i class="fab fa-google-play"></i></a>`
          : ""
      }
      ${
        obj.install.appleStoreID
          ? `<a class="link" href="https://itunes.apple.com/app/${
              obj.install.appleStoreID.toUpperCase().startsWith("ID")
                ? obj.install.appleStoreID
                : `id${obj.install.appleStoreID}`
            }" target="_blank" title="iTunes App Store"><i class="fab fa-app-store-ios"></i></a>`
          : ""
      }
      ${
        obj.install.macAppStoreID
          ? `<a class="link" href="https://itunes.apple.com/app/${
              obj.install.macAppStoreID.toUpperCase().startsWith("ID")
                ? obj.install.macAppStoreID
                : `id${obj.install.macAppStoreID}`
            }" target="_blank" title="Mac App Store"><i class="fab fa-app-store"></i></a>`
          : ""
      }
      ${
        obj.install.microsoftAppID
          ? `<a class="link" href="http://www.windowsphone.com/s?appid=${obj.install.microsoftAppID}" target="_blank" title="Microsoft Store"><i class="fab fa-microsoft"></i></a>`
          : ""
      }

      <div class="topics">${obj.topics
        .map(t => {
          const background = textToColor(t);

          const yiq =
            (background.r * 299 + background.g * 587 + background.b * 114) /
            1000;

          return `<span class="topic" style="background: rgb(${background.r},${
            background.g
          },${background.b}); color:${
            yiq >= 128 ? "black" : "white"
          };">${t}</span>`;
        })
        .join("")}</div>

        ${
          obj.author || obj.platform.length > 0 || obj.languages.length > 0 || obj.sourceCode
            ? `
            <a class="more-infos-button" href="#">More <i class="fas fa-angle-down"></i></a>
            <div class="more-infos" style="display:none;">
        <div class="more-infos-title">Informations</div>
        ${
          obj.author
            ? `<div class="more-info">
          <span class="more-info-title">Author</span> <span class="more-info-text">${obj.author}</span>
        </div>`
            : ""
        }
        ${
          obj.platform.length > 0
            ? `<div class="more-info">
          <span class="more-info-title">Platforms</span> <span class="more-info-text">${obj.platform.join(", ")}</span>
        </div>`
            : ""
        }
        ${
          obj.languages.length > 0
            ? `<div class="more-info">
          <span class="more-info-title">Languages</span> <span class="more-info-text">${obj.languages.join(", ")}</span>
        </div>`
            : ""
        }
        ${
          obj.sourceCode
            ? `<a class="more-info" href="${obj.sourceCode}" target="_blank">
          <span class="more-info-title">Source code</span> <span class="more-info-text"><i class="fas fa-code"></i></span>
        </a>`
            : ""
        }
        </div>`
            : ""
        }

        `,
    ["app"]
  );

  const moreButton = element.querySelector(
    ".more-infos-button"
  ) as HTMLButtonElement;

  const moreInfos = element.querySelector(".more-infos") as HTMLElement;

  moreButton?.addEventListener("click", ev => {
    moreButton?.setAttribute("style", "display: none;");
    moreInfos?.setAttribute("style", "");

    ev.preventDefault();
  });

  getHtmlElement(".apps").appendChild(element);
}

export function textToColor(s: string) {
  let r = 0;
  let g = 0;
  let b = 0;
  for (let i = 0; i < s.length; i++) {
    if (i % 3 === 0) r = (r + s.charCodeAt(i)) % 256;
    else if (i % 3 === 1) g = (g + s.charCodeAt(i)) % 256;
    else b = (b + s.charCodeAt(i)) % 256;
  }
  return { r, g, b };
}
