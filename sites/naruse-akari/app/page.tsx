"use client";

import { useEffect, useState } from "react";

type AbilityKey = "overdrive" | "encore";

const identity = [
  ["이름", "나루세 아카리", "成瀬 朱莉 · AKARI NARUSE"],
  ["세례명 · 활동명", "리버브", "REVERB"],
  ["나이", "23세", "ADULT"],
  ["성별", "여성", "XX"],
  ["국적", "일본", "JAPAN"],
  ["신장 · 체중", "167cm · 56kg", "VERIFIED"],
  ["소속", "WACA", "WORLD ABILITY CRIME ALLIANCE"],
  ["부서 및 직급", "성 안드레아의 제자", "DISASTER RESPONSE"],
  ["지부", "대한민국 지부", "KOREA BRANCH"],
  ["등급", "II등급", "2 ABILITIES"],
] as const;

const personality = [
  "밝고 활기참",
  "세심한 배려",
  "책임감 있는 리더",
  "상식적인 츳코미",
  "목표에 진지함",
  "자유분방함",
];

const features = [
  "오른손잡이이며 열네 살 때 청소년 문화센터에서 일렉 기타를 처음 배웠습니다.",
  "연주 실력은 무대 공연보다 정확한 피킹, 일정한 박자와 즉흥 대응에 특화되어 있습니다.",
  "평소에는 밝고 부드러운 존댓말을 사용하며 가까운 사람에게는 츳코미가 훨씬 빨라집니다.",
  "혼란스러운 현장일수록 인원, 엄폐물, 퇴로와 사선을 먼저 확인합니다.",
  "임무 전후 기타의 현 장력과 넥 상태를 직접 점검합니다.",
  "호출명 ‘리버브’는 한 번의 공격이 전장의 흐름에 긴 여파를 남긴다는 의미입니다.",
];

const likes = [
  "활기찬 모임",
  "자신감을 되찾는 사람",
  "기타 정비와 새 현의 감촉",
  "함께 세운 계획이 맞아떨어지는 순간",
  "임무 뒤의 차가운 탄산음료",
  "솔직한 사과와 책임감 있는 사람",
];

const hates = [
  "무책임한 단독 행동",
  "약자를 웃음거리로 만드는 태도",
  "말없이 누군가를 무리에서 배제하는 것",
  "빌린 돈이나 장비를 모른 척하는 행동",
  "정비되지 않은 악기와 장비",
  "해 보기도 전에 포기하는 말",
];

const abilityData = {
  overdrive: {
    index: "ABILITY 01",
    name: "오버드라이브 리프",
    en: "OVERDRIVE RIFF",
    tone: "gold",
    intro:
      "최소 세 개의 현을 동시에 강하게 내려쳐 전방으로 부채꼴 압축 음파를 발사합니다. 금빛과 주홍빛 파형이 겹친 충격파가 정면을 넓게 쓸어내며 대상과 장애물에 둔중한 타격과 밀어내는 힘을 가합니다.",
    specs: [
      ["발동", "즉시"],
      ["지속", "발동 지문 내 종료"],
      ["쿨타임", "1지문"],
      ["사거리", "전방 18m"],
      ["범위", "끝 너비 8m 부채꼴"],
    ],
    output:
      "최대 출력은 두께 약 20cm의 철근콘크리트 벽을 국소 파쇄하고 승용차 한 대를 옆으로 전복시키는 수준입니다. 가까울수록 강하며 대상과 장애물을 통과할 때마다 위력이 감소합니다.",
    penalty:
      "사용 직후 1지문 동안 오른팔의 악력과 손가락 감각이 절반으로 저하됩니다. 이때 다른 음파 공격을 새로 발동할 수 없으며, 한 교전에서 세 번째 최대 출력부터 손가락 피부 손상과 손목 염좌가 누적됩니다.",
  },
  encore: {
    index: "ABILITY 02",
    name: "브레이크다운 앙코르",
    en: "BREAKDOWN ENCORE",
    tone: "red",
    intro:
      "낮은 음역의 파워 코드를 연주해 진동을 발밑의 지면이나 구조물에 밀어 넣습니다. 충전이 끝나면 지정한 지점에서 진동을 폭발시켜 바닥과 그 위의 대상을 함께 뒤엎습니다.",
    specs: [
      ["발동", "1지문 충전 후 방출"],
      ["지속", "충전 1지문 · 방출 즉시"],
      ["쿨타임", "방출 후 5지문"],
      ["사거리", "연결 지면 최대 25m"],
      ["범위", "지름 6m"],
    ],
    output:
      "최대 출력은 지정 지점의 바닥과 기초를 파괴해 소형 건물 1채를 붕괴시키는 수준입니다. 충전 시작과 동시에 목표가 고정되고 파형이 지면을 따라 드러납니다.",
    penalty:
      "정상 방출 뒤 2지문 동안 양팔의 통증과 떨림으로 모든 음파 공격 출력이 절반이 됩니다. 충전 중 연주가 끊기면 공격은 실패하고 양손 저림과 2지문 쿨타임이 적용됩니다.",
  },
} as const;

