import {IO} from "../src/IO";
import {Right} from "../src/Either";

describe('IO', () => {
    it('of', function () {
        const v = IO.of(() => 2).$value();
        expect(v).toEqual(2);
    });
    it('map', function () {
        const v = IO.of(() => 2).map(value => value + 1).$value();
        const value = IO.of(() => 'dd').map(value => value.concat('d')).$value();
        expect(v).toEqual(3);
        expect(value).toEqual('ddd');
        // const either = IO.of(() => 1).map(value1 => Right.of(1)).join()().join();
        // console.log(either);
    });
    it('chain', function () {
        // const res = IO.of(() => 1).chain(value => {
        //     console.log('ddd');
        //     return IO.of(() => value + 22);
        // }).runIo();
        // expect(res).toEqual(23);
    });
});
