import {Callback, Functor} from "./type";

type IOFunction<Return> = () => Return
type IOFunctionRequired<Param, Return> = (value: Param) => Return
interface IOFunctor<Return> {  // Param and Return are the $value Param,and Return
    map: <FnOutPut>(fn: IOFunctionRequired<Return, FnOutPut>) => IOFunctor<FnOutPut>  // $value(param)  param is this param of fn in IO.of
}


export class IO<Return,Value=IOFunction<Return>> implements IOFunctor<Return> {
    constructor(public $value:IOFunction<Return>) {
    }
    static of<Param,Return>(fn:IOFunction<Return>) {
        return new IO(fn)
    }

    map: <FnOutPut>(fn: IOFunctionRequired<Return, FnOutPut>) => IO<FnOutPut>= fn => {
        return IO.of(() => fn(this.$value()));
    }
    // ap = (functor: Functor<any>) => {
    //     return this.chain(fn => functor.map(fn));
    // };
    /**@description fn must return a new IO */
    // chain = <R>(fn: (value:Return)=>IO<R>):IO<R> => {
    //     return fn(this.$value());
    // };
    // join = () => this.$value;
    runIo=()=>{
        return this.$value();
    }

}
// export class IO implements IOFunctor{
//     // constructor(public $value:IOFunction) {
//     // }
//
//     // static of(value: IOFunction) {
//     //     return new IO(value)
//     // }
//     //
//     // map: (fn: any) => any;
//     //
//
// }
