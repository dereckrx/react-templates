"use strict";
// Blog post
//https://medium.com/@WebReflection/vanilla-js-testing-part-ii-63b9d736121
exports.__esModule = true;
// Github project
// https://github.com/WebReflection/tressa
// GIst
// https://gist.github.com/WebReflection/00531a64bb7b846c9b78e059fc0441ff
//---SYNC TESTS ----------------------------------------------
// For sync tests
// define a default timeout
var test = {
    exitCode: 0,
    timeout: 1000
};
var assert = function (condition, message) {
    try {
        //console.assert.apply(console, arguments);
        var output = condition ? ". " + message : "x " + message;
        console.log(output);
    }
    catch (error) {
        test.exitCode = 1;
        console.error('ERROR:', error.message);
    }
};
exports.assert = assert;
var equal = function (obj1, obj2, testName) {
    if (testName === void 0) { testName = ''; }
    assert(obj1 === obj2, "\"" + testName + "\": expected '" + obj1 + "' to equal '" + obj2 + "'");
};
exports.equal = equal;
var it = function (description, fn) {
    // Create timer to ensure test is actually called
    var timer = setTimeout(function () { return console.error("ERROR: \"" + description + "\" was not called"); }, 200);
    return (function () {
        fn(description);
        clearTimeout(timer);
    });
};
exports.it = it;
// --- ASYNC TEST ----------------------------------------------
// fn:
var async = function (fn, description) {
    // create a timer that will fail if test takes too long
    var timer = setTimeout(function () {
        assert(false, "TIMEOUT: " + description);
    }, test.timeout);
    // invoke test and pass function to clear timeout
    // This is the 'done()' function
    return fn(function () { return clearTimeout(timer); });
};
exports.async = async;
var itAsync = function (description, fn) {
    return function () {
        async(function (done) {
            new Promise(function (res, _) { return res(fn(description)); })
                .then(function () { return done(); });
        }, description);
    };
};
exports.itAsync = itAsync;
exports["default"] = test;
