const { getDecByChar, getHexByDec, getDecByHex } = require("./unicode");

const { flattenDeep } = require("lodash");

const { fromCharCode } = String;

const U = [
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
];

/**
 1. ھەرپ سانى بىر بولغاندا بىرىنچى ھەرپنىڭ يالغۇز شەكلى كىلىدۇ.
2. ھەرپ سانى بىردىن چوڭ بولغاندا، بىرىنچى ھەرپنىڭ باش يىزىلىشى كېلىدۇ.

3. ئارلىقتىكى ھەرپنىڭ ئالدىدىكى ھەرپ بەلگىسى 0 بولسا باش يىزىلىشى كېلىدۇ.
4. ئارلىقتىكى ھەرپنىڭ ئالدىدىكى ھەرپ بەلگىسى 1 بولسا ئوتتۇرىدا يىزىلىشى كېلىدۇ.

5. ئاخىرقى ھەرپنىڭ ئالدىدىكى ھەرپ بەلگىسى 0 بولسا يالغۇز شەكلى كېلىدۇ.
6. ئاخىرقى ھەرپنىڭ ئالدىدىكى ھەرپ بەلگىسى 1 بولسا ئاخىرقى يىزىلىشى كېلىدۇ.

7. ئاخىرىدا بارلىق لا(ئىككى خىل شەكلى بار) كىڭەيتىلگەن لا(ئىككى خىل شەكلى بار)غا ئالماشتۇرىمىز.
 */

function printMap(data = []) {
  const mappings = data
    .map(value => value.map(item => "0x" + getHexByDec(item)))
    .map(value => {
      const [original, single, first, middle, last, flag] = value;
      return {
        Dec: getDecByHex(original),
        original: `${fromCharCode(original)}  ${original}`,
        single: `${fromCharCode(single)}  ${single}`,
        first: `${fromCharCode(first)}  ${first}`,
        middle: `${fromCharCode(middle)}  ${middle}`,
        last: `${fromCharCode(last)}  ${last}`,
        flag: parseInt(flag)
      };
    });

  console.table(mappings);
}

function printWord(word = "") {
  let data = [];

  word.split("").forEach(char => {
    let Char = char;
    let Dec = getDecByChar(char);
    let Hex = getHexByDec(Dec);

    data.push({ Char: char, Dec, Hex });
  });

  console.table(data);
}
function printTable(data) {
  console.table(data);
}

const source = "بالاۋەبالاسىhelloنى你好دەپتۇ";

let reg_str = /[\u0626-\u06d5]+/g;

source.replace(reg_str, word => {
  //   printWord(word);
  const chars = word.trim().split("");
  const [first, ...reset] = chars;
  const last = reset.pop();

  //   printTable(chars);
  //   console.log(reset);
  //
  //1. 首位
  //2. 末尾
  //3. 中间
});

printMap(U);
// printWord(source);
