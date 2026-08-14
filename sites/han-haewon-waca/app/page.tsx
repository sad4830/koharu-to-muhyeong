"use client";

import { type KeyboardEvent, useRef, useState } from "react";

const profileRows = [
  ["이름", "한해원"],
  ["나이", "23세"],
  ["생물학적 성별", "XX · 여성"],
  ["국적", "대한민국"],
  ["종 분류", "Homo sapiens · 유전자 개조 인간"],
  ["통칭", "뱀파이어"],
  ["진영", "WACA"],
  ["소속", "제9사도 성 소 야고보의 제자"],
  ["지부", "대한민국 지부"],
  ["등급", "II등급"],
  ["현재 거점", "베들레헴 특별성역"],
  ["인지", "영력 · WACA · 칠죄교단"],
  ["능력 수", "2 / 2"],
];

const combatLoop = [
  {
    title: "동의",
    text: "전투 사용까지 허락된 공여혈 30mL로 몸의 기준 박동을 맞춘다.",
  },
  {
    title: "배치",
    text: "자기 피를 혈향점으로 전개해 사선, 방벽, 반동 이동의 좌표를 만든다.",
  },
  {
    title: "압박",
    text: "보이는 직선 사격으로 상대에게 회피, 방어, 혈향점 파괴 중 하나를 고르게 한다.",
  },
  {
    title: "회수",
    text: "남은 혈향점을 거두거나 전부 소모한다. 전투 비용은 언제나 자기 몸으로 치른다.",
  },
];

const techniques = [
  {
    name: "맥침",
    cost: "혈향점 1개",
    text: "최대 초속 600m의 가느다란 직선 압력탄. 발사 직전 혈향점이 크게 뛰어 사선이 드러난다.",
  },
  {
    name: "응혈막",
    cost: "혈향점 4개",
    text: "한 방향의 총탄과 파편을 1지문 동안 흘리는 진동막. 사용한 혈향점은 즉시 파괴된다.",
  },
  {
    name: "반향보",
    cost: "혈향점 1개",
    text: "압력 반동으로 최대 15m를 급이동한다. 착지와 충돌은 자동으로 보정되지 않는다.",
  },
  {
    name: "교차맥",
    cost: "혈향점 3개",
    text: "눈에 보이는 순서대로 세 방향에서 사격한다. 먼저 파괴된 혈향점의 공격은 사라진다.",
  },
];

const timeline = [
  {
    year: "2016",
    age: "12세",
    title: "기증 번호 수첩",
    text: "재생불량성 빈혈로 반복 수혈을 받았다. 얼굴도 모르는 기증자의 번호를 적으며 자신의 생명을 빌린 것이라고 해석했다.",
    consequence: "호의를 선물이 아니라 갚아야 할 채무로 계산하기 시작했다.",
  },
  {
    year: "2020",
    age: "16세",
    title: "회복 이후",
    text: "골수 이식으로 일상에 돌아왔다. 모두는 살아난 일을 축복했지만, 해원은 받은 것보다 더 많이 돌려줘야 삶이 자기 것이 된다고 결론 내렸다.",
    consequence: "도움을 받는 순간부터 상환 계획을 세우는 사람이 되었다.",
  },
  {
    year: "2023",
    age: "19세",
    title: "혈액면역 연구",
    text: "재난 현장의 혈액 부족을 접한 뒤 생명공학과 혈액면역 연구에 들어갔다. 누구에게나 쓸 수 있는 혈장을 만드는 일이 가장 큰 상환이라고 믿었다.",
    consequence: "자기 몸을 연구 재료로 내놓는 선택이 선의처럼 보이기 시작했다.",
  },
  {
    year: "2025",
    age: "21세",
    title: "NEST 자발적 동의서",
    text: "인간 DNA와 흡혈박쥐 DNA를 결합해 혈액을 정제하는 생체 플랫폼을 만드는 실험에 자원했다. 동의는 실제였지만, 연구소가 나중에 넓힌 사용 범위까지 허락한 적은 없었다.",
    consequence: "살아 있는 인간이면서 흡혈성 표현형을 지닌 유전자 개조 인간이 되었다.",
  },
  {
    year: "2025 말",
    age: "21세",
    title: "첫 번째 생존",
    text: "그녀가 정제한 혈장으로 첫 환자가 살아났다. 몸은 타인의 혈액 신호 없이는 인간 조직과 박쥐 유래 조직의 리듬을 맞출 수 없게 되었지만, 해원은 부작용보다 생존자를 먼저 보았다.",
    consequence: "‘네가 살렸다’는 말이 더 많은 채혈을 견디게 하는 보상이 되었다.",
  },
  {
    year: "2026",
    age: "22세",
    title: "정정된 이상 반응",
    text: "시험 중단을 막으려고 혈액 탐색 충동과 생체 불일치를 자신의 손으로 축소 기록했다. 연구는 스물일곱 명에게 확대되었다.",
    consequence: "환자들을 살린다는 명분으로 그들이 위험을 선택할 권리를 먼저 빼앗았다.",
  },
  {
    year: "2027 초",
    age: "23세",
    title: "활성 완충제",
    text: "의존의 원인이 자신의 혈장이 아니라 NEST가 고의로 반복 투여한 완충제임을 발견했다. 연구소는 2기 모집 공고에 해원의 말을 사용하고 있었다.",
    consequence: "치료 자료와 혈장을 훔쳐 탈출했고, 회수팀을 막는 순간 영력이 각성했다.",
  },
  {
    year: "현재",
    age: "2027",
    title: "불완전한 계약",
    text: "스물일곱 환자의 치료와 복제 금지를 조건으로 WACA에 합류했다. 공급은 이어지지만, 자신의 허위 기록과 NEST의 조작을 환자들에게 아직 밝히지 않았다.",
    consequence: "타인의 선택을 지키기 위해 또다시 타인 대신 선택하는 중이다.",
  },
];

