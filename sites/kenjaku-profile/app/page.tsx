"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

const sources = [
  {
    label: "애니 공식 캐릭터",
    note: "정체, 육체 이동, 카모·게토, 사멸회유 주모자, 일본 성우",
    href: "https://jujutsukaisen.jp/character/",
    scope: "anime",
  },
  {
    label: "애니 공식 46화",
    note: "주령조술, 마히토 흡수와 극번 「소용돌이」",
    href: "https://jujutsukaisen.jp/episodes/46.php",
    scope: "anime",
  },
  {
    label: "애니 공식 사멸회유",
    note: "사멸회유의 흐름, 결계와 켄자쿠의 관여",
    href: "https://jujutsukaisen.jp/shimetsukaiyu/",
    scope: "anime",
  },
  {
    label: "원작 145화",
    note: "텐겐이 설명하는 켄자쿠의 목적과 결계술",
    href: "https://shonenjumpplus.com/episode/3269754496549956555",
    scope: "manga",
  },
  {
    label: "원작 206화",
    note: "영역 전개 「태장편야」와 결계를 닫지 않는 기예",
    href: "https://shonenjumpplus.com/episode/4856001361508215302",
    scope: "manga",
  },
  {
    label: "원작 208화",
    note: "이타도리 카오리의 반중력 기구와 술식 반전",
    href: "https://shonenjumpplus.com/episode/4856001361508215318",
    scope: "manga",
  },
];

const abilityTabs = [
  {
    key: "body",
    title: "육체 이동",
    origin: "켄자쿠 고유 술식",
    summary: "뇌를 바꿔 끼워 죽은 자의 육체를 갈아탄다.",
    body: "숙주의 기억과 육체에 새겨진 술식을 이용한다. 이마를 가로지르는 봉합선이 식별 표식이다. 공식 고유명은 공개되지 않았다.",
    note: "저장 가능한 술식 수와 본래 육체의 정체는 미공개다.",
    scope: "anime",
  },
  {
    key: "curse",
    title: "주령조술",
    origin: "게토 스구루의 술식",
    summary: "항복시킨 주령을 흡수해 수집하고 사역한다.",
    body: "극번 「소용돌이」는 흡수한 주령을 고밀도로 압축해 쏜다. 준1급 이상의 주령을 재료로 쓰면 그 주령의 술식을 추출할 수 있다.",
    note: "추출한 술식이 무조건 1회용이라는 설명은 작중 추론이며 확정 설정이 아니다.",
    scope: "anime",
  },
  {
    key: "gravity",
    title: "반중력 기구",
    origin: "이타도리 카오리의 술식",
    summary: "기본 효과는 반중력. 반전시키면 중력을 만든다.",
    body: "양의 에너지를 흘려 효과를 뒤집은 술식 반전이 켄자쿠가 전투에서 사용한 중력 공격이다. 반전술식에 의한 신체 치료와는 다른 개념이다.",
    note: "유키의 블랙홀에는 자신의 몸을 영역으로 삼아 기본 술식의 한계를 보강했다.",
    scope: "manga",
  },
  {
    key: "domain",
    title: "태장편야",
    origin: "영역 전개",
    summary: "결계를 닫지 않고 현실 공간에 펼치는 고등 영역이다.",
    body: "텐겐의 해체 계획을 무너뜨리고 츠쿠모 유키의 간이영역을 빠르게 벗겨 치명상을 입혔다. 스쿠나와 같은 유형의 드문 기예다.",
    note: "영역에 부여된 정확한 술식과 전체 효과는 끝까지 명시되지 않았다.",
    scope: "manga",
  },
];

