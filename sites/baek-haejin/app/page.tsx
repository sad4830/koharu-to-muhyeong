"use client";

import { useState } from "react";

const depthStages = [
  {
    id: "01",
    label: "원기록",
    title: "붕괴 직전의 지하 통로",
    body: "동쪽 벽에서 간헐적인 마찰음. 잔해 너머 생존자 세 명의 호흡이 확인된다. 천장은 아직 버티고 있으나 구조팀의 진입로가 없다.",
    note: "관측된 사실만 기록한다. 원인과 결론은 아직 적지 않는다.",
  },
  {
    id: "02",
    label: "분리",
    title: "대상 · 반응 · 환경",
    body: "대상: 동쪽 내력벽 / 반응: 11초 간격의 미세 전단 / 환경: 상부 하중이 북서측 철근에 집중 / 변수: 생존자 위치로 진동 전달 가능.",
    note: "서로 다른 정보가 한 문장 안에서 결론을 오염시키지 않게 분리한다.",
  },
  {
    id: "03",
    label: "구조",
    title: "하중 경로와 절리선",
    body: "벽 전체가 아니라 바닥에서 1.4m 위의 보강 접합부가 병목이다. 북서측 하중을 지지대로 옮긴 뒤 62cm 구간만 분리하면 통로를 확보할 수 있다.",
    note: "파괴량이 아니라 제거하지 않아도 되는 부분을 먼저 계산한다.",
  },
  {
    id: "04",
    label: "판정",
    title: "필요한 만큼만 무너뜨린다",
    body: "지지대 설치 후 선택 절리 허가. 예상 분리량 0.8㎥, 신뢰도 86%. 생존자 방향의 균열 진행 가능성은 낮지만 구조팀 대기 후 실행한다.",
    note: "불확실성을 숨기지 않는다. 사람의 안전이 결론보다 먼저다.",
  },
];

