import { App, toWikiText } from "../../data/template/utilities";
import { templateData } from "../templateData";
import { getLocalizedValue } from "../getLocalizedValue";
import { equalsIgnoreCase, equalsYes } from "../utilities/string";

function isUnknown(value: string | string[] | undefined): value is undefined {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return true;
    } else if (value.length === 2) {
      return (
        equalsIgnoreCase(value[0], "yes") && equalsIgnoreCase(value[1], "no")
      );
    }
    return false;
  }

  return !value;
}

export function toWikiTable(
  apps: App[],
  params: {
    label: string | undefined;
    description: string | undefined;
    hasValue: (app: App) => boolean;
    notNo?: (app: App) => boolean;
    renderToWiki: (app: App) => string | undefined;
    more?: boolean;
  }[],
  lang: string
) {
  // Filter params with none values or all no
  params = params
    .filter((p) =>
      apps.some((app) => p.hasValue(app) && (!p.notNo || p.notNo(app)))
    )
    .filter((e) => e);

  const more = params.some((p) => p.more);
  const appWithFields = apps
    .filter((app) =>
      params.some((p) => p.hasValue(app) && (!p.notNo || p.notNo(app)))
    )
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

  let rows = params.map((p) => {
    return `! title="${p.description}" |${p.label}
${appWithFields
  .map((app) => {
    const value = p.renderToWiki(app) || "";
    return `| title="${p.label}" ${
      value.startsWith("{{no") ||
      value.startsWith("{{yes") ||
      value.startsWith("{{free") ||
      value.startsWith("style=")
        ? ""
        : "|"
    } ${value}\n`;
  })
  .join("")}`;
  });

  const wikiTable = `<div style="overflow-x:auto;max-width:100%">
{| class="wikitable sticky" style="font-size: 85%; text-align: center; margin-bottom: 0;"
|+
! title="${getLocalizedValue(
    templateData.params["name"].description,
    lang
  )}" |${getLocalizedValue(templateData.params["name"].label, lang)}
${appWithFields
  .map((app) => {
    const wiki =
      app.source.find((s) => s.name === "Software")?.wiki ||
      app.source.find((s) => s.name === "Layer")?.wiki;

    return `! style="min-width: ${more ? 160 : 120}px" |[[${toWikiValue(
      wiki || app.name
    )}|${toWikiValue(app.name)}]]\n`;
  })
  .join("")}|-
${rows.join("|-\n")}|}
</div>
[[Category:Software list]]
<p style="font-size:80%">{{#switch: {{{1|{{{lang}}}}}}
| de = Diese Tabelle wurde vom [${
    document.location.href
  } OSM Apps Catalog] am ${new Date().toISOString().substring(0, 10)} generiert.
| #default = This table was generated by the [${
    document.location.href
  } OSM Apps Catalog] at ${new Date().toISOString().substring(0, 10)}.
}}</p>`;
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
    } else if (equalsIgnoreCase(value, "none")) {
      return "{{no|none}}";
    }
    return toWikiText(value);
  }

  return value.map((v) => toWikiValue(v)).join(", ");
}
