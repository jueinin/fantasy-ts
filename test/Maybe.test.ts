import {Maybe} from "../src/Maybe";
import {Either, Right} from "../src/Either";
import {is} from "ramda";

describe('maybe',()=>{
    it('of', function () {
        expect(Maybe.of(2).join()).toEqual(2);
    });
    it('map', function () {
        expect(Maybe.of(1).map(value => value + 2).join()).toEqual(3);
        const a = () => Math.random() > 0.5 ? Maybe.of(1) : Maybe.of(null);
        expect((a() as Maybe<number>).map(value => value + 1).map(value => value + 2).join()).toEqual(null);

    });
    it('chain', function () {
        const a = Maybe.of(3).chain(value => Either.of(value + 1));
        expect(is(Right, a)).toBeTruthy();
        expect(a.join()).toEqual(4);
    });
    it('join', function () {
        const v = Maybe.of(Maybe.of(2));
        expect(v.join().join()).toEqual(2);
    });
})
