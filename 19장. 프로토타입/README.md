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

```js
const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 생성자 함수를 반환
  return Person;
})();

const me = new Person("Lee");

// 인스턴스 메서드
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};

// 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
me.sayHello(); // Hey! My name is Lee
```

![](https://velog.velcdn.com/images/codenmh0822/post/7117bc9b-5040-437a-8ef3-0672dbb5fe9e/image.png)

프로토타입이 소유한 프로퍼티(메서드 포함)를 프로토타입 프로퍼티라고 한다. 반면 인스턴스가 소유한 프로퍼티를 인스턴스 프로퍼티라고 한다.

프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 프로토타입 체인을 따라 프로토타입 프로퍼티를 덮어쓰는 것이 아니라 인스턴스 프로퍼티로 새롭게 추가된다.

이처럼 **상속 관계에 의해 프로퍼티가 가려지는 현상을 프로퍼티 섀도잉이라 한다.**

> **오버라이딩**
> 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식

> **오버로딩**
> 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식으로 자바스크립트는 오버로딩을 지원하지 않지만 arguments 객체를 사용해 대체가능하다.

같은 이름의 프로퍼티를 추가하는 경우말고 삭제하는 경우도 마찬가지다.

```js
delete me.sayHello;

// 인스턴스 프로퍼티가 삭제되어 프로토타입 체인을 따라 프로토타입 프로퍼티 호출
me.sayHello(); // Hi! My name is Lee
```

다시 인스턴스를 통해 프로퍼티를 삭제하려 시도해도 프로토타입 프로퍼티는 삭제되지 않는다. 즉, **하위 객체를 통해 프로토타입의 프로퍼티를 변경 또는 삭제하는 것은 불가능하다.**

프로토타입 프로퍼티를 변경 또는 삭제하려면 하위 객체가 아닌 프로토타입에 직접 접근해야 한다.

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person("Lee");

me.sayHello(); // Hi! My name is Lee

delete Person.prototype.sayHello;

me.sayHello(); // TypeError: me.sayHello is not a function
```

## 프로토타입의 교체

프로토타입은 임의의 다른 객체로 변경할 수 있는데, 이것은 **부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미한다.**

이러한 특징을 활용하여 **객체 간의 상속 관계를 동적으로 변경할 수 있다.**

프로토타입은 **생성자 함수** 또는 **인스턴스에**에 의해 교체할 수 있다.

### 생성자 함수에 의한 프로토타입의 교체

```js
function Person(name) {
  this.name = name;
}

// 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
Person.prototype = {
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

const me = new Person("Lee");

// constructor 프로퍼티와 생성자 함수간의 연결 파괴
console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // true
```

`Person.prototype`에 객체 리터럴을 할당했다. 이는 `Person` 생성자 함수가 생성할 객체의 프로토타입을 객체 리터럴로 교체한 것이다.

![](https://velog.velcdn.com/images/codenmh0822/post/5af2a156-7667-42b6-b809-e8528275dd0e/image.png)

프로토타입으로 교체한 객체 리터럴에는 `constructor` 프로퍼티가 없다.

`constructor` 프로퍼티는 자바스크립트 엔진이 프로토타입을 생성할 때 암묵적으로 추가한 프로퍼티다.

따라서, `me` 객체의 생성자 함수를 검색하면 `Person`이 아닌 `Object`가 나온다.

이처럼 프로토타입을 교체하게 되면 `constructor` 프로퍼티와 생성자 함수간의 연결이 파괴되는데, `constructor` 프로퍼티를 추가하여 프로토타입의 `constructor` 프로퍼티를 되살린다.

```js
function Person(name) {
  this.name = name;
}

// 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
Person.prototype = {
  //constructor 프로퍼티와 생성자 함수 간의 연결을 설정
  constructor: Person,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

const me = new Person("Lee");

// constructor 프로퍼티와 생성자 함수간의 연결 파괴
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false
```

### 인스턴스에 의한 프로토타입의 교체

프로토타입은 생성자 함수의 `prototype` 프로퍼티 뿐만 아니라 인스턴스의 `__proto__` 접근자 프로퍼티(또는 `Oject.getPrototypeOf` 메서드)를 통해 접근할 수 있고 이를 통해 프로토타입을 교체할 수 있다.

생성자 함수의 `prototype` 프로퍼티에 다른 임의의 객체를 바인딩 하는 것은 미래에 생성할 인스턴스의 프로토타입을 교체하는 것이다.

`__proto__` 접근자 프로퍼티를 통해 프로토타입을 교체하는 것은 이미 생성된 객체의 프로토타입을 교체하는 것이다.

```js
function Person(name) {
  this.name = name;
}

const me = new Person("april");

// 프로토타입으로 교체할 객체
const parent = {
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is april

console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // true
```

![](https://velog.velcdn.com/images/codenmh0822/post/fda4acab-934a-4470-95c2-1737d61b9792/image.png)

마찬가지로 프로토타입으로 교체한 객체에는 `constructor` 프로퍼티가 없으므로 `constructor` 프로퍼티와 생성자 함수 간의 연결이 파괴된다.

생성자 함수에 의한 프로토타입 교체와 인스턴스에 의한 프로토타입 교체는 별다른 차이가 없어보이지만 미묘한 차이가 있다.

![](https://velog.velcdn.com/images/codenmh0822/post/b8e96497-84b3-4db5-b856-dd987ebbd67c/image.png)

**생성자 함수**에 의한 프로토타입 교체는 `Person` 생성자 함수의 `prototype` 프로퍼티가 교체된 프로토타입을 가리킨다.

**인스턴스**에 의한 프로토타입 교체는 `Person` 생성자 함수의 `prototype` 프로퍼티가 교체된 프로토타입을 가리키지 않는다. 그렇기에 마찬가지로 별도의 `constructor` 연결이 필요하다.

```js
function Person(name) {
  this.name = name;
}

const me = new Person("april");

// 프로토타입으로 교체할 객체
const parent = {
  // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
  constructor: Person,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is april

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false

// 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다.
console.log(Person.prototype === Object.getPrototypeOf(me)); // true
```

좀 더 구체적으로 생성자 함수와 인스턴스를 통한 프로토타입 변경에 대해 살펴보자.

```js
// 생성자 함수의 프로토타입 변경에 따른 추가 인스턴스 생성
function Person(name) {
  this.name = name;
}

const parent = {
  constructor: Person,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

Person.prototype = parent;

const me = new Person("april");
me.sayHello(); // Hi! My name is april

const me2 = new Person("hoon");
me2.sayHello(); // Hi! My name is hoon

// 인스턴스를 몇개를 생성하던 프로토타입이 동일하다.
console.log(Object.getPrototypeOf(me) === Object.getPrototypeOf(me2)); // true
```

```js
// 인스턴스를 통한 프로토타입 변경에 따른 추가 인스턴스 생성
function Person(name) {
  this.name = name;
}

const parent = {
  constructor: Person,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

const me = new Person("april");

Object.setPrototypeOf(me, parent);

me.sayHello(); // Hi! My name is april

const me2 = new Person("hoon");
// me2.sayHello(); // TypeError: me.sayHello is not a function

// 인스턴스를 생성하고 프로토타입을 설정하지 않으면 기존 Person의 프로토타입을 가리키는 인스턴스들이 생성된다.
console.log(Object.getPrototypeOf(me) === Object.getPrototypeOf(me2)); // false
console.log(Object.getPrototypeOf(me2) === Person.prototype); // true
```

위와 같이 프로토타입의 직접적인 변경은 번거롭고 예상치 못한 실수를 할 수 있기에 지양하며 직접상속 또는 클래스를 사용하면 간편하고 직관적으로 상속 관계를 구현할 수 있으며 지향한다.

## instanceof 연산자

`instanceof` 연산자는 이항 연산자로서 **좌변에 객체를 가리키는 식별자, 우변에 생성자 함수를 가리키는 식별자를 피연산자로 받는다.**

```js
객체 instanceof 생성자함수;
```

우변의 생성자 함수의 `prototype`에 바인딩된 객체가 좌변의 객체의 프로토타입 체인상에 존재하면 `true` 아니면 `false`로 평가된다.

```js
//생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// Person.prototype과 Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가
console.log(me instanceof Person); // true
console.log(me instanceof Object); // true

const parent = {};

Object.setPrototypeOf(me, parent);

// 서로 연결되지 않은 생성자 함수와 parent 객체
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

// parent 객체를 Person 생성자 함수의 프로토타입에 바인딩
Person.prototype = parent;

console.log(me instanceof Person); // true
console.log(me instanceof Object); // true
```

`instanceof` 연산자는 프로토타입의 `constructor` 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니라 **생성자 함수의 `prototype`에 바인딩된 객체(프로토타입)가 인스턴스 객체의 프로토타입 체인 상에 존재하는지 확인한다.**

![](https://velog.velcdn.com/images/codenmh0822/post/93e78b85-90b7-416d-8556-a5c03c7ff888/image.png)

프로토타입을 함수로 구현하면 아래와 같다.

```js
function isInstanceof(instance, constructor) {
  // 프로토타입 취득
  const prototype = Object.getPrototypeOf(instance);

  // 재귀 탈출 조건
  // prototype이 null이면 프로토타입 체인의 종점에 다다른 것이다.
  if (prototype === null) return false;

  // 프로토타입이 생성자 함수의 prototype 프로퍼티에 바인딩된 객체라면 true를 반환한다.
  // 그렇지 않다면 재귀 호출로 프로토타입 체인 상의 상위 프로토타입으로 이동하여 확인한다.
  return (
    prototype === constructor.prototype || isInstanceof(prototype, constructor)
  );
}

console.log(isInstanceof(me, Person)); // true
console.log(isInstanceof(me, Object)); // true
console.log(isInstanceof(me, Array)); // false
```

따라서 생성자 함수에 의해 프로토타입이 교체되어 `constructor` 프로퍼티와 생성자 함수 간의 연결이 파괴되어도 생성자 함수의 `prototype` 프로퍼티와 프로토타입 간의 연결은 파괴되지 않으므로 `instanceof`는 아무런 영향을 받지 않는 것이다.

```js
function Person(name) {
  this.name = name;
}

// 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
Person.prototype = {
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

const me = new Person("Lee");

// constructor 프로퍼티와 생성자 함수 간의 연결은 파괴되어도 instanceof는 아무런 영향을 받지 않음.
console.log(me.constructor === Person); // false

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가됨.
console.log(me instanceof Person); // true
// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가됨.
console.log(me instanceof Object); // true
```

## 직접 상속

#### Object.create에 의한 직접 상속

`Object.create` 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다.

`Object.create` 메서드도 다른 객체 생성 방식과 마찬가지로 추상 연산 `OrdinaryObjectCreate`를 호출한다.

```js
/**
* 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체를 생성하여 반환한다.
* @param {Object} prototype - 생성할 객체의 프로토타입으로 지정할 객체
* @param {Object} [propertiesObject] - 생성할 객체의 프로퍼티를 갖는 객체
* @returns {Object} 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체
*/
Object.create(prototype[, propertiesObject])
```

이처럼 `Object.create` 메서드는 첫 번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성한다.

`Object.prototype`의 빌트인 메서드들은 모든 객체의 프로토타입 체인의 종점, 즉, `Object.prototype`의 메서드이므로 모든 객체가 상속받아 호출할 수 있다.

그런데 `ESLint`에서는 `Object.prototype`의 빌트인 메서드를 직접적으로 호출하는 것을 권장하지 않는다.

`Object.create` 메서드를 통해 프로토타입 체인의 종점에 위치하는 객체를 생성할 수 있기 때문이다.

```js
// 프로토타입이 null인 객체를 생성.
const obj = Object.create(null);
obj.a = 1;

// Object.prototype에 해당되지 않기에 빌트인 메서드를 사용불가
// console.log(obj.hasOwnProperty('a')); // TypeError: obj.hasOwnProperty is not a function

// Object.prototype의 빌트인 메서드는 객체로 직접 호출하지 않음.
console.log(Object.prototype.hasOwnProperty.call(obj, "a")); // true
```

#### 객체 리터럴 내부에서 **proto**에 의한 직접 상속

`Object.create` 메서드에 의한 직접 상속은 여러 장점이 있다. 하지만 두번째 인자로 프로퍼티를 정의하는 것은 번거롭다. 일단 객체를 생성한 이후 프로퍼티를 추가하는 방법도 있으나 이 또한 깔끔한 방법은 아니다.

ES6 에서는 객체 리터럴 내부에서 `__proto__` 접근자 프로퍼티를 사용하여 직접 상속을 구현할 수 있다.

하지만 이 방법 역시 지양하는 것이 좋다고 한다.
[MDN - Object.prototype.\_\_proto\_\_](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

```js
const myProto = { x: 10 };

// 객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속받을 수 있다.
const obj = {
  y: 20,
  // 객체를 직접 상속받는다.
  // obj → myProto → Object.prototype → null
  __proto__: myProto,
};

/** 위 코드는 아래와 동일하다.
const obj = Object.create(myProto, {
  y: { value: 20, writable: true, enumerable: true, configurable: true }
});
*/

console.log(obj.x, obj.y); // 10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true
```

## 정적 프로퍼티/메서드

정적(static) 프로퍼티/메서드는 **생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드를 말한다.**

```js
// 생성자 함수
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

// 정적 프로퍼티
Person.staticProp = "static prop";

// 정적 메서드
Person.staticMethod = function () {
  console.log("staticMethod");
};

const me = new Person("april");

// 생성자 함수에 추가한 정적 프로퍼티/메서드는 생성자 함수로 참조/호출한다.
Person.staticMethod(); // staticMethod

// 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
// 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입 체인 상에 존재해야 한다.
me.staticMethod(); // TypeError: me.staticMethod is not a function
```

![](https://velog.velcdn.com/images/codenmh0822/post/b4b1593c-ebbc-4431-aa1f-7b35b8ed5d8d/image.png)

정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.

MDN과 같은 문서를 보면 정적 프로퍼티/메서드와 프로토타입 프로퍼티/메서드를 구분해놓고 있으므로 표기법만으로도 구별할 수 있어야 한다.

프로토타입 프로퍼티/메서드를 표기할 때 `prototype`을 `#`으로 표기하는 경우도 있다.

![](https://velog.velcdn.com/images/codenmh0822/post/77268e17-fa11-4672-9a56-7d1bac0dd20c/image.png)

## 프로퍼티 존재 확인

### in 연산자

`in` 연산자는 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인한다.

```js
/**
 * key: 프로퍼티 키를 나타내는 문자열
 * object: 객체로 평가되는 표현식
 */
key in object;
```

```js
const person = {
  name: "Lee",
  address: "Seoul",
};

// person 객체에 name 프로퍼티가 존재한다.
console.log("name" in person); // true

// person 객체에 address 프로퍼티가 존재한다.
console.log("address" in person); // true

// person 객체에 age 프로퍼티가 존재하지 않는다.
console.log("age" in person); // false

// 모든 프로토타입의 프로퍼티를 확인함 -> toString은 Object.prototype메서드에 존재한다.
console.log("toString" in person); // true
```

`in` 연산자는 **확인 대상 객체의 프로퍼티뿐만 아니라 확인 대상 객체가 상속받은 모든 프로토타입(프로토타입 체인)의 프로퍼티를 확인**하므로 주의가 필요하다.

ES6에서 도입된 `Reflect.has` 메서드를 `in` 연산자 대신 사용가능하다.

```js
const person = { name: "Lee" };

console.log(Reflect.has(person, "name")); // true
console.log(Reflect.has(person, "toString")); // true
```

### Object.prototype.hasOwnProperty 메서드

`Object.prototype.hasOwnProperty` 메서드를 사용해도 객체에 특정 프로퍼티가 존재하는지 확인할 수 있다.

`Object.prototype.hasOwnProperty` 메서드는 이름에서 알 수 있듯이 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 `true`를 반환하고 상속받은 프로토타입의 프로퍼티 키인 경우 `false`를 반환한다.

```js
console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("age")); // false
console.log(person.hasOwnProperty("toString")); // false
```

## 프로퍼티 열거

### for...in 문

객체의 모든 프로퍼티를 순회하며 열거 하려면 `for...in`문을 사용한다.

```js
for (변수선언문 in 객체) { ... }
```

`for...in`문은 객체의 프로토타입 체인상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 `[[Enumerable]]`의 값이 `true`인 프로퍼티를 순회하여 열거한다.

프로퍼티 키가 심벌인 프로퍼티는 열거하지 않는다.

```js
const sym = Symbol();

const person = {
  name: "Lee",
  address: "Seoul",
  [sym]: 10,
  __proto__: { age: 20 },
};

// in 연산자는 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인한다.
console.log("toString" in person); // true

// for...in 문도 객체가 상속받은 모든 프로토타입의 프로퍼티를 열거한다.
// 하지만 toString과 같은 Object.prototype의 프로퍼티가 열거되지 않는다.
// toString 메서드가 열거할 수 없도록 정의되어 있는 프로퍼티이기 때문이다.
for (const key in person) {
  console.log(key + ": " + person[key]);
}

// name: Lee
// address: Seoul
// age: 20

for (const key in person) {
  // 객체 자신의 프로퍼티만 확인하고 싶은 경우
  if (!person.hasOwnProperty(key)) continue;
  console.log(key + ": " + person[key]);
}

// name: Lee
// address: Seoul
```

대부분의 브라우저는 프로퍼티를 정의 순서를 보장하고 숫자(사실은 문자열로 암묵적 치환)인 프로퍼티 키에 대해서는 정렬을 실시하지만, 무조건적인 보장은 없으므로 주의하자.

```js
const obj = {
  2: 2,
  3: 3,
  1: 1,
  b: "b",
  c: "c",
  a: "a",
};

for (const key in obj) {
  if (!obj.hasOwnProperty(key)) continue;
  console.log(key + ": " + obj[key]);
}
```

### Object.keys/values/entries 메서드

`for...in` 문은 객체 자신의 고유 프로퍼티뿐 아니라 상속받은 프로퍼티도 열거가 가능하여 예상치 못한 열거가 이루어질 수 있다.

그리고 객체 자신의 고유 프로퍼티인지 확인하기 위해 `Object.prototype.hasOwnProperty` 메서드를 사용하는 추가 절차가 필요하여 불편하다.

따라서 객체 자신의 고유 프로퍼티만 열거하기 위해서는 `for...in` 문을 사용하는 것보다는 `Object.keys/values/entries` 메서드를 사용하는 것을 권장한다.

`Object.keys`: 객체 자신의 열거 가능한 프로퍼티 **키**를 배열로 반환
`Object.values`: 객체 자신의 열거 가능한 프로퍼티 **값**을 배열로 반환(ES8에서 도입)
`Object.entries`: 객체 자신의 열거 가능한 프로퍼티 **키와 값**의 쌍의 배열을 배열에 담아 반환(ES8에서 도입)

```js
const person = {
  name: "Lee",
  address: "Seoul",
  __proto__: { age: 20 },
};

console.log(Object.keys(person)); // ["name", "address"]
console.log(Object.values(person)); // ["Lee", "Seoul"]
console.log(Object.entries(person)); // [["name", "Lee"], ["address", "Seoul"]]

Object.entries(person).forEach(([key, value]) => console.log(key, value));
/*
name Lee
address Seoul
*/
```
