## 정규 표현식이란?

정규 표현식은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어이다.

정규 표현식은 문자열을 대상으로 **패턴 매칭 기능**을 제공한다. 패턴 매칭 기능이란 특정 패턴과 일치하는 문자열을 검색하거나 추출 또는 치환할 수 있는 기능을 말한다.

정규 표현식을 사용하면 반복문과 조건문 없이 패턴을 정의하고 테스트하는 것으로 간단히 체크할 수 있다. 하지만 주석이나 공백을 허용하지 않고 여러 가지 기호를 혼합하여 사용하기 때문에 가독성이 좋지않다는 문제가 있다.

## 정규 표현식의 생성

정규 표현식 객체(RegExp)를 생성하기 위해서는 정규 표현식 리터럴 또는 RegExp 생성자 함수를 사용한다.

![](https://velog.velcdn.com/images/codenmh0822/post/020686ee-868f-43e7-8360-d98dd07d8fde/image.png)

이처럼 정규 표현식 리터럴은 **패턴과 플래그로 구성된다.**

```js
const target = "Is this all there is?";

// 정규 표현식 리터럴
// 패턴: is
// 플래그: i => 대소문자를 구별하지 않고 검색한다.
const regexp = /is/i;

// test 메서드는 대상 문자열과 정규 표현식의 패턴을 검사하여 일치하는 패턴이 있으면 true, 없으면 false를 반환한다.
regexp.test(target); // true

// RegExp 생성자
const regExp = new RegExp(/is/i);

regExp.test(target);
```

## RegExp 메서드

### RegExp.prototype.exec

**exec** 메서드는 인수롤 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환한다. 매칭 결과가 없는 경우 **null** 을 반환한다.

```js
const target = "Is this all there is?";
const regexp = /is/i;

regexp.exec(target);
// [ 'Is', index: 0, input: 'Is this all there is?', groups: undefined ]
```

exec 메서드는 문자열 내의 모든 패턴을 검색하는 g 플래그를 지정해도 첫 번째 매칭 결과만 반환하므로 주의해야한다.

### RegExp.prototype.test

**test** 메서드는 인수로 전달받은 문자열에 대해 정규표현식의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.

```js
const target = "Is this all there is?";
const regexp = /is/i;

regexp.test(target); // true
```

### String.prototype.match

**String** 표준 빌트인 객체가 제공하는 **match** 메서드는 대상 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환한다.

```js
const target = "Is this all there is?";
const regExp = /is/;

target.match(regExp);
// ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

exec 메서드는 문자열 내의 모든 패턴을 검색하는 g플래그를 지정해도 첫번째 매칭 결과만 반환한다. 하지만 match 메서드는 g 플래그가 지정되면 모든 매칭결과를 배열로 반환한다.

```js
const target = "Is this all there is?";
const regexp = /is/g;

target.match(regexp); // ["is", "is"]
```

## 플래그

패턴과 함께 정규 표현식을 구성하는 플래그는 정규 표현식의 검색 방식을 설정하기 위해 사용한다.

총 6개가 존재하지만 가장 많이 사용되는 3개의 플래그는 아래와 같다.

![](https://velog.velcdn.com/images/codenmh0822/post/966eba45-d8f3-4013-831d-81d138f18b64/image.png)

플래그는 옵션이고, 하나 이상 동시 설정할 수 있다.

어떠한 플래그를 사용하지 않은 경우 대소문자를 구별해서 패턴을 검색한다. 그리고 문자열에 패턴 검색 매칭 대상이 1개 이상 존재해도 첫 번째 매칭한 대상만 검색하고 종료한다.

```js
const target = "Is this all there is?";

// target 문자열에서 is 문자열을 대소문자를 구별하여 한 번만 검색한다.
target.match(/is/);
// -> ["is", index: 5, input: "Is this all there is?", groups: undefined]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 한 번만 검색한다.
target.match(/is/i);
// -> ["Is", index: 0, input: "Is this all there is?", groups: undefined]

// target 문자열에서 is 문자열을 대소문자를 구별하여 전역 검색한다.
target.match(/is/g);
// -> ["is", "is"]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 전역 검색한다.
target.match(/is/gi);
// -> ["Is", "is", "is"]
```

## 패턴

정규 표현식은 "일정한 규칙(패턴)을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어이다."

패턴과 플래그로 구성되며, 패턴은 문자열의 일정한 규칙을 표현하기 위해 사용하며, 플래그는 검색 방식을 설정하기 위해 사용한다.

패턴은 `/`로 열고 닫으며 문자열의 따옴표는 생략한다. 따옴표를 포함하면 따옴표까지도 패턴에 포함되어 검색된다.

어떤 문자열 내에 패턴과 일치하는 문자열이 존재할 때 정규 표현식과 매치한다고 표현한다.

### 임의의 문자열 검색

`.`은 임의의 문자 한 개를 의미하며, 문자의 내용은 무엇이든 상관없다.

다음 예제의 경우 `.`을 3개 연속하여 패턴을 생성했으므로 문자의 내용과 상관없이 3자리 문자열과 매치한다.

```js
const target = "Is this all there is?";

// 임의의 3자리 문자열을 대소문자를 구별하여 전역 검색한다.
const regExp = /.../g;

target.match(regExp); // -> ["Is ", "thi", "s a", "ll ", "the", "re ", "is?"]
```

### 반복 문자열 검색

`{m, n}`은 앞선 패턴이 최소 m번, 최대 n번 반복되는 문자열을 의미한다. 콤마 뒤에 공백이 있으면 정상 동작하지 않으므로 주의해야 한다.

`{n}`은 앞선 패턴이 n번 반복되는 문자열을 의미한다. 즉 {n}은 {n, n}과 같다.

`{n,}`은 앞선 패턴이 최소 n번 이상 반복되는 문자열을 의미한다.

`+`는 앞선 패턴이 최소 한번 이상 반복되는 문자열을 의미한다. 즉, +는 {1,}과 같다.

`?`은 앞선 패턴이 최대 한 번(0번 포함)이상 반복되는 문자열을 의미한다. 즉 ?는 {0,1}과 같다.

```js
const target = "A AA B BB Aa Bb AAA";

// 'A'가 최소 1번, 최대 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{1,2}/g;

target.match(regExp); // -> ["A", "AA", "A", "AA", "A"]

const target = "A AA B BB Aa Bb AAA";

// 'A'가 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{2}/g;

target.match(regExp); // -> ["AA", "AA"]

const target = "A AA B BB Aa Bb AAA";

// 'A'가 최소 2번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /A{2,}/g;

target.match(regExp); // -> ["AA", "AAA"]

const target = "A AA B BB Aa Bb AAA";

// 'A'가 최소 한 번 이상 반복되는 문자열('A, 'AA', 'AAA', ...)을 전역 검색한다.
const regExp = /A+/g;

target.match(regExp); // -> ["A", "AA", "A", "AAA"]

const target = "color colour";

// 'colo' 다음 'u'가 최대 한 번(0번 포함) 이상 반복되고 'r'이 이어지는
// 문자열 'color', 'colour'를 전역 검색한다.
const regExp = /colou?r/g;

target.match(regExp); // -> ["color", "colour"]
```

### OR 검색

`|`은 or 의미를 갖는다. 다음 예제의 `/A|B/`는 A 또는 B를 의미한다.

```js
const target = "A AA B BB Aa Bb";

// 'A' 또는 'B'를 전역 검색한다.
let regExp = /A|B/g;

target.match(regExp);
// -> [ 'A', 'A', 'A', 'B', 'B', 'B', 'A', 'B' ]
```

`[]` 내의 문자는 or로 동작한다. 그 뒤에 `+` 를 사용하면 패턴을 한 번 이상 반복한다.

```js
const target = "A AA B BB Aa Bb";

// 'A' 또는 'B'가 한 번 이상 반복되는 문자열을 전역 검색한다.
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ...

// const regExp = /A+|B+/g;
const regExp = /[AB]+/g;

target.match(regExp); // -> ["A", "AA", "B", "BB", "A", "B"]
```

범위를 지정하려면 `[]` 내에 `-` 를 사용한다.

```js
const target = "A AA BB ZZ Aa Bb";

// 'A' ~ 'Z'가 한 번 이상 반복되는 문자열을 전역 검색한다.
regExp = /[A-Z]+/g;

target.match(regExp); // [ 'A', 'AA', 'BB', 'ZZ', 'A', 'B' ]
```

대소문자를 구별하지 않고 알파벳을 검색하는 방법은 다음과 같다.

```js
const target = "AA BB Aa Bb 12";

// 'A' ~ 'Z' 또는 'a' ~ 'z'가 한 번 이상 반복되는 문자열을 전역 검색한다.
regExp = /[A-Za-z]+/g;

target.match(regExp); // [ 'AA', 'BB', 'Aa', 'Bb' ]
```

숫자를 검색하는 방법은 다음과 같다.

```js
const target = "AA BB 12,345";

// '0' ~ '9'가 한 번 이상 반복되는 문자열을 전역 검색한다.
let regExp = /[0-9]+/g;

target.match(regExp); // ['12', '345']
```

`\d`는 숫자를 의미하며 `\D`는 반대 의미로 숫자를 제외한 문자를 의미한다.

```js
const target = "AA BB 12,345";

let regExp = /[\d,]+/g;

target.match(regExp); // ['12,345']

// \D는 숫자가 아닌 문자를 의미한다.
// 숫자가 아닌 문자 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
regExp = /[\D,]+/g;

target.match(regExp); // [ 'AA BB ', ',' ]
```

`\w`는 알파벳, 숫자, 언더스코어를 의미한다. 즉, \w는 [A-Za-z0-9_]와 같다.

```js
const target = "Aa Bb 12,345 _$%&";

// 알파벳, 숫자, 언더스코어, ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
let regExp = /[\w,]+/g;

target.match(regExp); // [ 'Aa', 'Bb', '12,345', '_' ]

// 알파벳, 숫자, 언더스코어가 아닌 문자 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색한다.
regExp = /[\W,]+/g;

target.match(regExp); // [ ' ', ' ', ',', ' ', '$%&' ]
```

### NOT 검색

`[...]` 내의 `^`은 not의 의미를 갖는다.

```js
const target = "AA BB 12 Aa Bb";

// 숫자를 제외한 문자열을 전역 검색한다.
const regExp = /[^\d]+/g;

target.match(regExp); // [ 'AA BB ', ' Aa Bb' ]
```

### 시작 위치로 검색

`[...]` 밖의 `^`은 문자열의 시작을 의미한다.

```js
const target = "https://naver.com";

// 'https'로 시작되는지 검사한다.
const regExp = /^https/g;

regExp.test(target); // true
```

### 마지막 위치로 검색

`$`는 문자열의 마지막을 의미한다.

```js
const target = "https://naver.com";

// 'com'로 시작되는지 검사한다.
const regExp = /com$/g;

regExp.test(target); // true
```
