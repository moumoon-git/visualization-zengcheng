// 风速对应编码： 
// 静风：0 
// 1-2级：A
// 2-3级：C
// 3-4级：1
// 4-5级：2
// 5-6级：3 
// 6-7级：4 
// 7-8级：5 
// 8-9级：6 
// 9-10级：7 
// 10-11级：8
// 11-12级：9
export const windSpeed = {
  '0': '静风',
  'A': '1-2级',
  'C': '2-3级',
  '1': '3-4级',
  '2': '4-5级',
  '3': '5-6级',
  '4': '6-7级',
  '5': '7-8级',
  '6': '8-9级',
  '7': '9-10级',
  '8': '10-11级',
  '9': '11-12级',
}

// 风向对应编码： 
// 静风：0
// 东北：1
// 东风：2
// 东南：3
// 南风：4
// 西南：5
// 西风：6
// 西北：7
// 北风：8
// 旋转风：9
export const windDirection = ['静风', '东北风', '东风', '东南风', '南风', '西南风', '西风', '西北风', '北风', '旋转风', ]


/**
 * 风向代码对照表
 * 风向	    符号	    中心角度	    角度
 * 北	      N	        0	          348.76-11.25
 * 北东北	  NNE	      22.5	      11.26-33.75
 * 东北	    NE	      45	        33.76-56.25
 * 东东北	  ENE	      67.5	      56.26-78.75
 * 东	      E	        90	        78.76-101.25
 * 东东南	  ESE	      112.5	      101.26-123.75
 * 东南	    SE	      135	        123.76-146.25
 * 南东南	  SSE	      157.5	      146.26-168.75
 * 南	      S	        180	        168.76-191.25
 * 南西南	  SSW	      202.5	      191.26-213.75
 * 西南	    SW	      225	        213.76-236.25
 * 西西南	  WSW	      247.5	      236.26-258.75
 * 西	      W	        270	        258.76-281.25
 * 西西北	  WNW	      295.5	      281.26-303.75
 * 西北	    NW	      315	        303.76-326.25
 * 北西北	  NNW	      337.5	      326.26-348.75
 */
 export const windDirectionByAngle = [
  {
    direction: '北',
    symbol: 'N',
    centerAngle: 0,
    maxAngle: 11.25,
    minAngle: 348.76,
  },
  {
    direction: '北东北',
    symbol: 'NNE',
    centerAngle: 22.5,
    maxAngle: 33.75,
    minAngle: 11.26,
  },
  {
    direction: '东北',
    symbol: 'NE',
    centerAngle: 45,
    maxAngle: 56.25,
    minAngle: 33.76,
  },
  {
    direction: '东东北',
    symbol: 'ENE',
    centerAngle: 67.5,
    maxAngle: 78.75,
    minAngle: 56.26,
  },
  {
    direction: '东',
    symbol: 'E',
    centerAngle: 90,
    maxAngle: 101.25,
    minAngle: 78.76,
  },
  {
    direction: '东东南',
    symbol: 'ESE',
    centerAngle: 112.5,
    maxAngle: 123.75,
    minAngle: 101.26,
  },
  {
    direction: '东南',
    symbol: 'SE',
    centerAngle: 135,
    maxAngle: 146.25,
    minAngle: 123.76,
  },
  {
    direction: '南东南',
    symbol: 'SSE',
    centerAngle: 157.5,
    maxAngle: 168.75,
    minAngle: 146.26,
  },
  {
    direction: '南',
    symbol: 'S',
    centerAngle: 180,
    maxAngle: 191.25,
    minAngle: 168.76,
  },
  {
    direction: '南西南',
    symbol: 'SSW',
    centerAngle: 202.5,
    maxAngle: 213.75,
    minAngle: 191.26,
  },
  {
    direction: '西南',
    symbol: 'SW',
    centerAngle: 225,
    maxAngle: 236.25,
    minAngle: 213.76,
  },
  {
    direction: '西西南',
    symbol: 'WSW',
    centerAngle: 247.5,
    maxAngle: 258.75,
    minAngle: 236.26,
  },
  {
    direction: '西',
    symbol: 'W',
    centerAngle: 270,
    maxAngle: 281.25,
    minAngle: 258.76,
  },
  {
    direction: '西西北',
    symbol: 'WNW',
    centerAngle: 295.5,
    maxAngle: 303.75,
    minAngle: 281.26,
  },
  {
    direction: '西北',
    symbol: 'NW',
    centerAngle: 315,
    maxAngle: 326.25,
    minAngle: 303.76,
  },
  {
    direction: '北西北',
    symbol: 'NNW',
    centerAngle: 337.5,
    maxAngle: 348.75,
    minAngle: 326.26,
  },
];

