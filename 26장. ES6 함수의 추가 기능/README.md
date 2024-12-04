## 함수의 구분

ES6 이전까지 자바스크립트의 함수는 별다른 구분 없이 다영한 목적으로 사용되었다.

- 일반적인 함수로 호출이 가능하다.
- `new` 연산자와 함께 호출하여 인스턴스를 생성할 수 있는 생성자 함수로 호출이 가능하다.
- 객체에 바인딩되어 메서드로서 호출이 가능하다.

위와 같은 다양한 목적이 편리한 것 같지만 실수를 유발시킬 수 있으며 성능 면에서도 손해이다.

**ES6 이전의 모든 함수는 일반 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수 있다.** 다시 말해, `callable` 이면서 `constructor` 이다.

```js
// 프로퍼티 f에 바인딩된 함수는 calllable이며 constructor이다.
var obj = {
  x: 10,
  f: function () {
    return this.x;
  },
};

// 프로퍼티 f에 바인딩된 함수를 메서드로서 호출
console.log(obj.f()); // 10

// 프로퍼티 f에 바인딩된 함수를 일반 함수로서 호출
var bar = obj.f;
console.log(bar); // undefined

// 프로퍼티 f에 바인딩된 함수를 생성자 함수로서 호출
console.log(new obj.f()); // f {}
```

위 경우 흔히 사용되지는 않지만 문법상 가능하다는 것에 문제가 있다. 그리고 이는 성능 면에서도 문제가 있다.

객체에 바인딩된 함수가 인스턴스를 생성할 수 있는 `constructor` 라는 것은 객체에 바인딩된 함수가 `prototype` 프로퍼티를 가지며, 프로토타입 객체도 생성한다는 것을 의미한다.

함수에 전달되어 보조 함수의 역할을 수행하는 콜백 함수도 마찬가지다. 콜백 함수도 `constructor` 이기 대문에 불필요한 프로토타입 객체를 생성한다.

**이처럼 ES6 이전의 모든 함수는 사용 목적에 따라 명확한 구분이 없으므로 호출 방식에 특별한 제약이 없고 생성자 함수로 호출되지 않아도 프로토타입 객체를 생성한다.**

이러한 실수를 유발할 가능성이 있고 성능에도 좋지 않은 문제를 해결하기 위해 ES6에서는 함수를 사용 목적에 따라 세 가지 종류로 명확히 구분했다.

