`제어문`은 `조건에 따라 코드 블록을 실행하거나 반복 실행할 때 사용한다.`

일반적으로 코드는 위에서 아래 방향으로 순차적으로 실행되지만 제어문을 사용하면 코드의 실행 흐름을 인위적으로 제어할 수 있다.

코드의 실행 순서가 변경된다는 것은 직관적인 코드의 흐름을 혼란스럽게 만든다. 즉, 가독성을 해치는 단점이 있다.

이러한 단점을 극복하기 위해 `forEach`, `map`, `filter`, `reduce` 같은 고차 함수에서는 제어문의 사용을 억제하여 복잡성을 해결하려고 노력한다.

제어문은 흔히 사용되어 다소 진입장벽이 높진않지만 그만큼 확실한 이해가 중요하다.

## 블록문

`블록문(block/compound statement)`은 `0개 이상의 문을 중괄호로 묶은 것`으로, `코드 블록` 또는 `블록`이라고 부른다.

자바스크립트는 `블록문을 하나의 실행 단위로 취급한다.` 일반적으로 `제어문이나 함수를 정의할 때 사용한다.`

`블록문은 언제나 문의 종료를 의미하는 자체 종결성을 갖기 때문에` 블록문의 끝에는 세미콜론을 붙이지 않는다.

```js
// 블록문
{
  var foo = 1;
}

// 제어문에 사용되는 블록문
var foo = 2;

if (foo < 3) {
  console.log(foo);
}

// 함수에 사용되는 블록문
function sum(a, b) {
  return a + b;
}
```

## 조건문

`조건문`은 `조건식의 평가 결과에 따라 코드 블록(블록문)의 실행을 결정한다.` `조건식`은 `불리언 값으로 평가될 수 있는 표현식`이다.

자바스크립트는 `if...else문`과 `switch문`으로 두 가지가 존재한다.

### if...else문

```js
if (조건식1) {
  // 조건식1이 참일 때 실행하는 코드 블록
} else if (조건식2) {
  // 조건식2가 참일 때 실행하는 코드 블록
} else {
  // 위 조건식이 모두 거짓일 때 실행하는 코드 블록
}
```

`조건식이 불리언 값이 아닌 값으로 평가되면 자바스크립트 엔진에 의해 암묵적으로 불리언 값으로 강제 변환되어 실행할 코드 블록을 결정한다.`

`if...else`문은 표현식이 아닌 문이므로 값처럼 사용할 수 없기 때문에 변수에 할당할 수 없다.

### switch문

```js
switch (표현식) {
  case 표현식1:
    // switch문의 표현식과 case 표현식1이 일치하면 실행되는 문
    break;
  case 표현식2:
    // switch문의 표현식과 case 표현식2이 일치하면 실행되는 문
    break;
  case 표현식3:
    // switch문의 표현식과 case 표현식3이 일치하면 실행되는 문
    break;
  default:
  // switch문의 표현식과 일치하는 case 표현식이 없으면 실행되는 문
}
```

switch문이 표현식과 일치하는 case문이 있다면 해당 case문이 실행되고 없다면 실행순서는 default문으로 이동한다.

여기서 주의할 점은 case문이 실행되고 `break` 키워드로 case문을 탈출하지 않는다면 case문의 표현식과 일치하지 않아도 다음 case문이 실행되어 결과적으로 모든 case문과 default문이 실행되는데 이를 `폴스루(fall through)`라고 한다.

`default문`은 switch문의 맨 마지막에 위치하는게 일반적이며 맨 마지막에 위치하기에 break문을 생략할 수 있다.

```js
// 폴스루 발생에 의거 test 변수는

var test = 1;

switch (test) {
  case 1:
    test = 10;
  case 2:
    test = 20;
  case 3:
    test = 30;
  default:
    test = 40;
}

// 40, break문이 없어 폴스루 발생에 의해 test 변수는 최종 default문 실행 결과가 적용
console.log(test);
```

break문을 생략한 폴스루를 활용해 해결할 수 있는 문제들도 있다. 아래는 윤년을 판별하여 2월달의 일수를 반환하는 코드이다.

```js
// 폴스루를 활용한 윤년 알고리즘
var year = 2000; // 윤년으로 2월이 29일이 되어야함.
var month = 2;
var days = 0;

switch (month) {
  case 1:
  case 3:
  case 5:
  case 7:
  case 8:
  case 10:
  case 12:
    days = 31;
    break;
  case 4:
  case 6:
  case 9:
  case 11:
    days = 30;
    break;
  case 2:
    // 윤년 계산 알고리즘
    // 1) 연도가 4로 나누어 떨어지면 윤년이다.
    // 2) 연도가 4로 나누어 떨어지면서 100으로도 나누어 떨어지면 평년이다.
    // 3) 연도가 400으로 나누어 떨어지면 윤년이다.
    // 4) 1, 3의 조건에 부합하지않으면 평년이다.
    days = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
    break;
  default:
    console.log("Invalid Month");
}

console.log(days);
```

이렇듯 switch문은 다양한 키워드를 사용해야 하고 폴스루가 발생하는 등 문법도 복잡하다. 그렇기에 상대적으로 간단한 if...else문을 활용하고 조건문이 너무 많으면 switch문을 사용했을 때 가독성이 좋다면 사용하도록 하자.

