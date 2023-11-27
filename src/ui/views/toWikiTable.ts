import { App } from "../../data/template/utilities";
import { templateData } from "../templateData";
import { getLocalizedValue } from "../getLocalizedValue";
import { equalsIgnoreCase, equalsYes } from "../utilities/string";

function isUnknown(value: string | string[] | undefined): value is undefined {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return !value;
}

export function toWikiTable(
  apps: App[],
  params: {
    label: string| undefined;
    description: string| undefined;
    hasValue: (app: App) => boolean;
    notNo: (app: App) => boolean;
    renderToHtml: (app: App) => string | undefined;
    renderToWiki: (app: App) => string | undefined;
  }[],
  lang: string
) {
  const appWithFields = apps
    .filter((app) => params.some((p) => p.hasValue(app)))
    .sort((a, b) => {
      const nameA = a.name.toUpperCase() || "";
      const nameB = b.name.toUpperCase() || "";
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

  let rows = params
    .map((p) => {
      if (!appWithFields.some((app) => p.hasValue(app) && p.notNo(app))) {
        return undefined;
      }

      return `! title="${p.description}" |${p.label}
${appWithFields.map((app) => `|${p.renderToWiki(app)}\n`).join("")}`;
    })
    .filter((e) => e);

  const wikiTable = `<div style="overflow-x:auto;max-width:100%">
{| class="wikitable sticky" style="font-size: 85%; text-align: center;"
|+
! title="${getLocalizedValue(
    templateData.params["name"].description,
    lang
  )}" |${getLocalizedValue(templateData.params["name"].label, lang)}
${appWithFields.map((app) => `!${app.name || "{{?}}"}\n`).join("")}|-
${rows.join("|-\n")}|}
</div>`;
  return wikiTable;
}

export function toWikiValue(value: string | string[] | undefined): string {
  if (isUnknown(value)) {
    return "{{?}}";
  }

  if (typeof value === "string") {
    if (equalsYes(value)) {
      return "{{yes}}";
    } else if (equalsIgnoreCase(value, "no")) {
      return "{{no}}";
    }
    return value;
  }

  return value.map((v) => toWikiValue(v)).join(", ");
}
