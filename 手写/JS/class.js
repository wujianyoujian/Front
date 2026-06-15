{
  function Animal(name) {
    this.name = name;
    this.color = ["red"];
  }

  Animal.prototype.say = function () {
    return this.name;
  };

  function Dog() { }

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


{

  function Animal(name) {
    this.name = name
  }

  Animal.prototype.sayName = function () {
    console.log(this.name)
  }

  function Dog(name, age) {
    Animal.call(this, name);
    this.age = age;
  }

  Dog.prototype = Object.create(Animal.prototype);
  Dog.prototype.constructor = Dog

  let d1 = new Dog("李财", 12);
  console.log(d1.sayName())
}


{
  function Parent(name) {
    this.name = name;
  }

  Parent.prototype.printName = function () {
    console.log(this.name)
  }


  function Child(name) {
    parent.call(this, name)
  }

  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}


{
  function Parent (name) {
    this.name = name;
  }

  Parent.prototype.sayMyName = function() {
    console.log(this.name)
  }

  function Child(name, sex) {
    Parent.call(this, name);
    this.sex = sex;
  }

  Child.prototype = Object.create(Parent.prototype)
  Child.prototype.constructor = Child
}