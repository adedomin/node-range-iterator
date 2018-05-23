/*
 * Copyright (c) 2018, Anthony DeDominic <adedomin@gmail.com>
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
/**
 * Function which returns an iterator like python's range().
 * Iterator goes from [start, end).
 * If only one number is given, an implict range of [0, num) is implied.
 * Increment parameter is reversed if the implicit range goes towards a
 * negative value.
 *
 * <p>
 *   <b>Note:</b> This function allows for ranges that
 *   can go towards infinity in both directions
 *   and will not prevent that.
 * </p>
 *
 * @example
 * const range = require('range-iterator');
 * [ ...range(0, 3, 1) ] // [ 0, 1, 2 ]
 *
 * [ ...range(0, -3, -1) ] // [ 0, -1, -2 ]
 *
 * [ ...range(-5) ] // [ 0, -1, -2, -3, -4, -5 ]
 *
 * for (let i of range(Infinity)) {
 *   console.log(i) // infinite incrementing i
 * }
 *
 * @param {number} start      - inclusive starting point;
 *                              if other parameters are omitted
 *                              it's the excluded end point.
 * @param {?number} end       - excluded end point.
 * @param {?number} increment - value to increment by;
 *                              must be within: $(-\infty, 0) \cup (0, \infty)$
 *
 * @returns {Iterator} an iterator [start, end)
 */
function range(start, end, increment=1) {

    if (typeof start != 'number' || isNaN(start)) {
        throw TypeError('must give at least one numeric parameter');
    }

    // null or undefined
    if (end == undefined) {
        if (start < 0) increment = -increment;
        end = start;
        start = 0;
    }
    else if (typeof end != 'number' || isNaN(end)) {
        throw TypeError(
            'end param must be a number or not given (null or undefined)'
        );
    }

    if (typeof increment != 'number' || increment == 0 ||
        isNaN(increment) || !isFinite(increment)
    ) {
        throw TypeError('Increment must not be 0, NaN or Infinite');
    }

    let steps = (end - start) / increment;
    let stepsDone = 0;

    return {
        [Symbol.iterator]() {
            return {
                next() {
                    if (stepsDone >= steps) {
                        return { done: true };
                    }
                    return {
                        done: false,
                        value: start + (stepsDone++ * increment),
                    };
                },
            }
        },
    }
}

module.exports = range;
