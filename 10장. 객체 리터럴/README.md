## 객체란?

자바스크립트는 객체 기반의 프로그래밍 언어이며, 자바스크립트를 구성하는 거의 모든 것이 객체다. `원시 값을 제외한 나머지 값(함수, 배열, 정규 표현식 등)은 모두 객체다.`

원시 타입은 단 하나의 값만 나타내지만 객체 타입은 다양한 타입의 값(원시 값 또는 다른 객체)을 하나의 단위로 구성한 복합적인 자료구조이다.

`원시 값은 변경 불가능한 값이지만 객체는 변경 가능한 값이다.`

객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 키와 값으로 구성된다.

![](https://velog.velcdn.com/images/codenmh0822/post/fb79678c-500d-4689-a215-8f38d0abdce1/image.png)

자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있고 자바스크립트의 함수는 일급 객체이므로 값으로 취급할 수 있다. `프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메서드라 부른다.`

![](https://velog.velcdn.com/images/codenmh0822/post/df0659b8-412f-4252-bf76-8d8f505c2b33/image.png)

즉, 객체는 프로퍼티와 메서드로 구성된 집합체이며 객체의 상태를 나타내는 값과 프로퍼티를 참조하고 조작할 수 있는 동작을 하나의 단위로 구조화할 수 있어 유용하다.

- 프로퍼티: 객체의 상태를 나타내는 값(data)
- 메서드: 프로퍼티를 참조하고 조작할 수 있는 동작(behavior)

## 객체 리터럴에 의한 객체 생성

C++, 자바와 같은 클래스 기반 객체지향 언어는 클래스를 사전에 정의하고 필요한 시점에 new 연산자와 함께 생성자를 호출하여 인스턴스를 생성하는 방식으로 객체를 생성한다.

> 인스턴스(instance)
> 인스턴스란 클래스에 의해 생성되어 메모리에 저장된 실체를 말한다.
> 객체지향 프로그래밍에서 객체는 클래스와 인스턴스를 포함한 개념이다.
> 클래스는 인스턴스를 생성하기 위한 템플릿의 역할을 수행한다.
> 인스턴스는 객체가 메모리에 저장되어 실제로 존재하는 것에 초점을 맞춘 용어이다.

자바스크립트는 프로토타입 기반 객체지향 언어로서 클래스 기반 객체지향 언어와는 달리 다양한 객체 생성 방법을 지원한다.

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

가장 일반적이고 간단한 객체 생성 방법이 객체 리터럴을 사용하는 것이다.

`리터럴`이란 `사람이 이해할 수 있는 문자 또는 약속된 기호를 사용하여 값을 생성하는 표기법을 말한다.`

객체 리터럴은 중괄호({}) 내에 0개 이상의 프로퍼티를 정의하여, `변수에 할당되는 시점에 자바스크립트 엔진은 객체 리터럴을 해석해 객체를 생성한다.`

```js
var person = {
  name: "Lee",
  sayHello: function () {
    console.log(`Hello! My name is ${this.name}.`);
  },
};

console.log(typeof person); // object
console.log(person); // {name: "Lee", sayHello: ƒ}

var empty = {}; // 프로퍼티를 정의하지 않으면 빈 객체이다.
console.log(typeof empty); // object
```

객체 리터럴의 중괄호는 코드 블록을 의미하지 않는다. 코드 블록의 중괄호 뒤에는 세미콜론을 붙이지 않는다.

하지만 객체 리터럴은 값으로 평가되는 표현식이기에 중괄호 뒤에 세미콜론을 붙인다.

```js
function sayHello() {
  console.log("hello");
}

var obj = {
  name: "Lee",
};
```

객체 리터럴은 자바스크립트의 유연함과 강력함을 대표하는 객체 생성 방식이다.

객체를 생성하기 위해 클래스를 먼저 정의하고 new 연산자와 함께 생성자를 호출할 필요 없이, `프로퍼티를 포함시켜 객체를 생성함과 동시에 프로퍼티를 만들 수도 있고, 객체를 생성한 이후에 프로퍼티를 동적으로 추가할 수도 있다.`

`객체 리터럴 외의 객체 생성 방식은 모두 함수를 사용해 객체를 생성한다.`

## 프로퍼티

`객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성된다.`

- 프로퍼티 키 : 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
- 프로퍼티 값 : 자바스트립트에서 사용할 수 있는 모든 값

프로퍼티 키는 프로퍼티 값에 접근할 수 있는 이름으로서 식별자 역할을 한다. 하지만 반드시 식별자 네이밍 규칙을 따라야하는 것은 아니다. 다만 주의할점은 `식별자 네이밍 규칙을 따르면 키의 문자열의 따옴표의 생략이 가능하지만 규칙을 따르지 않는다면 생략이 불가능하다.`

```js
var person = {
  firstName: "firstName"; // 식별자 네이밍 규칙을 따르는 프로퍼티
  "last-name": lastName; // 식별자 네이밍 규칙을 따르지 않는 프로퍼티
}
```

식별자 네이밍 규칙을 따르지 않은 따옴표가 없는 `last-name`이라는 프로퍼티 키를 자바스크립트는 `-`연산자가 있는 표현식으로 해석하기에 네이밍 규칙을 따르지 않은 프로퍼티 키에는 따옴표로 반드시 감싸줘야한다.

문자열 또는 문자열로 평가할 수 있는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수도 있다. 프로퍼티 키로 사용할 표현식을 대괄호([])로 묶어야한다.

```js
var obj = {};
var key = "hello";

obj[key] = "world";

console.log(obj); // {hello: "world"}
```

프로퍼티 키에 문자열이나 심벌 값 외의 값을 사용하면 암묵적 타입 변환을 통해 문자열이 된다. 예를 들어, 프로퍼티 키로 숫자 리터럴을 사용하면 따옴표는 붙지 않지만 내부적으로는 문자열로 변환된다.

빈 문자열, var, function과 같은 예약어를 프로퍼티 키로 사용해도 에러가 발생하지 않지만, 예상치 못한 에러가 발생할 여지가 있으므로 지양하자.

```js
var foo = {
  "": "",
  var: "",
  function: "",
};

console.log(foo); // {"": "", var: "", function: ""}
```

이미 존재하는 프로퍼티 키를 중복 선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어쓴다.

```js
var foo = {
  name: "Lee",
  name: "Kim",
};

console.log(foo); // {name: "Kim"}
```

## 메서드

프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 메서드라 부른다. 즉, `메서드는 객체에 묶여있는 함수를 의미한다.`

```js
var circle = {
  radius: 5, // 프로퍼티

  getDiameter: function () {
    // 메서드
    return 2 * this.radius; // this는 circle을 가리키는 참조 변수
  },
};

console.log(circle.getDiameter()); // 10
```

## 프로퍼티 접근

프로퍼티에 접근하는 방법은 다음과 같이 두 가지다.

- 마침표 프로퍼티 접근 연산자(`.`)를 사용하는 `마침표 표기법(dot notation)`
- 대괄호 프로퍼티 접근 연산자(`[...]`)를 사용하는 `대괄호 표기법(bracket notaion)`

접근 연산자의 좌측에는 객체로 평가되는 표현식이 위치하고, 우측 또는 내부에는 프로퍼티 키를 지정한다.

```js
var person = {
  name: "jini",
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name); // jini

// 대괄호 표기법에 의한 프로퍼티 접근
console.log(person["name"]); // jini

// 대괄호에서는 키를 반드시 따옴표를 지정해야됨(안그러면 식별자로 해석하기에 별도의 식별자 필요함)
console.log(person[name]); // ReferenceError: name is not defined

var key = "name";
console.log(person[key]); // jini

// 존재하지 않는 프로퍼티에 접근하면 undefined 반환
console.log(person.age); //undefined
```

자바스크립트에서 사용 가능한 유효한 이름이 아니면 반드시 대괄호 표기법을 사용해야 한다. 단, 프로퍼티 키가 숫자로 이뤄진 문자열인 경우 따옴표를 생략할 수 있다. 그 외의 경우 대괄호 내에 들어가는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 한다.

```js
var person = {
  "last-name": "lastName",
  1: 10,
};

person."last-name"; // SyntaxError: Unexpected string
person.last-name; // 브라우저 => NaN, node.js: ReferenceError

person[last-name] // ReferenceError
person["last-name"] // "lastName"

person.1; // SyntaxError
person."1"; // SyntaxError
person[1]; // 10, person[1] => person["1"]
person["1"]; // 10
```

위 예시에서 아래의 환경에 따른 코드의 평가 방법에 대해 구체적으로 알아보자.

```js
person."last-name"; // SyntaxError: Unexpected string
person.last-name; // 브라우저 => NaN, node.js: ReferenceError
```

Node.js 환경의 경우 먼저 `person.last`라는 접근을 통해 `undefined`로 평가된다. 그 후 `undefined - name`을 평가하기 위해 `name`이라는 식별자를 참조해야하는데 식별자가 존재하지 않기에 참조 에러가 발생하는 것이다.

브라우저 환경의 경우 `name`이라는 식별자가 전역 객체 `window`의 프로퍼티로 암묵적으로 존재한다. 전역 변수 `name`은 기본적으로 window의 이름을 가리키며, 기본값은 빈 문자열이다. 따라서 `person.last-name`은 `undefined - ""`로 동작하므로 산술 연산자 `-`에 의해 `NaN - 0`으로 평가되어 최종적으로 `NaN`이 반환된다.

## 프로퍼티 값 갱신

이미 존재하는 프로퍼티에 값을 할당하면 프로퍼티 값이 갱신된다.

```js
var person = {
  name: "jini",
};

// person 객체에 name 프로퍼티가 존재하므로 name 프로퍼티의 값이 갱신된다.
person.name = "biki";
console.log(person); // {name: "biki"}
```

## 프로퍼티 동적 생성

존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당된다.

```js
var person = {
  name: "jini",
};

// person 객체에는 age 프로퍼티가 존재하지 않는다.
// 따라서 person 객체에 age 프로퍼티가 동적으로 생성되고 값이 할당된다.
person.age = 12;

console.log(person); // {name: "jini", age: 12}
```

## 프로퍼티 삭제

`delete` 연산자는 객체의 프로퍼티를 삭제한다.

```js
var person = {
  name: "jini",
};

// 프로퍼티 동적 생성
person.age = 12;

// person 객체에 age 프로퍼티가 존재한다.
// 따라서 delete 연산자로 age 프로퍼티를 삭제할 수 있다.
delete person.age;

// person 객체에 address 프로퍼티가 존재하지 않는다.
// 따라서 delete 연산자로 address 프로퍼티를 삭제할 수 없다. 이때 에러가 발생하지 않는다.
delete person.address;

console.log(person); // {name: "jini"}
```

## ES6에서 추가된 객체 리터럴의 확장 기능

### 프로퍼티 축약 표현

ES6에서는 프로퍼티 값으로 변수를 사용하는 경우 변수 이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키를 생략할 수 있다. 이때 프로퍼티 키는 변수 이름으로 자동 생성 된다.

```js
// ES5
var x = 1,
  y = 2;
var obj = {
  x: x,
  y: y,
};

console.log(obj); // {x: 1, y: 2}

// ES6
let x = 1,
  y = 2;

// 프로퍼티 축약 표현
const obj = { x, y };

console.log(obj); // {x: 1, y: 2}
```

### 계산된 프로퍼티 이름

문자열 또는 문자열로 타입 변환할 수 있는 값으로 평가되는 표현식을 사용하여 프로퍼티 키를 동적으로 생성할 수 있다.

단, 프로퍼티 키로 사용할 표현식을 대괄호[]로 묶어야 한다. 이를 계산된 프로퍼티 이름이라 한다.

```js
// ES5
var prefix = "prop";
var i = 0;

var obj = {};

// 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
obj[prefix + "-" + ++i] = i;
obj[prefix + "-" + ++i] = i;
obj[prefix + "-" + ++i] = i;

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}

// ES6
const prefix = "prop";
let i = 0;

// 객체 리터럴 내부에서 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
const obj = {
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

### 메서드 축약 표현

ES6에서는 메서드를 정의할 때 function 키워드를 생략한 축약 표현을 사용할 수 있다. 이 때 메서드 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작하는데, 메서드에 대해 구체적으로 포스팅할 때 알아보자.

```js
// ES5
var obj = {
  name: "Lee",
  sayHi: function () {
    console.log("Hi! " + this.name);
  },
};

obj.sayHi(); // Hi! Lee

// ES6
const obj = {
  name: "Lee",
  // 메서드 축약 표현
  sayHi() {
    console.log("Hi! " + this.name);
  },
};

obj.sayHi(); // Hi! Lee
```
