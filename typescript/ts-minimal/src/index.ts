import add from "./utils";

const result = add(2, 3);
console.log(`The result is: ${result}`);

[1, 2, 3].map((x) => x * 2);

type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface User {
  id: number;
  name: string;
}

type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

console.log("1");

// "strictNullChecks": false,
// 开启这个，null, undefined 是 其他类型的子类
const temp: string = null;
const temp1: number = null;
const temp2: boolean = null;

// 数组
const arr: string[] = []
const arr1: string[] = ["1", "2"]
arr1[4]
// 元组
const arr2: [string, string] = ["1", "2"]
// arr2[4]
// const [age, name, size] = arr2 

type Props = 
  | { defaultValue?: string; value?: never }
  | { value?: string, defaultValue?: never; }

const props: Props = { defaultValue: '12' }