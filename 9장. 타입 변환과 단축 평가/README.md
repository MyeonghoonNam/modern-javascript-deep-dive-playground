## 타입 변환이란 ?

개발자가 의도적으로 값의 타입을 변환하는 것을 `명시적 타입 변환(explicit coercion)` 또는 `타입 캐스팅(type casting)`이라 한다.

자바스크립트에서는 개발자의 의도와는 상관없이 표현식을 평가하는 도중에 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되기도 한다. 이를 `암묵적 타입 변환(implicit coercion)` 또는 `타입 강제 변환(type coercion)`이라 한다.

```js
var x = 10;

// 명시적 타입 변환
// 숫자를 문자열로 타입 캐스팅한다.
var str1 = x.toString();

// 암묵적 타입 변환
// 문자열 연결 연산자는 숫자 타입 x의 값을 바탕으로 새로운 문자열을 생성한다.
var str2 = x + "";
```

명시적, 암묵적 타입 변환이 기존 원시 값을 직접 변경하는 것은 아니다. `원시 값은 변경 불가능한 값이므로 변경할 수 없다.` `타입 변환이란 기존 원시 값을 사용해 다른 타입의 새로운 원시 값을 생성하는 것이다.`

즉, 암묵적 타입 변환은 기존 변수 값을 재할당하여 변경하는 것이 아니다.

타입 변환의 동작을 바르게 이해해야 코드의 예측이 가능하며 암묵적 타입 변환의 가독성 측면의 장점을 활용하는 것이 중요하다.

중요한 것은 코드를 예측할 수 있어야 한다는 것이다.

## 암묵적 타입 변환

자바스크립트 엔진은 표현식을 평가할 때 개발자의 의도와는 상관없이 코드의 문맥을 고려해 암묵적으로 데이터 타입을 강제 변환할 때가 있다.

프로그래밍 언어에 따라 표현식을 평가할 때 타입이 다르면 에러를 발생시키기도 하지만 자바스크립트는 가급적 에러를 발생시키지 않도록 암묵적 타입 변환을 통해 표현식을 평가한다.

### 문자열 타입으로 변환

자바스크립트 엔진은 문자열 연산자 표현식을 평가하기 위해 문자열 연결 연산자의 피연산자 중에서 문자열 타입이 아닌 피연산자를 문자열 타입으로 암묵적 타입 변환한다.

연산자 표현식의 피연산자(피연산자는 표현식)만이 암묵적 타입 변환의 대상이 되는 것은 아니다.

코드 문맥에 부합하도록 암묵적 타입 변환을 실행한다. ES6에서 도입된 템플릿 리터럴의 표현식 삽입은 표현식의 평가 결과를 문자열 타입으로 암묵적으로 타입 변환한다.

```js
1 +
  "2" // "12"
  `1 + 1 = ${1 + 1}`; // "1 + 1 = 2"
```

자바스크립트 엔진은 문자열 타입 아닌 값을 문자열 타입으로 암묵적 타이 변환을 수행할 때 다음과 같이 동작한다.

```js
// 숫자 타입
0 + ''		// "0"
-0 + ''		// "0"
1 + ''		// "1"
-1 + ''		// "-1"
NaN + ''	// "NaN"
Infinity + ''	// "Infinity"

// 불리언 타입
true + ''	// "true"
false + '' // "false"

// null 타입
null + ''	// "null"

// undefined 타입
undefined + ''  // "undefined"

// 심벌 타입
(Symbol()) + '' // TypeError: Cannot convert a Symbol value to a string

// 객체 타입
({}) + ''		// "[object Object]"
Math + ''		// "[object Math]"
[] + ''			// ""
[10, 20] + ''	// "10, 20"
(function(){}) + ''	// "function(){}"
Array + ''		// "function Array() { [native code] }"
```

### 숫자 타입으로 변환

`+` 산술 연산자를 제외하고 다른 모든 산술 연산자는 숫자타입이 아닌 피연산자를 숫자타입으로 암묵적 타입 변환한다.

숫자 타입으로 변환이 불가능한 경우 `NaN`을 반환한다.

```js
1 - "1"; // 0
1 * "10"; // 10
1 / "one"; // NaN
```

`비교 연산자`는 피연산자의 크기를 비교하므로 모든 피연산자는 코드 문맥상 모두 숫자 타입이어야하기 때문에 숫자타입으로 암묵적 타입 변환을 한다.

