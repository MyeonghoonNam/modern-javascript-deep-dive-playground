function isValid(value) {
  if (value === "") return false;
  if (value === null) return false;
  if (value === undefined) return false;
  if (Object.is(value, NaN)) return false;

  // 객체일 경우, 내부 값도 검사
  if (typeof value === "object") {
    if (!Object.keys(value).length) return false; // 빈 객체일 경우

    // 재귀적으로 객체 내부의 값도 검사
    for (let key in value) {
      if (!isValid(value[key])) {
        return false;
      }
    }
  }

  return true;
}

const testCase = [
  "",
  null,
  undefined,
  NaN,
  [],
  {},
  { a: {} },
  { a: "" },
  { a: null },
  { a: undefined },
  { a: NaN },
  { a: {}, b: { c: {} } },
  { a: {}, b: { c: {} }, c: { a: "has value" } },
  [{ a: {} }],
];

for (let value of testCase) {
  if (!isValid(value)) {
    console.log("유효하지 않은 값");
  } else {
    console.log("유효한 값");
  }
}
