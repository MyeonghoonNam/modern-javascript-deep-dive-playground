## 클래스는 프로토타입의 문법적 설탕인가?

자바스크립트는 프로토타입 기반 객체지향 언어이다. 비록 전통적인 다른 객체지향 언어와의 차이점은 분명히 존재하지만 자바스크립트는 강력한 객체지향 프로그래밍 능력을 지니고 있다.

**프로토타입 기반 객체지향 언어는 클래스가 필요 없는 객체지향 프로그래밍 언어이다.**

ES6에 도입된 클래스는 기존 프로토타입 기반 객체지향 프로그래밍보다 자바나 C#과 같은 클래스 기반 객체지향 프로그래밍에 익숙한 프로그래머를 위해 클래스 기반 객체지향 프로그래밍 언어와 매우 흡사한 새로운 객체 생성 메커니즘을 제시한다.

그렇다고 클래스가 기존 프로토타입 기반 객체지향 모델을 폐지하고 새롭게 클래스 기반 객체 지향 모델을 제공하는 것은 아니다.

**클래스는 함수이며 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있도록 하는 문법적 설탕이라고 볼 수도 있다.**

> **문법적 설탕(syntactic sugar)**
> 문법적 기능은 그대로인데 그것을 읽는 사람이 직관적으로 쉽게 코드를 읽을 수 있게 만드는 것

단, 클래스와 생성자 함수는 모두 프로토타입 기반의 인스턴스를 생성하지만 정확히 동일하게 동작하지는 않는다.

**클래스는 생성자 함수보다 엄격하며 생성자 함수에서는 제공하지 않는 기능도 제공한다.**

클래스와 생성자 함수의 차이점

1. 클래스를 `new` 연산자 없이 호출하면 에러가 발생하는데, 생성자 함수를 `new` 연산자 없이 호출하면 일반 함수로서 호출된다.
2. 클래스는 상속을 지원하는 `extends`와 `super` 키워드를 제공한다. 하지만 생성자 함수는 앞서말한 키워드를 지원하지 않는다.
3. 클래스는 호이스팅이 발생하지 않는 것처럼 동작한다. 하지만 함수 선언문으로 정의된 생성자 함수는 함수 호이스팅이, 함수 표현식으로 정의한 생성자 함수는 변수 호이스팅이 발생한다.
4. 클래스 내의 모든 코드에는 암묵적으로 `strict mode`가 지정되어 실행되며 이를 해제할 수 없다. 하지만 생성자 함수는 암묵적으로 `strict mode`가 지정되지 않는다.
5. 클래스의 `constructor`, 프로토타입 메서드, 정적 메서드는 모두 프로퍼티 어트리뷰트 `[[Enumerable]]`의 값이 `false`로 열거되지 않는다.

따라서 **클래스를 프로토타입 기반 객체 생성 패턴의 단순한 문법적 설탕이라고 보기보다는 새로운 객체 생성 메커니즘으로 보는 것이 좀 더 합당하다.**

## 클래스 정의

클래스는 `class` 키워드를 사용하여 정의한다.

클래스 이름은 생성자 함수와 마찬가지로 파스칼 케이스를 사용하는 것이 일반적이다.

```js
// 클래스 선언문
class Person {}
```

일반적이지 않지만 함수와 마찬가지로 표현식으로 클래스를 정의할 수도 있다.

```js
// 익명 클래스 표현식
const Person = class {};

// 기명 클래스 표현식
const Person = class MyClass {};
```

**클래스를 표현식으로 정의할 수 있다는 것은 클래스가 값으로 사용할 수 있는 일급 객체라는 것을 의미한다.** 즉, 클래스는 함수이다. 그렇기에 아래와 같은 일급 객체의 특징을 가진다.

- 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
- 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
- 함수의 매개변수에게 전달할 수 있다.
- 함수의 반환값으로 사용할 수 있다.

클래스 몸체에는 `0개` 이상의 메서드만 정의할 수 있다. 클래스 몸체에서 정의할 수 있는 메서드는 `constructor(생성자)`, 프로토타입 메서드, 정적 메서드의 세 가지 종류가 존재한다.

```js
class Person {
  // 생성자
  constructor(name) {
    this.name = name; // name 프로퍼티는 public 하다.
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }

  // 정적 메서드
  static sayHello() {
    console.log("Hello!");
  }
}

// 인스턴스 생성
const me = new Person("Lee");

//인스턴스의 프로퍼티 참조
console.log(me.name); //Lee

// 프로토타입 메서드 호출
me.sayHi(); // Hi! My name is Lee

// 정적 메서드 호출
Person.sayHello(); // Hello!

// 인스턴스로 정적 메서드 호출
me.sayHello(); // TypeError: me.sayHello is not a function
```

