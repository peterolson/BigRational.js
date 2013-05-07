

var bigRat = (function () {
    if (typeof require !== "undefined") {
        bigInt = require("big-integer");
    }
    function gcd(a, b) {
        if(b.equals(0)) {
            return a;
        }
        return gcd(b, a.mod(b));
    }
    function lcm(a, b) {
        return a.times(b).divide(gcd(a, b));
    }
    function create(numerator, denominator, preventReduce) {
        denominator = denominator || bigInt(1);
        preventReduce = preventReduce || false;
        var obj = {
            numerator: numerator,
            denominator: denominator,
            num: numerator,
            denom: denominator,
            reduce: function () {
                var divisor = gcd(obj.num, obj.denom);
                var num = obj.num.divide(divisor);
                var denom = obj.denom.divide(divisor);
                if(denom.lesser(0)) {
                    num = num.times(-1);
                    denom = denom.times(-1);
                }
                if(denom.equals(0)) {
                    throw "Denominator cannot be 0.";
                }
                return create(num, denom, true);
            },
            abs: function () {
                if (obj.isPositive()) return obj;
                return obj.negate();
            },
            multiply: function (n, d) {
                n = interpret(n, d);
                return create(obj.num.times(n.num), obj.denom.times(n.denom));
            },
            times: function (n, d) {
                return obj.multiply(n, d);
            },
            divide: function (n, d) {
                n = interpret(n, d);
                return create(obj.num.times(n.denom), obj.denom.times(n.num));
            },
            over: function (n, d) {
                return obj.divide(n, d);
            },
            mod: function (n, d) {
                var n = interpret(n, d);
                return obj.minus(n.times(obj.over(n).floor()));
            },
            add: function (n, d) {
                n = interpret(n, d);
                var multiple = lcm(obj.denom, n.denom);
                var a = multiple.divide(obj.denom);
                var b = multiple.divide(n.denom);

                a = obj.num.times(a);
                b = n.num.times(b);
                return create(a.add(b), multiple);
            },
            plus: function (n, d) {
                return obj.add(n, d);
            },
            negate: function () {
                var num = bigInt.zero.minus(obj.num);
                return create(num, obj.denom);
            },
            subtract: function (n, d) {
                n = interpret(n, d);
                return obj.add(n.negate());
            },
            minus: function (n, d) {
                return obj.subtract(n, d);
            },
            isPositive: function () {
                return obj.num.isPositive();
            },
            isNegative: function () {
                return !obj.isPositive();
            },
            isZero: function () {
                return obj.equals(0, 1);
            },
            compare: function (n, d) {
                n = interpret(n, d);
                if(obj.num.equals(n.num) && obj.denom.equals(n.denom)) {
                    return 0;
                }
                var newDenom = obj.denom.times(n.denom);
                var comparison = newDenom.greater(0) ? 1 : -1;
                if(obj.num.times(n.denom).greater(n.num.times(obj.denom))) {
                    return comparison;
                } else {
                    return -comparison;
                }
            },
            equals: function (n, d) {
                return obj.compare(n, d) === 0;
            },
            notEquals: function (n, d) {
                return !obj.equals(n, d);
            },
            lesser: function (n, d) {
                return obj.compare(n, d) < 0;
            },
            lesserOrEquals: function (n, d) {
                return obj.compare(n, d) <= 0;
            },
            greater: function (n, d) {
                return obj.compare(n, d) > 0;
            },
            greaterOrEquals: function (n, d) {
                return obj.compare(n, d) >= 0;
            },
            floor: function (toBigInt) {
                var floor = obj.num.over(obj.denom);
                if(toBigInt) {
                    return floor;
                }
                return create(floor);
            },
            ceil: function (toBigInt) {
                var div = obj.num.divmod(obj.denom);
                var ceil;

                ceil = div.quotient;
                if(div.remainder.notEquals(0)) {
                    ceil = ceil.add(1);
                }
                if(toBigInt) {
                    return ceil;
                }
                return create(ceil);
            },
            round: function (toBigInt) {
                return obj.add(1, 2).floor(toBigInt);
            },
            toString: function () {
                var o = obj.reduce();
                return o.num.toString() + "/" + o.denom.toString();
            },
            valueOf: function() {
                return obj.num / obj.denom;
            },
            toDecimal: function (digits) {
                digits = digits || 10;
                var n = obj.num.divmod(obj.denom);
                var intPart = n.quotient.toString();
                var remainder = parse(n.remainder, obj.denom);
                var decPart = "";
                while(decPart.length <= digits) {
                    var i;
                    for(i = 0; i <= 10; i++) {
                        if(parse(decPart + i, "1" + Array(decPart.length + 2).join("0")).greater(remainder)) {
                            i--;
                            break;
                        }
                    }
                    decPart += i;
                }
                while(decPart.slice(-1) === "0") {
                    decPart = decPart.slice(0, -1);
                }
                if(decPart === "") {
                    return intPart;
                }
                return intPart + "." + decPart;
            }
        };
        return preventReduce ? obj : obj.reduce();
    }
    function interpret(n, d) {
        return parse(n, d);
    }
    function parseDecimal(n) {
        var parts = n.split("e");
        if(parts.length > 2) {
            throw new Error("Invalid input: too many 'e' tokens");
        }
        if(parts.length > 1) {
            var isPositive = true;
            if(parts[1][0] === "-") {
                parts[1] = parts[1].slice(1);
                isPositive = false;
            }
            if(parts[1][0] === "+") {
                parts[1] = parts[1].slice(1);
            }
            var significand = parseDecimal(parts[0]);
            var exponent = create(bigInt(10).pow(parts[1]));
            if(isPositive) {
                return significand.times(exponent);
            } else {
                return significand.over(exponent);
            }
        }
        parts = n.split(".");
        if(parts.length > 2) {
            throw new Error("Invalid input: too many '.' tokens");
        }
        if(parts.length > 1) {
            var intPart = create(bigInt(parts[0]));
            var length = parts[1].length;
            while(parts[1][0] === "0") {
                parts[1] = parts[1].slice(1);
            }
            var exp = "1" + Array(length + 1).join("0");
            var decPart = create(bigInt(parts[1]), bigInt(exp));
            return intPart.add(decPart);
        }
        return create(bigInt(n));
    }
    function parse(a, b) {
        if(!a) {
            return create(bigInt(0));
        }
        if(b) {
            return create(bigInt(a), bigInt(b));
        }
        if(typeof a === "object") {
            if(a.instanceofBigInt) {
                return create(a);
            }
            return a;
        }
        var num;
        var denom;

        var text = a + "";
        var texts = text.split("/");
        if(texts.length > 2) {
            throw new Error("Invalid input: too many '/' tokens");
        }
        if(texts.length > 1) {
            var parts = texts[0].split("_");
            if(parts.length > 2) {
                throw new Error("Invalid input: too many '_' tokens");
            }
            if(parts.length > 1) {
                var isPositive = parts[0][0] !== "-";
                num = bigInt(parts[0]).times(texts[1]);
                if(isPositive) {
                    num = num.add(parts[1]);
                } else {
                    num = num.subtract(parts[1]);
                }
                denom = bigInt(texts[1]);
                return create(num, denom).reduce();
            }
            return create(bigInt(texts[0]), bigInt(texts[1]));
        }
        return parseDecimal(text);
    }

    parse.zero = parse(0);
    parse.one = parse(1);
    parse.minusOne = parse(-1);

    return parse;
})();
if (typeof module !== "undefined") {
    if (module.hasOwnProperty("exports")) {
        module.exports = bigRat;
    }
}
