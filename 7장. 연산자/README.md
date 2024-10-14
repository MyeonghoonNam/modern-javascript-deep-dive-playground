연산자(operator)는 하나 이상의 표현식을 대상으로 `산술, 할당, 비교, 논리, 타입, 지수 연산 등을 수행해 하나의 값을 만든다.`

이 때 연산의 대상을 `피연산자(operand)`라 한다.

피연산자는 값으로 평가될 수 있는 표현식이어야 한다. 피연산자와 연산자의 조합으로 이뤄진 연산자 표현식도 값으로 평가될 수 있는 표현식이다.

`피연산자가 값이라는 명사의 역할`을 한다면 `피연산자를 연산하여 새로운 값을 만드는 동사의 역할을 연산자가 수행한다.`

즉, 피연산자는 연산의 대상이 되어야 하므로 값으로 평가할 수 있어야 하며 연산자는 값으로 평가된 피연산자를 연산하여 새로운 값을 만든다.

## 산술 연산자

산술 연산자는 `피연산자를 대상으로 수학적 계산을 수행해 새로운 숫자 값을 만든다.`
산술 연산이 불가능한 경우 `NaN`을 반환한다.

산술 연산자는 피연산자의 개수에 따라 이항 산술 연산자와 단항 산술 연산자로 구분한다.

### 이항 산술 연산자

이항(binary) 산술 연산자는 2개의 피연산자를 산술 연산하여 숫자 값을 만든다.

모든 이항 산술 연산자는 피연산자의 값을 변경하는 `부수 효과(side effect)`가 없다.

> 부수 효과(side effect) ? </br>
> 어떠한 주체에 의해 외부의 상태를 변경하거나 참조하지 말아야하며, 멱등성(실행 횟수에 상관없이 항상 동일한 결과를 도출하는 성질)을 완벽히 지원하는 현상

<table style="text-align: center">
  <thead >
    <tr>
      <th>이항 산술 연산자</th>
      <th>의미</th>
      <th>부수 효과</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>+</td>
      <td>덧셈</td>
      <td>X</td>
    </tr>
    <tr>
      <td>-</td>
      <td>뺄셈</td>
      <td>X</td>
    </tr>
    <tr>
      <td>*</td>
      <td>곱셈</td>
      <td>X</td>
    </tr>
    <tr>
      <td>/</td>
      <td>나눗셈</td>
      <td>X</td>
    </tr>
    <tr>
      <td>%</td>
      <td>나머지</td>
      <td>X</td>
    </tr>
  </tbody>
</table>

위 연산자들은 활용한 연산은 아래와 같이 공통적으로 피연산자 그 자체의 값을 변경하는 부수효과가 없다.

```js
1 + 2; // 3, 새로운 값을 생성하였지만 피연산자인 1과 2의 그 자체 값은 변경되지 않는다.
```

### 단항 산술 연산자

단항(unary) 산술 연산자는 1개의 피연산자를 산술 연산하여 숫자 값을 만든다.

<table style="text-align: center">
  <thead >
    <tr>
      <th>단항 산술 연산자</th>
      <th>의미</th>
      <th>부수 효과</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>++</td>
      <td>증가</td>
      <td>O</td>
    </tr>
    <tr>
      <td>--</td>
      <td>감소</td>
      <td>O</td>
    </tr>
    <tr>
      <td>+</td>
      <td>어떠한 효과도 없다. 음수를 양수로 반전하지도 않는다.</td>
      <td>X</td>
    </tr>
    <tr>
      <td>-</td>
      <td>양수를 음수로, 음수를 양수로 반전한 값을 반환한다.</td>
      <td>X</td>
    </tr>
  </tbody>
</table>

`증가/감소(++/--) 연산자는 피연산자의 값을 변경하는 부수 효과가 있다.` 피연산자의 값을 변경하는 암묵적 할당이 이뤄진다.

```js
var x = 1;

x++; // 2, x = x + 1의 암묵적 할당이 이뤄진다.
x--; // 1, x = x - 1의 암묵적 할당이 이뤄진다.
```

