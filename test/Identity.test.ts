import {Identity} from "../src/Identity";
import {Either, Right} from "../src/Either";
import {is} from "ramda";

describe('Identity',()=>{
    it('of', function () {
        const v = Identity.of({name: 'chen'}).map(value => value.name.slice(1)).$value;
        expect(v).toEqual('hen');
    });
    it('toString', function () {
        expect(Identity.of(1).toString()).toEqual('Identity(1)');
    });
    it('equals', function () {
        expect(Identity.of({a: 'a'}).equals(Identity.of({a: 'a'}))).toBeTruthy();
    });
    it('ap', function () {
        const v = Identity.of((x: number) => x + 1).ap(Either.of(1));
        expect(v.$value === 2 && (v instanceof Identity)).toEqual(true);
    });
    it('chain', function () {
        const v = Identity.of(1).chain(v => Either.of(v + 1));
        expect(is(Either, v) && is(Right, v) && v.$value === 2).toBeTruthy();
    });
    it('join', function () {
        expect(Identity.of(Identity.of(2)).join().join()).toEqual(2);
    });
})
