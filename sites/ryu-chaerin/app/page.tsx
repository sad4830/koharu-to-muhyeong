import { CountBoard } from "./count-board";

const facts = [
  ["소속", "WACA 연합"],
  ["등급", "II등급"],
  ["부서", "성 안드레아의 제자"],
  ["지부", "대한민국 지부"],
];

const profileRows = [
  ["이름", "류채린 / Ryu Chae-rin"],
  ["현장 호출명", "카운트"],
  ["나이", "21세"],
  ["생년월일", "2006년 6월 21일"],
  ["성별", "여성 (XX)"],
  ["국적", "대한민국"],
  ["신장 / 체중", "169cm / 54kg"],
  ["직업", "프로 치어리더 / 현장지원 요원"],
];

const referenceLinks = [
  ["프로필 양식", "https://posty.pe/pqmehhac"],
  ["검사 가이드", "https://posty.pe/p35tci3c"],
  ["세계관 문서", "https://posty.pe/pm97mvdc"],
  ["총공지", "https://posty.pe/pnmk90hc"],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        본문으로 건너뛰기
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="류채린 프로필 맨 위로">
          <span>WACA</span>
          <strong>류채린</strong>
        </a>
        <nav aria-label="프로필 주요 메뉴">
          <a href="#profile">프로필</a>
          <a href="#abilities">능력</a>
          <a href="#record">기록</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="classification">프로 치어리더 / WACA 현장지원</div>
            <h1 id="hero-title">
              <span>류채린</span>
              <small>RYU CHAE-RIN</small>
            </h1>
            <p className="hero-line">먼저 살리고, 끝까지 세운다.</p>
            <a className="primary-link" href="#abilities">
              능력 운용 기록 보기
            </a>
          </div>

          <CountBoard />

          <div className="fact-ribbon" aria-label="핵심 신원 정보">
            {facts.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="opening-record" id="profile" aria-labelledby="opening-title">
          <div className="section-heading">
            <h2 id="opening-title">박자를 잃은 사람을 다시 움직이게 한다.</h2>
            <p>
              21세 프로 치어리더이자 현장 지원 요원. 목소리와 포메이션으로
              동료의 호흡을 맞추고, 무너지는 순간을 받아낸다.
            </p>
          </div>
          <div className="identity-grid">
            <dl>
              {profileRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <aside className="portrait-policy" aria-label="외관 이미지 안내">
              <span>TEXT RECORD</span>
              <strong>인장 기록 없음</strong>
              <p>공개 인사 기록은 외관 묘사를 포함한 텍스트 열람 형식으로 제공한다.</p>
            </aside>
          </div>
        </section>

        <section className="appearance" aria-labelledby="appearance-title">
          <div className="appearance-title-wrap">
            <h2 id="appearance-title">굉장한 미인.</h2>
            <p>무대의 중심을 빼앗는 얼굴과, 사람을 받아내도록 단련된 몸.</p>
          </div>
          <div className="appearance-copy">
            <p>
              멀리서도 시선이 갈 만큼 화려하고 또렷한 이목구비를 지녔다. 햇빛을
              받으면 붉은 기가 은은하게 비치는 짙은 밤갈색 머리카락은 허리 가까이
              내려오며, 활동할 때에는 높은 포니테일로 단단히 묶는다. 길고 풍성한
              속눈썹 아래 밝은 호박빛 눈동자, 웃을 때 살짝 올라가는 눈꼬리와 선명한
              입매가 무대 위에서 특히 돋보인다. 맑고 건강한 상아색 피부와 왼쪽 눈
              아래의 작은 점이 인상을 완성한다.
            </p>
            <p>
              오랜 치어리딩 훈련으로 어깨와 복부가 단단하고 허리는 잘록하다.
              허벅지와 종아리에는 도약과 착지를 반복해 만든 균형 잡힌 잔근육이
              자리한다. 단순히 마른 체형이 아니라 유연성과 근력이 고르게 발달한
              보기 좋은 운동선수 체형이다. 임무복은 치어 유니폼의 날렵한 선을
              남기되 노출보다 움직임과 보호를 우선하며, 무릎 보호대와 발목 테이핑을
              빠뜨리지 않는다.
            </p>
          </div>
          <div className="appearance-notes" aria-label="외관 핵심 특징">
            <span>밤갈색 포니테일</span>
            <span>호박빛 눈</span>
            <span>왼쪽 눈 아래 점</span>
            <span>단련된 운동선수 체형</span>
          </div>
        </section>

        <section className="personality" aria-labelledby="personality-title">
          <div className="personality-intro">
            <h2 id="personality-title">밝음은 기분이 아니라 선택이다.</h2>
            <blockquote>
              “괜찮다고 우기지 마요. 아프면 아프다고 해야 제가 박자를 맞출 수
              있으니까.”
            </blockquote>
          </div>
          <div className="personality-score">
            <article>
              <h3>훈련된 낙관</h3>
              <p>
                불안한 사람 앞에서 먼저 무너지지 않기로 선택한다. 부상과 공포를
                정확히 인정한 다음, 지금 할 수 있는 일을 짧고 구체적으로 제시한다.
              </p>
            </article>
            <article>
              <h3>현장형 리더</h3>
              <p>
                표정, 호흡, 발을 디디는 간격으로 상태를 읽는다. 위급할 때에는
                화사한 말투가 사라지고 누구나 알아들을 짧은 지시만 남는다.
              </p>
            </article>
            <article>
              <h3>까다로운 완벽주의</h3>
              <p>
                부상을 숨기거나 준비 부족을 운으로 넘기는 태도를 싫어한다. 외모만
                보고 실력을 낮게 평가하면 웃는 얼굴로 훈련장에서 직접 증명한다.
              </p>
            </article>
          </div>
        </section>

        <section className="abilities" id="abilities" aria-labelledby="abilities-title">
          <div className="abilities-heading">
            <h2 id="abilities-title">두 개의 서포트 루틴</h2>
            <p>
              하나는 전열을 밀어 올리고, 하나는 무너지는 전열을 받아낸다. 두 능력은
              동시에 사용할 수 없다.
            </p>
          </div>

          <article className="ability ability-sync" data-routine="01">
            <div className="ability-name">
              <h3>
                《에이트 카운트: <span>원 모어》</span>
              </h3>
              <p>
                여덟 박자의 구호와 전신 동작으로 아군의 호흡과 신경 반응을 맞춰,
                평소보다 빠르고 강하게 움직이게 한다.
              </p>
            </div>
            <dl className="ability-metrics">
              <div><dt>대상</dt><dd>아군 최대 4명</dd></div>
              <div><dt>최초 거리</dt><dd>35m</dd></div>
              <div><dt>지속</dt><dd>3지문</dd></div>
              <div><dt>재사용 대기</dt><dd>종료 후 3지문</dd></div>
            </dl>
            <div className="ability-body">
              <section>
                <h4>발동과 효과</h4>
                <p>
                  시야 안 35m 이내의 아군을 지정하고 한 지문 동안 여덟 박자의
                  구호와 응원 동작을 끝까지 수행한다. 대상은 목소리를 들을 수 있어야
                  한다. 적용된 아군은 근력, 가속, 반응 속도가 본래 상태보다 약 30%
                  향상되고 서로의 진입과 이탈 시점을 자연스럽게 맞춘다. 새로운
                  기술을 주거나 능력의 위력을 높이지 않으며, 치료와 영력 회복도
                  없다. 같은 계열의 강화와 중첩되지 않는다.
                </p>
              </section>
              <section>
                <h4>유지 조건</h4>
                <p>
                  채린은 매 지문 한 번 이상 분명한 구호와 큰 팔 동작을 보여야 한다.
                  목소리가 완전히 차단되거나 양팔을 움직일 수 없으면 해당 지문
                  종료와 함께 모든 강화가 풀린다. 대상이 50m 밖으로 나가면 그
                  대상의 효과만 사라진다.
                </p>
              </section>
            </div>
            <details open>
              <summary>패널티와 파훼법</summary>
              <div className="detail-grid">
                <div>
                  <h4>패널티</h4>
                  <ul>
                    <li>채린 자신은 강화 대상에 포함되지 않는다.</li>
                    <li>유지 중 구호와 동작 때문에 은신이 사실상 불가능하다.</li>
                    <li>종료 후 2지문 동안 전력 질주와 큰 도약을 할 수 없다.</li>
                    <li>최초 동작이 끊기면 1지문 동안 다시 발동할 수 없다.</li>
                  </ul>
                </div>
                <div>
                  <h4>파훼</h4>
                  <p>
                    발동 중 시야나 소리를 끊고, 발동 후에는 채린에게 회피를 강요해
                    팔 동작을 막으면 된다. 대상을 50m 밖으로 분리하는 방법도
                    유효하다. 강화는 내구와 치유력을 올리지 않는다.
                  </p>
                </div>
              </div>
            </details>
          </article>

          <article className="ability ability-catch" data-routine="02">
            <div className="ability-name">
              <h3>
                《스턴트 캐치: <span>폴 세이프》</span>
              </h3>
              <p>
                치어리딩의 받침 동작처럼, 아군과 민간인의 낙하·충돌·타격 충격을
                영력 받침대로 나누어 흡수한다.
              </p>
            </div>
            <dl className="ability-metrics">
              <div><dt>대상</dt><dd>최대 4명, 자신 제외</dd></div>
              <div><dt>범위</dt><dd>반경 15m</dd></div>
              <div><dt>지속</dt><dd>2지문</dd></div>
              <div><dt>재사용 대기</dt><dd>종료 후 4지문</dd></div>
            </dl>
            <div className="ability-body">
              <section>
                <h4>발동과 효과</h4>
                <p>
                  양팔을 교차한 뒤 두 발을 고정하고 사람을 받아 올리는 자세를
                  취한다. 지정된 사람이 추락하거나 강한 타격에 밀릴 때 금백색
                  영력 띠가 몸 전체를 받쳐 골절, 장기 손상, 추락 피해와 튕겨 나가는
                  거리를 줄인다. 발동 때 8개의 안전 카운트를 얻고, 보호한 충격의
                  단계에 따라 아래처럼 카운트를 소모한다.
                </p>
                <ul className="impact-scale" aria-label="충격 단계별 방호 판정">
                  <li><strong>경미</strong><span>1카운트 · 피해 70% 감소</span></li>
                  <li><strong>중대</strong><span>2카운트 · 피해 60% 감소</span></li>
                  <li><strong>극대</strong><span>4카운트 · 피해 50% 감소</span></li>
                </ul>
                <p className="impact-rule">
                  경미는 5m 미만 추락·일반 충돌, 중대는 5~15m 추락·차량급 충돌,
                  극대는 15m 이상 추락·대형 잔해 충돌로 판정한다. 한 번의 충격에는
                  최대 4카운트만 쓸 수 있다. 남은 카운트가 필요량의 절반이면 감소율도
                  절반만 적용되며, 0이 되는 즉시 방호가 끝난다.
                </p>
              </section>
              <section>
                <h4>막지 못하는 것</h4>
                <p>
                  베기, 찌르기, 화염, 전기, 독, 질식, 정신 간섭은 막지 못한다.
                  날붙이에 맞으면 베임은 그대로 발생하고 뒤따르는 충돌만 줄인다.
                  흡수한 힘은 빛으로 흩어지며 반사하거나 공격에 쓸 수 없다.
                </p>
              </section>
            </div>
            <details open>
              <summary>패널티와 파훼법</summary>
              <div className="detail-grid">
                <div>
                  <h4>패널티</h4>
                  <ul>
                    <li>채린 자신은 보호받지 못하고 제자리에 노출된다.</li>
                    <li>1m 이상 이동하거나 양팔 자세가 무너지면 즉시 해제된다.</li>
                    <li>종료 후 2지문 동안 전력 질주와 도약을 할 수 없다.</li>
                    <li>한도 초과 시 넘어지며 초과 충격 일부가 채린에게 역류한다.</li>
                  </ul>
                </div>
                <div>
                  <h4>파훼</h4>
                  <p>
                    움직이지 못하는 채린을 먼저 공격하거나 밀쳐 내면 된다. 보호
                    대상을 15m 밖으로 끌어내거나 작은 타격을 반복해 공유 흡수량을
                    먼저 소모하는 방법, 비충격 공격으로 우회하는 방법도 유효하다.
                  </p>
                </div>
              </div>
            </details>
          </article>

          <aside className="balance-note" aria-label="II등급 밸런스 요약">
            <strong>II등급 적합성</strong>
            <p>
              능력은 정확히 두 개이며 최대 영향 거리도 80m 이하다. 직접 피해,
              치유, 영력 회복, 무적, 공격 반사가 없고 시전자 본인이 가장 취약하다.
              방호는 총 8카운트, 단일 충격 최대 4카운트로 제한된다.
            </p>
          </aside>
        </section>

        <section className="combat-loop" aria-labelledby="combat-title">
          <h2 id="combat-title">계속 밀어줄지, 지금 받아낼지.</h2>
          <div className="loop-track">
            <div>
              <span>전열 강화</span><strong>원 모어</strong>
              <p>돌격대와 구조대의 움직임을 먼저 끌어올린다.</p>
            </div>
            <div className="loop-choice"><strong>선택</strong><p>동시 사용 불가</p></div>
            <div>
              <span>충격 방호</span><strong>폴 세이프</strong>
              <p>방어선이 무너지거나 건물이 붕괴하면 받아내기로 전환한다.</p>
            </div>
          </div>
        </section>

        <section className="record" id="record" aria-labelledby="record-title">
          <div className="record-heading">
            <h2 id="record-title">누구도 혼자 떨어지게 두지 않는다.</h2>
            <p>각성 신념</p>
          </div>
          <div className="record-story">
            <p>
              고등학생 때 치어리딩을 시작했고 열아홉 살에 프로 구단의 정식
              치어리더가 됐다. 늘 중앙에 섰지만 실제로 가장 신경 쓴 것은 등 뒤에서
              뛰어오르는 동료들의 발 위치였다. 화려한 공연은 한 사람이 아니라
              서로를 믿고 받아 주는 여러 사람으로 완성된다고 믿었다.
            </p>
            <p>
              2025년 여름, 지역 축제와 연계된 경기에서 영력 오염 사고가 발생했다.
              상부 조명 구조물이 무너지고 관중석 통로가 흔들리자, 채린은 도망치지
              않고 추락하는 동료와 아이들을 향해 받침 자세를 취했다. 금백색 영력
              띠가 네 사람을 받아낸 순간 《스턴트 캐치: 폴 세이프》가 처음
              발현됐다.
            </p>
            <p>
              주변이 공포에 휩쓸리자 목이 쉬도록 여덟 박자를 세어 구조요원의
              움직임을 맞췄다. 이것이 《에이트 카운트: 원 모어》의 최초 발현이었다.
              WACA 대한민국 지부가 사건을 수습한 뒤 정식 교육을 받았고, 현재도
              프로 치어리더와 연합 현장지원 요원의 두 삶을 함께 이어 간다.
            </p>
          </div>
        </section>

        <section className="field-file" aria-labelledby="field-file-title">
          <h2 id="field-file-title">현장 파일</h2>
          <div className="field-grid">
            <article>
              <h3>배치</h3>
              <p>
                성 안드레아의 제자. 민간인 구조 및 보호 부서에서 구조대 진입 보조,
                전투원 지원, 밀집 장소 대피를 담당한다.
              </p>
            </article>
            <article>
              <h3>개인 장비 《라스트 에이트》</h3>
              <p>
                금백색 폼폼 한 쌍. 성물이 아니며 공격 기능도 없다. 구호의 박자를
                눈으로 확인하고 영력 동작을 안정시키는 개인 장비다.
              </p>
            </article>
            <article>
              <h3>ARK 설정</h3>
              <p>
                구조 신호, 보고, 기록, 위치 공유, 긴급 통신, 번역, 민간인 기억 조정
                기능을 갖춘 손목 단말과 골전도 이어셋을 함께 쓴다. 임무 영상과
                구호 시점을 함께 저장해 사후 훈련 자료로 남긴다.
              </p>
            </article>
            <article>
              <h3>신체 조건</h3>
              <p>
                체조, 낙법, 균형 감각이 뛰어나지만 능력을 쓰지 않은 몸은 잘 훈련된
                일반인 수준이다. 오래된 왼쪽 발목 부상 때문에 매번 테이핑한다.
              </p>
            </article>
            <article>
              <h3>습관</h3>
              <p>
                걸음과 반복 동작을 무의식적으로 여덟 박자씩 센다. 무대용 미소와
                진짜 웃음이 미묘하게 다르며, 가까운 동료들은 눈부터 접히는 쪽이
                진짜라는 사실을 안다. 부상자가 괜찮다고 말하면 대답보다 발의 방향과
                호흡부터 확인한다.
              </p>
            </article>
          </div>
          <div className="likes-grid">
            <div>
              <h3>LIKE</h3>
              <p>
                경기 직전의 함성, 완벽하게 맞은 군무, 복숭아 아이스티, 매운 떡볶이,
                새 운동화 냄새, 솔직하게 도움을 요청하는 사람.
              </p>
            </div>
            <div>
              <h3>HATE</h3>
              <p>
                부상 은폐, 대책 없는 낙관, 동료를 미끼로 버리는 작전, 건조하고 연기
                찬 장소, 허락 없이 폼폼을 만지는 행동.
              </p>
            </div>
          </div>
          <div className="provenance" aria-label="공식 설정과 창작 설정 구분">
            <p>
              <strong>공식 세계관 확인</strong>
              WACA 소속 구조, II등급 제한, 성 안드레아 부서, ARK 표준 기능
            </p>
            <p>
              <strong>창작 캐릭터 설정</strong>
              류채린의 생애, 외관, 성격, 개인 장비, 두 능력의 명칭과 세부 판정
            </p>
          </div>
        </section>

        <section className="quotes" aria-label="류채린 대사">
          <blockquote>“여덟까지 센다. 내 박자 놓치지 마!”</blockquote>
          <blockquote>“넘어져도 괜찮아. 내가 받쳐.”</blockquote>
          <blockquote>
            “응원은 이길 거라고 소리치는 일이 아니에요. 다시 움직이게 옆에서
            박자를 세어 주는 거지.”
          </blockquote>
        </section>
      </main>

      <footer>
        <div>
          <strong>WACA / RYU CHAE-RIN</strong>
          <p>본 프로필의 캐릭터 설정은 WACA 세계관을 바탕으로 한 창작 설정입니다.</p>
        </div>
        <nav aria-label="참고한 WACA 원문">
          {referenceLinks.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
        </nav>
      </footer>
    </>
  );
}
