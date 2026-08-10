"use client";

import { useMemo, useState } from "react";

type AbilityKey = "charge" | "circuit";

const identity = [
  ["이름", "시노노메 아카네 (東雲 茜)"],
  ["죄명", "레드라인 · REDLINE"],
  ["나이", "28세"],
  ["성별", "XX"],
  ["국적", "일본"],
  ["신장 · 체중", "175cm · 66kg"],
  ["소속", "칠죄교단"],
  ["부서", "분노의 죄인"],
  ["등급", "II등급"],
];

const combatLoop = [
  {
    number: "01",
    title: "충돌",
    body: "강화하지 않은 해머 타격과 근접전을 걸어 유효한 충격을 주고받습니다.",
  },
  {
    number: "02",
    title: "축전",
    body: "타격의 반동을 최대 6펄스까지 신경과 근육에 저장합니다. 받은 피해는 그대로 남습니다.",
  },
  {
    number: "03",
    title: "전로",
    body: "전극을 고정해 상대가 피해야 할 직선 경로를 만들고 움직임을 제한합니다.",
  },
  {
    number: "04",
    title: "선택",
    body: "6펄스를 레드라인 돌진과 삼각 폐로 중 하나에 전부 사용합니다. 둘을 연속으로 쓸 수 없습니다.",
  },
];

const limits = [
  {
    title: "피해 보존",
    body: "공격을 받아 펄스를 얻더라도 상처와 통증은 줄어들지 않습니다. 무리한 축전은 그대로 패배로 이어집니다.",
  },
  {
    title: "직선 경로",
    body: "방전은 전극 사이를 곧게 지날 뿐 추적하거나 꺾이지 않습니다. 경로를 읽고 벗어날 수 있습니다.",
  },
  {
    title: "전극 파괴",
    body: "활성 전극을 뽑거나 부수면 전로가 끊깁니다. 움직이는 물체와 생명체에는 전극을 지정할 수 없습니다.",
  },
  {
    title: "침수 환경",
    body: "넓은 물과 금속 바닥에서는 전류가 임의로 접지됩니다. 사용자와 아군도 피해를 입어 정밀 운용이 어렵습니다.",
  },
];

