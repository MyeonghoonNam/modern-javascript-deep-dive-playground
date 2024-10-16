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
