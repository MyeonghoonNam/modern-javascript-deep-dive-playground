객체 리터럴에 의한 객체 생성 방식은 가장 일반적이고 간단한 객체 생성 방식이다. 그 외에도 생성자 함수를 사용하여 객체를 생성하는 방식이 존재하는데 이 방법들에 대해 장단점을 이해하자.

## Ojbect 생성자 함수

new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다.

```js
// 빈 객체의 생성
const person = new Object();

// 프로퍼티 추가
person.name = "Lee";
person.sayHello = function () {
  console.log("Hi! My name is " + this.name);
};

console.log(person); // {name: "Lee", sayHello: ƒ}
person.sayHello(); // Hi! My name is Lee
```

Object 생성자 함수를 사용해 객체를 생성하는 방식은 특별한 이유가 없다면 유용하지 않다.

## 생성자 함수

**생성자 함수란(constructor) new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말한다.** 생성자 함수에 의해 생성된 객체를 인스턴스라고 한다.

자바스크립트는 Object 생성자 함수 이외에도 String, Number, Boolean, Function, Array, Date, RegExp, Promise등의 빌트인 생성자 함수를 제공한다.

### 객체 리터럴에 의한 객체 생성 방식의 문제점

객체 리터럴에 의한 객체 생성 방식은 단 하나의 객체만 생성한다. 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 매번 같은 프로퍼티를 기술해야 하기 때문에 비효율적이다.

```js
const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle1.getDiameter()); // 10

const circle2 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle2.getDiameter()); // 20
```

객체는 프로퍼티를 통해 객체 고유의 상태를 표현한다. 그리고 메서드를 통해 상태 데이터인 프로퍼티를 참조하고 조작하는 동작을 표현한다.

따라서 프로퍼티는 객체마다 프로퍼티 값이 다를 수 있지만 메서드는 내용이 동일한 경우가 일반적이다.

위 예제의 경우 객체 리터럴에 의해 객체를 생성하는 경우 프로퍼티 구조가 동일함에도 불구하고 매번 같은 프로퍼티와 메서드를 기술하는 중복되는 코드를 작성하게 된 것이다.

### 생성자 함수에 의한 객체 생성 방식의 장점

생성자 함수에 의한 객체 생성 방식은 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.

```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter());
console.log(circle2.getDiameter());
```

