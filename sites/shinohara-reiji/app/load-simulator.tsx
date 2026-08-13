"use client";

import { useState } from "react";

const stages = [0, 15, 35, 55, 75, 100];

export default function LoadSimulator() {
  const [stage, setStage] = useState(0);
  const value = stages[stage];
  const state = value === 0 ? "대기" : value < 75 ? "충전 중" : value < 100 ? "위치 노출" : "최대 출력 준비";

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
        <h3>전투 출력 모의계</h3>
        <p>버튼을 눌러 네 가닥에 힘이 얼마나 쌓였는지 확인한다. 75%부터 선이 하얗게 빛나고 큰 금속음이 나서 적에게 최대 공격을 준비 중이라는 사실이 드러난다.</p>
        <div className="simulator-actions">
          <button type="button" onClick={store} disabled={stage === stages.length - 1}>장력 충전 +</button>
          <button type="button" className="ghost-button" onClick={release} disabled={stage === 0}>하중 인계 방출</button>
        </div>
      </div>
      <div className={`simulator-visual ${value >= 75 ? "warning" : ""}`}>
        <div className="sim-top"><span>최대 출력 대비 충전량 / 선 4가닥</span><strong>{value}%</strong></div>
        <div className="tension-line"><span style={{ width: `${value}%` }} /></div>
        <div className="node-row" aria-hidden="true"><i /><b /><i /><b /><i /></div>
        <div className="sim-readout"><span>상태</span><strong>{state}</strong><span>파괴 규모</span><strong>{value === 100 ? "중형 건물 1채" : "충전 중"}</strong></div>
      </div>
    </div>
  );
}