![](https://velog.velcdn.com/images/codenmh0822/post/87e0175f-7ff1-4cf7-ad5e-6141a6b35452/image.png)

일반함수는 아래 형태로 정의된 함수를 말한다. ES6 이전의 함수들을 말한다.

- 함수 선언문
- 함수 표현식

ES6의 메서드와 화살표 함수는 일반 함수와 명확한 차이가 존재하는데 일반 함수는 `constructor` 이지만 메서드, 화살표 함수는 `non-constructor` 이다.

## 메서드

ES6 이전 사양에는 메서드에 대한 명확한 정의가 없었다. 일반적으로 메서드는 객체에 바인딩된 함수를 일컫는 의미로 사용되었다.

**ES6 사양에서 메서드는 메서드 축약 표현으로 정의된 함수만을 의미하게 되었다.**

```js
const obj = {
  x: 1,
  foo() {
    return this.x;
  },
  bar: function () {
    return this.x;
  },
};

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
```

**ES6 사양에서 정의한 메서드(ES6 메서드)는 인스턴스를 생성할 수 없는 `non-constructor` 이다.**

- 생성자 함수로서 호출할 수 없다.
- 인스턴스를 생성할 수 없으므로 `prototype` 프로퍼티가 없고 프로토타입도 없다.

**ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 `[[HomeObject]]` 를 갖는다.**

- `super` 참조는 내부 슬롯 `[[HomeObject]]` 를 사용하여 수퍼클래스의 메서드를 참조하므로 내부 슬롯 `[[HomeObject]]` 를 갖는 ES6 메서드는 `super` 키워드를 사용할 수 있다.

```js
const base = {
  name: "Lee",
  sayHi() {
    return `Hi! ${this.name}`;
  },
};

const derived = {
  __proto__: base,

  // sayHi는 ES6 메서드로 [[HomeObject]]를 갖는다.
  // sayHi의 [[HomeObject]]는 sayHi가 바인딩된 객체인 derived.prototype을 가리킨다.
  // super는 sayHi의 [[HomeObject]]의 프로토타입인 base.prototype을 가리킨다.
  sayHi() {
    return `${super.sayHi()}. how are you doing?`;
  },
};

console.log(derived.sayHi()); // Hi! Lee. how are you doing?
```

이와 같이 ES6 메서드는 본연의 기능(`super`)을 추가하고 의미적으로 맞지 않는 기능(`constructor`)은 제거했다.

따라서 **메서드를 정의할 때 프로퍼티 값으로 익명 함수 표현식으로 할당하는 ES6 이전의 방식은 사용하지 않는 것이 좋다.**

## 화살표 함수

화살표 함수는 `function` 키워드 대신 화살표(=>, fat arrow)를 사용하여 기존의 함수 정의 방식보다 간략하게 함수를 정의할 수 있다.

표현만 간략한 것이 아니라 내부 동작도 기존의 함수보다 간략하다.

특히 **콜백 함수 내부에서 `this` 가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.**

### 화살표 함수 정의

화살표 함수 정의 문법은 다음과 같다.

#### 함수 정의

화살표 함수는 함수 선언문으로 정의할 수 없고 함수 표현식으로 정의해야 한다. 호출 방식은 기존 함수와 동일하다.

```js
const multiply = (x, y) => x + y;
multiply(2, 3); // 6
```

#### 매개변수 선언

매개변수가 여러 개인 경우 소괄호 () 안에 매개변수를 선언한다.

```js
const arrow = (x, y) => {...};
```

매개변수가 한 개인 경우 소괄호 ()를 생략할 수 있다.

```js
const arrow = x => {...};
```

매개변수가 없는 경우 소괄호 ()를 생략할 수 없다.

```js
const arrow = () => {...};
```

#### 함수 몸체 정의

함수 몸체가 하나의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 {}를 생략할 수 있다.

이때 **함수 몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문이라면 암묵적으로 반환된다.**

중괄호를 생략한 경우 함수 몸체 내부의 문이 표현식이 아닌 문이라면 에러가 발생한다. **표현식이 아닌 문은 반환할 수 없기 때문이다.**

따라서 **함수 몸체가 하나의 문으로 구성된다 해도 함수 몸체의 문이 표현식이 아닌 문이라면 중괄호를 생략할 수 없다.**

```js
// concise body
const power = (x) => x ** 2;
power(2); // 4

// 위 표현은 다음과 동일하다.
// block body
const power = (x) => {
  return x ** 2;
};
```

객체 리터럴을 반환하는 경우 객체 리터럴을 소괄호 ()로 감싸 주어야 한다.

소괄호 ()로 감싸지 않으면 객체 리터럴의 중괄호 {}는 함수 몸체를 감싸는 중괄호{}로 잘못 해석한다.

```js
const create = (id, content) => ({ id, content });
create(1, "JavaScript"); // -> {id: 1, content: "JavaScript"}

// 위 표현은 다음과 동일하다.
const create = (id, content) => {
  return { id, content };
};
```

함수 몸체가 여러개의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 {}를 생략할 수 없다. 이때 반환 값이 있다면 명시적으로 반환해야 한다.

```js
const sum = (a, b) => {
  const result = a + b;
  return result;
};
```

화살표 함수도 즉시 실행 함수로 사용할 수 있다.

```js
const person = ((name) => ({
  sayHi() {
    return `Hi? My name is ${name}.`;
  },
}))("Lee");

console.log(person.sayHi()); // Hi? My name is Lee.
```

화살표 함수도 일급 객체이므로 `Array.prototype.map`, `Array.prototype.filter`, `Array.prototype.reduce` 같은 고차함수에 인수로 전달할 수 있다.

이 경우 일반적인 함수 표현식 보다 표현이 간결하고 가독성이 좋다.

```js
// ES5
[1, 2, 3].map(function (v) {
  return v * 2;
});

// ES6
[1, 2, 3].map((v) => v * 2); // -> [ 2, 4, 6 ]
```

### 화살표 함수와 인반 함수의 차이

1\. 화살표 함수는 인스턴스를 생성할 수 없는 `non-constructor` 이다.

화살표 함수는 인스턴스를 생성할 수 없으므로 `prototype` 프로퍼티가 없고 프로퍼토 타입도 생성하지 않는다.

```js
const Foo = () => {};

new Foo(); // TypeError: Foo is not a constructor
```

```js
const Foo = () => {};

console.log(Foo.hasOwnProperty("prototype")); // false
```

2\. 중복된 매개변수 이름을 선언할 수 없다.

일반 함수는 중복된 매개변수 이름을 선언해도 에러가 발생하지 않는다. 단, `strict mode` 에서는 에러가 발생한다.

```js
function normal(a, a) {
  return a + a; // 4
}

console.log(normal(1, 2));
```

화살표 함수에서도 중복된 매개변수 이름을 선언하면 에러가 발생한다.

```js
const arrow = (a, a) => a + a;
// SyntaxError: Duplicate parameter name not allowed in this context
```

3\. 화살표 함수는 함수 자체의 `this`, `arguments`, `super`, `new.target` 바인딩을 갖지 않는다.

화살표 함수 내부에서 `this`, `arguments`, `super`, `new.target` 를 참조하면 **스코프 체인을 통해 상위 스코프의 `this`, `arguments`, `super`, `new.target` 를 참조한다.**

만약 화살표 함수와 화살표 함수가 중첩되어 있다면 상위 화살표 함수에서도 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 `this`, `arguments`, `super`, `new.target` 를 참조한다.

### this

화살표 함수가 일반 함수와 구별되는 가장 큰 특징은 바로 `this` 이다. 그리고 화살표 함수는 다른 함수의 인수로 전달되어 콜백 함수로 사용되는 경우가 많다.

화살표 함수의 `this` 는 일반 함수의 `this` 와 다르게 동작하는데 이는 **콜백 함수 내부의 `this` 가 외부 함수의 `this` 와 다른 문제를 해결하기 위해 의도적으로 설계된 것이다.**

`this` 바인딩은 함수의 호출 방식에 따라 동적으로 결정된다.

이때 주의할 것은 일반 함수로서 호출되는 콜백 함수의 경우이다. 고차 함수의 인수로 전달되어 고차 함수 내부에서 호출되는 콜백 함수도 중첩 함수라고 할 수 있다.

```js
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    // add 메서드는 인수로 전달된 배열 arr을 순회하며 배열의 모든 요소에 prefix를 추가한다.
    // ①
    return arr.map(function (item) {
      return this.prefix + item; // ②
      // -> TypeError: Cannot read property 'prefix' of undefined
    });
  }
}

const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["transition", "user-select"]));
```

일반 함수로 호출되는 모든 함수 내부의 `this` 는 전역 객체를 가리킨다. 그런데 클래스 내부의 모든 코드에서는 `strcit mode` 가 암묵적으로 적용된다.

따라서 `Array.prototype.map` 메서드의 콜백 함수에서 `strict mode` 가 적용된다.

`strict mode` 에서 일반 함수로서 호출된 모든 함수 내부의 `this` 에는 전역 객체가 아니라 `undefined` 가 바인딩되므로 일반 함수로서 호출되는 `Array.prototype.map` 메서드의 콜백 함수 내부의 `this` 에는 `undefined` 가 바인딩된다.

이때 발생하는 문제가 바로 **콜백 함수 내부의 `this` 문제이다.**

콜백 함수의 `this(②)` 와 외부 함수의 `this(①)` 가 서로 다른 값을 가리키고 있기 때문에 `TypeError` 가 발생한 것이다.

위와 같은 문제를 해결하기 위해 ES6 이전에는 다음과 같은 방법을 사용했다.

1\. `this` 를 회피시킨 후에 콜백 함수 내부에서 사용하기

```js
add(arr) {
  const that = this;
  return arr.map(function (item) {
    return that.prefix + item;
  });
}
```

2\. `Array.prototype.map` 의 두 번째 인수로 `this` 를 전달하기
ES5에서 도입된 `Array.prototype.map` 은 콜백 함수 내부의 `this` 문제를 해결하기 위해 직접 `this` 로 사용할 객체를 전달할 수 있다.

```js
add(arr) {
  return arr.map(function (item) {
    return this.prefix + item;
  }, this);
}
```

3\. `Function.prototype.bind` 메서드를 사용하여 `this` 를 바인딩하기

```js
add(arr) {
  return arr.map(
    function (item) {
      return this.prefix + item;
    }.bind(this)
  );
}
```

ES6에서는 화살표 함수를 사용하여 다음과 같이 간단히 콜백 함수 내부의 `this` 문제를 해결할 수 있다.

```js
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    return arr.map((item) => this.prefix + item);
  }
}

const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["transition", "user-select"]));
```

**화살표 함수는 함수 자체의 `this` 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 `this`를 참조하면 상위 스코프의 `this` 를 그대로 참조한다. 이를 `lexical this` 라고 한다.**

이는 마치 **렉시컬 스코프와 같이 화살표 함수의 `this` 가 함수가 정의된 위치에 의해 결정된다는 것을 의미한다.**

화살표 함수는 함수 자체의 `this` 바인딩을 갖지 않기 때문에 `Function.prototype.call`, `Function.prototype.apply`, `Function.prototype.bind` 메서드를 사용해도 화살표 함수 내부의 `this` 를 교체할 수 없다. 위 메서드를 호출할 수 없다는 의미는 아니며 자체적인 `this` 바인딩을 가지지 않기에 `this` 를 교체할 수 없고 언제나 상위 스코프의 `this` 바인딩을 참조한다.

ES6 메서드가 아닌 일반적인 의미의 메서드를 화살표 함수로 정의하는 것은 피해야 한다.

```js
// Bad
const person = {
  name: "Lee",
  sayHi: () => console.log(`Hi ${this.name}`),
};

// sayHi 프로퍼티에 할당된 화살표 함수 내부의 this는 자신이 정의된 person의 상위 스코프인 전역의 this를 가리킨다.
// 전역 객체를 가리키므로 브라우저에서 실행하면 this.name = window.name으로 빈 문자열을 가진다.
// 전역 객체 window에는 빌트인 프로퍼티 name이 존재한다.

person.sayHi(); // Hi
```

이제 일반적으로 사용하려던 메서드는 ES6 메서드 축약 표현으로 정의하여 최적화된 본연의 기능을 사용하는 것이 좋다.

```js
// Good
const person = {
  name: "Lee",
  sayHi() {
    console.log(`Hi ${this.name}`);
  },
};

person.sayHi(); // Hi Lee
```

프로토타입 객체의 프로퍼티에 화살표 함수를 할당하는 경우도 동일한 문제가 발생한다.

```js
// Bad
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = () => console.log(`Hi ${this.name}`);

const person = new Person("Lee");
person.sayHi(); // Hi
```

프로퍼티를 동적으로 추가할 때는 ES6 메서드 정의를 사용할 수 없으므로 일반 함수를 할당한다.

```js
// Good
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log(`Hi ${this.name}`);
};

const person = new Person("Lee");
person.sayHi(); // Hi Lee
```

만약 프로퍼티를 동적으로 추가할 때 ES6 메서드를 사용하고 싶다면 아래와 같이 객체 바인딩이 필요하다.

```js
function Person(name) {
  this.name = name;
}

Person.prototype = {
  constructor: Person,
  sayHi() {
    console.log(`Hi ${this.name}`);
  },
};

const person = new Person("Lee");
person.sayHi(); // Hi Lee
```

### super

**화살표 함수는 함수 자체의 `super` 바인딩을 갖지 않는다.** 따라서 화살표 함수 내부에서 `super` 를 참조하면 `this` 와 마찬가지로 상위 스코프의 `super` 를 참조한다.

```js
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  // 화살표 함수의 super는 상위 스코프인 constructor의 super를 가리킨다.
  sayHi = () => `${super.sayHi()} how are you doing?`;

  // constructor(...args) {
  //   super(...args);
  //   this.sayHi = () => `${super.sayHi()} how are you doing?`;
  // }
}

const derived = new Derived("Lee");
console.log(derived.sayHi()); // Hi! Lee how are you doing?
```

### arguments

화살표 함수는 함수 자체의 `arguments` 바인딩을 갖지 않는다.

따라서 화살표 함수 내부에서 `arguments` 를 참조하면 `this` 와 마찬가지로 상위 스코프의 `arguments` 를 참조한다.

```js
(function () {
  // 화살표 함수 foo의 arguments는 상위 스코프인 즉시 실행 함수의 arguments를 가리킨다.
  const foo = () => console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
  foo(3, 4);
})(1, 2);

// 화살표 함수 foo의 arguments는 상위 스코프인 전역의 arguments를 가리킨다.
// 하지만 전역에는 arguments 객체가 존재하지 않는다. arguments 객체는 함수 내부에서만 유효하다.
const foo = () => console.log(arguments);
foo(1, 2); // ReferenceError: arguments is not defined
```

`arguments` 객체는 함수를 정의할 때 매개변수의 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.

하지만 화살표 함수에서는 `arguments` 객체를 사용할 수 없다.

상위 스코프의 `arguments` 객체를 참조할 수는 있지만 화살표 함수 자신에게 전달된 인수 목록을 확인할 수 없고 상위 함수에게 전달된 인수 목록을 참조하므로 그다지 도움이 되지 않는다.

따라서 **화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 `Rest` 파라미터를 사용해야 한다.**

## Rest 파라미터

### 기본 문법

`Rest` 파라미터(나머지 매개변수)는 매개변수 이름 앞에 세개의 점 `...` 을 붙여서 정의한 매개변수를 의미한다.

**`Rest` 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.**

```js
function foo(...rest) {
  // 매개변수 rest는 인수들의 목록을 배열로 전달받는 Rest 파라미터다.
  console.log(rest); // [ 1, 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);
```

일반 매개변수와 `Rest` 파라미터는 함께 사용할 수 있다. 이때 함수에 전달된 인수들은 매개변수와 `Rest`파라미터에 순차적으로 할당된다.

```js
function foo(param, ...rest) {
  console.log(param); // 1
  console.log(rest); // [ 2, 3, 4, 5 ]
}
foo(1, 2, 3, 4, 5);
```

`Rest` 파라미터는 이름 그대로 먼저 선언된 매개변수에 할당된 인수를 제외한 나머지 인수들로 구성된 배열이 할당된다.

따라서 **`Rest` 파라미터는 반드시 마지막 파라미터이어야 한다.**

```js
function foo(...rest, param1, param1) { }

foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter
```

**`Rest` 파라미터는 단 하나만 선언할 수 있다.**

```js
function foo(...rest1, ...rest2) {}

foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter
```

`Rest` 파라미터는 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 `length` 프로퍼티에 영향을 주지 않는다.

```js
function foo(...rest) {}
console.log(foo.length); // 0

function bar(x, ...rest) {}
console.log(bar.length); // 1

function baz(x, y, ...rest) {}
console.log(baz.length); // 2
```

### Rest 파라미터와 arguments 객체

`arguments` 는 배열이 아닌 유사 배열 객체 이다.

배열 메서드를 사용하려면 `Function.prototype.call` 이나 `Function.prototype.apply` 메서드를 사용해 `arguments` 객체를 배열로 변환해야하는 번거로움이 있었다.

```js
function sum() {
  // 유사 배열 객체인 arguments 객체를 배열로 변환한다.
  var array = Array.prototype.slice.call(arguments);

  return array.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

ES6에서는 `rest` 파라미터를 사용하여 가변 인자 함수의 인수 목록을 배열로 직접 전달 받을 수 있다.

이를 통해 유사 배열 객체인 `arguments` 객체를 배열로 변환하는 번거로움을 피할 수 있다.

```js
function sum(...args) {
  // Rest 파라미터 args에는 배열 [1, 2, 3, 4, 5]가 할당된다.
  return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

일반 함수와 ES6 메서드는 `Rest 파라미터` 와 `arguments` 객체를 모두 사용할 수 있다. 하지만 화살표 함수는 함수 자체의 `arguments` 객체를 갖지 않는다.

**따라서 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 `Rest 파라미터` 를 사용해야 한다.**

## 매개변수 기본값

함수를 호출할 때 매개변수의 개수만큼 인수를 전달하는 것이 바람직하지만 그렇지 않은 경우에도 에러가 발생하지 않는다.

이는 자바스크립트 엔진이 매개변수의 개수와 인수의 개수를 체크하지 않기 때문이다.

인수가 전달되지 않은 매개변수의 값은 `undefined` 이다. 따라서 매개변수에 인수가 전달되었는지 확인하여 인수가 전달되지 않은 경우 매개변수에 기본값을 할당할 필요가 있다.

즉, 방어 코드가 필요하다.

ES6에서 도입된 매개변수 기본값을 사용하면 함수 내에서 수행하던 인수 체크 및 초기화를 간소화 할 수 있다.

```js
function sum(x = 0, y = 0) {
  return x + y;
}

console.log(sum(1, 2)); // 3
console.log(sum(1)); // 1
```

**매개변수 기본값은 매개변수에 인수를 전달하지 않은 경우와 `undefined` 를 전달한 경우에만 유효하다.**

```js
function logName(name = "Lee") {
  console.log(name);
}

logName(); // Lee
logName(undefined); // Lee
logName(null); // null
```

**`Rest` 파라미터에는 기본값을 저장할 수 없다.**

```js
function foo(...rest = []) {
  console.log(rest);
}
// SyntaxError: Rest parameter may not have a default initializer
```

매개변수 기본값은 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 `length` 프로퍼티와 `arguments` 객체에 아무런 영향을 주지 않는다.

```js
function sum(x, y = 0) {
  console.log(arguments);
}

console.log(sum.length); // 1

sum(1); //Arguments { '0': 1 }
sum(1, 2); //Arguments { '0': 1, '1':2 }
```
