## 자바스크립트 객체의 분류

자바스크립트 객체는 다음과 같이 크게 3개의 객체로 분류할 수 있다.

**표준 빌트인 객체**
표준 빌트인 객체는 ECMAScript 사양에 정의된 객체이므로 자바스크립트 실행 환경(브라우저나 node.js)과 관계없이 언제나 사용할 수 있다.

표준 빌트인 객체는 전역 객체의 프로퍼티로서 제공된다. 따라서 별도의 선언 없이 전역 변수처럼 언제나 참조할 수 있다.

**호스트 객체**
호스트 객체는 ECMAScript 사양에 정의되어 있어 있지 않지만 자바스크립트 실행환경에서 추가로 제공하는 객체를 말한다.

브라우저 환경에서는 클라이언트 사이드 Web API를 호스트로 제공하고, Node.js환경에서는 Node.js 고유의 API 호스트 객체로 제공한다.

**사용자 정의 객체**
사용자 정의 객체는 기본 제공되는 객체가 아닌 사용자가 직접 정의한 객체를 말한다.

## 표준 빌트인 객체

자바스크립트는 40여 개의 표준 빌트인 객체를 제공한다.

여기서 `Math`, `Reflect`, `JSON`을 제외한 표준 빌트인 객체는 **모두 인스턴스를 생성할 수 있는 생성자 함수 객체다.**

**생성자 함수 객체인 표준 빌트인 객체**는 **프로토타입 메서드와 정적 메서드**를 제공하고 **생성자 함수 객체가 아닌 표준 빌트인 객체**(`Math`, `Reflect`, `JSON`)는 **정적 메서드**만 제공한다.

```js
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String("Lee"); // String {"Lee"}
console.log(typeof strObj); // object

// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(123); // Number {123}
console.log(typeof numObj); // object

// Boolean 생성자 함수에 의한 Boolean 객체 생성
const boolObj = new Boolean(true); // Boolean {true}
console.log(typeof boolObj); // object

// Function 생성자 함수에 의한 Function 객체(함수) 생성
const func = new Function("x", "return x * x"); // ƒ anonymous(x )
console.log(typeof func); // function

// Array 생성자 함수에 의한 Array 객체(배열) 생성
const arr = new Array(1, 2, 3); // (3) [1, 2, 3]
console.log(typeof arr); // object

// RegExp 생성자 함수에 의한 RegExp 객체(정규 표현식) 생성
const regExp = new RegExp(/ab+c/i); // /ab+c/i
console.log(typeof regExp); // object

// Date 생성자 함수에 의한 Date 객체 생성
const date = new Date(); // Fri May 08 2020 10:43:25 GMT+0900 (대한민국 표준시)
console.log(typeof date); // object
```

생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체 `prototype` 프로퍼티에 바인딩된 객체이다. (생성자 함수로 동작하는 객체이므로)

```js
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String("Lee"); // String {"Lee"}

// String 생성자 함수를 통해 생성한 strObj 객체의 프로토타입은 String.prototype이다.
console.log(Object.getPrototypeOf(strObj) === String.prototype); // true
```

다양한 기능의 빌트인 프로토타입 메서드와 인스턴스 없이도 호출이 가능한 빌트인 정적 메서드를 사용할 수 있다.

```js
// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(1.5); // Number {1.5}

// toFixed는 Number.prototype의 프로토타입 메서드다.
// Number.prototype.toFixed는 소수점 자리를 반올림하여 문자열로 반환한다.
console.log(numObj.toFixed()); // 2

// isInteger는 Number의 정적 메서드다.
// Number.isInteger는 인수가 정수(integer)인지 검사하여 그 결과를 Boolean으로 반환한다.
console.log(Number.isInteger(0.5)); // false
```

## 원시값과 래퍼 객체

문자열, 숫자, 불리언과 같은 원시값을 객체처럼 사용하면 **자바스크립트 엔진은 암묵적으로 연관된 객체를 생성한 후, 프로퍼티에 접근하거나 메서드를 호출하고, 다시 원시값으로 되돌린다.**

이처럼 **문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시객체를 래퍼 객체**라고 한다.

```js
const str = "hi";

// 원시 타입인 문자열이 래퍼 객체인 String 인스턴스로 변환된다.
console.log(str.length); // 2
console.log(str.toUpperCase()); // HI

// 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후, 다시 원시값으로 되돌린다.
console.log(typeof str); // string
```

위 코드를 실행하면 문자열 원시값에 마침표 표기법으로 접근하는 순간 래퍼 객체인 `String` 생성자 함수의 인스턴스가 생성되고 문자열은 래퍼 객체의 `[[StringData]]` 내부의 슬롯에 할당된다.

