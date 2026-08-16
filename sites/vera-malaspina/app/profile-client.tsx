"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const identity = [
  ["나이 · AGE", "24"],
  ["성별 · SEX", "XX"],
  ["국적 · NATION", "ITALIA"],
  ["등급 · GRADE", "II"],
  ["신장 / 체중", "149 / 41"],
];

const doses = [
  {
    level: "1회분",
    prompt: "계속할 것인가",
    title: "통증이 사라집니다",
    body: "통증과 온도 감각만 둔해집니다. 상처는 낫지 않습니다. 대상은 손상 정도를 알 수 없는 채 전투를 계속할지 골라야 합니다.",
    trace: "감각 신호 감소 · 회복 효과 없음",
  },
  {
    level: "2회분",
    prompt: "빠르게 움직일 것인가",
    title: "몸이 0.2초 늦습니다",
    body: "매 지문 첫 급회전, 회피, 강한 휘두르기에서 팔다리가 의도보다 늦게 멎습니다. 자동 실패는 아니지만 궤도 수정과 후속 방어가 늦어집니다.",
    trace: "짧고 느린 동작으로 영향 완화",
  },
  {
    level: "3회분",
    prompt: "감수하고 밀어붙일 것인가",
    title: "큰 동작 하나가 팔다리를 굳힙니다",
    body: "다음 질주, 도약, 전력 타격에 가장 많이 쓴 팔다리가 1지문 강직됩니다. 발동 뒤 약량은 1회분으로 내려가며, 베라는 굳을 부위를 정할 수 없습니다.",
    trace: "큰 동작을 하지 않으면 강직도 없음",
  },
];

const history = [
  {
    year: "2022",
    title: "의도적인 오기",
    body: "센서의 결함을 증명하려 보고서 수치 하나를 일부러 틀렸습니다. 오류를 잡아낸 대신, 그 오류를 만든 사람이 칭찬받았습니다.",
  },
  {
    year: "2023",
    title: "트리에스테 제7부두",
    body: "영력 오염 사고에서 성공률의 불확실성을 숨긴 채 작업자 두 명을 격리실로 들였습니다. 문은 40초 뒤에도 열리지 않았고, 베라는 45명을 살리기 위해 끝까지 손잡이를 놓았습니다.",
  },
  {
    year: "2023",
    title: "문 안쪽의 목소리",
    body: "사탄은 실패하지 않는 또 하나의 베라 목소리로 속삭였습니다. 색욕 회수반이 유실 연구물과 함께 그녀를 데려갔고, 베라는 스스로 따라나섰습니다.",
  },
  {
    year: "2027",
    title: "두 번째 문",
    body: "베들레헴 교단 점유지에서 치명적인 변화를 겪고도 원상복귀하는 가역 인체를 만들고 있습니다. 아직 마지막 기준 신체가 비어 있습니다.",
  },
];

const hooks = [
  [
    "두 번째 기준 신체",
    "《두 번째 문》의 마지막 단계에 필요한 협력자입니다. 자원, 조건 협상, 완전한 거부 가운데 무엇을 택할지는 상대가 정합니다.",
  ],
  [
    "개조를 원하는 죄인",
    "더 강한 신체나 안정된 타락 조직을 원하는 교단원입니다. 베라는 결과보다 변화 직전의 표정을 더 탐냅니다.",
  ],
  [
    "색욕의 감독자",
    "프로젝트가 성과를 내는 동안만 베라를 풀어두는 상급자입니다. 통제와 방임의 경계는 관계 합의로 열어 둡니다.",
  ],
  [
    "트리에스테를 쫓는 WACA 요원",
    "산업재해로 남은 기록 속 모순을 추적하는 인물입니다. 베라가 먼저 알아볼지, 끝까지 모르는 척할지는 정해지지 않았습니다.",
  ],
  [
    "기억이 흐린 생존자",
    "조정된 기억 사이로 40초의 약속을 떠올리는 사람입니다. 진실을 되찾을지, 베라를 용서할지는 상대의 몫입니다.",
  ],
  [
    "간헐적으로 맑아지는 타락자",
    "베라의 기록상 실패작이지만, 의식이 돌아올 때마다 예상 밖의 답을 내놓는 관찰 대상입니다.",
  ],
];