```js
"1" > 0; // true
```

`+ 단항 연산자`는 피연산자가 숫자 타입의 값이 아니면 숫자 타입의 값으로 암묵적 타입 변환을 수행한다.

```js
// 문자열 타입
+""; // 0
+"0"; // 0
+"1"; // 1
+"string"; // NaN

// 불리언 타입
+true; // 1
+false; // 0

// null 타입
+null; // 0

// undefined 타입
+undefined; // NaN

// 심벌 타입
+Symbol(); // TypeError: Cannot convert a Symbol value to a number

// 객체 타입
+{}; // NaN
+[]; // 0
+[10, 20]; // NaN
+function () {}; // NaN
```

객체, 빈 배열이 아닌 배열, undefined는 변환되지 않아 NaN이 된다는 것에 주의하자.

### 불리언 타입으로 변환

제어문 또는 삼항 조건 연산자의 조건식은 불리언 값으로 평가되어야하기 때문에 `자바스크립트 엔진은 조건식의 평가 결과를 불리언 타입으로 암묵적 타입 변환한다.`

불리언 타입이 아닌 값을 `Truthy값(true)` 또는 `Falsy값(false)`으로 구분한다.

아래는 자바스크립트에서 Falsy값에 해당하는 값들로 이들을 제외한 나머지 값은 모두 Truthy 값이다.

```js
false
undefined
null
0, -0
NaN
''(빈 문자열)
```

Truthy/Falsy값을 판별하는 함수로 부정 연산자를 활용할 수 있다.

```js
// 전달받은 인수가 Falsy 값이면 true 반환, Truthy 값이면 false를 반환한다.
function isFalsy(x) {
  return !x;
}
// 전달받은 인수가 Truthy 값이면 true, Falsy 값이면 false를 반환한다.
function isTruthy(x) {
  return !!x;
}

// 모두 true를 반환한다.
isFalsy(undefined);
isFalsy(null);
isFalsy(0);

// 모두 true를 반환한다.
isTruthy("0"); // 빈 문자열이 아닌 문자열은 Truthy 값이다.
isTruthy({});
isTruthy([]);
```

## 명시적 타입 변환

개발자 의도에 따라 명시적으로 타입을 변경하는 방법은 다양하다.

- 표준 빌트인 생성자 함수(String, Number, Boolean)를 new 연산자 없이 호출하는 방법
- 빌트인 메서드 사용하는 방법
- 암묵적 타입 변환을 이용하는 방법

### 문자열 타입으로 변환

- `String` 생성자 함수를 `new 연산자` 없이 호출하는 방법

```js
// 숫자 타입 => 문자열 타입
String(1); // "1"
String(NaN); // "NaN"
String(Infinity); // "Infinity"

// 불리언 타입 => 문자열 타입
String(true); // "true"
String(false); // "false"
```

- `Object.prototype.toString` 메서드를 사용하는 방법

```js
// 숫자 타입 => 문자열 타입
(1).toString();         // "1"
(NaN).toString();       // "NaN"
(Infinity)toString();   // "Infinity"

// 불리언 타입 => 문자열 타입
(true).toString();      // "true"
(false).toString();     // "false"
```

- 문자열 연결 연산자를 이용하는 방법

```js
// 숫자 타입 => 문자열 타입
1 + ""; // "1"
NaN + ""; //  "NaN"
Infinity + ""; // "Infinity"

// 불리언 타입 => 문자열 타입
true + ""; // "true"
false + ""; // "false"
```

### 숫자 타입으로 변환

- `Number` 생성자 함수를 `new 연산자` 없이 호출하는 방법

```js
// 문자열 타입 => 숫자 타입
Number("0"); // 0
Number("-1"); // -1
Number("10.53"); // 10.53

// 불리언 타입 => 숫자 타입
Number(true); // 1
Number(false); // 0
```

- `parseInt`, `parseFloat` 함수를 사용하는 방법

`문자열`만 `숫자 타입`으로 변환가능하다.

```js
parseInt("0"); // 0
parseInt("-1"); // -1
parseFloat("10.53"); // 10.53
```

- `+` 단항 산술 연산자를 이용하는 방법

