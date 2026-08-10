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
const arr: string[] = [];
const arr1: string[] = ["1", "2"];
arr1[4];
// 元组
const arr2: [string, string] = ["1", "2"];
// arr2[4]
// const [age, name, size] = arr2

type Props =
  | { defaultValue?: string; value?: never }
  | { value?: string; defaultValue?: never };

const props: Props = { defaultValue: "12" };

interface Tmp {
  user:
    | {
        vip: true;
        expires: string;
      }
    | {
        vip: false;
        promotion: string;
      };
}

let tmp: Tmp;
// 根据类型 值来实现类型的互斥
if (tmp.user.vip) {
  // console.log(tmp.user.promotion);
}

// 枚举
enum Status {
  PENDING,
  RESOLVEED,
  REJECTED,
}

// 函数
// 类型签名
function foo(name: string): number {
  return name.length;
}

const foo1 = (name: string): number => {
  return name.length;
};

const foo2 = (args1: string, ...args2: string[]) => {};

function foo3(foo: number, bar: true): string;
function foo3(foo: number, bar?: false): number;
function foo3(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

foo3(400);
foo3(400, true);
foo3(400, false);

// 类

class Foo {
  private props: string;

  constructor(inputProp: string) {
    this.props = inputProp;
  }

  public get Prop(): string {
    return `${this.props}`;
  }

  public set setProp(p: string) {
    this.props = p;
  }

  static staticHandle() {}
}
Foo.staticHandle;

let f: string | number | never;

type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape) {
  switch (shape) {
    case "circle":
      return 3.14;
    case "square":
      return 4;
    // case "triangle":
    //   return 1;
    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

interface IStruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => void;
    baz: {
      handler: () => Promise<void>;
    };
  };
}

interface IStruct1 {
  boo: string;
}

const obj: IStruct = {};
const obj1 = <IStruct>{};

type type1 = IStruct & IStruct1;

type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  };
};

type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  };
};

type Composed = Struct1 & Struct2;

type primitiveProp = Composed["primitiveProp"];

// 索引类型签名
interface AllType {
  propsA: number;
  propsB: boolean;
  // [key: string]: unknown;
}

type PropTypeUnion = AllType[keyof AllType];

// 类型映射
type Stringify<T> = {
  [K in keyof T]: T[K];
};

interface User {
  name: string;
  age: number;
}

const user: Stringify<User> = {
  name: "张三",
  age: 12,
};

const func = (input: string) => {
  return input.length > 10;
};

const func2: typeof func = (name: string) => {
  return name === "linbudu";
};

function isString(input: unknown): input is string {
  return typeof input === "string";
}

function foo55(input: string | number) {
  if (isString(input)) {
    input.replace(/d/, "");
  }
  if (typeof input === "number") {
    console.log(input);
  }
}

// assert
function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") throw new Error();
}

function process(v: unknown) {
  v.toLocaleUpperCase();
  assertString(v);
  v.toLocaleUpperCase();
}

type Partial<T> = {
  [K in keyof T]?: T[K];
};

function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length > b.length ? a : b;
}

longest([1, 3], [4]);

type IsString<T> = T extends string ? "yes" : "no";

interface IRes<TData = unknown> {
  code: number;
  error?: string;
  data: TData;
}

interface IUserProfileRes {
  name: string;
  homepage: string;
  avatar: string;
}

function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {
  return Promise.resolve({
    code: 200,
    data: {
      name: "",
      homepage: "",
      avatar: "",
    },
  });
}

const handle = <T>(input: T): T => {
  return input;
};

type MyPick1<T, K extends keyof T> = {
  [P in K]: T[P];
};

class TagProtector<T extends string> {
  protected __tag__: T
}

type Nominal<T, U extends string> = T & TagProtector<U>

type Test = string extends object ? 1 : 2

const res : Test = 1 