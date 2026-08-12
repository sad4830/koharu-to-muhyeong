"use client";

import { useEffect, useState } from "react";

const sigils = ["ENVY", "Ⅱ", "2GJ", "80M"];
const keywords = ["고요한 오만", "집요한 질투", "동정 혐오", "연극적 잔혹성"];

const abilityOneSpecs = [
  ["준비", "1지문"],
  ["사거리", "최대 80m"],
  ["투사체 속도", "최대 700m/s"],
  ["위력", "최대 2GJ"],
  ["쿨타임", "발사 후 3지문"],
  ["지속시간", "약 0.12초 · 잔류 없음"],
];

const abilityTwoSpecs = [
  ["준비", "1지문"],
  ["중심점", "사용자에게서 최대 55m"],
  ["피해 범위", "중심 반경 25m"],
  ["파편 속도", "최대 600m/s"],
  ["위력", "범위 전체 합산 최대 2GJ"],
  ["쿨타임", "파쇄 후 6지문"],
];

function SpecGrid({ specs }: { specs: string[][] }) {
  return (
    <dl className="spec-grid">
      {specs.map(([term, value]) => (
        <div key={term}><dt>{term}</dt><dd>{value}</dd></div>
      ))}
    </dl>
  );
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [tab, setTab] = useState<"public" | "secret">("public");

  useEffect(() => {
    document.body.dataset.archive = opened ? "opened" : "sealed";
  }, [opened]);

  return (
    <main id="top" className="site-shell">
      <div className="noise" aria-hidden="true" />
      <div className="blood-halo blood-halo-a" aria-hidden="true" />
      <div className="blood-halo blood-halo-b" aria-hidden="true" />

      {!opened && (
        <section className="gate" aria-label="교단 기록 봉인">
          <div className="gate-lines" aria-hidden="true" />
          <div className="gate-seal" aria-hidden="true"><span>VII</span></div>
          <p className="gate-overline">SEPTEM PECCATA · INTERNAL ARCHIVE</p>
          <h1>생명 유지 장치에 연결된 채,<br />한 구역을 장례 지내는 여자.</h1>
          <button type="button" className="unseal" onClick={() => setOpened(true)}>
            <span>교단 기록 개방</span><small>AUTHORIZED SINNERS ONLY</small>
          </button>
          <p className="gate-warning">※ 외관 이미지 없이 서술 기록만 수록되었습니다.</p>
        </section>
      )}

      <div className={`archive ${opened ? "is-open" : ""}`} aria-hidden={!opened}>
        <header className="topbar">
          <a className="wordmark" href="#top" aria-label="맨 위로">
            <span className="cross-mark" aria-hidden="true">✦</span><span>SEPTEM PECCATA</span>
          </a>
          <nav className="nav-links" aria-label="프로필 바로가기">
            <a href="#profile">PROFILE</a><a href="#abilities">ABILITIES</a><a href="#limits">LIMITS</a>
          </nav>
          <div className="top-status"><span><i className="live-dot" /> LIFE SUPPORT ONLINE</span><span>YEAR 2027</span></div>
        </header>

        <section className="hero" aria-labelledby="character-name">
          <div className="hero-index" aria-hidden="true"><span>ARCHIVE</span><strong>07—E</strong></div>
          <div className="hero-copy">
            <p className="eyebrow">칠죄교단 · 질투의 죄인 · Ⅱ등급</p>
            <h1 id="character-name"><span>세라피나</span><span className="surname">바이스</span></h1>
            <p className="latin-name">SERAPHINA WEISS</p>
            <div className="title-lockup">
              <span>죄명</span><strong>「백색 장례포」</strong><small>THE PALE REQUIEM</small>
            </div>
            <p className="hero-quote">“걷는 법은 잊었어요. 대신, 서 있는 것들을 무너뜨리는 법을 배웠죠.”</p>
          </div>
          <div className="core-array" aria-label="전투 출력 및 생체 상태 장식">
            <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" /><div className="orbit orbit-three" aria-hidden="true" />
            {sigils.map((sigil, index) => <span key={sigil} className={`sigil sigil-${index + 1}`}>{sigil}</span>)}
            <div className="core"><span>GRADE</span><strong>Ⅱ</strong><small>GLASS CANNON</small></div>
            <div className="respirator-line" aria-hidden="true"><span /></div>
          </div>
          <aside className="vitals" aria-label="생명 유지 상태">
            <div className="vitals-head"><span>VITAL MONITOR</span><b>CRITICAL</b></div><div className="ecg" aria-hidden="true" />
            <dl><div><dt>호흡 보조</dt><dd>상시 필수</dd></div><div><dt>하지 운동</dt><dd>완전 소실</dd></div><div><dt>방어 능력</dt><dd>없음</dd></div><div><dt>최대 출력</dt><dd>2 GJ</dd></div></dl>
          </aside>
        </section>

        <section className="identity-ribbon" aria-label="핵심 신상">
          <div><span>AGE</span><strong>20</strong><small>성인</small></div><div><span>SEX</span><strong>XX</strong><small>여성</small></div><div><span>NATION</span><strong>DE</strong><small>독일</small></div><div><span>BODY</span><strong>165</strong><small>cm · 43kg</small></div><div><span>DIVISION</span><strong>ENVY</strong><small>질투의 죄인</small></div>
        </section>

        <section className="first-record section-frame" aria-labelledby="record-heading">
          <div className="section-kicker">01 / SUBJECT RECORD</div>
          <div className="record-heading">
            <h2 id="record-heading">부서진 육체.<br /><em>완성된 화력.</em></h2>
            <p>신체는 인간 중에서도 유난히 약하지만, 영력만큼은 Ⅱ등급의 상한에 맞닿아 있다. 그녀의 등급은 전투 지속력도, 신체 능력도 아닌 오직 두 번의 압도적인 공격 가능성으로 산정되었다.</p>
          </div>
          <div className="principles">
            <article><span>01</span><h3>움직일 수 없다</h3><p>하반신 완전 마비. 휠체어가 멈추면 그녀도 그 자리에 남는다.</p></article>
            <article><span>02</span><h3>숨을 쉴 수 없다</h3><p>휴대용 인공호흡기와 산소 공급 장치 없이는 전투는커녕 의식 유지도 어렵다.</p></article>
            <article className="accent-card"><span>03</span><h3>그래도 파괴한다</h3><p>방어와 생존을 모두 버린 영력이 오직 공격에만 집중된다.</p></article>
          </div>
        </section>

        <section id="profile" className="profile-section section-frame" aria-labelledby="profile-heading">
          <div className="section-kicker">02 / COMPLETE PROFILE</div>
          <div className="section-title-line"><h2 id="profile-heading">인물 기록</h2><span>NO PORTRAIT ATTACHED</span></div>
          <div className="profile-layout">
            <div className="text-portrait" aria-label="텍스트 외관 기록">
              <span className="portrait-code">APPEARANCE / TEXT ONLY</span>
              <div className="portrait-monogram" aria-hidden="true">SW</div>
              <h3>외관</h3>
              <p>허리 아래까지 흐르는 눈처럼 새하얀 장발과 흰 속눈썹, 선명한 붉은 눈을 지녔다. 햇빛을 거의 보지 못한 피부는 혈색 없이 창백하고, 볼과 손목은 뼈대가 비칠 만큼 야위었다. 여러 겹의 백색 장례복 위에는 금실 자수와 붉은 보석 사슬, 성당의 장미창을 닮은 반투명 장식이 겹쳐진다. 진주빛 전동 휠체어는 금빛 세공과 붉은 벨벳 등받이, 장미창 모양 바퀴살로 꾸며져 작은 이동식 제단처럼 보인다. 얼굴에는 흰색 전면형 호흡 마스크를 쓰며, 붉고 금빛인 호스가 등 뒤의 병원용 이동식 호흡 보조 장치로 이어진다. 휠체어와 의료 장비에는 무장이나 별도의 능력이 없다.</p>
            </div>
            <div className="profile-data">
              <dl className="data-list">
                <div><dt>이름</dt><dd>세라피나 바이스<br /><small>Seraphina Weiss</small></dd></div>
                <div><dt>죄명</dt><dd>백색 장례포</dd></div>
                <div><dt>나이 · 성별</dt><dd>20세 · XX</dd></div>
                <div><dt>국적</dt><dd>독일</dd></div>
                <div><dt>신장 · 체중</dt><dd>165cm · 43kg</dd></div>
                <div><dt>소속 · 직급</dt><dd>칠죄교단 · 질투의 죄인</dd></div>
                <div><dt>등급</dt><dd>Ⅱ등급</dd></div>
                <div><dt>성물 · 권능</dt><dd>없음 · 없음</dd></div>
              </dl>
              <div className="personality">
                <h3>성격</h3><div className="keyword-row">{keywords.map((word) => <span key={word}>{word}</span>)}</div>
                <p>목소리는 작고 숨이 섞여 있으나 말투만큼은 언제나 정중하다. 자신의 불편을 타인에게 떠넘기는 일은 싫어하면서도, 건강한 사람이 무심하게 걷고 뛰고 숨 쉬는 모습을 보면 속에서 차가운 질투가 끓는다. 그녀가 원하는 것은 치료가 아니다. 세상 모두가 자신과 같은 높이로 내려오는 것이다. 동정받는 순간 웃음을 거두며, 적이 자신의 연약함을 얕잡아볼수록 더욱 잔혹하고 과장된 장례 연출로 답한다.</p>
              </div>
              <div className="likes-grid"><div><span>L</span><strong>좋아함</strong><p>붉은 장미, 고요한 병실, 금속성 오르골, 정중한 대화, 자신과 눈높이를 맞추는 사람</p></div><div><span>H</span><strong>싫어함</strong><p>동정, 계단, 달리기, 숨소리를 흉내 내는 행위, 허락 없이 의료 장비를 만지는 것</p></div></div>
            </div>
          </div>
        </section>

        <section id="abilities" className="ability-section" aria-labelledby="abilities-heading">
          <div className="ability-intro section-frame">
            <div className="section-kicker">03 / ABILITY MANIFESTATION</div>
            <h2 id="abilities-heading">두 발 대신,<br /><em>두 개의 종말.</em></h2>
            <p>능력 수는 Ⅱ등급 허용 상한인 정확히 2개. 두 능력은 같은 지문에 동시에 발동할 수 없으며, 어느 경우에도 합산 출력이 2GJ를 넘지 않는다.</p>
          </div>

          <article className="ability-card ability-one">
            <div className="ability-number"><span>ABILITY</span><strong>01</strong></div>
            <div className="ability-copy">
              <div className="ability-label">SINGLE TARGET · LINEAR PENETRATION</div>
              <h3>《장미창의 못》</h3>
              <p className="ability-lead">등 뒤에 열두 겹의 홍백색 장미창 문양을 펼친 뒤, 이를 길이 2.4m의 단일 영력 유리창으로 압축해 직선 발사한다.</p>
              <SpecGrid specs={abilityOneSpecs} />
              <div className="rule-block"><h4>작동 규칙</h4><p>1지문 동안 문양을 충전하며 발사 방향이 선명하게 드러난다. 발사 후에는 가속·감속·방향 전환·추적이 불가능하다. 지정 직선을 관통한 뒤 80m 지점에서 완전히 소멸한다. 최대 출력은 중형 건물 1채 또는 소형 건물 2채 파괴급이며, 대상 수가 늘어도 위력이 복제되지 않는다.</p></div>
              <div className="penalty-block"><span>사용 패널티</span><p>최대 출력 1회마다 전체 영력의 30%를 소모하고 기관지 출혈과 부정맥이 발생한다. 다음 1지문 동안 말을 할 수 없으며 다른 능력도 사용할 수 없고, 휠체어 조작 속도가 절반으로 감소한다. 한 교전에서 세 번째 최대 출력 사용 시 즉시 의식을 잃는다.</p></div>
              <div className="counter-block"><b>파훼</b><p>충전 중 사선 이탈 · 엄폐 · 휠체어나 호흡 장치 제압. 빠르지만 유도되지 않는다.</p></div>
            </div>
            <div className="rose-window" aria-hidden="true"><i /><i /><i /><i /><span>✦</span></div>
          </article>

          <article className="ability-card ability-two">
            <div className="ability-number"><span>ABILITY</span><strong>02</strong></div>
            <div className="ability-copy">
              <div className="ability-label">AREA DENIAL · CONVERGING SHATTER</div>
              <h3>《대성당 파쇄식》</h3>
              <p className="ability-lead">사용자에게서 최대 55m 떨어진 지점을 중심으로 반경 25m의 거대한 장미창과 유리 아치를 전개한 뒤, 홍백색 영력 파편을 사방에서 중심부로 쏟아붓는다.</p>
              <SpecGrid specs={abilityTwoSpecs} />
              <div className="rule-block"><h4>작동 규칙</h4><p>1지문 동안 전조 문양이 선명하게 나타나며 지속적인 시야 확보가 필요하다. 중심점 지정 후에는 옮길 수 없다. 전조는 최대 2지문 유지되며 준비 다음 지문에 파쇄하지 않으면 자동 소멸한다. 파쇄 현상은 약 1초이며, 문양과 아치는 공격 전조일 뿐 충돌·구속·방어 판정이 없다.</p></div>
              <div className="penalty-block"><span>사용 패널티</span><p>최대 출력 1회마다 전체 영력의 60%를 소모한다. 발동 직후 2지문 동안 자발 호흡이 완전히 멎어 호흡기에만 의존하며, 첫 1지문은 양팔의 힘도 빠져 휠체어와 능력을 모두 조작할 수 없다. 이때 호흡기가 파손되면 즉시 의식을 잃는다.</p></div>
              <div className="counter-block"><b>파훼</b><p>전조 1지문 동안 범위 이탈 · 시야 차단 · 사용자 제압. 전개 중 《장미창의 못》 사용 불가.</p></div>
            </div>
            <div className="cathedral-array" aria-hidden="true"><span /><span /><span /><span /><b>✦</b></div>
          </article>
        </section>

        <section id="limits" className="limits-section section-frame" aria-labelledby="limits-heading">
          <div className="section-kicker">04 / PERMANENT PENALTY</div>
          <div className="limits-head"><h2 id="limits-heading">살아 있는 것 자체가<br />첫 번째 대가.</h2><div className="oxygen-count"><span>O₂ DEPENDENCY</span><strong>100%</strong></div></div>
          <div className="limit-grid">
            <article><span>LOWER BODY</span><h3>하반신 완전 마비</h3><p>허리 아래를 자발적으로 전혀 움직일 수 없다. 영력 신체 강화로도 서기·걷기·도약은 불가능하다.</p></article>
            <article><span>CONSTITUTION</span><h3>극도의 전신 쇠약</h3><p>상체도 일반 성인보다 약하다. Ⅱ등급의 통상 신체 강화 수치를 얻지 못하며 직접 피격 시 쉽게 전투 불능이 된다.</p></article>
            <article><span>MOBILITY</span><h3>휠체어 의존</h3><p>전동 휠체어 최고 속도는 12km/h. 파손되면 스스로 이동할 수 없고 수동으로 바퀴를 오래 밀 힘도 없다.</p></article>
            <article className="danger-limit"><span>RESPIRATION</span><h3>호흡기 상시 의존</h3><p>장치 분리 즉시 능력 발동 불가. 1지문 뒤 심한 저산소 증상, 2지문 연속 미복구 시 의식을 잃는다.</p></article>
          </div>
          <div className="common-limits">
            <div><span>방어</span><strong>없음</strong></div><div><span>회복</span><strong>없음</strong></div><div><span>이동 능력</span><strong>없음</strong></div><div><span>동시 발동</span><strong>불가</strong></div><div><span>범위 상한</span><strong>반경 80m</strong></div><div><span>출력 상한</span><strong>2GJ</strong></div>
          </div>
        </section>

        <section className="story-section section-frame" aria-labelledby="story-heading">
          <div className="section-kicker">05 / HISTORY & MOTIVE</div>
          <div className="story-grid">
            <div><h2 id="story-heading">“왜 나만<br />누워 있어야 하죠?”</h2><p className="story-quote">그 질문이, 신념보다 강한 욕망이 된 날 사탄의 목소리를 들었다.</p></div>
            <div className="story-copy">
              <p>세라피나는 태어날 때부터 폐와 신경계가 약했다. 열여섯 살에 진행성 질환으로 하반신의 감각과 운동 기능을 완전히 잃었고, 스무 살이 되기 전에는 병원용 호흡 보조 장치 없이는 잠드는 것조차 위험해졌다. 병실 창문 아래로 걷고 달리는 사람들을 보며 처음에는 부러워했고, 다음에는 미워했으며, 끝내는 모두가 자신과 같은 높이로 내려오길 바랐다.</p>
              <p>연합과 교단, 영력의 존재를 이미 알고 있던 어느 밤, 그녀의 욕망은 확고한 형태를 얻었다. 사탄은 다리를 고쳐주겠다고 약속하지 않았다. 대신 세상이 먼저 무릎 꿇게 만들 힘을 주겠다고 속삭였다. 그 정직함이 마음에 들어 세라피나는 질투의 죄인이 되었다.</p>
              <p>현재는 베들레헴 특별성역의 교단 침식 구역에 머물며, 질투 휘하의 연합원 납치·심문 작전에서 장거리 화력 지원을 담당한다. 건강한 육체를 되찾는 것에는 더 이상 관심이 없다. 그녀의 욕망은 단 하나다. 자신을 내려다보던 모든 사람을 휠체어와 같은 높이로 끌어내리는 것.</p>
            </div>
          </div>
        </section>

        <section className="archive-tabs section-frame" aria-labelledby="archive-tab-heading">
          <div className="tab-controls" role="tablist" aria-label="공개 및 비밀 기록">
            <button type="button" role="tab" aria-selected={tab === "public"} onClick={() => setTab("public")}>공개 기록</button>
            <button type="button" role="tab" aria-selected={tab === "secret"} onClick={() => setTab("secret")}>비밀 기록</button>
          </div>
          <div className="tab-panel" role="tabpanel">
            {tab === "public" ? (
              <><p className="tab-code">DOSSIER / OPEN</p><h2 id="archive-tab-heading">공개 기록</h2><p>유리 대포형 Ⅱ등급 장거리 공격원. 전투 개시 전 반드시 호흡 장치와 휠체어의 상태를 점검한다. 그녀는 영력, WACA, 칠죄교단과 욕망 동조 현상을 분명히 인지한다. 성물 및 각성 권능은 보유하지 않는다.</p></>
            ) : (
              <><p className="tab-code secret-code">DOSSIER / SEALED</p><h2 id="archive-tab-heading">비밀 기록</h2><p>건강한 사람을 미워한다고 말하지만, 정말로 질투하는 것은 걷는 다리가 아니라 누군가의 도움 없이도 살아갈 수 있다는 사실이다. 자신의 호흡기를 정비해 주는 사람에게만은 좀처럼 시선을 맞추지 못한다. 교단에도 숨기는 가장 작은 소망은 단 한 번, 누군가와 보폭을 맞춰 산책하는 것.</p></>
            )}
          </div>
        </section>

        <section className="world-note">
          <span>WACA WORLD NOTICE</span>
          <p>본 기록은 2027년, 베들레헴 특별성역을 중심으로 세계 이능 범죄 대응 연합과 칠죄교단이 대립하는 WACA 세계관을 기준으로 작성되었습니다.</p>
          <strong>Ⅲ · Ⅱ · Ⅰ · APOSTLE</strong>
        </section>

        <footer className="site-footer"><div><span>SEPTEM PECCATA</span><small>ENVY SINNER ARCHIVE · 07—E</small></div><a href="#top">처음으로 ↑</a><button type="button" onClick={() => setOpened(false)}>기록 봉인</button></footer>
      </div>
    </main>
  );
}
