"use client";

import { useEffect, useRef, useState } from "react";
import { profileFacts, publicChapters, relationshipHooks } from "./content";

const OFFICIAL_VIDEO_ID = "jv543Nk5s18";
const OFFICIAL_VIDEO_URL = `https://www.youtube.com/watch?v=${OFFICIAL_VIDEO_ID}`;

const preferredScrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

type PlayerState = "연결 중" | "재생 중" | "일시정지" | "재생 완료" | "연결 오류";

type YouTubePlayer = {
  cueVideoById: (videoId: string) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  unMute: () => void;
  mute: () => void;
  setVolume: (volume: number) => void;
  playVideo: () => void;
  pauseVideo: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: string,
        options: {
          videoId: string;
          playerVars: Record<string, string | number>;
          events: {
            onReady: (event: { target: YouTubePlayer }) => void;
            onStateChange: (event: { data: number }) => void;
            onError: () => void;
          };
        },
      ) => YouTubePlayer;
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function PetalGauge({ active = 6 }: { active?: number }) {
  return (
    <div className="petal-gauge" aria-label={`여섯 개 중 ${active}개 활성`}>
      {Array.from({ length: 6 }).map((_, index) => (
        <span key={index} className={index < active ? "is-active" : ""} />
      ))}
    </div>
  );
}