증가/감소 연산은 위치에 따라 의미가 달라진다.

- 피연산자 앞에 위치한 전위 증가/감소 연산자(prefix increment/decrement operator)는 먼저 피연산자의 값을 증가/감소시킨 후, 할당이 이뤄진다.
- 피연산자 뒤에 위치한 후위 증가/감소 연산자(postifx increment/decrement operator)는 선 할당 후 증가/감소 연산을 수행한다.

```js
var x = 5,
  result;

// 선할당 후증가 (후위 증가 연산자)
result = x++; // result = 5, x = 6

// 선증가 후할당 (전위 증가 연산자)
result = ++x; // result = 7, x = 7

// 선할당 후감소 (후위 감소 연산자)
result = x--; // result = 7, x = 6

// 선감소 후할당 (전위 감소 연산자)
result = --x; // result = 5, x = 5
```

`+` 단항 연산자는 `숫자 타입이 아닌 피연산자에 사용하면 피연산자를 숫자 타입으로 변환하여 반환한다.` 이 때 `피연산자를 변경하는 것은 아니고 숫자 타입으로 변환한 값을 생성해서 반환`하기에 부수효과는 없다.

NaN이 아닌 숫자 타입으로 변환이 가능한 타입의 경우만 산술 연산에 활용이 가능하다.

```js
var x = "1";

console.log(typeof +x); // number
console.log(+x); // 1
console.log(typeof x); // string
console.log(x); // 1

x = true;
console.log(typeof +x); // number
console.log(+x); // 1
console.log(x); // true

x = false;
console.log(typeof +x); // number
console.log(+x); // 0
console.log(x); // false

x = "Hello";
console.log(typeof +x); // number
console.log(+x); // Nan
console.log(x); // Hello
```

`-`단항 연산자는 피연산자의 부호를 반전한 값을 반환한다. `+`단항 연산자와 마찬가지로 숫자 타입이 아닌 피연산자에 사용하면 피연산자를 숫자 타입으로 변환하여 반환한다. 이때 `피연산자를 변경하는 것은 아니고 부호를 반전한 값을 생성해 반환한다.` 따라서 부수 효과는 없다.

```js
var x = "1";

console.log(typeof -x); // number
console.log(-x); // -1
console.log(typeof x); // string
console.log(x); // 1

x = true;
console.log(typeof -x); // number
console.log(-x); // -1
console.log(x); // true

x = false;
console.log(typeof -x); // number
console.log(-x); // -0
console.log(x); // false

x = "Hello";
console.log(typeof -x); // number
console.log(-x); // Nan
console.log(x); // Hello
```

### 문자열 연결 연산자

`+` 이항 산술 연산자는 `피연산자 중 하나 이상이 문자열인 경우에는 문자열 연결 연산자로 동작한다.` 그 외의 경우는 산술 연산자로 동작한다.

```js
// 문자열 연결 연산자로 동작
var x = "1" + 1;

console.log(x); // 11
console.log(typeof x); // string

// 산술 연산자
console.log(1 + 2); // 3

// true는 1로 타입 변환
console.log(1 + true); // 2

// false는 0으로 타입 변환
console.log(1 + false); // 1

// null은 0으로 타입 변환
console.log(1 + null); // 1

// undefined는 숫자로 타입 변환되지 않는다.
console.log(+undefined); // NaN
console.log(1 + undefined); // NaN
```

위 코드에서 주목할 것은 개발자의 의도와는 상관없이 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되기도 한다는 것이다.

이를 `암묵적 타입 변환(implicit coercion)` 또는 `타입 강제 변환(type coercion)`이라고 한다.

## 할당 연산자

할당 연산자(assignment operator)는 우항에 있는 피연산자의 평가 결과를 좌항에 있는 변수에 할당한다. 할당 연산자는 좌항의 변수에 값을 할당하므로 변수 값이 변하는 부수 효과가 있다.

