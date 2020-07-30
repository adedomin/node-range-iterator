/*
 * Copyright (c) 2020, Anthony DeDominic <adedomin@gmail.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

'use strict';

const range = require('./index.js');
const test = require('tape');


// compare python3 -c 'print(list(range(0,5,1)))'
test('Full parameter case', function (t) {
    let r = [ ...range(0, 5, 1) ];
    t.deepEqual(
        r,
        [ 0, 1, 2, 3, 4 ],
        `result[${r}]: range(0, 5, 1) === [ 0, 1, 2, 3, 4 ]`,
    );
    t.end();
});

// compare python3 -c 'print(list(range(0,-5,-1)))'
test('Negative full parameter', function(t) {
    let r = [ ...range(0, -5, -1) ];
    t.deepEqual(
        r,
        [ 0, -1, -2, -3, -4 ],
        `result[${r}]: range(0, -5, -1) === [ 0, -1, -2, -3, -4 ]`,
    );
    t.end();
});

// compare python3 -c 'print(list(range(0,-5)))'
test('Negative unexpected empty', function(t) {
    let r = [ ...range(0, -5) ];
    t.deepEqual(
        r,
        [],
        `result[${r}]: range(0, -5) === []`,
    );
    t.end();
});

// compare python3 -c 'print(list(range(5)))'
test('Single parameter case', function(t) {
    let r = [ ...range(5) ];
    t.deepEqual(
        r,
        [ 0, 1, 2, 3, 4 ],
        `result[${r}]: range(5) === [ 0, 1, 2, 3, 4 ]`,
    );
    t.end();
});

// NOTE: This is an extension to what python range() offers
// No python3 range equivalent. SEE: python3 -c 'print(list(range(-5)))'
test('EXTENSION: Single negative parameter automatic increment inverseion', function(t) {
    let r = [ ...range(-5) ];
    t.deepEqual(
        r,
        [ 0, -1, -2, -3, -4 ],
        `result[${r}]: range(-5) === [ 0, -1, -2, -3, -4 ]`,
    );
    t.end();
});

// Floating points. NOTE: This is an extension to what python range() offers
// └─> python3 -c 'print(list(range(0, 5, 0.1)))'
// Traceback (most recent call last):
//  File "<string>", line 1, in <module>
// TypeError: 'float' object cannot be interpreted as an integer
test('EXTENSION: floating point increment', function(t) {
    let r = [ ...range(0, 1, 0.1) ];
    let testcase = [];
    // may fail, math is technically equivalent in the range func though
    for (let i = 0; i < r.length; ++i) {
        testcase.push(i * 0.1);
    }

    t.deepEqual(
        r,
        testcase,
        `result[${r}]: range(0, 1, 0.1) === ${testcase}`,
    );
    t.end();
});

test('Parameter validation, start must be set', function(t) {
    t.throws(range.bind(null), /^TypeError/);
    t.end();
});

test('Parameter validation, end must be numeric or null-ish', function(t) {
    t.throws(range.bind(null, 0, 'dafds'), /^TypeError/);
    t.end();
});

test(
    'Parameter validation, increment must be numeric, but not infinite or Not a Number',
    function(t) {
        t.throws(range.bind(null, 0, 100, Infinity), /^TypeError/);
        t.end();
    },
);
