"use client";

import { useMemo, useState } from "react";

type Echo = {
  id: number;
  code: string;
  title: string;
  prompt: string;
  fragment: string;
  quote: string;
};

const echoes: Echo[] = [
  {
    id: 0,
    code: "ECHO 01",
    title: "비워 둔 자리",
    prompt: "벤치 오른쪽의 잔향을 복원합니다.",
    fragment:
      "코하루가 누군가에게 자리를 내어주는 버릇은 사고 이후 생긴 것이 아니다. 늘 같은 벤치에서 그녀를 기다리던 아이가 먼저 가르쳐 준 행동이다.",
    quote: "코하루, 여기 앉아. 네 자리 남겨 뒀어.",
  },
  {
    id: 1,
    code: "ECHO 02",
    title: "먹지 않은 점심",
    prompt: "도시락에 남은 행동 기억을 대조합니다.",
    fragment:
      "그 아이는 대화를 재촉하지 않았다. 코하루가 한 문장을 끝낼 때까지 기다린 뒤, 언제나 같은 질문으로 말을 걸었다.",
    quote: "코하루, 오늘은 점심 먹었어?",
  },
  {
    id: 2,
    code: "ECHO 03",
    title: "기억된 이름",
    prompt: "봉인된 청각 기록을 복호화합니다.",
    fragment:
      "친구는 코하루의 이름을 정확히 기억하려고 처음 만난 날 세 번이나 물었다. 다음에 만나도 잊지 않겠다는 약속은 사고가 난 날까지 지켜졌다.",
    quote: "괜찮아. 내가 네 이름을 기억하고 있으니까.",
  },
];

const timeline = [
  {
    code: "00 / BEFORE",
    age: "유년기",
    title: "사진에서 빠져도 뒤늦게 발견되는 아이",
    body: "시선이 모이면 말이 막혔고, 도움을 청하는 법도 몰랐다. 조별 활동에서는 늘 마지막까지 남았으며 교사들은 그저 ‘얌전하고 문제없는 학생’이라고 기록했다.",
  },
  {
    code: "01 / BENCH",
    age: "11세",
    title: "호시노 나기와 빈자리",
    body: "방과 후 공원의 같은 벤치에서 또래의 여자아이 호시노 나기를 만났다. 나기는 코하루의 말을 대신 끝내지 않았고, 이름을 먼저 불렀으며, 점심을 두 사람 몫으로 나눴다.",
  },
  {
    code: "02 / FALL",
    age: "11세 · 가을",
    title: "K-11 미등록 이능 붕괴 사고",
    body: "인근 이능자 추격전의 여파로 공원 지하 구조물이 붕괴했다. 잔해 아래에서 두 아이의 맥박이 한 회로처럼 동기화되었고, 한쪽의 호흡이 멎을 때마다 다른 쪽의 심장이 대신 뛰었다.",
  },
  {
    code: "03 / ERASE",
    age: "구조 직후",
    title: "두 번째 생존자의 삭제",
    body: "공식 기록은 생존자를 코하루 한 명으로 정정했다. WACA는 미성숙한 영력 회로의 재폭주를 우려해 두 아이를 분리하고 기억 처리를 시행했다. 나기는 보호 대상 ECHO-02로 이전되었다.",
  },
  {
    code: "04 / AWAKEN",
    age: "20세",
    title: "《생환회로》 최초 정식 발현",
    body: "대규모 이능 범죄 현장에서 회로가 네 지문 동안 완전히 열렸다. 공개 파일의 ‘최초 발현’은 거짓이 아니다. 11세의 현상은 각성이 아닌 미분류 전조로 봉인되어 있었을 뿐이다.",
  },
  {
    code: "05 / NOW",
    age: "현재",
    title: "이유를 잊은 기다림",
    body: "얼굴도 이름도 잊었지만 몸은 약속의 순서를 기억한다. 벤치에 앉고, 옆자리를 비우고, 점심을 미루고, 누군가 자신의 이름을 불러주기를 기다린다.",
  },
];

