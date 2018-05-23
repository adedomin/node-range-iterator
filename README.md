Node range-iterator
===================

proper iterator that implements a range() like python's for nodejs/javascript.

Using
-----

    const range = require('range');
    let start = 0;
    let end = 10;
    let increment = 2;
    for (let i of range(start, end, increment)) {
        // do something with i
    }
