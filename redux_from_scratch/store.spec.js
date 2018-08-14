"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
// Run with
// $ node *.spec.js
// node  --experimental-modules store.spec.js
console.log("here");
var store_js_1 = require("./store.js");
var test_simply_1 = require("./test_simply");
try {
    var expectEqual_1 = test_simply_1.equal;
    var setup_1 = function () {
        var reducer = function (action, state) {
            switch (action.type) {
                case 'test_action':
                    return __assign({}, state, { wasCalled: 'called' });
                default:
                    return state;
            }
        };
        var store = store_js_1.Store(reducer);
        return {
            store: store
        };
    };
    test_simply_1.it('adds a listener', function (m) {
        var store = setup_1().store;
        store.subscribe(function () { return null; });
        expectEqual_1(store.listeners.length, 1, m);
    })();
    test_simply_1.it('dispatches to listeners', function (m) {
        var store = setup_1().store;
        var wasCalled = 'not called';
        store.subscribe(function (state) { wasCalled = state.wasCalled; });
        store.dispatch({ type: 'test_action' });
        expectEqual_1(wasCalled, 'called with true', m);
    })();
    test_simply_1.it('creates a thunk', function (m) {
        var store = setup_1().store;
        var wasCalled = 'not called';
        var thunk = store.thunk(function (handler) {
            //... do the async request ...
            handler('called');
        }, function (response) { wasCalled = response; });
        thunk();
        expectEqual_1(wasCalled, 'called', m);
    })();
    test_simply_1.it('creates a thunk with delay', function (m) {
        test_simply_1.async(function (done) {
            var store = setup_1().store;
            var wasCalled = 'not called';
            var thunk = store.thunk(function (handler) { handler('called'); }, function (response) {
                wasCalled = response;
            }, 500);
            thunk().then(function () {
                expectEqual_1(wasCalled, 'called', m);
                done();
            });
        }, m);
    })();
    test_simply_1.itAsync('creates a thunk with async test delay', function (m) {
        var store = setup_1().store;
        var wasCalled = 'not called';
        var thunk = store.thunk(function (cb) { cb('called'); }, function (response) {
            wasCalled = response;
        }, 500);
        thunk().then(function () {
            expectEqual_1(wasCalled, 'called', m);
        });
    })();
}
catch (error) {
    console.error(error);
}