function Reveal({ children, className = "" }: RevealProps) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export default function Home() {
  const [mangaOpen, setMangaOpen] = useState(false);
  const [endingOpen, setEndingOpen] = useState(false);
  const [activeAbility, setActiveAbility] = useState("body");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [mangaOpen]);

  const visibleAbilities = useMemo(
    () => abilityTabs.filter((ability) => ability.scope === "anime" || mangaOpen),
    [mangaOpen],
  );

  const selectedAbility = useMemo(
    () => visibleAbilities.find((ability) => ability.key === activeAbility) ?? visibleAbilities[0],
    [activeAbility, visibleAbilities],
  );

  const visibleSources = useMemo(
    () => sources.filter((source) => source.scope === "anime" || mangaOpen),
    [mangaOpen],
  );

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const toggleMangaScope = () => {
    setMangaOpen((open) => {
      if (open) {
        setActiveAbility("body");
        setEndingOpen(false);
      }
      return !open;
    });
  };

  return (
    <main>
      <header className="site-header">
        <button className="wordmark" type="button" onClick={() => goTo("top")}>
          羂索
        </button>
        <nav className="desktop-nav" aria-label="주요 섹션">
          <button type="button" onClick={() => goTo("identity")}>정체</button>
          <button type="button" onClick={() => goTo("bodies")}>육체</button>
          <button type="button" onClick={() => goTo("abilities")}>술식</button>
          <button type="button" onClick={() => goTo("plan")}>계획</button>
          <button type="button" onClick={() => goTo("sources")}>출처</button>
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span className="sr-only">{menuOpen ? "메뉴 닫기" : "메뉴 열기"}</span>
        </button>
        <nav
          id="mobile-menu"
          className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="모바일 섹션"
          hidden={!menuOpen}
        >
          {["identity", "bodies", "abilities", "plan", "sources"].map((id, index) => (
            <button key={id} type="button" onClick={() => goTo(id)}>
              {(["정체", "육체", "술식", "계획", "출처"] as const)[index]}
            </button>
          ))}
        </nav>
      </header>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-rings" aria-hidden="true" />
        <div className="hero-copy">
          <p className="scope-label">
            {mangaOpen ? "원작 완결 포함 · 스포일러 범위" : "애니메이션 공개 범위 · 인물 기록"}
          </p>
          <h1 id="hero-title">
            <span>켄자쿠</span>
            <b>羂索</b>
            <small>Kenjaku</small>
          </h1>
          <p className="hero-lede">육체를 갈아타며 천 년의 주술사를 설계한 자.</p>
          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={() => goTo("identity")}>
              기록 열람
            </button>
            <button
              className="scope-toggle"
              type="button"
              aria-pressed={mangaOpen}
              aria-describedby="scope-status"
              onClick={toggleMangaScope}
            >
              {mangaOpen ? "원작 기록 봉인" : "원작 스포일러 열기"}
            </button>
          </div>
          <p id="scope-status" className="scope-status" aria-live="polite">
            {mangaOpen
              ? "완결까지의 육체, 술식, 최종 기록을 표시합니다."
              : "원작 전용 정보는 현재 숨겨져 있습니다."}
          </p>
        </div>

        <div className="hero-art" aria-label="켄자쿠 공식 애니메이션 전신 이미지">
          <div className="specimen-frame">
            <span className="frame-mark frame-mark-a" aria-hidden="true" />
            <span className="frame-mark frame-mark-b" aria-hidden="true" />
            <img
              src="/assets/kenjaku-official.png"
              alt="이마 봉합선과 검푸른 승복이 특징인 켄자쿠 공식 전신"
              width={750}
              height={1094}
              fetchPriority="high"
            />
          </div>
          <p className="image-credit">TV 애니메이션 『주술회전』 공식 캐릭터 이미지</p>
        </div>

        <div className="hero-thread" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <dl className="hero-facts">
          <div>
            <dt>분류</dt>
            <dd>고대 주저사</dd>
          </div>
          <div>
            <dt>활동 기간</dt>
            <dd>천 년 이상</dd>
          </div>
          <div>
            <dt>주 활동 육체</dt>
            <dd>게토 스구루</dd>
          </div>
          <div>
            <dt>일본 성우</dt>
            <dd>사쿠라이 타카히로</dd>
          </div>
        </dl>
      </section>

      <section id="identity" className="identity-section">
        <Reveal className="identity-heading">
          <p className="giant-kanji" aria-hidden="true">脳</p>
          <div>
            <h2>얼굴은 정체가 아니다.</h2>
            <p>
              켄자쿠는 타인의 시체에 자신의 뇌를 옮겨 육체, 기억, 술식을 이용해 온
              고대 주저사다. 현대에는 게토 스구루의 몸으로 시부야 사변과 사멸회유를
              움직였다.
            </p>
          </div>
        </Reveal>

        <Reveal className="verification-grid">
          <div className="profile-list">
            <dl>
              <div><dt>본래 이름</dt><dd>켄자쿠</dd></div>
              <div><dt>본래 외형·성별</dt><dd>미공개</dd></div>
              <div><dt>생일·신장</dt><dd>미공개</dd></div>
              <div><dt>공식 등급</dt><dd>미공개</dd></div>
              <div><dt>소속</dt><dd>독립 주저사</dd></div>
            </dl>
          </div>
          <div className="evidence-note">
            <p>확인 원칙</p>
            <strong>공식에 없는 숫자는 채우지 않았다.</strong>
            <span>
              켄자쿠를 “특급 주술사”로 적는 자료가 많지만 공식 등급은 공개되지 않았다.
              특급 주령 진영과의 관계도 목적을 위한 협력이지 소속이 아니다.
            </span>
          </div>
        </Reveal>
      </section>

      <section id="bodies" className="bodies-section" aria-labelledby="bodies-title">
        <Reveal>
          <h2 id="bodies-title">확인된 육체 계보</h2>
          <p className="section-intro">
            이름과 얼굴은 바뀌어도 이마를 가르는 봉합선과 관찰자의 욕망은 남는다.
          </p>
        </Reveal>

        <div className="body-lineage">
          <Reveal className="body-entry body-entry-unknown">
            <span className="lineage-knot" aria-hidden="true" />
            <time>본래</time>
            <h3>정체불명의 육체</h3>
            <p>외형, 성별, 출신 모두 미공개. 켄자쿠라는 이름만 확인됐다.</p>
          </Reveal>
          {mangaOpen && (
            <Reveal className="body-entry">
              <span className="lineage-knot" aria-hidden="true" />
              <time>약 400년 전</time>
              <h3>이름 불명의 과거 육체</h3>
              <p>노년의 카시모 하지메와 접촉해 훗날의 수육을 약속했다.</p>
            </Reveal>
          )}
          <Reveal className="body-entry">
            <span className="lineage-knot" aria-hidden="true" />
            <time>약 150년 전</time>
            <h3>카모 노리토시</h3>
            <p>메이지 시대의 주술사. 이 육체로 주태구상도를 만들었다.</p>
          </Reveal>
          {mangaOpen && (
            <Reveal className="body-entry spoiler-entry">
              <span className="lineage-knot" aria-hidden="true" />
              <time>2003년 전후</time>
              <h3>이타도리 카오리</h3>
              <p>이타도리 유지의 어머니. 이 육체의 반중력 기구를 이후에도 보존했다.</p>
            </Reveal>
          )}
          <Reveal className="body-entry body-entry-final">
            <span className="lineage-knot" aria-hidden="true" />
            <time>2017년 이후</time>
            <h3>게토 스구루</h3>
            <p>백귀야행 뒤 사망한 게토의 몸과 주령조술을 차지했다.</p>
          </Reveal>
        </div>
      </section>

      <section id="abilities" className="abilities-section" aria-labelledby="abilities-title">
        <Reveal className="abilities-copy">
          <h2 id="abilities-title">하나의 뇌, 겹쳐진 술식.</h2>
          <p>
            켄자쿠의 위험성은 단순한 화력이 아니다. 시대마다 더 좋은 육체와 술식을
            확보하고, 결계술로 전장을 설계한다.
          </p>
        </Reveal>

        <Reveal className="ability-console">
          <div className="ability-tabs" role="group" aria-label="켄자쿠 능력 선택">
            {visibleAbilities.map((ability) => (
              <button
                key={ability.key}
                type="button"
                aria-pressed={selectedAbility.key === ability.key}
                onClick={() => setActiveAbility(ability.key)}
              >
                <span>{ability.title}</span>
                <small>{ability.origin}</small>
              </button>
            ))}
          </div>
          <article
            className="ability-panel"
            aria-live="polite"
          >
            <p className="ability-origin">{selectedAbility.origin}</p>
            <h3>{selectedAbility.title}</h3>
            <strong>{selectedAbility.summary}</strong>
            <p>{selectedAbility.body}</p>
            <div className="uncertainty-note">
              <span>주의</span>
              {selectedAbility.note}
            </div>
          </article>
        </Reveal>

        {mangaOpen ? (
          <Reveal className="healing-distinction">
            <div>
              <h3>반전술식</h3>
              <p>양의 에너지로 신체 손상을 치료한다.</p>
            </div>
            <span aria-hidden="true">≠</span>
            <div>
              <h3>술식 반전</h3>
              <p>양의 에너지를 술식에 넣어 효과를 뒤집는다.</p>
            </div>
          </Reveal>
        ) : (
          <p className="scope-lock-note">추가 술식 기록은 원작 스포일러 범위에 잠겨 있습니다.</p>
        )}
      </section>

      <section className="image-break" aria-label="켄자쿠가 주령 구슬을 든 공식 장면">
        <img
          src="/assets/kenjaku-episode46.jpg"
          alt="푸른 주령 구슬을 들어 보이는 켄자쿠"
          width={841}
          height={467}
          loading="lazy"
        />
        <div className="image-break-copy">
          <p className="motive-quote">자신도 예측할 수 없는 것을 보고 싶다.</p>
          <p>그가 원하는 것은 완성된 답이 아니라, 자신의 계산을 벗어난 결과다.</p>
          <small>작중 목적을 요약한 문구</small>
        </div>
      </section>

      <section id="plan" className="plan-section" aria-labelledby="plan-title">
        <Reveal className="plan-intro">
          <h2 id="plan-title">실험의 이름, 사멸회유.</h2>
          <p>
            지배가 최종 목적은 아니다. 일본 전체를 거대한 실험장으로 만들고,
            텐겐과 비술사의 동화에서 자신도 계산하지 못한 무언가가 태어나길 바랐다.
          </p>
        </Reveal>

        <div className="plan-sequence">
          <Reveal className="plan-step">
            <span>계약</span>
            <h3>시대를 가로질러 재료를 모은다</h3>
            <p>과거 술사와 계약하고, 현대 인간에게 표식과 술식을 준비한다.</p>
          </Reveal>
          <Reveal className="plan-step">
            <span>봉인</span>
            <h3>고죠 사토루를 판에서 치운다</h3>
            <p>시부야에서 옥문강으로 봉인해 계획을 막을 최강의 변수부터 제거한다.</p>
          </Reveal>
          <Reveal className="plan-step">
            <span>각성</span>
            <h3>사멸회유를 시작한다</h3>
            <p>무위전변을 원격 발동해 수육체와 현대 술사를 깨우고 결계에 넣는다.</p>
          </Reveal>
          <Reveal className="plan-step">
            <span>동화</span>
            <h3>텐겐과 일본을 뒤섞는다</h3>
            <p>대규모 주력 반응을 거쳐 새로운 존재가 태어나는 혼돈을 관측한다.</p>
          </Reveal>
        </div>
      </section>

      <section className={`spoiler-vault ${endingOpen ? "is-open" : ""}`}>
        <div className="vault-copy">
          <h2>{mangaOpen ? "원작 완결 기록" : "원작 기록 잠김"}</h2>
          <p>
            {mangaOpen
              ? "243화 이후의 최종 행적과 상태를 포함합니다."
              : "최종 행적은 첫 화면에서 원작 범위를 연 뒤 확인할 수 있습니다."}
          </p>
        </div>
        <button
          type="button"
          className="spoiler-toggle"
          aria-expanded={mangaOpen ? endingOpen : undefined}
          aria-controls={mangaOpen && endingOpen ? "manga-ending" : undefined}
          onClick={() => (mangaOpen ? setEndingOpen((open) => !open) : goTo("top"))}
        >
          {mangaOpen ? (endingOpen ? "최종 기록 봉인" : "최종 스포일러 해제") : "범위 선택으로 이동"}
        </button>
        {mangaOpen && endingOpen && (
          <div id="manga-ending" className="ending-record">
            <p>
              타카바 후미히코와의 싸움으로 빈틈이 생긴 직후 옷코츠 유타의 기습으로
              참수됐다. 이후 뇌까지 파괴되어 사망했지만, 죽기 전에 텐겐과 인류의 동화
              발동권을 당시 후시구로 메구미의 몸을 쓰던 스쿠나에게 넘겼다.
            </p>
            <dl>
              <div><dt>직접 마무리</dt><dd>옷코츠 유타</dd></div>
              <div><dt>타카바의 역할</dt><dd>술식으로 결정적 빈틈 생성</dd></div>
              <div><dt>완결 시점 상태</dt><dd>사망</dd></div>
            </dl>
          </div>
        )}
      </section>

      <section id="sources" className="sources-section" aria-labelledby="sources-title">
        <Reveal>
          <h2 id="sources-title">근거를 따라가세요.</h2>
          <p>
            {mangaOpen
              ? "공식 애니메이션 페이지와 원작 회차를 우선했습니다. 태장편야의 정확한 필중 술식처럼 공개되지 않은 내용은 미확정으로 남겼습니다."
              : "공식 애니메이션 페이지를 우선했습니다. 공개되지 않은 값은 추정으로 채우지 않았습니다."}
          </p>
        </Reveal>
        <div className="source-list">
          {visibleSources.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
              <strong>{source.label}</strong>
              <span>{source.note}</span>
              <b>열기 <span className="sr-only">새 창</span></b>
            </a>
          ))}
        </div>
        <p className="source-date">자료 확인일 2026.08.13</p>
      </section>

      <footer>
        <p>비공식 팬메이드 테스트 프로필</p>
        <p>
          원작 © 아쿠타미 게게 / 슈에이샤<br />
          애니메이션 이미지 © 아쿠타미 게게 / 슈에이샤·주술회전 제작위원회
        </p>
      </footer>
    </main>
  );
}