이때 문자열 래퍼 객체는 인스턴스로서 `String.prototype`의 메서드를 상속받아 사용할 수 있는 것이다.

![](https://velog.velcdn.com/images/codenmh0822/post/3ad1c952-da0a-408e-b273-77695479b10b/image.png)

위 과정을 걸쳐 래퍼 객체의 처리가 종료되면 래퍼 객체의 `[[StringData]]` 내부 슬롯에 할당된 원시값으로 **식별자에 값을 원래 상태를 되돌리고 래퍼 객체는 가비지 컬렉션의 대상이 된다.**

```js
// ① 식별자 str은 문자열을 값으로 가지고 있다.
const str = "hello";

// ② 식별자 str은 암묵적으로 생성된 래퍼 객체를 가리킨다.
// 식별자 str의 값 'hello'는 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된다.
// 래퍼 객체에 name 프로퍼티가 동적 추가된다.
str.name = "Lee";

// ③ 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
// 이때 ②에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.

// ④ 식별자 str은 새롭게 암묵적으로 생성된(②에서 생성된 래퍼 객체와는 다른) 래퍼 객체를 가리킨다.
// 새롭게 생성된 래퍼 객체에는 name 프로퍼티가 존재하지 않는다.
console.log(str.name); // undefined

// ⑤ 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
// 이때 ④에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.
console.log(typeof str, str); // string hello
```

ES6에서 도입된 심벌도 래퍼 객체를 생성하나 일반적인 원시값과 달리 리터럴 표기법으로 생성할 수없고 `Symbol` 함수를 통해 생성해야 하므로 다른 원시값과 차이가 있다.

문자열, 숫자, 불리언, 심벌은 암묵적으로 생성되는 래퍼 객체에 의해 마치 객체처럼 사용할 수 있으며, 표준 빌트인 객체인 `String`, `Number`, `Boolean`, `Symbol`의 프로토타입 메서드 또는 프로퍼티를 참조할 수 있다.

그렇기에 `String`, `Number`, `Boolean` 생성자 함수를 `new` 연산자와 함께 호출하여 문자열, 숫자, 불리언 인스턴스를 생성할 필요가 없으며 권장하지 않는 것이다.

`null`, `undefined` 원시값은 래퍼 객체를 생성하지 않아 `null`과 `undefined` 값을 객체처럼 사용하면 에러가 발생한다.

## 전역 객체

전역 객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체로 어떤 객체에도 속하지 않은 최상위 객체이다.

프로토타입 상속 관계상에서 최상위 객체라는 의미가 아니고 어떤 객체의 프로퍼티도 아니며 계층적 구조상 표준 빌트인 객체와 호스트 객체를 프로퍼티로 소유한다는 의미이다.

전역 객체는 브라우저 환경에서는 window(또는 slef, this, frames)가 전역 객체를 가리키지만, Node.js 환경에서는 global이 전역 객체를 가리킨다.

> **globalThis**
> ECMAScript(ES11)에서 도입된 globalThis는 브라우저 환경과 Node.js 환경에서 전역 객체를 가리키던 다양한 식별자를 통일한 식별자다.(표준사양)
>
> ```js
> // 브라우저 환경
> globalThis === this; // true
> globalThis === window; // true
> globalThis === self; // true
> globalThis === frames; // true
>
> // Node.js 환경 (12.0.0 이상)
> globalThis === this; // true
> globalThis === global; // true
> ```

전역 객체의 특징은 다음과 같다.

- 전역 객체는 개발자가 의도적으로 생성할 수 없다. 즉, 전역 객체를 생성할 수 있는 생성자 함수가 제공되지 않는다.
- 전역 객체의 프로퍼티를 참조할 떄 window(또는 global)를 생략할 수 있다.
- 전역 객체는 모든 표준 빌트인 객체를 프로퍼티로 가지고 있다.
- 자바스크립트 실행환경에 따라 추가적으로 프로퍼티와 메서드를 갖는다.(호스트 객체)
  var 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당한 암묵적 전역.(브라우저와 nodejs의 동작 방식이 다름에 주의)
- let이나 const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. let이나 const 키워드로 선언한 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드)내에 존재하게 되며 브라우저 환경의 모든 자바스크립트 코드는 하나의 전역 객체 window를 공유한다.

### 빌트인 전역 프로퍼티

전역 객체의 프로퍼티를 의미한다. 주로 애플리케이션 전역에서 사용하는 값을 제공한다.

#### Infinity

`Infinity` 프로퍼티는 무한대를 나타내는 숫자값 `Infinity`를 갖는다.

