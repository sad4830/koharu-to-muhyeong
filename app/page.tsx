"use client";

import Script from "next/script";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type YouTubePlayer = {
  destroy: () => void;
  pauseVideo: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  stopVideo: () => void;
  unMute: () => void;
};

type YouTubePlayerEvent = {
  data: number;
  target: YouTubePlayer;
};

type YouTubePlayerOptions = {
  events?: {
    onAutoplayBlocked?: () => void;
    onError?: () => void;
    onReady?: (event: YouTubePlayerEvent) => void;
    onStateChange?: (event: YouTubePlayerEvent) => void;
  };
  height?: number | string;
  playerVars?: Record<string, number | string>;
  videoId: string;
  width?: number | string;
};

declare global {
  interface Window {
    YT?: {
      Player: new (elementId: string, options: YouTubePlayerOptions) => YouTubePlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const ROMANCE_VIDEO_ID = "hmGr62NE0hg";

type Chapter = {
  eyebrow: string;
  title: string;
  scene: string;
  lines: string[];
  status: {
    pulse: string;
    gaze: string;
    hands: string;
  };
};

const chapters: Chapter[] = [
  {
    eyebrow: "01 · 말을 꺼내기까지",
    title: "자, 잠깐만요.",
    scene:
      "코하루는 편지 모서리를 벌써 네 번째 접었다 펴고 있습니다. 귀 뒤로 넘겼던 잔머리는 다시 볼 위로 흘러내렸고, 신발 끝은 얌전히 서로를 향합니다.",
    lines: [
      "무, 무형 씨. 저기…… 잠깐만 시간 괜찮으세요?",
      "아, 아니, 바쁘시면 나중이어도 괜찮아요. 정말로요. 다만 제가 또 도망가기 전에…… 조금만 들어주세요.",
    ],
    status: { pulse: "148 BPM", gaze: "바닥에서 12cm", hands: "편지 구기는 중" },
  },
  {
    eyebrow: "02 · 마흔여덟 번의 연습",
    title: "외운 말은 전부 사라지고",
    scene:
      "밤새 외운 문장은 첫 음절부터 엉켰습니다. 코하루는 울상이 된 채 입술을 달싹이다가, 앞머리만 괜히 두 번 더 귀 뒤로 넘깁니다.",
    lines: [
      "저, 연습은 많이 했어요. 마, 마흔여덟 번쯤…… 그런데 무형 씨 얼굴을 보면 하나도 기억이 안 나서…….",
      "죄송해요. 이럴 생각은 아니었는데…… 아, 고백하면서 사과하면 안 된다고도 연습했는데…….",
    ],
    status: { pulse: "156 BPM", gaze: "아주 잠깐 마주침", hands: "소매 끝 꼭 쥠" },
  },
  {
    eyebrow: "03 · 평범한 하루의 의미",
    title: "함께라서 좋아진 것들",
    scene:
      "늘 어느 방에서든 출구부터 찾던 코하루가 오늘만큼은 도망칠 곳을 등지고 섭니다. 떨리는 목소리는 작지만, 이번에는 끝까지 사라지지 않습니다.",
    lines: [
      "저는 별일 없이 끝나는 하루를 좋아해요. 조용한 편의점이랑, 늦은 밤 산책이랑, 따뜻한 캔커피 같은 거요.",
      "그런 평범한 순간을 떠올릴 때마다 자꾸 무형 씨가 같이 생각나요. 함께라면…… 이상하게 끝나지 않았으면 좋겠다고요.",
    ],
    status: { pulse: "162 BPM", gaze: "도망치지 않음", hands: "편지를 내밂" },
  },
];

const courageLines = [
  "저, 저기……",
  "도망가면 안 돼……요.",
  "이번에는 꼭 말할게요.",
];

function Petals({ active }: { active: boolean }) {
  const petals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: index,
        left: `${4 + ((index * 41) % 92)}%`,
        delay: `${(index % 7) * 0.46}s`,
        duration: `${7 + (index % 5) * 0.8}s`,
        drift: `${-42 + ((index * 19) % 84)}px`,
      })),
    [],
  );

  return (
    <div className={`petal-field ${active ? "is-active" : ""}`} aria-hidden="true">
      {petals.map((petal) => (
        <span
          className="petal"
          key={petal.id}
          style={
            {
              "--left": petal.left,
              "--delay": petal.delay,
              "--duration": petal.duration,
              "--drift": petal.drift,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [courage, setCourage] = useState(0);
  const [confessed, setConfessed] = useState(false);
  const [tinyNote, setTinyNote] = useState(false);
  const [musicReady, setMusicReady] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const storyRef = useRef<HTMLElement>(null);
  const confessionRef = useRef<HTMLElement>(null);
  const musicPlayerRef = useRef<YouTubePlayer | null>(null);
  const musicReadyRef = useRef(false);
  const pendingMusicStartRef = useRef(false);

  const current = chapters[chapter];
  const currentStep = confessed ? chapters.length + 1 : chapter + 1;
  const progress = opened ? currentStep / (chapters.length + 1) : 0;

  const startRomance = useCallback(() => {
    const player = musicPlayerRef.current;

    if (!player || !musicReadyRef.current) {
      pendingMusicStartRef.current = true;
      return;
    }

    try {
      player.seekTo(0, true);
      player.unMute();
      player.playVideo();
      pendingMusicStartRef.current = false;
      setAutoplayBlocked(false);
    } catch {
      setAutoplayBlocked(true);
    }
  }, []);

  const initializeMusicPlayer = useCallback(() => {
    if (musicPlayerRef.current || !window.YT?.Player) return;

    musicPlayerRef.current = new window.YT.Player("romance-player", {
      height: 200,
      width: 356,
      videoId: ROMANCE_VIDEO_ID,
      playerVars: {
        controls: 1,
        enablejsapi: 1,
        origin: window.location.origin,
        playsinline: 1,
        rel: 0,
        start: 0,
      },
      events: {
        onReady: ({ target }) => {
          musicPlayerRef.current = target;
          musicReadyRef.current = true;
          setMusicReady(true);

          if (pendingMusicStartRef.current) {
            startRomance();
          }
        },
        onStateChange: ({ data }) => {
          if (data === 1) setAutoplayBlocked(false);
        },
        onAutoplayBlocked: () => setAutoplayBlocked(true),
        onError: () => setAutoplayBlocked(true),
      },
    });
  }, [startRomance]);

  useEffect(() => {
    if (!opened) return;
    const timer = window.setTimeout(() => storyRef.current?.focus(), 520);
    return () => window.clearTimeout(timer);
  }, [opened]);

  useEffect(() => {
    window.onYouTubeIframeAPIReady = initializeMusicPlayer;
    if (window.YT?.Player) initializeMusicPlayer();

    return () => {
      if (window.onYouTubeIframeAPIReady === initializeMusicPlayer) {
        window.onYouTubeIframeAPIReady = undefined;
      }
    };
  }, [initializeMusicPlayer]);

  const openLetter = () => {
    setOpened(true);
    startRomance();
  };

  const nextChapter = () => {
    setChapter((value) => Math.min(value + 1, chapters.length - 1));
  };

  const gatherCourage = () => {
    if (courage >= courageLines.length) return;

    const nextCourage = courage + 1;
    setCourage(nextCourage);

    if (nextCourage === courageLines.length) {
      setConfessed(true);
      window.setTimeout(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        confessionRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }, 420);
    }
  };

  const restart = () => {
    try {
      musicPlayerRef.current?.stopVideo();
      musicPlayerRef.current?.seekTo(0, true);
    } catch {
      // The letter can still be reset while the embedded player is unavailable.
    }
    pendingMusicStartRef.current = false;
    setAutoplayBlocked(false);
    setOpened(false);
    setChapter(0);
    setCourage(0);
    setConfessed(false);
    setTinyNote(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={`site-shell ${opened ? "letter-opened" : ""} ${confessed ? "is-confessed" : ""}`}>
      <Script src="https://www.youtube.com/iframe_api" strategy="afterInteractive" onReady={initializeMusicPlayer} />
      <Petals active={opened} />

      <div className="ambient ambient-mint" aria-hidden="true" />
      <div className="ambient ambient-gold" aria-hidden="true" />

      <section className={`gate ${opened ? "is-open" : ""}`} aria-hidden={opened} inert={opened}>
        <div className="gate-grid" aria-hidden="true" />
        <div className="gate-topline">
          <span>WACA CENTRAL ARCHIVE</span>
          <span>PRIVATE LOG · 02-JP-KH</span>
        </div>

        <div className="sealed-letter">
          <div className="corner-label">수신인 전용</div>
          <div className="flower-mark" aria-hidden="true">
            <span className="flower-petal p1" />
            <span className="flower-petal p2" />
            <span className="flower-petal p3" />
            <span className="flower-petal p4" />
            <span className="flower-core" />
          </div>
          <p className="gate-kicker">NOT AN OFFICIAL RECORD</p>
          <h1>
            무형 씨에게<span className="soft-period">.</span>
          </h1>
          <p className="gate-subtitle">
            발신인&nbsp; 아마노 코하루
            <br />
            <span>한 번 열면…… 제가 숨을 곳은 없어요.</span>
          </p>
          <button className="open-button" type="button" onClick={openLetter} disabled={opened}>
            <span>편지를 열고 음악 듣기</span>
            <span className="button-arrow" aria-hidden="true">↗</span>
          </button>
          <div className="gate-status">
            <span>ARK INTEGRITY · VERIFIED</span>
            <span className="nervous-dot">떨림 감지됨</span>
          </div>
        </div>

        <p className="gate-whisper">“저, 정말 여실 건가요……?”</p>
      </section>

      <section className="story" ref={storyRef} tabIndex={-1} aria-hidden={!opened} inert={!opened}>
        <header className="story-header">
          <a className="wordmark" href="#letter" aria-label="편지 처음으로 이동">
            <span className="wordmark-glyph">小春</span>
            <span>
              KOHARU&apos;S PRIVATE LOG
              <small>FOR MUHYEONG, ONLY</small>
            </span>
          </a>
          <div className="chapter-count" aria-label={`전체 4장 중 ${currentStep}장`}>
            <span>0{currentStep}</span>
            <i />
            <span>04</span>
          </div>
        </header>

        <div className="progress-track" aria-hidden="true">
          <span style={{ width: `${progress * 100}%` }} />
        </div>

        <aside className="music-deck" aria-label="고백 로그 배경 음악">
          <div className="music-deck-header">
            <div>
              <span>NOW PLAYING · OFFICIAL AUDIO</span>
              <strong>OCTOBER — Romance</strong>
            </div>
            <button type="button" onClick={startRomance} disabled={!musicReady}>
              처음부터 재생
            </button>
          </div>
          <div className="music-player-shell">
            <div id="romance-player" />
          </div>
          <p className={autoplayBlocked ? "music-notice is-blocked" : "music-notice"} aria-live="polite">
            {autoplayBlocked
              ? "브라우저가 재생을 막았습니다. 위의 ‘처음부터 재생’을 눌러주세요."
              : musicReady
                ? "편지를 여는 순간부터 마지막 음까지 이어집니다."
                : "공식 음원을 준비하고 있습니다……"}
          </p>
        </aside>

        <div className="story-grid" id="letter">
          <aside className="status-panel">
            <p className="panel-label">KOHARU · LIVE STATUS</p>
            <dl>
              <div>
                <dt>심박</dt>
                <dd>{current.status.pulse}</dd>
              </div>
              <div>
                <dt>시선</dt>
                <dd>{current.status.gaze}</dd>
              </div>
              <div>
                <dt>두 손</dt>
                <dd>{current.status.hands}</dd>
              </div>
            </dl>
            <div className="pulse-visual" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <p className="status-note">※ 생환회로와 무관한 단순 긴장입니다.</p>
          </aside>

          <article className="letter-card" key={chapter}>
            <div className="paper-pin" aria-hidden="true" />
            <p className="chapter-eyebrow">{current.eyebrow}</p>
            <h2>{current.title}</h2>
            <p className="scene-copy">{current.scene}</p>
            <div className="dialogue" aria-live="polite">
              {current.lines.map((line, index) => (
                <p key={line} className={`dialogue-line line-${index + 1}`}>
                  <span aria-hidden="true">“</span>
                  {line}
                  <span aria-hidden="true">”</span>
                </p>
              ))}
            </div>

            {chapter < chapters.length - 1 ? (
              <button className="continue-button" type="button" onClick={nextChapter}>
                <span>조금만 더 들어주세요</span>
                <span aria-hidden="true">→</span>
              </button>
            ) : (
              <a className="continue-button" href="#courage">
                <span>마지막 한마디까지</span>
                <span aria-hidden="true">↓</span>
              </a>
            )}
          </article>
        </div>

        <section className="courage-section" id="courage">
          <div className="courage-copy">
            <p className="chapter-eyebrow">04 · 이제 도망치지 않기</p>
            <h2>용기가 조금 모자랍니다.</h2>
            <p>
              버튼을 눌러 코하루에게 딱 세 번만 용기를 빌려주세요.
              <br />
              마지막 말은, 직접 해야 하니까요.
            </p>
          </div>

          <div className="courage-console">
            <div className="courage-meter" aria-label={`용기 ${Math.min(courage, 3)}칸 중 3칸`}>
              {[0, 1, 2].map((index) => (
                <span key={index} className={courage > index ? "filled" : ""}>
                  <i aria-hidden="true">♥</i>
                </span>
              ))}
            </div>
            <p className="courage-murmur" aria-live="polite">
              {courage === 0 ? "손끝이 자꾸만 떨립니다." : courageLines[Math.min(courage - 1, 2)]}
            </p>
            <button className="courage-button" type="button" onClick={gatherCourage} disabled={confessed}>
              {courage < 3 ? `용기 건네기 · ${courage + 1}/3` : "용기가 모두 모였습니다"}
            </button>
          </div>
        </section>

        {confessed ? (
          <section className="confession is-visible" id="confession" ref={confessionRef}>
            <div className="confession-halo" aria-hidden="true" />
            <p className="confession-kicker">THE WORDS SHE COULDN&apos;T REHEARSE</p>
            <div className="final-scene">
              <span className="tiny-flower" aria-hidden="true">
                ✿
              </span>
              <p>
                끝내 눈을 마주치지는 못한 채, 코하루가 편지를 두 손으로 내밉니다.
                <br />
                목소리는 금방이라도 울 것처럼 떨리지만 이번만큼은 물러서지 않습니다.
              </p>
            </div>
            <h2>
              “저, 무형 씨를
              <br />
              <em>좋아해요.</em> 아주 많이요.”
            </h2>
            <div className="final-words">
              <p>“겁이 나도…… 이 마음에서는 도망치고 싶지 않아요.”</p>
              <p>
                “그러니까, 괜찮으시다면……
                <strong>제 옆에 있어 주실래요?</strong>”
              </p>
              <p className="wait-line">
                “대답은 급하게 안 하셔도 돼요. 저, 기다리는 건 잘하니까요. 아…… 사실 잘 못하지만, 그,
                그래도 기다릴게요.”
              </p>
            </div>

            <button
              className="flower-secret"
              type="button"
              onClick={() => setTinyNote((value) => !value)}
              aria-expanded={tinyNote}
            >
              <span aria-hidden="true">✿</span>
              노란 꽃을 살짝 눌러보기
            </button>
            <p className={`tiny-note ${tinyNote ? "is-visible" : ""}`} aria-live="polite">
              “아, 그리고 푸딩도 사 왔어요. 이건 대답이랑 상관없이 무형 씨 거예요……!”
            </p>

            <div className="answer-space">
              <span>TO BE ANSWERED BY MUHYEONG</span>
              <p>이 다음의 대답은, 오직 무형의 몫입니다.</p>
            </div>
          </section>
        ) : null}

        <footer className="site-footer">
          <p>PRIVATE CONFESSION LOG · AMANO KOHARU → MUHYEONG</p>
          <button type="button" onClick={restart}>편지 다시 접기</button>
        </footer>
      </section>
    </main>
  );
}
