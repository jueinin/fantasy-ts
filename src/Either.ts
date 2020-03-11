import {toString, equals, isNil, cond, both, always, curry, is} from 'ramda';
import {Callback, Functor} from "./type";
// todo add traverse and sequence method

// // @ts-ignore
// function either<Input, Return>(leftCallback:Callback<Input, Return>,rightCallback:null,either:Either<Input>):Return;
// function either<Input, Return>(leftCallback:null,rightCallback:Callback<Input, Return>,either:Either<Input>):Return;
// // @ts-ignore
function either<Input, Return>(leftCallback:Callback<Input, Return>,rightCallback:Callback<Input, Return>,either:Either<Input>):Return{
    if (is(Function, leftCallback) && is(Left, either)) {
        return leftCallback(either.$value);
    }
    return rightCallback(either.$value);

}

export abstract class Either<Value> {
    protected constructor(public $value: Value) {}
    static of<P>(value: P) {
        return new Right(value);
    }

    static Left = <V>(value: V) => {
        return new Left(value);
    };
    static Right = <V>(value: V) => {
        return new Right(value);
    };
    static either = either; // can not curry it,otherwise it's type will be wrong
    abstract map<Return>(fn:Callback<Value, Return>):Either<Return>;

    abstract ap<Input, Return>(functor: Functor<Input>): Either<Return>;

    abstract chain<V = Functor<any>>(fn: (value: Value) => V): V;

    abstract join(): Value;

    abstract equals(either: Either<any>): boolean;

    abstract toString(): string;
}
export class Left<Value> extends Either<Value> implements Functor<Value>{
    constructor(value: Value) {
        super(value);
    }
    static of<T>(value:T) {
        return new Left(value);
    }
    isLeft = true;
    isRight = false;
    toString = () => {
        return `Either.Left(${toString(this.$value)})`;
    };
    equals = (left: Left<any>):boolean => {
        return equals(this.$value, left.$value);
    };
    map = <Return>(fn: Callback<Value, Return>):Left<Return> => {
        // @ts-ignore    // keep the right parameter and return value, but will not actually execute
        return this;
    };
    ap = <Input, Return>(functor: Functor<Input>):Right<Return> => {
        // @ts-ignore
        return this;
    };
    chain = <V = Functor<any>>(fn: (value: Value) => V):V => {
        // @ts-ignore
        return this;
    };
    join=():Value=>{
        // @ts-ignore
        return this;
    }
}
export class Right<Value> extends Either<Value> implements Functor<Value>{
    constructor(value: Value) {
        super(value);
    }
    static of = <V>(value: V) => {
        return new Right(value);
    };
    isLeft = false;
    isRight = true;
    map = <Return>(fn: Callback<Value, Return>) => {
        return Either.of<Return>(fn(this.$value));
    };
    toString = () => {
        return `Either.Right(${toString(this.$value)})`
    };
    equals = (right: Right<any>):boolean => {
        return equals(this.$value, right.$value);
    };
    ap = <Input, Return>(functor: Functor<Input>):Right<Return> => {  // todo IO need to be a Functor
        const callback = this.$value as unknown as Callback<Input, Return>;
        return Right.of(callback(functor.$value));
    };
    chain = <V = Functor<any>>(fn: (value: Value) => V):V => {
        return fn(this.$value);
    };
    join=():Value=>{
        return this.$value;
    }
}
