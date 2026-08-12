"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ProfileMode = "public" | "secret";

const publicDetails = [
  ["이름", "御影 雫 (미카게 시즈쿠)"],
  ["나이", "21세"],
  ["성별", "여성 (XX)"],
  ["번호", "추후 선점"],
  ["키 / 몸무게", "159cm / 49kg"],
];

const publicTraits = [
  {
    name: "상냥한 낯",
    text: "누구에게나 낮고 부드러운 목소리로 말한다. 상대의 말을 끊지 않고, 사소한 부탁도 웃으며 받아주는 편이다.",
  },
  {
    name: "세심한 관찰",
    text: "한 번 들은 취향과 습관을 잘 잊지 않는다. 자신보다 타인의 변화를 먼저 알아채며 필요한 것을 조용히 챙긴다.",
  },
  {
    name: "불안한 애착",
    text: "가까운 사람이 멀어지는 기색에 유난히 예민하다. 직접 화를 내기보다는 확인 질문을 반복하고 곁에 머물려 한다.",
  },
];

const preferences = {
  like: ["우유를 넣은 홍차", "리본 공예", "창문을 두드리는 빗소리", "사소한 약속", "머리카락을 땋아 주는 일"],
  hate: ["큰 목소리", "날붙이", "답장이 오지 않는 시간", "망가진 물건", "일방적으로 대화를 끝내는 사람"],
};

const secretPreferences = {
  like: ["반드시 필요한 사람이 되는 것", "규칙적으로 도착하는 답장", "둘만 아는 생활 습관", "한 쌍으로 맞춘 물건", "자신에게 의지하는 표정"],
  hate: ["일방적인 이별 통보", "잠긴 휴대전화", "예고 없이 바뀐 일정", "관계에 간섭하는 제삼자", "자신 없이도 잘 지내는 모습"],
  scare: "자신이 없어도 상대의 삶이 아무 문제 없이 계속되고, 끝내 다른 사람으로 대체되는 것",
};

function ProfileTabs({ mode, onChange }: { mode: ProfileMode; onChange: (mode: ProfileMode) => void }) {
  const publicRef = useRef<HTMLButtonElement>(null);
  const secretRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextMode = event.key === "Home" ? "public" : event.key === "End" ? "secret" : mode === "public" ? "secret" : "public";
    onChange(nextMode);
    requestAnimationFrame(() => (nextMode === "public" ? publicRef : secretRef).current?.focus());
  };

  return (
    <div className="profile-tabs" role="tablist" aria-label="프로필 구분" onKeyDown={handleKeyDown}>
      <button
        ref={publicRef}
        id="public-tab"
        type="button"
        role="tab"
        aria-selected={mode === "public"}
        aria-controls="profile-panel"
        tabIndex={mode === "public" ? 0 : -1}
        className={mode === "public" ? "is-active" : ""}
        onClick={() => onChange("public")}
      >
        공개 프로필
      </button>
      <button
        ref={secretRef}
        id="secret-tab"
        type="button"
        role="tab"
        aria-selected={mode === "secret"}
        aria-controls="profile-panel"
        tabIndex={mode === "secret" ? 0 : -1}
        className={mode === "secret" ? "is-active" : ""}
        onClick={() => onChange("secret")}
      >
        비밀 프로필
      </button>
    </div>
  );
}