```js
// 문자열 타입 => 숫자 타입
+"0"; // 0
+"-1"; // -1
+"10.53"; // 10.53

// 불리언 타입 => 숫자 타입
+true; // 1
+false; // 0
```

- 산술 연산자를 이용하는 방법

```js
// 문자열 타입 => 숫자 타입
"0" * 1; // 0
"-1" * 1; // -1
"10.53" * 1; // 10.53

// 불리언 타입 => 숫자 타입
true * 1; // 1
false * 1; // 0
```

### 불리언 타입으로 변환

- `Boolean` 생성자 함수를 `new` 연산자 없이 호출하는 방법

```js
// 문자열 타입 => 불리언 타입
Boolean("x"); // true
Boolean(""); // false
Boolean("false"); // true

// 숫자 타입 => 불리언 타입
Boolean(0); // false
Boolean(1); // true
Boolean(NaN); // false
Boolean(Infinity); // true

// null 타입 => 불리언 타입
Boolean(null); // false

// undefined 타입 => 불리언 타입
Boolean(undefined); // false

// 객체 타입 => 불리언 타입
Boolean({}); // true
Boolean([]); // true
```

- `!` 부정 논리 연산자를 두 번 사용하는 방법

```js
// 문자열 타입 => 불리언 타입
!!"x"; // true
!!""; // false
!!"false"; // true

// 숫자 타입 => 불리언 타입
!!0; // false
!!1; // true
!!NaN; // false
!!Infinity; // true

// null 타입 => 불리언 타입
!!null; // false

// undefined 타입 => 불리언 타입
!!undefined; // false

// 객체 타입 => 불리언 타입
!!{}; // true
!![]; // true
```

## 단축 평가

### 논리 연산자를 사용한 단축 평가

표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하고, `논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환하는 동작 방식`을 `단축 평가(short-circuit evaluation)`라 한다.

```js
"cat" || "dog"; // cat
false || "dog"; // dog
"cat" || false; // cat

"cat" && "dog"; // dog
false && "dog"; // false
"cat" && false; // false
```

단축 평가를 사용하여 if문을 대체할 수 있다.

- Truthy 값을 조건으로 한다면 논리곱(&&) 연산
- Falsy 값을 조건으로 한다면 논리합(||) 연산

```js
var done = true;
var message = "";

if (done) message = "완료";
message = done && "완료"; // 위 if문과 동일하게 동작
```

```js
var done = false;
var message = "";

if (!done) message = "미완료";
message = done || "미완료"; // 위 if문과 동일하게 동작
```

객체를 가리키기를 기대하는 변수가 `null` 또는 `undefined`가 아닌지 확인하고 프로퍼티를 참조할 때

1. elem이 null이나 undefined와 같은 Falsy 값이면 elem으로 평가되고
2. elem이 Truthy 값이면 elem.value로 평가된다.

```js
var elem = null;
var value2 = elem && elem.value; // null
```

함수 매개변수에 기본값을 설정할 때

1. 함수를 호출할 때 인수를 전달하지 않으면 매개변수에는 undefined가 할당된다.
2. 이때 단축평가를 사용해 undefined로 인해 발생할 수 있는 에러를 방지할 수 있다.

```js
// 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength1(str) {
  str = str || "";
  return str.length;
}

// ES6의 매개변수의 기본값 설정으로도 해결 가능
function getStringLength2(str = "") {
  return str.length;
}
```

### 옵셔널 체이닝

`ES11(ECMAScript2020)`에서 도입된 기능이다.

옵셔널 체이닝 연산자 `?.`는 `좌항의 피연산자`가 `null` 또는 `undefined`인 경우 `undefined`를 반환하고, 그렇지 않으면 `우항의 프로퍼티`를 참조한다.

```js
var elem = null;

// elem이 null 또는 undefined이면 undefined를 반환, 그렇지 않으면 우항의 프로퍼티를 참조
var value = elem?.value;
console.log(value); // undefined
```

### null 병합 연산자

`ES11(ECMAScript2020)`에서 도입된 기능이다.

null 병합 연산자 `??`는 `좌항의 피연산자`가 `null` 또는 `undefiend`인 경우 `우항의 피연산자를 반환`하고, 그렇지 않으면 `좌항의 피연산자를 반환`한다.

변수의 기본값 설정할 때 유용하다.

```js
var foo = null ?? "default string";
console.log(foo); // "default string"
```
