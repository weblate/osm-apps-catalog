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

import i18next from "i18next";

const languages: {
  code: string;
  display: any;
}[] = [
  { code: "aa", display: "Afar" },
  { code: "ab", display: "Аҧсуа" },
  { code: "af", display: "Afrikaans" },
  { code: "ak", display: "Akana" },
  { code: "als", display: "Alemannisch" },
  { code: "am", display: "አማርኛ" },
  { code: "an", display: "Aragonés" },
  { code: "ang", display: "Angal Heneng" },
  { code: "ang", display: "Englisc" },
  { code: "ar", display: "العربية" },
  { code: "arc", display: "ܣܘܪܬ" },
  { code: "as", display: "অসমীয়া" },
  { code: "ast", display: "Asturianu" },
  { code: "av", display: "Авар" },
  { code: "awa", display: "Awadhi" },
  { code: "ay", display: "Aymar" },
  { code: "az", display: "Azərbaycanca / آذربايجان" },
  { code: "ba", display: "Башҡорт" },
  { code: "bar", display: "Boarisch" },
  { code: "bat-smg", display: "Žemaitėška" },
  { code: "bcl", display: "Bikol Central" },
  { code: "be", display: "Беларуская" },
  { code: "be-x-old", display: "Беларуская (тарашкевіца)" },
  { code: "bg", display: "Български" },
  { code: "bh", display: "भोजपुरी" },
  { code: "bi", display: "Bislama" },
  { code: "bm", display: "Bamanankan" },
  { code: "bn", display: "বাংলা" },
  { code: "bo", display: "བོད་ཡིག / Bod skad" },
  { code: "bpy", display: "ইমার ঠার/বিষ্ণুপ্রিয়া মণিপুরী" },
  { code: "br", display: "Brezhoneg" },
  { code: "bs", display: "Bosanski" },
  { code: "bug", display: "ᨅᨔ ᨕᨘᨁᨗ / Basa Ugi" },
  { code: "bxr", display: "Буряад хэлэн" },
  { code: "ca", display: "Català" },
  { code: "cdo", display: "Mìng-dĕ̤ng-ngṳ̄ / 閩東語" },
  { code: "ce", display: "Нохчийн" },
  { code: "ceb", display: "Sinugboanong Binisaya" },
  { code: "ch", display: "Chamoru" },
  { code: "cho", display: "Choctaw" },
  { code: "chr", display: "ᏣᎳᎩ" },
  { code: "chy", display: "Tsetsêhestâhese" },
  { code: "closed-zh-tw", display: "‪中文(台灣)‬" },
  { code: "co", display: "Corsu" },
  { code: "cr", display: "Nehiyaw" },
  { code: "cs", display: "Česky" },
  { code: "csb", display: "Kaszëbsczi" },
  { code: "cu", display: "словѣньскъ / slověnĭskŭ" },
  { code: "cv", display: "Чăваш" },
  { code: "cy", display: "Cymraeg" },
  { code: "da", display: "Dansk" },
  { code: "de", display: "Deutsch" },
  { code: "diq", display: "Zazaki" },
  { code: "dsb", display: "Dolnoserbski" },
  { code: "dv", display: "ދިވެހިބަސް" },
  { code: "dz", display: "ཇོང་ཁ" },
  { code: "ee", display: "Ɛʋɛ" },
  { code: "el", display: "Ελληνικά" },
  { code: "en", display: "English" },
  { code: "eo", display: "Esperanto" },
  { code: "es", display: "Español" },
  { code: "et", display: "Eesti" },
  { code: "eu", display: "Euskara" },
  { code: "ext", display: "Estremeñu" },
  { code: "fa", display: "فارسی" },
  { code: "ff", display: "Fulfulde" },
  { code: "fi", display: "Suomi" },
  { code: "fiu-vro", display: "Võro" },
  { code: "fj", display: "Na Vosa Vakaviti" },
  { code: "fo", display: "Føroyskt" },
  { code: "fr", display: "Français" },
  { code: "frp", display: "Arpitan / francoprovençal" },
  { code: "fur", display: "Furlan" },
  { code: "fy", display: "Frysk" },
  { code: "ga", display: "Gaeilge" },
  { code: "gan", display: "贛語" },
  { code: "gbm", display: "गढ़वळी" },
  { code: "gcf", display: "Kréyòl gwadloupéyen" },
  { code: "gd", display: "Gàidhlig" },
  { code: "gil", display: "Taetae ni kiribati" },
  { code: "gl", display: "Galego" },
  { code: "gn", display: "Avañe'ẽ" },
  { code: "got", display: "gutisk" },
  { code: "gu", display: "ગુજરાતી" },
  { code: "gv", display: "Gaelg" },
  { code: "ha", display: "هَوُسَ" },
  { code: "hak", display: "客家語/Hak-kâ-ngî" },
  { code: "haw", display: "Hawai`i" },
  { code: "he", display: "עברית" },
  { code: "hi", display: "हिन्दी" },
  { code: "ho", display: "Hiri Motu" },
  { code: "hr", display: "Hrvatski" },
  { code: "ht", display: "Krèyol ayisyen" },
  { code: "hu", display: "Magyar" },
  { code: "hy", display: "Հայերեն" },
  { code: "hz", display: "Otsiherero" },
  { code: "ia", display: "Interlingua" },
  { code: "id", display: "Bahasa Indonesia" },
  { code: "ie", display: "Interlingue" },
  { code: "ig", display: "Igbo" },
  { code: "ii", display: "ꆇꉙ / 四川彝语" },
  { code: "ik", display: "Iñupiak" },
  { code: "ilo", display: "Ilokano" },
  { code: "inh", display: "ГӀалгӀай" },
  { code: "io", display: "Ido" },
  { code: "is", display: "Íslenska" },
  { code: "it", display: "Italiano" },
  { code: "iu", display: "ᐃᓄᒃᑎᑐᑦ" },
  { code: "ja", display: "日本語" },
  { code: "jbo", display: "Lojban" },
  { code: "jv", display: "Basa Jawa" },
  { code: "ka", display: "ქართული" },
  { code: "kg", display: "KiKongo" },
  { code: "khw", display: "کھوار" },
  { code: "ki", display: "Gĩkũyũ" },
  { code: "kj", display: "Kuanyama" },
  { code: "kk", display: "Қазақша" },
  { code: "kl", display: "Kalaallisut" },
  { code: "km", display: "ភាសាខ្មែរ" },
  { code: "kn", display: "ಕನ್ನಡ" },
  { code: "ko", display: "한국어" },
  { code: "kr", display: "Kanuri" },
  { code: "ks", display: "कश्मीरी / كشميري" },
  { code: "ksh", display: "Ripoarisch" },
  { code: "ku", display: "Kurdî / كوردی" },
  { code: "kv", display: "Коми" },
  { code: "kw", display: "Kernewek" },
  { code: "ky", display: "Kırgızca / Кыргызча" },
  { code: "la", display: "Latina" },
  { code: "lad", display: "Dzhudezmo / Djudeo-Espanyol" },
  { code: "lan", display: "Leb Lango / Luo" },
  { code: "lb", display: "Lëtzebuergesch" },
  { code: "lg", display: "Luganda" },
  { code: "li", display: "Limburgs" },
  { code: "lij", display: "Líguru" },
  { code: "lmo", display: "Lumbaart" },
  { code: "ln", display: "Lingála" },
  { code: "lo", display: "ລາວ / Pha xa lao" },
  { code: "lt", display: "Lietuvių" },
  { code: "lv", display: "Latviešu" },
  { code: "lzz", display: "Lazuri / ლაზური" },
  { code: "man", display: "官話/官话" },
  { code: "map-bms", display: "Basa Banyumasan" },
  { code: "mg", display: "Malagasy" },
  { code: "mh", display: "Kajin Majel / Ebon" },
  { code: "mi", display: "Māori" },
  { code: "min", display: "Minangkabau" },
  { code: "mk", display: "Македонски" },
  { code: "ml", display: "മലയാളം" },
  { code: "mn", display: "Монгол" },
  { code: "mo", display: "Moldovenească" },
  { code: "mr", display: "मराठी" },
  { code: "mrh", display: "Mara" },
  { code: "ms", display: "Bahasa Melayu" },
  { code: "mt", display: "bil-Malti" },
  { code: "mul", display: () => i18next.t("multilingual") },
  { code: "mus", display: "Mvskoke" },
  { code: "mwl", display: "Mirandés" },
  { code: "my", display: "Myanmasa / မြန်မာဘာသာ" },
  { code: "na", display: "Dorerin Naoero" },
  { code: "nah", display: "Nahuatl" },
  { code: "nap", display: "Nnapulitano" },
  { code: "nb", display: "Norsk (bokmål)" },
  { code: "nd", display: "Sindebele" },
  { code: "nds", display: "Plattdüütsch" },
  { code: "nds-nl", display: "Nedersaksisch" },
  { code: "ne", display: "नेपाली" },
  { code: "new", display: "नेपालभाषा / Newah Bhaye" },
  { code: "ng", display: "Oshiwambo" },
  { code: "nl", display: "Nederlands" },
  { code: "nn", display: "Norsk (nynorsk)" },
  { code: "no", display: "Norsk (bokmål / riksmål)" },
  { code: "nr", display: "isiNdebele" },
  { code: "nrm", display: "Nouormand / Normaund" },
  { code: "nso", display: "Sesotho sa Leboa / Sepedi" },
  { code: "nv", display: "Diné bizaad" },
  { code: "ny", display: "Chi-Chewa" },
  { code: "oc", display: "Occitan" },
  { code: "oj", display: "ᐊᓂᔑᓈᐯᒧᐎᓐ / Anishinaabemowin" },
  { code: "om", display: "Oromoo" },
  { code: "or", display: "ଓଡ଼ିଆ" },
  { code: "os", display: "Иронау" },
  { code: "pa", display: "ਪੰਜਾਬੀ / पंजाबी / پنجابي" },
  { code: "pag", display: "Pangasinan" },
  { code: "pam", display: "Kapampangan" },
  { code: "pap", display: "Papiamentu" },
  { code: "pdc", display: "Deitsch" },
  { code: "pi", display: "Pāli / पाऴि" },
  { code: "pih", display: "Norfuk" },
  { code: "pl", display: "Polski" },
  { code: "pms", display: "Piemontèis" },
  { code: "ps", display: "پښتو" },
  { code: "pt", display: "Português" },
  { code: "qu", display: "Runa Simi" },
  { code: "rm", display: "Rumantsch" },
  { code: "rmy", display: "Romani / रोमानी" },
  { code: "rn", display: "Kirundi" },
  { code: "ro", display: "Română" },
  { code: "roa-rup", display: "Armâneashti" },
  { code: "ru", display: "Русский" },
  { code: "rw", display: "Kinyarwandi" },
  { code: "sa", display: "संस्कृतम्" },
  { code: "sc", display: "Sardu" },
  { code: "scn", display: "Sicilianu" },
  { code: "sco", display: "Scots" },
  { code: "sd", display: "सिनधि" },
  { code: "se", display: "Davvisámegiella" },
  { code: "sg", display: "Sängö" },
  { code: "sh", display: "Srpskohrvatski / Српскохрватски" },
  { code: "si", display: "සිංහල" },
  { code: "simple", display: "Simple English" },
  { code: "sk", display: "Slovenčina" },
  { code: "sl", display: "Slovenščina" },
  { code: "sm", display: "Gagana Samoa" },
  { code: "sn", display: "chiShona" },
  { code: "so", display: "Soomaaliga" },
  { code: "sq", display: "Shqip" },
  { code: "sr-latn", display: "srpski (latinica)" },
  { code: "sr", display: "Српски / Srpski" },
  { code: "ss", display: "SiSwati" },
  { code: "st", display: "Sesotho" },
  { code: "su", display: "Basa Sunda" },
  { code: "sv", display: "Svenska" },
  { code: "sw", display: "Kiswahili" },
  { code: "ta", display: "தமிழ்" },
  { code: "te", display: "తెలుగు" },
  { code: "tet", display: "Tetun" },
  { code: "tg", display: "Тоҷикӣ" },
  { code: "th", display: "ไทย / Phasa Thai" },
  { code: "ti", display: "ትግርኛ" },
  { code: "tk", display: "Туркмен / تركمن" },
  { code: "tl", display: "Tagalog" },
  { code: "tlh", display: "tlhIngan-Hol" },
  { code: "tn", display: "Setswana" },
  { code: "to", display: "Lea Faka-Tonga" },
  { code: "tokipona", display: "tokipona" },
  { code: "tpi", display: "Tok Pisin" },
  { code: "tr", display: "Türkçe" },
  { code: "ts", display: "Xitsonga" },
  { code: "tt", display: "Tatarça" },
  { code: "tum", display: "chiTumbuka" },
  { code: "tw", display: "Twi" },
  { code: "ty", display: "Reo Mā`ohi" },
  { code: "tzm", display: "ⵜⴰⵎⴰⵣⵉⵖⵜ" },
  { code: "udm", display: "Удмурт кыл" },
  { code: "ug", display: "Uyƣurqə / ئۇيغۇرچە" },
  { code: "uk", display: "Українська" },
  { code: "ur", display: "اردو" },
  { code: "uz", display: "Ўзбек" },
  { code: "ve", display: "Tshivenḓa" },
  { code: "vec", display: "Vèneto" },
  { code: "vi", display: "Việtnam" },
  { code: "vls", display: "West-Vlaoms" },
  { code: "vo", display: "Volapük" },
  { code: "wa", display: "Walon" },
  { code: "war", display: "Winaray / Binisaya Lineyte-Samarnon" },
  { code: "wo", display: "Wollof" },
  { code: "xal", display: "Хальмг" },
  { code: "xh", display: "isiXhosa" },
  { code: "xmf", display: "მარგალური" },
  { code: "yi", display: "ייִדיש" },
  { code: "yo", display: "Yorùbá" },
  { code: "yue", display: "粵語" },
  { code: "za", display: "Cuengh / Tôô / 壮语" },
  { code: "zh", display: "中文" },
  { code: "zh-classical", display: "文言" },
  { code: "zh-hans", display: "中文 (简体)" },
  { code: "zh-hant", display: "中文 (繁體)" },
  { code: "zh-min-nan", display: "Bân-lâm-gú" },
  { code: "zh-tw", display: "‪中文(台灣)‬" },
  { code: "zh-yue", display: "粵語 / 粤语" },
  { code: "zu", display: "isiZulu" },
];

export function languageValueToDisplay(value: string) {
  if (!Number.isNaN(Number.parseInt(value, 10))) {
    value = "mul";
  } else {
    value = value.replaceAll("_", "-").toLowerCase();
  }

  for (const language of languages) {
    if (language.code === value) {
      if (typeof language.display === "function") {
        return language.display();
      } else {
        return language.display;
      }
    }
  }

  value = extractLanguageCodeFromLocal(value);
  for (const language of languages) {
    if (language.code === value) {
      if (typeof language.display === "function") {
        return language.display();
      } else {
        return language.display;
      }
    }
  }

  return value;
}

function extractLanguageCodeFromLocal(value: string): string {
  const match = /(\w+)/g.exec(value);
  if (match) return match[1];
  return value;
}
