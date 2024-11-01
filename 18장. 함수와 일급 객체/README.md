## 일급 객체

아래와 같은 조건을 만족하는 객체를 **일급 객체**라고 한다.

1. 런타임에 무명의 리터럴로 생성할 수 있다.
2. 변수나 자료구조(객체, 배열)에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

자바스크립트의 함수는 위의 조건을 모두 만족하므로 일급 객체다.

```js
// 런타임에 무명의 리터럴로 생성할 수 있다.
// 변수에 저장할 수 있다.
// 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
  return ++num;
};

const decrease = function (num) {
  return --num;
};

// 자료구조(객체, 배열)에 저장할 수 있다.
const predicates = { increase, decrease };

// 함수의 매개변수에 전달할 수 있다.
// 함수의 반환값으로 사용할 수 있다.
function makeCounter(predicates) {
  let num = 0;

  return function () {
    num = predicates(num);
    return num;
  };
}

const increaser = makeCounter(predicates.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

const decreaser = makeCounter(predicates.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

**함수가 일급 객체라는 것은 함수를 객체와 동일하게 사용할 수 있다는 의미다.** 객체는 값이므로 함수는 값과 동일하게 취급할 수 있다.

따라서 함수는 값을 사용할 수 있는 곳이라면 어디서든지 리터럴로 정의할 수 있으며 **런타임에 함수 객체로 평가된다.**

일급 객체로서 함수가 가지는 가장 큰 특징은 **함수의 매개변수에 전달가능하고, 함수의 반환값으로 사용할 수도 있다는 점이다.** 이를 통해 함수형 프로그래밍을 가능하게 하는 자바스크립트의 장점 중 하나이다.

함수는 객체이지만 일반 객체와는 차이가 있다. 일반 객체는 호출할 수 없지만 함수 객체는 호출할 수 있으며 함수 객체는 일반 객체에는 없는 함수 고유의 프로퍼티를 소유한다.

## 함수 객체의 프로퍼티

```js
function square(number) {
  return number * number;
}

/**
{
  length: { value: 1, writable: false, enumerable: false, configurable: true },
  name: {
    value: 'square',
    writable: false,
    enumerable: false,
    configurable: true
  },
  arguments: {
    value: null,
    writable: false,
    enumerable: false,
    configurable: false
  },
  caller: {
    value: null,
    writable: false,
    enumerable: false,
    configurable: false
  },
  prototype: { value: {}, writable: true, enumerable: false, configurable: false }
}
 */
console.log(Object.getOwnPropertyDescriptors(square));
```

arguments, caller, length, name, prototype 프로퍼티는 모두 함수 객체의 데이터 프로퍼티다. 이는 함수 객체 고유의 프로퍼티이다.

하지만 `__proto__` 접근자 프로퍼티는 함수 객체 고유의 프로퍼티가 아니라 `Object.prototype` 객체의 프로퍼티를 상속받는 것을 위 코드를 통해 알 수 있다. 이는 모든 객체가 사용할 수 있는 접근자 프로퍼티(`__proto__`)를 뜻한다.

### arguments 프로퍼티

함수 객체의 arguments 프로퍼티 값은 arguments 객체다. **arguments 객체는 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체이며, 함수 내부에서 지역 변수처럼 사용된다.**

자바스크립트는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않는다. 따라서 함수 호출 시 매개변수 개수만큼 인수를 전달하지 않아도 에러가 발생하지 않는다.

**함수가 호출되면 함수 몸체 내에서 암묵적으로 매개변수가 선언되고 `undefined`로 초기화된 이후 인수가 할당된다.**

선언된 매개변수의 수보다 인수를 적게 전달하면 전달되지 않은 매개변수는 `undefined`로 초기화하고 인수의 수가 더 많다면 초과된 인수는 무시된다.

하지만 초과된 인수가 버려지는게 아니라 암묵적으로 `arguments` 객체의 프로퍼티로 보관된다.

![](https://velog.velcdn.com/images/codenmh0822/post/f6acd43b-6944-4a8f-9404-8dae2a07ccd0/image.png)

arguments 객체는 매개 변수 개수를 확정할 수 없는 **가변 인자 함수**를 구현할 때 유용하다.

```js
function sum() {
  let res = 0;

  // arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 for 문으로 순회할 수 있다.
  for (let i = 0; i < arguments.length; i++) {
    res += arguments[i];
  }

  return res;
}

