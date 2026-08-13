"use client";

import { useState } from "react";

const counts = [
  "호흡 확인",
  "시선 정렬",
  "발끝 고정",
  "전열 연결",
  "박자 상승",
  "공포 억제",
  "동시 전진",
  "원 모어",
];

export function CountBoard() {
  const [active, setActive] = useState(7);

  return (
    <div className="count-board" aria-label="류채린의 8카운트 동기화 보드">
      <div className="board-head">
        <span>LIVE ROUTINE</span>
        <strong>8 COUNT</strong>
      </div>
      <p className="count-state" aria-live="polite">
        {String(active + 1).padStart(2, "0")} / {counts[active]}
      </p>
      <div className="count-grid">
        {counts.map((label, index) => (
          <button
            type="button"
            key={label}
            aria-pressed={active === index}
            aria-label={`${index + 1}카운트, ${label}`}
            onClick={() => setActive(index)}
          >
            <span>{index + 1}</span>
          </button>
        ))}
      </div>
      <div className="formation-lines" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
