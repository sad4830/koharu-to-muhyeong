const profileRows = [
  ["이름", "루시아 아길라르 / Lucía Aguilar"],
  ["세례명", "리베라 / LIBERA"],
  ["나이 · 성별", "25세 · XX"],
  ["국적", "스페인"],
  ["신장 · 체중", "171cm · 62kg"],
  ["소속", "세계 이능 범죄 대응 연합"],
  ["부서", "성 안드레아의 제자"],
  ["지부", "프랑스 지부"],
  ["등급", "II등급"],
  ["역할", "구조 · 진입 · 제한 제압"],
];

const applications = [
  {
    code: "A-01",
    name: "리턴 스텝",
    text: "발밑의 반발력을 한 번에 방출해 직선으로 급가속한다. 공중에서는 방향을 바꿀 수 없다.",
  },
  {
    code: "A-02",
    name: "세이프 플로어",
    text: "추락 지점을 넓고 부드럽게 바꿔 민간인과 아군을 받아낸다. 승용차 1대급 하중마다 대반발 1회를 소모한다.",
  },
  {
    code: "A-03",
    name: "리코일 클린치",
    text: "늘린 팔로 상대나 잔해를 붙잡고 신체의 탄성으로 끌어당긴다. 대상 자체는 변형되지 않는다.",
  },
  {
    code: "A-04",
    name: "폴드 백",
    text: "표면의 가장자리를 직접 당겨 곡면 방패로 사용한다. 참격과 영력 공격은 완전히 막지 못한다.",
  },
];

const personality = [
  ["낙천적", "공포에 질린 사람이 자신의 목소리를 따라올 수 있도록 가장 먼저 웃는다."],
  ["기민함", "가벼워 보이는 움직임 속에서도 출구, 하중, 붕괴 방향을 계속 계산한다."],
  ["책임감", "구조 대상이 자신의 발로 걸어 나오는 순간까지 임무가 끝났다고 생각하지 않는다."],
  ["반권위적", "규율은 따르지만, 민간인을 너무 쉽게 포기하는 명령에는 계급과 무관하게 이의를 제기한다."],
];

function SectionTitle({
  index,
  eyebrow,
  title,
  copy,
}: {
  index: string;
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="section-title">
      <span className="section-index">{index}</span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="section-copy">{copy}</p>
      </div>
    </div>
  );
}

