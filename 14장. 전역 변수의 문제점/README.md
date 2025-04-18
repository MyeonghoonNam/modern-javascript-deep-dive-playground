전역 변수의 무분별한 사용은 위험하다.
전역 변수를 반드시 사용해야 할 이유를 찾지 못한다면 지역 변수를 사용해야 한다.

## 변수의 생명 주기

### 지연 변수의 생명 주기

변수는 선언에 의해 생성되고 할당을 통해 값을 갖는다. 그리고 언젠가 소멸하는 **생명 주기**가 있다.

생명 주기가 없다면 한번 선언된 변수는 프로그래밍을 종료하지 않는 한 영원히 메모리 공간을 점유하게 된다.

변수의 생명 주기는 자신이 선언된 위치에서 생성되고 소멸한다. 하지만 전역 변수의 생명 주기는 애플리케이션의 생명 주기와 같다.

함수 내부에서 선언된 지역 변수는 함수가 호출되면 생성되고 함수가 종료하면 소멸한다.

```js
function foo() {
  var x = "local";
  console.log(x); // local
  return x;
}

foo();
console.log(x); // ReferenceError x is not defined
```

이전에 변수 호이스팅에서 살펴보았듯이 변수 선언은 선언문이 어디에 있든 상관없이 가장 먼저 실행된다. 다시 말해, 변수 선언은 코드가 한 줄씩 순차적으로 실행되는 시점인 런타임에 실행되는 것이 아니라 런타임 이전 단계에서 자바스크립트 엔진에 의해 먼저 실행된다.

위 동작은 엄밀히 전역 변수에 한정된 것이다. 함수 내부에서 선언한 변수는 함수가 호출된 직후에 함수 몸체의 코드가 한 줄씩 순차적으로 실행되기 이전에 자바스크립트 엔진에 의해 먼저 실행된다.

즉, **런타임에 함수가 호출되는 시점에 함수 몸체의 문들이 순차적으로 실행되기 이전에 자바스크립트 엔진에 의해 선언과 관련된 문들이 먼저 실행되는 것이다.**

이렇게 함수가 호출되면 변수가 생성되고 종료되면 소멸한다. 따라서 함수 내부에 선언된 지역 변수는 함수가 호출되어 실행되는 동안에만 유효하다.

**지역 변수의 생명 주기는 함수의 생명 주기와 일치한다.**