<table style="text-align: center">
  <thead >
    <tr>
      <th>할당 연산자</th>
      <th>예</th>
      <th>동일표현</th>
      <th>부수효과</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>=</td>
      <td>x = 5</td>
      <td>x = 5</td>
      <td>O</td>
    </tr>
    <tr>
      <td>+=</td>
      <td>x += 5</td>
      <td>x = x + 5</td>
      <td>O</td>
    </tr>
    <tr>
      <td>-=</td>
      <td>x -= 5</td>
      <td>x = x - 5</td>
      <td>O</td>
    </tr>
    <tr>
      <td>*=</td>
      <td>x *= 5</td>
      <td>x = x * 5</td>
      <td>O</td>
    </tr>
    <tr>
      <td>/=</td>
      <td>x /= 5</td>
      <td>x = x / 5</td>
      <td>O</td>
    </tr>
    <tr>
      <td>%=</td>
      <td>x %= 5</td>
      <td>x = x % 5</td>
      <td>O</td>
    </tr>
  </tbody>
</table>

표현식은 값으로 평가될 수 있는 문이다. 여기서 할당문은 표현식인 문에 해당한다.

```js
var x;

// 할당문이 10이라는 값으로 평가되었기에 표현식인 문에 해당한다.
console.log((x = 10)); // 10
console.log(x); // 10
```

할당문은 변수에 값을 할당하는 부수 효과만 있을 뿐 값으로 평가되지 않으 것처럼 보이지만 `할당문은 값으로 평가되는 표현식인 문으로서 할당된 값으로 평가된다.`

이러한 특징을 활용하여 아래와 같이 여러 변수에 동일한 값을 연쇄 할당할 수 있다.

```js
var a, b, c;

// 연쇄 할당을 통해 오른쪽에서 왼쪽으로 할당
// 1) c = 0: 0으로 평가된다.
// 2) b = 0: 0으로 평가된다.
// 3) a = 0: 0으로 평가된다.
a = b = c = 0;

console.log(a, b, c); // 0, 0, 0
```

## 비교 연산자

비교 연산자(comparison)는 좌항과 우항의 피연산자를 비교한 다음 그 결과를 불리언 값으로 반환한다. if문이나 for문과 같은 제어문의 조건식에서 주로 사용한다.

### 동등/일치 비교 연산자

<table style="text-align: center">
  <thead >
    <tr>
      <th>비교 연산자</th>
      <th>의미</th>
      <th>사례</th>
      <th>설명</th>
      <th>부수 효과</th>
    </tr>
  </thead>
  <tbody >
    <tr>
      <td>==</td>
      <td>동등 비교</td>
      <td>x == y</td>
      <td>x와 y의 값이 같음</td>
      <td>X</td>
    </tr>
    <tr>
      <td>===</td>
      <td>일치 비교</td>
      <td>x === y</td>
      <td>x와 y의 값과 타입이 같음</td>
      <td>X</td>
    </tr>
    <tr>
      <td>!=</td>
      <td>부동등 비교</td>
      <td>x != y</td>
      <td>x와 y의 값이 다름</td>
      <td>X</td>
    </tr>
    <tr>
      <td>!==</td>
      <td>불일치 비교</td>
      <td>x !== y</td>
      <td>x와 y의 값과 타입이 다름</td>
      <td>X</td>
    </tr>
  </tbody>
</table>

`동등 비교(==) 연산자는 좌항과 우항의 피연산자를 비교할 때 먼저 암묵적 타입 변환을 통해 타입을 일치시킨 후 같은 값인지 비교한다.`

즉, 피연산자들의 타입이 다르더라도 암묵적 타입 변환 후에 값으로서 비교 연산 결과를 반환한다.

```js
5 == 5; // true
5 == "5"; // true
```

이러한 동등 비교 연산의 동작 원리에 의해 예측하기 어려운 결과를 만들어 낼 수 있다. 그래서 동등 비교 연산보단 일치 비교 연산을 통해 보다 가시적인 코드를 작성할 수 있다.

