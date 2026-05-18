function parseQuery(url) {
  const queryStr = url.includes("?") ? url.split("?")[1] : url;
  if (!queryStr) return {};

  const cleanQuery = queryStr.split("#")[0];

  if (!cleanQuery) return {};

  return cleanQuery.split("&").reduce((result, pair) => {
    const [rawKey, rawVal = ""] = pair.split("=");
    const key = decodeURIComponent(rawKey);
    const value = decodeURIComponent(rawVal);

    if (key in result) {
      result[key] = [].concat(result[key], value);
    } else {
      result[key] = value;
    }
    return result;
  }, {});
}

console.log(parseQuery("http://www.baidu.com?keyword=123&id=12"));