const lines = [
  "아하하하핫! 터졌다! 터졌어! 봤어?! 잠깐, 움직이지 마! 아니, 움직여! 더 움직여 봐!",
  "주사 싫어? 나도 싫어! 그래서 세 개 준비했지! 하나는 약, 하나는 독, 하나는 나도 몰라! 빨리 골라!",
  "거절? 거절 좋아! 조건을 바꾸면 ‘예’가 되잖아! 방금 전의 자기를 배신하는 순간이 제일 예쁘다니까!",
  "씨발, 이건 진짜 처음 보는데?! 죽지 마! 죽더라도 기록 끝나고 죽어! 손 떨리잖아, 가만히 좀 있어!",
];

function getThemeSnapshot(): "dark" | "light" {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribeTheme(callback: () => void) {
  window.addEventListener("vera-theme-change", callback);
  return () => window.removeEventListener("vera-theme-change", callback);
}

function ThemeToggle() {
  const mode = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "dark");

  function toggle() {
    const next = mode === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("vera-theme", next);
    window.dispatchEvent(new Event("vera-theme-change"));
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label="화면 명암 전환"
      aria-pressed={mode === "light"}
      suppressHydrationWarning
    >
      <span aria-hidden="true" className="theme-orbit" />
      {mode === "dark" ? "LIGHT" : "DARK"}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="section-label">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

function AbilityOne() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dose = doses[active];

  function moveTab(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (index + 1) % doses.length;
    if (event.key === "ArrowLeft") next = (index - 1 + doses.length) % doses.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = doses.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <article className="assay-card assay-primary">
      <div className="assay-heading">
        <div>
          <h3>증명실 제1조건<br />치료역 없음</h3>
          <p className="ability-type">생체 누적형 신경 교란 · 선택 압박</p>
        </div>
        <p className="plain-summary">녹색 약을 맞힌 횟수만큼 큰 동작이 어려워집니다.</p>
      </div>

      <div className="dose-switcher" role="tablist" aria-label="투여 단계">
        {doses.map((item, index) => (
          <button
            key={item.level}
            id={`dose-tab-${index}`}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls="dose-panel"
            tabIndex={active === index ? 0 : -1}
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
            onKeyDown={(event) => moveTab(event, index)}
          >
            <span>{index + 1}</span>
            {item.level}
          </button>
        ))}
      </div>

      <div className="dose-layout">
        <div className="dose-vessel" aria-hidden="true">
          <div className={`liquid liquid-${active + 1}`} />
          <span className="vessel-mark m1" />
          <span className="vessel-mark m2" />
          <span className="vessel-mark m3" />
          <span className="bubble b1" />
          <span className="bubble b2" />
          <span className="bubble b3" />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            id="dose-panel"
            role="tabpanel"
            aria-labelledby={`dose-tab-${active}`}
            key={dose.level}
            className="dose-copy"
            initial={reduced ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: 0.22 }}
          >
            <p className="question">{dose.prompt}</p>
            <h4>{dose.title}</h4>
            <p>{dose.body}</p>
            <p className="trace">{dose.trace}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <dl className="metric-rack">
        <div><dt>사거리</dt><dd>18m</dd></div>
        <div><dt>비산</dt><dd>1.5m</dd></div>
        <div><dt>투사체 속도</dt><dd>25m/s</dd></div>
        <div><dt>지속</dt><dd>6지문</dd></div>
        <div><dt>재사용</dt><dd>1지문</dd></div>
        <div><dt>총량</dt><dd>6회분</dd></div>
      </dl>

      <div className="protocol-grid">
        <div>
          <h4>발동</h4>
          <p>혈액 한 방울과 타락한 영력을 섞어 만듭니다. 주사침으로 관통하거나 앰풀을 던집니다. 유리 앰풀 본체는 투척 직후 기준 최대 25m/s이며, 손을 떠난 뒤 능력으로 가속하거나 유도되지 않습니다. 투척분은 눈, 입, 열린 상처에 닿아야 흡수되며, 앰풀 충돌 자체에는 별도의 이능 피해가 없습니다.</p>
        </div>
        <div>
          <h4>대가</h4>
          <p>6지문 안에 세 번째 약을 만들면 1지문 동안 손이 떨리고 겹쳐 보입니다. 그동안 정밀 주사와 약 생성이 불가능합니다.</p>
        </div>
        <div>
          <h4>파훼</h4>
          <p>상처와 점막을 가리거나 18m 밖에서 교전합니다. 공격을 멈추고 1지문 온전히 안정을 취하면 1회분을 대사할 수 있습니다.</p>
        </div>
      </div>
    </article>
  );
}