> **this**
> this는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이다. this가 가리키는 값이 정해지는 **this 바인딩은 함수 호출 방식**에 따라 동적으로 결정된다.
> ![](https://velog.velcdn.com/images/codenmh0822/post/6553767a-e63a-4dc7-9598-99d3c72b8385/image.png)
>
> ```js
> // 함수는 다양한 방식으로 호출될 수 있다.
> function foo() {
>   console.log(this);
> }
> // 일반적인 함수로서 호출
> // 전역 객체는 브라우저 환경에서는 window, Node.js 환경에서는 global을 가리킨다.
> foo(); // window
> // 메서드로서 호출
> const obj = { foo }; // ES6 프로퍼티 축약 표현
> obj.foo(); // obj => {foo: f}
> // 생성자 함수로서 호출
> const inst = new foo(); // inst => foo {}
> ```

자바와 같은 클래스 기반 객체지향언어의 생성자와 다르게 자바스크립트는 생성자 함수의 형식이 정해져 있지 않고 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 **new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다.** new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수가 아니라 일반 함수로 동작한다.

```js
const circle3 = Circle(15);

// 일반 함수로 호출된 Circle은 반환문이 없으므로 암묵적으로 undefined를 반환한다.
console.log(circle3); // undefined

// 일반 함수로 호출된 Circle 내부의 this는 전역 객체를 가르킨다.
console.log(radius); // 15
```

### 생성자 함수의 인스턴스 생성 과정

생성자 함수의 역할은 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿(클래스)으로서 동작하여 **인스턴스를 생성**하는 것과 <b>생성된 인스턴스를 초기화(인스턴스 프로퍼티 추가 및 초기값 할당)</b>하는 것이다.

new 연산자와 함께 생성자 함수를 호출하면 자바스크립트 엔진은 암묵적인 처리를 통해 인스턴스를 생성하고 초기화한 후 반환한다.

**1. 인스턴스 생성과 this 바인딩**
암묵적으로 빈 객체가 생성되는데 이는 생성자 함수가 생성한 인스턴스이다. 그 후 생성된 인스턴스가 this에 바인딩된다.

이로 인해 생성자 함수 내부의 this가 생성자 함수가 생성할 인스턴스를 가리키는 이유이다. 이 동작은 함수 몸체의 코드가 실행되는 런타임 이전에 실행된다.

> **바인딩**
> 바인딩이란 **식별자와 값을 연결하는 과정**을 의미한다.
> 변수 선언은 변수 이름과 확보된 메모리 공간의 주소를 바인딩하는 것이다.
> this 바인딩은 this와 this가 가리킬 객체를 바인딩하는 것이다.

**2. 인스턴스 초기화**
생성자 함수의 런타임에 this에 바인딩되어 있는 인스턴스를 초기화한다.

프로퍼티나 메서드를 추가하고 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하는 과정들이 있다.

**3. 인스턴스 반환**
생성자 함수 내부의 모든 처리가 끝나면 **완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.**

여기서 주의할 점이 return을 명시하여 객체를 반환하면 명시한 객체가 반환되고, 원시 값을 반환하면 원시 값 반환은 무시되고 암묵적으로 this가 반환된다.

이러한 동작은 생성자 함수의 기본 동작을 훼손하기에 **생성자 함수 내부에서 return 문을 반드시 생략해야 한다.**

```js
function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
  console.log(this); // Circle {}

  // 2. this에 바인딩되어 있는 인스턴스를 초기화 한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * radius;
  };

  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
  // Circle { radius: 5, getDiameter: [Function (anonymous)] }
}

// 인스턴스 생성에 의해 Circle 생성자 함수는 암묵적으로 반환한 this를 변수에 할당한다.
const circle = new Circle(5);
console.log(circle); // Circle { radius: 5, getDiameter: [Function (anonymous)] }
```

### 내부 메서드 `[[Call]]`과 `[[Construct]]`

함수 선언문 또는 함수 표현식으로 정의한 함수는 일반적인 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수 있다.

생성자 함수로서 호출한다는 것은 new 연선자와 함께 호출하여 객체를 생성하는 것을 의미한다.

함수는 객체이므로 일반 객체와 동일하게 동작할 수 있다. 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있기 때문이다.

하지만 함수는 일반 객체와는 다르게 **일반 객체는 호출할 수 없지만 함수는 호출할 수 있다.** 이는 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드는 물론, 함수로서 동작하기 위해 함수 객체만을 위한 내부 슬롯과 내부메서드를 추가로 가지고 있다.

함수가 일반 함수로서 호출되면 함수 객체의 내부 메서드 `[[Call]]`이 호출되고, new 연산자와 함께 생성자 함수로서 호출되면 내부 메서드 `[[Construct]]`가 호출된다.

```js
function foo() {}

// 일반 함수로의 호출 [[Call]] 내부 메서드 호출
foo();

// 생성자 함수로의 호출 [[Construct]] 내부 메서드 호출
new foo();
```

- 내부 메서드 `[[Call]]`을 갖는 함수 객체: 호출할 수 있는 객체(함수)를 의미하며 `callable`이라 부른다.
- 내부 메서드 `[[Construct]]`를 갖는 함수 객체: 생성자 함수로 호출할 수 있는 함수를 의미하며 `constructor`라 부른다.
- 내부 메서드 `[[Construct]]`를 갖지 않는 함수 객체: 객체를 생성자 함수로 호출할 수 없는 함수를 의미하며 `non-constructor`라 부른다.

호출할 수 없는 객체는 함수 객체가 아니므로 함수 객체는 반드시 `callable`이어야 한다. 따라서 `[[Call]]` 내부 메서드를 갖고 있기에 호출이 가능하다.

하지만 모든 함수 객체가 `[[Construct]]`를 갖는 것은 아니다. 따라서 함수 객체는 `constructor`일 수도 있고 `non-constructor`일 수도 있다.

결론적으로 함수 객체는 아래와 같이 나뉘어진다.

- `callable`이면서 `constructor`
- `callable`이면서 `non-constructor`

**모든 함수 객체는 호출할 수 있지만 모든 함수 객체를 생성자 함수로서 호출할 수 있는 것은 아니다.**

![](https://velog.velcdn.com/images/codenmh0822/post/58442814-e98c-4cf9-ae70-72577a6e85e9/image.png)

### constructor와 non-constructor의 구분

자바스크립트 엔진은 **함수 정의를 평가하여 함수 객체를 생성할 때 함수 정의 방식에 따라 함수를 `constructor`와 `non-constructor`로 구분한다.**

- `constructor` : 함수 선언문, 함수 표현식, 클래스(클래스도 함수)
- `non-constructor` : 메서드(ES6 메서드 축약 표현), 화살표 함수

ECMAScript 사양에서 메서드로 인정하는 범위가 일반적인 의미의 메서드보다 좁다.

```js
// 일반 함수 정의: 함수 선언문, 함수 표현식
function foo() {}
const bar = function () {};

// 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수이므로 메서드로 인정하지 않는다.
const baz = {
  x: function () {},
};

// 일반 함수로 정의된 함수만이 constructor이다.
new foo(); // foo {}
new bar(); // bar {}
new baz.x(); // x {}

// 화살표 함수 정의
const arrow = () => {};

new arrow(); // TypeError: arrow is not a constructor

// 메서드 정의: ES6의 메서드 축약 표현만 메서드로 인정한다.
const obj = {
  x() {},
};

new obj.x(); // TypeError: obj.x is not a constructor
```

함수를 프로퍼티 값으로 사용하면 일반적으로 메서드로 통칭한다. 하지만 **ECMAScript 사양에서 메서드란 ES6의 메서드 축약 표현만을 의미한다.**

함수가 어디에 할당되어 있는지가 아닌 함수 정의 방식에 따라 `constructor`와 `non-constructor`를 구분한다.

함수를 일반 함수로 호출하면 함수 객체의 내부 메서드 `[[Call]]` 호출되고 new 연산자를 통해 생성자 함수로 호출하면 함수 객체의 내부 메서드 `[[Construct]]`가 호출된다.

`non-contructor`인 함수 객체는 내부 메서드 `[[Construct]]` 를 갖지 않는다. 따라서 생성자 함수로 호출하면 에러가 발생하고, 일반 함수로의 호출만 가능하다.

주의할 점은 생성자 함수로서 호출될 것을 기대하고 정의하지 않은 일반 함수를 new 연산자를 통해 호출하면 생성자 함수처럼 동작할 수 있다는 것이다.

### new 연산자

일반 함수와 생성자 함수에 특별한 형식적 차이는 없다. new 연산자와 함께 함수를 호출하면 해당 함수는 생성자 함수로 동작한다.

즉, 함수 객체의 내부 메서드 `[[Call]]`이 호출되는 것이 아니라 `[[Construct]]`가 호출된다. 이 때 new 연산자와 함께 호출하는 함수는 `non-constructor`가 아니라 `constructor`여야 에러가 발생하지 않는다.

```js
// 생성자 함수로서 정의하지 않은 일반 함수
function add(x, y) {
  console.log(this); // 일반, 생성자 함수 호출여부에 따라 다르게 바인딩
  return x + y;
}

let inst;

inst = new add(1, 2); // new 연산자와 함께 호출하여 객체를 반환하지 않았으므로 원시값 return을 무시하고 암묵적 빈 객체를 반환
console.log(inst); // add {}

inst = add(1, 2); // 일반 함수로 호출하여 명시된 return 원시값 반환
console.log(inst); // 3

// 객체를 반환하는 일반 함수
function createUser(name, role) {
  console.log(this);
  return { name, role };
}

inst = new createUser("Lee", "admin"); // 객체를 반환하지만 생성자 함수로의 인스턴스를 반환하지 않기에 new 연산자와 함께 호출하기엔 부적절하다.

console.log(inst);
```

일반 함수와 생성자 함수에 특별한 형식적 차이는 없기에 생성자 함수는 일반적으로 첫 문자를 대문자로 기술하는 파스칼 케이스로 명명하여 일반 함수와 구별할 수 있도록 많이 사용한다.

### new.target

생성자 함수가 new 연산자 없이 호출되는 것을 방지하기 위해 파스칼 케이스 컨벤션을 사용한다 하더라도 실수는 언제나 발생할 수 있다. 이러한 위험성을 회피하기 위해 ES6에서는 new.target을 지원한다.

`new.target`은 `this`와 유사하게 `constructor`인 모든 함수 내부에서 암묵적인 지역 변수와 같이 사용되며 메타 프로퍼티라고 부른다. IE는 지원하지 않으므로 주의하자.

함수 내부에서 `new.target`을 사용하면 new 연산자와 함께 생성자 함수로서 호출되었는지에 대한 여부를 확인할 수 있다.

**new 연산자와 함께 생성자 함수로서 호출되면 함수 내부의 `new.target`은 함수 자신을 가리키고, 일반 함수로 호출되면 `undefined`로 할당된다.**

```js
// 생성자 함수
function Circle(radius) {
  // new 연산자와 함께 생성자 함수로 호출되면 함수 자신 일반 함수로 호출되면 undefined
  if (!new.target) {
    // 일반 함수로 잘못 호출된 경우이므로 생성자 함수로 호출하여 반환
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * radius;
  };
}
```

### 스코프 세이프 생성자 패턴

`new.target`은 ES6에서 도입된 최신 문법으로 IE에서는 지원하지 않는다. 이러한 상황에 스코프 세이프 생성자 패턴을 사용할 수 있다.

```js
// Scope-Safe Constructor Pattern
function Circle(radius) {
  // new 연산자와 함께 호출되지 않았다면 이 시점의 this는 전역 객체를 가리킨다.
  if (!(this instanceof Circle)) {
    // 일반 함수로 잘못 호출된 경우이므로 생성자 함수로 호출하여 반환
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * radius;
  };
}

// 일반 함수로 잘못 호출하여도 생성자 함수로 동작
const circle = Circle(5);
console.log(circle.getDiameter()); // 10
```

대부분의 빌트인 생성자 함수(Object, String, Number, Boolean, Function, Array, Date, RegExp, Promise 등)는 new 연산자와 함께 호출되었는지를 확인한 후 적절한 값을 반환한다.

예외적으로 String, Number, Boolean 생성자 함수는 new 연산자와 함께 호출하면 String, Number, Boolean 객체를 생성하여 반환하지만 new 연산자 없이 호출하면 문자열, 숫자, 불리언 타입의 값으로 반환한다. 이를 활용해 간단한 데이터 타입 변환을 하기도 한다.

```js
const str1 = new String(123);
console.log(str1, typeof str1); // [String: '123'] object

const str2 = String(123);
console.log(str2, typeof str2); // 123 string

const num1 = new Number("123");
console.log(num1, typeof num1); // [Number: 123] object

const num2 = Number("123");
console.log(num2, typeof num2); // 123 number

const bool1 = new Boolean("truthy");
console.log(bool1, typeof bool1); // [Boolean: true] object

const bool2 = Boolean("truthy");
console.log(bool2, typeof bool2); // true boolean
```
