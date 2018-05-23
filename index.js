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
 * Iterator goes from [start, end). if start is greater than end,
 * they are reversed and the sign on the increment is reversed as well
 *
 * @param {number} start - inclusive starting point;
 *                         if other parameters are omitted
 *                         it's the excluded end point.
 * @param {?number} end - excluded end point.
 * @param {?number} increment - value to increment by.
 */
function range(start, end, increment=1) {

    if (typeof start != 'number') {
        throw TypeError('must give at least one numeric parameter');
    }
    if (typeof end != 'number') {
        end = start;
        start = 0;
    }

    if (start > end) {
        let tmp = start;
        start = end;
        end = tmp;
        // implicitly change sign on increment
        // so negative ones
        // will work as expected
        increment = -increment;
    }

    // avoid accum floating point errors.
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
                        value: start + stepsDone++ * increment,
                    };
                },
            }
        },
    }
}

module.exports = range;
