console.log('hello webpack')

class Person {
  constructor(name) {
    this.name = name;
  }
  setName(name) {
    this.name = name;
  }
}

console.log(new Person('jack'));