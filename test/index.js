import test from 'zora';
import {pointer} from '../dist/src/index';

test('pointer get', t => {
    const {get: foo} = pointer('foo');
    t.equal(foo(), undefined);
    t.equal(foo('foo'), undefined);
    t.equal(foo({bar: 'foo'}), undefined);
    t.equal(foo({foo: 'bar'}), 'bar');
    const {get: foobar} = pointer('foo.bar');
    t.equal(foobar(), undefined);
    t.equal(foobar('blah'), undefined);
    t.equal(foobar({foo: 'bar'}), undefined);
    t.equal(foobar({foo: {bar: 'woot'}}), 'woot');
    t.equal(foobar({foo: null}), null);
    t.equal(foobar({foo: {bar: null}}), null);
    const {get: foobarblah} = pointer('foo.bar.blah');
    t.equal(foobarblah({foo: {bar: {blah: 'hello'}}}), 'hello');
});
test('pointer set short path', t => {
    const {set: foo} = pointer('foo');
    const target = {};
    foo(target, {otherfoo: 'bar'});
    t.deepEqual(target, {foo: {otherfoo: 'bar'}});
});
test('pointer set long path', t => {
    const {set: foobar} = pointer('foo.bar');
    const target = {};
    foobar(target, {blah: 'woot'});
    t.deepEqual({foo: {bar: {blah: 'woot'}}}, target);
});
test('pointer should blend if there is already a tree', t => {
    const {set: foo} = pointer('foo');
    const target = {foo: {bar: 'woot'}};
    foo(target, {anotherblah: 'wootbis'});
    t.deepEqual(target, {foo: {bar: 'woot', anotherblah: 'wootbis'}});
});