export default function KarmaDossier() {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const playerReadyRef = useRef(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [playerState, setPlayerState] = useState<PlayerState>("연결 중");
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [sealedOpen, setSealedOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("archive-locked", !entered);
    return () => document.body.classList.remove("archive-locked");
  }, [entered]);

  useEffect(() => {
    if (!entered) return;
    const compactViewport = window.matchMedia("(max-width: 640px), (max-height: 560px)");
    const collapseOnCompactViewport = () => {
      if (compactViewport.matches) setMusicOpen(false);
    };
    collapseOnCompactViewport();
    compactViewport.addEventListener("change", collapseOnCompactViewport);
    return () => compactViewport.removeEventListener("change", collapseOnCompactViewport);
  }, [entered]);

  useEffect(() => {
    const createPlayer = () => {
      if (!window.YT?.Player || playerRef.current) return;
      playerRef.current = new window.YT.Player("karma-player", {
        videoId: OFFICIAL_VIDEO_ID,
        playerVars: {
          controls: 1,
          playsinline: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            playerRef.current = event.target;
            playerReadyRef.current = true;
            event.target.cueVideoById(OFFICIAL_VIDEO_ID);
            document.querySelector<HTMLIFrameElement>("#karma-player iframe")?.setAttribute(
              "title",
              "달의하루 염라 공식 뮤직비디오 플레이어",
            );
            setPlayerReady(true);
            setPlayerState("일시정지");
          },
          onStateChange: (event) => {
            if (!window.YT) return;
            if (event.data === window.YT.PlayerState.PLAYING) setPlayerState("재생 중");
            if (event.data === window.YT.PlayerState.PAUSED) setPlayerState("일시정지");
            if (event.data === window.YT.PlayerState.ENDED) setPlayerState("재생 완료");
          },
          onError: () => {
            playerReadyRef.current = false;
            setPlayerState("연결 오류");
            setPlayerReady(false);
          },
        },
      });
    };

    if (window.YT?.Player) createPlayer();
    else {
      window.onYouTubeIframeAPIReady = createPlayer;
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.onerror = () => setPlayerState("연결 오류");
        document.head.appendChild(script);
      }
    }

    const timeout = window.setTimeout(() => {
      if (!playerReadyRef.current) setPlayerState("연결 오류");
    }, 12000);
    return () => window.clearTimeout(timeout);
  }, []);

  const enterWithMusic = () => {
    if (!playerRef.current || !playerReady) return;
    playerRef.current.seekTo(0, true);
    playerRef.current.unMute();
    playerRef.current.setVolume(72);
    playerRef.current.playVideo();
    setMuted(false);
    setMusicOpen(!window.matchMedia("(max-width: 640px), (max-height: 560px)").matches);
    setEntered(true);
    window.setTimeout(() => document.getElementById("identity")?.focus(), 850);
  };

  const enterWithoutMusic = () => {
    setMusicOpen(false);
    setEntered(true);
    window.setTimeout(() => document.getElementById("identity")?.focus(), 500);
  };

  const togglePlayback = () => {
    if (!playerRef.current) return;
    if (playerState === "재생 중") playerRef.current.pauseVideo();
    else {
      if (playerState === "재생 완료") playerRef.current.seekTo(0, true);
      playerRef.current.playVideo();
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (muted) playerRef.current.unMute();
    else playerRef.current.mute();
    setMuted(!muted);
  };

  const toggleSealedRecord = () => {
    if (sealedOpen) {
      setSealedOpen(false);
      window.setTimeout(
        () => document.getElementById("sealed")?.scrollIntoView({ behavior: preferredScrollBehavior(), block: "start" }),
        60,
      );
      return;
    }
    setSealedOpen(true);
    window.setTimeout(
      () => document.getElementById("sealed-record")?.scrollIntoView({ behavior: preferredScrollBehavior(), block: "start" }),
      120,
    );
  };

  return (
    <>
      <a className="skip-link" href="#identity" tabIndex={entered ? 0 : -1}>본문으로 건너뛰기</a>

      <header className={`site-nav ${entered ? "is-visible" : ""}`} inert={!entered}>
        <a className="nav-brand" href="#gate" aria-label="서유화 기록 첫 화면">
          <span>WACA</span><b>대한민국 · II</b>
        </a>
        <nav aria-label="기록 목차">
          <a href="#identity">인적 기록</a>
          <a href="#abilities">이능 판정</a>
          <a href="#incident">사건 기록</a>
          <a href="#sealed">봉인 문서</a>
        </nav>
      </header>

      <main>
        <section id="gate" className={`gate ${entered ? "is-open" : ""}`} aria-labelledby="gate-title">
          <div className="gate-index" aria-label="사건 KR-SI-0606, II등급, 생존">
            <span>사건</span><strong>KR-SI-0606</strong>
            <span>등급</span><strong>II</strong>
            <span>상태</span><strong>생존</strong>
          </div>

          <div className="broken-clock" aria-hidden="true">
            <span>06</span><i>:</i><span>66</span>
          </div>
          <span className="sr-only">기록 오류 시각, 6시 66분</span>

          <div className="gate-copy">
            <h1 id="gate-title">서유화</h1>
            <p className="gate-thesis">사라진 사람을 찾는 동안, 자기 이름부터 잃은 여자.</p>
            <blockquote>“살아남은 건 무죄가 아니라, 다음 사람을 놓치지 않을 책임이 생긴 거예요.”</blockquote>
            <p className="case-line">WACA 비인가 열람본 · 백일홍 사건 생존자 01</p>

            <div className="gate-actions">
              <p className="sr-only" role="status" aria-live="polite">
                {playerState === "연결 오류"
                  ? "공식 음원 연결에 실패했습니다. 기록만 먼저 열거나 공식 영상 링크를 이용할 수 있습니다."
                  : playerReady
                    ? "공식 음원 준비가 완료되었습니다. 기록을 열면 염라가 처음부터 재생됩니다."
                    : "달의하루 염라 공식 음원을 연결하고 있습니다."}
              </p>
              <button
                className="primary-action"
                type="button"
                disabled={entered}
                aria-disabled={!playerReady || entered}
                onClick={enterWithMusic}
              >
                {entered
                  ? "기록 개봉됨 · 전곡 재생 중"
                  : playerState === "연결 오류"
                    ? "공식 음원 연결 실패"
                    : playerReady
                      ? "기록을 열고 0:00부터 재생"
                      : "공식 음원 연결 중"}
              </button>
              {playerState === "연결 오류" && !entered && (
                <button className="fallback-action" type="button" onClick={enterWithoutMusic}>
                  기록만 먼저 열기
                </button>
              )}
              <p className="music-credit">테마 · 달의하루(Dareharu) 《염라(Karma)》 공식 MV</p>
              {playerState === "연결 오류" && (
                <a href={OFFICIAL_VIDEO_URL} target="_blank" rel="noreferrer">공식 영상에서 직접 재생하기</a>
              )}
            </div>
          </div>

          <div className="missing-slice" aria-hidden="true">
            <span className="candle" /><span className="candle-shadow" />
          </div>

          <div className="gate-footer" aria-hidden="true">
            <span>ARK 재생 오류</span><span>호흡 01 잔존</span>
          </div>
        </section>

        <div className={`archive ${entered ? "is-readable" : ""}`} aria-hidden={!entered} inert={!entered}>
          <section id="identity" className="identity-section" tabIndex={-1} aria-labelledby="identity-title">
            <div className="section-title-block">
              <h2 id="identity-title">남아 있는 사람</h2>
              <span>살아 있음은 판결이 아니라 상태다.</span>
              <p>인적 기록 · 공개 범위 A</p>
            </div>

            <div className="identity-ledger">
              <dl className="fact-ledger">
                {profileFacts.map(([term, value]) => (
                  <div key={term}><dt>{term}</dt><dd>{value}</dd></div>
                ))}
              </dl>

              <aside className="classification" aria-label="II등급 현장 판정">
                <span>II등급 현장 판정</span>
                <strong>II</strong>
                <p>개인 전투와 제한 지역 제압 가능. 이능 1개와 성물 이능 1개로 최대 보유 수 2개를 충족한다.</p>
                <dl>
                  <div><dt>최대 적용 반경</dt><dd>60 m</dd></div>
                  <div><dt>최대 투사 속도</dt><dd>500 m/s</dd></div>
                  <div><dt>권능</dt><dd>미각성</dd></div>
                  <div><dt>총기</dt><dd>소지 없음</dd></div>
                </dl>
              </aside>
            </div>
          </section>

          <section className="reflection-section" aria-labelledby="appearance-title">
            <div className="mirror-word" aria-hidden="true">얼굴 / 목소리 / 이름</div>
            <div className="reflection-copy">
              <div>
                <h2 id="appearance-title">거울이 먼저 기억한 얼굴</h2>
                <h3>외관 · 이미지 없음</h3>
                <p>
                  166cm의 마른 체형. 검은 머리는 쇄골에 닿기 전에 반듯하게 잘라 임무 중 묶을 수 있게 두고, 잿빛이 도는 갈색 눈은 상대의 입보다 눈썹과 턱을 먼저 살핀다. 왼쪽 귀 아래에는 피막이 세 번 찢어졌을 때 남은 가느다란 화상 흉터가 있다. 평상복은 무채색 셔츠와 움직임이 적은 바지, 현장에서는 목을 가리는 WACA 전술 재킷을 입는다. 장갑은 쓰지 않는다. 얼굴을 그리는 손끝과 업경의 온도를 직접 느껴야 하기 때문이다. 화장을 거의 하지 않지만 입술 안쪽을 깨무는 습관 때문에 말하지 못한 문장이 길수록 입술에 옅은 상처가 남는다.
                </p>
              </div>
              <div>
                <h3>성격 · 상냥한 모범생 / 관찰형 / 자기처벌적</h3>
                <p>
                  누군가의 취향, 알레르기, 대화 속도는 한 번에 기억하면서 자기 취향을 묻는 질문에는 네 박자쯤 늦게 대답한다. 갈등이 생기면 상대가 듣기 편한 문장부터 고르지만, 임무에서는 불편한 사실을 숨기지 않는다. 자신에게만 적용되는 처벌 기준이 지나치게 높아 구조 성공보다 놓친 한 명을 오래 기억한다. 다정함은 진짜다. 다만 그 다정함으로 타인의 선택을 대신 결정하려는 나쁜 버릇도 있다. 웃는 얼굴로 위험을 독점하고, 도움을 청하지 않은 뒤 혼자 남아 대가를 치르는 방식이다. 그녀가 배워야 할 것은 희생이 아니라 고백이다.
                </p>
              </div>
            </div>

            <div className="traits-strip">
              <div><span>선호</span><p>식은 블랙커피, 막 내린 뒤의 빈 객석, 이름이 남은 기록, 체리 없는 생크림 케이크</p></div>
              <div><span>불호</span><p>근거 없는 위로, 만장일치의 애도, 비어 있는 거울, “이제 잊어도 된다”는 말</p></div>
              <div><span>버릇</span><p>커피를 두 잔 주문해 한 잔을 남긴다. 매년 6월 6일 여섯 개의 초 중 마지막 하나는 켜지 않는다.</p></div>
            </div>
          </section>

          <section id="abilities" className="abilities-section" aria-labelledby="abilities-title">
            <div className="section-title-block inverse">
              <h2 id="abilities-title">가면은 숨기고, 거울은 고백시킨다</h2>
              <span>둘은 서로를 보완하지 않는다. 서로의 거짓말을 적발한다.</span>
              <p>이능 판정 · 총 2개 중 2개 등록</p>
            </div>

            <article className="ability ability-mask">
              <div className="ability-mark" aria-hidden="true"><span>1</span><i /></div>
              <div className="ability-copy">
                <h3>《가면극》</h3>
                <p className="ability-type">고유 이능 · 잠입 / 기만 / 구조 유도</p>
                <p className="ability-summary">타인을 흉내 내는 힘이 아니라, 타인이 보고 싶어 하는 얼굴을 먼저 알아차린 삶이 굳어진 이능.</p>
                <p>
                  두 손가락으로 자신의 턱선을 따라 그리면 투명한 영력 피막이 얼굴과 성대를 덮는다. 미리 조각해 둔 설계도의 얼굴과 목소리를 재현하며 최대 세 개의 설계도를 기억할 수 있다. 새 설계에는 대상 관찰과 거울 앞 조형 작업 30분이 필요하므로 전투 중 즉석 복제는 불가능하다.
                </p>
                <dl className="ability-stats">
                  <div><dt>발동</dt><dd>1턴</dd></div>
                  <div><dt>지속</dt><dd>전투 12턴 · 비전투 60분</dd></div>
                  <div><dt>재사용</dt><dd>해제 후 3턴 · 비전투 10분</dd></div>
                  <div><dt>보유 설계</dt><dd>최대 3개</dd></div>
                </dl>
                <details>
                  <summary>패널티와 파훼법 확인</summary>
                  <div>
                    <p><b>변하지 않는 것:</b> 키, 체격, 홍채, 지문, 걸음걸이, 기억, 영력 서명과 이능은 그대로다. ARK 검사와 세심한 관찰로 식별할 수 있다.</p>
                    <p><b>강제 해제:</b> 얼굴에 강한 충격을 받거나 피막 가장자리가 찢기면 즉시 벗겨진다.</p>
                    <p><b>누적 대가:</b> 한 장면 두 번째 사용부터 타인의 말버릇과 본래 발음이 섞인다. 세 번째 해제 뒤 3턴 동안 안면 근육과 성대가 굳어 발화할 수 없다. 이때 《업경》의 고백도 봉쇄된다.</p>
                  </div>
                </details>
              </div>
            </article>

            <article className="ability ability-mirror">
              <div className="relic-object" aria-hidden="true">
                <span className="relic-hinge" /><span className="relic-reflection" />
              </div>
              <div className="ability-copy">
                <h3>《업경: 여섯 고백》</h3>
                <p className="ability-type">성물 겸 제2이능 · 방어 / 요격 / 제한 제압</p>
                <p className="ability-summary">피어나의 유품으로 등록된 흑은제 접이식 거울. 테두리에는 여섯 개의 빈 꽃잎 홈이 있다.</p>
                <p>
                  두 눈을 거울에 비춘 채 지금 느끼는 감정과 그 대상을 한 턴 동안 소리 내어 인정하면, 두려움·분노·슬픔·죄책감·바람·애정 중 대응하는 홈에서 검은 유리 꽃잎이 생성된다. 거울은 객관적 진실을 판정하거나 타인의 마음을 읽지 않는다. 사용자의 맥박, 호흡, 영력 파형과 발화한 감정 범주가 일치하는지만 판정한다.
                </p>
                <PetalGauge />
                <dl className="ability-stats">
                  <div><dt>충전</dt><dd>1턴 고백 · 범주당 장면 1회</dd></div>
                  <div><dt>유지</dt><dd>생성 후 8턴 · 최대 6장</dd></div>
                  <div><dt>사거리</dt><dd>공전 5 m · 사출 60 m</dd></div>
                  <div><dt>속도</dt><dd>최대 500 m/s</dd></div>
                </dl>
                <div className="petal-uses">
                  <p><b>한 장:</b> 공격 1회 요격, 차량 외판 관통, 옷이나 장비를 지형에 고정. 마법적 구속은 아니다.</p>
                  <p><b>여섯 장:</b> 한 턴 동안 꽃형 방패 또는 관통 나선으로 결합. 최대 출력은 소형 건물 일부 붕괴 수준으로 II등급 상한보다 낮다. 사용 뒤 전부 소모되고 5턴간 성물이 봉인된다.</p>
                </div>
                <details>
                  <summary>패널티와 파훼법 확인</summary>
                  <div>
                    <p><b>공개 고백:</b> 고백은 15m 안의 모두가 들을 수 있는 크기여야 성립한다. 잠입 중에는 위치와 약점이 그대로 노출된다.</p>
                    <p><b>거부 반응:</b> 느끼지 않는 감정을 말하면 거울이 해당 홈을 2턴 봉인하고 뺨에 검은 반사상을 남긴다.</p>
                    <p><b>역류:</b> 꽃잎 세 장 이상이 한꺼번에 파괴되면 충격이 목으로 돌아와 2턴간 발성할 수 없다.</p>
                    <p><b>파훼:</b> 거울을 가리거나 시선을 끊기, 침묵과 재갈, 충전 중 근접 압박, 직선 사출의 궤도 회피가 유효하다.</p>
                  </div>
                </details>
              </div>
            </article>
          </section>

          <section className="breath-section" aria-labelledby="breath-title">
            <div className="breath-visual" aria-hidden="true">
              <span /><span /><span /><span /><span /><span />
            </div>
            <div>
              <h2 id="breath-title">전투 루프: 얼굴을 빌릴수록, 자기 목소리가 필요해진다</h2>
              <ol>
                <li><b>접근:</b> 《가면극》으로 경계선을 통과하고 적의 시선을 유도한다.</li>
                <li><b>노출:</b> 전투가 시작되면 변장보다 먼저 민간인 퇴로와 반사면을 확보한다.</li>
                <li><b>고백:</b> 자신이 숨기고 싶은 감정을 적도 듣는 자리에서 인정해 꽃잎을 만든다.</li>
                <li><b>선택:</b> 꽃잎을 공격에 소모할지, 동료에게 닿을 한 번의 공격을 막을지 결정한다.</li>
                <li><b>소진:</b> 얼굴을 세 번 바꾸면 목소리를 잃고, 꽃잎이 깨져도 목소리를 잃는다. 두 능력을 탐욕스럽게 함께 쓰면 둘 다 멈춘다.</li>
              </ol>
              <p className="counterplay-note">강점은 정보와 위치 선정, 약점은 공개된 발동 조건과 발성 의존성이다. 이 캐릭터의 가장 강한 순간은 가장 솔직한 순간이며, 가장 취약한 순간도 같다.</p>
            </div>
          </section>

          <section id="incident" className="incident-section" aria-labelledby="incident-title">
            <div className="playback-header">
              <span>ARK 회수 기록</span><span>06:66:66</span><span>오류 43 / 46</span>
            </div>
            <div className="section-title-block playback-title">
              <h2 id="incident-title">피어나를 잃고, 서유화가 남았다</h2>
              <span>이 기록만으로도 하나의 이야기는 끝난다. 그러나 끝났다는 사실이 진실을 뜻하지는 않는다.</span>
              <p>공개 사건 기록 · 보고자 서유화</p>
            </div>

            <div className="timeline">
              {publicChapters.map((chapter) => (
                <article className="chapter" key={chapter.stamp}>
                  <time>{chapter.stamp}</time>
                  <div>
                    <h3>{chapter.title}</h3>
                    {chapter.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="sealed" className={`sealed-section ${sealedOpen ? "is-open" : ""}`} aria-labelledby="sealed-title">
            <div className="seal-door">
              <div className="seal-copy">
                <h2 id="sealed-title">사망자 명단에 없는 사람</h2>
                <p>피어나의 시신도 가족도 법적 이력도 없다. 유화와 함께 찍힌 사진도 없다. 거울의 손때는 유화의 손가락에만 맞는다. 이 공백을 우연으로 판정하시겠습니까?</p>
                <p className="seal-meta">최고 기밀 부록 · 캐릭터 비설 검사 대상</p>
              </div>
              <button
                type="button"
                className="seal-button"
                aria-expanded={sealedOpen}
                aria-controls="sealed-record"
                onClick={toggleSealedRecord}
              >
                {sealedOpen ? "봉인 기록 접기" : "06:66 봉인 기록 열람"}
              </button>
            </div>

            {sealedOpen && (
              <div id="sealed-record" className="sealed-record">
                <div className="redaction-banner">
                  <span>신원 충돌</span>
                  <strong>피어나는 별개의 인물이 아니다.</strong>
                  <span>ARK 영력 서명 일치 · 99.97%</span>
                </div>

                <article className="reveal-chapter major-reveal">
                  <h3>서유화가 피어나였다.</h3>
                  <p className="file-label">정정 01 · 가면이 진짜였던 사람</p>
                  <p>피어나는 《가면극》으로 만든 첫 번째 설계도이자 유화의 무대명이었다. 기억이 분리된 또 다른 인격이 아니다. 유화는 모든 선택을 알고 있었고, 스스로 얼굴과 목소리를 골라 무대에 올랐다. 낮의 서유화로는 말하지 못한 사랑과 분노와 욕망을, 밤의 피어나로는 정확히 말했다. 만들어 낸 얼굴이 가장 솔직했고 법적 이름 쪽이 오히려 타인에게 맞춘 배역이었다.</p>
                  <p>공개 기록에서 피어나가 건넨 위로는 유화가 그 목소리로 타인에게 했던 말이거나 자신의 일기에 남긴 문장이다. 함께 찍힌 사진이 없는 것은 카메라를 싫어해서가 아니다. 둘이 같은 시간에 존재할 수 없었기 때문이다. 피어나의 유품으로 등록된 업경도 처음부터 유화의 분장 도구였다. 거울은 상속자를 택한 적이 없다. 사고 뒤에도 같은 사용자를 다시 선택했을 뿐이다.</p>
                </article>

                <article className="reveal-chapter confession-scene">
                  <h3>그녀가 돌아가지 못한 것이 아니라, 대답하지 않았다.</h3>
                  <p className="file-label">정정 02 · 18시 06분, 대답하지 않은 사람</p>
                  <p>밀매 조직을 촬영한 사람은 피어나의 얼굴을 쓴 유화였다. 붕괴 직전 그녀는 피막을 벗고 서유화의 얼굴로 피난 통로를 지키고 있었다. 실제 동료 정세린이 연기 속에서 외쳤다. “피어나 씨가 아직 안 나왔어.” 유화는 단 한 문장으로 세린을 멈출 수 있었다. 내가 피어나야. 그 말을 하지 않았다.</p>
                  <p>목소리를 내면 추적자가 증인의 정체와 피난민의 위치를 알아낼 수 있었다. 43명을 지키기 위한 전술적 침묵이었다. 동시에, 위험을 불러온 피어나라는 이름을 그날 죽이고 싶다는 욕망도 있었다. 어느 쪽이 더 컸는지는 유화 자신도 판결하지 못한다. 세린은 피어나를 찾으러 돌아갔고, 무너진 무대 아래에서 사망했다. 유화는 살아남았다.</p>
                  <blockquote>“나는 세린을 죽이지 않았다. 하지만 세린이 돌아가는 것을 멈추지 않았다. 둘은 같은 문장이 아니고, 어느 쪽도 나를 무죄로 만들지 않는다.”</blockquote>
                </article>

                <article className="reveal-chapter karma-chapter">
                  <h3>재판관과 피고가 같은 얼굴을 쓴다.</h3>
                  <p className="file-label">정정 03 · 염라와 Karma</p>
                  <p>사건 뒤 유화는 WACA에 피어나를 별도 실종자로 진술했다. 피난민과 자신의 신분을 보호하기 위한 거짓말이었고, 동시에 가장 진실했던 자신에게 장례를 주기 위한 거짓말이었다. 사람들은 유화를 위로했다. 세린의 유족은 살아 줘서 고맙다고 말했다. 유화는 자신이 죽은 친구를 애도하는 생존자라는 배역으로 다시 사랑받았다.</p>
                  <p>그녀의 업보는 초월적인 저주가 아니다. 한 번의 침묵과 한 번의 허위 진술이 ARK 로그, 두 잔의 커피, 같은 필체, 설명되지 않는 영력 서명이 되어 돌아오는 인과다. 유화는 피어나를 죽인 사람을 찾는 척하며 자신을 심문한다. 염라는 거울 밖에 없다. 거울 앞의 유화가 판결하고, 피어나의 얼굴을 쓴 유화가 증언하며, 둘 사이에서 죽은 세린의 자리가 끝내 비어 있다.</p>
                </article>

                <div className="evidence-ledger" aria-label="공개 기록 재해석">
                  <h3>다시 읽히는 여섯 개의 증거</h3>
                  <div><span>사진 없음</span><p>피어나가 카메라를 피한 것이 아니라 두 사람이 동시에 존재할 수 없었다.</p></div>
                  <div><span>같은 필체</span><p>쪽지와 유화의 현장 보고서는 필압과 문장 습관까지 같다.</p></div>
                  <div><span>거울의 손때</span><p>유품으로 분류된 물건은 오래전부터 유화의 손 모양대로 닳아 있었다.</p></div>
                  <div><span>식은 커피 두 잔</span><p>한 잔은 피어나를 위한 추모이고, 다른 한 잔은 그 추모를 연기하는 서유화를 위한 벌이다.</p></div>
                  <div><span>식별 실패</span><p>ARK는 피어나를 별도 생체 정보로 한 번도 등록하지 못했다.</p></div>
                  <div><span>마지막 초</span><p>켜지지 않은 초는 피어나의 몫이 아니라, 세린에게 진실을 말하지 않은 한 사람의 몫이다.</p></div>
                </div>

                <article className="reveal-chapter current-objective">
                  <h3>지우고 싶어서 찾고, 들키고 싶어서 남긴다.</h3>
                  <p className="file-label">현재 · 2027년 베들레헴 특별성역</p>
                  <p>공개 목표는 밀매 조직 잔당을 추적하고 피어나의 이름을 복원하는 것이다. 실제 목표는 성 요한의 보안 기록 어딘가에 남았을 2025년 ARK 음성과 영력 서명 대조 자료를 먼저 찾아 지우는 것이다. 그러나 완전히 없앨 수 있는 단서를 발견할 때마다 하나씩 남긴다. 누군가 기록을 읽고 피어나가 너였구나 하고 알아봐 주기를 바라기 때문이다.</p>
                  <p>업경의 바람 홈은 그래서 자주 피지 않는다. 정의를 원한다는 말은 일부만 진실이다. 더 깊은 바람은 피어나를 사랑했던 사람들이 서유화라는 이름의 자신도 다시 선택해 주는 것이다. 그 욕망을 동료들 앞에서 고백해 꽃잎을 만드는 순간이 그녀의 개화가 된다. 피어나의 얼굴로 도망치는 것이 아니라, 서유화의 얼굴로도 피어나처럼 말하는 것. 가면을 벗는 대신 두 얼굴을 한 삶으로 통합하는 것이 최종 서사다.</p>
                </article>

                <div className="final-confession">
                  <PetalGauge />
                  <p>권능 각성 전, 그녀가 아직 말하지 못한 여섯 번째 고백</p>
                  <blockquote>“내가 피어나였어요. 나는 살고 싶어서 대답하지 않았어요. 그 사실을 알고도, 당신이 나를 선택해 주길 바라요.”</blockquote>
                  <p>여섯 꽃잎이 모두 피어도 유화는 발사하지 않는다. 가장 강한 무기를 손에 쥔 채 공격하지 않는 선택이, 그녀가 처음으로 자기 자신을 살리는 장면이다.</p>
                </div>
              </div>
            )}
          </section>

          <section className="hooks-section" aria-labelledby="hooks-title">
            <div className="section-title-block">
              <h2 id="hooks-title">진실은 혼자 완성되지 않는다</h2>
              <span>누가 알아보고, 누가 침묵하며, 누가 같은 얼굴을 다시 선택할 것인가.</span>
              <p>관계도 · 역할극 확장 기록</p>
            </div>
            <div className="hooks-list">
              {relationshipHooks.map(([role, hook]) => (
                <article key={role}><h3>{role}</h3><p>{hook}</p></article>
              ))}
            </div>
            <aside className="gm-note">
              <h3>총괄 검사 메모</h3>
              <p>피어나를 별도 실종자로 진술한 설정과 ARK 대조자료 잔존 가능성은 세계관 연동 비설이므로 사전 검사가 필요하다. 특정 사도나 MPC가 이미 진실을 안다고 확정하지 않으며, 관련 부서 캐릭터가 조사로 발견할 수 있는 가능성만 제시한다. 타락, 권능 각성, 영구 상해는 현재 설정하지 않는다.</p>
            </aside>
          </section>

          <section className="judgment-section" aria-labelledby="judgment-title">
            <div className="melted-candle" aria-hidden="true"><span /></div>
            <h2 id="judgment-title">무죄가 아니라, 계속 살아갈 사람.</h2>
            <p>최종 현장 판정</p>
            <div className="judgment-grid">
              <div><span>판정</span><strong>II등급 적합</strong></div>
              <div><span>위험</span><strong>자기처벌성 지휘 불복종</strong></div>
              <div><span>보호 요인</span><strong>공개 고백과 동료 개입</strong></div>
              <div><span>현재 상태</span><strong>개화 보류 · 생존 의사 확인</strong></div>
            </div>
            <blockquote>사람은 가면 때문에 거짓이 되는 것이 아니다. 가면 아래에서 무엇을 선택했는지 말하지 않을 때, 그 선택이 대신 이름을 갖는다.</blockquote>
            <span className="rebloom-dot" aria-hidden="true" />
            <p className="record-end">기록 종료 · 개화 보류</p>
          </section>

          <footer className="site-footer">
            <div>
              <strong>서유화 · WACA II등급 비공식 캐릭터 프로필</strong>
              <p>외관 이미지는 사용하지 않았습니다. WACA 고유 설정은 원문을 따르고, 캐릭터와 사건은 창작입니다.</p>
            </div>
            <div className="source-links">
              <a href="https://www.postype.com/@biop101/post/22504138" target="_blank" rel="noreferrer">WACA 프로필 양식</a>
              <a href="https://www.postype.com/@biop101/post/22504343" target="_blank" rel="noreferrer">검사 가이드</a>
              <a href="https://www.postype.com/@biop101/post/22484197" target="_blank" rel="noreferrer">WACA 세계관</a>
              <a href={OFFICIAL_VIDEO_URL} target="_blank" rel="noreferrer">《염라》 공식 MV</a>
              <a href="https://x.com/ampstyle_/status/1287651736543350786" target="_blank" rel="noreferrer">숨은 코러스 해설</a>
            </div>
          </footer>
        </div>
      </main>

      <aside
        className={`music-console ${entered ? "is-visible" : ""} ${musicOpen ? "is-open" : ""}`}
        aria-label="테마곡 재생 패널"
        aria-hidden={!entered}
        inert={!entered}
      >
        <div className="music-head">
          <div>
            <span className={`state-dot ${playerState === "재생 중" ? "is-playing" : ""}`} />
            <p><b>염라 (Karma)</b><span>달의하루 · 공식 MV · {playerState}</span></p>
          </div>
          <button type="button" onClick={() => setMusicOpen(!musicOpen)} aria-expanded={musicOpen}>
            {musicOpen ? "영상 접기" : "영상 펼치기"}
          </button>
        </div>
        <div className="player-frame"><div id="karma-player" /></div>
        <div className="music-controls">
          <button type="button" onClick={togglePlayback} disabled={!playerReady}>
            {playerState === "재생 중" ? "일시정지" : playerState === "재생 완료" ? "처음부터 다시" : "계속 재생"}
          </button>
          <button type="button" onClick={toggleMute} disabled={!playerReady}>{muted ? "소리 켜기" : "음소거"}</button>
          <a href={OFFICIAL_VIDEO_URL} target="_blank" rel="noreferrer">공식 영상</a>
        </div>
      </aside>
    </>
  );
}