![](https://velog.velcdn.com/images/codenmh0822/post/ce80d789-a87e-4f9f-8ac8-58fc9001ab31/image.png)

변수의 생명 주기는 메모리 공간이 확보된 시점부터 메모리 공간이 해제되어 가용 메모리 풀에 반환되는 시점까지다.

함수 내부에서 선언된 지역 변수는 함수가 생성한 스코프에 등록된다. 함수가 생성한 스코프는 렉시컬 환경이라 부르는 물리적인 실체가 있다. 따라서 변수는 자신이 동록된 스코프가 소멸(메모리 해제)될 때 까지 유효하다.

할당된 메모리 공간은 더 이상 그 누구도 참조하지 않을 때 가비지 콜렉터에 의해 해제되어 가용 메모리 풀에 반환되는데, 누군가가 메모리 공간을 참조하고 있으면 해제되지 않고 확보된 상태로 남아있게 된다.

이는 스코프도 마찬가지로 누군가 스코프를 참조하고 있으면 스코프는 소멸하지 않고 생존하게 된다.

즉, 스코프가 소멸해야 메모리가 해제되는 것이다.

일반적으로 함수가 종료하면 함수가 생성한 스코프도 소멸한다. 하지만 스코프를 참조하고 있다면 스코프는 해제되지 않고 생존하게 된다. 이와 유사한 개념인 클로저는 다음에 자세히 다루도록 하자.

이때까지 살펴봤듯이 **호이스팅은 스코프를 단위로 동작한다.**

전역 변수는 전역 스코프, 지역 변수는 지역 스코프의 선두로 끌어 올려진 것처럼 동작한다.

즉, **호이스팅은 변수 선언이 스코프의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징을 말한다.**

### 전역 변수의 생명 주기

함수와 달리 전역 코드는 명시적인 호출 없이 실행된다. 다시 말해, 전역 코드는 함수 호출과 같이 전역 코드를 실행하는 특별한 진입점이 없고 코드가 로드되자마자 곧바로 해석되고 실행된다.

코드의 시작부터 더이상 실행할 문이 없을 때 종료한다.

브라우저 환경에서 var 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 된다.

> 전역 객체
> 전역 객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체다.</br>
> 전역 객체는 클라이언트 사이드 환경(브라우저)에서는 **window** 객체를 의미하고, 서버 사이드 환경(Node.js)에서는 **global** 객체를 의미한다. </br>
> 전역 객체는 표준 빌트인 객체와 환경에 따른 호스트 객체(클라이언트 Web API 또는 Node.js의 Host API) 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다.(브라우저만 var 키워드 식별자를 통해 프로퍼티로 가짐)

브라우저 환경에서 전역 객체 window는 웹페이지를 닫기 전까지 유효하다. 즉, **var 키워드로 선언한 전역 변수의 생명 주기는 전역 객체의 생명 주기와 일치한다.**

![](https://velog.velcdn.com/images/codenmh0822/post/2fd2d10a-5117-4101-a0e5-a654e2182e49/image.png)

## 전역 변수의 문제점

#### 암묵적 결합

전역 변수를 선언한 의도는 코드 어디서든 참조하고 할당할 수 있는 변수를 사용하겠다는 것이다. 이는 모든 코드가 전역 변수를 참조하고 변경할 수 있는 **암묵적 결합**을 허용하는 것이다.

유효 범위가 클수록 코드의 가독성은 나빠지고 의도치 않게 상태가 변경될 수 이다.

#### 긴 생명 주기

**전역 변수는 생명 주기가 길다.** 따라서 메모리 리소스도 오랜 기간 소비한다.

특히 var 키워드는 변수의 중복 선언을 허용하므로 이름이 중복된 변수에 의도치 않은 재할당이 이뤄질 수 있다.

#### 스코프 체인 상에서 종점에 존재

전역 변수는 스코프 체인 상에서 종점에 존재한다. 이는 변수를 검색할 때 전역 변수가 가장 마지막에 검색된다는 것을 말하며, **전역 변수의 검색 속도는 가장 느리다.**

#### 네임스페이스 오염

자바스크립트의 가장 큰 문제점 중 하나는 파일이 분리되어 있다 해도 하나의 전역 스코프를 공유한다는 것이다.

따라서 다른 파일 내에서 동일한 이름으로 명명된 전역 변수나 전역 함수가 같은 스코프 내에 존재할 경우 예상치 못한 결과를 가져올 수 있다.

## 전역 변수의 사용을 억제하는 방법

전역 변수를 반드시 사용해야 할 이유를 찾지 못한다면 지역 변수를 사용해야 한다. 변수의 스코프는 좁을수록 좋다.

전역 변수를 절대 사용하지 말라는 의미가 아닌 무분별한 전역 변수의 남발은 억제해야 한다.

### 즉시 실행 함수

함수 정의와 동시에 소출되는 즉시 실행 함수는 단 한 번만 호출된다.

**모든 코드를 즉시 실행 함수로 감싸면 모든 변수는 즉시 실행 함수의 지역 변수가 된다.** 이러한 특성을 이용해 전역 변수의 사용을 제한하는 방법도 있다.

```js
(function () {
  var foo = 10;
})();

console.log(foo); // ReferenceError
```

### 네임스페이스 객체

전역에 네임스페이스 역할을 담당할 객체를 생성하고 전역 변수처럼 사용하고 싶은 변수를 프로퍼티로 추가하는 방법도 있다.

```js
var APP = {}; // 자체적인 전역 네임스페이스 객체 생성
APP.name = "Hoon";
console.log(APP.name); // Hoon
```

### 모듈 패턴

모듈 패턴은 **클래스를 모방해서 관련이 있는 변수와 함수를 모아 즉시 실행 함수로 감싸 하나의 모듈을 만든다.**

모듈 패턴은 자바스크립트의 강력한 기능인 클로저를 기반으로 동작하며, 전역 변수의 억제는 물론 캡슐화까지 구현할 수 있다는 것이다.

**캡슐화는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말한다.**

캡슐화는 **객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉이라 한다.**

대부분의 객체지향 프로그래밍 언어는 클래스를 구성하는 멤버에 대해 public, private, protected 등의 접근 제한자를 사용해 공개 범위를 한정할 수 있다.

하지만 자바스크립트는 접근 제한자를 제공하지 않기에 모듈 패턴은 전역 네임스페이스의 오염을 막는 기능은 물론 한정적이기는 하지만 정보 은닉을 구현하기 위해 사용한다.

```js
var Counter = (function () {
  // private 멤버
  var num = 0;

  // public 멤버
  // 외부로 공개할 데이터나 메서드를 프로퍼티로 추가한 객체를 반환한다.
  return {
    increase() {
      return ++num;
    },
    decrease() {
      return --num;
    },
  };
})();

// private 변수는 외부로 노출되지 않는다.(정보 은닉)
console.log(Counter.num); // undefined

console.log(Counter.increase()); // 1
console.log(Counter.increase()); // 2
console.log(Counter.decrease()); // 1
console.log(Counter.decrease()); // 0
```

## ES6 모듈

ES6 모듈을 사용하면 더는 전역 변수를 사용할 수 없다. **ES6 모듈은 파일 자체의 독자적인 모듈 스코프를 제공한다.** 따라서 모듈 내에서 var 키워드로 선언한 변수는 더는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.

모던 브라우저에서는 ES6 모듈을 사용할 수 있고, script 태그에 `type="module"` 어트리뷰트를 추가하면 로드된 자바스크립트 파일은 모듈로서 동작한다. 확장자는 mjs를 권장한다.

```html
<script src="lib.mjs" type="moduole"></script>
<script src="app.mjs" type="moduole"></script>
```

ES6 모듈은 IE를 포함한 구형 브라우저에서는 동작하지 않기에 브라우저가 지원하는 ES6 모듈 기능보다는 Webpack 등의 모듈 번들러를 사용하는 것이 일반적이다.
