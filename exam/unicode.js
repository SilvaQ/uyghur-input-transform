let arr = Array,
  fromCharCode = String.fromCharCode;

const common = {
  getPlaneByDec: function getPlaneByDec(dec) {
    return dec >> 16;
  },
  getHexByDec: function getHexByDec(dec) {
    var hex = dec.toString(16).toUpperCase(),
      len = 5 - hex.length;
    if (len > 1) {
      hex = arr(len).join("0") + hex;
    }
    return hex;
  },
  getDecByHex: function getDecByHex(hex) {
    return parseInt(hex, 16);
  },
  getDecByChar: function getDecByChar(char) {
    var len = char.length,
      low,
      high;
    if (len < 1) {
      return undefined;
    }
    high = char.charCodeAt(0);
    if (high < 55296 || high > 57343) {
      return high;
    }
    if (high > 56320) {
      return undefined;
    }
    if (len < 2) {
      return undefined;
    }
    low = char.charCodeAt(1);
    if (low < 56320 || low > 57343) {
      return undefined;
    }
    return (high << 10) + low - 56613888;
  },
  getDecBySafeChar: function getDecBySafeChar(char) {
    var len = char.length;
    if (len === 1) {
      return char.charCodeAt(0);
    }
    return (char.charCodeAt(0) << 10) + char.charCodeAt(1) - 56613888;
  },
  getCharByDec: function getCharByDec(dec) {
    var high, low;
    if (dec < 55296) {
      return fromCharCode(dec);
    }
    if (dec < 57344) {
      return undefined;
    }
    if (dec < 65536) {
      return fromCharCode(dec);
    }
    dec -= 65536;
    high = (dec >> 10) + 55296;
    low = (dec & 1023) + 56320;
    return fromCharCode(high) + fromCharCode(low);
  }
};

module.exports = common;
