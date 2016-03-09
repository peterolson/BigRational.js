describe("BigRational", function () {

    beforeAll(function () {
        jasmine.addCustomEqualityTester(function (a, b) {
            return bigRat(a).equals(b);
        });
    });

    describe("addition", function () {
        it("works", function () {
            expect(bigRat(1, 3).add(1, 3)).toEqual("2/3");
            expect(bigRat(1, 3).add(1, 2)).toEqual("5/6");
            expect(bigRat("1.32543543").add("5.43537467567")).toEqual("6.76081010567");

            expect(bigRat(-1, 3).add(1, 3)).toEqual("0");
            expect(bigRat(1, -3).add(1, 2)).toEqual("1/6");
            expect(bigRat("-1.32543543").add("-5.43537467567")).toEqual("-6.76081010567");

            expect(bigRat.one.add(bigRat.zero).add(bigRat.minusOne).add()).toEqual(0);
        });
    });
    describe("subtraction", function () {
        it("works", function () {
            expect(bigRat("8871631566.561964161").minus("5616430464160894.549646516516543")).toEqual("-5616421592529327_987682355516543/1000000000000000");
        });
    });
    describe("negation", function () {
        it("works", function () {
            expect(bigRat(234).negate()).toEqual(-234);
            expect(bigRat(-54).negate()).toEqual(54);
        });
    });
    describe("absolute value", function () {
        it("works", function () {
            expect(bigRat(-424).abs()).toEqual(424);
            expect(bigRat(543333).abs()).toEqual(543333);
        });
    });
    describe("multiplication", function () {
        it("works", function () {
            expect(bigRat("42354364564.2342356354").multiply("5764567433.23423565454")).toEqual("61038647655578703408451022496533627948679/250000000000000000000");
            expect(bigRat("10000000000000000/100000000000000000000000").times("65400000000000000/200000000000054")).toEqual("3270000000/100000000000027");
        });
    });
    describe("division and modulus", function () {
        it("works", function () {
            expect(bigRat("6519874651.165496841654").over("9849841624.148923198494233")).toEqual("6519874651165496841654000/9849841624148923198494233");

            expect(bigRat("31254654134/216487492057").mod("420000000135/1223785553")).toEqual("31254654134/216487492057");
            expect(bigRat(3).mod(2)).toEqual(1);
            expect(bigRat("3/2").mod("4/3")).toEqual("1/6");
        });
    });
    describe("reciprocation", function () {
        it("works", function () {
            expect(bigRat(3, 2).reciprocate()).toEqual("2/3");
        });
    });
    describe("exponentiation", function () {
        it("works", function () {
            expect(bigRat(3, 2).pow(10)).toEqual("59049/1024");
        });
    });
    describe("comparison", function () {
        it("works", function () {
            expect(bigRat(1)).toEqual(1);
            expect(bigRat(0)).toEqual("-0");
            expect(bigRat("1_1/2")).toEqual("3/2");
            expect(bigRat("1.05")).toEqual(105 / 100);

            expect(bigRat("1/4")).not.toEqual(3 / 2);
            expect(bigRat("4/9")).not.toEqual("-4/9");

            expect(bigRat("0_1/2").greater("-0_1/2")).toBe(true);
            expect(bigRat("45/2").greater("51/3")).toBe(true);

            expect(bigRat(9, 10).lesser("10/11")).toBe(true);
            expect(bigRat(3, 10).lesser("1/3")).toBe(true);

            expect(bigRat(2).greaterOrEquals(2)).toBe(true);
            expect(bigRat(5, 3).lesserOrEquals(5, 3)).toBe(true);

            expect(bigRat(3).compare(3) === 0).toBe(true);
            expect(bigRat(3).compare(4) === -1).toBe(true);
            expect(bigRat(4).compare(3) === 1).toBe(true);

            expect(bigRat(3).compareAbs(-4) === -1).toBe(true);
            expect(bigRat(-3).compareAbs(-4) === -1).toBe(true);
            expect(bigRat(-4).compareAbs(-4) === 0).toBe(true);
            expect(bigRat(-4).compareAbs(4) === 0).toBe(true);
            expect(bigRat(4).compareAbs(3) === 1).toBe(true);
            expect(bigRat(-4).compareAbs(3) === 1).toBe(true);

            expect(bigRat("9.999701656077919E307").equals("9.999701656077919e307")).toBe(true); // Issue #11
        });
    });
    describe("floor and ceiling", function () {
        it("work", function () {
            expect(bigRat(65546).floor()).toEqual(65546);
            expect(bigRat("12345.4").floor()).toEqual(12345);
            expect(bigRat("987.99999").floor()).toEqual(987);
            expect(bigRat("12345.4").ceil()).toEqual(12346);
            expect(bigRat("987.0001").ceil()).toEqual(988);
            expect(bigRat(3234523).ceil()).toEqual(3234523);
        });
    });
    describe("round", function () {
        it("works", function () {
            expect(bigRat("1234567890").round()).toEqual("1234567890");
            expect(bigRat("54345.12566").round()).toEqual(54345);
            expect(bigRat("1234567.5").round()).toEqual(1234568);
        });
    });
    describe("sign checking", function () {
        it("works", function () {
            expect(bigRat("-1/1000").isNegative()).toBe(true);
            expect(bigRat("1/1000").isNegative()).toBe(false);
            expect(bigRat("0").isNegative()).toBe(false);
            expect(bigRat("-0").isNegative()).toBe(false);

            expect(bigRat("1/65").isPositive()).toBe(true);
            expect(bigRat("-1/65").isPositive()).toBe(false);
            expect(bigRat("0").isPositive()).toBe(false);
            expect(bigRat("-0").isPositive()).toBe(false);

            expect(bigRat("0").isZero()).toBe(true);
            expect(bigRat("-0").isZero()).toBe(true);
            expect(bigRat("1000000000000").isZero()).toBe(false);
            expect(bigRat("-4325/241").isZero()).toBe(false);
        });
    });
    describe("toDecimal", function () {
        it("works", function () {
            expect(bigRat(9, 10).toDecimal() === "0.9").toBe(true); // Issue #2  
            expect(bigRat("55", "-75").toDecimal() === bigRat("-55", "75").toDecimal()).toBe(true); // Issue #10
            expect(bigRat("-55", "75").toDecimal() === '-0.7333333333').toBe(true); // Issue #18
            expect(bigRat("7.108").toDecimal(2) === "7.10").toBe(true); // Issue #20
            expect(bigRat(1, 7).toDecimal(14) === "0.14285714285714").toBe(true);
            expect(bigRat(17.027183424215764).toDecimal(2) === "17.02").toBe(true); // Issue #21
            expect(bigRat(1, 4096).toDecimal(5) === "0.00024").toBe(true);
            expect(bigRat(-1).toDecimal() === "-1").toBe(true);
        });
    });
    describe("toString", function () {
    });
    describe("valueOf", function () {
        it("works", function () {
            expect(bigRat(1, 4) + bigRat(3 / 4) === 1).toBe(true);
            expect(bigRat(1, 7).valueOf() === 1 / 7).toBe(true);  // Issue #1
            expect(bigRat(-1).subtract(-0.9).valueOf() === -0.1).toBe(true); // Issue #9

            expect(bigRat(-1.5).valueOf() === -1.5).toBe(true);
            expect(bigRat(" -1.5").valueOf() === -1.5).toBe(true);
            expect(bigRat("-1.5 ").valueOf() === -1.5).toBe(true);
        });
    });
});