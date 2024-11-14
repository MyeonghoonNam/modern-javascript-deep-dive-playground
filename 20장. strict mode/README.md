## strict mode란 ?

```js
function foo() {
  x = 10;
}
foo();

console.log(x); // 10
```

위 코드를 봤을 때 전역 스코프에도 x변수의 선언이 존재하지 않기 때문에 `referenceError`를 발생시킬 것 같지만 자바스크립트 엔진은 암묵적으로 전역 객체에 `x` 프로퍼티를 동적 생성한다.

이때 전역 객체의 `x` 프로퍼티는 마치 전역변수처럼 사용할 수 있다. 이러한 현상을 [암묵적 전역](https://velog.io/@codenmh0822/%EC%95%94%EB%AC%B5%EC%A0%81-%EC%A0%84%EC%97%AD)이라한다.

암묵적 전역은 오류를 발생시키는 원인이 될 가능성이 크다. 따라서 `let`, `const` 키워드를 사용하여 변수를 사용하면 보다 안전하지만, 실수가 발생할 수 있기때문에 **strict mode**(엄격 모드)를 사용한다.

**strict mode**(엄격모드)는 **자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적 에러를 발생시킨다.**

ESLint 같은 린트 도구를 사용하면 strict mode가 제한하는 오류는 물론 코딩 컨벤션을 설정 파일 형태로 정의하고 강제할 수 있기에 더욱 강력한 효과를 얻을 수 있다.

> ESLint
> **strict mode**와 유사한 효과를 얻을 수 있는 린트 도구로 린트 도구는 정적 분석 기능을 통해 소스코드를 실행하기 전에 소스코드를 스캔하여 문법적 오류만이 아니라 잠재적 오류까지 찾아내고 오류의 원인을 리포팅해주는 유용한 도구다.

ES6에서 도입된 클래스와 모듈은 기본적으로 strict mode가 적용된다.

## strict mode의 적용

strict mode를 적용하려면 전역의 선두 또는 함수 몸체의 선두에 `use strict;`를 추가한다. 전역의 선두에 추가하면 스크립트 전체에 strict mode가 적용된다.

```js
// 전역의 선두에서 사용하여 스크립트 전체에 적용
"use strict";

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

```js
function foo() {
  // 함수의 선두에서 사용하면 함수와, 중첩함수들에 적용된다.
  "use strict";

  x = 10; // ReferenceError: x is not defined
}
foo();
```

```js
function foo() {
  // 코드의 선두에 위치하지 않으면 엄격 모드가 제대로 적용되지 않는다.
  x = 10; // 에러가 발생하지 않는다.
  ("use strict");
}
foo();
```

## 전역에 strict mode를 적용하는 것은 피하자

외부 서드파티 라이브러리를 사용하는 경우 라이브러리가 non-strict mode인 경우도 있기 때문에 전역에 strict mode를 적용하는 것은 바람직하지 않다.

이러한 경우 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용한다.

```js
//즉시 실행 함수의 선두에 strict mode 적용
(function () {
  "use strict";

  //Do something...
})();
```

## 함수 단위로 strict mode를 적용하는 것도 피하자

어떤 함수는 적용하고 어떤함수는 적용하지 않는것도 바람직하지 않고 일일이 strict mode를 적용하는 것도 번거로운 일이다.

그리고, strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 문제가 발생할 수 있다.

따라서 **strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.**

```js
(function () {
  // non-strict mode
  x = 10; // 에러가 발생하지 않는다.

  function foo() {
    "use strict";

    let = 20; // Unexpected strict mode reserved word
  }

  foo();
})();
```

## strict mode가 발생시키는 에러

대표적으로 아래와 같은 에러 사례가 있다.

### 암묵적 전역

선언하지 않은 변수를 참조하면 `ReferenceError`가 발생한다.

```js
(function () {
  "use strict";

  x = 1;
  console.log(x); // ReferenceError: x is not defined
})();
```

### 변수, 함수, 매개변수의 삭제

`delete` 연산자로 변수, 함수, 매개변수를 삭제하면 `SyntaxError`가 발생한다.

```js
(function () {
  "use strict";

  var x = 1;
  delete x;
  // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a;
    // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo;
  // SyntaxError: Delete of an unqualified identifier in strict mode.
})();
```

### 매개변수 이름의 중복

중복된 매개변수 이름을 사용하면 `SyntaxError`가 발생한다.

```js
(function () {
  "use strict";

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
})();
```

### with 문의 사용

`with`문을 사용하면 `SyntaxError`가 발생한다. `with`문은 성능과 가족성이 나빠지는 문제가 있으므로 사용하지 않는 것이 좋다.

```js
(function () {
  "use strict";

  // SyntaxError: Strict mode code may not include a with statement
  with ({ x: 1 }) {
    console.log(x);
  }
})();
```

## strict mode 적용에 의한 변화

### 일반 함수의 this

strict mode에서 함수를 일반 함수로서 호출하면 `this`에 `undefiend`가 바인딩된다.

생성자 함수가 아닌 일반 함수 내부에서는 `this`를 사용할 필요가 없기 때문이다. 이때 에러는 발생하지 않는다.

```js
(function () {
  "use strict";

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
})();
```

### argument 객체

strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 `argument`객체에 반영되지 않는다.

```js
(function (a) {
  "use strict";
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
})(1);
```