```js
// 전역 프로퍼티는 window를 생략하고 참조할 수 있다.
console.log(window.Infinity === Infinity); // true

// 양의 무한대
console.log(3 / 0); // Infinity
// 음의 무한대
console.log(-3 / 0); // -Infinity
// Infinity는 숫자값이다.
console.log(typeof Infinity); // number
```

#### NaN

`NaN` 프로퍼티는 숫자가 아님을 나타내는 숫자값 `NaN`을 갖는다.

```js
console.log(window.NaN); // NaN

console.log(Number("xyz")); // NaN
console.log(1 * "string"); // NaN
console.log(typeof NaN); // number
```

#### undefined

`undefined` 프로퍼티는 원시 타입 `undefined` 를 값으로 갖는다.

```js
console.log(window.undefined); // undefined

var foo;
console.log(foo); // undefined
console.log(typeof undefined); // undefined
```

### 빌트인 전역 함수

빌트인 전역 함수는 애플리케이션 전역에서 호출할 수 있는 빌트인 함수로서 전역 객체의 메서드다.

#### eval

`eval` 함수는 자바스크립트 코드를 나타내는 문자열을 인수로 전달받는다.

코드가 표현식이라면 코드를 런타임에 평가하여 값을 생성하고, 표현식이 아닌 문이라면 코드를 런타임에 실행한다.(문자열 코드가 여러 개의 문이라면 모든 문을 실행)

`eval` 함수는 보안에 취약하며 이를 통해 실행되는 코드는 자바스크립트 엔진에 의해 최적화가 수행되지 않으므로 일반적인 코드에 비해 속도처리가 느리다. 따라서 `eval` 함수의 사용은 지양해야한다.

```js
// 표현식인 문
eval("1 + 2;"); // → 3
// 표현식이 아닌 문
eval("var x = 5;"); // → undefined

// eval 함수에 의해 런타임에 변수 선언문이 실행되어 x 변수가 선언되었다.
console.log(x); // 5

// 객체 리터럴은 반드시 괄호로 둘러싼다.
const o = eval("({ a: 1 })");
console.log(o); // {a: 1}

// 함수 리터럴은 반드시 괄호로 둘러싼다.
const f = eval("(function() { return 1; })");
console.log(f()); // 1
```

#### isFinite

전달받은 인수가 정상적인 유한수인지 검사하여 유한수이면 `true`, 무한수이면 `false`를 반환한다.

전달받은 인수의 타입이 숫자가 아닌 경우, 숫자로 타인을 변환한 후 검사를 수행한다. 이때 인수가 `NaN`으로 평가되는 값이면 `false`를 반환한다.

```js
// 인수가 유한수이면 true를 반환한다.
isFinite(0); // → true
isFinite(2e64); // → true
isFinite("10"); // → true: '10' -> 10
isFinite(null); // → true: null -> 0

// 인수가 무한수 또는 NaN으로 평가되는 값이라면 false를 반환한다.
isFinite(Infinity); // → false
isFinite(-Infinity); // → false

// 인수가 NaN으로 평가되는 값이라면 false를 반환한다.
isFinite(NaN); // → false
isFinite("Hello"); // → false
isFinite("2005/12/12"); // → false
```

#### isNaN

전달받은 인수가 `NaN`인지 검사하여 그 결과를 불리언 타입으로 반환한다. 전달받은 인수의 타입이 숫자가 아닌 경우 숫자로 타입을 변환한 후 검사를 수행한다.

```js
// 숫자
isNaN(NaN); // → true
isNaN(10); // → false

// 문자열
isNaN("blabla"); // → true: 'blabla' -> NaN
isNaN("10"); // → false: '10' -> 10
isNaN("10.12"); // → false: '10.12' -> 10.12
isNaN(""); // → false: '' -> 0
isNaN(" "); // → false: ' ' -> 0

// 불리언
isNaN(true); // → false: true → 1
isNaN(null); // → false: null → 0

// undefined
isNaN(undefined); // → true: undefined ➔ NaN

// 객체
isNaN({}); // → true: {} ➔ NaN

// date
isNaN(new Date()); // → false: new Date() ➔ Number
isNaN(new Date().toString()); // → true:  String ➔ NaN
```

#### parseFloat

전달받은 문자열 인수를 부동 소수점 숫자, 즉 실수로 해석하여 반환한다.

문자열이 아니라면 문자열로 변환한 다음 실수로 해석한다.

```js
// 문자열을 실수로 해석하여 반환한다.
parseFloat("3.14"); // → 3.14
parseFloat("10.00"); // → 10

// 공백으로 구분된 문자열은 첫 번째 문자열만 변환한다.
parseFloat("34 45 66"); // → 34
parseFloat("40 years"); // → 40

// 첫 번째 문자열을 숫자로 변환할 수 없다면 NaN을 반환한다.
parseFloat("He was 40"); // → NaN

// 앞뒤 공백은 무시된다.
parseFloat(" 60 "); // → 60
```