const openHooks = [
  {
    title: "동의할 수 없었던 구조 대상",
    contact: "임무 중 의식불명과 대량출혈 상태로 해원의 처치를 받았다.",
    tension: "살아난 뒤 그 선택을 감사할지 문제 삼을지는 상대 캐릭터가 정한다.",
  },
  {
    title: "NEST 원본 기록의 선점자",
    contact: "완치식의 누락 부분이 든 같은 자료를 서로 다른 명령으로 추적한다.",
    tension: "공개 연구와 복제 위험 사이에서 협력, 고발, 파기 어느 쪽도 열려 있다.",
  },
  {
    title: "스물일곱 중 한 사람의 관계자",
    contact: "익명 배송 기록이나 수정된 임상 차트를 통해 해원에게 닿는다.",
    tension: "진실을 지금 밝힐지 치료가 확보될 때까지 미룰지 함께 결정해야 한다.",
  },
  {
    title: "공여를 제안하거나 거절할 동료",
    contact: "장기 임무에서 전투용 공여혈이 바닥난 순간 선택권을 쥔다.",
    tension: "해원이 거절을 존중할 수 있는지, 호의를 다시 빚으로 만들지 않을지가 시험된다.",
  },
];

function ArrowMark() {
  return <span className="arrow-mark" aria-hidden="true" />;
}

