"use client";

import { useMemo, useState } from "react";

type ModuleId = "drive" | "shell" | "wing" | "mucus" | "acid" | "sense";

type OrganModule = {
  id: ModuleId;
  index: string;
  label: string;
  plain: string;
  description: string;
  effect: string;
  counter: string;
  color: string;
};

type SpiritEgg = {
  id: number;
  moduleId: ModuleId;
  form: string;
  order: string;
};

const MODULES: OrganModule[] = [
  {
    id: "drive",
    index: "01",
    label: "구동낭",
    plain: "돌진",
    description: "근육 다발과 탄성 관절을 증식시켜 짧은 거리를 폭발적으로 내달립니다.",
    effect: "최대 8m 돌진 · 1회 타격은 콘크리트 벽 파괴 수준",
    counter: "방향 전환이 둔함 · 측면 회피와 장애물에 취약",
    color: "#cedd79",
  },
  {
    id: "shell",
    index: "02",
    label: "갑각낭",
    plain: "방어",
    description: "몸 표면을 겹갑각과 방패, 밀어내기용 쐐기로 굳힙니다.",
    effect: "정면 방호와 밀어내기 · 벽 파괴급 1회 방어 후 파손",
    counter: "이동 속도 절반 · 관절부와 후면은 상대적으로 얇음",
    color: "#9b826f",
  },
  {
    id: "wing",
    index: "03",
    label: "익막낭",
    plain: "비행",
    description: "속이 빈 뼈와 넓은 익막을 만들어 공중 정찰과 운반을 수행합니다.",
    effect: "최대 고도 10m · 성인 1명을 1지문에 최대 10m 운반",
    counter: "타격력·내구도 절반 · 날개 손상 시 즉시 추락",
    color: "#b7bfcb",
  },
  {
    id: "mucus",
    index: "04",
    label: "점착낭",
    plain: "구속",
    description: "점성이 높은 소화 점액을 토해 발과 장비를 바닥에 붙입니다.",
    effect: "사거리 8m · 지름 3m 범위 · 점착 지속 2지문",
    counter: "불과 절단으로 제거 가능 · 물에서는 접착력 감소",
    color: "#a6c98b",
  },
  {
    id: "acid",
    index: "05",
    label: "부식낭",
    plain: "부식",
    description: "장비와 구조물의 표면을 3지문 동안 서서히 약화시키는 위액을 분사합니다.",
    effect: "사거리 6m · 1지문 뒤 약화 · 같은 부위 2회 적중 시 2지문째부터 파손 가능",
    counter: "생명체·성물·영력 방벽 즉시 용해 불가 · 세척과 중화로 제거 가능",
    color: "#d1c151",
  },
  {
    id: "sense",
    index: "06",
    label: "감각낭",
    plain: "탐지",
    description: "눈과 촉각 수염을 증식시켜 생명과 영력 반응을 사용자에게 공유합니다.",
    effect: "반경 15m 감지 · 시청각 공유 · 흔적 추적",
    counter: "벽 너머 정밀 투시 불가 · 영력 은폐를 자동 간파하지 못함",
    color: "#9e8ca9",
  },
];

const FORMS = ["사족형", "절지형", "장체형"];
const ORDERS = ["돌파", "호위", "포획", "수색", "운반"];

function SpiritOrb({ moduleId, size = "normal" }: { moduleId: ModuleId; size?: "normal" | "large" }) {
  const module = MODULES.find((item) => item.id === moduleId) ?? MODULES[0];
  return (
    <span
      className={`mini-orb mini-orb-${size}`}
      style={{ "--module-color": module.color } as React.CSSProperties}
      aria-hidden="true"
    >
      <i /><i /><i />
    </span>
  );
}

