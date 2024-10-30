## 내부 슬롯과 내부 메서드

내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사 메서드이다.

ECMAScript 사양에서 등장하는 이중 대괄호`([[...]])`로 감싼 이름들이 내부 슬롯과 내부 메서드이다.

![](https://velog.velcdn.com/images/codenmh0822/post/ab031498-cf88-4acd-a8e3-15fb0218f209/image.png)

내부 슬롯과 내부 메서드는 자바스크립트 엔진의 내부 로직이므로 원칙적으로 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않는다.

단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.

```js
const o = {};

// 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접 접근할 수 없다.
o.[[Protytype]]; // -> Uncaught SyntaxError: Unexpected token '['

// 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.
o.__proto__;
```

## 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

**자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.**

프로퍼티의 상태란 `프로퍼티의 값(value)`, `값의 갱신 기능 여부(writable)`, `열거 가능 여부(enumerable)`, `재정의 가능 여부(configuration)`를 말한다.

프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 상태 값인 내부 슬롯이다.

- `[[Value]]`
- `[[Writable]]`
- `[[Enumerable]]`
- `[[Configurable]]`

따라서 프로퍼티 어트리뷰트에 직접 접근할 수 없지만 `Object.getOwnPropertyDescriptor` 메서드를 사용하여 간접적으로 확인할 수는 있다.

```js
const person = {
  name: "hoon",
};

class Person {
  constructor() {
    this.category = "human";
  }
}

class Amy extends Person {
  constructor() {
    super();
    this.name = "amy";
  }
}

const amy = new Amy();

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
console.log(Object.getOwnPropertyDescriptor(amy, "name"));
// { value: 'amy', writable: true, enumerable: true, configurable: true }

console.log(Object.getOwnPropertyDescriptors(amy));
/**
{
  category: {
    value: 'human',
    writable: true,
    enumerable: true,
    configurable: true
  },
  name: {
    value: 'amy',
    writable: true,
    enumerable: true,
    configurable: true
  }
}
*/
```

`Object.getOwnPropertyDescriptor` 메서드는 하나의 프로퍼티에 대한 프로퍼티 어트리뷰트 정보를 제공하는 **프로퍼티 디스크립터 객체**를 반환한다.

ES8에서 도입된 `Object.getOwnPropertyDescriptors` 메서드는 객체의 모든 프로퍼티에 대한 프로퍼티 어트리뷰트 정보를 제공하는 **프로퍼티 디스크립터 객체들을 제공한다.**

## 데이터 프로퍼티와 접근자 프로퍼티

프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분할 수 있다.

### 데이터 프로퍼티

키와 값으로 구성된 일반적인 프로퍼티다.

![](https://velog.velcdn.com/images/codenmh0822/post/ed64c61f-e0b8-4769-abac-d5a894ebadd1/image.png)

```js
const person = {
  name: "hoon",
};

person.age = 14;

console.log(Object.getOwnPropertyDescriptor(person));
/*
  { value: 'hoon', writable: true, enumerable: true, configurable: true },
  { value: 14, writable: true, enumerable: true, configurable: true }
*/
```

`Object.getOwnPropertyDescriptor` 메서드가 반환한 프로퍼티 디스크립터 객체를 살펴보면 각각의 프로퍼티 키는 `[[Value]]`, `[[Writable]]`, `[[Enumerable]]`, `[[Configurable]]`의 프로퍼티 어트리뷰트를 가리키며 값을 보여준다.

이처럼 프로퍼티가 생성될 때 `[[Value]]`의 값은 프로퍼티 값으로 초기화되며 나머지 어트리뷰트들의 값은 `true`를 기본값으로 초기화된다. 이것은 프로퍼티를 동적 추가해도 마찬가지다.

### 접근자 프로퍼티

자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티다.

![](https://velog.velcdn.com/images/codenmh0822/post/21307793-180c-4200-8d4f-960ff5893bf9/image.png)

![](https://velog.velcdn.com/images/codenmh0822/post/f599d7d8-e300-40b4-b84c-8413f44c17b8/image.png)

접근자 함수는 `getter/setter` 함수라고도 부른다. 접근자 프로퍼티는 `getter`와 `setter` 함수를 모두 정의할 수 도 있고 하나만 정의할 수도 있다.

```js
const person = {
  // 데이터 프로퍼티
  firstName: "Myeonghoon",
  lastName: "Nam",

  // 접근자 함수로 구성된 접근자 프로퍼티
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  // 접근자 함수로 구성된 접근자 프로퍼티
  // setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  },
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(person.firstName + " " + person.lastName); // Myeonghoon Nam

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티에 값을 저장하면 setter 함수 호출
person.fullName = "Heegun Lee";

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티를 참조하면 getter 함수 호출
console.log(person.fullName); // Heegun Lee

let descriptor;

// 데이터 프로퍼티의 프로퍼티 디스크립터 객체
descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log(descriptor);
// {value: 'Heegun', writable: true, enumerable: true, configurable: true}

// 접근자 프로퍼티의 프로퍼티 디스크립터 객체
descriptor = Object.getOwnPropertyDescriptor(person, "fullName");
console.log(descriptor);
// {get: [Function: get fullName], set: [Function: set fullName], enumerable: true, configurable: true}
```

접근자 프로퍼티는 자체적으로 값(프로퍼티 어트리뷰트 `[[Value]]`)을 가지지 않으며 다만 데이터 프로퍼티의 값을 읽거나 저장할 때 관여할 뿐이다.

## 프로퍼티 정의

프로퍼티 정의란 **새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것을 말한다.**

`Object.defineProperty` 메서드를 사용하면 프로퍼티의 어티리뷰트를 정의할 수 있다.

```js
const person = {};

// 데이터 프로퍼티 정의
Object.defineProperty(person, "firstName", {
  value: "Myeonghoon",
  writable: true,
  enumerable: true,
  configurable: true,
});

// 데이터 프로퍼티 정의
Object.defineProperty(person, "lastName", {
  value: "Nam",
});

let descriptor;

descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log(descriptor);
// {value: 'Myeonghoon', writable: true, enumerable: true, configurable: true}

// 프로퍼티 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
descriptor = Object.getOwnPropertyDescriptor(person, "lastName");
console.log(descriptor);
// {value: 'Nam', writable: false, enumerable: false, configurable: false}

Object.defineProperty(person, "fullName", {
  // getter
  get() {
    return `${this.firstName} ${this.lastName}`;
  },

  // setter
  set(name) {
    [this.firstName, this.lastName] = name.split(" ");
  },

  enumerable: true,
  configurable: true,
});

descriptor = Object.getOwnPropertyDescriptor(person, "fullName");
console.log(descriptor);
// {get: [Function: get], set: [Function: set], enumerable: true, configurable: true}
```

`Object.definedProperties` 메서드를 사용하면 여러 개의 프로퍼티를 한 번에 정의할 수 있다.

```js
const person = {};

Object.defineProperties(person, {
  firstName: {
    value: "Myeonghoon",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  lastName: {
    value: "Nam",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  fullName: {
    get() {
      return `${this.firstName} ${this.lastName}`;
    },

    set(name) {
      [this.firstName, this.lastName] = name.split(" ");
    },
    enumerable: true,
    configurable: true,
  },
});

person.fullName = "Myounghoon Nam";
console.log(person);
// { firstName: 'Myounghoon', lastName: 'Nam', fullName: [Getter/Setter] }
```

## 객체 변경 방지

객체는 변경 가능한 값이므로 재할당 없이 직접 변경할 수 있다.

- 프로퍼티 추가/삭제
- 프로퍼티 값 갱신
- 프로퍼티 어트리뷰트 재정의

자바스크립트는 객체의 변경을 방지하는 다양한 메서드를 제공하며, 객체의 변경을 금지하는 강도가 다르다.

![](https://velog.velcdn.com/images/codenmh0822/post/c2fa69e3-8430-4ed1-bdc8-1fb3c2eb3597/image.png)

### 객체 확장 금지

`Object.preventExtensions` 메서드는 객체의 확장을 금지한다. **확장이 금지된 객체는 프로퍼티 추가가 금지된다.**

확장 가능 여부는 `Object.isExtensible` 메서드로 확인할 수 있다.

```js
const person = { name: "Lee" };

console.log(Object.isExtensible(person)); // true

Object.preventExtensions(person);

console.log(Object.isExtensible(person)); // false

// 확장이 금지된 객체에 프로퍼티 추가시 무시, strict mode는 에러 발생
person.age = 20;
console.log(person); // { name: 'Lee' }

// 프로퍼티 삭제는 가능
delete person.name;
console.log(person); // {}

// TypeError: Cannot define property name, object is not extensible
Object.defineProperty(person, "name", {
  value: "Lee",
});
```

### 객체 밀봉

`Object.seal` 메서드를 통해 객체를 밀봉한다. 객체 밀봉이란 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지를 의미한다. **밀봉된 객체는 읽기와 쓰기만 가능하다.**

```js
const person = { name: "Lee" };

console.log(Object.isSealed(person)); // false

Object.seal(person);

console.log(Object.isSealed(person)); // true

// 밀봉된 객체는 configurable 어트리뷰트가 false이다.
console.log(Object.getOwnPropertyDescriptors(person));
/**
{
  name: {
    value: 'Lee',
    writable: true,
    enumerable: true,
    configurable: false
  }
}
*/

// 프로퍼티 추가 금지
person.age = 20;

// 프로퍼티 삭제 금지
delete person.name;

// 프로퍼티 값 갱신은 가능
person.name = "Nam";

console.log(person); // { name: 'Nam' }

// 프로퍼티 재정의 금지
// TypeError: Cannot redefine property: name
Object.defineProperty(person, "name", {
  configurable: true,
});
```

### 객체 동결

`Object.freeze` 메서드는 객체를 동결한다. 프로퍼티 추가 및 삭제, 프로퍼티 어트리뷰트 재정의, 프로퍼티 값 갱신을 금지한다.

즉, **동결된 객체는 읽기만 가능하다.**

```js
const person = { name: "Lee" };

console.log(Object.isFrozen(person)); // false

Object.freeze(person);

console.log(Object.isFrozen(person)); // true

// 동결된 객체는 writable, configurable 어트리뷰트가 false이다.
console.log(Object.getOwnPropertyDescriptors(person));
/**
{
  name: {
    value: 'Lee',
    writable: false,
    enumerable: true,
    configurable: false
  }
}
*/

// 프로퍼티 추가 금지
person.age = 20;

// 프로퍼티 삭제 금지
delete person.name;

// 프로퍼티 값 갱신 금지
// 무시, strict 모드는 에러
person.name = "Nam";

console.log(person); // { name: 'Lee' }

// 프로퍼티 재정의 금지
// TypeError: Cannot redefine property: name
Object.defineProperty(person, "name", {
  configurable: true,
});
```

### 불변 객체

지금까지 살펴본 변경 방지 메서드들은 얕은 변경 방지로 직속 프로퍼티만 병경이 방지되고 중첩 객체까지는 영향을 주지 못한다. 즉, `Object.freeze` 메서드로 객체를 동결하여도 중첩 객체까지 동결할 수 없다.

```js
const person = {
  name: "Lee",
  address: {
    city: "Seoul",
  },
};

Object.freeze(person);

console.log(Object.isFrozen(person)); // true
console.log(Object.isFrozen(person.address)); // false

person.name = "Nam";
person.address.city = "Busan";

// 직속 프로퍼티는 동결되어 값의 변경이 불가능하다.
// 중첩된 객체는 동결되지 않아 값이 변경가능하다.
console.log(person); // { name: 'Lee', address: { city: 'Busan' } }
```

객체의 중첩 객체까지 동결하여 변경이 불가능한 읽기 전용의 불변 객체를 구현하려면 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적 동결이 가능해야한다.

```js
function deepFreeze(target) {
  if (target && typeof target === "object" && !Object.isFrozen(target)) {
    Object.freeze(target);
    Object.keys(target).forEach((key) => deepFreeze(target[key]));
  }

  return target;
}

const person = {
  name: "Lee",
  address: {
    city: "Seoul",
  },
};

deepFreeze(person);

console.log(Object.isFrozen(person)); // true
console.log(Object.isFrozen(person.address)); // true

person.name = "Nam";
person.address.city = "Busan";

// 직속 프로퍼티는 동결되어 값의 변경이 불가능하다.
// 중첩된 객체 프로퍼티 역시 동결되어 값이 변경 불가능능하다.
console.log(person); // { name: 'Lee', address: { city: 'Seoul' } }
```
