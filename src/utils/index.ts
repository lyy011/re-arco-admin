type TargetContext = "_self" | "_parent" | "_blank" | "_top";

export const openWindow = (
  url: string,
  opts?: { target?: TargetContext; [key: string]: any }
) => {
  const { target = "_blank", ...others } = opts || {};
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(",")
  );
};

export const regexUrl = new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  "i"
);

/**
 * @description 将url请求参数转为json格式
 * @param url
 * @returns {{}|any}
 */
export function paramObj(url: string = window.location.href) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, " ") +
      '"}'
  );
}

/** 七牛缩略图 */
// export const thumbnail = (imgUrl: string, width: string) => {
//   if (!imgUrl || imgUrl.indexOf("?imageView2/") > -1) {
//     return imgUrl;
//   } else {
//     return `${imgUrl}?imageView2/2/w/${width}`;
//   }
// };

/** 阿里缩略图 */
export const thumbnail = (imgUrl: string, width: string) => {
  if (!imgUrl || imgUrl.indexOf("?x-oss-process=image") > -1) {
    return imgUrl;
  } else {
    return `${imgUrl}?x-oss-process=image/resize,w_${width}`;
  }
};

/**
 * 日期字符串转Date类型
 * @param dateStr 日期字符串 yyyy-MM-dd hh:mm:ss
 * @returns Date
 */
export const strToDate = (dateStr: string) => {
  if (!dateStr) {
    return null;
  }
  if (typeof dateStr === "string") {
    if (dateStr.indexOf(".") > -1) {
      dateStr = dateStr.substring(0, dateStr.indexOf("."));
    }
    dateStr = dateStr.replace(/-/g, "/");
  }
  return new Date(dateStr);
};

/**
 * 格式化日期
 * @param dateStr 日期字符串或日期
 * @param fmt 格式 'yyyy-MM-dd hh:mm:ss'
 * @returns string
 */
export const formatDate = (dateStr: string | Date, fmt: string): string => {
  const date = typeof dateStr === "string" ? strToDate(dateStr) : dateStr;
  if (!date) return "";
  const o: Record<string, number> = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? `${o[k]}`
          : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return fmt;
};

export default null;