function BeatRail() {
  return (
    <div className="beat-rail" aria-label="네 박자의 발동 리듬">
      {["01", "02", "03", "04"].map((beat) => (
        <span key={beat}>
          <i />
          {beat}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main id="top" className="site-shell">
      <div className="site-noise" aria-hidden="true" />
      <div className="elastic-ghost ghost-one" aria-hidden="true" />
      <div className="elastic-ghost ghost-two" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="리베라 프로필 처음으로">
          <span>WACA</span>
          <small>FIELD PERSONNEL ARCHIVE</small>
        </a>
        <nav aria-label="프로필 목차">
          <a href="#identity">신원</a>
          <a href="#abilities">능력</a>
          <a href="#operation">운용</a>
          <a href="#personality">기록</a>
        </nav>
        <div className="grade-chip" aria-label="II등급">
          <span>GRADE</span>
          <strong>II</strong>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="classification-line">
          <span>WACA / BETHLEHEM SPECIAL SANCTUARY</span>
          <span>FILE 02—LIBERA</span>
          <span>2027 · ACTIVE</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span className="live-dot" /> 성 안드레아 직속 현장 구조 요원
            </p>
            <h1 id="hero-title" aria-label="리베라">
              <span className="letter letter-l">L</span>
              <span className="letter letter-i">I</span>
              <span className="letter letter-b">B</span>
              <span className="letter letter-e">E</span>
              <span className="letter letter-r">R</span>
              <span className="letter letter-a">A</span>
            </h1>
            <div className="hero-name-row">
              <p>루시아 아길라르</p>
              <span>Lucía Aguilar</span>
            </div>
            <blockquote>
              “자유는 마음대로 날뛰는 게 아니야.
              <br />
              누구도 네 다음 발걸음을 대신 포기하지 못하게 하는 거지.”
            </blockquote>
            <div className="hero-actions">
              <a className="primary-action" href="#abilities">
                능력 열람 <span aria-hidden="true">↘</span>
              </a>
              <a className="text-action" href="#identity">
                신원 기록 확인
              </a>
            </div>
          </div>

          <div className="kinetic-seal" aria-label="외관 이미지 없이 구성된 사박탄성 능력 문장">
            <div className="orbit orbit-outer" aria-hidden="true">
              <span className="orbit-node node-one" />
              <span className="orbit-node node-two" />
            </div>
            <div className="orbit orbit-middle" aria-hidden="true" />
            <div className="seal-center">
              <span>ABILITY<br />SIGNATURE</span>
              <strong>4</strong>
              <em>BEATS</em>
            </div>
            <div className="seal-tag tag-top">RHYTHM</div>
            <div className="seal-tag tag-right">REBOUND</div>
            <div className="seal-tag tag-bottom">RESCUE</div>
            <p className="visual-note">VISUAL RECORD / OWNER INPUT PENDING</p>
          </div>
        </div>

        <div className="ticker" aria-hidden="true">
          <div>
            <span>STRETCH</span><i>●</i><span>ABSORB</span><i>●</i><span>REBOUND</span><i>●</i><span>EVACUATE</span><i>●</i>
            <span>STRETCH</span><i>●</i><span>ABSORB</span><i>●</i><span>REBOUND</span><i>●</i><span>EVACUATE</span><i>●</i>
          </div>
        </div>
      </section>

      <section id="identity" className="section identity-section">
        <SectionTitle
          index="01"
          eyebrow="IDENTITY / ASSIGNMENT"
          title="먼저 사람을 내보낸다."
          copy="전투보다 구조를 우선하는 II등급 현장 요원. 단단한 길을 부수는 대신, 잠시 휘게 만들어 탈출구를 만든다."
        />

        <div className="identity-layout">
          <article className="dossier-card">
            <div className="card-stamp">CLEARED · II</div>
            <div className="profile-list">
              {profileRows.map(([label, value]) => (
                <div className="profile-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="visual-empty">
              <span>외관 기록</span>
              <strong>사용자 작성 대기</strong>
              <p>요청에 따라 인물 이미지와 외관 서술을 생성하지 않았습니다.</p>
            </div>
          </article>

          <article className="origin-card">
            <p className="eyebrow">ORIGIN LOG</p>
            <h3>벽 하나가 이 사람들의 내일을 결정하게 둘 수 없다.</h3>
            <div className="origin-copy">
              <p>
                스무 살의 루시아는 이능 사건으로 붕괴한 지하 공연장에 갇혔다. 탈출구가 잔해에 잠긴 뒤에도 부상자를 두고 혼자 빠져나가기를 거부했다.
              </p>
              <p>
                그 신념이 한계에 닿은 순간 메시아의 목소리를 들었다. 단단한 바닥은 충격을 받아들이고 되돌려주는 발판으로 변했고, 생존자들은 차례로 지상에 도달했다.
              </p>
              <p>
                사건은 시설 노후화로 은폐되었다. 이후 성 안드레아의 제자가 된 그녀는 칠죄교단의 ‘책임 없는 해방’을 정면으로 부정한다.
              </p>
            </div>
            <div className="belief-strip">
              <span>신념</span>
              <p>자유란 욕망을 풀어놓는 일이 아니라, 빼앗긴 선택권을 되찾는 일이다.</p>
            </div>
          </article>
        </div>
      </section>

      <section id="abilities" className="section ability-section">
        <SectionTitle
          index="02"
          eyebrow="ABILITY / TWO-SLOT REGISTER"
          title="네 박자 안에서, 전장은 휘어진다."
          copy="신체와 지면을 각각 탄성화하는 두 능력만 등록했다. 타인 고무화·거대화·현실조작은 불가능하다."
        />

        <article className="ability-panel ability-primary">
          <div className="ability-heading">
            <div>
              <span className="ability-number">ABILITY 01</span>
              <h3>《사박탄성》</h3>
              <p>Four-beat elasticity</p>
            </div>
            <div className="ability-badge">SELF</div>
          </div>
          <BeatRail />
          <div className="ability-body">
            <div className="ability-description">
              <p className="lead">
                발뒤꿈치의 두 번 울림과 네 박자의 호흡으로 심장에 영력을 동조시켜, 자신의 전신을 고탄성 구조로 전환한다.
              </p>
              <ul className="check-list">
                <li>팔다리 최대 6m 신축</li>
                <li>전신을 본래 높이의 약 1/3까지 압축</li>
                <li>낙하·둔중한 충격 분산</li>
                <li>II등급 이하 순수 물리 충격 1회만 저장</li>
                <li>한 지문당 대변형 1회</li>
              </ul>
            </div>
            <div className="spec-stack">
              <div><span>지속</span><strong>최대 5지문</strong></div>
              <div><span>쿨타임</span><strong>해제 후 4지문</strong></div>
              <div><span>대변형 3회</span><strong>손·무릎 떨림</strong></div>
              <div><span>대변형 5회</span><strong>강제 해제</strong></div>
            </div>
          </div>
          <div className="penalty-line">
            <strong>COUNTER</strong>
            <p>참격·관통·화염·전기에는 내성이 없다. II등급 상한을 넘는 충격과 저장 한도 초과분은 그대로 피해로 들어오며, 영력이 실린 공격 자체는 저장할 수 없다.</p>
          </div>
        </article>

        <article className="ability-panel ability-secondary">
          <div className="ability-heading">
            <div>
              <span className="ability-number">ABILITY 02</span>
              <h3>《반발무대》</h3>
              <p>Rebound stage</p>
            </div>
            <div className="ability-badge">FIELD</div>
          </div>
          <div className="field-visual" aria-hidden="true">
            <div className="field-grid" />
            <div className="field-wave wave-a" />
            <div className="field-wave wave-b" />
            <span>12m</span>
          </div>
          <div className="ability-body">
            <div className="ability-description">
              <p className="lead">
                양손 또는 양발로 접촉한 무생물 고체의 표면층에 영력을 흘려보내, 탄성과 반발력을 조절한다. 표면은 외력이 있어야 움직인다.
              </p>
              <ul className="check-list">
                <li>반경 12m · 최대 면적 30㎡</li>
                <li>표면 깊이 최대 30cm</li>
                <li>한 번에 이어진 표면 하나</li>
                <li>II등급 이하 순수 물리 대반발 최대 3회</li>
                <li>추락 완충·도약·굴곡 방패 운용</li>
              </ul>
            </div>
            <div className="spec-stack">
              <div><span>지속</span><strong>최대 3지문</strong></div>
              <div><span>쿨타임</span><strong>해제 후 4지문</strong></div>
              <div><span>유지</span><strong>매 지문 재접촉</strong></div>
              <div><span>대반발 3회</span><strong>현기증·강제 해제</strong></div>
            </div>
          </div>
          <div className="penalty-line">
            <strong>EXCLUDED</strong>
            <p>생명체·액체·기체·불꽃·전기·영력 공격과 타인이 들고 있는 물건에는 적용할 수 없다. 상한을 넘는 충격은 표면을 파괴하고 사용자에게 전달되며, 공격 방향도 자동으로 반사하지 않는다.</p>
          </div>
        </article>

        <div className="application-grid">
          {applications.map((item) => (
            <article className="application-card" key={item.code}>
              <span>{item.code}</span>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="operation" className="section operation-section">
        <SectionTitle
          index="03"
          eyebrow="OPERATION / COMBAT LOOP"
          title="단단함을 이기는 대신, 각도를 바꾼다."
          copy="정면 화력전보다 구조 동선과 반발 각도를 설계하는 전투 방식이다. 강한 한 방을 유도하고, 다른 방향으로 되돌려준다."
        />

        <div className="operation-track">
          {[
            ["01", "표면 확보", "퇴로와 민간인 위치를 확인한 뒤 반발무대를 지정한다."],
            ["02", "박동 동조", "네 박자에 맞춰 사박탄성을 발동하고 이동 각도를 만든다."],
            ["03", "충격 유도", "상대의 강한 공격을 흘려 받아 다음 지문까지 반동을 보관한다."],
            ["04", "탈출 완성", "저장한 힘을 구조·제압 중 필요한 한 방향으로만 방출한다."],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <article className="maximum-card">
          <div className="max-label">
            <span>COMBINED MAXIMUM</span>
            <strong>그랜드 엑시트</strong>
          </div>
          <div className="max-copy">
            <p>
              반발무대 전체와 자신의 전신을 동시에 압축해 축적된 반동을 한 방향으로 방출한다. 돌진 타격 또는 대형 잔해 제거 중 하나로만 사용한다.
            </p>
            <ul>
              <li>최대 출력: 중형 건물 1채 파괴 상한</li>
              <li>사용 즉시 두 능력 모두 종료</li>
              <li>기존 쿨타임을 대신해 각각 6지문 적용</li>
              <li>이후 2지문간 자력 보행 곤란·부정맥·호흡 곤란</li>
            </ul>
          </div>
          <div className="max-ring" aria-hidden="true"><span>EXIT</span></div>
        </article>

        <div className="counter-grid">
          <article>
            <span>BEST RANGE</span>
            <strong>0—12m</strong>
            <p>지정 표면과 신체 반동을 함께 사용할 수 있는 범위.</p>
          </article>
          <article>
            <span>BAD MATCH</span>
            <strong>참격 · 구속</strong>
            <p>연속적인 관통 공격과 호흡을 차단하는 구속에 취약하다.</p>
          </article>
          <article>
            <span>RELIC</span>
            <strong>없음</strong>
            <p>성물 슬롯을 사용하지 않는다. 권능 또한 미각성 상태다.</p>
          </article>
        </div>
      </section>

      <section id="personality" className="section personality-section">
        <SectionTitle
          index="04"
          eyebrow="BEHAVIOR / PERSONAL NOTES"
          title="웃음은 공포가 없다는 뜻이 아니다."
          copy="루시아에게 웃음은 민간인의 공황을 낮추고, 자신이 아직 움직일 수 있음을 알리는 구조 신호에 가깝다."
        />

        <div className="personality-grid">
          {personality.map(([title, text], index) => (
            <article key={title} className={`personality-card tone-${index + 1}`}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className="preference-layout">
          <article className="preference-card likes">
            <p className="eyebrow">LIKES</p>
            <h3>열린 공간과<br />살아 돌아온 목소리</h3>
            <p>타악기, 개방된 옥상, 탄산음료, 유연한 작전, 구조 대상이 자신의 발로 걸어 나오는 순간.</p>
          </article>
          <article className="preference-card hates">
            <p className="eyebrow">HATES</p>
            <h3>잠긴 출구와<br />너무 쉬운 체념</h3>
            <p>잠긴 비상구, 불필요한 구속, 책임 회피, 그리고 ‘어쩔 수 없는 희생’이라는 표현.</p>
          </article>
          <article className="field-note">
            <span>FIELD NOTE 04-7</span>
            <blockquote>“내가 웃고 있으면 길이 있다는 뜻이야. 그러니까 아직 포기하지 마.”</blockquote>
            <p>— 프랑스 지부 합동 구조훈련 기록 중</p>
          </article>
        </div>
      </section>

      <footer>
        <div className="footer-mark">WACA</div>
        <div>
          <p>WORLD ABILITY CRIME ALLIANCE</p>
          <span>AUTHORIZED PERSONNEL PROFILE · 2027</span>
        </div>
        <a href="#top">처음으로 ↑</a>
      </footer>
    </main>
  );
}
