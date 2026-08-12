"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const circuitStages = [
  {
    turn: 0,
    label: "비활성",
    damage: 0,
    tone: "#7d8a88",
    injury: "통상적인 22세 여성의 신체 규격. 초인적 강화와 파생 운용이 적용되지 않습니다.",
  },
  {
    turn: 1,
    label: "회로 개방",
    damage: 5,
    tone: "#78f6d4",
    injury: "코피와 안구 충혈, 사용 근육의 통증과 미세 근섬유 손상.",
  },
  {
    turn: 2,
    label: "신경 과부하",
    damage: 10,
    tone: "#61dcbf",
    injury: "사용량이 많은 전완과 종아리의 국소 피하출혈과 강한 근육 경직. 정밀한 악력과 착지 안정성이 조금씩 흔들립니다.",
  },
  {
    turn: 3,
    label: "역류 임계",
    damage: 15,
    tone: "#e0bd67",
    injury: "가장 많이 사용한 팔다리 한 곳에 국소적인 1도 근파열, 가쁜 호흡과 현기증 발생.",
  },
  {
    turn: 4,
    label: "강제 종료",
    damage: 20,
    tone: "#ff665f",
    injury: "가장 많이 사용한 팔다리 한 곳의 1도 근파열과 1도 관절 염좌. 종료 후 1지문 동안 비강화 신체 능력이 75%로 저하됩니다.",
  },
];

const outputStats = [
  ["근력 · 악력", "× 8", "양손으로 약 400kg 들기 · 유리한 자세에서 약 1t 순간 밀기"],
  ["이동 · 가속", "× 4", "직선 단거리 최고 약 65km/h · 유지 약 80m"],
  ["반응 · 동작", "× 6", "감각 입력→회피 동작 개시 최단 0.03초"],
  ["도약 · 균형", "× 5", "수직 약 4m · 수평 약 10m · 착지 즉시 자세 복구"],
  ["육체 내구", "× 3", "둔격·낙하 강화 / 칼날·탄환·관통은 그대로 부상"],
  ["오감 · 공간감각", "× 5", "동체시력·청각 분리·진동·기류·고유수용감각"],
];

const derivedTechniques = [
  {
    code: "01",
    name: "《선행포착》",
    type: "감각 예측",
    rule: "《생환회로》 발동 중에만 사용 가능",
    description: "5배로 증폭된 감각과 6배의 반응속도로 상대의 시선, 호흡, 중심축, 근육의 떨림, 바닥 마찰과 공기 압력을 읽어 공격 직전의 징후를 포착합니다.",
    limit: "미래예지가 아닙니다. 징후가 없는 원격 발동, 체내 발생 현상, 정교한 허상과 낯선 구조의 공격에는 정확도가 떨어집니다.",
  },
  {
    code: "02",
    name: "《무음보행》",
    type: "은밀 기동",
    rule: "《생환회로》 발동 중에만 사용 가능",
    description: "증폭된 관절 제어로 발바닥의 각도와 접촉 시간을 세분화해 지면에 전달되는 충격과 진동을 줄입니다. 부서진 유리나 얇은 철판에서도 소음을 억제할 수 있습니다.",
    limit: "존재 자체를 지우지 않습니다. 열 감지, 냄새, 분진, 액체와 광학 장비에는 흔적이 남습니다.",
  },
  {
    code: "03",
    name: "《압축타》",
    type: "결정타",
    rule: "발동 1회당 한 번만 사용 가능",
    description: "전신의 8배 근력을 충돌 순간 한 점에 정렬합니다. 새로운 에너지를 만드는 것이 아니라, 이미 증폭된 힘의 축을 한 점으로 모읍니다.",
    limit: "명중 여부와 관계없이 통상 회로역류와 별도로 최대 체력 6%의 고정 자해 피해를 받고, 사용한 손목·발목 한 곳에 1도 관절 염좌가 발생합니다. 이미 다친 부위로 사용하면 2도 염좌로 악화됩니다.",
  },
  {
    code: "04",
    name: "《절박반사》",
    type: "자동 발동",
    rule: "즉사 가능성이 임계치를 넘을 때 자동 발동",
    description: "의식의 판단보다 먼저 《생환회로》를 엽니다. 자동 발동 지문도 지속시간의 1지문째로 계산되며 동일한 자해 피해를 받습니다.",
    limit: "쿨타임에는 발동하지 않습니다. 피할 공간이 없거나 0.03초보다 빠르고 감각적 전조도 없는 공격은 회피하지 못합니다.",
  },
  {
    code: "05",
    name: "《귀환선》",
    type: "생존 경로",
    rule: "《생환회로》 발동 중에만 사용 가능",
    description: "증폭된 오감으로 경사, 풍향, 울림, 구조물과 출입구를 기록하고 현재 위험과 대조해 생존 가능성이 가장 높은 경로를 인식합니다.",
    limit: "길을 만들거나 순간이동하지 않습니다. 모든 통로가 봉쇄되었거나 공간 정보가 왜곡된 경우 귀환선을 산출할 수 없습니다.",
  },
];

