{
  function Animal(name) {
    this.name = name;
    this.color = ["red"];
  }

  Animal.prototype.say = function () {
    return this.name;
  };

  function Dog() {}

  Dog.prototype = new Animal("animal");

  const dog1 = new Dog();
  const dog2 = new Dog();
  dog1.color.push("blue");
  console.log(dog1.color);
  console.log(dog2.color);
}

{
  function Animal(name) {
    this.name = name;
    this.color = ["red"];
  }

  Animal.prototype.say = function () {
    return this.name;
  };

  function Dog(name) {
    Animal.call(this, name);
  }

  Dog.prototype = new Animal();
  Dog.prototype.constructor = Dog;

  const dog1 = new Dog("dog1");
  const dog2 = new Dog("dog2");
  dog1.color.push("blue");
  console.log(dog1.color);
  console.log(dog2.color);
}

{
  function Animal(name) {
    this.name = name;
    this.color = ["red"];
  }

  Animal.prototype.say = function () {
    return this.name;
  };

  function Dog(name) {
    Animal.call(this, name);
  }

  Dog.prototype = Object.create(Animal.prototype);
  Dog.prototype.constructor = Dog;

  const dog1 = new Dog("dog1");
  const dog2 = new Dog("dog2");
  dog1.color.push("blue");
  console.log(dog1.color);
  console.log(dog2.color);
}
