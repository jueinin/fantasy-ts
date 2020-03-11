

export type Callback<Input,Return>= (value: Input) => Return // what's different between generic in type and generic in function??
export interface Functor<Value> {
    $value: Value;
    map: <Return>(fn: Callback<Value, Return>)=>Functor<Return>;
}