## 반복문

`반복문`은 조건식의 평가 결과가 참인 경우 코드 블록을 실행한다. 그 후 조건식을 다시 평가하여 여전히 참인 경우 코드 블록을 다시 실행하며 이는 조건식이 거짓일 때까지 반복된다.

자바스크립트에는 세 가지 반복문인 `for문`, `while문`, `do...while문`이 존재한다.

> 반복문을 대체할 수 있는 다양한 기능
> 배열을 순회할 때 사용하는 **forEach**메서드
> 객체의 프로퍼티를 열거할 때 사용하는 **for...in**문
> ES6에서 도입된 이터러블을 순회할 수 있는 **for...of**문

### for 문

```js
for (변수 선언문 또는 할당문; 조건식; 증감식) {
  // 조건식이 참인 경우 반복 실행할 문;
}
```

조건식이 거짓으로 평가될 때까지 코드블록을 반복 실행한다.

![](https://velog.velcdn.com/images/jjinichoi/post/331c8016-7ebd-487b-bbae-8c3884d0809a/image.png)

`선언문, 조건식, 증감식은 옵션이지만 어떤식도 선언하지 않으면 무한루프가 된다.`

```js
// 무한루프
for(;;) {...}
```

for문 내에 for문을 중첩해 사용할 수 있다. 이를 중첩 for문이라고 한다.

```js
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    // ...
  }
}
```

### while 문

for문과 마찬가지로 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 실행한다.

```js
while (조건식) {
  // 조건식이 참일 때 실행할 문;
}
```

다만 `for문`은 반복 횟수가 명활할 때 주로 사용하고, `while문`은 반복 횟수가 불명확할 때 주로 사용한다.

조건식의 평가 결과가 언제나 참이면 무한루프로 동작한다.

```js
// 무한루프
while(true) {...}
```

무한루프를 탈출하기 위해 코드 블록 내에 if 문으로 탈출 조건을 명기하고 break 문으로 탈출한다.

```js
// 무한 루프 탈출
var count = 0;

while (true) {
  console.log(count);
  count++;

  //count가 3이면 코드 블록 탈출
  if (count === 3) break;
} // 0 1 2
```

### do...while 문

코드 블록을 먼저 실행하고 조건식을 평가한다. 따라서 코드 블록은 무조건 한번 이상 실행된다.

```js
do{
  무조건 한번은 실핼될 문;
}while(조건식);
```

```js
var count = 0;

do {
  console.log(count); // 0 1 2
  count++;
} while (count < 3);
```

## break 문

레이블 문, 반목문, switch문의 코드블록을 탈출하는 문으로 그 외에 사용하면 문법에러(SyntaxError)가 발생한다.

```js
if(true) {
  break; // Uncaught SyntaxError: illegal break statement
}
```

레이블 문이란 식별자가 붙은 문을 뜻한다. switch 문의 case 문과 default 문도 레이블 문에 해당한다.

레이블 문을 탈출하려면 break 문에 레이블 식별자를 지정한다.

```js
// foo라는 식별자가 붙은 레이블 블록문
foo: {
  console.log(1);
  break foo;
  console.log(2);
}

console.log("done");

// 1
// done
```

레이블 문은 프로그램의 흐름이 복잡해져서 가독성이 나빠지고 오류를 발생시킬 가능성이 높기에 중첩된 for문의 외부를 탈출하는 경우가 아니라면 일반적으로 권장하지 않는다.

```js
// outer 라는 식별자가 붙은 레이블 for 문
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    // i + j === 3이면 outer라는 식별자가 붙은 레이블 for 문을 탈출한다.
    // outer 레이블을 지정하지 않고 break문을 사용한다면 두 번째 for문만 탈출하여 첫 번째 for문으로 반복문이 진행된다.
    if (i + j === 3) break outer;
    console.log(`inner [${i}, ${j}]`);
  }
}

console.log("Done!");
```

break 문이 레이블 문뿐 아니라 반복문, switch 문에서 사용할 때에는 break 문에 레이블 식별자를 지정하지 않고 사용한다.

```js
var string = "Hello world";
var search = "l";
var index;

//문자열은 유사 배열이므로 for문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
  //문자열의 개별문자가 'l'이면
  if (string[i] === search) {
    index = i;
    break; //반복문을 탈출한다.
  }
}

console.log(index); //2

//String.prototype.indexOf 메서드를 사용해도 같은 동작함...
console.log(string.indexOf(search)); //2
```

## continue 문

반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로(while문에서는 조건식으로) 실행 흐름을 이동 시킨다. break 문처럼 반목분을 탈출하지 않는다.

```js
var string = "Hello World";
var search = "l";
var count = 0;

// 문자열은 유사 배열이므로 for 문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 'l'이 아니라면 실행을 더 이상 중단하고 반복문의 증감식으로 이동한다.
  if (string[i] !== search) continue;
  count++; // 즉 continue 문이 실행되면 이 문은 실행되지 않는다.
}

//String.prototype.match 메서드를 사용해도 같은 동작
const regexp = new RegExp(search, "g");
console.log(string.match(regexp).length); // 3
```
