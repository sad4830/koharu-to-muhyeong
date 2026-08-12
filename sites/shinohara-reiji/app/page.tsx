import LoadSimulator from "./load-simulator";

const profileFacts = [
  ["이름", "시노하라 레이지 / SHINOHARA REIJI"],
  ["호출부호", "지지점 / SUPPORT"],
  ["나이", "41세 · 1986년생"],
  ["성별", "XY"],
  ["국적", "일본"],
  ["신장 · 체중", "187 cm · 86 kg"],
  ["소속", "세계 이능 범죄 대응 연합 / WACA"],
  ["부서 및 직급", "성 안드레아의 제자"],
  ["지부", "일본 지부 · 베들레헴 특별성역 파견"],
  ["등급", "II등급"],
];

const abilitySpecs = [
  ["능력 수", "1 / 최대 2"],
  ["운용 반경", "사용자 중심 반경 60 m"],
  ["동시 전개", "최대 4가닥 · 총 길이 100 m"],
  ["저장 상한", "가닥당 300 MJ · 총 1.2 GJ"],
  ["방출 속도", "외부 물체 최대 700 m/s"],
  ["지속 / 기본 냉각", "최대 5지문 / 종료 후 3지문"],
];

const techniques = [
  {
    no: "A–01",
    name: "지지선",
    role: "구조 · 방어",
    copy: "둘 이상의 계류선을 잔해와 지면 사이에 교차시켜 무게와 충격을 나눠 받는다. 무너지는 구조물, 돌진, 낙하물을 최대 3지문 동안 붙들 수 있다.",
    rule: "2가닥 이상 점유 · 지속 3지문 · 해제 후 해당 가닥 2지문 재전개 불가",
    cost: "붙든 하중이 600 MJ를 넘으면 손가락 감각이 둔해지고 이동 속도가 절반으로 감소한다.",
  },
  {
    no: "A–02",
    name: "편향",
    role: "방어 · 반격",
    copy: "계류선에 닿은 물리 충격을 장력으로 받아 진행 방향을 최대 60도 꺾는다. 힘을 지우는 기술이 아니므로 남은 충격은 반드시 다른 고정점이나 지면으로 흘려보내야 한다.",
    rule: "즉시 발동 · 1가닥 사용 · 가닥별 쿨타임 1지문",
    cost: "200 MJ 이상의 충격을 한 번에 꺾으면 손바닥이 찢어지고 같은 팔의 정밀 조작이 2지문 동안 불가능하다.",
  },
  {
    no: "A–03",
    name: "회수 보행",
    role: "이동 · 구출",
    copy: "전방 고정점의 장력을 회수해 자신 또는 붙잡은 한 사람을 직선으로 당긴다. 본인 이동은 최대 시속 150 km, 수직 도약은 20 m를 넘지 않는다.",
    rule: "즉시 이동 · 1지문 쿨타임 · 이동 중 급회전 불가",
    cost: "2회 연속 사용하면 무릎과 어깨에 과부하가 쌓인다. 3회째에는 속도가 절반으로 떨어지고 착지 직후 1지문 동안 공격할 수 없다.",
  },
  {
    no: "A–04",
    name: "교차 고정",
    role: "제압 · 동선 통제",
    copy: "두 가닥을 X자로 겹쳐 반경 12 m의 이동로를 좁힌다. 선을 건드린 대상의 추진력을 양쪽 고정점으로 빼앗아 자세를 무너뜨리지만, 정지한 대상 자체를 강제로 묶지는 못한다.",
    rule: "지속 2지문 · 쿨타임 3지문 · 2가닥 고정 점유",
    cost: "한쪽 선이 절단되면 남은 장력이 사용자에게 되튄다. 전개 중에는 지지선과 최대 출력을 사용할 수 없다.",
  },
  {
    no: "MAX",
    name: "하중 인계",
    role: "최대 출력",
    copy: "세 개 이상의 고정점에 쌓인 장력을 한 지점으로 넘겨 충돌을 밀어내거나, 지면에 내리꽂아 전방을 제압한다. 총 방출량은 1.2 GJ, 영향 반경은 18 m가 상한이다.",
    rule: "저장량 600 MJ 이상 필요 · 즉시 방출 · 사용 후 능력 5지문 봉인",
    cost: "모든 계류선이 끊어지고 양팔 근섬유가 손상된다. 치료 전까지 악력이 절반 이하로 떨어지며 구조봉을 한 손으로 다룰 수 없다.",
  },
];

