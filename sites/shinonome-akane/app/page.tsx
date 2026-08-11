"use client";

import { useMemo, useState } from "react";

type AbilityKey = "charge" | "circuit";

const identity = [
  ["이름", "시노노메 아카네 (東雲 茜)"],
  ["죄명", "레드라인 · REDLINE"],
  ["나이", "22세"],
  ["성별", "XX"],
  ["국적", "일본"],
  ["신장 · 체중", "175cm · 66kg"],
  ["소속", "칠죄교단"],
  ["부서", "분노의 죄인"],
  ["등급", "II등급"],
  ["최대 출력", "중형 건물 1채 파괴 수준"],
  ["성물", "쇄뢰(鎖雷)"],
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
    body: "전극을 설치하고, 해머 유효타로 상대에게 이동 전극 표식을 남겨 회로의 종점으로 만듭니다.",
  },
  {
    number: "04",
    title: "선택",
    body: "6펄스를 레드라인 돌진과 쇄뢰의 삼각 폐로 중 하나에 전부 사용합니다. 둘을 연속으로 쓸 수 없습니다.",
  },
];

const limits = [
  {
    title: "피해 보존",
    body: "펄스를 얻기 위해 받아 낸 공격의 상처와 통증은 줄어들지 않습니다. 면역 범위를 넘는 전기 공격은 피해를 입어도 펄스를 주지 않으며, 무리한 축전은 그대로 패배로 이어집니다.",
  },
  {
    title: "축전 과부하",
    body: "마지막 축전 후 5지문이 지나면 전량 소멸합니다. 5펄스부터 이명과 손떨림이 생기며, 6펄스는 1지문 안에 쓰지 않으면 전량 소멸하고 1지문 동안 다시 축전할 수 없습니다.",
  },
  {
    title: "직선 경로",
    body: "일반 방전은 전극 사이를 곧게 지날 뿐 꺾이지 않습니다. 이동 전극 방전도 먼저 해머 유효타를 맞혀야 성립합니다.",
  },
  {
    title: "전극 파괴",
    body: "고정 전극은 한 지문에 1개만 설치할 수 있습니다. 활성 전극을 뽑거나 부수면 전로가 끊기며, 파괴되거나 삼각 폐로에 소비된 전극은 5지문 동안 재생되지 않습니다.",
  },
  {
    title: "침수 환경",
    body: "면역 범위 안에서는 감전되지 않지만, 넓은 물과 금속 바닥에서는 방전 경로가 임의로 접지됩니다. 아군과 주변 시설은 보호되지 않습니다.",
  },
  {
    title: "최대 출력 후유증",
    body: "레드라인 뒤 2지문 동안 새 펄스를 얻을 수 없고 전력 질주와 정밀 조작이 어려워집니다. 삼각 폐로 뒤에는 성물의 모든 능력이 6지문 동안 봉인됩니다.",
  },
];