const counterMeasures = [
  ["비활성 상태", "발동 전과 쿨타임 4지문 동안은 평범한 인간입니다. 강화 내구도와 자동 회피가 적용되지 않습니다."],
  ["확정 자해", "매 지문 최대 체력 5% 고정 피해와 단계별 실제 손상은 피할 수 없으며, 자신의 이능으로 경감하거나 회복할 수 없습니다. 단계별 손상은 고정 피해가 육체에 나타난 양상으로 별도 체력 피해를 더하지 않습니다."],
  ["재생 능력 부재", "관통상·출혈·골절·장기 손상과 회로역류로 생긴 부상 모두 외부 치료가 필요합니다."],
  ["전방위 포화", "모든 회피 선택지를 동시에 지우는 광역 공격, 밀폐 공간과 지속 피해에 취약합니다."],
  ["감각 교란", "섬광·폭음·독성 기체·악취·지면 전체 진동이 겹치면 증폭 감각이 과부하되어 선행포착과 귀환선의 정확도가 떨어집니다."],
  ["출력 상한", "기재된 배율과 최대치를 넘을 수 없습니다. 외부 강화와 중첩해 상한을 초과하는 것도 불가능합니다."],
];

const likes = ["별일 없이 끝나는 하루", "조용한 편의점과 늦은 밤 산책", "푸딩 · 달걀 샌드위치 · 따뜻한 캔커피", "정해진 일정과 명확한 지시", "자동차 조수석과 창가 자리", "통장 잔액이 조금씩 늘어나는 것"];
const dislikes = ["갑작스러운 호출과 계획 변경", "큰 목소리 · 총성 · 경보음", "사람들 앞에서 결정을 내리는 일", "무모함을 용기로 포장하는 태도", "밀폐된 공간과 출구가 하나뿐인 장소", "“이번 임무는 쉬울 것”이라는 말"];

const observations = [
  "어느 방에 들어가든 가장 먼저 출입구, 창문, 소화기와 사각지대를 확인합니다. 본인은 이를 의식하지 못합니다.",
  "비활성 상태의 운동신경은 평범합니다. 컵이나 서류를 자주 떨어뜨리며, 위험한 물건도 회로가 열리지 않으면 자동으로 받아내지 못합니다.",
  "임무 보고서는 놀랄 만큼 정확합니다. 당시를 기억하지 못한다고 말하면서도 소리의 횟수, 이동 거리와 인원 배치를 빠짐없이 적습니다.",
  "칭찬을 받으면 부정하고, 질책을 받으면 필요 이상으로 오래 기억합니다.",
  "성물 없이, 미각성 권능 상태로 《생환회로》와 순수한 운용 능력만을 인정받아 II등급 판정을 받았습니다.",
];