export default function Home() {
  const [depth, setDepth] = useState(0);
  const stage = depthStages[depth];

  return (
    <main>
      <a className="skip-link" href="#record">본문으로 건너뛰기</a>
      <header className="site-header">
        <a className="wordmark" href="#record" aria-label="백해진 기록 처음으로">
          <span className="wordmark-mark" aria-hidden="true">W</span>
          <span>WACA · 판독 기록</span>
        </a>
        <nav aria-label="주요 기록">
          <a href="#identity">인적 사항</a>
          <a href="#analysis">분석 사례</a>
          <a href="#abilities">능력 기록</a>
        </nav>
        <span className="status"><i aria-hidden="true" /> 열람 허가</span>
      </header>

      <section className="hero" id="record" aria-labelledby="character-name" tabIndex={-1}>
        <div className="hero-register" aria-label="문서 정보">
          <span>WACA / KR-07</span>
          <span>II급 현장 분석관</span>
          <span>기록 갱신 08.12</span>
        </div>

        <div className="hero-copy">
          <p className="kicker">활동명 — 단면도</p>
          <h1 id="character-name">백해진</h1>
          <p className="hero-statement">
            보이는 것을 믿지 않는다.<br />
            <em>버티고 있는 이유</em>부터 읽는다.
          </p>
          <p className="hero-summary">
            붕괴 구조와 무장의 하중을 판독해, 필요한 연결부만 분리하는
            WACA 대한민국 지부의 현장 분석관.
          </p>
        </div>

        <aside className="hero-index" aria-label="핵심 인적 사항">
          <div className="index-ruler" aria-hidden="true">
            {Array.from({ length: 13 }).map((_, index) => <i key={index} />)}
          </div>
          <dl>
            <div><dt>소속</dt><dd>WACA</dd></div>
            <div><dt>부서</dt><dd>성 토마스의 제자</dd></div>
            <div><dt>지부</dt><dd>대한민국</dd></div>
            <div><dt>등급</dt><dd>II</dd></div>
            <div><dt>역할</dt><dd>구조 판독 · 제한 철거</dd></div>
          </dl>
          <p>CASE FILE · BHJ-0714</p>
        </aside>

        <a className="scroll-cue" href="#identity">
          기록 판독 시작 <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="identity-section" id="identity" aria-labelledby="identity-title">
        <div className="section-number" aria-hidden="true">01</div>
        <div className="section-heading">
          <p>인적 사항</p>
          <h2 id="identity-title">31세 · 대한민국<br />현장 분석관.</h2>
        </div>
        <div className="identity-body">
          <p>
            구조물은 다시 세울 수 있어도 사람은 되돌릴 수 없다는 원칙 때문에,
            해진은 빠른 승리보다 민간인의 퇴로를 먼저 계산한다.
          </p>
          <dl className="quick-facts">
            <div><dt>나이</dt><dd>31세</dd></div>
            <div><dt>성별</dt><dd>여성 · XX</dd></div>
            <div><dt>국적</dt><dd>대한민국</dd></div>
            <div><dt>신장 · 체중</dt><dd>170cm · 60kg</dd></div>
          </dl>
        </div>
      </section>

      <section className="analysis-section" id="analysis" aria-labelledby="analysis-title">
        <div className="analysis-heading">
          <p>현장 기록 BHJ–23–118</p>
          <h2 id="analysis-title">분석 심도 조절</h2>
          <p>같은 기록이 어떻게 분리되고 판정으로 변하는지 확인하십시오.</p>
        </div>

        <div className="depth-controller" role="group" aria-label="분석 심도 선택">
          {depthStages.map((item, index) => (
            <button
              key={item.id}
              className={index === depth ? "active" : ""}
              onClick={() => setDepth(index)}
              aria-pressed={index === depth}
            >
              <span>{item.id}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className={`evidence-sheet depth-${depth + 1}`} aria-live="polite">
          <div className="evidence-meta">
            <span>DEPTH {stage.id} / 04</span>
            <span>판독 신뢰도 {depth === 0 ? "미산출" : `${38 + depth * 16}%`}</span>
          </div>
          <div className="evidence-content">
            <div className="specimen" aria-hidden="true">
              <div className="specimen-axis axis-x" />
              <div className="specimen-axis axis-y" />
              <div className="specimen-core" />
              <span className="point point-a">A</span>
              <span className="point point-b">B</span>
              <span className="point point-c">C</span>
            </div>
            <div className="evidence-copy">
              <p className="stage-label">{stage.label}</p>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
              <aside><span>판독 원칙</span>{stage.note}</aside>
            </div>
          </div>
        </div>
      </section>

      <section className="dossier-section" aria-labelledby="dossier-title">
        <div className="dossier-heading">
          <span>02</span>
          <p>인물 기록</p>
          <h2 id="dossier-title">결론보다 먼저<br />사람이 남는다.</h2>
        </div>

        <article className="dossier-row">
          <div className="dossier-label">
            <span>APPEARANCE</span>
            <h3>외관</h3>
          </div>
          <p>
            키가 크고 군살이 적은 체격으로, 힘이 세다기보다 오랜 시간 서서 정밀
            작업을 버틸 수 있도록 단단하게 다듬어진 몸이다. 잿빛이 살짝 도는
            흑갈색 머리를 턱 아래 길이로 반듯하게 자르고, 현장에서는 옆머리를
            검은 실핀 두 개로 고정한다. 짙은 갈색 눈과 곧은 눈썹 때문에 무표정할
            때는 다소 날카로워 보이지만 입가에는 잠을 덜 잔 사람 특유의 희미한
            피로가 남아 있다. 왼손 검지와 중지에는 측정봉을 오래 쥐어 생긴
            굳은살이 있고 손톱은 늘 짧다. WACA 표식을 단 회백색 방진 코트 아래
            먹색 작업복과 무릎 보호대를 착용하며, 허리의 납작한 공구집에는
            접이식 측정봉·분필·줄자를 정해진 순서대로 넣어 둔다.
          </p>
          <aside>외형 자료는 문서 서술로만 보존됨<br />인물 이미지 등록 없음</aside>
        </article>

        <article className="dossier-row">
          <div className="dossier-label">
            <span>PERSONALITY</span>
            <h3>성격</h3>
          </div>
          <div>
            <div className="trait-line" aria-label="성격 핵심어">
              <span>검증주의</span><span>건조한 자비</span><span>책임 강박</span><span>느린 신뢰</span>
            </div>
            <p>
              해진은 직감이 아무리 그럴듯해도 관측된 근거가 없으면 결론으로
              취급하지 않는다. 말수가 적고 질문이 정확해 처음에는 차갑거나 의심
              많은 사람처럼 보이지만, 실제로는 사람을 수치와 표본으로 환원하는
              태도를 가장 경계한다. 자신의 오판을 변명하지 않고 임무가 끝난 뒤
              사소한 균열 하나까지 보고서에 남긴다. 불확실할 때는 말을 아끼느라
              결단력이 없어 보이기도 하나, 확인을 마친 판단에는 완고할 정도로
              단호하다. 가까운 사람을 걱정할 때조차 “뒤로 세 걸음 물러나세요”처럼
              명령문으로 표현한다. 성 토마스의 지시에도 이해하지 못한 부분은
              끝까지 묻고, 납득한 뒤에는 그 판단의 책임까지 자신의 몫으로 받는다.
            </p>
          </div>
          <aside>“추정은 보고서의 끝에 둡니다.<br />사람을 그 앞에 두고요.”</aside>
        </article>

        <article className="dossier-row">
          <div className="dossier-label">
            <span>HISTORY</span>
            <h3>이력</h3>
          </div>
          <p>
            민간 구조안전 진단원으로 근무하던 시절 지하 복합시설 붕괴 사고에
            휘말리며 각성했다. 건물 전체를 무너뜨리면 빠져나올 수 있었지만,
            잔해의 하중을 읽어 생존자를 가로막은 연결부만 분리했다. 사고 조사에
            파견된 WACA가 능력을 확인했고, 해진은 제안을 받아 대한민국 지부에
            합류했다. 이후 구조 분석과 심문 현장 검증을 병행하며, 힘보다 근거와
            결과의 책임을 중시하는 태도를 인정받아 성 토마스의 제자가 되었다.
          </p>
          <aside>주 임무<br />구조 판독 · 장비 무력화<br />인질 구조로 확보 · 제한 철거</aside>
        </article>
      </section>

      <section className="abilities-section" id="abilities" aria-labelledby="abilities-title">
        <div className="abilities-intro">
          <span>03</span>
          <div>
            <p>II등급 · 능력 발현 2종</p>
            <h2 id="abilities-title">읽은 뒤에만<br />분리할 수 있다.</h2>
          </div>
          <p>
            두 능력은 독립된 공격 수단이 아니다. 먼저 고정된 고체의 하중을
            기록하고, 유효한 기록이 남아 있을 때 선택한 연결부만 갈라낸다.
          </p>
        </div>

        <article className="ability-record">
          <header>
            <span>ABILITY 01</span>
            <h3>응력 도해</h3>
            <p>연결된 고체가 힘을 버티는 경로와 최소 분리 단면을 산출한다.</p>
          </header>
          <div className="ability-rule">
            <p>
              동일한 고체를 측정봉으로 6초 안에 세 번 두드리고 반사되는 진동을
              손끝으로 받는다. 분석하는 동안 측정점이 움직이거나 해진이 두 걸음
              이상 이동하면 처음부터 다시 해야 한다. 건물·지면·갑옷·무기처럼
              형태가 고정된 고체만 읽을 수 있으며, 생체 내부·정신·기억·영력·
              액체·기체는 대상이 아니다. 사람에게서는 착용 장비와 현재 자세가 지면에
              전달하는 하중만 판독한다.
            </p>
            <dl className="rule-metrics">
              <div><dt>범위</dt><dd>접촉점과 연결된 고체 25m</dd></div>
              <div><dt>지속시간</dt><dd>산출 후 45초</dd></div>
              <div><dt>쿨타임</dt><dd>산출 성공 후 20초</dd></div>
              <div><dt>보존 한도</dt><dd>지도 2개 · 중형 건물은 2칸 사용</dd></div>
            </dl>
          </div>
          <div className="ability-limits">
            <div><span>패널티</span><p>사용 후 60초 동안 손끝의 온도 감각이 둔해진다. 5분 안에 세 번 산출하면 손가락이 10분간 떨려 능력을 다시 사용할 수 없다.</p></div>
            <div><span>파훼</span><p>접촉을 끊거나 분석 후 하중 배치를 바꾸면 지도가 무효화된다. 탄성 완충재, 불규칙한 강진과 다중 진동은 오독 가능성을 높인다.</p></div>
          </div>
        </article>

        <div className="ability-bridge" aria-label="능력 연계 순서">
          <span>응력 도해</span><i aria-hidden="true" /><strong>유효 기록 45초</strong><i aria-hidden="true" /><span>선택 절리</span>
        </div>

        <article className="ability-record ability-dark">
          <header>
            <span>ABILITY 02</span>
            <h3>선택 절리</h3>
            <p>도해에 기록된 약한 단면을 따라 전단 충격을 흘려 연결부만 분리한다.</p>
          </header>
          <div className="ability-rule">
            <p>
              유효한 응력 도해의 해제점에 손바닥이나 측정봉을 직접 대야 발동한다.
              충격은 기록된 단면을 따라 8초 동안 진행되며 물질을 소멸시키지 않고
              서로 갈라 놓는다. 틈·액체·공중을 건너 다른 대상으로 옮겨 가지 않고,
              살아 있는 조직이나 신체를 직접 절단할 수 없다. 갑옷·무기·엄폐물과
              구조물만 대상이 된다. 열과 광선은 발생하지 않으며 마른 나뭇가지가
              연달아 꺾이는 소리와 가느다란 자주색 균열 표시만 남는다.
            </p>
            <dl className="rule-metrics">
              <div><dt>범위</dt><dd>도해 영역 내 접촉점부터 최대 25m</dd></div>
              <div><dt>지속시간</dt><dd>균열 진행 8초</dd></div>
              <div><dt>쿨타임</dt><dd>통상 2분 · 최대 출력 30분</dd></div>
              <div><dt>최대 출력</dt><dd>중형 건물 1채 또는 소형 건물 2채</dd></div>
            </dl>
          </div>
          <div className="ability-limits">
            <div><span>패널티</span><p>대상이 버틴 하중 일부가 접촉한 팔로 돌아온다. 통상 사용 후 2분간 해당 손의 악력이 크게 저하되며, 틀린 단면에 사용하면 어깨가 탈구될 수 있다.</p></div>
            <div><span>최대 출력 대가</span><p>양팔과 갈비뼈에 미세 골절이 발생해 해당 교전의 전투를 계속할 수 없다. 예상 연쇄 붕괴가 등급 상한을 넘으면 절리선 자체가 완성되지 않는다.</p></div>
          </div>
        </article>
      </section>

      <section className="protocol-section" aria-labelledby="protocol-title">
        <div className="protocol-sticky">
          <p>작전 프로토콜</p>
          <h2 id="protocol-title">관찰에서<br />종결까지</h2>
          <span>결정적인 순간까지 두 장의 도해 중 무엇을 보존할지 판단한다.</span>
        </div>
        <ol className="protocol-list">
          <li><span>01</span><div><h3>접촉</h3><p>엄폐물, 무장 또는 지면에 세 번의 측정 충격을 남긴다.</p></div></li>
          <li><span>02</span><div><h3>도해</h3><p>하중의 흐름과 끊어도 되는 연결부를 45초짜리 기록으로 만든다.</p></div></li>
          <li><span>03</span><div><h3>유도</h3><p>상대가 자세나 위치를 바꾸게 압박하며 기록을 소비할 시점을 고른다.</p></div></li>
          <li><span>04</span><div><h3>분리</h3><p>무기 손잡이, 방패 연결부, 퇴로를 막은 벽처럼 필요한 부분만 갈라낸다.</p></div></li>
          <li><span>05</span><div><h3>은폐</h3><p>작전 종료 후 ARK 기록과 현장 표식을 제4사도 보안 부서에 인계한다.</p></div></li>
        </ol>
      </section>

      <section className="counter-section" aria-labelledby="counter-title">
        <div className="counter-heading">
          <p>현장 대응 참고</p>
          <h2 id="counter-title">강한 이유와<br />질 수 있는 이유</h2>
        </div>
        <div className="counter-grid">
          <article><span>01</span><h3>형태 변화</h3><p>분석 이후 구조나 자세가 크게 바뀌면 도해가 즉시 무효화된다. 변형이 빠른 적은 가장 나쁜 상성이다.</p></article>
          <article><span>02</span><h3>불안정한 매질</h3><p>모래·진흙·수면·공중에서는 진동을 안정적으로 읽지 못한다. 원거리 공중전에도 대응 수단이 적다.</p></article>
          <article><span>03</span><h3>접촉 팔</h3><p>선택 절리는 직접 접촉이 필요하다. 상대가 팔을 공격하거나 떼어내면 진행 중인 균열도 8초 안에 멈춘다.</p></article>
          <article><span>04</span><h3>오독의 대가</h3><p>거짓 진동과 다중 충격은 잘못된 단면을 섞는다. 확신 없이 발동하면 능력자가 먼저 관절 손상을 입는다.</p></article>
        </div>
      </section>

      <section className="personal-section" aria-labelledby="personal-title">
        <div>
          <p>04 · 부가 기록</p>
          <h2 id="personal-title">백해진을 구성하는<br />파괴 이외의 것들.</h2>
        </div>
        <dl>
          <div><dt>좋아하는 것</dt><dd>반듯한 도면, 따뜻한 보리차, 정확한 보고, 보수된 오래된 건물</dd></div>
          <div><dt>싫어하는 것</dt><dd>근거 없는 확신, 과시 목적의 파괴, 보고 누락, 흔들리는 난간</dd></div>
          <div><dt>습관</dt><dd>처음 들어간 장소의 벽이나 난간을 손가락 마디로 가볍게 두드린다.</dd></div>
          <div><dt>두려움</dt><dd>불완전한 자료를 완전한 결론으로 착각해 사람을 잃는 것</dd></div>
          <div><dt>성물</dt><dd>없음. 측정봉·분필·줄자는 능력이 없는 일반 현장 장비다.</dd></div>
          <div><dt>권능</dt><dd>미각성</dd></div>
        </dl>
      </section>

      <footer>
        <p>“결론은 냈습니다. 이제 필요한 만큼만 무너뜨리죠.”</p>
        <div><span>WACA · 성 토마스의 제자</span><span>CASE CLOSED / BHJ-0714</span></div>
      </footer>
    </main>
  );
}