export default function Home() {
  const [moduleId, setModuleId] = useState<ModuleId>("drive");
  const [form, setForm] = useState(FORMS[0]);
  const [order, setOrder] = useState(ORDERS[0]);
  const [eggs, setEggs] = useState<SpiritEgg[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [nextId, setNextId] = useState(1);
  const [result, setResult] = useState("기관을 고르고 첫 영란을 응축하세요.");

  const selectedModule = useMemo(
    () => MODULES.find((item) => item.id === moduleId) ?? MODULES[0],
    [moduleId],
  );

  const selectedEggs = eggs.filter((egg) => selectedIds.includes(egg.id));

  const createEgg = () => {
    if (eggs.length >= 6) {
      setResult("체내 저장 한계는 6개입니다.");
      return;
    }
    const newEgg = { id: nextId, moduleId, form, order };
    setEggs((current) => [...current, newEgg]);
    setNextId((current) => current + 1);
    setResult(`${selectedModule.label}을 새긴 영란을 응축했습니다. 준비 1지문 · 쿨타임 1지문.`);
  };

  const toggleEgg = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((current) => current.filter((item) => item !== id));
      return;
    }
    if (selectedIds.length >= 3) {
      setResult("합성 대상으로는 영란 3개까지만 고를 수 있습니다.");
      return;
    }
    setSelectedIds((current) => [...current, id]);
  };

  const hatchOne = () => {
    if (selectedEggs.length !== 1) {
      setResult("단란종 부화에는 영란을 정확히 1개 선택해야 합니다.");
      return;
    }
    const egg = selectedEggs[0];
    const organ = MODULES.find((item) => item.id === egg.moduleId) ?? MODULES[0];
    setEggs((current) => current.filter((item) => item.id !== egg.id));
    setSelectedIds([]);
    setResult(`${egg.form} 단란종이 부화했습니다 — ${organ.plain} 기관 / 명령: ${egg.order}. 지속 3지문.`);
  };

  const fuseThree = () => {
    if (selectedEggs.length !== 3) {
      setResult("합란종 제작에는 서로 선택된 영란 3개가 필요합니다.");
      return;
    }
    if (new Set(selectedEggs.map((egg) => egg.moduleId)).size !== 3) {
      setResult("합란종에는 서로 다른 기관 3개가 필요합니다. 같은 기관은 중첩되지 않습니다.");
      return;
    }
    const moduleNames = selectedEggs.map((egg) => {
      const found = MODULES.find((item) => item.id === egg.moduleId);
      return found?.plain ?? "미확인";
    });
    const baseEgg = selectedEggs[0];
    const canUseMaximum = selectedEggs.some((egg) => egg.moduleId === "drive" || egg.moduleId === "shell");
    setEggs((current) => current.filter((egg) => !selectedIds.includes(egg.id)));
    setSelectedIds([]);
    setResult(`합란종의 체내 합성을 시작했습니다 — 준비 2지문 후 ${baseEgg.form} 골격·${baseEgg.order} 명령과 ${moduleNames.join(" · ")} 기관을 가진 개체가 부화하며 지속 4지문입니다.${canUseMaximum ? " 구동·갑각 기관을 소모한 최대 출력이 가능합니다." : " 공격 기관이 없어 중형 건물급 최대 출력에는 도달하지 않습니다."}`);
  };

  const resetLab = () => {
    setEggs([]);
    setSelectedIds([]);
    setNextId(1);
    setResult("부화 기록을 초기화했습니다.");
  };

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <a className="skip-link" href="#profile">본문으로 건너뛰기</a>
      <header className="topbar">
        <a className="sect-mark" href="#top" aria-label="키사라기 마유 프로필 처음으로">
          <span className="sect-name">SEPTEM PECCATA</span>
          <span className="sect-rule" />
          <span className="sect-division">GULA · 06</span>
        </a>
        <nav className="main-nav" aria-label="프로필 탐색">
          <a href="#profile">인물</a>
          <a href="#ability">능력</a>
          <a href="#history">기록</a>
        </nav>
        <div className="sin-index" aria-label="칠죄교단 폭식 계열">
          {[1, 2, 3, 4, 5, 6, 7].map((number) => (
            <span key={number} className={number === 6 ? "active" : ""}>
              {String(number).padStart(2, "0")}
            </span>
          ))}
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">GLUTTONY OPERATIVE · CLASS II</p>
          <p className="record-code">SP–JP / 025 / NEST</p>
          <h1>
            <span>키사라기</span>
            <span>마유</span>
          </h1>
          <div className="native-name">如月 繭 <i>KISARAGI MAYU</i></div>
          <blockquote>
            “상상은 삼키는 게 아니에요.
            <br />몸을 주는 거죠.”
          </blockquote>
          <div className="hero-tags" aria-label="핵심 분류">
            <span>25세</span>
            <span>일본</span>
            <span>폭식의 죄인</span>
            <span>II등급</span>
          </div>
        </div>

        <div className="specimen" aria-label="영란 표본">
          <div className="specimen-label top">SPECIMEN: OVA–00</div>
          <div className="orb-shell">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <span className="orb">
              <span className="embryo">
                <i className="spine" />
                <i className="limb limb-a" />
                <i className="limb limb-b" />
              </span>
            </span>
          </div>
          <div className="specimen-data">
            <span>ENERGY</span><b>CONDENSED</b>
            <span>STATUS</span><b>UNHATCHED</b>
            <span>COMMAND</span><b>AWAITING</b>
          </div>
          <div className="specimen-label bottom">DO NOT BREAK WITHOUT ORDER</div>
        </div>
      </section>

      <section className="plain-summary" aria-labelledby="plain-title">
        <h2 className="section-kicker"><span>00</span> 가장 쉬운 설명</h2>
        <div className="summary-lead">
          <p id="plain-title">마유가 뱉는 구슬은 <strong>조립식 소환수의 알</strong>입니다.</p>
          <p>구슬 하나에는 기능 하나가 들어갑니다. 구슬 3개를 뱃속에서 합치면, 그 기능들을 품은 강한 한 마리가 태어납니다.</p>
        </div>
        <div className="number-rules">
          <article><b>1</b><span>영란 1개</span><p>기관 1개를 가진 일반 소환수</p></article>
          <article><b>3</b><span>영란 3개</span><p>기관을 조합한 합성 소환수</p></article>
          <article><b>∞</b><span>교전당 부화</span><p>횟수 제한 없이 재응축 가능</p></article>
        </div>
        <div className="rule-flow">
          <span><b>01</b> 체내 영력 응축</span>
          <i>→</i>
          <span><b>02</b> 기관과 명령 설계</span>
          <i>→</i>
          <span><b>03</b> 구슬을 뱉고 파괴</span>
          <i>→</i>
          <span><b>04</b> 파편이 몸으로 조립</span>
        </div>
      </section>

      <section className="profile-section" id="profile">
        <h2 className="section-kicker light"><span>01</span> 인물 기록</h2>
        <div className="profile-grid">
          <div className="profile-intro">
            <p className="micro">FIELD NAME</p>
            <h2>NEST</h2>
            <p className="profile-deck">먹이고, 숨기고, 역할을 준다.<br />그녀의 보호는 따뜻하고—떠나기 어렵다.</p>
            <dl className="identity-list">
              <div><dt>이름</dt><dd>키사라기 마유 <small>如月 繭</small></dd></div>
              <div><dt>죄명 · 활동명</dt><dd>네스트 <small>NEST</small></dd></div>
              <div><dt>나이</dt><dd>25세</dd></div>
              <div><dt>성별</dt><dd>XX</dd></div>
              <div><dt>국적</dt><dd>일본</dd></div>
              <div><dt>신장 · 체중</dt><dd>169cm · 57kg</dd></div>
              <div><dt>소속</dt><dd>칠죄교단</dd></div>
              <div><dt>부서 및 직급</dt><dd>폭식의 죄인</dd></div>
              <div><dt>등급</dt><dd>II등급 <small>보유 이능 1개 · 등급 상한 2개</small></dd></div>
              <div><dt>성물</dt><dd>없음</dd></div>
              <div><dt>권능</dt><dd>미각성</dd></div>
            </dl>
          </div>

          <div className="profile-copy">
            <article>
              <span className="article-no">APPEARANCE</span>
              <h3>외관</h3>
              <p>169cm의 곧고 균형 잡힌 체격을 지닌 여성입니다. 먹빛에 가까운 짙은 남보라색 머리카락을 가슴 아래까지 반듯하게 기르며, 양옆의 가는 머리카락만 땋아 목덜미에서 고리처럼 묶습니다. 눈동자는 엷은 꿀색이고 상대를 바라볼 때 눈을 좀처럼 피하지 않아, 부드러운 표정에도 묘한 압박감이 남습니다.</p>
              <p>검은 비대칭 장코트 안에 상아색 하이넥 셔츠를 입고 허리에는 소환수의 역할을 구분하는 작은 금속 표찰을 매답니다. 능력을 쓰면 목울대 아래로 진주빛 영력이 둥글게 차오르고, 구슬을 뱉은 직후 입술과 턱선을 따라 먹색 균열무늬가 잠시 번집니다. 체내 합성이 시작되면 복부에서 여러 심장이 엇갈려 뛰는 듯한 진동과 낮은 울음이 새어 나옵니다.</p>
            </article>
            <article>
              <span className="article-no">TEMPERAMENT</span>
              <h3>성격</h3>
              <p>목소리를 높이지 않고도 사람을 움직이는 침착한 통솔자입니다. 처음 만난 사람의 이름과 식사 여부, 부상 부위와 꺼리는 행동을 빠르게 기억하며 필요한 것을 말보다 먼저 내어 줍니다. 각자가 가장 잘할 수 있는 역할을 정확히 제시하기 때문에, 곁에 있는 사람은 자신이 선택받고 존중받았다는 감각을 받습니다.</p>
              <p>그러나 그 보호는 소유욕과 분리되지 않습니다. 외로운 사람을 발견하면 반드시 자신의 ‘둥지’ 안에 들여야 안심하고, 떠나는 자유를 말하면서도 바깥에서 살아가기 어렵도록 생활과 관계를 자신에게 의존하게 만듭니다. 사람과 소환수를 하나의 생태계처럼 배치하며, 누구를 포기했는지 끝까지 기억합니다.</p>
            </article>
            <div className="trait-row" aria-label="성격 키워드">
              <span>침착한 통솔자</span><span>생활형 카리스마</span><span>보호적 소유욕</span><span>정확한 기억력</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ability-section" id="ability">
        <h2 className="section-kicker"><span>02</span> 이능 기록 · 보유 1개</h2>
        <div className="ability-heading">
          <div>
            <p className="micro rust">ABILITY / BIOLOGICAL FABRICATION</p>
            <h2>《영란조형》</h2>
            <p className="hanja">靈卵造形</p>
          </div>
          <p className="ability-definition">자신의 영력을 체내에서 구슬 형태의 ‘영란’으로 응축하고, 한 가지 생체 기관과 명령을 새긴 뒤 뱉어 깨뜨려 일회성 소환수로 부화시키는 능력입니다.</p>
        </div>

        <div className="timing-strip" aria-label="기본 발동 수치">
          <span><small>응축</small><b>준비 1지문</b></span>
          <span><small>응축 쿨타임</small><b>1지문</b></span>
          <span><small>체내 저장</small><b>최대 6개</b></span>
          <span><small>교전당 부화</small><b>횟수 제한 없음</b></span>
          <span><small>일반 소환</small><b>지속 3지문</b></span>
          <span><small>지휘 범위</small><b>25m</b></span>
        </div>
        <p className="mechanic-note"><b>판정 기준</b> 영란 응축은 본인 행동 1지문을 사용하며, 완성된 영란은 다음 본인 지문부터 뱉고 깨뜨려 즉시 부화시킬 수 있습니다. 단란종 소환 쿨타임 1지문은 모든 영란이 공유합니다. 한 교전에서 부화시킬 수 있는 소환수의 누적 횟수에는 제한이 없으며, 사용·소멸한 영란은 준비 1지문과 응축 쿨타임 1지문을 거쳐 전투 중에도 다시 보충할 수 있습니다. 단, 체내에 동시에 저장할 수 있는 영란은 최대 6개이고 단란종은 동시에 최대 3마리까지만 활성화됩니다.</p>

        <div className="lab" aria-labelledby="lab-title">
          <div className="lab-header">
            <div>
              <p className="micro">INTERACTIVE / INCUBATION LAB</p>
              <h3 id="lab-title">영란 설계실</h3>
            </div>
            <p>기관·외형·명령을 골라 영란을 만들고, 하나를 부화시키거나 세 개를 합성해 보세요.</p>
          </div>

          <div className="lab-grid">
            <div className="module-picker">
              <fieldset>
                <legend>1. 설계 기관</legend>
                <div className="module-buttons">
                  {MODULES.map((module) => (
                    <button
                      key={module.id}
                      type="button"
                      className={moduleId === module.id ? "selected" : ""}
                      aria-pressed={moduleId === module.id}
                      onClick={() => setModuleId(module.id)}
                    >
                      <i style={{ background: module.color }} />
                      <span><small>{module.index}</small>{module.plain}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="dual-pickers">
                <fieldset>
                  <legend>2. 외형 골격</legend>
                  <select value={form} onChange={(event) => setForm(event.target.value)} aria-label="외형 골격 선택">
                    {FORMS.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </fieldset>
                <fieldset>
                  <legend>3. 첫 명령</legend>
                  <select value={order} onChange={(event) => setOrder(event.target.value)} aria-label="첫 명령 선택">
                    {ORDERS.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </fieldset>
              </div>
              <p className="shape-note">사족형·절지형·장체형은 외관과 기본 동작만 정하며, 별도의 능력이나 수치 상승을 주지 않습니다.</p>

              <article className="module-readout">
                <span>{selectedModule.index} / {selectedModule.label}</span>
                <h4>{selectedModule.plain} 기관</h4>
                <p>{selectedModule.description}</p>
                <dl>
                  <div><dt>효과</dt><dd>{selectedModule.effect}</dd></div>
                  <div><dt>파훼</dt><dd>{selectedModule.counter}</dd></div>
                </dl>
              </article>
            </div>

            <div className="lab-preview">
              <div className="preview-orbit">
                <span className="preview-code">OVA–{String(nextId).padStart(2, "0")}</span>
                <SpiritOrb moduleId={moduleId} size="large" />
                <span className="preview-state">READY TO CONDENSE</span>
              </div>
              <div className="preview-spec">
                <span>{form}</span><i>/</i><span>{selectedModule.label}</span><i>/</i><span>{order}</span>
              </div>
              <button type="button" className="primary-action" onClick={createEgg} disabled={eggs.length >= 6}>
                영란 1개 응축 <small>보관 {eggs.length} / 6</small>
              </button>
            </div>
          </div>

          <div className="incubator">
            <div className="incubator-head">
              <div><p className="micro">INTERNAL STORAGE</p><h4>체내 영란 보관함</h4></div>
              <span>{selectedIds.length}개 선택 / 합성은 3개</span>
            </div>
            <div className="egg-tray" role="group" aria-label="보관된 영란 선택">
              {Array.from({ length: 6 }).map((_, index) => {
                const egg = eggs[index];
                const organ = egg ? MODULES.find((item) => item.id === egg.moduleId) : null;
                return (
                  egg ? (
                    <button
                      type="button"
                      key={index}
                      className={`egg-slot filled ${selectedIds.includes(egg.id) ? "selected" : ""}`}
                      onClick={() => toggleEgg(egg.id)}
                      aria-pressed={selectedIds.includes(egg.id)}
                      aria-label={`${index + 1}번 영란, ${organ?.plain}, ${egg.form}, ${egg.order} 명령, ${selectedIds.includes(egg.id) ? "선택됨" : "선택 안 됨"}`}
                    >
                      <small>{String(index + 1).padStart(2, "0")}</small>
                      <SpiritOrb moduleId={egg.moduleId} />
                      <b>{organ?.plain}</b>
                      <span className="egg-meta">{egg.form} · {egg.order}</span>
                    </button>
                  ) : (
                    <div className="egg-slot" key={index} aria-hidden="true">
                      <small>{String(index + 1).padStart(2, "0")}</small>
                      <span className="empty-mark">—</span>
                      <b>EMPTY</b>
                    </div>
                  )
                );
              })}
            </div>
            <div className="incubator-actions">
              <button type="button" onClick={hatchOne} disabled={selectedIds.length !== 1}>선택 영란 부화</button>
              <button type="button" className="fusion-action" onClick={fuseThree} disabled={selectedIds.length !== 3}>3개 체내 합성</button>
              <button type="button" className="quiet-action" onClick={resetLab}>초기화</button>
            </div>
            <p className="lab-result" role="status" aria-live="polite" aria-atomic="true">{result}</p>
            <p className="simulation-note">※ 규칙 이해를 위한 설명용 시뮬레이션입니다. 실제 역극의 지문 수를 자동 계산하지 않습니다.</p>
          </div>
        </div>
      </section>

      <section className="rules-section">
        <h2 className="section-kicker light"><span>03</span> 발동 규칙</h2>
        <div className="rules-layout">
          <article className="rule-card standard-card">
            <p className="micro">STANDARD HATCH</p>
            <h3>단란종 <small>單卵種</small></h3>
            <p className="rule-sub">영란 1개 · 기관 1개 · 명령 1개</p>
            <ul>
              <li><b>소환</b><span>즉시 · 쿨타임 1지문</span></li>
              <li><b>지속</b><span>3지문</span></li>
              <li><b>동시 활성</b><span>최대 3마리</span></li>
              <li><b>지휘 범위</b><span>마유 중심 25m</span></li>
              <li><b>단일 위력</b><span>콘크리트 벽 파괴 수준</span></li>
              <li><b>3마리 집중</b><span>소형 건물 1채 파괴 수준</span></li>
            </ul>
            <p className="rule-foot">공격·호위·추적·운반처럼 짧고 구체적인 명령 하나를 반복합니다. 마유는 한 지문에 한 마리의 명령만 말이나 손짓으로 바꿀 수 있습니다. 25m 밖에서는 즉시 멈추고 1지문 뒤 붕괴하며, 마유가 의식을 잃으면 전부 즉시 소멸합니다.</p>
          </article>

          <div className="fusion-arrow" aria-hidden="true"><span>× 3</span><i>→</i></div>

          <article className="rule-card fusion-card">
            <p className="micro">COMPOSITE HATCH</p>
            <h3>합란종 <small>合卵種</small></h3>
            <p className="rule-sub">영란 3개 · 기관 최대 3개 · 강한 1마리</p>
            <ul>
              <li><b>체내 합성</b><span>준비 2지문</span></li>
              <li><b>지속</b><span>4지문</span></li>
              <li><b>쿨타임</b><span>6지문</span></li>
              <li><b>사용 후</b><span>영란 응축 불가 3지문</span></li>
              <li><b>동시 활성</b><span>합란종 1마리만</span></li>
              <li><b>조건부 최대</b><span>구동낭 또는 갑각낭 포함 시 중형 건물 1채</span></li>
            </ul>
            <p className="rule-foot">서로 다른 세 기관을 품지만 한 지문에는 기관 하나만 능동 작동합니다. 가장 먼저 생성된 선택 영란의 골격과 명령을 기본값으로 삼고, 나머지 둘에서는 기관만 이어받습니다. 합란종이 태어나면 기존 단란종은 모두 소멸하며, 유지 중에는 다른 소환수를 꺼낼 수 없습니다. 합란종의 정면 갑각은 소형 건물급 공격 1회 뒤 파손되고 중형 건물급 공격은 완전히 막지 못합니다. 구동낭 또는 갑각낭을 넣은 개체만 전신과 영력을 한 지점에 소모해 중형 건물급 최대 출력을 1회 쓸 수 있고 즉시 무너집니다. 6지문 쿨타임과 응축 불가 3지문은 합란종 소멸 시점부터 계산합니다.</p>
          </article>
        </div>

        <div className="hard-limits">
          <div><span>설계 가능</span><p>명시된 여섯 기관과 기재된 기능만 선택합니다. 외형·골격·명령을 바꿔도 새 기능이나 수치 보정은 생기지 않습니다.</p></div>
          <div><span>설계 불가</span><p>능력 복제, 정신 지배, 순간이동, 시간·공간 조작, 치유·부활, 능력 무효화.</p></div>
          <div><span>핵심 판정</span><p>크기와 외형을 바꾸어도 선택하지 않은 기관의 기능은 생기지 않습니다.</p></div>
        </div>
        <p className="one-ability-note">구동낭·갑각낭·익막낭·점착낭·부식낭·감각낭은 별도의 이능이 아니라, 《영란조형》이 제작하는 사전 등록 생체기관 도면입니다. 영란 생성·단란종 부화·합란종 합성은 모두 하나의 이능으로 계산합니다.</p>
      </section>

      <section className="combat-section">
        <h2 className="section-kicker"><span>04</span> 전투 운용</h2>
        <div className="combat-grid">
          <div className="combat-loop">
            {[
              ["01", "정찰", "감각종으로 시야와 영력 반응을 확보합니다."],
              ["02", "배치", "방패·점착종으로 아군의 위치와 퇴로를 정돈합니다."],
              ["03", "선택 강요", "상대가 마유 본체와 세 소환수 중 무엇을 먼저 끊을지 고민하게 합니다."],
              ["04", "전환", "물량을 유지하거나 세 영란을 합쳐 합란종 한 마리로 돌파합니다."],
              ["05", "재정비", "합란종이 붕괴하거나 최대 출력을 쓰면 후퇴하며 응축 불가 3지문을 버팁니다."],
            ].map(([no, title, copy]) => (
              <article key={no}><b>{no}</b><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
          <aside className="counter-file">
            <p className="micro">COUNTERMEASURES</p>
            <h3>파훼법</h3>
            <ol>
              <li><b>입과 목을 막는다.</b><span>영란은 반드시 입 밖으로 뱉어야 합니다.</span></li>
              <li><b>구슬을 가로챈다.</b><span>체외 영란은 2지문 안에 깨지지 않으면 소멸합니다.</span></li>
              <li><b>가슴의 핵을 부순다.</b><span>모든 소환수의 흉부에는 영란핵이 노출됩니다.</span></li>
              <li><b>25m 밖에서 압박한다.</b><span>범위를 벗어난 개체는 1지문 뒤 붕괴합니다.</span></li>
              <li><b>합성 중 복부를 노린다.</b><span>준비 2지문 중 유효타를 받으면 영란은 남지만 합성이 풀리고, 재시도까지 3지문이 필요합니다.</span></li>
            </ol>
          </aside>
        </div>
        <div className="output-scale">
          <p className="micro">MAXIMUM OUTPUT SCALE</p>
          <div className="scale-line">
            <span className="scale-fill" />
            <i className="scale-point p1"><b>일반 1마리</b><small>콘크리트 벽</small></i>
            <i className="scale-point p2"><b>일반 3마리</b><small>소형 건물 1채</small></i>
            <i className="scale-point p3"><b>합란종 최대</b><small>중형 건물 1채</small></i>
          </div>
          <p>II등급 상한은 구동낭 또는 갑각낭을 넣은 합란종이 전신과 영력을 일점에 소모할 때만 적용됩니다. 감각·비행·점착 중심의 설계는 이 위력에 도달하지 않으며, 범위가 넓어지거나 여러 대상을 노리면 총 위력도 나뉩니다.</p>
        </div>
      </section>

      <section className="history-section" id="history">
        <h2 className="section-kicker light"><span>05</span> 과거와 합류</h2>
        <div className="history-grid">
          <div className="timeline-mark" aria-hidden="true"><span>20</span><span>22</span><span>25</span></div>
          <article>
            <p className="micro">BEFORE AWAKENING</p>
            <h3>이름을 기억하는 식탁</h3>
            <p>요코하마 항구 근처에서 작은 식당과 임시 숙소를 함께 운영하던 가정에서 자랐습니다. 돈이 없는 일용직 노동자, 가출 청년, 신분을 밝히기 어려운 외국인까지 한 식탁에 앉는 곳이었습니다. 마유는 부모보다 먼저 손님의 이름과 알레르기, 돌아오는 시간을 외웠고 성인이 된 뒤에는 폐업 위기의 숙소를 사실상 혼자 맡아 무료급식과 단기 피난처로 유지했습니다.</p>
          </article>
          <article>
            <p className="micro">AWAKENING / AGE 22</p>
            <h3>흩어지는 사람들</h3>
            <p>스물두 살 무렵 변칙 정전으로 숙소와 지하 통로가 봉쇄되었습니다. 마유는 피난민을 식량·경계·응급처치조로 나누어 버텼지만, WACA의 격리와 기억 조정 절차가 시작되면서 공동체는 위험도와 신분에 따라 흩어졌습니다. 이송 과정에서 한 사람이 사라지고 다른 이들은 함께 지냈다는 사실조차 잊었습니다.</p>
          </article>
          <article>
            <p className="micro">SEPTEM PECCATA</p>
            <h3>“아무도 둥지 밖에 두지 마.”</h3>
            <p>한 명도 바깥에 남겨 두고 싶지 않다는 욕망이 공포와 죄책감을 압도한 순간, 사탄의 목소리를 들었습니다. 목구멍에서 처음 만들어진 영란을 뱉어 깨뜨리자 운반수가 태어나 부상자들을 싣고 격리선을 돌파했습니다. 이후 폭식의 죄인들은 헤어진 이들의 이름과 행방, 식량이 채워진 새 은신처를 먼저 보여 주었습니다.</p>
            <p>마유는 교단의 잔혹성을 모르고 속은 것이 아닙니다. WACA가 질서를 위해 사람을 분류하고 흩어 놓는다면, 자신은 죄인이 되어서라도 모두를 한곳에 거두겠다고 선택했습니다.</p>
          </article>
        </div>
      </section>

      <section className="voice-section">
        <h2 className="section-kicker"><span>06</span> 말투 · 특징 · 기타</h2>
        <div className="voice-grid">
          <div className="voice-quote">
            <p>“먼저 드세요. 배가 빈 사람에게 판단부터 요구하는 건 비겁하니까요.”</p>
            <span>낮고 부드러운 존댓말. 이름을 먼저 부르고, 선택지를 주는 것처럼 명령합니다.</span>
          </div>
          <div className="quotes-list">
            <p>“문지기 둘은 계단, 운반자는 후방. 남은 분들은 제 목소리만 따라오세요.”</p>
            <p>“떠나는 건 자유예요. 그래도 밖에서 굶게 두지는 않겠습니다.”</p>
            <p>“제 아이들이 아니에요. 제 역할들이죠. 역할은 버리지 않습니다.”</p>
          </div>
        </div>

        <div className="feature-grid">
          <article><span>ROLE</span><h3>이동식 은신처 관리자</h3><p>폭식의 보안·첩보 임무에서 은신처 관리, 인원 회수, 퇴로 통제와 다수전 지휘를 맡습니다.</p></article>
          <article><span>HABIT</span><h3>사람을 번호로 부르지 않는다</h3><p>교전 전 모든 아군의 이름과 역할을 확인하고, 작전 중에도 이름을 불러 짧게 지시합니다.</p></article>
          <article><span>COST</span><h3>큰 열량과 복부 경련</h3><p>영란을 연속 생성하면 체온과 혈당이 급락합니다. 소환수의 영란핵이 파괴될 때마다 구역질과 경련이 누적됩니다.</p></article>
          <article><span>COMMAND</span><h3>말·손짓·휘파람</h3><p>소환수는 말하지 못하며 복잡한 판단도 못 합니다. 마유의 사전 배치와 짧은 지시가 강함의 핵심입니다.</p></article>
        </div>
        <div className="misc-strip" aria-label="기타 정보">
          <b>기타</b>
          <span>생일 2월 14일 · A형</span>
          <span>오른손잡이 · 영란은 왼손으로 받아 깨뜨림</span>
          <span>설탕·소금이 든 비상식량 봉투를 늘 휴대</span>
          <span>소환수에게 이름 대신 ‘문지기’·‘길잡이’ 같은 역할명을 부여</span>
        </div>
      </section>

      <section className="preference-section">
        <h2 className="sr-only">선호와 비선호</h2>
        <div className="likes">
          <span>L / LIKE</span>
          <p>여럿이 차리는 식사 · 이름을 불렀을 때 돌아보는 사람 · 정확한 역할 분담 · 따뜻한 팥죽 · 비 오기 전의 습한 공기</p>
        </div>
        <div className="hates">
          <span>H / HATE</span>
          <p>비어 있는 자리 · 버려지는 음식과 사람 · 인원을 숫자로 부르는 태도 · 통보식 이별 · 기억 조정 · 지휘를 무시한 단독 행동</p>
        </div>
      </section>

      <footer>
        <div><b>NEST</b><span>如月 繭 · II</span></div>
        <p>SEPTEM PECCATA / GULA OPERATIVE FILE CLOSED</p>
        <a href="#top">TOP ↑</a>
      </footer>
    </main>
  );
}
