function Teather() {
  this.age = 12;
}
Teather.prototype = {
  name: '12',
  test1: function () {
    console.log(12);
  },
};

function Student() {
  Teather.call(this);
}

Student.prototype = Object.create(Teather.prototype);
Student.prototype.constructor = Student;

let s1 = new Student();
console.log(s1);
(function () {
  class Teacher {
    name = 12;

    constructor() {
      this.age = 12;
    }
    say() {
      console.log('I am a teacher');
    }
  }

  class Student extends Teacher {
    constructor() {
      super();
    }
  }

  let s1 = new Student();
  console.log(s1);
})();
