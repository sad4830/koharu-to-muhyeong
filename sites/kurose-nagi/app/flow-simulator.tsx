"use client";

import { useState } from "react";

export function FlowSimulator() {
  const [active, setActive] = useState(false);

  return (
    <div className={`flow-simulator ${active ? "is-active" : ""}`}>
      <div className="flow-stage" aria-hidden="true">
        <div className="incoming-strike" />
        <div className="flow-ring ring-one" />
        <div className="flow-ring ring-two" />
        <div className="flow-ring ring-three" />
        <div className="palm left-palm">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="palm right-palm">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="impact-core" />
        <div className="return-strike" />
      </div>
      <div className="simulator-control">
        <div aria-live="polite">
          <span>{active ? "힘의 중심 이탈" : "단일 타격 접근"}</span>
          <strong>{active ? "반류 완료" : "접촉 대기"}</strong>
        </div>
        <button
          type="button"
          aria-pressed={active}
          onClick={() => setActive((value) => !value)}
        >
          {active ? "흐름 초기화" : "반류 전개"}
        </button>
      </div>
    </div>
  );
}
