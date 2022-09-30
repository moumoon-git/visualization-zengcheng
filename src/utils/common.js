/**
 * @description 小于10补0
 */
export const addZero = val => {
  return val >= 10 ? val : "0" + val;
};

/**
 * @description 格式化时间戳 返回年月日时分秒
 */
export const formaterTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();
  return (
    year +
    "-" +
    addZero(month) +
    "-" +
    addZero(day) +
    " " +
    addZero(hour) +
    ":" +
    addZero(minute) +
    ":" +
    addZero(seconds)
  );
};