`일치 비교(===) 연산자는 좌항과 우항의 피연산자의 값과 타입이 모두 일치하는지에 대한 여부에 따라 결과를 반환한다.`

```js
5 === 5; // true
5 === "5"; // false
```

일치 비교 연산에서 주의할 경우는 바로 `NaN` 숫자 타입이다. `NaN`은 자신과 일치하지 않는 유일한 값으로 동작한다.

```js
NaN === NaN; // false
```

추가로 자바스크립트 숫자 0의 경우 `양의 0`과 `음의 0`이 있는데 이들의 경우 일치/동등 비교 연산에서 모두 `true`를 반환한다.

```js
0 == -0; // true
0 === -0; // true
```

위와 같이 예측이 어렵게 동작하는 경우에 대해서 `Object.is` 메서드를 사용하면 보다 예측 가능한 비교 결과를 얻을 수 있다.

```js
console.log(-0 === +0); // true
console.log(Object.is(-0, +0)); // false
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true
```

부동등/불일치(`!=`/`!==`) 비교 연산자는 각각 동등 비교/동등 일치 연산자와의 반대 개념으로 동작한다.

## 논리 연산자

<table style="text-align: center">
  <thead>
    <tr>
      <th>논리 연산자</th>
      <th>의미</th>
      <th>부수 효과</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>||</td>
      <td>논리합(OR)</td>
      <td>X</td>
    </tr>
    <tr>
      <td>&&</td>
      <td>논리곱(AND)</td>
      <td>X</td>
    </tr>
    <tr>
      <td>!</td>
      <td>부정(NOT)</td>
      <td>X</td>
    </tr>
  </tbody>
</table>

논리 부정(!) 연산자는 항상 불리언 값을 반환한다. 피연산자가 반드시 불리언 값일 필요는 없으며 이때 불리언 타입으로 암묵적 타입 변환이 일어난다.

```js
!0; // true
!"Hello"; // false
```

논리합(||) 또는 논리곱(&&) 연산자 표현식의 평가 결과는 불리언 값이 아닐 수도 있다. `언제나 2개의 피연산자 중 어느 한쪽으로 평가되는 원리`를 이해하자.

```js
"Cat" && "Dog"; // Dog
```

## 쉼표 연산자

쉼표(,) 연산자는 왼쪽 피연산자부터 차례대로 피연산자를 평가하고 마지막 피연산자의 평가가 끝나면 마지막 피연산자의 평가 결과를 반환한다.

```
var x, y, z;
console.log((x = 1, y = 2, z = 3)); // 3
```

## typeof 연산자

`typeof 연산자는 피연산자의 데이터 타입을 문자열로 반환한다.` 아래의 7가지 문자열 중 하나를 반환한다.

- "string"
- "number"
- "boolean"
- "undefined"
- "symbol"
- "object"
- "function"

여기서 데이터 타입 중 `null` 타입에 해당하는 문자열 `"null"`을 반환하는 경우는 없으며, 함수의 경우 `"function"`을 반환한다.

이처럼 typeof 연산자가 반환하는 문자열 결과는 7개(6개의 원시타입과 1개의 객체타입)의 데이터 타입과 정확히 일치하지는 않는다.

```js
console.log(typeof ""); // string
console.log(typeof 1); // number
console.log(typeof NaN); // number
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof Symbol()); // symbol
console.log(typeof null); // object
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof new Date()); // object
console.log(typeof /test/gi); // object
console.log(typeof function () {}); // function
```

`null` 타입을 체크하는 경우 `typeof` 연산자가 아닌 `일치 연산자(===)`를 사용하자.

```js
var foo = null;

typeof foo === null; // false
foo === null; // true
```

선언하지 않은 식별자를 `typeof` 연산자로 연산해 보면 `ReferenceError`를 발생하지 않고 `undefined`를 반환하므로 주의하자.

```js
// 선언하지 않은 식별자 undeclared
typeof undeclared; // undefined
```