function AccessGate({ onUnlock }: { onUnlock: () => void }) {
  return (
    <section className="access-gate" aria-labelledby="gate-title">
      <div className="gate-noise" aria-hidden="true" />
      <div className="gate-frame">
        <div className="gate-brand">
          <span className="waca-mark">W</span>
          <span>
            WACA CENTRAL ARCHIVE
            <small>MEMORY RECOVERY NODE</small>
          </span>
        </div>

        <div className="black-stamp">BLACK</div>
        <p className="micro-label">SEALED APPENDIX · 02-JP-KH / ECHO</p>
        <h1 id="gate-title">
          삭제된 이름의 흔적을
          <br />
          복원하시겠습니까?
        </h1>
        <p className="gate-description">
          본 문서는 아마노 코하루의 공개 인물 파일에서 분리된 기억 처리 원본입니다.
          <br />
          열람 시 봉인된 관찰 기록 3건이 순차 복구됩니다.
        </p>

        <button className="unlock-button" type="button" onClick={onUnlock} autoFocus>
          <span className="pulse-icon" aria-hidden="true">⌁</span>
          <span>기억 잔향 복호화</span>
          <small>BLACK KEY · 03</small>
        </button>

        <div className="gate-foot">
          <span>ARK INTEGRITY · 71%</span>
          <span>SUBJECT WACA-1 · STABLE</span>
        </div>
      </div>
      <span className="corner corner-a" aria-hidden="true" />
      <span className="corner corner-b" aria-hidden="true" />
      <span className="corner corner-c" aria-hidden="true" />
      <span className="corner corner-d" aria-hidden="true" />
    </section>
  );
}

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [recovered, setRecovered] = useState<number[]>([]);
  const [activeEcho, setActiveEcho] = useState(0);

  const recoveredCount = recovered.length;
  const complete = recoveredCount === echoes.length;
  const currentEcho = echoes[activeEcho];
  const progress = useMemo(() => Math.round((recoveredCount / echoes.length) * 100), [recoveredCount]);

  const recoverEcho = (index: number) => {
    setActiveEcho(index);
    setRecovered((current) => (current.includes(index) ? current : [...current, index]));
  };

  if (!unlocked) {
    return (
      <main className="locked-shell">
        <AccessGate onUnlock={() => setUnlocked(true)} />
      </main>
    );
  }

  return (
    <main className={`site-shell ${complete ? "memory-complete" : ""}`}>
      <div className="page-grid" aria-hidden="true" />
      <div className="scan-line" aria-hidden="true" />

      <header className="site-header">
        <a className="brand-link" href="#overview" aria-label="비밀 기록 처음으로">
          <span className="waca-mark small">W</span>
          <span>
            WACA
            <small>BLACK ARCHIVE</small>
          </span>
        </a>
        <nav aria-label="문서 구역">
          <a href="#anomaly">ANOMALY</a>
          <a href="#echo">ECHO</a>
          <a href="#timeline">PAST</a>
          <a href="#connection">NOW</a>
        </nav>
        <div className="header-progress" aria-label={`기억 복원 ${progress}%`}>
          <span>RECOVERY</span>
          <strong>{progress.toString().padStart(2, "0")}%</strong>
        </div>
      </header>

      <section className="hero" id="overview">
        <div className="hero-copy">
          <div className="hero-status-row">
            <span className="class-badge">CLASS BLACK</span>
            <span className="status-dot">PARTIAL MEMORY FOUND</span>
          </div>
          <p className="eyebrow">SEALED PERSONNEL APPENDIX · 02-JP-KH</p>
          <h1>
            빈자리의
            <br />
            <em>이름.</em>
          </h1>
          <p className="hero-lead">
            아마노 코하루는 누군가를 기다리는 것이 아니다.
            <br />
            <strong>자신이 잊히지 않았다는 증거</strong>를 기다리고 있다.
          </p>
          <a className="primary-link" href="#echo">
            잔향 3건 복원하기 <span>↓</span>
          </a>
        </div>

        <div className="hero-visual" aria-label="코하루 기억 잔향 도식">
          <div className="signal-card signal-main">
            <span>SUBJECT</span>
            <strong>KOHARU</strong>
            <i className="heart-line" aria-hidden="true" />
            <small>PULSE · PRESENT</small>
          </div>
          <div className="signal-bridge" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="signal-card signal-echo">
            <span>UNKNOWN</span>
            <strong>ECHO-02</strong>
            <i className="heart-line echo" aria-hidden="true" />
            <small>PULSE · REDACTED</small>
          </div>
          <div className="visual-caption">
            <span>DUAL VITAL TRACE</span>
            <strong>11 YEARS UNRESOLVED</strong>
          </div>
        </div>

        <div className="hero-index" aria-hidden="true">02</div>
      </section>

      <section className="anomaly-section" id="anomaly">
        <div className="section-index">01</div>
        <div className="section-heading">
          <div>
            <p className="eyebrow">RECORD DISCREPANCY</p>
            <h2>공개 파일에는<br />한 줄이 빠져 있다.</h2>
          </div>
          <p>
            《생환회로》의 전투 성능은 수정되지 않았습니다. 누락된 것은 능력이 아니라,
            정식 발현 9년 전에 관측된 최초의 생체공명 기록입니다.
          </p>
        </div>

        <div className="record-compare">
          <article className="record-card public-record">
            <div className="record-topline">
              <span>PUBLIC / RECRUITMENT HISTORY</span>
              <span>VERIFIED</span>
            </div>
            <p className="record-code">WACA-1 · AGE 20</p>
            <h3>대규모 이능 범죄 현장</h3>
            <p>
              즉사 위협을 감지한 《절박반사》가 최초로 회로를 열었다. 네 지문 동안 붕괴 현장의
              공격과 낙하물을 피하며 생존자들을 출구까지 이끌었다.
            </p>
            <div className="record-seal">공개 기록</div>
          </article>

          <div className="compare-arrow" aria-hidden="true">≠</div>

          <article className="record-card black-record">
            <div className="record-topline">
              <span>BLACK / INCIDENT K-11</span>
              <span>SEALED</span>
            </div>
            <p className="record-code">SUBJECT WACA-1 · AGE 11</p>
            <h3>미분류 회로 전조</h3>
            <p>
              붕괴 지점에서 두 아동의 심전도와 호흡이 비정상적으로 동기화되었다. 정식 각성에는
              미달했으나 훗날 《생환회로》로 분류될 구조와 일치한다.
            </p>
            <div className="redacted-lines" aria-label="검열된 세 줄">
              <i /><i /><i />
            </div>
            <div className="record-seal danger">비밀 원본</div>
          </article>
        </div>

        <blockquote className="core-secret">
          <span>CORE SECRET</span>
          <p>
            코하루에게는 한때 자신의 이름을 기억해준 친구가 있었다.
            <br />
            <strong>하지만 코하루는 그 사실을 기억하지 못한다.</strong>
          </p>
        </blockquote>
      </section>

      <section className="echo-section" id="echo">
        <div className="section-index">02</div>
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">PROCEDURAL MEMORY RECOVERY</p>
            <h2>기억은 지워졌고,<br />행동만 남았다.</h2>
          </div>
          <div className="recovery-meter">
            <span>RECOVERED ECHO</span>
            <strong>{recoveredCount} / 3</strong>
            <div><i style={{ width: `${progress}%` }} /></div>
          </div>
        </div>

        <div className="echo-workbench">
          <div className="bench-scene" aria-label="공원 벤치 기억 복원 인터페이스">
            <div className="scene-sky">
              <span>17:42</span>
              <span>PARK NODE K-11</span>
            </div>
            <div className="tree-shadow" aria-hidden="true" />
            <div className="bench" aria-hidden="true">
              <i className="bench-back" />
              <i className="bench-seat" />
              <i className="bench-leg left" />
              <i className="bench-leg right" />
            </div>
            <span className="seat-label">EMPTY SEAT</span>
            <div className="lunch-box" aria-hidden="true"><i /></div>

            {echoes.map((echo, index) => (
              <button
                className={`echo-hotspot hotspot-${index + 1} ${recovered.includes(index) ? "is-recovered" : ""}`}
                key={echo.code}
                type="button"
                onClick={() => recoverEcho(index)}
                aria-label={`${echo.title} 기억 복원`}
              >
                <span>{recovered.includes(index) ? "✓" : `0${index + 1}`}</span>
              </button>
            ))}
            <p className="scene-instruction">점멸하는 좌표를 눌러 행동 기억을 복원하십시오.</p>
          </div>

          <div className="echo-reader" aria-live="polite">
            <div className="reader-topline">
              <span>{currentEcho.code}</span>
              <span>{recovered.includes(activeEcho) ? "RECOVERED" : "LOCKED"}</span>
            </div>
            <p className="reader-kicker">{currentEcho.prompt}</p>
            <h3>{currentEcho.title}</h3>
            {recovered.includes(activeEcho) ? (
              <div className="recovered-copy">
                <p>{currentEcho.fragment}</p>
                <blockquote>“{currentEcho.quote}”</blockquote>
              </div>
            ) : (
              <div className="locked-copy">
                <i /><i /><i /><i />
                <span>해당 좌표를 선택해야 원문이 표시됩니다.</span>
              </div>
            )}
            <div className="echo-tabs" role="group" aria-label="기억 잔향 선택">
              {echoes.map((echo, index) => (
                <button
                  key={echo.code}
                  className={activeEcho === index ? "active" : ""}
                  type="button"
                  onClick={() => setActiveEcho(index)}
                  aria-pressed={activeEcho === index}
                >
                  0{index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`identity-reveal ${complete ? "is-visible" : ""}`} aria-live="polite">
          {complete ? (
            <>
              <div className="identity-code">IDENTITY MATCH · ECHO-02</div>
              <div className="identity-main">
                <p>삭제된 두 번째 생존자</p>
                <h3>호시노 나기</h3>
                <span>星野 凪 / STATUS · ALIVE</span>
              </div>
              <p className="identity-note">
                코하루와 비슷한 또래의 여자아이. 말을 재촉하지 않고, 한 문장이 끝날 때까지 기다려준
                생애 최초의 친구. 공식 구조기록에서는 존재하지 않는다.
              </p>
            </>
          ) : (
            <div className="identity-locked">
              <span>IDENTITY SEALED</span>
              <p>잔향 {3 - recoveredCount}건을 더 복원하면 두 번째 생존자의 신원이 공개됩니다.</p>
            </div>
          )}
        </div>
      </section>

      <section className="timeline-section" id="timeline">
        <div className="section-index">03</div>
        <div className="section-heading">
          <div>
            <p className="eyebrow">SEALED CHRONOLOGY</p>
            <h2>빈자리가<br />만들어진 날.</h2>
          </div>
          <p>
            공개 기록과 봉인 원본을 시간순으로 대조합니다. 검은 표식은 코하루 본인에게도 공개되지
            않은 구간입니다.
          </p>
        </div>

        <div className="timeline">
          {timeline.map((item, index) => (
            <article className={`timeline-item ${index === 2 || index === 3 ? "sealed" : ""}`} key={item.code}>
              <div className="timeline-node"><span>{index.toString().padStart(2, "0")}</span></div>
              <div className="timeline-meta">
                <span>{item.code}</span>
                <strong>{item.age}</strong>
              </div>
              <div className="timeline-copy">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="last-memory">
          <span>LAST INTACT AUDIO · K-11</span>
          <p>
            “여기서 나가면 다시 이 벤치에서 만나자.”
          </p>
          <small>이 문장 직후 기억 처리 노이즈가 시작됩니다.</small>
        </div>
      </section>

      <section className="psychology-section">
        <div className="section-index">04</div>
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">PSYCHOLOGICAL RESIDUE</p>
            <h2>그녀가 정말<br />두려워하는 것.</h2>
          </div>
        </div>

        <div className="fear-grid">
          <article className="fear-card dark">
            <span>DEEPEST FEAR</span>
            <h3>죽는 것보다,<br />없었던 사람이 되는 것.</h3>
            <p>
              미움받는 것보다 자신이 그 자리에 있었다는 사실조차 눈치채지 못하는 상황을 더 두려워한다.
              이름을 불렸을 때 지나치게 놀라는 이유다.
            </p>
          </article>
          <article className="fear-card light">
            <span>SMALLEST WISH</span>
            <h3>다음에도 이름을<br />먼저 불러주는 사람.</h3>
            <p>
              말을 끝낼 때까지 기다려주고, 자신이 비워둔 옆자리에 다시 앉아주는 사람. 코하루에게는
              그 작은 바람이 생환만큼 절실하다.
            </p>
          </article>
          <article className="observation-card">
            <div className="observation-head">
              <span>ARK MEDICAL NOTE</span>
              <span>RECENT</span>
            </div>
            <p>
              “피험자의 손떨림은 이름을 정확히 불렸을 때 순간적으로 진폭이 증가한 뒤 안정된다.
              기억보다 신체가 먼저 상대를 확인하는 것으로 보인다.”
            </p>
          </article>
        </div>
      </section>

      <section className="connection-section" id="connection">
        <div className="section-index">05</div>
        <div className="connection-layout">
          <div className="connection-copy">
            <p className="eyebrow">CURRENT REENACTMENT · MUHYEONG</p>
            <h2>같은 질문.<br />이번에는 다른 사람.</h2>
            <p>
              무형이 점심을 먹었느냐고 묻고 코하루의 이름을 기억해 불렀을 때, 봉인된 기억의 순서가
              우연히 그대로 재현되었다.
            </p>
            <div className="dialogue-lines">
              <span>01 · “점심은 먹었어?”</span>
              <span>02 · 옆자리를 비워주는 행동</span>
              <span>03 · “코하루”라는 이름</span>
              <span>04 · 떨림 뒤에 찾아온 안도</span>
            </div>
            <blockquote>
              “ㅈ..제 이름.. 기..기억 해주셨네요..”
            </blockquote>
          </div>

          <div className="connection-diagram" aria-label="과거와 현재의 행동 반복 도식">
            <div className="diagram-column past">
              <span>THEN · SEALED</span>
              <strong>호시노 나기</strong>
              <small>최초로 이름을 기억한 사람</small>
            </div>
            <div className="diagram-center">
              <i />
              <span>같은 순서</span>
              <i />
            </div>
            <div className="diagram-column now">
              <span>NOW · PRESENT</span>
              <strong>무형</strong>
              <small>다시 이름을 기억한 사람</small>
            </div>
            <p>
              무형은 나기의 대체물도 환생도 아니다. 그는 과거의 상실을 반복할 사람인지, 이번에는
              그 반복을 끝낼 사람인지 아직 정해지지 않은 현재다.
            </p>
          </div>
        </div>
      </section>

      <section className={`final-file ${complete ? "unsealed" : ""}`}>
        <div className="final-topline">
          <span>FINAL OBSERVATION · ECHO-02</span>
          <span>{complete ? "UNSEALED" : "RECOVERY REQUIRED"}</span>
        </div>
        {complete ? (
          <>
            <p className="final-kicker">LATEST BLACK RECORD</p>
            <h2>두 사람은 서로를 잊었다.<br />기다리는 방법만 남았다.</h2>
            <p className="final-body">
              호시노 나기는 현재 다른 이름으로 생활 중이다. 매년 사고가 발생한 계절이면 가까운
              공원의 벤치 한쪽을 비워두고, 먹지 않은 점심을 두 사람 몫으로 나눈다.
            </p>
            <div className="final-alert">
              <span>NEW OBSERVATION</span>
              <strong>대상 ECHO-02, 수면 중 ‘코하루’라는 단어를 발음.</strong>
              <small>대상은 해당 이름을 알지 못한다고 진술함.</small>
            </div>
          </>
        ) : (
          <div className="final-redaction" aria-label="복원 전 검열 문서">
            <i /><i /><i /><i />
            <p>잔향 3건 복원 후 최종 관찰 기록을 열람할 수 있습니다.</p>
          </div>
        )}
      </section>

      <footer className="site-footer">
        <div className="footer-mark">W</div>
        <blockquote>
          아마노 코하루는 자신을 엑스트라라고 생각한다.
          <br />
          하지만 그녀가 모르는 곳에서 아직도 한 사람이 빈자리를 남겨두고 있다.
          <strong>그녀는 한 번도 완전히 잊힌 적이 없다.</strong>
        </blockquote>
        <div className="footer-meta">
          <span>WACA CENTRAL ARCHIVE</span>
          <span>END OF SEALED APPENDIX · 02-JP-KH</span>
        </div>
      </footer>
    </main>
  );
}