console.log(sum()); // 0
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6
```

arguments 객체는 배열 형태로 인자 정보를 담고 있지만 실제 배열이 아닌 유사 배열 객체다. **유사 배열 객체란 length 프로퍼티를 가진 객체로 for 문으로 순회할 수 있는 객체를 말한다.**

> **유사 배열 객체**와 **이터러블**
> ES6에 도입된 이터레이션 프로토콜을 준수하면 순회 가능한 자료구조인 이터러블이 된다.
> 이터러블의 개념이 없었던 ES6에서 arguments객체는 유사 배열 객체로 구분되었다.
> ES6부터 arguments 객체는 유사 배열 객체이면서 동시에 이터러블(iterable)이다.
> iterable 객체는 `for...in`, `for...of`문을 사용할 수 있다.

ES6 Rest 파라미터의 도입으로 모던 자바스크립트에서는 arguments 객체의 중요성이 이전 같지는 않다.

Rest파라미터는 `spread연산자(...)`를 사용해서 함수의 매개변수를 작성한 형태이다. Rest파라미터를 사용하면 함수의 매개변수로 넘어오는 인자를 배열로 전달받을 수 있다.

```js
// ES6 Rest parameter
function foo(num1, num2, ...rest) {
  console.log(Array.isArray(rest)); // true
  console.log(num1, num2); // 1 2
  console.log(rest); // [ 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);
```

### caller 프로퍼티

caller 프로퍼티는 ECMAScript 사양에 포한되지 않는 비표준 프로퍼티다. 이후 표준화될 예정도 없는 프로퍼티이므로 사용하지 말고 참고로 알아만 두자.

함수 객체의 caller 프로퍼티는 함수 자신을 호출한 함수를 가리킨다.

```js
function foo(func) {
  return func();
}

function bar() {
  return "caller : " + bar.caller;
}

// 브라우저에서의 실행한 결과
console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar()); // caller : null
```

### length 프로퍼티

함수 객체의 length 프로퍼티는 함수를 정의할 때 선언한 매개변수의 개수를 가리킨다.

주의할 점은 arguments의 length는 인수로 전달된 모든 인수의 개수를 가리키는 점이 차이가 있다.

```js
function foo(x, y) {
  console.log(arguments.length); // 4
  console.log(foo.length); // 2
}

foo(1, 2, 3, 4);
```

### name 프로퍼티

함수 객체의 name 프로퍼티는 함수 이름을 나타낸다. ES6부터 정식 표준이 되었다. (ES5와 다르게 동작)

```js
// 기명 함수 표현식
var namedFunc = function foo() {};
console.log(namedFunc.name); // foo

// 익명 함수 표현식
var anonymousFunc = function () {};
// ES5: name 프로퍼티는 빈 문자열을 값으로 갖는다.
// ES6: name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖는다.
console.log(anonymousFunc.name); // anonymousFunc

// 함수 선언문(Function declaration)
function bar() {}
console.log(bar.name); // bar
```

함수 선언문에 대해 이해했듯이 함수 이름과 함수 객체를 가리키는 식별자는 의미가 다르다. 함수를 호출할 때는 함수 이름이 아닌 함수 객체를 가리키는 식별자로 호출한다.

### `__proto__` 접근자 프로퍼티

모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 갖는다. 이는 객체지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킨다.

`__proto__` 프로퍼티는 `[[Prototype]]` 내부 슬롯이 가리키는 프로토타입 객체에 간접적으로 접근하기 위해 사용하는 접근자 프로퍼티이다. (이러한 접근에 대한 지원은 현재 중단된 상태이니 지양하자 [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/proto))

```js
// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
console.log(obj.__proto__ === Object.prototype); // true

// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다.
// hasOwnProperty 메서드는 Object.prototype의 메서드다.
console.log(obj.hasOwnProperty("a")); // true
console.log(obj.hasOwnProperty("__proto__")); // false
```

> **hasOwnProperty 메서드**
> hasOwnProperty 메서드는 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환하고 상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환한다.

### prototype 프로퍼티

prototype 프로퍼티는 생성자 함수로 호출할 수 있는 객체, 즉 constructor 만이 소유하는 프로퍼티다.

일반 객체와 생성자 함수로 호출할 수 없는 non-constructor에는 prototype 프로퍼티가 없다.

```js
function foo() {}
const bar = function () {};
const baz = () => {};

console.log(foo.hasOwnProperty("prototype")); // true
console.log(bar.hasOwnProperty("prototype")); // true
console.log(baz.hasOwnProperty("prototype")); // false
```

prototype 프로퍼티는 함수가 객체를 생성하는 행성자 함수로 호출될 때 **생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.**
