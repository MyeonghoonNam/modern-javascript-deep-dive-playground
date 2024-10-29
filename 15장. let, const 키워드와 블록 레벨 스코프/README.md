## var 키워드로 선언한 변수의 문제점

ES5까지 변수를 선언할 수 있는 유일한 방법은 var 키워드를 사용하는 것이었다.

### 변수 중복 선언 허용

```js
var x = 1;
var y = 1;

// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 초기화문이 있는 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
var x = 100; // x = 100 처럼 동작

// 초기화문이 없는 변수 선언문은 무시된다.
var y;

console.log(x); // 100
console.log(y); // 1
```

위 과정에서 에러는 발생하지 않는다, 동일한 이름의 변수가 존재하는지 모르고 중복 선언한다면 의도치 않게 값이 변경되는 부작용이 발생한다.

### 함수 레벨 스코프

var 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다. 따라서 함수 외부에서 var 키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 된다.

```js
var x = 1;

if (true) {
  var x = 10;
}

console.log(x); // 10

var i = 10;

for (var i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}

console.log(i); // 10
```

함수 레벨 스코프는 전역 변수를 남발할 가능성을 매우 높여 부작용이 발생할 수 있다.

### 변수 호이스팅

```js
// 변수 호이스팅에 의해 이미 foo 변수가 선언되었다. (1. 선언 단계)
// 변수 foo는 undefined로 초기화된다. (2. 초기화 단계)
console.log(foo); // undefined

// 변수에 값을 할당한다.(3. 할당 단계)
foo = 123;

console.log(foo); // 123

// 변수 선언은 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 실행된다.
var foo;
```

변수 선언문 이전에 변수를 참조하는 것은 변수 호이스팅에 의해 에러를 발생시키지는 않지만 프로그램의 흐름상 맞지 않을뿐더러 가독성을 떨어뜨리고 오류를 발생시킬 여지를 남긴다.

## let 키워드

var 키워드의 단점을 보완하기 위해 ES6에서는 새로운 변수 선언 키워드인 let과 const를 도입했다.

### 변수 중복 선언 금지

```js
var foo = 123;
var foo = 456;
let bar = 123;
let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
```

let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.

### 블록 레벨 스코프

var 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정하는 함수 레벨 스코프지만 **let 키워드로 선언한 변수는 모든 코드 블록을 지역스코프로 인정하는 블록 레벨 스코프를 따른다.**

```js
let foo = 1; // 전역

{
  let foo = 2; // 지역
  let bar = 3; // 지역
}

console.log(foo); // 1
console.log(bar); // ReferenceError
```

