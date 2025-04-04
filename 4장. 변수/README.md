## 변수란 ?

변수는 프로그래밍 언어에서 데이터를 관리하기 위한 핵심 개념이다.

프로그래밍 언어는 기억하고 싶은 값을 메모리에 저장하고, 저장된 값을 읽어들여 재사용하기 위해 변수라는 메커니즘을 제공한다.

즉, **변수는 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 메모리 공간을 식별하기 위해 붙인 이름**이다.

**변수에 값을 저장하는 것**을 <b>할당(assignment)</b>이라고 한다.
**변수에 저장된 값을 읽어 들이는 것**을 <b>참조(reference)</b>라고 한다.

컴퓨터는 CPU를 사용해 연산하고, 메모리를 사용해 데이터를 관리한다.

메모리는 데이터를 저장할 수 있는 메모리 셀의 집합체이다.
메모리 셀 하나의 크기는 <b>1바이트(8비트)</b>로, 컴퓨터는 메모리 셀의 크기 1바잍트 단위로 데이터를 저장하거나 읽어들인다.

![](https://velog.velcdn.com/images/jjinichoi/post/e367a2f4-fd2d-4bbe-b97c-7754793eb30e/image.png)

어떠한 값을 재사용하고자 할 때, 변수가 없다면 메모리에 저장된 데이터를 읽기 위해 메모리 주소를 통해 값을 직접 접근해야 하는데, 이 방법은 치명적 오류 발생의 가능성이 높기에, **자바스크립트는 개발자의 메모리 제어를 허용하지 않는다.**

대신 변수를 통해 값의 위치를 가리키고 식별하여 컴파일러 또는 인터프리터에 의해 값이 저장된 메모리 공간의 주소로 치환되어 실행된다. 따라서 개발자가 직접 메모리 주소를 통해 값을 저장하고 참조할 필요없이 변수를 통해 값에 안전하게 접근할 수 있다.

## 식별자란 ?

변수 이름을 식별자라고도 하는데 **식별자는 어떤 값을 구별해서 식별할 수 있는 고유한 이름을 말한다.**

**식별자는 메모리의 값이 아니라 메모리의 주소를 기억하고 있다.** 식별자로 값을 구별해서 식별한다는 것은 식별자가 기억하고 있는 메모리 주소를 통해 메모리 공간에 저장된 값에 접근할 수 있다는 의미이다. 메모리의 주소와 식별자의 이름은 매핑관계이며 이 관계 역시 메모리에 저장된다.

식별자라는 용어는 변수에만 국한되지 않고, **메모리 상에 존재하는 어떤 값을 식별할 수 있는 이름은 모두 식별자라고 부른다.**

변수, 함수, 클래스 등의 이름과 같은 식별자들은 메모리 상에 존재하는 변수, 함수의 값을 식별하는 것이다. (자바스크립트에서 함수는 값이다.)

## 변수 선언

변수 선언이란 변수를 생성하는 것을 말한다.
값을 저장하기 위한 메모리 공간 확보와 변수 이름과 메모리 공간의 주소 연결을 위한 준비 단계이다.

변수를 사용하려면 반드시 선언이 필요하고 **var, let, const** 키워드를 사용한다.

> 키워드(keyword) ?
> 자바스크립트 코드를 해석하고 실행하는 자바스크립트 엔진이 수행할 동작을 규정한 일종의 명령어로 엔진은 키워드를 만나면 정해진 동작을 수행한다. 예를들어 var 키워드를 만나면 작성된 변수 이름으로 새로운 변수를 선언한다.

우선 `var` 키워드를 통한 변수 선언은 2단계에 거쳐 수행된다.

- **선언 단계**: 변수 이름을 등록해서 자바스크립트 엔진에 변수의 존재를 알린다.
- **초기화(initialization)** 단계: 최초로 값을 할당하는 것. 값을 저장하기 위한 메모리 공간을 확보하고, 암묵적으로 ``undefined`를 할당해 초기화 한다.

## 변수 선언의 실행 시점과 변수 호이스팅

```javascript
console.log(score); // undefined
var score; // 변수 선언문
```

**변수 선언은 소스코드가 순차적으로 실행되는 시점인 런타임 이전 단계에서 실행**되기에 위 코드는 오류가 발생하지 않는다.

자바스크립트 엔진은 소스코드를 순차적으로 실행하기 이전에 **준비 단계로 소스코드의 평가 과정을 통해 변수 선언을 포함한 모든 선언문을 소소코드에서 찾아내어 먼저 실행한다.**

이러한 평가 과정이 끝나면 **런타임 과정에서 변수 선언을 포함한 모든 선언문을 제외하고 소스코드를 순차적으로 실행**한다.

이처럼 **변수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징을 변수 호이스팅**이라고 한다.

변수 선언뿐 아니라 var, let, const, function, class 등의 키워드를 통한 선언 식별자는 모두 호이스팅이 이루어진다. 모든 선언문은 런타임 이전 단계인 코드 평가 단계에서 먼저 실행되기 때문이다.

## 값의 할당

```javascript
console.log(score); // undefined
var score = 80; // 변수 선언과 값의 할당
console.log(score); // 80
```

변수의 선언과 값의 할당을 하나의 문장으로 단축 표현해도 자바스크립트 엔진은 변수의 선언과 값의 할당을 2개의 문으로 나누어 각각 실행한다. 따라서 변수에 undefined가 할당되어 초기화되는 것은 변함이 없다.

즉, **변수 선언은 런타임 이전에 먼저 실행되지만, 값의 할당은 런타임에 실행된다.**

주의할 점은, **변수에 값을 할당할 때는 이전 값 undefined가 저장되어 있던 메모리 공간을 지우고 그 메모리 공간에 할당 값 80을 새롭게 저장하는 것이 아니라, 새로운 메모리 공간을 확보하고 그곳에 할당 값 80을 저장한다.**

## 값의 재할당

**재할당이란 이미 값이 할당되어 있는 변수에 새로운 값을 또다시 할당하는 것을 말한다.**

값을 재할당 할 수 없어서 변수에 저장된 값을 변경할 수 없다면 변수가 아니라 상수라고 한다. 대표적으로 `const` 키워드를 통해 선언한 변수는 재할당이 금지되어 상수로 표현한다. 하지만 `const` 키워드는 반드시 상수만을 위해 사용하지는 않는다.

변수에 값을 재할당하면 기존 값이 저장되어 있던 메모리 공간을 지우고 새로운 공간을 확보하고 그 메모리 공간에 재할당 값을 저장한다.(원시타입에 국한)

변수 선언과 관련하여 구체적인 메모리 관리 방법은 아래 포스팅에 구체적으로 정리하였습니다.
[자바스크립트의 메모리 관리](https://velog.io/@codenmh0822/%EB%A9%94%EB%AA%A8%EB%A6%AC%EA%B4%80%EB%A6%AC)