function PulseConsole() {
  const [pulse, setPulse] = useState(0);
  const [message, setMessage] = useState("충격 기록을 시작하십시오.");
  const [anchors, setAnchors] = useState([false, false, false]);

  const activeAnchors = anchors.filter(Boolean).length;
  const lineStates = useMemo(
    () => ({
      left: anchors[0] && anchors[1],
      right: anchors[0] && anchors[2],
      bottom: anchors[1] && anchors[2],
    }),
    [anchors],
  );

  const addPulse = () => {
    const next = Math.min(6, pulse + 1);
    setPulse(next);
    setMessage(
      next === 6
        ? "6/6 · REDLINE READY"
        : `${next}/6 · 생체 축전 진행 중`,
    );
  };

  const spendPulse = (amount: number, label: string) => {
    if (pulse < amount) return;
    setPulse((current) => current - amount);
    setMessage(`${label} · ${amount}펄스 소비`);
    navigator.vibrate?.(20);
  };

  const toggleAnchor = (index: number) => {
    setAnchors((current) =>
      current.map((active, anchorIndex) =>
        anchorIndex === index ? !active : active,
      ),
    );
    setMessage("전극 상태가 변경되었습니다.");
  };

  const reset = () => {
    setPulse(0);
    setAnchors([false, false, false]);
    setMessage("모의 기록이 초기화되었습니다.");
  };

  return (
    <div className={`console-shell ${pulse === 6 ? "console-ready" : ""}`}>
      <div className="console-heading">
        <div>
          <p className="eyebrow">ABILITY DEMONSTRATION</p>
          <h3>충격 축전 모의 기록</h3>
        </div>
        <output className="pulse-count" aria-live="polite">
          {pulse}<span>/6</span>
        </output>
      </div>

      <div className="pulse-track" aria-label={`현재 ${pulse}펄스`}>
        {Array.from({ length: 6 }, (_, index) => (
          <span
            className={`pulse-node ${index < pulse ? "active" : ""}`}
            key={index}
          >
            {index + 1}
          </span>
        ))}
      </div>

      <div className="console-actions">
        <button type="button" className="button-hot" onClick={addPulse}>
          충격 기록 +1
        </button>
        <button
          type="button"
          onClick={() => spendPulse(2, "직선 방전")}
          disabled={pulse < 2 || activeAnchors < 2}
        >
          직선 방전 −2
        </button>
        <button
          type="button"
          onClick={() => spendPulse(6, "레드라인 발동")}
          disabled={pulse < 6}
        >
          레드라인 −6
        </button>
        <button type="button" onClick={reset}>
          초기화
        </button>
      </div>

      <p className="console-message" aria-live="polite">
        <span aria-hidden="true" /> {message}
      </p>

      <div className="circuit-demo">
        <div className="circuit-copy">
          <p className="eyebrow">CLOSED CIRCUIT</p>
          <h4>전극을 눌러 전로를 연결하십시오.</h4>
          <p>
            두 점 사이의 직선만 방전됩니다. 세 전극이 연결되어도 삼각형
            내부는 공격 범위가 아닙니다.
          </p>
          <div className="circuit-status">
            활성 전극 <strong>{activeAnchors}/3</strong>
          </div>
        </div>

        <div className="circuit-field" aria-label="전극 배치 모의도">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <line
              className={lineStates.left ? "wire active" : "wire"}
              x1="50"
              y1="17"
              x2="18"
              y2="78"
            />
            <line
              className={lineStates.right ? "wire active" : "wire"}
              x1="50"
              y1="17"
              x2="82"
              y2="78"
            />
            <line
              className={lineStates.bottom ? "wire active" : "wire"}
              x1="18"
              y1="78"
              x2="82"
              y2="78"
            />
          </svg>
          {[
            ["전극 1", "anchor-top"],
            ["전극 2", "anchor-left"],
            ["전극 3", "anchor-right"],
          ].map(([label, className], index) => (
            <button
              type="button"
              key={label}
              aria-pressed={anchors[index]}
              aria-label={`${label} ${anchors[index] ? "제거" : "활성화"}`}
              className={`anchor ${className} ${anchors[index] ? "active" : ""}`}
              onClick={() => toggleAnchor(index)}
            >
              <span>{index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="simulation-note">
        ※ 위 조작은 능력의 자원과 직선 판정을 설명하기 위한 모의
        시뮬레이션입니다.
      </p>
    </div>
  );
}

function AbilityArchive() {
  const [active, setActive] = useState<AbilityKey>("charge");

  const selectByArrow = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      setActive((current) => (current === "charge" ? "circuit" : "charge"));
    }
  };

  return (
    <div className="ability-archive">
      <div className="ability-tabs" role="tablist" aria-label="능력 선택">
        <button
          type="button"
          role="tab"
          aria-selected={active === "charge"}
          onClick={() => setActive("charge")}
          onKeyDown={selectByArrow}
        >
          <span>01</span> 박동축전
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={active === "circuit"}
          onClick={() => setActive("circuit")}
          onKeyDown={selectByArrow}
        >
          <span>02</span> 폐로방전
        </button>
      </div>

      {active === "charge" ? (
        <article className="ability-panel" role="tabpanel">
          <div className="ability-title-row">
            <div>
              <p className="eyebrow">ABILITY 01 · BIOELECTRIC STORAGE</p>
              <h3>《박동축전》</h3>
            </div>
            <div className="timing-group">
              <span>축전 유지 6지문</span>
              <span>쿨타임 없음</span>
            </div>
          </div>
          <p className="ability-lead">
            교전 중 주고받은 물리적 충격의 반동을 전기성 영력인
            ‘펄스’로 변환해 신경과 근육에 저장합니다.
          </p>
          <div className="rule-grid">
            <div>
              <h4>발동 조건</h4>
              <p>
                공격이 상대 또는 방어에 직접 충돌하거나, 자신이 공격을
                직접 받아 냈을 때 1펄스를 얻습니다. 한 지문 최대 2펄스,
                총 6펄스까지 저장합니다.
              </p>
            </div>
            <div>
              <h4>일반 효과</h4>
              <p>
                1펄스로 5m 직선 가속 또는 타격 1회를 강화합니다.
                2펄스로는 최대 8m 직선 가속이나 더 강한 근접 타격을
                사용합니다.
              </p>
            </div>
            <div>
              <h4>패널티</h4>
              <p>
                축전해도 받은 피해는 줄지 않습니다. 5펄스부터 이명과
                손떨림이 발생하고, 6펄스를 2지문 넘게 보유하면 전량이
                강제로 소멸합니다.
              </p>
            </div>
            <div>
              <h4>축전 불가</h4>
              <p>
                자해, 벽 두드리기, 아군과 합의한 공격, 기계 진동 및
                외부 전기로는 펄스를 만들 수 없습니다.
              </p>
            </div>
          </div>
          <div className="maximum-box">
            <div>
              <p className="eyebrow">MAXIMUM OUTPUT</p>
              <h4>레드라인</h4>
            </div>
            <div className="timing-group">
              <span>지속 1지문</span>
              <span>쿨타임 5지문</span>
            </div>
            <p>
              6펄스를 전신에 흘려 최대 12m의 직선 돌진과 근접 공격
              1회를 연결합니다. 방향 전환과 순간이동은 불가능합니다.
              사용 후 2지문 동안 전력 질주와 정교한 무기 조작이
              어려우며 부정맥과 근섬유 손상이 남습니다.
            </p>
          </div>
        </article>
      ) : (
        <article className="ability-panel" role="tabpanel">
          <div className="ability-title-row">
            <div>
              <p className="eyebrow">ABILITY 02 · CLOSED DISCHARGE</p>
              <h3>《폐로방전》</h3>
            </div>
            <div className="timing-group">
              <span>지속 1지문</span>
              <span>쿨타임 2지문</span>
            </div>
          </div>
          <p className="ability-lead">
            고정된 전극 사이에 전위차를 만들고, 두 지점을 잇는 직선에
            한해 저장한 펄스를 방전합니다.
          </p>
          <div className="rule-grid">
            <div>
              <h4>발동 조건</h4>
              <p>
                움직이지 않는 무생물에 전극을 고정하고 직접 활성화해야
                합니다. 최대 3개까지 활성화하며 활성 상태는 4지문
                유지됩니다.
              </p>
            </div>
            <div>
              <h4>일반 효과</h4>
              <p>
                전극 2개와 2펄스를 사용합니다. 최대 거리 18m, 폭 1m의
                단발 직선 방전으로 표면 화상과 근육 경련을 일으킵니다.
              </p>
            </div>
            <div>
              <h4>전조와 회피</h4>
              <p>
                발동 직전 전극에서 황백색 빛과 충전음이 발생합니다.
                방전은 적을 추적하거나 꺾이지 않으며 벽을 관통하지
                않습니다.
              </p>
            </div>
            <div>
              <h4>파훼법</h4>
              <p>
                전극을 파괴하거나 경로 밖으로 이탈할 수 있습니다.
                절연체와 침수 지형은 전류를 차단하거나 엉뚱한 곳으로
                분산시킵니다.
              </p>
            </div>
          </div>
          <div className="maximum-box">
            <div>
              <p className="eyebrow">MAXIMUM OUTPUT</p>
              <h4>삼각 폐로</h4>
            </div>
            <div className="timing-group">
              <span>지속 2지문</span>
              <span>쿨타임 6지문</span>
            </div>
            <p>
              전극 3개와 6펄스를 소비해 각 변 10m 이하의 삼각 방전선을
              형성합니다. 내부 전체가 아니라 세 변만 공격 범위입니다.
              최대 출력은 소형 건물 1채의 주요 구조부를 부분 붕괴시키는
              수준입니다. 사용 후 5지문 동안 두 능력을 사용할 수
              없습니다.
            </p>
          </div>
        </article>
      )}

      <details className="judgement-note">
        <summary>판정상 주의</summary>
        <p>
          자동 명중·필중·즉사·내부 장기 지정 파괴 효과는 없습니다.
          전기 그 자체로 변신하거나 번개 속도로 이동하지 않으며, 타인의
          전격에 면역도 아닙니다. 전력망·기상·자기력·전자기파를 조작할
          수 없습니다.
        </p>
      </details>
    </div>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="시노노메 아카네 프로필 맨 위로">
          <span className="brand-mark">VII</span>
          <span>
            칠죄교단
            <small>SEPTEM PECCATA · CONFIDENTIAL ARCHIVE</small>
          </span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#profile">인물</a>
          <a href="#ability">능력</a>
          <a href="#record">기록</a>
        </nav>
        <div className="wrath-index" aria-label="분노 계열">
          {Array.from({ length: 7 }, (_, index) => (
            <span key={index} className={index === 3 ? "active" : ""} />
          ))}
          <b>IRA</b>
        </div>
      </header>

      <section className="hero section-wrap" id="top">
        <div className="hero-copy">
          <div className="classification-row">
            <span>분노의 죄인</span>
            <span>II등급</span>
            <span>JP–28</span>
          </div>
          <p className="hero-code">SUBJECT 07 · BIOELECTRIC COMBATANT</p>
          <h1>
            <span>시노노메 아카네</span>
            <strong>REDLINE</strong>
          </h1>
          <blockquote>
            “참으라고 하지 마십시오. 끝까지 부딪치고, 남은 쪽이
            옳았다고 하면 됩니다.”
          </blockquote>
          <p className="hero-summary">
            맞부딪친 충격을 자신의 신경에 축전하고, 전장을 붉은 전로로
            가르는 칠죄교단의 돌격 전투원. 그녀의 분노는 폭발이
            아니라 끝내지 못한 싸움을 향한 갈망입니다.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#ability">
              능력 기록 열람
            </a>
            <a href="#record">죄인의 기록</a>
          </div>
        </div>

        <div className="hero-emblem" aria-hidden="true">
          <div className="emblem-rings">
            <span className="ring-one" />
            <span className="ring-two" />
            <span className="ring-three" />
            <div className="emblem-core">
              <small>ANGER INDEX</small>
              <b>VI</b>
              <strong>RED<br />LINE</strong>
            </div>
          </div>
          <div className="heartbeat-line">
            <span />
          </div>
          <p>IMPACT → PULSE → DISCHARGE</p>
        </div>
      </section>

      <div className="status-ribbon" aria-label="핵심 정보">
        <span><b>소속</b> 칠죄교단</span>
        <span><b>죄목</b> 분노</span>
        <span><b>능력</b> 2개</span>
        <span><b>성물</b> 없음</span>
        <span><b>권능</b> 미각성</span>
      </div>

      <section className="profile-section section-wrap" id="profile">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 · SINNER PROFILE</p>
            <h2>억눌린 충격은<br />반드시 돌아온다.</h2>
          </div>
          <p>
            교단 내에서도 침묵이 긴 전투원입니다. 다만 강한 상대를
            발견한 순간만큼은 표정이 선명해집니다.
          </p>
        </div>

        <div className="identity-layout">
          <dl className="identity-list">
            {identity.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="profile-narrative">
            <article>
              <p className="eyebrow">APPEARANCE</p>
              <h3>외관</h3>
              <p>
                구릿빛이 감도는 짙은 갈색 머리카락을 쇄골 아래까지
                기르고 임무 중에는 낮게 묶습니다. 옅게 그을린 피부와
                단련된 체격, 오래 붕대를 감아 온 굳은 손마디가
                눈에 띕니다. 평상시 눈동자는 탁한 올리브색이지만 능력이
                활성화되면 홍채 가장자리에 호박색 고리가 나타납니다.
              </p>
              <p>
                축전량이 한계에 가까워질수록 관자놀이와 목, 양팔의
                혈관을 따라 적동색 빛이 심장 박동에 맞춰 점멸합니다.
                왼쪽 쇄골에서 견갑골까지 이어지는 갈라진 화상 흉터는
                각성 당시 입은 흔적입니다.
              </p>
            </article>
            <article>
              <p className="eyebrow">TEMPERAMENT</p>
              <h3>성격</h3>
              <div className="keyword-row">
                <span>직선적</span><span>호전적</span><span>대담함</span>
                <span>약속 중시</span><span>강자 존중</span>
              </div>
              <p>
                돌려 말하지 않으며, 힘과 의지가 가장 정직한 언어라고
                믿습니다. 강한 상대와 서로의 한계를 확인하는 순간을
                진심으로 즐기지만 약자를 일방적으로 짓밟는 행위에는
                흥미를 느끼지 못합니다. 항복한 상대를 공격하는 것은
                승부가 아니라 처형일 뿐이라고 말합니다.
              </p>
              <p>
                그러나 자신의 싸움을 방해하거나 강제로 끝내려는 존재를
                극도로 증오합니다. 부상과 철수 명령까지 ‘아직 싸울 수
                있다’는 판단 아래 무시하는 경향이 있으며, 원하는
                결말을 보기 위해서는 동료와 민간인의 위험도 감수합니다.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="wrath-section">
        <div className="section-wrap wrath-layout">
          <div className="wrath-word" aria-hidden="true">WRATH</div>
          <div className="wrath-copy">
            <p className="eyebrow">칠죄교단 · IRA</p>
            <h2>그녀의 분노는<br />끝나지 않은 승부다.</h2>
            <p>
              시노노메 아카네가 원하는 것은 파괴 그 자체가 아닙니다.
              누구도 개입하지 못하는 마지막 순간까지 상대와 힘을
              맞부딪치고, 자신의 한계를 확인하는 것입니다. WACA의
              통제와 철수 명령은 그녀에게 인간을 미완성으로 남기는
              족쇄였습니다.
            </p>
            <p>
              분노의 죄는 그 갈망을 억누르지 말라고 속삭였습니다.
              현재 그녀는 강한 능력자와 타락자를 정면에서 상대하고
              연합의 진압선을 깨뜨리는 돌격 전투원으로 활동합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="ability-section section-wrap" id="ability">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">02 · ABILITY ARCHIVE</p>
            <h2>충격을 저장하고,<br />전장을 전로로 만든다.</h2>
          </div>
          <p>
            보유 능력은 정확히 두 개입니다. 아래의 가속과 최대 출력은
            두 능력의 응용이며 별개의 능력이 아닙니다.
          </p>
        </div>

        <AbilityArchive />
        <PulseConsole />
      </section>

      <section className="combat-section section-wrap">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">03 · COMBAT SEQUENCE</p>
            <h2>전투 운용</h2>
          </div>
          <p>
            능력으로 피해를 지우는 방어형이 아닙니다. 다치기 전에
            전로를 완성해야 하는 고위험 근접 제압형입니다.
          </p>
        </div>
        <div className="combat-loop">
          {combatLoop.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="limits-section section-wrap">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">04 · COUNTERMEASURES</p>
            <h2>패널티와 파훼법</h2>
          </div>
          <p>
            상대가 규칙을 파악하면 분명히 대응할 수 있습니다. 원거리
            견제와 전극 파괴가 가장 직접적인 파훼법입니다.
          </p>
        </div>
        <div className="limits-grid">
          {limits.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="record-section" id="record">
        <div className="section-wrap record-layout">
          <div className="record-heading">
            <p className="eyebrow">05 · ORIGIN RECORD</p>
            <h2>속삭임이<br />들린 밤</h2>
            <span className="record-number">28–R/07</span>
          </div>
          <div className="record-copy">
            <p>
              시노노메 아카네는 과거 도쿄 지하 고압 설비 긴급복구
              기사이자 불법 이능 격투장의 단골 선수였습니다. 정해진
              규칙 안에서 서로가 쓰러질 때까지 맞부딪치는 시간만큼은
              세상의 모든 명령과 책임에서 벗어날 수 있다고 믿었습니다.
            </p>
            <p>
              어느 날 이능 격투장을 급습한 WACA와 교전하던 도중 시설이
              붕괴했습니다. 상대는 철수했고 그녀에게도 투항 명령이
              내려졌습니다. 승부가 타인의 명령으로 끝나는 순간,
              아카네는 자신이 다치는 것보다 끝을 확인하지 못하는 일을 더
              두려워한다는 사실을 깨달았습니다.
            </p>
            <blockquote>
              “왜 멈추지? 네가 원하는 결말은 아직 오지 않았는데.”
            </blockquote>
            <p>
              사탄의 속삭임과 함께 영력이 각성했습니다. 그녀는 무너진
              구조물의 충격을 펄스로 바꾸어 진압선을 돌파했고, 현장에
              접근한 분노의 죄인들을 따라 사라졌습니다. 사건은 일반
              사회에는 도쿄 도심 변전 설비 폭발 사고로 기록되어 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="final-section section-wrap">
        <div className="final-grid">
          <article>
            <p className="eyebrow">EQUIPMENT</p>
            <h3>성물 · 없음</h3>
            <p>
              길이 84cm의 구조용 전술 해머와 전극 말뚝 4개를
              사용합니다. 모두 독자적인 힘이 없는 일반 금속 장비이며
              전기를 생성·저장·증폭하지 않습니다.
            </p>
          </article>
          <article>
            <p className="eyebrow">AUTHORITY</p>
            <h3>권능 · 미각성</h3>
            <p>
              신청 시점에는 권능을 사용할 수 없습니다. 추후 스토리
              진행 중 각성할 경우 관리진의 별도 검사를 거칩니다.
            </p>
          </article>
          <article>
            <p className="eyebrow">PREFERENCE</p>
            <h3>L / H</h3>
            <p>
              <b>L</b> 강한 상대, 정면 승부, 천둥 직전의 공기, 진한
              커피, 약속을 지키는 사람.
            </p>
            <p>
              <b>H</b> 중단된 승부, 강제 철수, 비겁한 기습, 장비를
              함부로 만지는 사람, 침수된 전장.
            </p>
          </article>
        </div>
        <div className="final-quote">
          <span>FINAL NOTE</span>
          <p>
            “맞은 만큼 돌려주는 건 복수입니다. 저는 그보다 더 멀리
            갑니다. 견딘 모든 순간을, 마지막 한 번에 걸겠습니다.”
          </p>
        </div>
      </section>

      <footer>
        <div className="footer-seal" aria-hidden="true">IRA</div>
        <div>
          <strong>칠죄교단</strong>
          <p>
            SEPTEM PECCATA · 분노 계열 죄인 기록 · 무단 열람 및 복제를
            금함
          </p>
        </div>
        <span>ARCHIVE CLOSED / REDLINE</span>
      </footer>
    </main>
  );
}