function PulseConsole() {
  const [pulse, setPulse] = useState(0);
  const [message, setMessage] = useState("충격 기록을 시작하십시오.");
  const [anchors, setAnchors] = useState([false, false, false]);
  const [marked, setMarked] = useState(false);

  const activeAnchors = anchors.filter(Boolean).length;
  const anchorPoints = [
    [50, 17],
    [18, 78],
    [82, 78],
  ];
  const firstActiveAnchor = Math.max(0, anchors.findIndex(Boolean));
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
    setMarked(false);
    setMessage("모의 기록이 초기화되었습니다.");
  };

  const firePursuit = () => {
    if (pulse < 3 || activeAnchors < 1 || !marked) return;
    spendPulse(3, "추뢰 폐로");
    setMarked(false);
  };

  return (
    <div className={`console-shell ${pulse === 6 ? "console-ready" : ""}`}>
      <div className="console-heading">
        <div>
          <p className="eyebrow">ABILITY DEMONSTRATION</p>
          <h3>펄스 · 쇄뢰 회로 모의 기록</h3>
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
          onClick={firePursuit}
          disabled={pulse < 3 || activeAnchors < 1 || !marked}
        >
          추뢰 폐로 −3
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
          <h4>고정 전극과 이동 표식을 연결하십시오.</h4>
          <p>
            숫자 전극은 고정 회로를, 중앙의 표식은 해머 유효타로 남긴
            이동 전극을 뜻합니다.
          </p>
          <div className="circuit-status">
            고정 전극 <strong>{activeAnchors}/3</strong> · 이동 전극
            <strong>{marked ? "1" : "0"}/1</strong>
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
            <line
              className={marked && activeAnchors > 0 ? "wire active" : "wire"}
              x1={anchorPoints[firstActiveAnchor][0]}
              y1={anchorPoints[firstActiveAnchor][1]}
              x2="50"
              y2="57"
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
          <button
            type="button"
            aria-pressed={marked}
            aria-label={`이동 전극 표식 ${marked ? "제거" : "활성화"}`}
            className={`anchor moving-electrode ${marked ? "active" : ""}`}
            onClick={() => {
              setMarked((current) => !current);
              setMessage("이동 전극 표식 상태가 변경되었습니다.");
            }}
          >
            <span>標</span>
          </button>
        </div>
      </div>

      <p className="simulation-note">
        ※ 위 조작은 이능과 성물의 자원·전극 판정을 설명하기 위한 모의
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
      <div className="ability-tabs" role="tablist" aria-label="이능과 성물 선택">
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
          <span>02</span> 성물 · 쇄뢰
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
              <span>축전 유지 5지문</span>
              <span>쿨타임 없음</span>
            </div>
          </div>
          <p className="ability-lead">
            쉽게 말하면, 적과 직접 때리고 맞으며 ‘펄스’라는 전투
            게이지를 채운 뒤 이동과 공격에 사용하는 능력입니다.
          </p>
          <div className="rule-grid">
            <div>
              <h4>① 펄스 획득</h4>
              <p>
                자신의 공격이 상대나 방어에 직접 부딪치거나, 자신이
                공격을 직접 받으면 1펄스를 얻습니다. 한 지문 최대
                2펄스, 총 6펄스까지 저장합니다.
              </p>
            </div>
            <div>
              <h4>② 펄스 사용</h4>
              <p>
                1펄스는 5m 직선 가속이나 타격 1회 강화에, 2펄스는 최대
                8m 직선 가속이나 더욱 강한 근접 타격 1회에 사용합니다.
              </p>
            </div>
            <div>
              <h4>③ II등급 이하 전기 완전 면역</h4>
              <p>
                II등급 능력의 최대 출력 이하로 환산되는 자연·인공 전기와
                II등급 이하의 천둥·낙뢰·번개·전기성 능력 및 공격에 완전
                면역입니다. 해당 범위의 감전·전기성 열·마비는 무효화합니다.
                I등급·사도급·권능의 전기는 면역 대상이 아니며 일반적인
                영력 방어 판정을 거쳐 피해를 받습니다.
              </p>
            </div>
            <div>
              <h4>④ 제한과 패널티</h4>
              <p>
                전기 공격은 면역 여부와 관계없이 펄스를 충전하지 않습니다.
                자해·벽 두드리기·합의한 공격으로도 충전할 수 없습니다.
                마지막 축전 후 5지문이 지나면 보유 펄스가 전부 소멸합니다.
                5펄스부터 이명과 손떨림으로 회피와 정밀 조작이 둔해집니다.
                6펄스는 1지문 안에 사용해야 하며, 넘기면 전량 소멸하고
                1지문 동안 축전할 수 없습니다. 펄스를 얻으며 받은 피해는
                그대로 남습니다.
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
              1회를 연결합니다. 충돌 지점에 집중되는 최대 위력은
              <strong> 중형 건물 1채 파괴 수준</strong>입니다. 방향
              전환과 순간이동은 불가능하며, 사용 후 2지문 동안 펄스를
              새로 얻을 수 없고 전력 질주와 정교한 무기 조작이
              어려워집니다.
            </p>
          </div>
        </article>
      ) : (
        <article className="ability-panel" role="tabpanel">
          <div className="ability-title-row">
            <div>
              <p className="eyebrow">RELIC 01 · CLOSED DISCHARGE</p>
              <h3>성물 《쇄뢰(鎖雷)》</h3>
            </div>
            <div className="timing-group">
              <span>전극 유지 4지문</span>
              <span>설치 쿨타임 없음</span>
            </div>
          </div>
          <p className="ability-lead">
            붉은 전극 3개를 장전한 84cm 흑철 전술 해머입니다. 전극으로
            종점을 지정한 뒤 아카네의 펄스를 두 종점 사이에 강제로
            흘리는 고유 능력 《폐로방전》을 지녔습니다.
          </p>
          <div className="rule-grid">
            <div>
              <h4>① 고정 전극</h4>
              <p>
                바닥·벽·구조물에 최대 3개를 설치합니다. 한 지문에는
                1개만 설치할 수 있고 4지문 유지됩니다. 설치 쿨타임은
                없지만, 파괴되거나 《삼각 폐로》에 소비된 전극은 5지문
                동안 재생되지 않습니다.
              </p>
            </div>
            <div>
              <h4>② 이동 전극</h4>
              <p>
                해머 유효타를 맞힌 상대에게 붉은 표식을 남겨 2지문 동안
                움직이는 종점으로 만듭니다. 동시에 1명만 유지되며, 같은
                대상에게 다시 새기는 쿨타임은 3지문입니다.
              </p>
            </div>
            <div>
              <h4>③ 직선 폐로</h4>
              <p>
                고정 전극 2개와 2펄스를 사용해 최대 18m·폭 1m의 직선
                방전을 일으킵니다. 지속 1지문, 쿨타임 2지문이며 적을
                추적하거나 벽을 관통하지 않습니다.
              </p>
            </div>
            <div>
              <h4>④ 추뢰 폐로</h4>
              <p>
                고정 전극 1개와 이동 전극을 3펄스로 연결합니다. 최대
                15m, 지속 1지문, 쿨타임 3지문입니다. 상대가 종점이므로
                단순 회피는 어렵지만 전극 파괴·사거리 이탈·엄폐와 영력
                방벽으로 회로를 끊을 수 있습니다.
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
              형성합니다. 기본적으로 세 변만 공격 범위지만, 이동 전극이
              삼각형 안에 있으면 세 전극의 방전이 그 표식으로 한 번
              수렴합니다. 모든 전격을 합친 최대 위력은
              <strong> 중형 건물 1채 파괴 수준</strong>이며, 갈래가
              나뉘면 위력도 분산됩니다. 전극 3개는 방전과 동시에
              소실하며, 사용 후 성물의 모든 능력은 6지문 동안
              봉인됩니다.
            </p>
          </div>
        </article>
      )}

      <details className="judgement-note">
        <summary>판정상 주의</summary>
        <p>
          《추뢰 폐로》는 먼저 해머 유효타로 이동 전극을 남겨야 하므로
          조건 없는 자동 명중이나 필중이 아닙니다. 즉사·내부 장기 지정
          파괴 효과도 없습니다. 회로가 끊기거나 방전이 빗나가도 소비한
          펄스는 돌아오지 않습니다. 아카네 본인은 II등급 능력의 최대
          출력 이하로 환산되는 자연·인공 전기와 II등급 이하의 천둥·번개·
          전기성 능력 및 공격에 완전 면역입니다. I등급·사도급·권능의
          전기는 정상적으로 방어 판정을 거쳐 피해를 받으며, 전기 공격은
          피해 여부와 관계없이 펄스를 충전하지 않습니다. 전기로 발생한
          폭발·충격파·굉음·건물 붕괴·파편·화재와 전기가 흐르는 무기의
          물리 공격도 그대로 받습니다. 장비와 아군은 보호되지 않으며,
          전기 그 자체로 변신하거나 전력망·기상·자기력·전자기파를
          조작할 수도 없습니다.
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
            <span>JP–22</span>
          </div>
          <p className="hero-code">SUBJECT 07 · BIOELECTRIC COMBATANT</p>
          <h1>
            <span>시노노메 아카네</span>
            <strong>REDLINE</strong>
          </h1>
          <blockquote>
            “참으라고 하지 마. 끝까지 부딪치고, 남은 쪽이 옳았다고
            하면 돼.”
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
        <span><b>이능</b> 1개</span>
        <span><b>성물</b> 쇄뢰</span>
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
                상대의 나이·직급·소속과 관계없이 누구에게나 반말을
                쓰며, 짧고 직선적으로 말합니다. 힘과 의지가 가장 정직한
                언어라고 믿고 강한 상대와 서로의 한계를 확인하는 순간을
                즐기지만, 약자를 일방적으로 짓밟는 행위에는 흥미를
                느끼지 못합니다. 항복한 상대를 공격하는 것은 승부가
                아니라 처형일 뿐이라고 말합니다.
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
            <p className="eyebrow">02 · ABILITY / RELIC ARCHIVE</p>
            <h2>충격을 저장하고,<br />전장을 전로로 만든다.</h2>
          </div>
          <p>
            때리거나 맞아 펄스를 모으고, 이동·타격·전극 방전에
            사용합니다. 최대 출력은 <strong>중형 건물 1채 파괴 수준</strong>이며,
            구성은 <strong>이능 1개 + 성물 1개</strong>로 정확히 두
            능력입니다.
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
            II등급 능력의 최대 출력 이하로 환산되는 자연·인공 전기와
            II등급 이하의 전기 피해는 완전히 무효화하지만, 상위 등급의
            전기와 모든 물리 피해는 그대로 받습니다. 다치기 전에 전로를
            완성해야 하는 고위험 근접 제압형입니다.
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
            <span className="record-number">22–R/07</span>
          </div>
          <div className="record-copy">
            <p>
              시노노메 아카네는 공업고등학교 전기과 졸업 후 도쿄 지하
              고압 설비 긴급복구 보조 기사로 일하며 불법 이능 격투장에
              드나들었습니다. 정해진 규칙 안에서 서로가 쓰러질 때까지
              맞부딪치는 시간만큼은 세상의 모든 명령과 책임에서 벗어날
              수 있다고 믿었습니다.
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
              사탄의 속삭임과 함께 영력이 각성했습니다. 그 순간 폐쇄된
              보관함 속 낡은 접지용 해머 《쇄뢰》도 아카네를 사용자로
              선택했습니다. 그녀는 무너진 구조물의 충격을 펄스로 바꾸고
              쇄뢰로 진압선을 돌파한 뒤, 현장에 접근한 분노의 죄인들을
              따라 사라졌습니다. 사건은 일반 사회에 도쿄 도심 변전 설비
              폭발 사고로 기록되어 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="final-section section-wrap">
        <div className="final-grid">
          <article>
            <p className="eyebrow">RELIC</p>
            <h3>성물 · 《쇄뢰(鎖雷)》</h3>
            <p>
              길이 84cm의 흑철 전술 해머입니다. 머리에 장전된 붉은
              전극 3개까지 포함해 하나의 성물로 취급됩니다. 자체적으로
              무한한 전기를 만들지는 못하며, 《박동축전》으로 모은
              펄스가 있어야 《폐로방전》을 사용할 수 있습니다.
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
            “맞은 만큼 돌려주는 건 복수야. 난 그보다 더 멀리 가.
            견딘 모든 순간을 마지막 한 번에 걸겠어.”
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
