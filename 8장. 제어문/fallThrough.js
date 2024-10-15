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

var string = "Hello World";
var search = "l";
var count = 0;

// 문자열은 유사 배열이므로 for 문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 'l'이 아니라면 실행을 더 이상 중단하고 반복문의 증감식으로 이동한다.
  if (string[i] !== search) continue;
  count++; // 즉 continue 문이 실행되면 이 문은 실행되지 않는다.
}

//String.prototype.match 메서드를 사용해도 같은 동작함...
const regexp = new RegExp(search, "g");
console.log(string.match(regexp).length); // 3
