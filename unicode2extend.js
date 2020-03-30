/**
 *
 * @author SilvaQ
 *
 * 基于前 uyghur-char-utils改写
 * 特此感谢 kerindax 和shere。
 */

const { fromCharCode } = String;

let mappings = {};

//生成数据集
[
  [0x626, 0xfe8b, 0xfe8b, 0xfe8c, 0xfe8c, 1],
  [0x627, 0xfe8d, 0xfe8d, 0xfe8e, 0xfe8e, 0],
  [0x6d5, 0xfee9, 0xfee9, 0xfeea, 0xfeea, 0],
  [0x628, 0xfe8f, 0xfe91, 0xfe92, 0xfe90, 1],
  [0x67e, 0xfb56, 0xfb58, 0xfb59, 0xfb57, 1],
  [0x62a, 0xfe95, 0xfe97, 0xfe98, 0xfe96, 1],
  [0x62c, 0xfe9d, 0xfe9f, 0xfea0, 0xfe9e, 1],
  [0x686, 0xfb7a, 0xfb7c, 0xfb7d, 0xfb7b, 1],
  [0x62e, 0xfea5, 0xfea7, 0xfea8, 0xfea6, 1],
  [0x62f, 0xfea9, 0xfea9, 0xfeaa, 0xfeaa, 0],
  [0x631, 0xfead, 0xfead, 0xfeae, 0xfeae, 0],
  [0x632, 0xfeaf, 0xfeaf, 0xfeb0, 0xfeb0, 0],
  [0x698, 0xfb8a, 0xfb8a, 0xfb8b, 0xfb8b, 0],
  [0x633, 0xfeb1, 0xfeb3, 0xfeb4, 0xfeb2, 1],
  [0x634, 0xfeb5, 0xfeb7, 0xfeb8, 0xfeb6, 1],
  [0x63a, 0xfecd, 0xfecf, 0xfed0, 0xfece, 1],
  [0x641, 0xfed1, 0xfed3, 0xfed4, 0xfed2, 1],
  [0x642, 0xfed5, 0xfed7, 0xfed8, 0xfed6, 1],
  [0x643, 0xfed9, 0xfedb, 0xfedc, 0xfeda, 1],
  [0x6af, 0xfb92, 0xfb94, 0xfb95, 0xfb93, 1],
  [0x6ad, 0xfbd3, 0xfbd5, 0xfbd6, 0xfbd4, 1],
  [0x644, 0xfedd, 0xfedf, 0xfee0, 0xfede, 1],
  [0x645, 0xfee1, 0xfee3, 0xfee4, 0xfee2, 1],
  [0x646, 0xfee5, 0xfee7, 0xfee8, 0xfee6, 1],
  [0x6be, 0xfbaa, 0xfbac, 0xfbad, 0xfbab, 1],
  [0x648, 0xfeed, 0xfeed, 0xfeee, 0xfeee, 0],
  [0x6c7, 0xfbd7, 0xfbd7, 0xfbd8, 0xfbd8, 0],
  [0x6c6, 0xfbd9, 0xfbd9, 0xfbda, 0xfbda, 0],
  [0x6c8, 0xfbdb, 0xfbdb, 0xfbdc, 0xfbdc, 0],
  [0x6cb, 0xfbde, 0xfbde, 0xfbdf, 0xfbdf, 0],
  [0x6d0, 0xfbe4, 0xfbe6, 0xfbe7, 0xfbe5, 1],
  [0x649, 0xfeef, 0xfbe8, 0xfbe9, 0xfef0, 1],
  [0x64a, 0xfef1, 0xfef3, 0xfef4, 0xfef2, 1]
].forEach(row => row.forEach(item => (mappings[fromCharCode(item)] = row)));

/**
 * 标记
 *  - 0 表示 这些字母没有first和middle，只有single和last
 *  - 1 表示 single firest middle last 四种格式都有
 *
 * 1. 首字母：
 *    - 当 只有一个字母时 single
 *    - 当 存在多个字母时 first
 *
 * 2. 中间字母:
 *    - 当 前一个字母的标记为 0 时 first
 *    - 当 前一个字母的标记为 1 时 middleclear
 *
 * 3. 末尾字母
 *    - 当 前一个字母的标记为 0 时 single
 *    - 当 前一个字母的标记为 1 时 last
 *
 * 4. 最终要处理la
 *
 */

//替换exted后出现的异类la 改回我们自己的la
function repalceLa(str) {
  return str
    .replace(/(\uFEDF\uFE8E)/g, function() {
      return fromCharCode(0xfefb);
    })
    .replace(/(\uFEE0\uFE8E)/g, function() {
      return fromCharCode(0xfefc);
    });
}

//反转，改变书写方向
function reverseStr(str) {
  return str
    .split("")
    .reverse()
    .join("");
}

// 中英文书写方向调整为ltr,其余的rtl
function str2rtl(str) {
  return (
    reverseStr(str)
      //所有字母转换成从右往左写
      .replace(/([^\uFB00-\uFEFF\u0600-\u06FF\s]+)/g, function(word) {
        //吧非母语改回从右往左
        return reverseStr(word);
      })
  );
}

function unicodeMapping2Extend(str, mappings = []) {
  return str.replace(/[\u0626-\u06d5]+/g, word => {
    let result = "";

    const chars = word.trim().split("");

    chars.reduce((pre, cur, index, data) => {
      const [, , , , , pflag] = mappings[pre];
      const [, csingle, cfirst, cmiddle, clast] = mappings[cur];

      //只有一个字母
      if (data.length === 1) {
        result += fromCharCode(csingle);

        //第一个字母
      } else if (data.length > 1 && index === 0) {
        result += fromCharCode(cfirst);

        //最后一个字母
      } else if (data.length - 1 === index) {
        if (pflag === 0) result += fromCharCode(csingle);
        if (pflag === 1) result += fromCharCode(clast);

        // 中间的字母
      } else {
        //in the middle
        if (pflag === 0) result += fromCharCode(cfirst);
        if (pflag === 1) result += fromCharCode(cmiddle);
      }
      return cur;
    }, chars[0]);

    return result;
  });
}

function unicode2exten(str, mappings = []) {
  return str2rtl(repalceLa(unicodeMapping2Extend(str, mappings)));
}

module.exports = {
  unicode2exten: function(str) {
    return unicode2exten(str, mappings);
  }
};

const source =
  "بالاۋەبالىلارئىچىدەandyئاشۇتازاچىرايلىقكەندەئويلىماققىلابىئارام没有كەن";
console.log(unicode2exten(source, mappings));
