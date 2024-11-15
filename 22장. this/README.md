## this 키워드

객체지향 프로그래밍에서 객체는 상태(state)를 나타내는 프로퍼티와 동작(behavior)을 나타내는 메서드를 하나의 논리적인 단위로 묶은 복합적인 자료구조이다.

동작을 나타내는 메서드는 자신이 속한 객체의 상태, 즉 프로퍼티를 참조하고 변경할 수 있어야 한다.

이때 메서드가 자신이 속한 객체의 프로퍼티를 참조하려면 먼저 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.

생성자 함수 방식으로 인스턴스를 생성하는 경우 생성자 함수를 정의한 이후 `new` 연산자와 함께 생성자 함수를 호출해야 한다. 하지만 생성자 함수를 정의하는 시점에는 아직 인스턴스를 생성하기 이전이므로 생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없다.

```js
function Circle(radius) {
     // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
     ????.radius = radius;
   }

   Circle.prototype.getDiameter = function () {
     // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
     return 2 * ????.radius;
   };

   // 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수를 정의해야 한다.
   const circle = new Circle(5);
```

위와 같은 문제를 해결하기 위해 자바스크립트는 `this`라는 특수한 식별자를 제공한다.

**`this`는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수(self-referenceing variable)이다.**

**`this`를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.**

`this`는 자바스크립트 엔진에 의해 암묵적으로 생성되며, 코드 어디서든 참조할 수 있으며 함수를 호출하면 `arguments` 객체와 `this`가 암묵적으로 함수 내부에 전달된다.

자바나 C++ 같은 클래스 기반 언어에서 `this`는 언제나 클래스가 생성하는 인스턴스를 가리킨다. 하지ㅣ만 **자바스크립트는 함수가 호출되는 방식에 따라 `this`가 가리키는 값, 즉 `this` 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.**

> **this 바인딩**
> 바인딩이란 식별자와 값을 연결하는 과정을 의미한다. 예를 들어 변수 선언은 변수 이름(식별자)과 확보된 메모리 공간의 주소를 바인딩하는 것이다. this(키워드로 분류되지만 식별자 역할)와 this가 가리킬 객체를 바인딩하는 것이다.

`this`는 일반적으로 객체의 메서드 내부 또는 생성자 함수 내부에서만 의미가 있다. 따라서 `strict mode`가 적용된 일반 함수 내부의 `this`에는 `undefined`가 바인딩된다. 일반 함수 내부에서는 `this`가 무의미하기 때문이다.

## 함수 호출 방식과 this 바인딩

**this 바인딩은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.**

> **렉시컬 스코프와 this 바인딩은 결정 시기가 다르다.**
> 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다. 하지만 this 바인딩은 함수 호출 시점에 결정된다.

### 일반 함수 호출

**기본적으로 this에는 전역 객체가 바인딩 된다.**

```js
function foo() {
  console.log("foo's this: ", this); // window
  function bar() {
    console.log("bar's this: ", this); // window
  }
  bar();
}
foo();
```

**전역 함수나 중첩 함수, 콜백 함수를 일반 함수로 호출하면 함수 내부의 `this`에는 전역 객체가 바인딩된다. 객체를 생성하지 않는 일반 함수에서 `this`는 의미가 없다.**

어떠한 함수라도 일반 함수로의 호출은 `this`에 전역 객체가 바인딩된다.

```js
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // {value: 100, foo: ƒ}

    // 메서드 내에서 정의한 중첩 함수
    function bar() {
      console.log("bar's this: ", this); // window
      console.log("bar's this.value: ", this.value); // 1
    }
    // 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면
    // 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.
    bar();

    // 콜백 함수 내부의 this에는 전역 객체가 바인딩된다.
    setTimeout(function () {
      console.log("callback's this: ", this); // window
      console.log("callback's this.value: ", this.value); // 1
    }, 100);
  },
};

obj.foo();
```

### 메서드 호출

메서드 내부의 `this`에는 메서드를 호출한 객체, 즉 메서드를 호출할 때 메서드 이름 앞의 마침표 `.` 연산자 앞에 기술한 객체가 바인딩된다.

주의할 것은 메서드 내부의 `this`는 메서드를 소유한 객체가 아닌 메서드를 호출한 객체에 바인딩된다는 것이다.

```js
const person = {
  name: "Lee",
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  },
};

// 메서드 getName을 호출한 객체는 person이다.
console.log(person.getName()); // Lee
```

![](https://velog.velcdn.com/images/codenmh0822/post/3b0703aa-ac04-4d14-906b-10d3a56bb966/image.png)

따라서 `getName` 프로퍼티가 가리키는 함수 객체, 즉 `getName` 메서드는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수도 있고 일반 변수에 할당하여 일반 함수로 호출될 수도 있다.

```js
const person = {
  name: "Lee",
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  },
};

const anotherPerson = {
  name: "Kim",
};
// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

// getName 메서드를 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName()); // Kim

// getName 메서드를 변수에 할당
const getName = person.getName;

// getName 메서드를 일반 함수로 호출
console.log(getName()); //   '  '
// 일반 함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
// 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 '  '이다.
// Node.js 환경에서 this.name은 undefined다.
```

따라서 메서드 내부의 `this`는 프로퍼티로 메서드를 가리키고 있는 객체와는 관계가 없고 메서드를 호출한 객체에 바인딩된다.

![](https://velog.velcdn.com/images/codenmh0822/post/bfff3291-3cc9-4569-80bc-13def8447fc7/image.png)

프로토타입 메서드 내부에서 사용된 `this`도 일반 메서드와 마찬가리로 해당 메서드를 호출한 객체에 바인딩된다.

```js
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

const me = new Person("Lee");

// getName 메서드를 호출한 객체는 me다.
console.log(me.getName()); // ① Lee

Person.prototype.name = "Kim";

// getName 메서드를 호출한 객체는 Person.prototype이다.
console.log(Person.prototype.getName()); // ② Kim
```

①의 경우 `getName` 메서드를 호출한 객체는 `me`이다. 따라서 `getName` 메서드 내부의 `this`는 `me`를 가리키며 `this.name` 은 `Lee`이다.

②의 경우 `getName` 메서드를 호출한 객체는 `Person.prototype(일반 객체)`이다. 따라서 `getName` 메서드 내부의 `this`는 `Person.prototype`을 가리키며 `this.name` 은 `Kim`이다.

![](https://velog.velcdn.com/images/codenmh0822/post/0893b0a8-39f2-4ef1-bf96-4038e5596663/image.png)

### 생성자 함수 호출

**생성자 함수 내부의 `this`에는 생성자 함수가 생성할 인스턴스가 바인딩된다.**

```js
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
// 반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```
