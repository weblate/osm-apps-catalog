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

export function equalsIgnoreCase(a: string | undefined, b: string | undefined) {
  return typeof a === "string" && typeof b === "string"
    ? a.toUpperCase() === b.toUpperCase()
    : a === b;
}

export function equalsYes(...values: (string | undefined)[]) {
  for (const value of values) if (value?.toUpperCase() === "YES") return true;

  return false;
}

export function startsWithIgnoreCase(
  s: string,
  searchString: string,
  position?: number
) {
  return s.toUpperCase().startsWith(searchString.toUpperCase(), position);
}

export function findClosingBracketIndex(str: string, pos: number) {
  if (str[pos] !== "{") {
    throw new Error("The position must contain an opening bracket");
  }
  let level = 1;
  for (let index = pos + 1; index < str.length; index++) {
    if (str[index] === "{") {
      level++;
    } else if (str[index] === "}") {
      level--;
    }

    if (level === 0) {
      return index;
    }
  }
  return -1;
}

export function firstLetterToUpperCase(value: string): string {
  return `${value[0].toUpperCase()}${value.slice(1)}`;
}

export function appendFullStop(value: string): string {
  if (value && value[value.length - 1] !== ".") return `${value}.`;
  return value;
}

export function trim(value: string | undefined): string {
  return (value || "").replace(/^[\.\s]+|[\.\s]+$/gm, "");
}

export function toDate(value: string) {
  value = trim(value);
  if (/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}$/gi.test(value)) return value;
  else return "";
}

export function textToColor(s: string) {
  let r = 0;
  let g = 0;
  let b = 0;

  // fixed colors
  switch (s.toUpperCase()) {
    case "FREE":
    case "YES":
      return { r: 153, g: 255, b: 153 };
    case "NO":
      return { r: 255, g: 153, b: 153 };
  }

  for (let i = 0; i < s.length; i++) {
    if (i % 3 === 0) r = (r + s.charCodeAt(i)) % 256;
    else if (i % 3 === 1) g = (g + s.charCodeAt(i)) % 256;
    else b = (b + s.charCodeAt(i)) % 256;
  }
  return { r, g, b };
}