/**
 * @description 获取风力风向
 * @param direction 风力
 * @returns 风力风向
 */
export function getWindDirection(direction) {
  if ((direction >= 0 && direction <= 11.25) || (direction >= 348.76 && direction <= 360)) {
    return windDirectionByAngle[0];
  } else {
    const result = windDirectionByAngle.find(
      (item) =>
        (item.minAngle <= direction && item.maxAngle >= direction)
    );
    return result;
  }
}

// 预报时次，
// 0=昨天，
// 1=24小时，
// 2=48小时，
// 3=72小时

/**
 * 风力风速等级对照表
 * 风力等级	风速范围 （km/h）	自然语言描述
 * 0级	    <1	            无风
 * 1级	    1-5	            微风徐徐
 * 2级	    6-11	          清风
 * 3级	    12-19	          树叶摇摆
 * 4级	    20-28	          树枝摇动
 * 5级	    29-38	          风力强劲
 * 6级	    39-49	          风力强劲
 * 7级	    50-61	          风力超强
 * 8级	    62-74	          狂风大作
 * 9级	    75-88	          狂风呼啸
 * 10级	    89-102	        暴风毁树
 * 11级	    103-117	        暴风毁树
 * 12级	    118-133	        飓风
 * 13级	    134-149	        台风
 * 14级	    150-166	        强台风
 * 15级	    167-183	        强台风
 * 16级	    184-201	        超强台风
 * 17级	    202-220	        超强台风
 */
/** 风力风速等级对照数据 */
const windSpeedScale = [
  {
    min: 0,
    max: 1,
    level: 0,
    description: '无风',
  },
  {
    min: 1,
    max: 5,
    level: 1,
    description: '微风徐徐',
  },
  {
    min: 5,
    max: 12,
    level: 2,
    description: '清风',
  },
  {
    min: 12,
    max: 19,
    level: 3,
    description: '树叶摇摆',
  },
  {
    min: 19,
    max: 28,
    level: 4,
    description: '树枝摇动',
  },
  {
    min: 28,
    max: 38,
    level: 5,
    description: '风力强劲',
  },
  {
    min: 38,
    max: 49,
    level: 6,
    description: '风力强劲',
  },
  {
    min: 49,
    max: 61,
    level: 7,
    description: '风力超强',
  },
  {
    min: 61,
    max: 74,
    level: 8,
    description: '狂风大作',
  },
  {
    min: 74,
    max: 88,
    level: 9,
    description: '狂风呼啸',
  },
  {
    min: 88,
    max: 102,
    level: 10,
    description: '暴风毁树',
  },
  {
    min: 102,
    max: 117,
    level: 11,
    description: '暴风毁树',
  },
  {
    min: 117,
    max: 133,
    level: 12,
    description: '飓风',
  },
  {
    min: 133,
    max: 149,
    level: 13,
    description: '台风',
  },
  {
    min: 149,
    max: 166,
    level: 14,
    description: '强台风',
  },
  {
    min: 166,
    max: 183,
    level: 15,
    description: '强台风',
  },
  {
    min: 183,
    max: 201,
    level: 16,
    description: '超强台风',
  },
  {
    min: 201,
    max: 220,
    level: 17,
    description: '超强台风',
  },
];
/**
 * @description 获取风力风速等级
 */
export function getWindLevel(speed) {
  const arr = windSpeedScale.filter((item) => {
    if (speed >= item.min && speed < item.max) {
      return item;
    }
  });
  return arr[0];
}
