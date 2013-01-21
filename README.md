BigRational.js
=========

**BigRational.js** is an arbitrary-length rational number library for Javascript, allowing arithmetic operations on rational numbers of unlimited size, notwithstanding memory and time limitations.

A *rational number* is stored internally as a pair of two big integers. Because of this, BigRational.js depends on my big integer library, [BigInteger.js](https://github.com/peterolson/BigInteger.js).

Installation
---
If you are using a browser, you can download [BigRational.js from GitHub](http://peterolson.github.com/BigRational.js/BigInt_BigRat.min.js) or just hotlink to it.

    <script src="http://peterolson.github.com/BigRational.js/BigInt_BigRat.min.js"></script>

This will include both the `bigInt` library and the `bigRat` library. If you want to reference them separately, you can use the [non-combined BigRational.js script](http://peterolson.github.com/BigRational.js/BigRational.min.js).

If you are using node, you can install BigRational.js with [npm](https://npmjs.org/).

    npm install big-rational

Then you can include it in your code

    var bigRat = require("big-rational");

`bigRat(num?, denom?)`
---
You can create a bigRational by calling the `bigRat` function. You can pass in up to two paramers.

**`bigRat()`**

If you pass in zero parameters, it will return zero.

**`bigRat(n)`**

If you pass in one parameter, it must be one of the following:

 - a string, which may be
   - an integer, such as `"12345"`,
   - a numerator over a denominator, such as `"2/3"`,
   - a mixed fraction, such as `"1_1/2"`
   - a decimal number, such as `"54.05446"`
 - a Javascript number
 - a bigInteger
 - a bigRational

**`bigRat(num, denom)`**

If you pass in two parameters, the first will be interpreted as the numerator, and the second as the denominator. Both parameters must be one of the following: 

 - a string in integer form, such as `"12345"`
 - a JavaScript number that is an integer, such as `12345`
 - a bigInteger

**Examples:**

    var zero = bigRat();
    var threeFourths = bigRat("3/4")    ||
                       bigRat("3", "4") ||
                       bigRat(3, 4)     ||
                       bigRat(3 / 4)    ||
                       bigRat(0.75);
    var fiveHalves =   bigRat("5/2") ||
                       bigRat("2_1/2");

Method Chaining
---
Note that bigRat operations return bigRats, which allows you to chain methods, for example:

    var salary = bigRat(dollarsPerHour).times(hoursWorked).plus(randomBonuses)

Constants
---

There are three constants already stored that you do not have to construct with the `bigRat` function yourself:

 - `bigRat.one`, equivalent to `bigRat(1)`
 - `bigRat.zero`, equivalent to `bigRat(0)`
 - `bigRat.minusOne`, equivalent to `bigRat(-1)`

Properties
===

You can obtain the numerator and denominator of a bigRational with these properties:

`numerator`
---
Returns the numerator of a bigRational. This will be a bigInt.

 - `bigRat(34, 3).numerator` => `bigInt(34)`

`denominator`
---
Returns the denominator of a bigRational. This will be a bigIn.t

 - `bigRat(34, 3).denominator` => `bigInt(3)`

`num`
---
Alias for the `numerator` property

`denom`
---
Alias for the `denominator` property

Methods
===

`abs`
---
Returns the absolute value of a number.

 - `bigRat(-424).abs().equals(424)`

`add`
---
Performs addition.

 - `bigRat("1/3").add(1, 3).equals(2, 3)`

`ceil(toBigInt?)`
---
Rounds up to the nearest integer. If the `toBigInt` argument is `true`, then it will return a bigInteger instead of a bigRational.

 - `bigRat(12345.4).ceil().equals(12346)`

`compare`
---
Performs a comparison between two numbers. If the numbers are equal, it returns `0`. If the first number is greater, it returns `1`. If the first number is lesser, it returns `-1`.

 - `bigRat(3).compare(3) === 0`
 - `bigRat(3).compare(4) === -1`
 - `bigRat(4).compare(3) === 1`

`divide`
---
Performs division.

 - `bigRat("354.25").divide(1, 4).equals(1417)`

`equals`
---
Checks if two numbers are equal.

 - `bigRat(1).equals(1)`

`floor(toBigInt?)`
---
Rounds down to the nearest integer. If the `toBigInt` argument is `true`, then it will return a bigInteger instead of a bigRational.

 - `bigRat(987.99999).floor().equals(987)`

`greater`
---
Checks if the first number is greater than the second

 - `bigRat(5).greater(4)`

`greaterOrEquals`
---
Checks if the first number is greater than or equal to the second

 - `bigRat(5).greaterOrEquals(5)`
 - `bigRat(5).greaterOrEquals(4)`

`isNegative`
---
Returns `true` if the number is negative, `false` otherwise.

 - `bigRat(-7).isNegative()`

`isPositive`
---
Returns `true` if the number is positive, `false` otherwise.

 - `bigRat(7).isPositive()`

`isZero`
---
Returns `true` if the number equals 0, `false` otherwise.

 - `bigRat(0).isZero()`

`lesser`
---
Checks if the first number is lesser than the second

 - `bigRat(4).lesser(5)`

`lesserOrEquals`
---
Checks if the first number is lesser than or equal to the second

 - `bigRat(4).lesserOrEquals(4)`
 - `bigRat(4).lesserOrEquals(5)`

`minus`
---
Alias for `subtract`.

`mod`
---
Performs the modulo operation.

 - `bigRat(3).mod(2).equals(1)`

`multiply`
---
Performs multiplication.

 - `bigRat(70, 2).multiply(4).equals(140)`

`negate`
---
Returns the negation of a number.

 - `bigRat(234).negate().equals(-234)`

`notEquals`
---
Checks if two numbers are not equal.

 - `bigRat(1).notEquals(2)`

`over`
---
Alias for `divide`.

`plus`
---
Alias for `add`.

`round(toBigInt?)`
---
Rounds a number to the nearest integer. If the number is exactly half-way between two integers, it will round up.
If the `toBigInt` argument is `true`, then it will return a bigInteger instead of a bigRational.

 - bigRat(54345.12566).round().equals(54345)
 - bigRat(1234567.5).round().equals(1234568)
 - bigRat(69.8).round().equals(70)

`subtract`
---
Performs subtraction.

 - `bigRat(3).subtract(2).equals(1)

`times`
---
Alias for `multiply`.

`toDecimal(digits?)`
---
Converts a bigRational to a string in decimal notation, cut off after the number of digits specified in the `digits` argument. The default number of digits is 10.

 - `bigRat(1,3).toDecimal() === "0.33333333333"`
 - `bigRat(1,7).toDecimal(14) === "0.142857142857143"`

Override Methods
===

`toString()`
---
Converts a bigRat to a string in "numerator/denominator" notation.

 - `bigRat(145.545).toString() === "29109/200"`

`valueOf()`
---
Converts a bigRat to a native Javascript number. This override allows you to use native arithmetic operators without explicit conversion:

 - `bigRat(1, 4) + bigRat(3, 4) === 1`