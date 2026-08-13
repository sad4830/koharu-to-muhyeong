import LoadSimulator from "./load-simulator";

const profileFacts = [
  ["이름", "시노하라 레이지 / SHINOHARA REIJI"],
  ["호출부호", "계류점 / ANCHOR"],
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
  ["최대 위력", "중형 건물 1채 파괴급"],
  ["방출 속도", "외부 물체 최대 700 m/s"],
  ["지속시간 / 쿨타임", "선은 최대 5지문 유지 · 능력 종료 후 3지문 동안 재사용 불가"],
];

const techniques = [
  {
    no: "A–01",
    name: "장력 사출",
    role: "기본 공격 · 저격",
    copy: "구조봉이나 돌조각을 선 끝에 걸어 최대 700 m/s로 곧게 쏜다. 발사한 뒤에는 방향을 바꾸거나 적을 따라가게 할 수 없다.",
    rule: "즉시 발사 · 선 1가닥 · 최대 출력의 15% · 사거리 60 m · 최대 700 m/s · 쿨타임 1지문",
    cost: "발사에 쓴 선은 즉시 사라지고 반동을 사용한 팔로 받는다. 그 팔은 다음 1지문 동안 새 선을 설치하거나 구조봉으로 공격할 수 없다. 최대 출력의 10% 이상으로 쏘면 이 제한이 2지문으로 늘어난다.",
  },
  {
    no: "A–02",
    name: "강제 회수",
    role: "무장 해제 · 견인",
    copy: "상대의 무기·갑옷·옷에 선을 걸어 빼앗거나 고정점 쪽으로 끌어당긴다. 사람의 몸에는 직접 선을 걸 수 없으며, 상대가 연결된 장비를 버리면 즉시 풀린다.",
    rule: "즉시 발동 · 선 1가닥 · 최대 견인 거리 20 m · 최대 속도 150 km/h · 최대 1지문 유지 · 쿨타임 2지문",
    cost: "견인이 끝나면 사용한 선은 사라진다. 당기는 동안 한 손으로 선을 계속 붙잡아야 하므로 그 손으로 구조봉이나 다른 선을 사용할 수 없다. 상대가 더 무겁거나 단단히 버티면 레이지도 고정점 쪽으로 끌려가며, 선이 끊기면 남은 힘의 10%가 팔과 어깨로 되돌아온다.",
  },
  {
    no: "A–03",
    name: "역하중",
    role: "방어 · 반격",
    copy: "선에 닿은 주먹·무기·잔해 같은 물리 공격의 힘을 받아서 최대 60도 옆으로 꺾어 돌려보낸다. 공격을 없애는 기술이 아니라 방향만 바꾸는 반격이다.",
    rule: "즉시 반격 · 선 1가닥 · 최대 출력의 20%까지 반격 · 방향 전환 최대 60도 · 쿨타임 2지문",
    cost: "반격에 쓴 선은 즉시 사라진다. 반격 순간에는 제자리에 버텨야 하므로 《회수 보행》을 함께 쓸 수 없다. 사용한 팔의 구조봉 타격 위력이 다음 1지문 동안 절반으로 줄어든다. 최대 출력의 15% 이상을 되돌리면 그 팔을 2지문 동안 어깨 위로 들 수 없고, 20%를 넘는 충격은 막지 못한다.",
  },
  {
    no: "A–04",
    name: "회수 보행",
    role: "고속 접근 · 구출",
    copy: "앞쪽에 건 선으로 자신이나 붙잡은 한 사람을 빠르게 끌어당긴다. 적에게 곧장 접근하거나 위험한 곳에서 동료를 빼낼 때 사용한다.",
    rule: "즉시 이동 · 선 1가닥 · 최대 150 km/h · 수직 이동 최대 20 m · 쿨타임 1지문",
    cost: "이동에 쓴 선은 착지와 함께 사라진다. 선이 당기는 직선으로만 움직이며 이동 중에는 방향을 바꾸거나 공격·방어할 수 없다. 세 번째 연속 사용부터 속도가 절반으로 떨어지고, 착지 후 1지문 동안 공격할 수 없다.",
  },
  {
    no: "A–05",
    name: "교차 압착",
    role: "범위 공격 · 포위",
    copy: "적 주위의 세 곳에 선을 걸고, 돌과 지면 조각을 가운데로 한꺼번에 끌어당긴다. 적을 세 방향에서 들이받고 주변 엄폐물과 발판도 함께 무너뜨리는 범위 공격이다.",
    rule: "준비 1지문 · 즉시 압착 · 선 3가닥 · 반경 14 m · 최대 위력은 중형 건물 1채 파괴급의 약 절반 · 쿨타임 3지문",
    cost: "준비하는 1지문 동안 다른 기술을 사용할 수 없다. 발동하면 명중 여부와 관계없이 사용한 세 가닥이 모두 사라지고, 양팔이 떨려 다음 1지문 동안 선을 새로 설치할 수 없다. 준비 중 선 하나라도 끊기면 공격이 취소되며 1지문 동안 구조봉도 들 수 없다.",
  },
  {
    no: "MAX",
    name: "하중 인계",
    role: "최대 출력",
    copy: "네 가닥에 모은 힘을 구조봉이 닿은 한곳에 전부 터뜨린다. 주변 20 m를 안쪽으로 짓눌러 중형 건물 1채를 파괴할 수 있는 충격을 낸다.",
    rule: "충전 2지문 · 즉시 방출 · 선 4가닥 · 중형 건물 1채 파괴급 · 영향 반경 20 m · 쿨타임 5지문",
    cost: "충전하는 2지문 동안 자리에서 움직이거나 다른 기술을 사용할 수 없다. 영향 반경 안의 아군과 구조물도 함께 휘말리며 세밀한 조절은 불가능하다. 사용 즉시 모든 선이 사라지고 양팔과 등 근육이 손상된다. 이후 2지문 동안 이동 속도가 절반으로 줄고 구조봉으로 공격할 수 없으며, 능력은 5지문 동안 전부 봉인된다.",
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
            “겁먹는 건 괜찮습니다. 다만 제 시야 밖으로 나가지는 마십시오.”
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
            영웅을 자처하지 않는다. 위험한 장소에 먼저 들어가는 이유를 물으면
            “연장자가 확인하는 편이 낫습니다”라고 답한다. 철수할 때는 늘 마지막까지 남아
            인원과 장비를 세고, 다친 후배는 직접 맥박을 확인한 뒤에야 보낸다.
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
            검은 머리는 귀를 덮지 않게 짧게 정리했으나 빗질 방향이 매번 조금씩 다르다. 관자놀이부터 번진 옅은 새치와 깊게 내려앉은 눈 밑, 웃을 때만 선명해지는 눈가 주름 때문에 실제 나이보다 피곤한 인상을 준다. 밤샘 작전 뒤에는 턱에 옅은 수염 그림자가 올라오고, 젖은 머리를 손바닥으로 쓸어 넘기면 새치가 더욱 선명해진다. 탁한 회갈색 눈은 상대보다 먼저 출입구와 천장 구조를 훑으며, 왼쪽 눈썹 끝에는 오래된 찢김 흉터가 남아 있다.
          </p>
          <p>
            넓은 어깨와 두꺼운 팔은 과장된 근육보다 오랫동안 중량물을 다룬 사람의 체형에 가깝다. 차콜색 고칼라 현장 재킷 안에는 목이 조금 늘어난 검은 헨리넥을 입고, 소매를 걷으면 굵은 팔뚝과 오래된 화상 자국이 드러난다. 주황 봉제선이 들어간 검은 작업 장갑, 공구 고리가 달린 전술 바지와 철심 부츠를 고집한다. 장갑을 벗은 손은 크고 거칠지만 부상자를 만질 때만큼은 놀랄 정도로 조심스럽다. 가까이 서면 진한 캔커피와 기계유, 옅은 우디 애프터셰이브 향이 섞여 난다.
          </p>
          <div className="visual-tags" aria-label="외관 핵심어">
            <span>관자놀이의 새치</span><span>옅은 수염 그림자</span><span>회갈색 눈</span><span>검은 헨리넥</span><span>걷어 올린 소매</span><span>낡은 작업 장갑</span>
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
            말은 언제나 낮고 짧으며, 나이나 직급과 관계없이 존댓말을 쓴다. 가능성과 위험을 먼저 계산해 감정 없는 사람처럼 보이지만, 실제로는 팀원의 장비 마모와 식사 여부까지 기억한다. 후배가 무리하고 있다는 걸 눈치채면 이름을 낮게 불러 앉힌 뒤 장갑을 벗고 손떨림과 맥박부터 확인한다. 무모한 희생을 용기라 부르는 것을 싫어하며, 퇴로 없는 명령에는 상관에게도 이유를 요구한다. 칭찬이나 위로는 서툴러 “다음에도 그렇게 하십시오” 같은 업무 문장으로 대신한다. 사적인 호의에는 한 박자 늦게 눈치채며, 난처할 때는 웃는 대신 눈가 주름만 조금 깊어진다. 동료가 다치면 목소리가 더 조용해지고 그때부터 모든 동작에서 망설임이 사라진다.
          </p>
          <blockquote>“할 수 있는 일과, 해도 되는 일은 다릅니다.”</blockquote>
        </div>
        <div className="mature-observation">
          <article><span>VOICE</span><strong>낮고 잠긴 목소리</strong><p>긴 작전 뒤에는 말끝이 조금 갈라진다. 화를 낼수록 소리를 높이지 않고 상대의 이름을 또렷하게 부른다.</p></article>
          <article><span>HANDS</span><strong>거칠고 조심스러운 손</strong><p>공구를 쥘 때는 단단하지만 부상자의 맥박을 잴 때는 힘을 완전히 뺀다. 추운 날에는 말없이 자기 장갑을 벗어 건넨다.</p></article>
          <article><span>OFF DUTY</span><strong>늦은 귀가의 생활감</strong><p>새벽 라디오를 켜 두고 장비를 손질한다. 쉬는 날 저녁에는 비 오는 창가가 있는 단골 선술집의 구석자리를 찾는다.</p></article>
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
            단단한 물체 두 곳을 빛나는 선으로 잇고, 그 선에 힘을 모으는 능력이다.
            모은 힘으로 돌이나 구조봉을 쏘고, 적의 장비를 잡아당기며, 여러 선으로 한곳을 짓누른다.
          </p>
        </div>

        <div className="ability-principle">
          <div className="principle-flow" aria-label="능력 처리 흐름">
            <div><span>STEP 01</span><strong>단단한 곳에 선을 건다</strong></div>
            <i aria-hidden="true">→</i>
            <div><span>STEP 02</span><strong>선에 힘을 채운다</strong></div>
            <i aria-hidden="true">→</i>
            <div><span>STEP 03</span><strong>쏘고 · 당기고 · 짓누른다</strong></div>
          </div>
          <p>
            쉽게 말해, 선을 먼저 설치하고 힘을 채운 뒤 세게 당기거나 놓아서 공격한다. 선의 첫 번째 끝은 손이나
            비성물 장비 《구조봉 C–11》로 벽·바닥 같은 단단한 곳을 직접 짚어야 만든다. 반대쪽 끝은 시야 안 30 m
            이내의 표면이나 적의 무기·갑옷·옷에 걸 수 있지만, 사람의 몸에는 직접 걸 수 없다. 액체·불꽃·전기·정신
            공격에도 연결할 수 없다. 한 가닥에는 전체 최대 출력의 25%까지, 네 가닥에는 중형 건물 1채를 파괴할 수
            있는 최대 출력까지 힘을 모은다. 자신의 영력으로 한 지문에 최대 출력의 절반을 채울 수 있고, 적의 물리
            공격을 받아 저장할 때는 원래 힘의 80%만 남는다.
          </p>
        </div>

        <div className="combat-loop" aria-label="하중계류 전투 운용 순서">
          <div><span>01</span><strong>선 설치</strong><p>벽·바닥·장비에 선의 두 끝을 건다.</p></div>
          <div><span>02</span><strong>힘 저장</strong><p>자신의 영력이나 물리 충격을 선에 채운다.</p></div>
          <div><span>03</span><strong>끌고 쏘기</strong><p>적의 장비를 당기고 돌이나 구조봉을 쏜다.</p></div>
          <div><span>04</span><strong>한꺼번에 방출</strong><p>여러 선의 힘으로 한곳을 짓눌러 끝낸다.</p></div>
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
                <div><dt>수치</dt><dd>{tech.rule}</dd></div>
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
            <li><strong>절단 가능</strong><span>집중 공격으로 선을 끊거나 고정면을 부수면 해제된다. 연결된 장비를 벗어 던져 강제 회수에서 빠져나올 수도 있다.</span></li>
            <li><strong>직선 한정</strong><span>선은 모서리를 돌아가지 않는다. 급격한 고저 이동과 여러 방향에서 동시에 들어오는 공격에 취약하다.</span></li>
            <li><strong>환경 의존</strong><span>넓은 공중이나 모래·진흙처럼 무른 지형에서는 안정적인 고정점을 만들기 어렵다.</span></li>
            <li><strong>비물리 공격</strong><span>불꽃·전기·정신 공격은 저장할 수 없다. 폭발도 물리적 충격만 받고 열은 그대로 감수한다.</span></li>
            <li><strong>충전 노출</strong><span>저장량 75%부터 선이 백색으로 밝아지고 금속성 굉음이 난다. 최대 출력은 네 가닥과 2지문 충전이 필요해 준비를 숨길 수 없다.</span></li>
            <li><strong>신체 역류</strong><span>선이 강제로 끊기면 남은 장력의 10%가 양팔과 척추로 되돌아와 탈구·근육 파열을 일으킨다.</span></li>
          </ul>
        </div>

        <LoadSimulator />
      </section>

      <section className="history-section" id="history">
        <div className="history-heading">
          <p className="section-no">05 / SERVICE HISTORY</p>
          <h2>버티는 일은<br />이미 오래전에 배웠다.</h2>
          <p>항만 중량물 작업자 출신. 장력을 읽는 현장 감각과 17년의 실전 경험으로 구조와 전투 양쪽을 지휘한다. 능력 각성 직후부터 지금까지 연합을 떠난 적은 없다.</p>
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
            <article><span>비성물 장비</span><h3>구조봉 C–11</h3><p>82 cm 길이의 탄소강 다목적 구조봉. 둔기·투사체·계류점 타격에 쓰며 별도 이능은 없다. 손잡이는 14년째 직접 감아 쓴다.</p></article>
            <article><span>성물</span><h3>해당 없음</h3><p>능력 슬롯은 《하중계류》 하나만 사용한다. 외부 성물에 의존하는 운용을 선호하지 않는다.</p></article>
            <article><span>권능</span><h3>미각성</h3><p>현재 권능 각성 기록 및 타락 징후 없음. 영력 안정도는 정기 검사 기준 89%다.</p></article>
            <article><span>버릇</span><h3>두 번의 확인</h3><p>출입구와 천장부터 살피고 철수 전 인원과 장비를 두 번 센다. 후배의 헐거운 보호대도 말없이 직접 조여 준다.</p></article>
          </div>
        </div>
        <div className="likes-grid">
          <div><span>L / LIKE</span><p>진한 캔커피 · 손질된 공구 · 새벽 라디오 · 비 오는 날의 단골 선술집 · 솔직하게 겁난다고 말하는 사람</p></div>
          <div><span>H / HATE</span><p>퇴로 없는 작전 · 구조 순서 무시 · 허세 섞인 희생 · 장비 방치 · 책임을 부하에게 떠넘기는 사람</p></div>
        </div>
        <details className="sealed-file">
          <summary><span>SEALED NOTE</span><strong>비공개 심리 기록 열람</strong><em>+</em></summary>
          <div>
            <p>구조 성공 인원보다 놓친 인원의 이름을 더 오래 기억한다. 숙소 책상 두 번째 서랍에는 자신이 지휘했던 모든 작전의 손상 장비표가 보관되어 있다. 상담관은 이를 생존자 죄책감에 가까운 강박으로 기록했으나, 본인은 “같은 고장은 두 번 나면 관리 실패입니다”라고 답했다.</p>
            <p>후배에게 도움을 요청하는 것을 유독 어려워한다. 본인의 부상은 계산 가능한 손실로 취급하면서 타인의 부상에는 같은 계산을 적용하지 못한다. 사적인 호의를 받으면 한동안 뜻을 알아채지 못하고, 뒤늦게 깨달은 날에는 평소보다 캔커피를 한 개 더 사 둔다.</p>
          </div>
        </details>
      </section>

      <section className="quote-section">
        <p className="section-no">VOICE SAMPLE / 04</p>
        <div className="quote-grid">
          <blockquote><span>01</span>“겁먹는 건 흉이 아닙니다. 숨기다가 죽는 게 더 곤란하지.”</blockquote>
          <blockquote><span>02</span>“제 뒤로 오십시오. 이런 일에 먼저 맞으라고 제가 나이를 먹은 겁니다.”</blockquote>
          <blockquote><span>03</span>“손 보여주십시오. …차갑군요. 제 장갑을 끼고 계시죠.”</blockquote>
          <blockquote><span>04</span>“괜찮다는 말은 제가 판단합니다. 오늘은 여기까지 하십시오.”</blockquote>
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