#### parseInt

전달받은 문자열 인수를 정수로 해석하여 반환한다. 문자열이 아니라면 문자열로 변환한 다음 정수로 해석한다.

두번째 인수로 진법을 나타내는 기수(2~36)를 전달할 수 있다. 이때 반환값은 언제나 10진수이다.

```js
// 문자열을 정수로 해석하여 반환한다.
parseInt("10"); // → 10
parseInt("10.123"); // → 10

// 10'을 10진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt("10"); // → 10
// '10'을 2진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt("10", 2); // → 2
// '10'을 8진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt("10", 8); // → 8
// '10'을 16진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt("10", 16); // → 16
```

#### encodeURI / decodeURI

`encodeURI` 함수는 완전한 `URI`를 문자열로 전달받아 이스케이프 처리를 위해 인코딩한다.

`decodeURI` 함수는 인코딩된 `URI`를 인수로 전달받아 이스케이프처리 이전으로 디코딩한다.

인코딩이란 `URI`의 문자들을 이스케이프 처리하는 것을 의미하는데, 이스케이프 처리는 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자 셋으로 변환하는 과정을 말한다. 자연스럽게 디코딩은 인코딩의 반대과정을 말한다.

`URI`는 인터넷에 있는 자원을 나타내는 유일한 주소를 말한다. `URI` 하위개념으로 `URL`, `URN`이 있다.

![](https://velog.velcdn.com/images/codenmh0822/post/3b9b1796-cfe8-478b-91fe-7a5e8b3eb17a/image.png)

```js
// 완전한 URI
const uri = "http://example.com?name=이웅모&job=programmer&teacher";

// encodeURI 함수는 완전한 URI를 전달받아 이스케이프 처리를 위해 인코딩한다.
const enc = encodeURI(uri);
console.log(enc);
// http://example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher

// decodeURI 함수는 인코딩된 완전한 URI를 전달받아 이스케이프 처리 이전으로 디코딩한다.
const dec = decodeURI(enc);
console.log(dec);
// http://example.com?name=이웅모&job=programmer&teacher
```

#### encodeURIComponent / decodeURIComponent

`encodeURIComponent` 함수는 URI 구성 요소를 인수로 전달받아 인코딩한다.

`decodeURIComponent` 함수는 매개변수로 전달된 URI 구성요소를 디코딩한다.

```js
// URI의 쿼리 스트링
const uriComp = "name=이웅모&job=programmer&teacher";

// encodeURIComponent 함수는 인수로 전달받은 문자열을 URI의 구성요소인 쿼리 스트링의 일부로 간주한다.
// 따라서 쿼리 스트링 구분자로 사용되는 =, ?, &까지 인코딩한다.
let enc = encodeURIComponent(uriComp);
console.log(enc);
// name%3D%EC%9D%B4%EC%9B%85%EB%AA%A8%26job%3Dprogrammer%26teacher

let dec = decodeURIComponent(enc);
console.log(dec);
// 이웅모&job=programmer&teacher

// encodeURI 함수는 인수로 전달받은 문자열을 완전한 URI로 간주한다.
// 따라서 쿼리 스트링 구분자로 사용되는 =, ?, &를 인코딩하지 않는다.
enc = encodeURI(uriComp);
console.log(enc);
// name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher

dec = decodeURI(enc);
console.log(dec);
// name=이웅모&job=programmer&teacher
```

#### 암묵적 전역

선언하지 않은 식별자는 전역 객체의 프로퍼티가 되어 마치 전역 변수처럼 동작한다. 이러한 현상을 암묵적 전역이라한다.

선언 없이 단지 전역 객체의 프로퍼티로 추가되었을 뿐. 변수는 아니다. 그러므로 호이스팅이 발생하지 않는다.

```js
// window 기준
// 전역 변수 x는 호이스팅이 발생한다.
console.log(x); // undefined
// 전역 변수가 아니라 단지 전역 객체의 프로퍼티인 y는 호이스팅이 발생하지 않는다.
console.log(y); // ReferenceError: y is not defined

var x = 10; // 전역 변수

function foo() {
  // 선언하지 않은 식별자에 값을 할당
  y = 20; // window.y = 20;
}

foo();

// 선언하지 않은 식별자 y를 전역에서 참조할 수 있다.
console.log(x + y); // 30

delete x; // 전역 변수는 삭제되지 않는다.
delete y; // 프로퍼티는 삭제된다.

console.log(window.x); // 10
console.log(window.y); // undefined
```