function PublicProfile() {
  return (
    <div className="profile-content public-record">
      <section className="record-section identity-section" aria-labelledby="identity-heading">
        <div className="section-heading">
          <h2 id="identity-heading">신원 기록</h2>
          <p>본인이 진술한 내용을 기준으로 작성되었습니다.</p>
        </div>
        <dl className="identity-grid">
          {publicDetails.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="record-section appearance-section" aria-labelledby="appearance-heading">
        <div className="section-heading compact-heading">
          <h2 id="appearance-heading">외관</h2>
        </div>
        <p className="long-copy">
          허리 아래까지 내려오는 짙은 남보라색 머리카락을 좌우로 나누어 굵은 양갈래 땋은 머리로 묶었다. 정돈되지 않은 층진 앞머리가 한쪽 눈가를 조금 덮고, 정수리에는 짧은 머리카락 한 가닥이 위로 뻗어 있다. 드러난 눈은 채도가 낮은 연보라색이며 동공은 평범하다. 둥근 눈매와 옅은 미소로 첫인상은 순하고 붙임성 있어 보인다. 양쪽 앞머리에는 가느다란 은색 실핀을 두 개씩 꽂았다. 복장은 흰색이 주조인 무릎 아래 길이의 원피스형 구속복이다. 검은 구속줄이 상완과 손목, 가슴 아래, 허리, 허벅지를 고정한다. 목둘레와 소매 가장자리에는 옅은 보라색 프릴을 얇게 덧대고, 가슴에는 크지 않은 검은 리본을 매어 메이드복을 연상시키는 정도로만 꾸몄다. 신발은 장식 없는 검은색 슬립온이다. 왼팔 안쪽에는 길지 않은 흉터가 하나 남아 있다.
        </p>
      </section>

      <section className="record-section personality-section" aria-labelledby="personality-heading">
        <div className="section-heading compact-heading">
          <h2 id="personality-heading">성격</h2>
        </div>
        <div className="trait-grid">
          {publicTraits.map((trait) => (
            <article key={trait.name}>
              <h3>{trait.name}</h3>
              <p>{trait.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="record-section preference-section" aria-labelledby="preference-heading">
        <div className="section-heading compact-heading">
          <h2 id="preference-heading">L / H / S</h2>
        </div>
        <div className="preference-layout">
          <div>
            <span className="preference-letter">L</span>
            <ul>{preferences.like.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <span className="preference-letter">H</span>
            <ul>{preferences.hate.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <span className="preference-letter">S</span>
            <p className="empty-value">공란</p>
          </div>
        </div>
      </section>

      <section className="record-section feature-section" aria-labelledby="feature-heading">
        <div className="section-heading compact-heading">
          <h2 id="feature-heading">특징</h2>
        </div>
        <div className="feature-columns">
          <ul>
            <li><strong>생일</strong><span>6월 12일</span></li>
            <li><strong>혈액형</strong><span>AB형</span></li>
            <li><strong>출신</strong><span>일본 가나가와현</span></li>
          </ul>
          <p>
            사건 전에는 복식전문학교에 다니며 작은 의상실에서 수선 보조로 일했다. 손재주가 좋아 뜯어진 천이나 풀린 매듭을 빠르게 고친다. 다른 사람을 이름으로 부르기 전에는 반드시 허락을 구하지만, 한 번 허락받은 호칭은 관계가 달라져도 바꾸지 않는다. 교제하던 남성이 불러 그의 집을 찾아갔다가 공격당했고, 몸싸움 중 자신을 지키려다 상대가 사망했다고 주장한다. 왼팔의 흉터도 그때 생겼다고 설명한다.
          </p>
        </div>
      </section>

      <section className="record-section relation-section" aria-labelledby="relation-heading">
        <div className="section-heading compact-heading">
          <h2 id="relation-heading">선관</h2>
        </div>
        <p className="empty-value">없음</p>
      </section>
    </div>
  );
}

function SecretProfile() {
  return (
    <div className="profile-content secret-record">
      <section className="secret-lead" aria-labelledby="secret-heading">
        <div>
          <p className="confidential-mark">CONFIDENTIAL</p>
          <h2 id="secret-heading">약속은 한쪽이 포기한다고 없어지지 않아.</h2>
          <blockquote>“헤어지자는 말은 대화의 끝이 아니잖아. 아직 내가 동의하지 않았는데.”</blockquote>
        </div>
        <dl className="case-metadata">
          <div><dt>피해자</dt><dd>長瀬 悠人 (나가세 유토), 22세</dd></div>
          <div><dt>혐의</dt><dd>계획 살인 및 현장 조작</dd></div>
          <div><dt>수용자 번호</dt><dd>추후 선점</dd></div>
        </dl>
      </section>

      <section className="record-section identity-section" aria-labelledby="secret-identity-heading">
        <div className="section-heading">
          <h2 id="secret-identity-heading">진짜 신원</h2>
          <p>수사 기록과 본인 확인 결과를 기준으로 작성되었습니다.</p>
        </div>
        <dl className="identity-grid">
          {publicDetails.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="record-section appearance-section" aria-labelledby="secret-appearance-heading">
        <div className="section-heading compact-heading">
          <h2 id="secret-appearance-heading">외관 기록</h2>
        </div>
        <p className="long-copy">
          공개 기록과 동일한 짙은 남보라색 양갈래 땋은 머리, 연보라색 눈, 은색 실핀을 지녔다. 흰색 원피스형 구속복 위로 검은 구속줄이 상완과 손목, 가슴 아래, 허리, 허벅지를 고정한다. 목둘레와 소매 끝의 옅은 보라색 프릴, 가슴의 작은 검은 리본 외에는 별도 장식이 없다. 왼팔 안쪽의 흉터는 피해자에게 입은 상처가 아니다. 범행을 정당방위처럼 보이게 만들기 위해 스스로 낸 상처다.
        </p>
      </section>

      <section className="record-section personality-section" aria-labelledby="secret-personality-heading">
        <div className="section-heading compact-heading">
          <h2 id="secret-personality-heading">성격 분석</h2>
        </div>
        <div className="analysis-copy">
          <div className="analysis-keywords" aria-label="성격 키워드">
            <span>소유적 애착</span><span>인지적 공감</span><span>침착한 기만</span><span>죄책감 결여</span>
          </div>
          <p>
            상대의 표정과 말투를 읽고 그 사람이 원하는 반응을 돌려주는 능력은 뛰어나지만 타인의 고통을 함께 느끼지는 못한다. 누군가 우는 이유는 이해해도 그 슬픔에는 거의 동요하지 않으며, 필요하다면 위로와 눈물까지 자연스럽게 연기한다. 규칙과 행동의 결과를 정확히 이해하면서도 자신의 목적에 불리할 때만 이를 무시한다.
          </p>
          <p>
            시즈쿠에게 사랑은 서로의 자유를 인정하는 관계가 아니라 상대의 생활 전부에 자신이 포함된 상태다. 한 번 자신을 사랑한다고 말한 사람에게는 혼자 관계를 끝낼 권리가 없다고 여긴다. 다정함과 헌신은 진심이지만 대상의 의사보다 자신이 정한 관계의 형태를 우선한다. 살인을 후회하지 않는다. 실패했다고 여기는 부분은 피해자를 죽인 사실이 아니라 범행을 완전히 사고로 꾸미지 못한 점뿐이다.
          </p>
        </div>
      </section>

      <section className="record-section preference-section" aria-labelledby="secret-preference-heading">
        <div className="section-heading compact-heading">
          <h2 id="secret-preference-heading">L / H / S</h2>
        </div>
        <div className="preference-layout secret-preferences">
          <div><span className="preference-letter">L</span><ul>{secretPreferences.like.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><span className="preference-letter">H</span><ul>{secretPreferences.hate.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><span className="preference-letter">S</span><p>{secretPreferences.scare}</p></div>
        </div>
      </section>

      <section className="record-section feature-section" aria-labelledby="secret-feature-heading">
        <div className="section-heading compact-heading">
          <h2 id="secret-feature-heading">특징</h2>
        </div>
        <div className="evidence-grid">
          <article><h3>기본 정보</h3><p>6월 12일생, AB형. 일본 가나가와현 출신. 사건 전에는 복식전문학교 재학생이자 의상실 수선 보조였다.</p></article>
          <article><h3>행동 양식</h3><p>가까운 사람의 일정과 취향을 기억하는 것을 애정 표현인 동시에 통제 수단으로 사용한다. 상대가 말하지 않은 행선지까지 알고 있을 때 안정감을 느낀다.</p></article>
          <article><h3>위장 진술</h3><p>정당방위 진술은 즉흥적인 변명이 아니다. 신고 전부터 증거와 자신의 상처를 이용해 구성한 각본이며, 같은 순서와 표현으로 반복하도록 외워 두었다.</p></article>
          <article><h3>심리 참고</h3><p>정서적 공감과 죄책감이 현저히 낮다. 현실 판단의 손상은 없으며 범행 당시 자신의 행동이 살인이라는 사실을 명확히 인식했다.</p></article>
        </div>
      </section>

      <section className="case-summary" aria-labelledby="summary-heading">
        <div className="summary-index">사건 요약</div>
        <div>
          <h2 id="summary-heading">떠나는 대신, 누구에게도 갈 수 없게.</h2>
          <p>
            타인의 감정을 읽고 필요한 반응을 연기하는 법을 익힌 시즈쿠는 열아홉 살에 나가세 유토와 교제했다. 유토를 사랑했지만 그 사랑을 소유권처럼 받아들여 휴대전화와 일정을 감시하고 인간관계와 취업까지 조작했다. 이를 알게 된 유토가 이별과 이사를 결정하자 복제한 열쇠로 그의 집에 들어가 기다렸다. 관계 회복을 거절당한 뒤 계획적으로 살해했으며, 현장과 자신의 상처를 조작해 정당방위로 위장했다. 시즈쿠는 살인을 후회하지 않는다. 유토가 먼저 약속을 저버렸기에 자신이 관계의 결말을 정할 권리가 있었다고 믿는다.
          </p>
        </div>
      </section>

      <section className="record-section history-section" aria-labelledby="history-heading">
        <div className="section-heading compact-heading">
          <h2 id="history-heading">과거사 전문</h2>
        </div>
        <details className="history-disclosure">
          <summary>과거사 전문 펼치기</summary>
          <div className="history-copy">
            <p>
            시즈쿠는 감정 표현이 적고 집을 자주 비우는 부모 밑에서 자랐다. 학대를 받거나 생계를 위협받은 적은 없었지만 관심은 성적이나 집안일처럼 눈에 보이는 성과를 냈을 때만 돌아왔다. 어린 시절부터 타인의 기분을 살피고 원하는 반응을 제공하면 관계를 붙잡아 둘 수 있다는 사실을 익혔다. 울거나 사과해야 할 순간을 빠르게 알아차렸지만 그 감정이 실제로 생기지 않는다는 사실을 문제로 여기지는 않았다. 사람에게 사랑받는 법은 배웠으나 사람을 독립된 인격으로 존중하는 법은 배우지 못했다.
            </p>
            <p>
            열아홉 살 때 복식전문학교의 공동 수업에서 나가세 유토를 만났다. 유토는 낯선 환경에 적응하지 못하는 듯 보였던 시즈쿠를 자주 챙겼다. 비 오는 날 우산을 함께 쓰며 “곤란한 일이 있으면 언제든 연락해. 계속 곁에 있어 줄게.”라고 말했다. 그에게는 가벼운 호의였지만 시즈쿠는 이를 관계에 대한 약속으로 받아들였다. 두 사람은 몇 달 뒤 교제를 시작했다.
            </p>
            <p>
            처음의 시즈쿠는 헌신적인 연인이었다. 유토가 좋아하는 음식을 익히고 과제와 아르바이트 일정을 대신 정리했으며 아플 때는 밤새 곁을 지켰다. 그러나 곧 그의 답장 간격과 만나는 사람, 귀가 시간까지 기록하기 시작했다. 잠든 유토의 휴대전화를 확인하고 예비 열쇠를 몰래 복제했다. 자신과 거리를 두라고 조언한 친구에게는 유토의 계정으로 모욕적인 메시지를 보내 둘 사이를 갈라놓았다. 유토가 다른 지역의 일자리를 알아보자 지원 일정을 삭제하고 담당자에게 포기 연락까지 대신 보냈다. 시즈쿠에게 이런 행동은 방해가 아니라 두 사람의 관계를 위협하는 실수를 자신이 바로잡는 일이었다.
            </p>
            <p>
            유토는 복제된 열쇠와 조작된 메시지를 발견한 뒤 이별을 통보했다. 연락하지 말라는 요구에도 시즈쿠가 그의 집 앞에 나타나자 경찰에 신고하겠다고 경고했고, 얼마 뒤 이사를 준비했다. 시즈쿠는 울거나 매달리지 않고 잘못을 인정하는 척했다. 유토가 안심한 동안 그의 일정을 계속 확인했고 이사 전날 복제한 열쇠로 집에 들어가 먼저 기다렸다.
            </p>
            <p>
            귀가한 유토가 나가라고 요구하자 시즈쿠는 준비해 온 말로 관계를 되돌리려 했다. 그러나 유토는 자신이 했던 약속은 이미 끝났으며 다시는 시즈쿠를 사랑하지 않을 것이라고 말했다. 시즈쿠는 격분해 우발적으로 공격한 것이 아니다. 그가 살아서 떠나는 것보다 죽어서 누구의 것도 되지 않는 편이 낫다고 판단했고, 집 안의 칼로 그를 찔러 살해했다. 숨이 끊어진 것을 확인한 뒤 현장을 몸싸움처럼 흐트러뜨리고 유토의 손 가까이에 다른 칼을 두었다. 이어 자신의 왼팔에 얕은 상처를 낸 후 신고해 유토가 먼저 공격했으며 자신을 지키려 했다고 진술했다.
            </p>
            <p>
            유토의 휴대전화에는 시즈쿠를 불러낸 기록이 없었고 건물 영상에는 그가 귀가하기 전에 시즈쿠가 먼저 들어가는 모습이 남아 있었다. 왼팔의 상처 방향과 현장의 흔적도 진술과 맞지 않았다. 체포된 뒤에도 시즈쿠는 같은 이야기를 반복했다. 유토를 죽인 기억이 없는 것이 아니라, 자신이 정한 관계를 지키기 위해 한 행동을 타인에게 설명할 필요가 없다고 여겼기 때문이다. 그녀는 지금도 유토가 자신을 버린 순간 먼저 약속을 파괴했고 자신은 그 결말을 확정했을 뿐이라고 생각한다.
            </p>
          </div>
        </details>
      </section>

      <section className="belief-section" aria-labelledby="belief-heading">
        <p>심문 참고 사상</p>
        <h2 id="belief-heading">한번 내어 준 마음을 되찾아 갈 권리가 있는가.</h2>
        <div>
          <p>
            사랑한다는 말은 감정의 표현이 아니라 상대에게 건네는 약속이며, 한번 성립한 약속은 어느 한쪽의 변심만으로 취소될 수 없다고 믿는다. 상대가 떠나려는 선택을 존중하는 것은 사랑이 아니라 포기라고 여긴다. 유토를 죽인 일을 사랑 때문에 판단력을 잃은 결과라고 주장하지 않는다. 그가 자신을 떠날 미래와 누구에게도 갈 수 없는 죽음 가운데 후자를 의식적으로 선택했다.
          </p>
          <p>
            용서받는다면 자신의 사랑과 소유 방식이 인정받았다고 받아들일 가능성이 높다. 용서받지 못하더라도 피해자의 고통보다 자신의 진심을 이해받지 못했다는 사실에 분노한다. 죄의 존재는 인정하지만 그것이 잘못이라는 판단에는 동의하지 않는다.
          </p>
        </div>
      </section>

      <section className="record-section relation-section" aria-labelledby="secret-relation-heading">
        <div className="section-heading compact-heading">
          <h2 id="secret-relation-heading">선관</h2>
        </div>
        <p className="empty-value">없음</p>
      </section>

      <section className="owner-section" aria-labelledby="owner-heading">
        <h2 id="owner-heading">오너란</h2>
        <dl><div><dt>오너닉</dt><dd>추후 기재</dd></div><div><dt>나이</dt><dd>성인</dd></div></dl>
      </section>
    </div>
  );
}

export default function Home() {
  const [mode, setMode] = useState<ProfileMode>("public");

  return (
    <main className="site-shell" data-mode={mode}>
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="힐그램 프로필 맨 위로 이동">HILGRAM</a>
        <p>수용자 개인 기록</p>
      </header>

      <section className="hero" id="top" aria-labelledby="character-name">
        <div className="hero-copy">
          <p className="record-label">심문 대상자 기록</p>
          <p className="catchphrase">돌아올 자리는 늘 비워둘게.</p>
          <h1 id="character-name">
            <span>御影 雫</span>
            미카게 시즈쿠
          </h1>
          <blockquote>“계속 곁에 있겠다고 했잖아. 난 그 말을 믿었을 뿐이야.”</blockquote>
          <ProfileTabs mode={mode} onChange={setMode} />
        </div>

        <figure className="portrait-frame">
          <span className="evidence-id" aria-hidden="true">EVIDENCE 01</span>
          <div className="portrait-matte">
            <Image
              src="/mikage-shizuku.webp"
              alt="짙은 남보라색 양갈래 땋은 머리와 보라색 눈을 가진 미카게 시즈쿠"
              width={1280}
              height={1280}
              priority
              unoptimized
              sizes="(max-width: 767px) 92vw, 46vw"
            />
          </div>
          <figcaption><span>INTAKE PORTRAIT</span><b>외관 참고용 / 공식 구속복 아님 / 출처 기재 필요</b></figcaption>
        </figure>
      </section>

      <section
        id="profile-panel"
        className="profile-panel"
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={mode === "public" ? "public-tab" : "secret-tab"}
        key={mode}
      >
        {mode === "public" ? <PublicProfile /> : <SecretProfile />}
      </section>

      <footer className="site-footer">
        <div>
          <p>세 번의 심문. 한 번의 고백.</p>
          <small>스토킹 및 살인 소재가 포함된 창작 캐릭터 프로필입니다.</small>
        </div>
        <a href="#top">기록 처음으로</a>
      </footer>
    </main>
  );
}
