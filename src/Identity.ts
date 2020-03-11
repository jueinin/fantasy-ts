import {Callback, Functor} from "./type";
import {equals, toString} from "ramda";

export class Identity<Value> implements Functor<Value>{
    constructor(public $value:Value) {
    }

    static of = <V>(value: V) => {
        return new Identity(value);
    };
    map: <Return>(fn: Callback<Value, Return>) => Functor<Return> = (fn) => {
        return Identity.of(fn(this.$value));
    };
    toString = () => {
        return `Identity(${toString(this.$value)})`;
    };
    equals = (identity: Identity<any>) => equals(this.$value, identity.$value);

    ap = <Input, Return>(functor: Functor<Input>): Identity<Return> => {
        const callback = this.$value as unknown as Callback<Input, Return>;
        return Identity.of(callback(functor.$value));
    };
    chain = <V extends Functor<any>>(fn: (value: Value) => V): V => {
        return fn(this.$value);
    };
    join = () => this.$value;

}
