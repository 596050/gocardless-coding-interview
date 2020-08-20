import axios from "axios";
const cheerio = require("cheerio");
import { writeFileSync } from "fs";

// style data-href=

const links = [];
const visited = {};
const shouldVisit = [];
const failedURLs = [];
const invalid = new Set();
const BASE_URL = "https://www.puntersouthall.com";
let counter = 0;

const sleep = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

const isValidLink = (link: string) => {
  try {
    new URL(link).hostname;
    return true;
  } catch (e) {
    return false;
  }
};

const getAssets = ($, selector, attribute, url) => {
  const assets = [];
  try {
    $(selector).each((_, value) => {
      var link = $(value).attr(attribute);
      link =
        !!link && link.startsWith("/") && !link.startsWith("//")
          ? new URL(url).origin + link
          : link;
      if (typeof link === "string") {
        assets.push(link);
      }
    });
  } catch (e) {
    console.log("getAssets", e);
  }
  return assets;
};

async function main(baseURL: string) {
  shouldVisit.push(baseURL);

  const processPage = async (url) => {
    console.log("about to process", url);
    await sleep(10);
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      let assets =
        getAssets($, "img", "src", url)
          .filter(isValidLink)
          .filter((x) => !x.startsWith("data:")) || [];
      assets =
        assets
          .concat(getAssets($, "script", "src", url).filter(isValidLink))
          .filter((x) => !x.startsWith("data:")) || [];

      $("a").each((_, value) => {
        var link = $(value).attr("href");
        link = link.startsWith("/") ? new URL(url).origin + link : link;
        if (!isValidLink(link)) return;
        if (!(link in visited) && link.includes(BASE_URL)) {
          shouldVisit.push(link);
        }
        visited[link] = assets;
      });
    } catch (e) {
      console.log("Request failed", e);
      failedURLs.push(url);
    }
  };

  while (shouldVisit.length > 0) {
    const urlToVisit = shouldVisit.pop();
    await processPage(urlToVisit);
    counter++;
  }
}

main(BASE_URL).then(() =>
  writeFileSync(
    "./results.json",
    JSON.stringify({ visited, failedURLs }, null, 2),
    {
      encoding: "utf8",
    }
  )
);