export default function Home() {
  const [recordView, setRecordView] = useState<"public" | "restricted">(
    "public",
  );
  const publicTab = useRef<HTMLButtonElement>(null);
  const restrictedTab = useRef<HTMLButtonElement>(null);

  const moveRecordTab = (
    event: KeyboardEvent<HTMLButtonElement>,
    next: "public" | "restricted",
  ) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    setRecordView(next);
    requestAnimationFrame(() => {
      (next === "public" ? publicTab : restrictedTab).current?.focus();
    });
  };

  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">
        본문으로 이동
      </a>

      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label="한해원 기록 첫 화면">
          HHW <span>WACA PERSONNEL RECORD</span>
        </a>
        <nav aria-label="주요 기록">
          <a href="#profile">등록부</a>
          <a href="#abilities">능력</a>
          <a href="#history">과거사</a>
          <a href="#hooks">관계 훅</a>
        </nav>
        <div className="nav-status">
          <span aria-hidden="true" /> II · ACTIVE
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-rail" aria-label="기록 분류">
            <span>WACA / KR</span>
            <span>성 소 야고보 / II</span>
            <span>ARK · 2027.08</span>
          </div>

          <div className="hero-facts" aria-label="즉시 판정">
            <span>생존한 인간</span>
            <span>일광 반응 없음</span>
            <span>성수·십자가 반응 없음</span>
            <span>전염성 없음</span>
          </div>

          <div className="hero-copy">
            <h1 id="hero-title">한해원</h1>
            <p className="hero-roman">HAN HAEWON</p>
            <blockquote>
              “피를 준다는 건 살려도 된다는 뜻이지,
              <br /> 가져도 된다는 뜻은 아니에요.”
            </blockquote>
            <p className="hero-thesis">
              타인의 선택을 지키고 싶어서, 또다시 타인 대신 선택하는 사람.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#abilities">
                전투 기록 열람 <ArrowMark />
              </a>
              <a className="text-link" href="#history">
                NEST 사건 기록
              </a>
            </div>
          </div>

          <div className="hero-system" aria-label="능력 순환 구조">
            <div className="signal-head">
              <span>HEMODYNAMIC CONSENT LOOP</span>
              <strong>03 PHASES</strong>
            </div>
            <div className="pulse-field" aria-hidden="true">
              <svg viewBox="0 0 640 260" role="presentation">
                <path
                  className="pulse-base"
                  d="M20 136H160l28-72 48 144 42-96 34 24h108l28-42 38 84 30-42h104"
                />
                <path
                  className="pulse-signal"
                  d="M20 136H160l28-72 48 144 42-96 34 24h108l28-42 38 84 30-42h104"
                />
              </svg>
              <div className="specimen-orbit orbit-a" />
              <div className="specimen-orbit orbit-b" />
              <div className="specimen-orbit orbit-c" />
            </div>
            <div className="loop-links">
              <a href="#ability-one">
                <span>동의</span>
                빌린 정상
              </a>
              <a href="#ability-two">
                <span>배치</span>
                붉은 반향
              </a>
              <a href="#maximum-output">
                <span>회수</span>
                합의된 심장
              </a>
            </div>
            <p>
              남의 피는 자신을 살리는 데만 쓴다. 적을 해치는 비용은 전부
              자기 피로 낸다.
            </p>
          </div>

        </section>

        <section className="profile-section section-shell" id="profile">
          <div className="section-intro">
            <h2>등록된 것은 얼굴이 아니라 선택이다.</h2>
            <p>
              외관과 인장은 오너 자료가 제공되기 전까지 비워 둔다. 이 기록은
              해원을 닮은 이미지를 대신 만들지 않으며, 그녀가 무엇을 선택했고
              무엇을 숨겼는지만 남긴다.
            </p>
          </div>

          <div className="profile-grid">
            <dl className="registry-table">
              {profileRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className="profile-copy">
              <div className="appearance-hold">
                <div className="hold-code">APPEARANCE / PENDING</div>
                <p>
                  외관 이미지, 실루엣, 신장·체중, 텍스트 묘사를 임의로 생성하지
                  않음.
                </p>
                <small>
                  WACA 공식 제출 전 오너 제공 외관 항목을 별도로 보완해야 합니다.
                </small>
              </div>

              <h3>상환 강박 · 세심한 다정함 · 통제된 독단</h3>
              <p>
                해원은 주사 한 번, 부축 한 번에도 허락을 묻고 동료의 이름과
                알레르기, 좋아하는 음식을 꼼꼼히 기억한다. 그 사람이 환자 번호가
                아닌 개인임을 증명하는 정보이기 때문이다. 위기에서는 여러 맥박을
                구분해 가장 급한 생명을 골라내며 끝까지 현장에 남는다. 그러나
                누군가 죽을 수 있는 순간이 오면 설명과 합의를 생략하고 일을 저지른
                뒤 자신만 벌을 받으려 한다. 책임감은 뛰어난 구조자를 만들고,
                책임을 독점하는 습관은 타인의 선택권을 빼앗는다.
              </p>

              <div className="preference-ledger">
                <div>
                  <h4>좋아함</h4>
                  <p>정오의 산책, 따뜻한 공동 식사, 이름표, 직접 체크한 동의란</p>
                </div>
                <div>
                  <h4>싫어함</h4>
                  <p>샘플·자산·공급원이라는 호칭, 숨은 조항, 강요된 감사</p>
                </div>
                <div>
                  <h4>두려움</h4>
                  <p>강제 흡혈을 최선이었다고 합리화하는 자기 자신</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="biology-section section-shell" id="biology">
          <div className="biology-title">
            <h2>뱀파이어는 종족명이 아니라 관찰자가 붙인 통칭이다.</h2>
            <p>
              종 분류는 여전히 인간이다. 실험은 몸을 바꿨고, 영력 각성은 별개의
              사건으로 능력을 만들었다.
            </p>
          </div>

          <div className="diagnosis-lines">
            <article>
              <h3>왜 피가 필요한가</h3>
              <p>
                음식으로 열량은 얻는다. 다만 인간 조직과 박쥐 유래 조직의 호르몬,
                면역, 전해질 리듬이 주기적으로 충돌해 살아 있는 인간 혈액의 신호로
                항상성을 다시 맞춰야 한다.
              </p>
            </article>
            <article>
              <h3>무엇이 통하지 않는가</h3>
              <p>
                언데드도 저주받은 존재도 아니다. 햇빛, 성수, 십자가, 마늘, 은은
                아무 효과가 없다. 사람을 물어도 변이가 전염되지 않는다.
              </p>
            </article>
            <article>
              <h3>무엇이 실제 약점인가</h3>
              <p>
                혈액 부족에 따른 생체 불일치, 다수의 심박이 겹칠 때의 감각 과부하,
                혈중 약물과 독성 성분, 과잉 섭취로 인한 장기 손상, 평범한 치명상.
                늙고 죽는다.
              </p>
            </article>
          </div>

          <blockquote className="dry-quote">
            “성수는 안 통해요. 병째로 던지면 모를까.”
          </blockquote>
        </section>

        <section className="abilities-section" id="abilities">
          <div className="abilities-head section-shell">
            <h2>전투는 피를 빼앗는 일이 아니라 비용의 주인을 정하는 일이다.</h2>
            <p>
              신체 변이는 기반 조건이다. 두 전투 능력은 탈출 당시의 신념,
              ‘누군가의 피가 소모되어야 한다면 전부 내 것이어야 한다’에서 각성한
              영력 현상이다.
            </p>
            <div className="grade-band">
              <span>II등급 규정</span>
              <b>능력 2 / 2</b>
              <b>최대 반경 80m</b>
              <b>최대 투사체 650m/s</b>
              <b>중형 건물 1채급</b>
            </div>
          </div>

          <article className="ability-sheet ability-one" id="ability-one">
            <div className="ability-index">
              <span>ABILITY A</span>
              <strong>01</strong>
            </div>
            <div className="ability-title">
              <h3>대리맥: 빌린 정상</h3>
              <p>
                동의받은 혈액의 정상적인 생체 신호를 기준 삼아, 충돌하는 두 조직을
                한 몸처럼 임시 동기화한다.
              </p>
            </div>
            <dl className="ability-specs">
              <div>
                <dt>발동</dt>
                <dd>전투 사용에 별도 동의한 공여혈 30mL 섭취</dd>
              </div>
              <div>
                <dt>지속</dt>
                <dd>4지문</dd>
              </div>
              <div>
                <dt>재사용</dt>
                <dd>종료 후 3지문</dd>
              </div>
              <div>
                <dt>탐지 반경</dt>
                <dd>45m</dd>
              </div>
              <div>
                <dt>휴대</dt>
                <dd>통상 전투용 공여혈 3관</dd>
              </div>
            </dl>
            <div className="ability-body">
              <div>
                <h4>효과</h4>
                <p>
                  영력 신체 강화와 응고 반응이 안정되고, 반경 45m 안의 지형과
                  움직임을 소리의 윤곽으로 파악한다. 출혈성 부상은 2지문에 걸쳐
                  봉합할 수 있으나 장기와 절단 부위는 재생하지 못하고 치명상을
                  무효화하지 않는다.
                </p>
              </div>
              <div>
                <h4>동의 제약</h4>
                <p>
                  강제로 빼앗거나 용도를 속여 얻은 피에는 능력이 반응하지 않는다.
                  일반 헌혈 혈액도 전투 사용 동의가 없으므로 쓸 수 없다. 거짓 동의의
                  혈액을 마시면 헤모노드가 거부 반응을 일으킨다.
                </p>
              </div>
              <div>
                <h4>종료 대가</h4>
                <p>
                  2지문 동안 좌우 근육의 반응 시점이 어긋나고 반향 감각에 간헐적인
                  사각이 생긴다. 공여자의 기억, 기술, 이능은 복제하지 못한다.
                </p>
              </div>
            </div>
          </article>

          <article className="ability-sheet ability-two" id="ability-two">
            <div className="ability-index">
              <span>ABILITY B</span>
              <strong>02</strong>
            </div>
            <div className="ability-title">
              <h3>혈향실: 붉은 반향</h3>
              <p>
                자기 피를 영력으로 응고한 혈향점을 전장에 붙이고, 초음파 압력을
                통과시켜 직선 사격, 단방향 방어, 반동 이동을 만든다.
              </p>
            </div>
            <dl className="ability-specs">
              <div>
                <dt>전개</dt>
                <dd>1지문</dd>
              </div>
              <div>
                <dt>유지</dt>
                <dd>5지문</dd>
              </div>
              <div>
                <dt>재전개</dt>
                <dd>종료 후 2지문</dd>
              </div>
              <div>
                <dt>통상 반경</dt>
                <dd>50m</dd>
              </div>
              <div>
                <dt>기본 혈액량</dt>
                <dd>최대 360mL · 혈향점 18개</dd>
              </div>
            </dl>

            <div className="technique-table">
              {techniques.map((technique) => (
                <article key={technique.name}>
                  <h4>{technique.name}</h4>
                  <span>{technique.cost}</span>
                  <p>{technique.text}</p>
                </article>
              ))}
            </div>

            <div className="maximum-output" id="maximum-output">
              <div>
                <span>MAXIMUM OUTPUT</span>
                <h4>합의된 심장</h4>
              </div>
              <p>
                대리맥이 유지되고 혈향점 12개 이상이 남았을 때 1지문 동안 집속한다.
                모든 점에서 목표까지 붉은 실선과 심장 소리가 나타난 뒤, 다음 지문에
                최대 초속 650m의 압력파가 반경 12m로 수렴한다. 공격 지점은 고정되고
                유도되지 않는다.
              </p>
              <dl>
                <div>
                  <dt>상한</dt>
                  <dd>반경 80m · 중형 건물 1채 또는 소형 건물 2채급</dd>
                </div>
                <div>
                  <dt>취소</dt>
                  <dd>집속 중 혈향점이 7개 이하가 되거나 목표가 지정 범위를 이탈</dd>
                </div>
                <div>
                  <dt>대가</dt>
                  <dd>
                    총 600mL까지 자기 피를 소모하고 대리맥 즉시 종료. 혈향실 4지문
                    봉인, 2지문 동안 손 떨림과 터널 시야
                  </dd>
                </div>
              </dl>
            </div>
          </article>

          <div className="combat-loop section-shell">
            <h3>한 번의 전투는 네 번의 선택으로 닫힌다.</h3>
            <ol>
              {combatLoop.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="counterplay section-shell">
            <h3>상대가 끊을 수 있는 것</h3>
            <ul>
              <li>붉게 뛰는 혈향점을 먼저 파괴하면 사선과 최대 출력이 줄어든다.</li>
              <li>화염, 대량의 물, 흡수성 분말은 혈향점의 진동을 끊는다.</li>
              <li>공격은 직선이며 발사 전 점이 부풀어 엄폐와 불규칙 이동으로 피할 수 있다.</li>
              <li>광범위한 소음과 초음파 교란은 반향 지도를 흐린다.</li>
              <li>공여혈 앰풀을 잃거나 4지문이 지나면 신체 보정이 풀린다.</li>
            </ul>
          </div>
        </section>

        <section className="affiliation-section section-shell" id="affiliation">
          <div>
            <h2>구출된 것이 아니라 조건을 걸고 들어왔다.</h2>
            <p>
              제9사도 성 소 야고보는 서로 무관해 보이는 스물일곱 환자에게서 같은
              조혈 붕괴를 추적해 NEST와 해원을 발견했다. 처음 마주한 의료 담당자는
              검사를 강행하지 않고 “채혈에 동의하십니까?”라고 물었다. 해원은 그
              한마디를 신뢰가 아니라 협상 가능성으로 받아들였다.
            </p>
          </div>
          <ol className="contract-terms">
            <li>스물일곱 환자의 안정화 혈장 공급을 보장할 것</li>
            <li>환자와 본인의 동의를 치료 연구의 최우선 조건으로 둘 것</li>
            <li>해원의 유전자와 영력 데이터로 제2 피험자를 만들지 않을 것</li>
            <li>제5사도와의 공동 연구는 매 회차 별도 동의를 받을 것</li>
          </ol>
          <aside>
            <strong>현재 지위</strong>
            <p>
              WACA 등록 제자이자 의료 관찰 대상. 보호받는 환자와 임무를 수행하는
              전투원이라는 두 지위가 공존한다.
            </p>
          </aside>
        </section>

        <section className="history-section section-shell" id="history">
          <div className="section-intro history-intro">
            <h2>받은 피를 갚으려던 선택은, 다른 사람의 선택을 빼앗았다.</h2>
            <p>
              해원은 단순한 피해자가 아니다. 스스로 동의했고, 스스로 기록을
              고쳤으며, 연구소는 같은 논리를 더 큰 규모로 악용했다.
            </p>
          </div>

          <div className="timeline">
            {timeline.map((event) => (
              <article key={`${event.year}-${event.title}`}>
                <div className="timeline-date">
                  <strong>{event.year}</strong>
                  <span>{event.age}</span>
                </div>
                <div className="timeline-event">
                  <h3>{event.title}</h3>
                  <p>{event.text}</p>
                  <small>{event.consequence}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="patient-section section-shell" aria-labelledby="patient-title">
          <div>
            <h2 id="patient-title">환자 등록부 01부터 27</h2>
            <p>
              기적은 한 명에서 시작해 스물일곱 명의 의존이 되었다. 이름은 이
              공개본에 남기지 않는다.
            </p>
          </div>
          <div className="patient-grid" aria-label="익명 환자 스물일곱 명">
            {Array.from({ length: 27 }, (_, index) => (
              <span key={index}>
                P-{String(index + 1).padStart(2, "0")}
                <i>의존</i>
              </span>
            ))}
          </div>
        </section>

        <section className="records-section" id="records">
          <div className="section-shell records-head">
            <div>
              <h2>같은 사건에는 세 개의 설명이 있다.</h2>
              <p>
                기밀 표시는 실제 보안 기능이 아니라 과거사 스포일러 구분이다.
                관계 설정에서 사용할 때는 상대 오너와 공개 범위를 먼저 합의한다.
              </p>
            </div>
            <div className="record-tabs" role="tablist" aria-label="기록 공개 범위">
              <button
                ref={publicTab}
                id="public-record-tab"
                type="button"
                role="tab"
                aria-selected={recordView === "public"}
                aria-controls="public-record"
                tabIndex={recordView === "public" ? 0 : -1}
                onClick={() => setRecordView("public")}
                onKeyDown={(event) => moveRecordTab(event, "restricted")}
              >
                공개 기록
              </button>
              <button
                ref={restrictedTab}
                id="restricted-record-tab"
                type="button"
                role="tab"
                aria-selected={recordView === "restricted"}
                aria-controls="restricted-record"
                tabIndex={recordView === "restricted" ? 0 : -1}
                onClick={() => setRecordView("restricted")}
                onKeyDown={(event) => moveRecordTab(event, "public")}
              >
                제한 공개
              </button>
            </div>
          </div>

          <div
            className="record-panel section-shell"
            id="public-record"
            role="tabpanel"
            aria-labelledby="public-record-tab"
            hidden={recordView !== "public"}
          >
            <div className="record-comparison">
              <article>
                <span>공개된 설명</span>
                <h3>NEST가 해원을 변이시켰다.</h3>
                <p>
                  해원은 인간과 흡혈박쥐 유전자를 결합한 실험에서 살아남아 혈액
                  정제 능력을 얻었고, 시설을 탈출해 WACA에 합류했다.
                </p>
              </article>
              <article>
                <span>해원이 말하는 설명</span>
                <h3>환자들을 살리기 위해 나왔다.</h3>
                <p>
                  NEST의 제2기 실험을 막고 스물일곱 환자의 치료를 이어 가기 위해
                  자료와 혈장을 들고 도망쳤다고 말한다.
                </p>
              </article>
              <article>
                <span>확인 가능한 사실</span>
                <h3>계약은 구조가 아니라 거래였다.</h3>
                <p>
                  치료 보장과 복제 금지를 조건으로 WACA 인프라를 선택했다. 조직을
                  믿어서가 아니라 환자들이 필요로 해서 남아 있다.
                </p>
              </article>
            </div>
          </div>

          <div
            className="record-panel section-shell restricted-panel"
            id="restricted-record"
            role="tabpanel"
            aria-labelledby="restricted-record-tab"
            hidden={recordView !== "restricted"}
          >
            <div className="record-comparison">
              <article>
                <span>해원이 숨긴 것</span>
                <h3>첫 거짓말은 자신의 손으로 썼다.</h3>
                <p>
                  심각한 충동과 불일치를 발견하고도 시험 중단을 막으려고 이상 반응
                  기록을 축소했다. 환자들은 위험의 전부를 모른 채 시험에 들어왔다.
                </p>
              </article>
              <article>
                <span>NEST가 숨긴 것</span>
                <h3>의존은 설계되어 있었다.</h3>
                <p>
                  활성 완충제의 반복 투여가 환자들의 조혈 기능을 억제했다. 연구소는
                  환자들의 생명으로 해원을 시설에 묶어 두려 했다.
                </p>
              </article>
              <article>
                <span>현재의 반복</span>
                <h3>보호라는 이름의 통제는 계속된다.</h3>
                <p>
                  WACA의 은폐 아래 치료는 유지되지만 환자들은 전모를 모른다. 해원은
                  자신이 증오한 결정을 더 정교한 방식으로 반복하고 있다.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="choice-section section-shell" id="choice">
          <h2>그녀가 아직 끝내지 못한 선택</h2>
          <div className="choice-axis" role="group" aria-label="현재의 양립 불가능한 선택">
            <article>
              <span>전부 공개한다</span>
              <h3>선택권을 돌려준다.</h3>
              <p>
                환자와 외부 연구자가 완치 자료에 접근한다. 동시에 생체 혈액 생산자와
                혈액 병기를 복제할 길도 세상에 열린다.
              </p>
            </article>
            <div className="choice-knot" aria-hidden="true">
              OR
            </div>
            <article>
              <span>계속 통제한다</span>
              <h3>생존을 우선한다.</h3>
              <p>
                소수만 자료를 보유해 환자와 기술을 지킨다. 대신 당사자가 자신의
                위험을 알고 결정할 권리는 다시 유예된다.
              </p>
            </article>
          </div>
          <blockquote>
            완치는 그녀를 자유롭게 할 수 있다. 동시에 스물일곱 명의 생존과 자신의
            몸에 남은 증거를 한꺼번에 잃게 할 수도 있다.
          </blockquote>
        </section>

        <section className="hooks-section section-shell" id="hooks">
          <div className="section-intro">
            <h2>관계는 결과가 아니라 서로 건넬 선택에서 시작한다.</h2>
            <p>
              아래 항목은 확정 관계가 아닌 공개 훅이다. 상대 캐릭터의 감정과 결말은
              미리 정하지 않는다.
            </p>
          </div>
          <div className="hook-list">
            {openHooks.map((hook) => (
              <article key={hook.title}>
                <h3>{hook.title}</h3>
                <dl>
                  <div>
                    <dt>접점</dt>
                    <dd>{hook.contact}</dd>
                  </div>
                  <div>
                    <dt>열린 긴장</dt>
                    <dd>{hook.tension}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="final-statement">
          <p>
            빌린 피로 살아왔지만,
            <br /> 누구의 삶도 소유하지 않는다.
          </p>
          <a href="#top">
            기록 첫 화면 <ArrowMark />
          </a>
        </section>
      </main>

      <footer>
        <div>
          <strong>한해원 · WACA II등급 캐릭터 기록</strong>
          <p>
            비공식 팬메이드 캐릭터 페이지입니다. WACA 원작 설정과 운영진을 사칭하지
            않습니다.
          </p>
        </div>
        <div className="source-links">
          <a href="https://posty.pe/pqmehhac" target="_blank" rel="noreferrer">
            프로필 양식
          </a>
          <a href="https://posty.pe/p35tci3c" target="_blank" rel="noreferrer">
            캐릭터 가이드
          </a>
          <a href="https://posty.pe/pm97mvdc" target="_blank" rel="noreferrer">
            세계관 안내
          </a>
          <a href="https://posty.pe/pnmk90hc" target="_blank" rel="noreferrer">
            총공지
          </a>
        </div>
      </footer>
    </div>
  );
}