const counters = [
  ["기타·양손 제압", "현을 연주하지 못하게 하면 두 능력 모두 봉쇄됩니다."],
  ["진동 차단", "두꺼운 고무·모래·다층 충격 흡수재가 음압을 약화합니다."],
  ["진공 환경", "공기 중 전달이 끊겨 오버드라이브 리프를 사용할 수 없습니다."],
  ["단절된 발판", "공중·비행·분리된 발판은 지중 음파 전달을 피합니다."],
  ["충전 방해", "앙코르 충전 중 이동시키거나 연주를 끊으면 공격이 실패합니다."],
  ["사선 이탈", "두 공격 모두 발동 뒤 추적하지 않아 범위 밖으로 회피할 수 있습니다."],
];

export default function Home() {
  const [ability, setAbility] = useState<AbilityKey>("overdrive");
  const [strikePulse, setStrikePulse] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeAbility = abilityData[ability];
  const isStriking = strikePulse > 0;

  useEffect(() => {
    if (strikePulse === 0) return;
    const timer = window.setTimeout(() => setStrikePulse(0), 1500);
    return () => window.clearTimeout(timer);
  }, [strikePulse]);

  const triggerStrike = () => {
    setStrikePulse((current) => current + 1);
  };

  return (
    <main className={isStriking ? `site striking ${ability}` : `site ${ability}`}>
      <div className="noise" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="나루세 아카리 프로필 처음으로">
          <span className="brand-mark">W</span>
          <span>
            <b>WACA</b>
            <small>CENTRAL ARCHIVE</small>
          </span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="프로필 목차">
          {[
            ["PROFILE", "#profile"],
            ["ABILITY", "#ability"],
            ["LIMITS", "#limits"],
            ["RECORD", "#record"],
          ].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="clearance">
          <span>CLASS</span>
          <b>II</b>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> WACA-KR · REGISTERED AGENT 010</p>
          <h1>
            <span className="jp">成瀬 朱莉</span>
            나루세 <em>아카리</em>
          </h1>
          <div className="codename-line">
            <span>CALLSIGN</span>
            <strong>REVERB</strong>
            <i>リバーブ</i>
          </div>
          <p className="hero-quote">
            “아, 잠깐! 멋대로 돌진하지 마세요!<br />
            …싸울 거면 제가 신호할 때 같이 가요!”
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#profile">기록 열람</a>
            <button className="signal-action" type="button" onClick={triggerStrike}>
              <span className="play-icon">▶</span>
              음파 시뮬레이션
            </button>
          </div>
        </div>

        <div key={`${ability}-${strikePulse}`} className="signal-visual" aria-label="금빛과 주홍빛 음파 시각화">
          <div className="case-label">DISTORTION DRIVE</div>
          <div className="string-field" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, index) => <i key={index} />)}
          </div>
          <div className="signal-core" aria-hidden="true">
            <div className="core-ring ring-a" />
            <div className="core-ring ring-b" />
            <div className="pick-shape">A</div>
          </div>
          <div className="equalizer" aria-hidden="true">
            {Array.from({ length: 22 }).map((_, index) => (
              <span key={index} style={{ "--bar": `${18 + ((index * 23) % 76)}%` } as React.CSSProperties} />
            ))}
          </div>
          <div className="visual-readout">
            <span>OUTPUT</span>
            <strong>{ability === "overdrive" ? "18M / CONE" : "25M / GROUND"}</strong>
            <small>{isStriking ? "SIGNAL RELEASED" : "STANDBY"}</small>
          </div>
          <button className="strum-button" type="button" onClick={triggerStrike}>
            STRUM <span>↗</span>
          </button>
        </div>

        <div className="hero-marquee" aria-hidden="true">
          <div>
            <span>REVERB</span><i>◆</i><span>PHYSICAL SONIC PRESSURE</span><i>◆</i><span>REVERB</span><i>◆</i><span>PHYSICAL SONIC PRESSURE</span>
          </div>
        </div>
      </section>

      <section className="section identity-section" id="profile">
        <SectionHeading number="01" label="IDENTIFICATION" title="신원 기록" />
        <div className="identity-grid">
          {identity.map(([label, value, sub], index) => (
            <article className={index === 0 ? "identity-card primary" : "identity-card"} key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{sub}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section profile-section">
        <SectionHeading number="02" label="APPEARANCE & TEMPERAMENT" title="외관과 성격" />
        <div className="profile-layout">
          <article className="appearance-panel">
            <div className="panel-label">APPEARANCE</div>
            <h3>금빛과 주홍빛,<br />시선을 끄는 미인.</h3>
            <p>
              선명한 황금빛 금발과 깊은 주홍빛 눈동자를 지닌 여성입니다. 허리까지 곧게 내려오는 긴 생머리는 앞머리 없이 가운데에서 나누며, 현장에서는 시야와 기타 스트랩을 방해하지 않도록 높게 땋아 올립니다.
            </p>
            <p>
              홍채 아래에는 주황색과 금색의 작은 빛이 번집니다. 부드럽게 휘는 눈매와 풍부한 표정, 또렷하고 섬세한 이목구비가 화사한 인상을 만들어 처음 보는 사람의 시선을 끌 만큼 매우 아름다운 미인입니다. 늘씬하고 균형 잡힌 체형이며 회색 기능성 상의, 짙은 남색 전술 재킷, 검은 전술 바지와 부츠를 착용합니다.
            </p>
            <p>
              무광 흑색 오프셋 바디와 은색 픽가드로 구성된 일렉 기타를 붉은 스트랩에 멥니다. 재킷 안감과 스트랩만 어두운 적색으로 맞췄으며 허리에는 예비 현·피크·소형 정비 공구가 든 주머니가 달려 있습니다.
            </p>
            <div className="palette" aria-label="캐릭터 대표 색상">
              <span style={{ background: "#f3c65f" }}><i>GOLD</i></span>
              <span style={{ background: "#b83f2f" }}><i>VERMILION</i></span>
              <span style={{ background: "#101927" }}><i>NAVY</i></span>
              <span style={{ background: "#b9bec7" }}><i>STEEL</i></span>
            </div>
          </article>

          <article className="temperament-panel">
            <div className="panel-label">PERSONALITY</div>
            <div className="keyword-cloud">
              {personality.map((item, index) => <span key={item} className={`keyword k${index}`}>{item}</span>)}
            </div>
            <div className="personality-copy">
              <p>
                기본적으로 기운이 넘치고 긍정적이며 낯선 자리에서도 먼저 웃으며 말을 겁니다. 말수가 적거나 긴장한 사람을 빠르게 알아차리고, 부담스럽게 시선을 모으지 않은 채 식사·장비·자리 같은 실질적인 부분부터 챙겨 줍니다.
              </p>
              <p>
                개성이 강한 사람들이 제각기 움직여도 각자의 말을 들은 뒤 해야 할 일을 정리해 앞으로 이끕니다. 무책임한 행동과 허세에는 즉시 현실적인 지적을 날리지만, 안전한 장난에는 결국 누구보다 신나게 어울리는 자유로운 면도 있습니다.
              </p>
              <p>
                소중히 여기는 사람과 스스로 세운 목표에는 한없이 진지합니다. 자신의 음파를 아군에게 피해 없이 적만 정확히 제압할 수 있는 수준으로 완성하기 위해 매일 연주와 전투 훈련을 반복합니다.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section features-section">
        <SectionHeading number="03" label="CHARACTER NOTES" title="특징" />
        <div className="feature-list">
          {features.map((feature, index) => (
            <article key={feature}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{feature}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section ability-section" id="ability">
        <SectionHeading number="04" label="ABILITY SYSTEM" title="이능 · 디스토션 드라이브" inverted />
        <div className="ability-intro">
          <p>
            일렉 기타의 금속 현과 바디에서 발생한 진동에 영력을 실어 실제 충격력을 지닌 음압으로 증폭합니다. 정신 간섭이나 환각이 아닌, 사람과 물체를 직접 밀치고 파괴하는 <strong>물리 음파 공격</strong>입니다.
          </p>
          <div className="ability-summary">
            <span>LIMITED ACTIVE</span>
            <strong>2 / 2</strong>
            <small>발현 능력</small>
          </div>
        </div>

        <div className="ability-selector" role="tablist" aria-label="능력 선택">
          {(Object.keys(abilityData) as AbilityKey[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={ability === key}
              className={ability === key ? "active" : ""}
              onClick={() => setAbility(key)}
            >
              <span>{abilityData[key].index}</span>
              <strong>{abilityData[key].name}</strong>
              <small>{abilityData[key].en}</small>
            </button>
          ))}
        </div>

        <article className={`ability-detail ${activeAbility.tone}`}>
          <div className="ability-title">
            <span>{activeAbility.index}</span>
            <h3>《{activeAbility.name}》</h3>
            <p>{activeAbility.en}</p>
          </div>
          <p className="ability-lead">{activeAbility.intro}</p>
          <div className="spec-grid">
            {activeAbility.specs.map(([label, value]) => (
              <div key={label}><span>{label}</span><strong>{value}</strong></div>
            ))}
          </div>
          <div className="ability-copy-grid">
            <div>
              <span className="copy-label">OUTPUT & RULE</span>
              <p>{activeAbility.output}</p>
            </div>
            <div className="penalty-box">
              <span className="copy-label">PENALTY</span>
              <p>{activeAbility.penalty}</p>
            </div>
          </div>
          <button type="button" className="ability-trigger" onClick={triggerStrike}>
            <span>{isStriking ? "방출 완료" : "파형 방출"}</span>
            <i>{isStriking ? "SIGNAL RELEASED" : "TAP TO STRUM"}</i>
          </button>
        </article>

        <div className="common-rules">
          <div>
            <span>COMMON RULES</span>
            <h3>공통 발동 규칙</h3>
          </div>
          <ul>
            <li>기타와 앰프는 성물이 아닌 일반 장비이며 외부 전력 없이도 영력으로 발동합니다.</li>
            <li>리프는 최소 3개, 앙코르는 최소 5개의 온전한 현이 필요합니다.</li>
            <li>두 능력 모두 양손 연주가 필요하며 같은 지문에 함께 사용할 수 없습니다.</li>
            <li>기타 교체 후 1지문 동안 동조와 조율이 필요하며 기존 쿨타임은 초기화되지 않습니다.</li>
            <li>귀마개는 소음을 줄일 뿐 물리적인 음압을 없애지 못합니다.</li>
            <li>음파는 아군을 자동으로 피하지 않으며 타인의 피해나 전투 불능을 확정하지 않습니다.</li>
          </ul>
        </div>
      </section>

      <section className="section limits-section" id="limits">
        <SectionHeading number="05" label="COUNTERMEASURES" title="한계 및 파훼 기준" />
        <div className="counter-grid">
          {counters.map(([title, copy], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className="warning-strip">
          <strong>금지 오인</strong>
          <p>정신 지배 · 환각 · 방어 무시 · 내부 파괴 · 자동 명중 · 무한 증폭 · 광속 공격 능력이 아닙니다.</p>
        </div>
      </section>

      <section className="section record-section" id="record">
        <SectionHeading number="06" label="ADDITIONAL RECORD" title="성물 · 권능 · L/H · 기타" />
        <div className="record-grid">
          <article className="status-card">
            <span>성물</span>
            <strong>없음</strong>
            <p>전투용 일렉 기타는 WACA에서 내구성을 보강한 일반 장비이며 자체적인 이능을 지니지 않습니다.</p>
          </article>
          <article className="status-card">
            <span>권능</span>
            <strong>미각성</strong>
            <p>현재 기록은 권능 각성 이전 상태를 기준으로 작성되었습니다.</p>
          </article>
          <article className="preference-card like-card">
            <span>L / LIKE</span>
            <ul>{likes.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="preference-card hate-card">
            <span>H / HATE</span>
            <ul>{hates.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
        <div className="observation-log">
          <span>기타 관찰 기록</span>
          <div>
            <p>정식 지휘관은 아니지만 지휘 체계가 흔들리면 자연스럽게 인원과 공격 순서를 정리합니다.</p>
            <p>공격 전에는 아군에게 사선을 알리고 대답을 확인한 뒤 현을 내려칩니다.</p>
            <p>새로 합류한 인원이 혼자 남아 있으면 먼저 옆자리를 내어 줍니다.</p>
            <p>임무 보고서는 꼼꼼하지만 개인 지출 장부는 자주 미뤄 두었다가 한꺼번에 정리합니다.</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-mark">W</div>
        <div>
          <strong>WACA CENTRAL ARCHIVE</strong>
          <span>NARUSE AKARI · REVERB · CLASS II</span>
        </div>
        <p>AUTHORIZED PERSONNEL ONLY</p>
      </footer>
    </main>
  );
}

function SectionHeading({
  number,
  label,
  title,
  inverted = false,
}: {
  number: string;
  label: string;
  title: string;
  inverted?: boolean;
}) {
  return (
    <div className={inverted ? "section-heading inverted" : "section-heading"}>
      <span className="section-number">{number}</span>
      <div>
        <p>{label}</p>
        <h2>{title}</h2>
      </div>
      <i />
    </div>
  );
}
