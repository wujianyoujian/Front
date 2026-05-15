const obj = {
  name: "obj",
  getArrow: function () {
    return () => console.log(this.name);
  },
  getDirect: () => console.log(this.name),
};

const arrow = obj.getArrow();
arrow(); // ?
obj.getDirect();
