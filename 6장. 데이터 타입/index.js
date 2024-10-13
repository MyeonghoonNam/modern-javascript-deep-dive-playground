var foo;
console.log(typeof foo); // undefined

foo = 3;
console.log(typeof foo); // number

foo = "Hello";
console.log(typeof foo); // string

foo = true;
console.log(typeof foo); // boolean

foo = null;
console.log(typeof foo); // object, null의 타입체크를 위해서는 foo === null의 비교 연산을 활용하자.

foo = Symbol();
console.log(typeof foo); // symbol

foo = {}; // 객체
console.log(typeof foo); // object

foo = []; // 배열
console.log(typeof foo); // object

foo = function () {}; // 함수
console.log(typeof foo); // function, 자바스크립트에서는 함수도 값이고 엄밀히 객체 타입이다. object 하위의 function
