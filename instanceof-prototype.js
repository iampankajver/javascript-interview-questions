class A {

}

class B extends A {
}

let b = new B();

class C {
}

let c = new C();

console.log(b instanceof B);
console.log(b instanceof A);
console.log(b instanceof Object);
console.log(b instanceof Function);
console.log(c instanceof C);
console.log(c instanceof A);
console.log(c instanceof B);


function isInstanceOf(obj, classObject) {
  let proto = obj.__proto__;
  let classPrototype = classObject.prototype;
  while (proto) {
    if (proto === classPrototype) {
      return true;
    }
    proto = proto.__proto__;
  }
  return false;
}

console.log("--------------------------------");

console.log(isInstanceOf(b, B));
console.log(isInstanceOf(b, A));
console.log(isInstanceOf(b, Object));
console.log(isInstanceOf(b, Function));
console.log(isInstanceOf(c, C));
console.log(isInstanceOf(c, A));
console.log(isInstanceOf(c, B));
