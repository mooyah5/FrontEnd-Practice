import { memo, useCallback, useMemo, useState } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.ts";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// 현재: ConfigureCounter로 인해 memo로 감싼 게 별 의미 없음.

// React.memo로 컴포넌트 감싸기
// 컴포넌트가 정상 재실행 될 때 이전 props값과 새로 받을 props값을 비교하여
// 변경이 없다면 memo가 렌더링을 저지하고 이전에 렌더된 결과를 재사용한다. (자식들도 자연히 마찬가지)
// (부모 컴포넌트에 의해 실행되었을 때만 유효하며, 내부적 변화는 모르쇠임)

// 그렇다고 해서 무조건적으로 memo를 사용하는 것이 좋은 것은 아님
// memo로 감싸는 것은 성능 향상을 위한 최적화 작업이므로
// 불필요한 memo를 사용하면 오히려 성능이 떨어질 수 있음

// memo로 감싸는 것이 좋은 경우
// 1. 순수 함수 컴포넌트
// 2. 렌더링 결과가 동일한 경우
// 3. 렌더링이 오래 혹은 자주 발생하는 경우

// memo로 감싸는 것이 좋지 않은 경우
// 1. 렌더링 결과가 항상 다른 경우
// 2. 렌더링이 자주 발생하지 않는 경우
// 3. 렌더링이 빠른 경우
// 4. props가 자주 바뀌는 경우

// memo로 감싸는 것이 무의미한 경우
// 1. 렌더링 결과가 항상 다르거나 자주 변경되는 경우
// 2. 렌더링이 빠르게 발생하는 경우
// 3. 렌더링이 자주 발생하지 않는 경우

// 리액트는 컴포넌트를 렌더링할 때 속성들을 확인한다.
// 그리고 속성값 확인은 그만큼 성능에 부담을 준다.

// 간단한 프로젝트에서는 권장되지 않으므로 큰 프로젝트에서 조심스럽게 사용할 것이 권장됨.
// 곡 재렌더링을 방지할 수 있는 컴포넌트와 최대한 상위 컴포넌트 트리에 있는 컴포넌트로 사용할 것

const Counter = memo(function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);

  // useMemo
  // 컴포넌트 내부의 일반함수를 감싸고 실행을 방지함
  // 복잡한 계산이 있을 때만 사용하는 것이 좋다.
  // 내부 함수를 실행하고, 결과를 저장한다.
  // 의존성이 하나라도 바뀔 경우에만 재실행된다. (set 버튼 클릭 시에만 작동)

  // 남용하면 안됨 (memo처럼 추가적인 의존성 값 비교를 하므로)
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  const [counter, setCounter] = useState(initialCount);

  // handleDecrement, handleIncrement함수는 Counter 컴포넌트의 중첩함수이므로
  // 이 Counter 컴포넌트가 실행될 때마다 다시 생성된다.

  // => useCallback으로 최적화 (버튼을 클릭해도 Icon 버튼들과 중첩 컴포넌트들이 재실행되지 않음)
  // const handleDecrement = useCallback(() => {
  //   setCounter((prevCounter) => prevCounter - 1);
  // }, []);

  const handleDecrement = useCallback(() => {
    setCounter((prevCounter) => prevCounter - 1);
  }, []);

  const handleIncrement = useCallback(() => {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
});
export default Counter;
