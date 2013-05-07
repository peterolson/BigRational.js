var testResults = (function () {
    var results = [];
    var asserts = {
        "1 = 1": bigRat(1).equals(1),
        "0 = -0": bigRat(0).equals("-0"),
        "1 + 0 + -1 = 0": bigRat.one.add(bigRat.zero).add(bigRat.minusOne).add().equals(0),
        "0_1/2 > -0_1/2": bigRat("0_1/2").greater("-0_1/2"),
        "1/4 != 3/2": bigRat("1/4").notEquals(3 / 2),
        "4/9 != -4/9": bigRat(4, 9).notEquals(-4, 9),
        "1/3 + 1/3 = 2/3": bigRat("1/3").add(1, 3).equals(2, 3),
        "9/10 < 10/11": bigRat(9, 10).lesser("10/11"),
        "3/10 < 1/3": bigRat(3, 10).lesser(1, 3),
        "45/2 > 51/3": bigRat(45, 2).greater(51, 3),
        "2 >= 2": bigRat(2).greaterOrEquals(2),
        "5/3 <= 5/3": bigRat(5, 3).lesserOrEquals(5, 3),
        "compare(3,3) = 0": bigRat(3).compare(3) === 0,
        "compare(3,4) = -1": bigRat(3).compare(4) === -1,
        "compare(4,3) = 1": bigRat(4).compare(3) === 1,
        "1_1/2 = 3/2": bigRat("1_1/2").equals(3, 2),
        "1.05 = 105/100": bigRat("1.05").equals(105 / 100),
        "negate 234 = -234": bigRat(234).negate().equals(-234),
        "negate -54 = 54": bigRat(-54).negate().equals(54),
        "abs -424 = 424": bigRat(-424).abs().equals(424),
        "abs 543333 = 543333": bigRat(543333).abs().equals(543333),
        "1.32543543 + 5.43537467567 = 6.76081010567": bigRat("1.32543543").add("5.43537467567").equals("6.76081010567"),
        "42354364564.2342356354 * 5764567433.23423565454": bigRat("42354364564.2342356354").multiply("5764567433.23423565454").equals("61038647655578703408451022496533627948679", "250000000000000000000"),
        "6519874651.165496841654 / 9849841624.148923198494233": bigRat("6519874651.165496841654").over("9849841624.148923198494233").equals("6519874651165496841654000/9849841624148923198494233"),
        "8871631566.561964161 - 5616430464160894.549646516516543": bigRat("8871631566.561964161").minus("5616430464160894.549646516516543").equals("-5616421592529327_987682355516543/1000000000000000"),
        "10000000000000000/100000000000000000000000 * 65400000000000000/200000000000054": bigRat("10000000000000000/100000000000000000000000").times("65400000000000000/200000000000054").equals("3270000000/100000000000027"),
        "3 % 2 = 1": bigRat(3).mod(2).equals(1),
        "3/2 % 4/3 = 1/6": bigRat(3, 2).mod(4, 3).equals(1, 6),
        "(31254654134/216487492057) % (420000000135/1223785553)": bigRat("31254654134/216487492057").mod("420000000135/1223785553").equals("31254654134/216487492057"),
        "floor 65546 = 65546": bigRat(65546).floor().equals(65546),
        "floor 12345.4 = 12345": bigRat("12345.4").floor().equals(12345),
        "floor 987.99999 = 987": bigRat("987.99999").floor().equals(987),
        "ceil 12345.546 = 12346": bigRat("12345.4").ceil().equals(12346),
        "ceil 987.0001 = 988": bigRat("987.0001").ceil().equals(988),
        "ceil 3234523 = 3234523": bigRat(3234523).ceil().equals(3234523),
        "round 1234567890 = 1234567890": bigRat("1234567890").round().equals("1234567890"),
        "round 54345.12566 = 54345": bigRat("54345.12566").round().equals(54345),
        "round 1234567.5 = 1234568": bigRat("1234567.5").round().equals(1234568),
        "0 is positive": bigRat(0).isPositive(),
        "-1/1000 is negative": bigRat("-1/1000").isNegative(),
        "0 is zero": bigRat("0").isZero(),
        "1000000000000 is not zero": !bigRat("1000000000000").isZero(),
        "valueOf 1/4 + 3/4 = 1": bigRat(1, 4) + bigRat(3 / 4) === 1,
        "valueOf 1/7 = 1/7": bigRat(1, 7).valueOf() === 1 / 7,  // Issue #1
        "1/9 toDecimal = '0.9'": bigRat(9, 10).toDecimal() === "0.9" // Issue #2
    };
    for(var i in asserts) {
        var result = i + ": ";
        if(asserts[i]) {
            result += "<b>Passed</b>";
        } else {
            result += "<u>Failed</u>";
        }
        results.push(result);
    }
    return results.join("<br>");
})();
