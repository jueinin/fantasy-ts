import {Callback, Functor} from "./type";
import {identity, isNil} from "ramda";

export class Maybe<Value> implements Functor<Value>{
    constructor(public $value:Value) {
    }
    static of<Value>(value:Value) {
        return new Maybe(value);
    }

    static maybe<T>(onSuccess: (value: T) => any=identity, onFail: (value: T) => any=identity, maybe: Maybe<T>) {
        const value = maybe.$value
        if (isNil(value)) {
            return onFail(value)
        }
        return onSuccess(value);
    }

    // @ts-ignore
    map: <Return>(fn: Callback<Value, Return>) => Maybe<Return|Value> = fn => {
        return isNil(this.$value) ? this : Maybe.of(fn(this.$value));
    };
    chain = <T extends Functor<any>>(fn: (value: Value) => T): T => {
        return fn(this.$value);
    };
    join = () => {
        return this.$value;
    };
}