![](https://velog.velcdn.com/images/codenmh0822/post/47f71c3e-5e5f-4177-931b-30342d811302/image.png)

### 변수 호이스팅

`let` 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 동작한다.

```js
console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
let foo;
```

변수 선언문 이전에 참조하면 참조 에러가 발생한다.

`var` 키워드로 선언한 변수는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 **선언 단계**와 **초기화 단계**가 한번에 진행된다.

선언 단계에서 스코프(실행 컨텍스트의 렉시컬 환경)에 변수 식별자를 등록해 자바스크립트 엔진에 변수의 존재를 알린다. 그리고 즉시 초기화 단계에서 undefined로 변수를 초기화한다.

그렇기에 변수 선언문 이전에 변수에 접근해도 스코프에 변수가 존재하기 때문에 에러가 발생하지 않고, 변수 할당문에 의해 값이 할당된다.

![](https://velog.velcdn.com/images/codenmh0822/post/7bae3831-72fa-423f-af02-f254365bf9a4/image.png)

이와 달리 `let` 키워드로 선언한 변수는 **선언 단계와 초기화 단계가 분리되어 진행된다.**

즉, 런타임 이전에 선언 단계가 먼저 실행되지만 초기화 단계는 변수 선언문에 도달했을 때 실행된다.

그렇기에 초기화 단계 실행 이전에 변수에 접근하면 참조 에러가 발생한다. 스코프의 시작 지점부터 초기화 단계 시작 지점(변수 선언문)까지 변수를 참조할 수 없다.

여기서 스코프의 시작 지점부터 초기화 시작 지점까지 변수를 참조할 수 없는 구간을 **일시적 사각지대(Temporal Dead Zone: TDZ)라고 부른다.**

```js
// 런타임 이전에 선언 단계는 실행되지만 초기화 단계는 실행되지 않았다.
// 초기화 이전에 일시적 사각지대에서는 변수를 참조할 수 없다.
console.log(foo); // ReferenceError: Cannot access 'foo' before initialization

let foo; // 변수 선언문에서 초기화 단계가 실행된다.
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1
```

![](https://velog.velcdn.com/images/codenmh0822/post/c77330f6-9906-468e-b5f1-8ba4db46ac1f/image.png)

```js
let foo = 10; // 전역 변수

{
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  let foo = 20; // 지역 변수
}
```

`let` 키워드는 호이스팅이 동작하지 않아 보이지만 그렇지 않다. 호이스팅이 발생하지 않는다면 위 코드는 전역 변수 foo의 값을 출력해야 한다. 하지만 여전히 호이스팅이 발생하기에 참조 에러가 발생한다.

자바스크립트는 ES6에서 도입된 **let, const를 포함해서 모든 선언(var, let, const, function, function\*, class 등)을 호이스팅한다.**

다만 **let, const, class**를 사용한 선언문은 호이스팅이 발생하지 않는 것처럼 동작한다.

### 전역 객체와 let

var 키워드로 선언한 변수와 식별자 없이 선언하지 않은 변수에 값을 할당한 암묵적 전역은 전역 객체 window의 프로퍼티가 된다. 전역 객체의 프로퍼티를 참조할 때 window 접근자를 생략할 수 있다.

하지만 `let` 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니라, 전역 렉시컬 환경의 선언적 환경 레코드에 프로퍼티로 관리가 되는데 이는 실행 컨텍스트에 대해 내용을 자세히 다루자.

```js
// 브라우저 환경
let x = 1;

// let, const 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다.
console.log(window.x); // undefined
console.log(x); // 1
```

## const 키워드

const 키워드는 상수를 선언하기 위해 사용한다. 하지만 반드시 상수만을 위해 사용하지는 않는다.

### 선언과 초기화

**const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다.**

`let` 키워드와 마찬가지로 블록 레벨 스코프를 가지며, 변수 호이스팅이 발생하지 않는 것처럼 동작한다.

```js
{
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  const foo = 1;
  console.log(foo); // 1
}

console.log(foo); // ReferenceError
```

### 재할당 금지

`var` 또는 `let` 키워드로 선언한 변수는 재할당이 자유로우나 **const 키워드로 선언한 변수는 재할당이 금지된다.**

### 상수

`const` 키워드로 선언한 변수에 원시값을 할당할 경우 변수값을 변경할 수 없고, 재할당을 금지하므로 이러한 특징을 이용해 `const` 키워드를 **상수를 표현하는 데 사용하기도 한다.**

**상수는 재할당이 금지된 변수르 말한다.**

상수는 **상태유지와 가동성, 유지보수의 편의를 위해 적극적으로 사용해야한다.**

일반적으로 **상수의 이름은 대문자로 선언**해 상수임을 명확히 나타낸다. 여러 단어로 이뤄진 경우에는 `언더스코어(_)`로 구분해서 \**스케이크 케이스*로 표현하는 것이 일반적이다.

```js
const TAX_RATE = 0.1;
let preTaxPrice = 100;
let afterTaxPrice = preTaxPrice + preTaxPrice * TAX_RATE;

console.log(afterTaxPrice); //110
```

### const 키워드와 객체

`const` 키워드로 선언된 변수에 객체를 할당한 경우 값을 변경할 수 있다. **변경 가능한 값인 객체는 재할당 없이도 직접 변경이 가능하기 때문이다.**

```js
const person = {
  name: "Lee",
};

person.name = "kim";
console.log(person); // {name: "Kim"}
```

`const` 키워드는 재할당을 금지할 뿐 **불변**을 의미하지 않는다.

다시말해 새로운 값을 재할당하는 것은 불가능하지만 프로퍼티 동적 생성, 삭제, 프로퍼티 값의 변경을 통해 객체를 변경하는 것은 가능하다. 객체의 프로퍼티가 변경되어도 변수에 할당된 객체의 참조 값은 변경되지 않기에 가능한 일이다.

## var vs let vs const

변수를 선언할 때는 기본적으로 `const` 키워드를 사용하고, `let` 키워드는 **재할당이 필요한 경우에 한정해 사용하는 것이 좋다.**

- ES6를 사용한다면 `var` 키워드를 사용하지 않는다.
- 재할당이 필요한 경우에 한정해 `let` 키워드를 사용한다. 이때 변수의 스코프는 최대한 좁게 만든다.
- 변경이 발생하지 않고 읽기 전용으로 사용하는(재할당이 필요 없는 상수) 원시 값과 객체에는 `const` 키워드를 사용한다.

`const` 키워드는 재할당을 금지하므로 `var`, `let` 키워드보다 안전하다.