function AbilityTwo() {
  return (
    <article className="assay-card assay-secondary">
      <div className="assay-heading">
        <div>
          <h3>증명실 제2조건<br />압력은 답을 남긴다</h3>
          <p className="ability-type">비뉴턴성 배양액 · 지면 설치형 행동 제어</p>
        </div>
        <p className="plain-summary">바닥의 녹색 액체가 빠른 움직임만 골라 굳혀 붙잡습니다.</p>
      </div>

      <div className="floor-demo" aria-label="속도에 따라 달라지는 배양액 작동 원리">
        <div className="floor-track slow">
          <p>천천히</p>
          <span className="test-foot" aria-hidden="true" />
          <strong>통과</strong>
        </div>
        <div className="floor-track fast">
          <p>초속 4m 이상</p>
          <span className="test-foot" aria-hidden="true" />
          <span className="harden" aria-hidden="true" />
          <strong>경화</strong>
        </div>
      </div>

      <p className="ability-body">플라스크를 최대 20m까지 던지면 이어진 바닥 반경 7m가 3지문 동안 배양액으로 덮입니다. 유리 플라스크 본체는 투척 직후 기준 최대 20m/s이며, 손을 떠난 뒤 능력으로 가속하거나 유도되지 않습니다. 플라스크 충돌 자체에는 별도의 이능 피해가 없습니다. 질주, 도약 착지, 전력 휘두르기 같은 충격이 닿으면 0.2초 안에 접촉점 주변 최대 60cm가 굳습니다. 먼저 일어난 세 접촉만 반응하며 피아 식별은 없습니다.</p>

      <dl className="metric-rack">
        <div><dt>투척</dt><dd>20m</dd></div>
        <div><dt>반경</dt><dd>7m</dd></div>
        <div><dt>투사체 속도</dt><dd>20m/s</dd></div>
        <div><dt>지속</dt><dd>3지문</dd></div>
        <div><dt>재사용</dt><dd>5지문</dd></div>
        <div><dt>반응</dt><dd>3회</dd></div>
      </dl>

      <div className="protocol-grid">
        <div>
          <h4>한계</h4>
          <p>한 구역만 유지됩니다. 경화체는 1지문 뒤 액체로 풀립니다. 전체 버팀량은 소형 건물 1채 붕괴 충격 이하이며 폭발, 부식, 직접 파괴력은 없습니다.</p>
        </div>
        <div>
          <h4>대가</h4>
          <p>베라도 예외가 아닙니다. 구역에 2지문 연속 머무르면 심박 과속과 복시가 생겨 다음 1지문 동안 첫 능력의 약을 만들 수 없습니다.</p>
        </div>
        <div>
          <h4>파훼</h4>
          <p>느리게 이동하거나 물건 세 개로 반응을 소모합니다. 원거리 공격도 유효합니다. 넓은 물줄기나 지속 고열을 1지문 가하면 약화됩니다.</p>
        </div>
      </div>
    </article>
  );
}