function AccessGate({ onUnlock }: { onUnlock: () => void }) {
  return (
    <div className="access-gate" role="dialog" aria-modal="true" aria-labelledby="gate-title" aria-describedby="gate-description">
      <div className="gate-scan" />
      <div className="gate-corners" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="gate-card">
        <div className="gate-brand"><span className="waca-sigil">W</span><span>WACA CENTRAL ARCHIVE</span></div>
        <p className="eyebrow">RESTRICTED PERSONNEL FILE · II-GRADE</p>
        <h1 id="gate-title">열람자 생체 신호를<br />확인하십시오.</h1>
        <p className="gate-copy" id="gate-description">인가되지 않은 열람·복제·외부 반출은 중앙보안조약에 따라 기록됩니다.</p>
        <button className="unlock-button" onClick={onUnlock} autoFocus>
          <span className="button-icon">⌁</span>
          <span>ARK 열람 인증</span>
          <small>02-JP-KH</small>
        </button>
        <div className="gate-meta"><span>ARK INTEGRITY VERIFIED</span><span>CENTRAL NODE · ONLINE</span></div>
      </div>
    </div>
  );
}

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [stage, setStage] = useState(0);
  const [effects, setEffects] = useState(true);
  const [activeTechnique, setActiveTechnique] = useState(0);
  const simulatorRef = useRef<HTMLDivElement>(null);

  const currentStage = circuitStages[stage];
  const health = useMemo(() => 100 - currentStage.damage, [currentStage.damage]);

  useEffect(() => {
    document.body.style.overflow = unlocked ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [unlocked]);

  const showStage = (turn: number) => {
    setStage(turn);
    requestAnimationFrame(() => simulatorRef.current?.scrollIntoView({ behavior: effects ? "smooth" : "auto", block: "start" }));
  };

  if (!unlocked) {
    return <main className="site-shell is-locked"><AccessGate onUnlock={() => setUnlocked(true)} /></main>;
  }

  return (
    <main className={`site-shell is-unlocked ${effects ? "" : "effects-off"}`}>

      <header className="topbar">
        <a className="brand-lockup" href="#file" aria-label="아마노 코하루 파일 처음으로">
          <span className="waca-sigil small">W</span>
          <span><b>WACA</b><small>CENTRAL ARCHIVE</small></span>
        </a>
        <nav aria-label="문서 구역">
          <a href="#file">FILE</a>
          <a href="#persona">PERSONA</a>
          <a href="#circuit">CIRCUIT</a>
          <a href="#manual">MANUAL</a>
          <a href="#history">LOG</a>
        </nav>
        <button className={`sound-toggle ${effects ? "on" : ""}`} onClick={() => setEffects(!effects)} aria-label={effects ? "인터페이스 모션 끄기" : "인터페이스 모션 켜기"}>
          <span>{effects ? "◉ MOTION" : "○ STATIC"}</span>
        </button>
      </header>

      <nav className="mobile-nav" aria-label="모바일 빠른 이동">
        <a href="#file"><span>00</span>파일</a><a href="#circuit"><span>03</span>회로</a><a href="#manual"><span>04</span>운용</a><a href="#history"><span>05</span>기록</a>
      </nav>

      <section className="hero" id="file">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />

        <div className="hero-copy">
          <div className="classification-line"><span>CLASSIFIED // PERSONNEL</span><span>ARK VERIFIED</span></div>
          <p className="eyebrow mint">WACA FIELD DOSSIER · 02-JP-KH</p>
          <h1><span>아마노</span> <span className="outline-word">코하루</span></h1>
          <p className="kanji">天野 小春 <i>/</i> AMANO KOHARU</p>
          <p className="hero-quote">“겁에 질린 채로도, 그녀의 몸은 누구보다 먼저<br className="desktop-only" /> ‘살아남는 정답’을 골라낸다.”</p>
          <div className="hero-actions">
            <a className="primary-link" href="#circuit">생환회로 가동 시험 <span>↓</span></a>
            <span className="status-dot"><i /> ACTIVE PERSONNEL</span>
          </div>
        </div>

        <div className="hero-core" aria-label="생환회로 시각화">
          <div className="core-hud">
            <span>SUBJECT</span><b>WACA-1</b><span>STATUS</span><b>VERIFIED</b>
          </div>
          <div className="circuit-emblem">
            <div className="circuit-ring ring-a" />
            <div className="circuit-ring ring-b" />
            <div className="circuit-ring ring-c" />
            <div className="circuit-cross"><i /><i /></div>
            <div className="core-letter"><span>生</span><small>SURVIVAL</small></div>
          </div>
          <div className="core-caption"><span>LIMITED RELEASE</span><b>04</b><span>TURNS MAX</span></div>
        </div>

        <aside className="grade-plate">
          <span>ABILITY CLASS</span><b>II</b><small>LIMITED ACT.</small>
        </aside>
      </section>

      <section className="identity-section section-pad">
        <div className="section-marker"><span>00</span><p>IDENTIFICATION</p></div>
        <div className="identity-layout">
          <div className="section-heading">
            <p className="eyebrow">생존 특화 개체</p>
            <h2>평범함은<br />회로가 열리기 전까지.</h2>
            <p>비활성 상태의 코하루는 훈련받지 않은 22세 여성의 통상적인 신체 규격과 같습니다. 초인적인 완력·속도·감각은 일절 유지되지 않습니다.</p>
          </div>
          <div className="identity-card">
            <dl>
              <div><dt>성명</dt><dd>아마노 코하루</dd></div>
              <div><dt>나이 · 성별</dt><dd>22세 · 여성 (XX)</dd></div>
              <div><dt>국적</dt><dd>일본</dd></div>
              <div><dt>신장 · 체중</dt><dd>159cm · 48kg</dd></div>
              <div><dt>판정 등급</dt><dd><strong>II등급</strong></dd></div>
              <div><dt>소속</dt><dd>WACA</dd></div>
              <div className="wide"><dt>배속</dt><dd>제3사도 <b>대 야고보</b> 휘하 제자</dd></div>
              <div><dt>문서 식별</dt><dd>02-JP-KH</dd></div>
              <div><dt>인물 식별번호</dt><dd>WACA-1</dd></div>
            </dl>
            <div className="id-stamp">WACA <span>AUTHENTICATED</span></div>
          </div>
          <div className="status-stack">
            <div className="status-card accent"><span>이능</span><b>《생환회로》</b><small>生還回路 / SURVIVAL CIRCUIT<br />제한 활성형 신체·감각 증폭 / 생존반응형</small></div>
            <div className="status-row"><div><span>지속</span><b>최대 4지문</b></div><div><span>쿨타임</span><b>종료 후 4지문</b></div></div>
            <div className="status-row"><div><span>성물</span><b>없음</b></div><div><span>권능</span><b>미각성</b></div></div>
          </div>
        </div>
      </section>

      <section className="persona-section section-pad" id="persona">
        <div className="section-marker"><span>01</span><p>PERSONA RECORD</p></div>
        <div className="persona-top">
          <div className="section-heading">
            <p className="eyebrow mint">APPEARANCE RECORD</p>
            <h2>작고, 창백하고,<br />언제나 출구를 찾는 눈.</h2>
          </div>
          <div className="appearance-copy">
            <p>짙은 흑갈색 머리카락을 목덜미 아래에서 낮게 묶고 다니는 작은 체구의 여성입니다. 정돈하려 애쓴 흔적과 달리 잔머리가 볼과 관자놀이로 흐르며, 긴장하면 앞머리를 만지거나 귀 뒤로 넘깁니다.</p>
            <p>빛이 적은 암갈색 눈은 순하지만 늘 겁먹은 듯 크게 뜨여 있고, 잠을 설친 사람처럼 옅은 그늘이 남아 있습니다. 창백한 피부와 가는 손목·발목, 안으로 말린 어깨와 조심스러운 보폭은 비활성 상태의 평범한 육체를 그대로 보여줍니다.</p>
          </div>
        </div>
        <div className="appearance-shift">
          <article className="shift-card passive">
            <span>STATE 00</span><h3>비활성</h3>
            <p>한 치수 큰 검은 WACA 현장 재킷, 회색 셔츠와 가는 검정 넥타이. 청록색 봉제선·ARK 표시등, 검은 미끄럼 방지 장갑과 유연한 전술화를 착용합니다.</p>
            <small>사복은 무채색 후드 집업과 긴 치마 또는 헐렁한 바지. 장식품은 거의 없습니다.</small>
          </article>
          <div className="shift-arrow" aria-hidden="true"><span>ACTIVATE</span><i>→</i></div>
          <article className="shift-card active">
            <span>STATE 04</span><h3>회로 개방</h3>
            <p>홍채 가장자리에 가느다란 청록 고리가 생기고 목과 손등 혈관을 따라 같은 빛이 번집니다. 몸의 축이 즉시 바로 서며 표정에서 불필요한 감정이 사라집니다.</p>
            <small>시간이 길어질수록 빛은 탁한 적색으로 변하고 코피·피하출혈·관절의 검붉은 멍이 드러납니다.</small>
          </article>
        </div>

        <div className="personality-grid">
          <article>
            <span className="persona-code">02-A // BASELINE</span><h3>평상시</h3>
            <p>소심하고 불안이 많아 사소한 실수에도 사과부터 합니다. 큰 목소리와 시선이 집중되는 상황에 약하며, 상급자가 이름만 불러도 자신이 무언가 잘못했다고 생각합니다. 결정을 떠맡으면 최악의 경우를 끝없이 상상해 쉽게 울먹이고, 갈등을 피해 상대 요구를 먼저 들어줍니다. 자신의 성과는 운이나 우연으로 돌립니다.</p>
            <p>그러나 타인의 공포와 고통에는 유난히 민감합니다. 자신도 무서워하면서 곁에 더 약한 사람이 있으면 차마 혼자 도망치지 못합니다.</p>
          </article>
          <article className="crisis-card">
            <span className="persona-code">02-B // CRISIS</span><h3>위기 상황</h3>
            <p>울음과 떨림을 남겨둔 채 회로를 열고, 공격보다 출구·엄폐물·민간인의 위치를 먼저 훑습니다. 증폭된 신경계는 의식적 판단보다 앞서 생존 가능성이 높은 움직임을 실행합니다.</p>
            <p><b>인격 전환이나 광전사가 아닙니다.</b> 끝까지 공포를 느끼지만 발동 중에는 공포가 동작을 방해하지 못합니다. 4지문을 전부 사용하면 억눌린 공포와 누적 손상이 한꺼번에 돌아와 다음 1지문 동안 움직임이 둔해집니다.</p>
          </article>
        </div>
        <blockquote className="psych-note"><span>ARK PSYCHOLOGICAL NOTE</span>극도의 공포는 발동 조건을 충족시킬 뿐 능력의 대가를 줄여주지 않습니다. 치명적 위협은 《절박반사》를 작동시킬 수 있지만, 쿨타임 중에는 자동 발동도 일어나지 않습니다.</blockquote>
      </section>

      <section className="circuit-section section-pad" id="circuit">
        <div className="section-marker danger-marker"><span>03</span><p>ABILITY RECORD</p></div>
        <div className="circuit-intro">
          <div>
            <p className="eyebrow mint">LIMITED ACTIVE ABILITY</p>
            <h2>《생환회로》</h2>
            <p className="ability-subtitle">生還回路 / SURVIVAL CIRCUIT</p>
          </div>
          <p>평소 닫혀 있는 영력 회로를 강제로 개방해 신경 전달, 근섬유 수축, 관절 제어와 감각 처리를 일시적으로 과잉 증폭합니다. 의식적으로 발동하거나 즉사 가능성이 감지될 때 《절박반사》가 자동으로 발동합니다. 생명의 위협이 명확해질수록 동작의 오차는 줄지만, 그 대가로 근육·혈관·뼈에 실제 손상이 누적됩니다.</p>
        </div>

        <div className="simulator-shell" ref={simulatorRef} style={{ "--stage-color": currentStage.tone } as React.CSSProperties}>
          <div className="simulator-head">
            <div><span>INTERACTIVE ANALYSIS</span><b>회로역류 시뮬레이터</b></div>
            <div className="live-indicator"><i /> LIVE MODEL</div>
          </div>
          <div className="simulator-grid">
            <div className="stage-control">
              <div className="dial-wrap">
                <div className="dial" style={{ transform: `rotate(${stage * 67.5 - 135}deg)` }}><i /></div>
                <div className="dial-center"><strong>{stage}</strong><span>/ 4</span><small>TURN</small></div>
              </div>
              <div className="stage-buttons" role="group" aria-label="경과 지문 선택">
                {circuitStages.map((item) => (
                  <button key={item.turn} className={stage === item.turn ? "active" : ""} onClick={() => setStage(item.turn)} aria-pressed={stage === item.turn}>
                    <span>0{item.turn}</span><small>{item.turn === 0 ? "OFF" : `${item.turn}지문`}</small>
                  </button>
                ))}
              </div>
            </div>
            <div className="damage-readout">
              <div className="readout-title"><span>CURRENT STATE</span><b>{currentStage.label}</b></div>
              <div className="health-label"><span>잔여 체력 기준치 <small>(외부 피해 없음 가정)</small></span><b>{health}%</b></div>
              <div className="health-track"><i style={{ width: `${health}%` }} /></div>
              <div className="damage-number"><span>누적 고정 자해</span><b>{currentStage.damage}<small>%</small></b></div>
              <p>{currentStage.injury}</p>
              {stage > 0 && <div className="warning-strip">내구도 증가로 경감 불가 · 조기 해제 시에도 이미 발생한 손상 유지</div>}
            </div>
          </div>
        </div>

        <div className="penalty-ledger">
          <div className="ledger-title"><p className="eyebrow danger-text">CIRCUIT BACKFLOW · PATCH 1.1</p><h3>회로역류 // 완화된 확정 손상표</h3><span>매 지문 종료 시 최대 체력 5% 고정 자해</span></div>
          <div className="ledger-grid">
            {circuitStages.slice(1).map((item) => (
              <button key={item.turn} className={stage === item.turn ? "active" : ""} onClick={() => showStage(item.turn)} aria-pressed={stage === item.turn}>
                <span>0{item.turn} TURN</span><b>−{item.damage}%</b><p>{item.injury}</p><small>상세 시뮬레이션으로 보기 ↗</small>
              </button>
            ))}
          </div>
        </div>

        <div className="protocol-strip">
          <article><span>01 / START</span><b>발동 지문을 1지문째로 계산</b><p>의식적 발동과 《절박반사》 자동 발동 모두 동일합니다.</p></article>
          <article><span>02 / LIMIT</span><b>최대 4지문 · 조기 해제 가능</b><p>조기 해제해도 이미 발생한 고정 피해와 실제 손상은 남습니다.</p></article>
          <article><span>03 / COOLDOWN</span><b>종료 다음 지문부터 4지문</b><p>재발동·자동 발동·모든 파생 운용이 전부 불가능합니다.</p></article>
          <article className="danger-protocol"><span>04 / DAMAGE RULE</span><b>단계 손상은 중복 피해가 아니다</b><p>기재된 손상은 누적 고정 자해가 육체에 나타난 양상입니다. 별도 체력 피해로 더하지 않지만 실제 부상은 치료 전까지 남습니다.</p></article>
        </div>

        <div className="output-header"><h3>신체 능력 증가량</h3><p>모든 배율은 발동 직전 비강화 수치 기준이며 외부 강화가 겹쳐도 최대치를 넘지 않습니다.</p></div>
        <div className="output-grid">
          {outputStats.map(([name, multiplier, detail], index) => (
            <article key={name} style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}>
              <span className="output-index">0{index + 1}</span>
              <p>{name}</p><b>{multiplier}</b><small>{detail}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="manual-section section-pad" id="manual">
        <div className="section-marker"><span>04</span><p>OPERATION MANUAL</p></div>
        <div className="manual-heading">
          <div><p className="eyebrow mint">DERIVED OPERATIONS</p><h2>파생 운용</h2></div>
          <p>번호를 눌러 세부 운용과 파훼 조건을 확인하십시오. 다섯 운용 모두 생환회로의 물리적 증폭을 응용하며, 독립된 초능력을 추가로 만들지 않습니다.</p>
        </div>
        <div className="technique-console">
          <div className="technique-list" role="group" aria-label="파생 운용 선택">
            {derivedTechniques.map((technique, index) => (
              <button key={technique.code} aria-pressed={activeTechnique === index} className={activeTechnique === index ? "active" : ""} onClick={() => setActiveTechnique(index)}>
                <span>{technique.code}</span><b>{technique.name}</b><small>{technique.type}</small><i>↗</i>
              </button>
            ))}
          </div>
          <article className="technique-detail" aria-live="polite">
            <div className="detail-top"><span>OPERATION {derivedTechniques[activeTechnique].code}</span><small>{derivedTechniques[activeTechnique].type}</small></div>
            <h3>{derivedTechniques[activeTechnique].name}</h3>
            <p className="technique-rule">{derivedTechniques[activeTechnique].rule}</p>
            <p>{derivedTechniques[activeTechnique].description}</p>
            <div className="limit-box"><span>LIMIT / COST</span><p>{derivedTechniques[activeTechnique].limit}</p></div>
          </article>
        </div>

        <div className="compressed-warning">
          <div><span>EXTRA SELF-DAMAGE</span><b>+6%</b></div>
          <p><strong>《압축타》 전용:</strong> 통상적인 지문당 5% 회로역류와 <em>별도</em>로 적용됩니다. 명중 여부와 관계없이 고정 피해와 사용 관절의 1도 염좌가 발생하며, 한 번의 발동 중 단 한 번만 사용할 수 있습니다.</p>
        </div>

        <div className="counter-heading"><div><p className="eyebrow danger-text">COUNTERMEASURE FILE</p><h2>한계 및 파훼 기준</h2></div><div className="not-ability"><span>금지 오인</span><p>상시 강화 · 미래예지 · 순간이동 · 불사 · 무한 체력 · 자동회복 · 공격 무효화 능력이 아닙니다.</p></div></div>
        <div className="counter-grid">
          {counterMeasures.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="history-section section-pad" id="history">
        <div className="section-marker"><span>05</span><p>ARCHIVE LOG</p></div>
        <div className="history-layout">
          <div className="history-heading"><p className="eyebrow mint">RECRUITMENT HISTORY</p><h2>살아 돌아온<br />첫 네 지문.</h2><div className="history-year">AGE<br /><b>20</b></div></div>
          <div className="timeline">
            <article><span>00 / BEFORE</span><h3>이능과 무관한 삶</h3><p>일본의 평범한 가정에서 태어났습니다. 운동신경이 특별히 좋지 않았고, 잦은 긴장 때문에 자주 넘어지고 물건을 떨어뜨렸습니다.</p></article>
            <article><span>01 / AWAKEN</span><h3>대규모 이능 범죄</h3><p>스무 살 무렵 즉사 위협을 감지한 《절박반사》가 처음 회로를 열었습니다. 네 지문 동안 붕괴 현장의 공격과 낙하물을 피하며 생존자들을 출구까지 이끌었습니다.</p></article>
            <article><span>02 / COST</span><h3>능력과 대가의 증명</h3><p>종료 직후 전신 피하출혈과 오른쪽 종아리의 1도 근파열, 왼쪽 손목의 1도 염좌로 주저앉았습니다. 구조 기록의 비정상적인 이동 속도와 이 부상이 능력의 존재와 대가를 함께 입증했습니다.</p></article>
            <article><span>03 / WACA</span><h3>대 야고보의 회수</h3><p>현장에 투입된 제3사도 대 야고보가 코하루를 회수했고, WACA 검사에서 《생환회로》가 확인되었습니다.</p></article>
            <article><span>04 / NOW</span><h3>한 명을 더 데리고 돌아오기 위해</h3><p>조직 생활도 현장 임무도 원하지 않았지만, 사건의 기억이 제거되더라도 같은 위험에 다시 휘말릴 수 있다는 판단과 자신의 몸이라면 누군가 한 명쯤 더 데리고 돌아올 수 있다는 사실 때문에 제자 편입을 받아들였습니다. 임무 전마다 사직서를 고민하지만 실제로 제출한 적은 없습니다.</p></article>
          </div>
        </div>

        <div className="preference-grid">
          <article className="preference-card likes"><div className="preference-title"><span>L</span><div><small>LIKES</small><h3>선호</h3></div></div><ul>{likes.map(item => <li key={item}>{item}</li>)}</ul></article>
          <article className="preference-card dislikes"><div className="preference-title"><span>H</span><div><small>HATES</small><h3>비선호</h3></div></div><ul>{dislikes.map(item => <li key={item}>{item}</li>)}</ul></article>
        </div>

        <div className="observations">
          <div className="observation-heading"><p className="eyebrow">07 / ADDITIONAL OBSERVATIONS</p><h2>ARK 부가 관찰 기록</h2></div>
          <ol>{observations.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
          <blockquote><span>제3사도 대 야고보 평가</span>“코하루의 공포는 교정 대상이 아니라, <b>살아 돌아오려는 의지가 만들어내는 감각기관</b>이다.”</blockquote>
        </div>
      </section>

      <section className="theme-section">
        <div className="theme-wave" aria-hidden="true">⌁⌁⌁⌁⌁⌁⌁⌁⌁⌁⌁⌁</div>
        <div className="theme-code"><span>THEME TRACK</span><b>REOL</b></div>
        <div className="theme-copy"><p className="eyebrow">REOL</p><h2>第六感</h2><p>THE SIXTH SENSE</p></div>
        <p className="theme-note">두려움이 임계점을 넘는 순간 닫혀 있던 감각과 육체가 폭발적으로 열리고, 짧은 제한시간 안에 살아남을 답을 찾아낸다는 점에서 코하루의 이능과 맞닿습니다.</p>
        <a href="https://www.youtube.com/watch?v=Ue6VQTcKPQo" target="_blank" rel="noreferrer" aria-label="Reol 제육감 유튜브에서 듣기"><span>▶</span><b>테마곡 듣기</b><small>YOUTUBE ↗</small></a>
      </section>

      <footer className="site-footer"><span>WACA // CENTRAL ARCHIVE</span><p>END OF FILE // 수정 이력과 열람 로그는 ARK 중앙기록보관소에 자동 보존됩니다.</p><span>DOCUMENT 02-JP-KH</span></footer>
    </main>
  );
}