![](https://velog.velcdn.com/images/codenmh0822/post/8dd535e5-a6bf-47d4-9978-281deb0ff293/image.png)

## 클래스 호이스팅

클래스는 함수로 평가된다.

```js
// 클래스 선언문
class Person {}
console.log(typeof Person); // function
```

클래스 선언문으로 정의한 클래스는 함수 선언문과 같이 소스코드 평가 과정, 즉 런타임 이전에 먼저 평가되어 함수 객체를 생성한다.

이때 클래스가 평가되어 생성된 함수 객체는 생성자 함수로서 호출할 수 있는 함수인 `constructor`이다.

**생성자 함수로서 호출할 수 있는 함수는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.**

**프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재하기 때문이다.**

하지만 여기서 중요한 차이점은 **클래스는 클래스 정의 이전에 참조할 수 없다는 점이다.**

```js
console.log(typeof Person); // ReferenceError: Cannot access 'Person' before initialization
class Person {}
```

그렇다면 클래스 선언문은 호이스팅이 발생하지 않는 것인가?

클래스 선언문도 변수 선언, 함수 정의와 마찬가지로 호이스팅이 발생한다. 다만 `let`, `const` 키워드로 선언한 변수와 마찬가지로 호이스팅된다.

```js
const Person = "";

{
  // 호이스팅이 발생하지 않았다면 상위 스코프의 Person에 할당된 값 ""이 출력되어야 한다.
  console.log(Person); // ReferenceError: Cannot access 'Person' before initialization
  class Person {}
}
```

따라서 클래스 선언문 이전에 일시적 사각지대가 존재한다면 호이스팅이 발생하지 않는 것처럼 동작한다.

`var`, `let`, `const`, `function`, `function*`, `class` 키워드를 사용하여 선언된 모든 식별자는 호이스팅된다. 모든 선언문은 런타임 이전에 먼저 평가과정을 통해 실행되기 때문이다.

## 인스턴스 생성

클래스는 생성자 함수이며 `new` 연산자와 함께 호출되어 인스턴스를 생성한다.

```js
class Person {}

const me = new Person();
console.log(me); // Person {}
```

함수는 `new` 연산자의 사용 여부에 따라 일반 함수로 호출되거나 인스턴스 생성을 위한 생성자 함수로 호출되지만 **클래스는 인스턴스를 생성하는 것이 유일한 존재 이유이므로 반드시 `new` 연산자와 함께 호출해야 한다.** (그렇지 않으면 어차피 에러 발생)

클래스 표현식으로 정의된 클래스의 경우에 클래스를 가리키는 식별자를 사용해 인스턴스를 생성해야 에러가 발생하지 않는다.

```js
const Person = class MyPerson {};

// 함수 표현식과 마찬가지로 클래스를 가리키는 식별자로 인스턴스를 생성해야 한다.
const me = new Person();

// 클래스 이름 MyPerson는 함수와 동일하게 클래스 몸체 내부에서만 유효한 식별자다.
console.log(MyPerson); // ReferenceError: MyPerson is not defined

const you = new MyPerson(); // ReferenceError: MyPerson is not defined
```

## 메서드

클래스 몸체에는 `0개` 이상의 메서드만 정의할 수 있다. 클래스 몸체에서 정의할 수 있는 메서드는 `constructor(생성자)`, 프로토타입 메서드, 정적 메서드의 세 가지 종류가 존재한다.

### constructor

`constructor` 는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드다. `constructor` 는 이름을 변경할 수 없다.

```js
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }
}
```

![](https://velog.velcdn.com/images/codenmh0822/post/a80a125f-7784-41e7-9e36-49686ebfd357/image.png)

클래스는 인스턴스를 생성하기 위한 생성자 함수다. 즉, 클래스는 평가되어 함수 객체가 된다.

클래스 역시 함수와 동일하게 함수 객체 고유의 프로퍼티를 모두 갖고 있다. 함수와 동일하게 프로토타입과 연결되어 있으며 자신의 스코프 체인을 구성한다.

모든 함수 객체가 가지고 있는 `prototype` 프로퍼티가 가리키는 프로토타입 객체의 `constructor` 프로퍼티는 클래스 자신을 가리키고 있다.

이는 클래스가 인스턴스를 생성하는 생성자 함수라는 것을 의미한다. 즉, `new` 연산자와 함께 클래스를 호출하면 클래스는 인스턴스를 생성한다.

![](https://velog.velcdn.com/images/codenmh0822/post/efe5db25-5fbd-49dd-83df-ca10670006d5/image.png)

클래스가 생성한 인스턴스를 살펴보면 `Person` 클래스의 `constructor` 내부에서 `this`에 추가한 `name` 프로퍼티를 가지고 있는 것을 확인할 수 있다.

**즉, 생성자 함수와 마찬가지로 `constructor` 내부에서 `this` 에 추가한 프로퍼티는 인스턴스 프로퍼티가 된다.**

**`constructor` 내부의 `this` 는 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스를 가리킨다.**

클래스가 평가되어 생성된 함수 객체나 클래스가 생성한 인스턴스 어디에도 `constructor` 메서드가 보이지 않는데, 이는 메서드로 해석되는 것이 아니라 클래스가 평가되어 생성한 함수 객체 코드의 일부가 된다.

즉, 클래스 정의가 평가되면 `constructor` 의 기술된 동작을 하는 함수 객체가 생성된다.

> **클래스의 constructor 메서드와 프로토타입의 constructor 프로퍼티**
> 클래스의 `constructor` 메서드와 프로토타입의 `constructor` 프로퍼티는 이름이 같아 혼동하기 쉽지만 직접적인 관련이 없다. 프로토타읩의 `constructor` 프로퍼티는 모든 프로토타입이 가지고 있는 프로퍼티이며, 생성자 함수를 가리킨다.

`constructor` 는 생성자 함수와 유사하지만 몇 가지 차이가 있다.

- constructor는 클래스 내에 최대 한 개만 존재할 수 있다. 그 이상은 문법 에러가 발생한다.
- constructor는 생략할 수 있으며 이때 빈 constructor가 암묵적으로 정의되어 빈 객체가 생성된다.
- 인스턴스를 생성할 때 클래스 외부에서 인스턴스 프로퍼티 초기값을 전달하려면 constructor에 매개변수를 선언하고 인스턴스를 생성할 때 초기값을 전달한다.
- constructor는 별도 반환문을 갖지 않아야 한다. 앞서 살펴본 생성자 함수의 인스턴스 생성 과정에서 살펴봤듯이 암묵적으로 this에 바인딩된 인스턴스를 반환하기 때문이다.

### 프로토타입 메서드

생성자 함수를 사용하여 인스턴스를 생성하는 경우 프로토타입 메서드를 생성하기 위해서는 명시적으로 프로토타입에 메서드를 추가해야 한다.

클래스 몸체에서 정의한 메서드는 생성자 함수에 의한 객체 생성 방식과는 다르게 클래스의 `prototype` 프로퍼티에 메서드를 추가하지 않아도 기본적으로 프로토타입 메서드가 된다.

```js
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}
```

생성자 함수와 마찬가지로 클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 된다.

```js
// me 객체의 프로토타입은 Person.prototype이다.
Object.getPrototypeOf(me) === Person.prototype; // -> true
me instanceof Person; // -> true

// Person.prototype의 프로토타입은 Object.prototype이다.
Object.getPrototypeOf(Person.prototype) === Object.prototype; // -> true
me instanceof Object; // -> true

// me 객체의 constructor는 Person 클래스다.
me.constructor === Person; // -> true
```

![](https://velog.velcdn.com/images/codenmh0822/post/a724b8d5-4e81-4f30-be00-b22cc502d540/image.png)

이처럼 클래스 몸체에서 정의한 메서드는 인스턴스의 프로토타입에 존재하는 프로토타입 메서드가 된다. 인스턴스는 프로토타입 메서드를 상속받아 사용할 수 있다.

프로토타입 체인은 기존의 모든 객체 생성 방식뿐만 아니라 ㅋ클래스에 의해 성생된 인스턴스에도 도일하게 적용된다. 생성자 함수의 역할을 클래스가 할 뿐이다.

**결국 클래스는 생성자 함수와 같이 인스턴스를 생성하는 생성자 함수라고 볼 수 있다. 다시 말해 클래스는 생성자 함수와 마찬가지로 프로토타입 기반의 객체 생성 메커니즘이다.**

### 정적 메서드

정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있는 메서드를 말한다.

생성자 함수의 경우 정적 메서드를 생성하기 위해서 명시적으로 생성자 함수에 메서드를 추가해야 한다.

클래스에서는 메서드에 `static` 키워드를 붙이면 정적 메서드가 된다.

```js
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }

  // 정적 메서드
  static sayHi() {
    console.log("Hi!");
  }
}
```

![](https://velog.velcdn.com/images/codenmh0822/post/23a694ec-4153-4078-8e79-619472af1f3c/image.png)

이처럼 정적 메서드는 클래스에 바인딩된 메서드가 된다.

클래스는 함수 객체로 평가되므로 자신의 프로퍼티/메서드를 소유할 수 있다. 클래스는 클래스 정의가 평가되는 시점에 함수 객체가 되므로 인스턴스와 달리 별다은 생성 과정이 필요없다.

따라서 정적 메서드는 클래스 정의 이후 인스턴스를 생성하지 않아도 호출할 수 있다.

```js
// 정적 메서드는 클래스로 호출한다.
// 정적 메서드는 인스턴스 없이도 호출할 수 있다.
Person.sayHi(); // Hi!
```

정적 메서드는 인스턴스로 호출할 수 없다. 정적 메서드가 바인딩된 클래스는 인스턴스의 프로토타입 체인상에 존재하지 않기 때문이다.

```js
// 인스턴스 생성
const me = new Person("April");
me.sayHi(); // TypeError: me.sayHi is not a function
```

### 정적 메서드와 프로토타입 메서드의 차이

정적 메서드와 프로토타입 메서드의 차이는 아래와 같다.

1. 정적 메서드와 프로토타입 메서드는 자신이 속해 있는 프로토타입 체인이 다르다.
2. 정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출한다.
3. 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있다.

#### 정적 메서드

클래스를 호출해야 하므로 정적 메서드 내부의 `this`는 인스턴스가 아닌 클래스를 가리킨다.

```js
class Square {
  // 정적 메서드
  static area(width, height) {
    return width * height;
  }
}

console.log(Square.area(10, 10)); // 100
```

#### 프로토타입 메서드

인스턴스를 호출해야하므로 프로토타입 메서드 내부의 `this`는 프로토타입 메서드를 호출한 인스턴스를 가리킨다.

```js
class Square {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  // 프로토타입 메서드
  area() {
    return this.width * this.height;
  }
}
const square = new Square(10, 10);
console.log(square.area()); // 100
```

프로토타입 메서드와 정적 메서드 내부의 `this` 바인딩이 다르다.

따라서 메서드 내부에서 인스턴스 프로퍼티를 참조할 필요가 있다면 `this`를 사용해야하며, 이러한 경우 프로퍼티 메서드로 정의해야한다.

하지만 메서드 내부에서 인스턴스 프로퍼티를 참조해야할 필요가 없다면 `this`를 사용하지 않게 된다.

`this`를 사용하지 않는 메서드는 정적 메서드로 정의하는 것이 좋다.

**정적 메서드는 애플리케이션 전역에서 사용할 유틸리티 함수를 전역 함수로 정의하지 않고 메서드로 구조화할 때 유용하다.**

### 클래스에서 정의한 메서드의 특징

1. `function` 키워드를 생략한 메서드 축약 표현을 사용한다.
2. 객체 리터럴과는 다르게 클래스에 메서드를 정의할 때는 콤마가 필요 없다.
3. 암묵적으로 `strict mode` 로 실행된다.
4. `for...in`, `Object.keys` 메서드 등으로 열거할 수 없다. 즉, 프로퍼티의 열거 가능 여부를 나타내며, 불리언 값을 갖는 프로퍼티 어트리뷰트 `[[Enumerable]]` 의 값이 `false` 다.
5. 내부 메서드 `[[Construct]]` 를 갖지 않는 `non-constuctor` 이다. 따라서 `new` 연산자와 함께 호출할 수 없다.

## 클래스의 인스턴스 생성 과정

`new` 연산자와 함께 클래스를 호출하면 생성자 함수와 마찬가지로 클래스의 내부 메서드 `[[Construct]]` 가 호출된다. 클래스는 `new` 연산자 없이 호출할 수 없다.

생성자 함수의 인스턴스 생성 과정과 유사하게 인스턴스가 생성된다.

### 1. 인스턴스 생성과 this 바인딩

`new` 연산자와 함께 클래스를 호출하면 `constructor` 의 내부 코드가 실행되기에 앞서 암묵적으로 빈 객체가 생성된다.

이 빈 객체가 바로 클래스가 생성할 인스턴스가 된다. 이때 클래스가 생성한 인스턴스의 프로토타입으로 클래스의 `prototype` 프로퍼티가 가리키는 객체가 설정된다.

그 후 빈 객체인 인스턴스는 `this` 에 바인딩된다. 최종적으로 `constructor` 내부의 `this` 는 클래스가 생성한 인스턴스를 가리킨다.

### 2. 인스턴스 초기화

`constructor` 의 내부 코드가 실행되어 `this` 에 바인딩되어 있는 인스턴스를 초기화한다.

`this` 에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 `constructor` 가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티 값을 초기화한다.

만약 `constructor` 가 생략되었다면 이 과정도 생략된다.

### 3. 인스턴스 반환

클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 `this` 가 암묵적으로 반환횐다.

```js
class Person {
  //생성자
  constructor(name) {
    // 1. 암묵적으로 인스턴스 생성되고 this에 바인딩된다.
    console.log(this); // Person {}
    console.log(Object.getPrototypeOf(this) === Person.prototype); // true

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.name = name;

    // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
    // return this;
  }
}
```

## 프로퍼티

### 인스턴스 프로퍼티

인스턴스 프로퍼티는 `constructor` 내부에서 정의해야 한다.

생성자 함수에서 생성자 함수가 생성할 인스턴스의 프로퍼티를 정의하는 것과 마찬가지로 `constructor` 내부에서 `this` 에 인스턴스 프로퍼티를 추가하여 초기화한다.

ES6의 클래스는 다른 객체지향 언어처럼 `private`, `public`, `protected` 키워드오아 같은 접근 제한자를 지원하지 않는다. 따라서 인스턴스 프로퍼티는 항상 `public` 하다.

```js
class Person {
  constructor(name) {
    // 인스턴스 프로퍼티
    this.name = name; // name 프로퍼티는 public하다.
  }
}

const me = new Person("Lee");

// name은 public하다.
console.log(me.name); // Lee
```

### 접근자 프로퍼티

접근자 프로퍼티는 자체적으로는 값(`[[Value]]` 내부 슬롯)을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티다.

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
}

const me = new Person("full", "name");

me.fullName = "change name";

console.log(me.fullName);
console.log(Object.getOwnPropertyDescriptor(Person.prototype, "fullName"));
```

접근자 프로퍼티는 `getter` 함수와 `setter` 함수로 구성되어있다.

`getter` 는 인스턴스 프로퍼티에 접근할 때마다 프로퍼티 값을 조작하거나 별도의 행위가 필요할 때 사용한다.

`get` 키워드를 메서드 이름 앞에 사용하여 정의한다.
`setter` 는 메서드 이름 앞에 `set` 키워드를 사용해 정의한다.

이때 `getter/setter` 이름은 인스턴스 프로퍼티처럼 사용된다. `getter` 는 호출하는 것이 아니라 프로퍼티처럼 참조하는 형식으로 사용하며, 참조 시에 내부적으로 호출된다.

`setter` 역시 호출하는 것이 아니라 프로퍼티처럼 값을 할당하는 형식으로 사용하며, 할당 시에 내부적으로 `setter` 가 호출된다.

`getter` 는 이름 그대로 무언가를 취득할 때 사용하므로 반드시 무언가를 반환해야 한다.
`setter` 는 무언가를 프로퍼티에 할당해야 할 때 사용하므로 반드시 매개변수가 있어야 한다. 이때 단 하나의 값만 할당받기 대문에 하나의 매개변수만 선언할 수 있다.

클래스의 메서드는 기본적으로 프로토타입 메서드가 된다. 따라서 클래스의 접근자 프로퍼티 또한 인스턴스 프로퍼티가 아닌 프로토타입의 프로퍼티가 된다.

### 클래스 필드 정의 제안

클래스 필드(필드 또는 멤버)는 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어이다.

```js
class Person {
  // 클래스 필드 정의
  name = "Lee";
}

const me = new Person();
console.log(me); // Person {name: "Lee"}
```

클래스 몸체에서 클래스 필드를 정의하는 경우 `this` 에 클래스 필드를 바인딩해서는 안된다.

`this`는 클래스의 `constructor` 와 메서드 내에서만 유효하다.

```js
class Person{
  this.name = ''; // SyntaxError
}
```

클래스 필드를 참조하는 경우 자바스크립트에서는 this를 반드시 사용해야한다.

```js
class Person {
  //// 클래스 필드
  name = "Lee";

  constructor() {
    console.log(name); // ReferenceError
  }
}

new Person();
```

클래스 필드에 초기값을 할당하지 않으면 `undefined`를 갖는다.

인스턴스를 생성할 때 외부의 초기값으로 클래스 필드를 초기화해야 할 필요가 있다면
`constructor` 에서 클래스 필드를 초기화해야 한다.

클래스 필드에 함수를 할당하는 것은 권장하지 않는다. 항상 프로토타입 메서드가 아닌 인스턴스 메서드가 되기 때문이다. 모든 클래스 필드는 인스턴스 프로퍼티가 된다.

인스턴스 프로퍼티를 정의하는 방식은 두가지가 되었다.

인스턴스를 생성할 때 외부 초기값으로 클래스 필드를 초기화할 필요가 "있다면" `constructor` 에서 인스턴스 프로퍼티를 정의하는 기존방식을 사용하고,

인스턴스를 생성할 때 외부 초기값으로 클래스 필드를 초기화할 필요가 "없다면" 기존의 `constructor` 에서 인스턴스 프로퍼티를 정의하는 방식과 클래스 필드 정의 제안 모두 사용할 수 있다.

### private 필드 정의 제안

`private` 필드의 선두에는 `#` 을 붙여준다. `private` 필드를 참조할 때도 `#` 을 붙어주어야 한다.

```js
class Person {
  // private 필드 정의
  #name = "";

  constructor(name) {
    // private 필드 참조
    this.#name = name;
  }
}

const me = new Person("Lee");

// private 필드 #name은 클래스 외부에서 참조할 수 없다.
console.log(me.#name);
// SyntaxError: Private field '#name' must be declared in an enclosing class
```

`private` 필드는 클래스 내부에서만 참조할 수 있다. 또한, `private` 필드는 반드시 클래스 몸체에서만 정의해야하며, 클래스 내부에서만 참조할 수 있다.

`private` 필드를 직접 `constructor` 에 정의하면 에러가 발생한다.

![](https://velog.velcdn.com/images/codenmh0822/post/522fc129-bf59-4c40-b6bb-d98276db5fa7/image.png)

### static 필드 정의 제안

static public 필드, static private 필드, static private 메서드를 정의할 수 있다.

```js
class MyMath {
  // static public 필드 정의
  static PI = 22 / 7;

  // static private 필드 정의
  static #num = 10;

  // static 메서드
  static increment() {
    return ++MyMath.#num;
  }
}

console.log(MyMath.PI); // 3.142857142857143
console.log(MyMath.increment()); // 11
```

## 상속에 의한 클래스 확장

### 클래스 상속과 생성자 함수 상속

상속에 의한 클래스 확장은 **기존 클래스를 상속받아 새로운 클래스를 확장하여 정의하는 것이다.**

![](https://velog.velcdn.com/images/codenmh0822/post/95f15c7f-43ba-4263-b3bf-3a62a878d98f/image.png)

```js
class Animal {
  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  eat() {
    return "eat";
  }

  move() {
    return "move";
  }
}

//상속을 통해 Animal 클래스를 확장한 Bird 클래스
class Bird extends Animal {
  fly() {
    return "fly";
  }
}

const bird = new Bird(1, 5);

console.log(bird); // Bird {age: 1, weight: 5}
console.log(bird instanceof Bird); // true
console.log(bird instanceof Animal); // true

console.log(bird.eat()); // eat
console.log(bird.move()); // move
console.log(bird.fly()); // fly
```

상속에 의한 클래스 확장은 코드 재사용 관점에서 매우 유용하다.

클래스는 상속을 통해 다른 클래스를 확장할 수 있는 문법인 `extends` 키워드가 기본적으로 제공되지만 생성자 함수는 제공되지 않는다.

그리하여 상속을 활용할 필요가 있다면 생성자 함수를 통한 객체 생성보다 클래스 문법을 사용하는 것을 권장한다.

### extends 키워드

상속을 통해 클래스를 확장하려면 `extends` 키워드를 사용하여 상속받을 클래스를 정의한다.

```js
// 수퍼(베이스/부모)클래스
class Base {}

// 서브(파생/자식)클래스
class Derived extends Base {}
```

`extends` 키워드의 역할은 수퍼클래스와 서브클래스 간의 상속 관계를 설정하는 것이다. 클래스도 프로토타입을 통해 상속관계를 구현한다.

![](https://velog.velcdn.com/images/codenmh0822/post/2993afb1-ac72-400c-a512-8a327cd627e5/image.png)

수퍼클래스와 서브클래스는 인스턴스의 프로토타입 체인뿐 아니라 클래스 간의 프로토타입 체인도 생성한다. 이를 통해 프로토타입 메서드, 정적 메서드 모두 상속이 가능하다.

### 동적 상속

`extends` 키워드는 클래스뿐만 아니라 생성자 함수를 상속받아 클래스를 확장할 수도 있다. 단, `extends` 키워드 앞에는 반드시 클래스가 와야 한다.

```js
// 생성자 함수
function Base(a) {
  this.a = a;
}

// 생성자 함수를 상속받는 서브클래스
class Derived extends Base {}

const derived = new Derived(1);
console.log(derived); // Derived {a: 1}
```

`extends` 키워드 다음에는 클래스뿐만이 아니라 `[[Construct]]` 내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있다. 이를 통해 동적으로 상속받을 대상을 결정할 수 있다.

```js
function Base1() {}

class Base2 {}

let condition = true;

// 조건에 따라 동적으로 상속 대상을 결정하는 서브클래스
class Derived extends (condition ? Base1 : Base2) {}

const derived = new Derived();
console.log(derived); // Derived {}

console.log(derived instanceof Base1); // true
console.log(derived instanceof Base2); // false
```

### 서브클래스의 constructor

클래스에서 `constructor` 를 생략하면 클래스의 `constructor` 는 암묵적으로 빈 객체를 정의한다.

```js
constructor() {}
```

서브 클래스에서 `constructor` 를 생략하면 클래스는 다음과 같은 `constructor` 가 암묵적으로 정의된다.

`args`는 `new` 연산자와 함께 클래스를 호출할 때 전달한 인수의 리스트다.

```js
constructor(...args) { super(...args) }
```

### super 키워드

`super` 키워드는 함수처럼 호출할 수도 있고 `this` 와 같이 식별자처럼 참조할 수 있는 특수한 키워드다.

`super` 를 호출하면 수퍼클래스의 `constructor(super-constructor)`를 호출한다.
`super` 를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.

#### super 호출

아래와 같이 수퍼클래스의 `constructor` 내부에서 추가한 프로퍼티를 그재로 갖는 인스턴스를 생성한다면 서버클래스의 `constructor` 를 생략할 수 있다.

이때 `new` 연산자와 함께 서브클래스를 호출하면서 전달한 인수는 모두 서브클래스에 암묵적으로 정의된 `constructor` 의 `super` 호출을 통해 수퍼클래스의 `constructor` 에 전달된다.

```js
// 수퍼클래스
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

// 서브클래스
class Derived extends Base {
  constructor() {
    // 암묵적으로 constructor 생성
    // constructor(...args) { super(...args); }
  }
}

const derived = new Derived(1, 2);
console.log(derived); // Derived {a: 1, b: 2}
```

하지만 수퍼클래스에서 추가한 프로퍼티에서 서브클래스에서 추가한 프로퍼티를 갖는 인스턴스를 생성한다면 서브클랠스의 `constructor` 를 생략할 수 없다.

```js
// 수퍼클래스
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

// 서브클래스
class Derived extends Base {
  constructor(a, b, c) {
    super(a, b);
    this.c = c;
  }
}

const derived = new Derived(1, 2, 3);
console.log(derived); // Derived { a: 1, b: 2, c: 3 }
```

이처럼 인스턴스 초기화를 위해 전달한 인수는 수퍼클래스와 서브클래스에 배분되고 상속 관계의 두 클래스는 서로 협력하여 인스턴스를 생성한다.

`super` 를 호출할 때 주의 사항은 다음과 같다.

1. 서브클래스에서 `constructor` 를 생략하지 않은 경우 서브클래스의 `constructor` 에서는 반드시 `super` 를 호출해야한다.
2. 서브클래스의 `constructor` 에서 `super` 를 호출하기 전에는 `this` 를 참조할 수 없다.
3. `super` 는 반드시 서브클래스의 `constructor` 에서만 호출한다. 서브클래스가 아닌 클래스의 `constructor` 나 함수에서 `super` 를 호출하면 에러가 발생한다.

#### super 참조

**메서드 내에서 `super` 를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.**

서브 클래스의 프로토타입 메서드 내에서 `super.sayHi` 는 수퍼클래스의 프로토타입 메서드 `sayHi` 를 가리킨다.

```js
// 수퍼클래스
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

// 서브클래스
class Derived extends Base {
  sayHi() {
    // super.sayHi는 수퍼클래스의 프로토타입 메서드를 가리킨다.
    return `${super.sayHi()}. how are you doing?`;
  }
}

const derived = new Derived("April");
console.log(derived.sayHi()); // Hi! April. how are you doing?
```

서브클래스의 정적 메서드 내에서 `super.sayHi` 는 수퍼클래스의 정적 메서드 `sayHi` 를 가리킨다.

```js
// 수퍼클래스
class Base {
  static sayHi() {
    return "Hi!";
  }
}

// 서브클래스
class Derived extends Base {
  static sayHi() {
    // super.sayHi는 수퍼클래스의 정적 메서드를 가리킨다.
    return `${super.sayHi()} how are you doing?`;
  }
}

console.log(Derived.sayHi()); // Hi! how are you doing?
```

### 상속 클래스의 인스턴스 생성 과정

상속 관계에 있는 두 클래스가 어떻게 협력하며 인스턴스를 생성하는지 이를 통해 `super` 를 더욱 명확하게 이해하자.

```js
// 수퍼클래스
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  toString() {
    return `width = ${this.width}, height = ${this.height}`;
  }
}

// 서브클래스
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);
    this.color = color;
  }

  // 메서드 오버라이딩
  toString() {
    return super.toString() + `, color = ${this.color}`;
  }
}

const colorRectangle = new ColorRectangle(2, 4, "red");
console.log(colorRectangle); // ColorRectangle {width: 2, height: 4, color: "red"}

// 상속을 통해 getArea 메서드를 호출
console.log(colorRectangle.getArea()); // 8
// 오버라이딩된 toString 메서드를 호출
console.log(colorRectangle.toString()); // width = 2, height = 4, color = red
```

서브클래스 `ColorRectangle` 클래스가 `new` 연산자 호출에 의해 생성된 인스턴스의 프로토타입 체인은 아래와 같다.

![](https://velog.velcdn.com/images/codenmh0822/post/5012f271-29ec-4b0e-ad71-ee232c72ab20/image.png)

#### 서브클래스의 super 호출

자바스크립트 엔진은 클래스를 평가할 때 수퍼클래스와 서브클래스를 구분하기 위해 `base` 또는 `drived` 를 값으로 갖는 내부 슬롯 `[[ConstructorKind]]` 를 갖는다.

다른 클래스를 상속받지 않는 클래스(또는 생성자 함수)는 내부 슬롯 `[[ConstructorKind]]` 의 값이 `base` 로 설정된다.

다른 클래스를 상속받는 클래스(또는 생성자 함수)는 내부 슬롯 `[[ConstructorKind]]` 의 값이 `drived` 로 설정된다.

이를 통해 수퍼클래스와 서브클래스는 `new` 연산자와 함께 호출되었을 때의 동작이 구분된다.

다른 클래스를 상속받지 않는 클래스는 `new` 연산자와 함께 호출 되었을 때 암묵적으로 빈 객체, 즉 인스턴스를 생성하고 이를 `this` 에 바인딩한다.

하지만 **서브클래스는 자신이 직섭 인스턴스를 생성하지 않고 수퍼클래스에게 인스턴스 생성을 위임한다. 이것이 바로 서브클래스의 `constructor` 에서 반드시 `super` 를 호출해야하는 이유이다.**

서브클래스가 `new` 연산자와 함께 호출되면 서브클래스 `constructor` 내부의 `super` 키워드가 함수처럼 호출된다.

`super` 가 호출되면 수퍼클래스의 `constructor` 가 호출된다. 좀 더 정확히 말하자면 수퍼클래스가 평가되어 생성된 함수 객체의 코드가 실행되기 시작한다.

만약 서브클래스 `constructor` 내부에 `super` 호출이 없으면 에러가 발생한다. 실제로 인스턴스를 생성하는 주체는 수퍼클래스이므로 수퍼클래스의 `constructor` 를 호출하는 `super` 가 호출되지 않으면 인스턴스를 생성할 수 없기 때문이다.

#### 수퍼클래스의 인스턴스 생성과 this 바인딩

수퍼클래스의 `constructor` 내부의 코드가 실행되기 이전에 암묵적으로 빈 객체를 생성한다.

이 빈 객체가 최종적으로 클래스가 생성할 인스턴스이다. 그리고 암묵적으로 생성된 빈 객체에 `this` 가 바인딩된다. 따라서 수퍼클래스의 `constructor` 내부의 `this` 는 생성된 인스턴스를 가리킨다.

```js
// 수퍼클래스
class Rectangle {
  constructor(width, height) {
    // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // ColorRectangle {}
    // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
    console.log(new.target); // ColorRectangle

    // ...
  }
}
```

이때 인스턴스는 수퍼클래스가 생성한 것이다. 하지만 `new` 연산자와 함께 호출된 클래스가 서브클래스라는 것이 중요하다.

즉, `new` 연산자와 함께 호출된 함수를 가리키는 `new.target` 은 서브클래스를 가리킨다. 따라서 **인스턴스는 `new.target` 이 가리키는 서브클래스가 생성한 것으로 처리된다.**

따라서 생성된 인스턴스의 프로토타입은 서브클래스의 `prototype` 프로퍼티가 가리키는 객체이다. (ColorRectangle의 프로토타입)

```js
// 수퍼클래스
class Rectangle {
  constructor(width, height) {
    // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // ColorRectangle {}
    // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
    console.log(new.target); // ColorRectangle

    //생성된 인스턴스의 프로토타입으로 ColorRectangle.prototype이 설정된다.
    console.log(Object.getPrototypeOf(this) === ColorRectangle.prototype); // true
    console.log(this instanceof ColorRectangle); // true
    console.log(this instanceof Rectangle); // true

    // ...
  }
}
```

#### 수퍼클래스의 인스턴스 초기화

수퍼클래스의 `constructor` 가 실행되어 `this` 에 바인딩되어 있는 인스턴스를 초기화한다. (서브클래스의 인스턴스)

즉, `this` 에 바인딩 되어 있는 인스턴스에 프로퍼티를 추가하고
`constructor` 가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화한다.

```js
// 수퍼클래스
class Rectangle {
  constructor(width, height) {
    // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // ColorRectangle {}
    // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
    console.log(new.target); // ColorRectangle

    //생성된 인스턴스의 프로토타입으로 ColorRectangle.prototype이 설정된다.
    console.log(Object.getPrototypeOf(this) === ColorRectangle.prototype); // true
    console.log(this instanceof ColorRectangle); // true
    console.log(this instanceof Rectangle); // true

    // 인스턴스 초기화
    this.width = width;
    this.height = height;

    console.log(this); // ColorRectangle {width: 2, height: 4}
  }

  // ...
}
```

#### 서브클래스 constructor로의 복귀와 this 바인딩

`super` 의 호출이 종료되고 제어 흐름이 서브클래스 `constructor` 로 돌아온다.

이때 `super` 가 반환한 인스턴스가 `this` 에 바인딩 된다. 서브클래스는 별도의 인스턴스를 생성하지 않고 `super` 가 반환한 인스턴스 `this` 에 바인딩하여 그대로 사용한다.

```js
// 서브클래스
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);

    // super가 반환한 인스턴스가 this에 바인딩 된다.
    console.log(this); // ColorRectangle {width: 2, height: 4}
  }
  // ...
}
```

**이처럼 `super` 가 호출되지 않으면 인스턴스가 생성되지 않으며, `this` 바인딩도 할 수 없다. 서브 클래스의 `constructor` 에서 `super` 를 호출하기 전에 `this` 를 참조할 수 없는 이유가 바로 이 때문이다.**

따라서 서브클래스 `constructor` 내부의 인스턴스 초기화는 반드시 `super` 호출 이후에 처리되어야 한다.

#### 서브클래스의 인스턴스 초기화와 인스턴스 반환

`super` 호출 이후, 서브 클래스의 `constructor` 에 기술되어 있는 인스턴스 초기화가 실행된다.

즉, `this` 에 바인딩되어있는 인스턴스에 프로퍼티를 추가하고 `constructor` 가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화한다.

클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 `this` 가 암묵적으로 반환된다.

```js
// 서브클래스
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);

    // super가 반환한 인스턴스가 this에 바인딩 된다.
    console.log(this); // ColorRectangle {width: 2, height: 4}

    // 인스턴스 초기화
    this.color = color;

    // 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
    console.log(this); // ColorRectangle {width: 2, height: 4, color: "red"}
  }
  // ...
}
```

### 표준 빌트인 생성자 함수 확장

`extends` 키워드 다음에는 클래스뿐만이 아니라 `[[Construct]]` 내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있다.

`String`, `Number`, `Array` 같은 표준 빌트인 객체 또한 `[[Construct]]` 내부 메서드를 갖는 생성자 함수이므로 `extends` 키워드를 사용하여 확장할 수 있다.
