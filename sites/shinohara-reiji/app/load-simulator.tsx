"use client";

import { useState } from "react";

const stages = [0, 18, 42, 68, 88, 100];

export default function LoadSimulator() {
  const [stage, setStage] = useState(0);
  const value = stages[stage];
  const state = value === 0 ? "대기" : value < 75 ? "저장 중" : value < 100 ? "과부하 경고" : "포화";

  function store() {
    setStage((current) => Math.min(current + 1, stages.length - 1));
  }

  function release() {
    setStage(0);
  }

  return (
    <div className="simulator">
      <div className="simulator-copy">
        <p className="section-no">ARK TRAINING MODULE</p>
        <h3>계류선 하중 모의계</h3>
        <p>버튼으로 하중이 쌓일 때 나타나는 시각·청각 신호를 확인할 수 있다. 실제 출력 수치가 아닌 운용 원리 안내용 모듈이다.</p>
        <div className="simulator-actions">
          <button type="button" onClick={store} disabled={stage === stages.length - 1}>하중 저장 +</button>
          <button type="button" className="ghost-button" onClick={release} disabled={stage === 0}>장력 해제</button>
        </div>
      </div>
      <div className={`simulator-visual ${value >= 75 ? "warning" : ""}`}>
        <div className="sim-top"><span>LINE 01 / TENSION</span><strong>{value}%</strong></div>
        <div className="tension-line"><span style={{ width: `${value}%` }} /></div>
        <div className="node-row" aria-hidden="true"><i /><b /><i /><b /><i /></div>
        <div className="sim-readout"><span>STATE</span><strong>{state}</strong><span>LOSS</span><strong>{value === 0 ? "0" : "20"}%</strong></div>
      </div>
    </div>
  );
}
