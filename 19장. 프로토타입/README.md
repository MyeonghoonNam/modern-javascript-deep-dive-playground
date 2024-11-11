자바스크립트는 **명령형, 함수형, 프로토타입 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어이다.**

C++, 자바와 같은 클래스 기반 객체지향 프로그래밍 언어의 특징인 클래스와 상속, 캡슐화를 위한 **public, private, protected** 키워드가 없지만 **프로토타입 기반의 객체지향 프로그래밍 언어이다.**

## 객체지향 프로그래밍

실세계의 실체를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작하며 실체는 특징이나 성질을 나타내는 **속성(arreibute/proprety)**을 가지고 있고, 이를 통해 실체를 인식하거나 구별할 수 있다.

다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하는 것을 **추상화(abstraction)**라 한다.

```js
//이름과 주소 속성을 갖는 객체
const person = {
  name: "Kozel",
  address: "Seoul",
};
```

객체지향 프로그래밍은 위와 같이 **속성을 통해 여러 개의 값을 하나의 독립전 단위로 구상한 복합적인 자료구조**(객체)의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다.

```js
const circle = {
  // 상태
  radius: 5,

  // 동작
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  },
};
```

객체지향 프로그래밍은 객체의 **상태(state)**를 나타내는 데이터와 상태 데이터를 조작할 수 있는 **동작(be-havior)**을 하나의 논리적인 단위로 묶어 생각한다. 따라서 **객체는 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복한적인 자료구조**라 할 수 있다.

이때 객체의 **상태 데이터를 프로퍼티**, **동작을 메서드**라 부른다.

## 상속과 프로토타입

**상속**은 객체지향 프로그래밍의 핵심 개념으로, **어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.**

자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거하는데 이는 기존의 코드를 적극적으로 재사용하는 것이다.

```js
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    // Math.PI는 원주율을 나타내는 상수다.
    return Math.PI * this.radius ** 2;
  };
}

// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);
// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
console.log(circle1.getArea === circle2.getArea); // false

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

위 코드에서 `getArea` 메서드는 동일한 내용임에도 모든 인스턴스가 소유하게 된다. 이는 메모리를 불필요하게 낭비하게 된다.

![](https://velog.velcdn.com/images/codenmh0822/post/e04bae71-c94a-4ef8-85ea-ead71def203f/image.png)

이러한 문제를 **프로토타입을 기반으로 상속을 구현**하여 해결할 수 있다.

```js
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를 공유해서 사용할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다.
// 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