const career = [
  ["2009", "요코하마 외곽 물류단지 변칙 붕괴 사고에서 능력 각성. 기울어진 크레인 붐을 계류해 작업자 11명의 대피 시간을 확보했다."],
  ["2010", "WACA 일본 지부 편입. 성 안드레아 부서의 구조·민간 보호 교육과 영력 통제 과정을 수료했다."],
  ["2018", "베들레헴 특별성역 동부 피난 작전에서 임시 현장 지휘를 맡은 뒤 구조 4조 반장으로 지정됐다."],
  ["2027", "전선 붕괴 사고 대응과 신입 생존 교육을 목적으로 특별성역에 장기 파견. 현재 기록은 파견 71일 차에 갱신됐다."],
];

export default function Home() {
  return (
    <main>
      <div className="paper-noise" aria-hidden="true" />

      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="시노하라 레이지 기록 첫 화면">
          <span className="wordmark-mark">W</span>
          <span>WACA / JAPAN BRANCH</span>
        </a>
        <nav className="header-nav" aria-label="기록 바로가기">
          <a href="#profile">신상</a>
          <a href="#ability">능력</a>
          <a href="#history">이력</a>
          <a href="#ark">ARK</a>
        </nav>
        <div className="topbar-status">
          <span className="status-dot" aria-hidden="true" />
          <span>ARK SECURE LINE</span>
          <span className="topbar-code">JP–II / 047</span>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">FIELD SUPERVISOR / PERSONNEL RECORD</p>
          <p className="hero-index">02</p>
          <h1>
            <span className="name-ko">시노하라 레이지</span>
            <span className="name-en">SHINOHARA REIJI</span>
          </h1>
          <p className="hero-line">
            “살아 돌아가는 것까지가 임무입니다. 그러니 제 뒤에 계십시오.”
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#profile">기록 열람</a>
            <a className="text-link" href="#ability">능력 운용 기록 <span aria-hidden="true">↘</span></a>
          </div>
        </div>

        <aside className="hero-dossier" aria-label="요약 신원 정보">
          <div className="dossier-head">
            <span>IDENTITY / VERIFIED</span>
            <span className="stamp">연합</span>
          </div>
          <dl className="identity-grid">
            <div><dt>AGE</dt><dd>41</dd></div>
            <div><dt>SEX</dt><dd>XY</dd></div>
            <div><dt>HEIGHT</dt><dd>187 CM</dd></div>
            <div><dt>WEIGHT</dt><dd>86 KG</dd></div>
            <div><dt>NATIONALITY</dt><dd>JAPAN</dd></div>
            <div><dt>GRADE</dt><dd>II</dd></div>
          </dl>
          <div className="clearance">
            <div className="clearance-label"><span>현장 신뢰도</span><span>92%</span></div>
            <div className="clearance-track"><span /></div>
          </div>
          <p className="dossier-note">외관 이미지 미첨부 · 텍스트 기록으로 대체</p>
        </aside>

        <div className="load-path" aria-hidden="true">
          <span className="anchor anchor-a" />
          <span className="anchor anchor-b" />
          <span className="anchor anchor-c" />
          <span className="path path-a" />
          <span className="path path-b" />
          <span className="path-label">LOAD PATH / STABLE</span>
        </div>
      </section>

      <section className="record-section" id="profile">
        <div className="section-heading">
          <p className="section-no">01 / PUBLIC RECORD</p>
          <h2>마모된 사람은<br />쉽게 부러지지 않는다.</h2>
        </div>
        <div className="record-copy">
          <p className="lead">
            영웅을 자처하지 않는다. 누군가는 출구를 확인하고, 부상자를 세고,
            마지막까지 남아야 한다는 이유만으로 늘 가장 앞에 선다.
          </p>
          <dl className="profile-facts">
            {profileFacts.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="portraitless-section">
        <div className="no-portrait" aria-label="외관 이미지 없음">
          <span className="corner corner-tl" /><span className="corner corner-tr" />
          <span className="corner corner-bl" /><span className="corner corner-br" />
          <p>NO VISUAL<br />ASSET</p>
          <small>DESCRIPTION ONLY</small>
          <span className="scan-line" aria-hidden="true" />
        </div>
        <div className="description-copy">
          <p className="section-no">02 / APPEARANCE</p>
          <h2>단정함보다 먼저<br />생활의 흔적이 보인다.</h2>
          <p>
            검은 머리는 귀를 덮지 않게 짧게 정리했으나 빗질 방향이 매번 조금씩 다르다. 관자놀이부터 번진 옅은 새치와 깊게 내려앉은 눈 밑, 웃을 때만 선명해지는 눈가 주름 때문에 실제 나이보다도 피곤한 인상을 준다. 탁한 회갈색 눈은 상대보다 먼저 출입구와 천장 구조를 훑으며, 왼쪽 눈썹 끝에는 오래된 찢김 흉터가 남아 있다. 넓은 어깨와 두꺼운 팔은 과장된 근육보다 오랫동안 중량물을 다룬 사람의 체형에 가깝다. 차콜색 고칼라 현장 재킷, 주황 봉제선이 들어간 검은 작업 장갑, 공구 고리가 달린 전술 바지와 철심 부츠를 고집한다. 손등의 화상 자국과 닳아 반들거리는 장갑 손바닥이 유일한 장식이다.
          </p>
          <div className="visual-tags" aria-label="외관 핵심어">
            <span>관자놀이의 새치</span><span>회갈색 눈</span><span>눈가 주름</span><span>차콜 현장복</span><span>낡은 작업 장갑</span>
          </div>
        </div>
      </section>

      <section className="temper-section">
        <div>
          <p className="section-no">03 / TEMPERAMENT</p>
          <h2>무심한 실무자.<br />완고한 보호자.</h2>
        </div>
        <div className="temper-copy">
          <div className="keyword-row"><span>현실적</span><span>절제된</span><span>책임감</span><span>은근한 다정함</span></div>
          <p>
            말은 언제나 낮고 짧으며, 나이나 직급과 관계없이 존댓말을 쓴다. 가능성과 위험을 먼저 계산해 감정 없는 사람처럼 보이지만, 실제로는 팀원의 장비 마모와 식사 여부까지 기억하는 세심한 성격이다. 무모한 희생을 용기라 부르는 것을 싫어하며, 퇴로 없는 명령에는 상관에게도 이유를 요구한다. 불평은 많지 않지만 납득하지 못한 지시는 단 한 걸음도 움직이지 않는 완고함이 있다. 칭찬이나 위로는 서툴러서 “다음에도 그렇게 하십시오” 같은 업무 문장으로 대신한다. 동료가 다치면 분노를 드러내기보다 목소리가 더 조용해지고, 그때부터 모든 동작에서 불필요한 망설임이 사라진다.
          </p>
          <blockquote>“할 수 있는 일과, 해도 되는 일은 다릅니다.”</blockquote>
        </div>
      </section>

      <section className="ability-section" id="ability">
        <div className="ability-header">
          <div>
            <p className="section-no">04 / ABILITY LOG</p>
            <span className="ability-kicker">INNATE ABILITY · 1 OF 2</span>
            <h2>《하중계류》</h2>
          </div>
          <p className="ability-summary">
            비생물 고정점 사이에 영력 계류선을 걸어 물리적 충격과 무게를 장력으로 저장하고,
            필요한 방향으로 분산·회수·방출한다. 힘을 없애는 것이 아니라 잠시 맡아 두는 능력이다.
          </p>
        </div>

        <div className="ability-principle">
          <div className="principle-flow" aria-label="능력 처리 흐름">
            <div><span>INPUT</span><strong>충격 · 하중 · 추진력</strong></div>
            <i aria-hidden="true">→</i>
            <div><span>PROCESS</span><strong>계류선에 장력 저장</strong></div>
            <i aria-hidden="true">→</i>
            <div><span>OUTPUT</span><strong>분산 · 견인 · 방출</strong></div>
          </div>
          <p>
            첫 고정점은 반드시 손이나 비성물 장비 《구조봉 C–11》로 단단한 비생물 표면을 직접 짚어야 한다.
            두 번째 고정점은 시야 안 30 m 이내의 표면에 연결할 수 있다. 생물의 몸, 액체, 불꽃, 전기,
            정신 공격에는 선을 고정할 수 없으며 계류선에 직접 닿지 않은 현상도 저장하지 못한다.
            저장 과정에서 최소 20%가 열과 진동으로 손실된다.
          </p>
        </div>

        <dl className="spec-grid">
          {abilitySpecs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>

        <div className="technique-list">
          {techniques.map((tech) => (
            <article className={tech.no === "MAX" ? "technique-card max-card" : "technique-card"} key={tech.name}>
              <div className="technique-title"><span>{tech.no}</span><h3>{tech.name}</h3><em>{tech.role}</em></div>
              <p>{tech.copy}</p>
              <dl>
                <div><dt>운용</dt><dd>{tech.rule}</dd></div>
                <div><dt>패널티</dt><dd>{tech.cost}</dd></div>
              </dl>
            </article>
          ))}
        </div>

        <div className="limits-panel">
          <div>
            <p className="section-no">OBSERVABLE LIMITS</p>
            <h3>선은 밝아질수록<br />파훼하기 쉬워진다.</h3>
          </div>
          <ul>
            <li><strong>절단 가능</strong><span>계류선은 실체에 가까운 영력 구조다. 집중 공격으로 끊거나 고정면을 부수면 해제된다.</span></li>
            <li><strong>직선 한정</strong><span>선은 모서리를 돌아가지 않는다. 다중 방향 공격과 급격한 위치 변경에 취약하다.</span></li>
            <li><strong>과부하 표시</strong><span>저장량 75%부터 주황빛이 백색으로 변하고 금속음이 커져, 상대도 포화 시점을 읽을 수 있다.</span></li>
            <li><strong>신체 역류</strong><span>선이 강제로 끊기면 남은 장력의 10%가 양팔과 척추로 되돌아와 탈구·근육 파열을 일으킨다.</span></li>
          </ul>
        </div>

        <LoadSimulator />
      </section>

      <section className="history-section" id="history">
        <div className="history-heading">
          <p className="section-no">05 / SERVICE HISTORY</p>
          <h2>버티는 일은<br />이미 오래전에 배웠다.</h2>
          <p>전직 사무직이 아닌 항만 중량물 작업자 출신. 능력 각성 직후부터 지금까지 연합을 떠난 적은 없다.</p>
        </div>
        <ol className="timeline">
          {career.map(([year, copy]) => <li key={year}><time>{year}</time><p>{copy}</p></li>)}
        </ol>
      </section>

      <section className="details-section">
        <div className="field-kit">
          <p className="section-no">06 / FIELD NOTES</p>
          <h2>특징 및 소지품</h2>
          <div className="note-grid">
            <article><span>비성물 장비</span><h3>구조봉 C–11</h3><p>82 cm 길이의 탄소강 다목적 구조봉. 지렛대·망치·계류점 타격에 쓰며 별도 이능은 없다.</p></article>
            <article><span>성물</span><h3>해당 없음</h3><p>능력 슬롯은 《하중계류》 하나만 사용한다. 외부 성물에 의존하는 운용을 선호하지 않는다.</p></article>
            <article><span>권능</span><h3>미각성</h3><p>현재 권능 각성 기록 및 타락 징후 없음. 영력 안정도는 정기 검사 기준 89%다.</p></article>
            <article><span>버릇</span><h3>두 번의 확인</h3><p>어떤 방에 들어가든 출입구와 천장부터 보고, 철수 전에는 인원과 장비를 반드시 두 번 센다.</p></article>
          </div>
        </div>
        <div className="likes-grid">
          <div><span>L / LIKE</span><p>진한 캔커피 · 손질된 공구 · 겨울 새벽 · 지시를 한 번에 듣는 사람 · 구운 고등어</p></div>
          <div><span>H / HATE</span><p>퇴로 없는 작전 · 구조 순서 무시 · 허세 섞인 희생 · 장비 방치 · 책임을 부하에게 떠넘기는 사람</p></div>
        </div>
        <details className="sealed-file">
          <summary><span>SEALED NOTE</span><strong>비공개 심리 기록 열람</strong><em>+</em></summary>
          <div>
            <p>구조 성공 인원보다 놓친 인원의 이름을 더 오래 기억한다. 숙소 책상 두 번째 서랍에는 자신이 지휘했던 모든 작전의 손상 장비표가 보관되어 있다. 상담관은 이를 생존자 죄책감에 가까운 강박으로 기록했으나, 본인은 “같은 고장은 두 번 나면 관리 실패입니다”라고 답했다.</p>
            <p>후배에게 도움을 요청하는 것을 유독 어려워한다. 본인의 부상은 계산 가능한 손실로 취급하면서 타인의 부상에는 같은 계산을 적용하지 못하는 불균형이 관찰된다.</p>
          </div>
        </details>
      </section>

      <section className="quote-section">
        <p className="section-no">VOICE SAMPLE / 04</p>
        <div className="quote-grid">
          <blockquote><span>01</span>“경고는 두 번 하지 않습니다. 첫 번째에 움직이면 다치지 않으니까요.”</blockquote>
          <blockquote><span>02</span>“제가 남는 편이 계산상 맞습니다. 감상은 돌아가서 듣죠.”</blockquote>
          <blockquote><span>03</span>“괜찮다는 말 대신 손을 보여주십시오. 떨리면 교대입니다.”</blockquote>
          <blockquote><span>04</span>“지쳤다고 일을 망칠 권리가 생기지는 않습니다.”</blockquote>
        </div>
      </section>

      <section className="ark-section" id="ark">
        <div className="ark-watch" aria-hidden="true">
          <span className="watch-ring ring-one" /><span className="watch-ring ring-two" />
          <div className="watch-face"><small>ARK</small><strong>11:47</strong><em>SECURE</em></div>
        </div>
        <div className="ark-copy">
          <p className="section-no">07 / STANDARD ISSUE</p>
          <h2>ARK 표준 연합 시계</h2>
          <p>구조 요청, 임무 보고, 녹음·기록, 위치 공유, 긴급 통신, 자동 번역, 사건 후 민간인 기억 조정을 지원한다. 레이지는 왼손목에 착용하며 계류선 과부하 경고를 진동으로 연동해 두었다.</p>
          <div className="ark-functions"><span>구조 요청</span><span>긴급 통신</span><span>위치 공유</span><span>자동 번역</span><span>기록 보존</span><span>기억 조정</span></div>
        </div>
      </section>

      <section className="principles-section">
        <p className="section-no">WACA / THREE PRINCIPLES</p>
        <ol>
          <li><span>01</span><p>인류를 위협하는 초자연 존재와 이능을 통제한다.</p></li>
          <li><span>02</span><p>어떤 희생을 치르더라도 인류의 질서와 문명을 유지한다.</p></li>
          <li><span>03</span><p>무력은 보호를 위한 최후의 수단으로 사용한다.</p></li>
        </ol>
      </section>

      <section className="notice-section">
        <div><span>WORLD DATE</span><strong>2027</strong></div>
        <p>본 문서는 WACA 세계관을 기반으로 한 성인 인간 창작 캐릭터 프로필입니다. 일반 활동의 공간적 배경은 베들레헴 특별성역이며, 등장하는 인명·지명·설정은 실제와 무관합니다. 외관 이미지는 사용하지 않았습니다.</p>
      </section>

      <footer>
        <span>WACA ARCHIVE / ARK NODE 11</span>
        <a href="#top">RETURN TO TOP ↑</a>
      </footer>
    </main>
  );
}
