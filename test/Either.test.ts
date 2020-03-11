import {Either, Left, Right} from '../src/Either';
import {curry, either} from "ramda";

describe('either', () => {
    it('create either', function() {  // we can not get an Either instance
        expect(Either.of(2) instanceof Right).toBeTruthy();
    });
    it('either of', function () {
        const value = Either.of(2).map(value => value + 1).map(value => value + 1).map(value => '' + value).map(value => value).$value;
        expect(value === '4').toBeTruthy();
    });
    it('Either.Left', function () {
        const value = Either.Left('dd').map(value => 1).map(value => value + 1).map(value => value + 'dd').map(value => value.concat('dd'));
        expect(value.$value).toEqual('dd');
    });
    it('Either.either', function () {
        const left = Either.Left(1);
        expect(Either.either((value) => value + 1, (value) => value + 12, left)).toEqual(2);

        expect(Either.either((v) => v + 1, v => v + 2, Right.of(1))).toEqual(3);
    });
    it('Left.of', function () {
        const value = Left.of('dd').map(value => value.slice(1));
        expect(value.$value).toEqual('dd');
    });
    it('Left.equal', function () {
        const one = Left.of({name: 'c'});
        const two = Left.of({name: 'd'});
        expect(one.equals(two)).toBeFalsy();
    });
    it('Either.Right', function () {
        const value = Either.Right('dd').map(value => value.concat('dd')).map(value => 1);
        expect(value.$value).toEqual(1);
    });
    it('Right.of', function () {
        const va = Right.of('dd').map(value => value.concat('d'));
        expect(va.$value).toEqual('ddd');
    });
    it('Right.equals', function () {
        const v = Right.of('dd');
        const v1 = Right.of('ddd');
        const v2 = Right.of('dd');
        expect(v.equals(v1)).toBeFalsy();
        expect(v.equals(v2)).toBeTruthy();
    });
    it('Right.ap', function () {
        const two = Left.of(2);
        const three = Left.of(3);
        const v = Right.of(curry((x: number, y: number) => x + y)).ap(two).ap(three);

        expect(v.$value).toEqual(5);
    });
    it('Left.ap', function () {
        const fn=(x: number, y: number) => (y:number) => x + y
        const v = Left.of(fn).ap(Left.of(2)).ap(Left.of(3));
        console.log(v)
        expect(v.$value).toEqual(fn);
    });
    it('Right.chain', function () {
        const value = Right.of(1).chain(value => Left.of(value + 'dd')).map(value => value + '1');
        expect((value instanceof Left) && value.$value === '1dd').toEqual(true);
    });
    it('Left.chain', function () {
        const v = Left.of(1).chain(value => Right.of(value + 1));
        expect(v instanceof Left && v.$value === 1).toBeTruthy();
    });
    it('join', function () {
        const v=Left.of(Right.of(1));
        expect(Right.of(Right.of(1)).join().$value).toEqual(1);
        expect((v).join()).toEqual(v);
    });
});
