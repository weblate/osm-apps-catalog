import { toWikimediaUrl } from "./utilities/image";
import { toWikiUrl, toUrl } from "./utilities/url";
import { removeDuplicates } from "./script";

export type App = {
  name: string;
  description: string;
  image: { thumb?: string; orginal?: string };
  website?: string;
  wiki: string;
  sourceCode?: string;
  languages: string[];
  topics: string[];
};

export function transformSoftware(source: { [name: string]: string }) {
  const obj: App = {
    name: source["name"] || "",
    description: processWikiText(source["description"] || ""),
    image: {
      thumb: toWikimediaUrl(source["screenshot"], 250),
      orginal: toWikimediaUrl(source["screenshot"])
    },
    website: toUrl(source["web"]),
    wiki: toWikiUrl(source["wiki"] || source.sourceWiki) || "",
    sourceCode: toUrl(source["repo"] || source["git"] || source["svn"]),
    languages: (source["languages"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .map(extractLanguageCodeFromLocal)
      .filter(v => v)
      .map(v => v.toLowerCase()),
    topics: (source["genre"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(v => v)
      .map(firstLetterToUpperCase)
  };
  obj.topics.push(
    ...(source["platform"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(v => v)
      .map(firstLetterToUpperCase)
  );
  if (
    (source["tracking"] || "") &&
    (source["tracking"] || "").toUpperCase() !== "YES" &&
    (source["tracking"] || "").toUpperCase() !== "NO" &&
    (source["tracking"] || "").toUpperCase() !== "?"
  )
    obj.topics.push(
      ...(source["profiles"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter(v => v)
        .map(firstLetterToUpperCase)
    );

  if (
    (source["accessibility"] || "") &&
    (source["accessibility"] || "").toUpperCase() !== "YES" &&
    (source["accessibility"] || "").toUpperCase() !== "NO" &&
    (source["accessibility"] || "").toUpperCase() !== "?"
  ) {
    obj.topics.push(
      ...(source["accessibility"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter(v => v)
        .map(firstLetterToUpperCase)
    );
    obj.topics.push("Accessibility");
  }
  if ((source["accessibility"] || "").toUpperCase() === "YES")
    obj.topics.push("Accessibility");

  if ((source["tracking"] || "").toUpperCase() === "YES")
    obj.topics.push("Tracking");

  if ((source["monitoring"] || "").toUpperCase() === "YES")
    obj.topics.push("Monitoring ");

  if (
    (source["navigating"] || "").toUpperCase() === "YES" ||
    (source["navToPoint"] || "").toUpperCase() === "YES"
  )
    obj.topics.push("Navigating");

  if (
    (source["routing"] || "").toUpperCase() === "YES" ||
    (source["calculateRoute"] || "").toUpperCase() === "YES" ||
    (source["calculateRouteOffline"] || "").toUpperCase() === "YES"
  )
    obj.topics.push("Routing");

  if ((source["3D"] || "").toUpperCase() === "YES") obj.topics.push("3D");

  if ((source["findLocation"] || "").toUpperCase() === "YES")
    obj.topics.push("Search");
  if ((source["findNearbyPOI"] || "").toUpperCase() === "YES")
    obj.topics.push("POI");

  if (
    (source["addPOI"] || "").toUpperCase() === "YES" ||
    (source["addWay"] || "").toUpperCase() === "YES" ||
    (source["editPOI"] || "").toUpperCase() === "YES" ||
    (source["editTags"] || "").toUpperCase() === "YES" ||
    (source["editGeom"] || "").toUpperCase() === "YES" ||
    (source["editRelations"] || "").toUpperCase() === "YES"
  )
    obj.topics.push("Editor");

  obj.topics = removeDuplicates(obj.topics).sort();

  {
    const name = extractNameWebsiteWiki(source["name"]);
    obj.name = name.name || obj.name;
    obj.website = obj.website || name.website;
    obj.wiki = obj.wiki || name.wiki || "";
  }
  {
    const name = extractNameWebsiteWiki(source["web"]);
    obj.name = obj.name || name.name;
    obj.website = name.website || obj.website;
    obj.wiki = obj.wiki || name.wiki || "";
  }
  {
    const name = extractNameWebsiteWiki(source["wiki"]);
    obj.name = obj.name || name.name;
    obj.website = obj.website || name.website;
    obj.wiki = name.wiki || obj.wiki;
  }
  return obj;
}

export function transformServiceItem(source: { [name: string]: string }) {
  const obj: App = {
    name: source["name"] || "",
    description: processWikiText(source["descr"] || ""),
    image: {
      thumb: toWikimediaUrl(source["image"], 250),
      orginal: toWikimediaUrl(source["image"])
    },
    wiki: toWikiUrl(source.sourceWiki) || "",
    sourceCode: extractWebsite(source["material"]),
    languages: (source["lang"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(extractLanguageCodeFromTemplate)
      .map(trim)
      .filter(v => v)
      .map(v => v.toLowerCase()),
    topics: (source["genre"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(v => v)
      .map(firstLetterToUpperCase)
      .sort()
  };

  let name = extractNameWebsiteWiki(source["name"]);
  obj.name = name.name || obj.name;
  obj.website = name.website;
  obj.wiki = obj.wiki || name.wiki || "";
  return obj;
}

const splitByCommaButNotInsideBraceRegex = /[,;]+(?![^\(]*\))/;

export function containsOfflineLink(value: string) {
  return /<s(trike)?>/gi.test(value);
}

function extractLanguageCodeFromLocal(value: string): string {
  const match = /(\w{2,3}(\-\w{2,4})?)/g.exec(value);

  if (match) return match[1];
  return value;
}

function extractLanguageCodeFromTemplate(value: string): string {
  const match = /:(\w{2})/.exec(value);

  if (match) return match[1];
  return value;
}

function firstLetterToUpperCase(value: string): string {
  return `${value[0].toUpperCase()}${value.slice(1)}`;
}

function trim(value: string): string {
  return value.replace(/^[\.\s]+|[\.\s]+$/gm, "");
}

function extractNameWebsiteWiki(value: string = "") {
  const obj: {
    name: string;
    website?: string;
    wiki?: string;
  } = { name: value };

  {
    const regex = /(\[((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)\])/g;

    const match = regex.exec(value);

    if (match) {
      obj.website = match[2];
      value = value.replace(regex, "").trim();
      if (value) obj.name = value;
    }
  }
  {
    const regex = /(\[((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?) (.*)\])/g;

    const match = regex.exec(value);

    if (match) {
      obj.name = match[6];
      obj.website = match[2];
      value = value.replace(regex, "");
    }
  }
  {
    const regex = /\[\[(.*(?![^\|]))(\|(.*))?\]\]/g;

    const match = regex.exec(value);

    if (match) {
      if (match[3]) obj.name = match[3];
      else obj.name = match[1];
      obj.wiki = toWikiUrl(match[1]);
      value = value.replace(regex, "");
    }
  }

  {
    const regex = /\[\[(.*)\]\]/g;

    const match = regex.exec(value);

    if (match) {
      obj.name = match[1];
      obj.wiki = toWikiUrl(match[1]);
      value = value.replace(regex, "");
    }
  }

  return obj;
}

function extractWebsite(value: string = "") {
  {
    const regex = /(\[((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)\])/g;

    const match = regex.exec(value);

    if (match) {
      return match[2];
    }
  }
  {
    const regex = /(\[((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?) (.*)\])/g;

    const match = regex.exec(value);

    if (match) {
      return match[2];
    }
  }

  return undefined;
}

function processWikiText(text: string = "") {
  {
    const regex = /(\[((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)\])/g;

    const match = regex.exec(text);

    if (match) {
      text = text.replace(
        regex,
        `<a target="_blank" href="${match[2]}">${match[2]}</a>`
      );
    }
  }
  {
    const regex = /(\[((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?) (.*)\])/g;

    const match = regex.exec(text);

    if (match) {
      text = text.replace(
        regex,
        `<a target="_blank" href="${match[2]}">${match[6]}</a>`
      );
    }
  }

  {
    const regex = /\[\[:wikipedia:(.*(?![^\|]))(\|(.*))?\]\]/g;

    const match = regex.exec(text);

    if (match) {
      text = text.replace(
        regex,
        `<a target="_blank" href="https://en.wikipedia.org/wiki/${match[1]}">${match[3]}</a>`
      );
    }
  }
  {
    const regex = /\[\[:wikipedia:(.*)\]\]/g;

    const match = regex.exec(text);

    if (match) {
      text = text.replace(
        regex,
        `<a target="_blank" href="https://en.wikipedia.org/wiki/${match[1]}">${match[1]}</a>`
      );
    }
  }
  {
    const regex = /\[\[(.*(?![^\|]))(\|(.*))?\]\]/g;

    const match = regex.exec(text);

    if (match) {
      text = text.replace(
        regex,
        `<a target="_blank" href="${toWikiUrl(match[1])}">${match[3]}</a>`
      );
    }
  }
  {
    const regex = /\[\[(.*)\]\]/g;

    const match = regex.exec(text);

    if (match) {
      text = text.replace(
        regex,
        `<a target="_blank" href="${toWikiUrl(match[1])}">${match[1]}</a>`
      );
    }
  }

  return text;
}