![](https://velog.velcdn.com/images/codenmh0822/post/eae6ce55-47cf-4e38-a7b7-d98d7bc36b6a/image.png)

프로토타입을 통한 상속의 구현으로 생성자 함수가 생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 효율적으로 관리할 수 있다.

## 프로토타입 객체

프로토타입 객체(프로토타입)란 **객체 간 상속**을 구현하기 위해 사용된다.

프로토타입은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체로 다른 객체에 공유 프로퍼티(메서드도 프로퍼티이다)를 제공한다.

프로토타입을 상속받은 하위(자식) 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용할 수 있다.

모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조(null인 경우도 있다)이다.

내부 슬롯에 저장되는 값인 **프로토타입은 객체 생성 방식에 의해 결정된다.**

모든 객체는 하나의 프로토타입을 갖고, 모든 프로토타입은 생성자 함수와 연결되어 있다. 즉, **객체와 프로토타입, 생성자 함수는 서로 연결되어 있다.**

![](https://velog.velcdn.com/images/codenmh0822/post/e9ecfc25-ae31-444a-a194-0063700a0adb/image.png)

자신의 `[[Prototype]]` 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근할 수 있고, 프로토타입은 자신의 `constructor` 프로퍼티를 통해 생성자 함수에 접근할 수 있고,
생성자 함수는 자신의 `prototype` 프로퍼티를 통해 프로토타입에 접근할 수 있다.

### `__proto` 접근자 프로퍼티

**모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, `[[Prototype]]` 내부 슬롯에 간접적으로 접근할 수 있다.**

`Object.prototype`의 접근자 프로퍼티인 `__proto__`는 getter/setter 함수라고 부르는 접근자 함수(`[[Get]], [[Set]]`)를 통해 `[[Prototype]]` 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당한다.

#### `__proto` 접근자 프로퍼티는 상속을 통해 사용된다.

`__proto` 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 `Object.prototype`의 프로퍼티이며 상속을 통해 모든 객체가 사용가능 프로퍼티이다.

```js
const person = { name: "hoon" };

// 여러 객체 생성 방식을 통해 생성된 객체는 직접 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty("__proto__")); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(person.__proto__ === Object.prototype); // true

// { get: [Function: get __proto__], set: [Function: set __proto__], enumerable: false, configurable: true }
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
```

> **Object.prototype**
> 모든 객체는 프로토타입의 계층 구조인 프로토타입 체인에 묶여 있다. 자바스크립트 엔진은 객체의 프로퍼티에 접근하려고 할 때 해당 객체에 프로퍼티가 없다면 `__proto__` 접근자 프로퍼티가 가리키는 참조를 따라 자신의 부모 역할을 하는 프로퍼티를 순차적으로 검색한다.
> 프로토타입 체인의 종점, 즉 프로토타입 체인의 최상위 객체는 **Object.prototype**이며, 이 객체의 프로퍼티와 메서드는 모든 객체에 상속된다.

#### `__proto` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

**프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서다.**

![](https://velog.velcdn.com/images/codenmh0822/post/865ac75f-5789-493d-b437-bd04e0c5e9ea/image.png)

프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다. 위와 같이 아무런 체크 없이 무조건적으로 프로토타입을 교체할 수 없도로 `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어있다.

#### `__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.

`__proto__` 접근자 프로퍼티는 ES5까지 ECMAScript 사양에 포함되지 않은 비표준이었다. 하지만 일부 브라우저에서 지원하고 있었기에 브라우저 호환성을 고려하여 ES6에서 표준으로 채택했다.

하지만 코드내에서 `__proto__` 접근자 프로퍼티를 직접 사용하는 것은 권장하지 않는다.

[MDN: \_\_proto\_\_ 접근자 프로퍼티 지원 중단](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

직접 상속을 통해 `Object.prototype`을 상속받지 않는 객체를 생성할 수도 있다. 이 경우 `__proto__` 접근자 프로퍼티를 사용할 수 없는 경우가 있다.

```js
// 프로토타입을 null로 지정한 객체 생성을 통해 Object.__proto__를 상속받을 수 없다.
const obj = Object.create(null);

console.log(obj.__proto__); // undefined;

// 따라서 __proto__ 보다 안전하게 Object.getPrototypeOf() 메서드를 사용하자.
console.log(Object.getPrototypeOf(obj));
```

위와 같이 프로토타입의 참조를 안전하고 정확하게 취득하고 싶은 경우에는 `Object.getPrototypeOf()` 메서드를 사용하고, 교체하고 싶은 경우에는 `Object.setPrototypeOf()` 메서드를 사용할 것을 권장한다.

```js
const obj = {};
const parent = { x: 1 };

Object.getPrototypeOf(obj); // obj.__proto__ = Object.prototype
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent

// 프로토타입 체인을 통해 parent에서 값 호출
console.log(obj.x); // 1
```

`Object.getPrototypeOf()`, `Object.setPrototypeOf()` 메서드는 `get Object.prototype.__proto__`, `set Object.prototype.__proto__` 의 동작과 정확히 일치한다.

### 함수 객체의 prototype 프로퍼티

**함수 객체만이 소유하는 `prototype` 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.**

따라서 생성자 함수로 호출할 수 없는 함수인 `non-constructor`는(화살표 함수, ES6 메서드 축약 표현) `prototype` 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.

```js
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}).hasOwnProperty("prototype"); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}).hasOwnProperty("prototype"); // false

// 화살표 함수
const Person = (name) => {
  this.name = name;
};

console.log(Person.hasOwnProperty("prototype")); // false
console.log(Person.prototype); // undefined

const obj = {
  // ES6 메서드 축약 표현
  foo() {},
};

console.log(obj.foo.hasOwnProperty("prototype")); // false
console.log(obj.foo.prototype); // undefined
```

생성자 함수로 호출하기 위해 정의하지 않은 일반 함수(함수 선언문, 함수 표현식)도 prototype 프로퍼티를 소유하지만 객체를 생성하지 않는 기능의 함수라면 prototype 프로퍼티가 아무런 의미가 없다.

**모든 객체가 가지고 있는 `__proto__` 접근자 프로퍼티와 함수 객체만이 가지고 있는 `prototype` 프로퍼티는 결국 동일한 프로토타입을 가리킨다.** 하지만 이들 프로퍼티를 사용하는 주체가 다르다.

![](https://velog.velcdn.com/images/codenmh0822/post/83e670ec-1afc-49df-86c2-aaf2c8b6cdda/image.png)

```js
function Person(name) {
  this.name = name;
}

const inst = new Person("Hoon");

console.log(Person.prototype === inst.__proto__); // true
```

![](https://velog.velcdn.com/images/codenmh0822/post/bd4d91c2-f4ad-4a14-bbdb-b64f4502f645/image.png)

### 프로토타입의 constructor 프로퍼티와 생성자 함수

모든 프로토타입은 `constructor` 프로퍼티를 갖는다. **`constructor` 프로퍼티는 `prototype` 프로퍼티로 자신(프로토타입)을 참조하고 있는 생성자 함수를 가리킨다.**

이러한 연결은 생성자 함수(함수 객체)가 생성될 때 이뤄진다. 생성자 함수를 통해 생성한 인스턴스는 인스턴스의 프로토타입의 `constructor` 프로퍼티를 통해 생성자 함수랑 연결된다.

```js
// 생성자 함수와 프로토타입의 constructor 연결
function Person(name) {
  this.name = name;
}

const inst = new Person("Hoon");

// me 객체의 생성자 함수는 Person이다.
console.log(inst.constructor); // [Function: Person]
```

![](https://velog.velcdn.com/images/codenmh0822/post/91e3fe95-533a-403e-9755-1bf0e1874bc0/image.png)

## 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

생성자 함수에 의해 생성된 인스턴스는 프로토타입의 `constructor` 프로퍼티에 의해 생성자 함수와 연결된다.

`constructor` 프로퍼티가 가리키는 생성자 함수는 인스턴스를 생성한 생성자 함수다.

```js
// 생성자 함수 Object
const obj = new Object();
console.log(obj.constructor === Object); // true

// 생성자 함수 Function
const func = new Function("a", "b", "return a + b");
console.log(func.constructor === Function); // true

// 생성자 함수
function Person(name) {
  this.name = name;
}

const inst = new Person("Hoon");

// me 객체의 생성자 함수는 Person이다.
console.log(inst.constructor === Person); // true
```

리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다. 따라서 리터럴 표기법에 의해 생성된 객체도 가상적인 생성자 함수를 갖는다.

프로토타입은 생성자 함수와 더불어 생성되며 prototype, constructor 프로퍼티에 의해 연결되어 있기 때문이다.

다시 말해, **프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.**

```js
// Object 생성자 함수에 의한 객체 생성
// 인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성한다.
let obj = new Object();
console.log(obj); // {}

// new.target이 undefined나 Object가 아닌 경우 => 리터럴, 클래스 등
// 인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성된다.
class Foo extends Object {}
new Foo(); // Foo {}

// 인수가 전달된 경우에는 인수를 객체로 변환한다.
// Number 객체 생성
obj = new Object(123);
console.log(obj); // Number {123}

// String  객체 생성
obj = new Object("123");
console.log(obj); // String {"123"}
```

큰 틀에서 생각해보면 리터럴 표기법으로 생성한 객체도 생성자 함수로 생성한 객체와 본질적인 면에서 큰 차이는 없다.

따라서 프로토타입의 `constructor` 프로퍼티를 통해 연결되어 있는 생성자 함수를 리터럴 표기법으로 생성한 객체의 생성자 함수로 생각해도 큰 무리는 없다.

![](https://velog.velcdn.com/images/codenmh0822/post/6c270015-2497-4eba-8e79-5ebbcbcb515d/image.png)

## 프로토타입의 생성 시점

객체는 리터럴 표기법 또는 생성자 함수에 의해 생성되므로 결국 **모든 객체는 생성자 함수와 연결되어 있다.**

**프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.** 프로토타입과 생성자 함수는 언제나 쌍으로 존재하기 때문이다.

생성자 함수는 사용자가 직접 정의한 사용자 정의 생성자 함수와 자바스크립트가 기본 제공하는 빌트인 생성자 함수로 구분할 수 있다.

### 사용자 정의 생성자 함수와 프로토타입 생성 시점

내부 메서드 `[[Construct]]`를 갖는 함수 객체, 즉 화살표 함수나 ES6의 메서드 축약 표현으로 정의하지 않고 일반 함수(함수 선언문, 함수 표현식)로 정의한 함수 객체는 `new` 연산자와 함께 생성자 함수로 호출할 수 있다.

**생성자 함수로서 호출할 수 있는 함수, 즉 `constructor`는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.**

```js
console.log(Person.prototype);
console.log(Person2.prototype); // ReferenceError: Cannot access 'Person2' before initialization

// 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 생성
function Person(name) {
  this.name = name;
}

// 화살표 함수는 non-constructor라서 프로토타입이 생성되지 않는다.
const Person2 = (name) => {
  this.name = name;
};
```

생성된 프로토타입도 객체이다. 모든 객체는 프로토타입을 가지므로 생성된 프로토타입도 자신의 프로토타입을 갖는다.

이 때 생성된 프로토타입(`Person.prototype`)의 프로토타입은 `Object.prototype`이다.

![](https://velog.velcdn.com/images/codenmh0822/post/ea49d863-2efb-4dd9-9de1-6428c0933d00/image.png)

### 빌트인 생성자 함수와 프로토타입 생성 시점

`Object`, `String`, `Number`, `Function`, `Array`, `RegExp`, `Date`, `Promise`등과 같은 빌트인 생성자 함수도 **일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다.**

모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다. 생성된 프로토타입은 빌트인 생성자 함수의 `prototype` 프로퍼티에 바인딩된다.

> **전역 객체**
> 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 생성되는 특수한 객체다. 클라이언트 사이드 환경에서는 **window**, 서버 사이드 환경에서는 **global** 객체를 의미한다.

![](https://velog.velcdn.com/images/codenmh0822/post/2b49da8e-2151-49be-9cf0-48a643dc67d2/image.png)

이처럼 객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재한다.

이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 `[[Prototype]]` 내부 슬롯에 할당된다. 이로써 생성된 객체는 프로토타입을 상속받는다.

## 객체 생성 방식과 프로토타입의 결정

**프로토타입은 자바스크립트 엔진이 객체를 생성할 때, 추상 연산 `OrdinaryObjectCreate`에 전달되는 인수에 의해 결정된다.** 이 인수는 **객체가 생성되는 시점에 객체 생성 방식**에 의해 결정된다.

#### 객체 리터럴에 의해 생성된 객체의 프로토타입

객체 리터럴에 의해 생성되는 객체의 프로토타입은 `Object.prototype`이다.

```js
const obj = { x: 1 };
```

위 객체 리터럴이 평가되면 추상 연산 `OrdinaryObjectCreate`에 의해 다음과 같이 `Object` 생성자 함수와 `Object.prototype`과 생성된 객체 사이에 연결이 만들어진다.

![](https://velog.velcdn.com/images/codenmh0822/post/feaa7f81-026a-406d-bcc7-84f39f38a7e5/image.png)

이로써 `Oject.prototype`을 상속받고, 상속 받음으로 인해 obj 객체는 `constructor` 프로퍼티와 `hasOwnProperty` 메서드를 자신의 자산인 것처럼 자유롭게 사용할 수 있다.

#### Object 생성자 함수에 의해 생성된 객체의 프로토타입

`Object` 생성자 함수를 인수 없이 호출하면 빈 객체가 생성된다. `Object` 생성자 함수에 의해 생성되는 객체의 프로토타입은 `Object.prototype`이다.

```js
const obj = new Object();
obj.x = 1;
```

![](https://velog.velcdn.com/images/codenmh0822/post/108faac4-91bf-492f-ada9-a44d9c90880b/image.png)

`Object` 생성자 함수에 의해 생성된 `obj`객체는 `Object.prototype`을 프로토타입으로 갖게되며, 이로써 `Object.prototype`을 상속받는다.

`객체 리터럴`과 `Object 생성자 함수`에 의한 객체 생성 방식의 차이는 **프로퍼티를 추가하는 방식**에 있다.

- 객체 리터럴 방식 : 객체 리터럴 내부에 프로퍼티 추가
- Object 생성자 함수 방식 : 일반 빈 객체를 생성한 이후 프로퍼티 추가

#### 생성자 함수에 의해 생성된 객체의 프로토타입

생성자 함수에 의해 생성되는 객체의 프로토타입은 **생성자 함수의 `prototype` 프로퍼티에 바인딩되어 있는 객체다.**

```js
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");
```

생성자 함수와 생성자 함수의 `prototype` 프로퍼티에 바인딩되어있는 객체(`Person.prototype`)와 생성된 객체사이에 연결이 만들어진다.

![](https://velog.velcdn.com/images/codenmh0822/post/d8ca0049-707a-48e4-9569-14e607181938/image.png)

사용자 정의 생성자 함수(Person)와 더불어 생성된 프로토타입 `Person.prototype`의 프로퍼티는 `constructor`뿐이다.

## 프로토타입 체인

```js
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person("Lee");

// hasOwnProperty는 Object.prototype의 메서드다.
console.log(me.hasOwnProperty("name")); // true

console.log(Object.getPrototypeOf(me) === Person.prototype); // true
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true
```

`Person` 생성자 함수에 의해 생성된 `me` 객체는 `Object.prototype`의 메서드인 `hasOwnProperty`를 호출할 수 있다. 이것은 `me` 객체가 `Person.prototype`뿐만 아니라 `Object.prototype`도 상속받았다는것을 의미한다.

`Person.prototype`의 프로토타입은 `Object.prototype`이다.

**프로토타입의 프로토타입은 언제나 `Object.prototype`이다.**

![](https://velog.velcdn.com/images/codenmh0822/post/1e094157-fea1-4895-99fd-47a7d1c786ce/image.png)

**자바스크립트는 객체의 프로퍼티에 접근하려고 할 때 해당 객체에 접근하여는 프로퍼티가 없다면 `[[Prototype]]` 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색하는 것을 프로토타입 체인이라한다.**

프로토타입 체인의 최상위에 위치하는 객체는 언제나 `Object.prototype`이다. **`Object.prototype`을 프로토타입 체인의 종점이라한다.**

프로토타입 체인의 종점의 `[[Prototype]]` 내부 슬롯의 값은 `null`이다. 프로토타입 체인의 종점까지 프로퍼티를 검색할 수 없는 경우 `undefined`를 반환하며, 이 때 에러가 발생하지 않는다.

프로토타입 체인은 자바스크립트가 **객체지향 프로그래밍의 상속을 구현하는 메커니즘이다.**

프로퍼티가 아닌 식별자는 스코프 체인에서 검색한다.

- **스코프 체인** : **식별자 검색을 위한 메커니즘**
- **프로토타입 체인** : **자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 매커니즘**

```js
me.hasOwnProrerty("name");
```

위의 경우 아래와 같이 스코프, 프로토타입 체인은 협력한다.

1. 스코프체인에서 me 식별자를 검색한다.
2. me 식별자는 전역에 선언되었으므로 전역 스코프에서 검색된다.
3. me 식별자를 검색한 후, me 객체의 프로토타입 체인에서 hasOwnProrerty 메서드를 검색한다.

이처럼 **스코프 체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는데 사용된다.**

## 오버라이딩과 프로퍼티 섀도잉