export default function ProfileClient() {
  const reduced = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [truthOpen, setTruthOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const ids = ["profile", "abilities", "history", "relations"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.5] },
    );

    ids.forEach((id) => {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#profile">본문으로 건너뛰기</a>
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="베라 프로필 처음으로">
          <span className="mark-dot" aria-hidden="true" />
          ERRATA
        </a>
        <nav aria-label="프로필 바로가기">
          <a href="#profile" aria-current={activeSection === "profile" ? "location" : undefined}>기록</a>
          <a href="#abilities" aria-current={activeSection === "abilities" ? "location" : undefined}>능력</a>
          <a href="#history" aria-current={activeSection === "history" ? "location" : undefined}>과거</a>
          <a href="#relations" aria-current={activeSection === "relations" ? "location" : undefined}>관계</a>
        </nav>
        <ThemeToggle />
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true">
            <span className="route route-a" />
            <span className="route route-b" />
            <span className="route route-c" />
            <span className="node n1" />
            <span className="node n2" />
            <span className="node n3" />
          </div>
          <motion.div
            className="hero-copy"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 id="hero-title" aria-label="Vera Malaspina">
              <span aria-hidden="true">VERA</span>
              <span aria-hidden="true">MALASPINA</span>
            </h1>
            <p className="korean-name">베라 말라스피나 <b>·</b> ERRATA <b>·</b> 에라타</p>
            <p className="hero-line">조건은 잔혹하게. 마지막 행동만은 당신의 것으로.</p>
          </motion.div>

          <motion.aside
            className="hero-specimen"
            initial={reduced ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
          >
            <div className="specimen-top">
              <p>SUBJECT</p>
              <span>II</span>
            </div>
            <div className="specimen-core" aria-hidden="true">
              <span className="core-ring r1" />
              <span className="core-ring r2" />
              <span className="core-ring r3" />
              <span className="core-drop" />
            </div>
            <p className="specimen-note">증명실의 파열음<br />색욕의 죄인</p>
          </motion.aside>

          <div className="identity-strip" aria-label="기본 신상">
            {identity.map(([key, value]) => (
              <div key={key}>
                <span>{key}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="review-notice" aria-label="제출 전 확인사항">
          <div className="notice-signal" aria-hidden="true"><span /></div>
          <div>
            <p>관리진 비설 검사 전</p>
            <h2>세계관 연계 설정은 승인 대기 상태입니다.</h2>
          </div>
          <p>트리에스테 사건, WACA의 사건 재구성과 기억 조정, 사탄의 속삭임, 《두 번째 문》은 정식 제출 전 별도 검사가 필요합니다. WACA-11은 이 페이지의 내부 임시 관리번호이며 공식 세계관 식별번호가 아닙니다.</p>
        </section>

        <section className="profile-section" id="profile">
          <div className="section-intro no-label">
            <h2>작고, 시끄럽고,<br />결과보다 먼저 폭발합니다.</h2>
          </div>

          <div className="profile-columns">
            <article className="appearance-panel">
              <h3>왜소한 몸에 과한 흔적</h3>
              <p>149cm의 작은 키와 가느다란 골격 때문에 커다란 연구복 안에 몸이 반쯤 잠겨 보입니다. 턱선에 닿는 밝은 백금빛 단발은 층층이 흐트러져 있고, 앞머리는 한쪽 눈을 거의 가릴 만큼 길게 내려옵니다. 드러난 눈은 형광에 가까운 연두색이며 가려진 쪽은 적색과 청색이 뒤섞인 홍채 착색 시술 흔적이 남아 있습니다. 입을 벌려 웃을 때 보이는 뾰족한 치아 역시 치과 시술로 다듬은 것으로, 비인간 종족의 특징은 아닙니다.</p>
              <p>검은 민소매 상의와 목을 감싼 초커, 녹색 광석 장식 귀걸이를 착용하고 손에는 팔꿈치 가까이 오는 검은 장갑을 낍니다. 흰 연구복 소매와 옆자락에는 지워지지 않은 갈색 혈흔과 시약 얼룩이 번져 있습니다. 주사기, 형광 연두색 앰풀, 둥근 플라스크를 여러 개 지니며 움직일 때마다 유리가 부딪히는 소리가 납니다.</p>
              <div className="human-note"><span /> 성인 인간. 이색 홍채와 치아는 후천적 시술입니다.</div>
            </article>

            <article className="temperament-panel">
              <h3>생각은 빠르고, 순서는 없습니다.</h3>
              <div className="keyword-cloud" aria-label="성격 키워드">
                <span>폭발성 과잉흥분</span>
                <span>충동적 변덕</span>
                <span>결과 집착</span>
                <span>쾌락적 파괴</span>
              </div>
              <p>베라는 계획을 설명하다가 문장을 끝내기 전에 실험을 시작하고, 결과가 나오기 전에 다음 조건을 세 개 더 던집니다. 웃음, 비명, 속삭임을 한 호흡 안에서 오가며 실패가 터지면 당황하기보다 더 크게 웃습니다. 타인의 공포를 진정시키는 대신 숫자로 부르고, 방금 한 약속도 더 흥미로운 가설이 떠오르면 즉시 뒤집습니다.</p>
              <p>그렇다고 완전히 무작위인 것은 아닙니다. 명확한 거부를 들으면 신체에 직접 손대지 않는다는 자기 규칙이 있습니다. 다만 상대가 결국 예라고 답하도록 퇴로와 상황을 망가뜨리는 일을 정당한 선택 설계라고 부릅니다. 정신 지배를 경멸하면서도 선택지를 파괴하는 모순을 사랑하고, 가장 위험한 순간에는 안전지대보다 피험자의 얼굴 바로 앞에 서려 합니다.</p>
              <p>말투에는 예외가 없습니다. 상대의 나이, 직급, 소속과 관계없이 처음부터 끝까지 반말만 씁니다. 존댓말을 흉내 내더라도 한두 단어를 넘기지 못하고 곧장 재촉, 명령, 욕설이 뒤엉킨 반말로 무너집니다.</p>
              <blockquote>“내가 미쳤다고? 아니야! 생각이 너무 빨라서 윤리가 못 따라오는 것뿐이야! 느려 터진 윤리가 잘못한 거지!”</blockquote>
            </article>
          </div>

          <div className="affiliation-rail">
            <div><span>소속</span><strong>칠죄교단</strong></div>
            <div><span>부서 · 직급</span><strong>색욕의 죄인</strong></div>
            <div><span>담당</span><strong>타락자 생체반응 · 신체 개조 · 매개체 연구</strong></div>
            <div><span>인지</span><strong>영력, WACA, 칠죄교단의 존재를 모두 인지</strong></div>
          </div>
        </section>

        <section className="abilities-section" id="abilities">
          <div className="section-intro abilities-intro">
            <SectionLabel>II등급 이능</SectionLabel>
            <h2>선택을 지배하지 않습니다.<br />선택지를 망가뜨립니다.</h2>
            <p>두 능력은 별개의 장기가 아니라 베라가 전장에 재현하는 《증명실》의 두 조건입니다. 형광 연두색으로 드러나며, 효과를 숨길 수 없습니다.<small className="turn-note">지문은 역극에서 한 차례 행동을 주고받는 단위입니다.</small></p>
          </div>
          <AbilityOne />
          <AbilityTwo />

          <div className="combat-loop">
            <div>
              <h3>느려지면 주사하고,<br />뛰면 바닥이 붙잡습니다.</h3>
            </div>
            <ol>
              <li><span>조건 배치</span><p>제2조건으로 빠른 움직임에 대가를 만듭니다.</p></li>
              <li><span>접근 투여</span><p>느려진 대상에게 제1조건을 누적합니다.</p></li>
              <li><span>행동 관찰</span><p>돌파, 정지, 대사 중 무엇을 고르는지 기록합니다.</p></li>
              <li><span>결과 폭주</span><p>베라도 구역에 뛰어들어 같은 조건에 붙잡힙니다.</p></li>
            </ol>
          </div>

          <div className="inventory-strip">
            <div><span>일반 장비</span><p>주사기, 유리 앰풀, 플라스크, 중화제, 채혈 및 봉합 도구</p></div>
            <div><span>성물</span><p>없음</p></div>
            <div><span>권능</span><p>미각성</p></div>
            <div><span>총기</span><p>소지하지 않음</p></div>
          </div>
        </section>

        <section className="history-section" id="history">
          <div className="section-intro no-label">
            <h2>문이 닫힌 뒤,<br />오류는 이름이 되었습니다.</h2>
          </div>
          <div className="timeline">
            {history.map((item) => (
              <article
                key={`${item.year}-${item.title}`}
              >
                <span>{item.year}</span>
                <div><h3>{item.title}</h3><p>{item.body}</p></div>
              </article>
            ))}
          </div>

          <div className="truth-stack">
            <div className="truth-title">
              <h3>같은 사건, 세 개의 기록</h3>
            </div>
            <div className="truth-row">
              <span>공식 기록</span>
              <p>영력 센서 오작동으로 발생한 산업재해. 현장 책임자는 인명 피해를 최소화했습니다.</p>
            </div>
            <div className="truth-row">
              <span>베라의 기억</span>
              <p>두 사람은 45명을 위해 스스로 남았습니다. 문을 열지 않은 것은 그들의 선택을 존중한 일입니다.</p>
            </div>
            <details className="truth-row truth-hidden" onToggle={(event) => setTruthOpen(event.currentTarget.open)}>
              <summary><span>숨은 진실</span><b>{truthOpen ? "기록 닫기" : "기록 열기"}</b></summary>
              <p>두 작업자는 베라가 약속한 짧은 임시 작업을 믿고 들어갔습니다. 마지막에는 문을 열어 달라고 요청했습니다. 먼저 실패한 것은 그들의 몸이 아니라, 불확실성을 감추고 동의를 얻은 베라의 절차였습니다.</p>
            </details>
          </div>
        </section>

        <section className="project-section">
          <div className="project-stamp">BETHLEHEM · 2027 · ACTIVE</div>
          <div className="project-copy">
            <SectionLabel>현재 프로젝트</SectionLabel>
            <h2>《에라타: 두 번째 문》</h2>
            <p className="project-lead">치명적 변화를 모두 기록하고, 손상 전 상태로 되돌아오는 가역 인체를 만드는 연구입니다.</p>
            <div className="project-goal">
              <span>욕망</span>
              <p>누군가의 몸이 먼저 실패해 선택을 되돌릴 수 없게 되는 일을 없애고 싶습니다. 모든 치명적 상태를 겪고도 돌아올 수 있는 또 하나의 자신이 필요합니다.</p>
            </div>
            <div className="project-warning">
              실제 감금, 체포, 영구상해, 타락을 시도하는 전개는 상대 오너 합의와 관리진 사전 협의 후에만 진행합니다.
            </div>
          </div>
          <div className="door-diagram" aria-hidden="true">
            <span className="door-frame" />
            <span className="door-gap" />
            <span className="door-signal s1" />
            <span className="door-signal s2" />
            <span className="door-signal s3" />
          </div>
        </section>

        <section className="branch-section" aria-labelledby="branch-title">
          <div className="section-intro no-label">
            <h2 id="branch-title">마지막 거부 앞에서<br />무엇을 부술 것인가.</h2>
          </div>
          <div className="branch-layout">
            <article className="branch authority">
              <h3>거부를 받아들입니다.</h3>
              <p>마지막 기준 신체의 최종 거부를 조건 조작 없이 받아들이고, 자신의 손으로 연구를 파기합니다. 타인의 선택을 되돌리는 것이 아니라 처음으로 온전히 남겨 둡니다.</p>
              <span>권능 각성 가능성</span>
            </article>
            <div className="branch-junction" aria-hidden="true"><span /></div>
            <article className="branch corruption">
              <h3>거부가 불가능한 조건을 만듭니다.</h3>
              <p>기준 신체를 속이거나 강요해 마지막 자료를 얻습니다. 가역 인체는 완성되지만 원본과 복원본의 경계가 사라져, 베라는 자신이 어느 쪽인지 잃습니다.</p>
              <span>타락 심화 가능성</span>
            </article>
          </div>
        </section>

        <section className="relations-section" id="relations">
          <div className="section-intro no-label">
            <h2>빈 칸은 열어 두었습니다.</h2>
            <p>아래 관계는 접점만 제안합니다. 상대 캐릭터의 행동, 감정, 결말은 확정하지 않습니다.</p>
          </div>
          <div className="hook-list">
            {hooks.map(([title, body]) => (
              <details key={title}>
                <summary><span>{title}</span><b aria-hidden="true" /></summary>
                <p>{body}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="voice-section" aria-labelledby="voice-title">
          <h2 className="sr-only" id="voice-title">베라의 대표 대사와 기호</h2>
          <div className="voice-console" aria-live="polite">
            <div className="voice-readout">
              <p>LIVE TRANSCRIPT</p>
              <span>{String(lineIndex + 1).padStart(2, "0")} / {String(lines.length).padStart(2, "0")}</span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                id="voice-transcript"
                key={lineIndex}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                “{lines[lineIndex]}”
              </motion.blockquote>
            </AnimatePresence>
            <div className="voice-controls" aria-label="대사 선택">
              {lines.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={lineIndex === index ? "active" : ""}
                  onClick={() => setLineIndex(index)}
                  aria-label={`${index + 1}번째 대사`}
                  aria-pressed={lineIndex === index}
                  aria-controls="voice-transcript"
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
          <div className="likes-grid">
            <div><span>L</span><p>예상 밖의 반응, 깨지는 유리 소리, 형광 시약, 끝까지 버티는 사람, 즉석 가설</p></div>
            <div><span>H</span><p>조용한 대기, 완성된 결론, 정신 지배, 기록 조작, 의미 없는 즉사, 자신의 실험을 대신 설명하는 사람</p></div>
          </div>
        </section>

        <section className="final-section">
          <h2>문을 두드려.<br />열어 준다고 약속은 못 하지만.</h2>
          <a href="#top">처음으로 돌아가기</a>
        </section>
      </main>

      <footer>
        <p>WACA WORLD CHARACTER PROFILE · TEXT ONLY</p>
        <p>캐릭터 인장 및 외부 이미지를 사용하지 않았습니다.</p>
      </footer>
    </div>
  );
}
