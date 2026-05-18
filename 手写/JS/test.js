{
  const obj = {
    name: "obj",
    getArrow: function () {
      return () => console.log(this.name);
    },
    getDirect: () => console.log(this?.name),
  };

  const arrow = obj.getArrow();
  arrow(); // ?obj
  obj.getDirect(); //undefined
}

{
  async function test() {
    // throw new Error("ces");
    return 1234;
  }

  await test();
  console.log("res");
}

{
  console.log("1");
  setTimeout(() => {
    console.log("2");
    Promise.resolve().then(() => console.log("3"));
  }, 0);
  Promise.resolve().then(() => {
    console.log("4");
    setTimeout(() => console.log("5"), 0);
  });
  console.log("6");
}
