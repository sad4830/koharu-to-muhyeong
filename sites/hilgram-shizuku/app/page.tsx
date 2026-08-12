"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ProfileMode = "public" | "secret";

const identity = [
  ["이름", "御影 雫 (미카게 시즈쿠)"],
  ["나이", "21세"],
  ["성별", "여성 (XX)"],
  ["번호", "추후 선점"],
  ["키 / 몸무게", "159cm / 49kg"],
];

const publicTraits = [
  ["01", "상냥한 낯", "누구에게나 낮고 부드러운 목소리로 말한다. 상대의 말을 끊지 않고, 사소한 부탁도 웃으며 받아주는 편이다."],
  ["02", "세심한 관찰", "한 번 들은 취향과 습관을 잘 잊지 않는다. 자신보다 타인의 변화를 먼저 알아채며 필요한 것을 조용히 챙긴다."],
  ["03", "불안한 애착", "가까운 사람이 멀어지는 기색에 유난히 예민하다. 직접 화를 내기보다는 확인 질문을 반복하고 곁에 머물려 한다."],
];

const publicPreferences = {
  like: ["우유를 넣은 홍차", "리본 공예", "창문을 두드리는 빗소리", "사소한 약속", "머리카락을 땋아 주는 일"],
  hate: ["큰 목소리", "날붙이", "답장이 오지 않는 시간", "망가진 물건", "일방적으로 대화를 끝내는 사람"],
};

const secretPreferences = {
  like: ["반드시 필요한 사람이 되는 것", "규칙적으로 도착하는 답장", "둘만 아는 생활 습관", "한 쌍으로 맞춘 물건", "자신에게 의지하는 표정"],
  hate: ["일방적인 이별 통보", "잠긴 휴대전화", "예고 없이 바뀐 일정", "관계에 간섭하는 제삼자", "자신 없이도 잘 지내는 모습"],
  scare: "자신이 없어도 상대의 삶이 아무 문제 없이 계속되고, 끝내 다른 사람으로 대체되는 것",
};

const incidentTimeline = [
  ["01", "첫 만남", "열아홉 살, 공동 수업에서 유토를 만났다. 비 오는 날 들은 ‘계속 곁에 있어 줄게’라는 말을 취소할 수 없는 약속으로 받아들였다."],
  ["02", "감시", "답장 간격과 귀가 시간을 기록하고 잠든 유토의 휴대전화를 확인했다. 예비 열쇠도 몰래 복제했다."],
  ["03", "관계 조작", "유토의 계정으로 친구에게 모욕적인 메시지를 보냈다. 타지역 취업 지원을 삭제하고 담당자에게 포기 연락까지 대신 보냈다."],
  ["04", "이별 통보", "조작을 발견한 유토는 이별과 접근 금지를 요구하고 이사를 준비했다. 시즈쿠는 잘못을 인정한 척하며 일정을 계속 확인했다."],
  ["05", "선입실", "이사 전날 복제한 열쇠로 유토의 집에 먼저 들어가 기다렸다. 유토가 자신을 불렀다는 공개 진술은 거짓이다."],
  ["06", "살해", "관계 회복을 거절당한 뒤 우발적으로 격분한 것이 아니라, 누구에게도 갈 수 없게 하겠다고 판단해 집 안의 칼로 살해했다."],
  ["07", "현장 조작", "현장을 몸싸움처럼 흐트러뜨리고 다른 칼을 피해자의 손 가까이에 뒀다. 왼팔을 스스로 벤 뒤 정당방위를 신고했다."],
];

function ModeSwitch({ mode, onChange }: { mode: ProfileMode; onChange: (mode: ProfileMode) => void }) {
  const publicRef = useRef<HTMLButtonElement>(null);
  const secretRef = useRef<HTMLButtonElement>(null);

  const select = (next: ProfileMode, focus = false) => {
    onChange(next);
    if (focus) requestAnimationFrame(() => (next === "public" ? publicRef : secretRef).current?.focus());
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "public" : event.key === "End" ? "secret" : mode === "public" ? "secret" : "public";
    select(next, true);
  };

  return (
    <div className="mode-switch" role="tablist" aria-label="프로필 공개 범위" onKeyDown={onKeyDown}>
      <button
        ref={publicRef}
        id="public-tab"
        role="tab"
        type="button"
        aria-selected={mode === "public"}
        aria-controls="profile-panel"
        tabIndex={mode === "public" ? 0 : -1}
        className={mode === "public" ? "selected" : ""}
        onClick={() => select("public")}
      >
        <span>공개 프로필</span><small>PUBLIC STATEMENT</small>
      </button>
      <button
        ref={secretRef}
        id="secret-tab"
        role="tab"
        type="button"
        aria-selected={mode === "secret"}
        aria-controls="profile-panel"
        tabIndex={mode === "secret" ? 0 : -1}
        className={mode === "secret" ? "selected" : ""}
        onClick={() => select("secret")}
      >
        <span>비밀 프로필</span><small>SEALED RECORD</small>
      </button>
    </div>
  );
}

function SectionTitle({ index, eyebrow, children }: { index: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <header className="section-title">
      <span>{index}</span>
      <div><p>{eyebrow}</p><h2>{children}</h2></div>
    </header>
  );
}

function IdentityMeasure({ secret = false }: { secret?: boolean }) {
  return (
    <dl className="measure-list" aria-label={secret ? "진짜 신원" : "신원 기록"}>
      {identity.map(([label, value], index) => (
        <div key={label} style={{ "--measure": `${36 + index * 13}%` } as React.CSSProperties}>
          <dt>{label}</dt><dd>{value}</dd><i aria-hidden="true" />
        </div>
      ))}
    </dl>
  );
}

function PreferenceStrip({ mark, title, items, text }: { mark: string; title: string; items?: string[]; text?: string }) {
  return (
    <section className={`preference-strip preference-${mark.toLowerCase()}`}>
      <div className="preference-mark"><b>{mark}</b><span>{title}</span></div>
      {items ? <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul> : <p>{text}</p>}
    </section>
  );
}

function PublicProfile() {
  return (
    <div className="profile public-profile">
      <section className="sheet-section identity-sheet" aria-labelledby="public-identity">
        <SectionTitle index="01" eyebrow="PATTERN MEASUREMENTS"><span id="public-identity">신원 기록</span></SectionTitle>
        <IdentityMeasure />
      </section>

      <section className="sheet-section split-copy" aria-labelledby="public-appearance">
        <SectionTitle index="02" eyebrow="APPEARANCE"><span id="public-appearance">외관</span></SectionTitle>
        <div className="copy-block lead-letter">
          <p>허리 아래까지 내려오는 짙은 남보라색 머리카락을 좌우로 나누어 굵은 양갈래 땋은 머리로 묶었다. 정돈되지 않은 층진 앞머리가 한쪽 눈가를 조금 덮고, 정수리에는 짧은 머리카락 한 가닥이 위로 뻗어 있다. 드러난 눈은 채도가 낮은 연보라색이며 동공은 평범하다. 둥근 눈매와 옅은 미소로 첫인상은 순하고 붙임성 있어 보인다. 양쪽 앞머리에는 가느다란 은색 실핀을 두 개씩 꽂았다.</p>
          <p>복장은 흰색이 주조인 무릎 아래 길이의 원피스형 구속복이다. 검은 구속줄이 상완과 손목, 가슴 아래, 허리, 허벅지를 고정한다. 목둘레와 소매 가장자리에는 옅은 보라색 프릴을 얇게 덧대고, 가슴에는 크지 않은 검은 리본을 매어 메이드복을 연상시키는 정도로만 꾸몄다. 신발은 장식 없는 검은색 슬립온이다. 왼팔 안쪽에는 길지 않은 흉터가 하나 남아 있다.</p>
        </div>
      </section>

      <section className="sheet-section" aria-labelledby="public-personality">
        <SectionTitle index="03" eyebrow="VISIBLE TEMPERAMENT"><span id="public-personality">성격</span></SectionTitle>
        <div className="trait-seams">
          {publicTraits.map(([index, title, text]) => <article key={index}><span>{index}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="sheet-section" aria-labelledby="public-preference">
        <SectionTitle index="04" eyebrow="FABRIC SWATCHES"><span id="public-preference">L / H / S</span></SectionTitle>
        <div className="preference-stack">
          <PreferenceStrip mark="L" title="LIKE" items={publicPreferences.like} />
          <PreferenceStrip mark="H" title="HATE" items={publicPreferences.hate} />
          <PreferenceStrip mark="S" title="SCARE" text="공란" />
        </div>
      </section>

      <section className="sheet-section feature-sheet" aria-labelledby="public-feature">
        <SectionTitle index="05" eyebrow="CARE LABEL"><span id="public-feature">특징</span></SectionTitle>
        <div className="care-label">
          <dl><div><dt>생일</dt><dd>6월 12일</dd></div><div><dt>혈액형</dt><dd>AB형</dd></div><div><dt>출신</dt><dd>일본 가나가와현</dd></div></dl>
          <p>사건 전에는 복식전문학교에 다니며 작은 의상실에서 수선 보조로 일했다. 손재주가 좋아 뜯어진 천이나 풀린 매듭을 빠르게 고친다. 다른 사람을 이름으로 부르기 전에는 반드시 허락을 구하지만, 한 번 허락받은 호칭은 관계가 달라져도 바꾸지 않는다.</p>
          <p className="statement"><strong>본인 진술</strong> 교제하던 남성이 불러 그의 집을 찾아갔다가 공격당했고, 몸싸움 중 자신을 지키려다 상대가 사망했다고 주장한다. 왼팔의 흉터도 그때 생겼다고 설명한다.</p>
        </div>
      </section>

      <section className="sheet-section relation-sheet" aria-labelledby="public-relation">
        <SectionTitle index="06" eyebrow="RELATION"><span id="public-relation">선관</span></SectionTitle>
        <p className="none-value">없음</p>
      </section>
    </div>
  );
}

function SecretProfile() {
  return (
    <div className="profile secret-profile">
      <section className="ripped-lead" aria-labelledby="secret-catch">
        <p>UNSEALED / CONFIDENTIAL</p>
        <h2 id="secret-catch">약속은 한쪽이 포기한다고<br />없어지지 않아.</h2>
        <blockquote>“헤어지자는 말은 대화의 끝이 아니잖아. 아직 내가 동의하지 않았는데.”</blockquote>
        <dl><div><dt>피해자</dt><dd>長瀬 悠人 (나가세 유토), 22세</dd></div><div><dt>혐의</dt><dd>계획 살인 및 현장 조작</dd></div><div><dt>수용자 번호</dt><dd>추후 선점</dd></div></dl>
      </section>

      <section className="sheet-section identity-sheet" aria-labelledby="secret-identity">
        <SectionTitle index="01" eyebrow="TRUE MEASUREMENTS"><span id="secret-identity">진짜 신원</span></SectionTitle>
        <IdentityMeasure secret />
      </section>

      <section className="sheet-section split-copy" aria-labelledby="secret-appearance">
        <SectionTitle index="02" eyebrow="ALTERED SEAM"><span id="secret-appearance">외관</span></SectionTitle>
        <div className="copy-block">
          <p>공개 기록과 동일한 짙은 남보라색 양갈래 땋은 머리, 연보라색 눈, 은색 실핀을 지녔다. 흰색 원피스형 구속복 위로 검은 구속줄이 상완과 손목, 가슴 아래, 허리, 허벅지를 고정한다. 목둘레와 소매 끝의 옅은 보라색 프릴, 가슴의 작은 검은 리본 외에는 별도 장식이 없다.</p>
          <p className="red-note">왼팔 안쪽의 흉터는 피해자에게 입은 상처가 아니다. 범행을 정당방위처럼 보이게 만들기 위해 스스로 낸 상처다. 공개 프로필의 ‘날붙이를 싫어한다’는 항목 역시 피해자처럼 보이기 위한 연기다.</p>
        </div>
      </section>

      <section className="sheet-section" aria-labelledby="secret-personality">
        <SectionTitle index="03" eyebrow="PSYCHOLOGICAL LINING"><span id="secret-personality">성격 분석</span></SectionTitle>
        <div className="analysis-layout">
          <ul aria-label="성격 키워드"><li>소유적 애착</li><li>인지적 공감</li><li>침착한 기만</li><li>죄책감 결여</li></ul>
          <div><p>상대의 표정과 말투를 읽고 그 사람이 원하는 반응을 돌려주는 능력은 뛰어나지만 타인의 고통을 함께 느끼지는 못한다. 누군가 우는 이유는 이해해도 그 슬픔에는 거의 동요하지 않으며, 필요하다면 위로와 눈물까지 자연스럽게 연기한다. 규칙과 행동의 결과를 정확히 이해하면서도 자신의 목적에 불리할 때만 이를 무시한다.</p><p>시즈쿠에게 사랑은 서로의 자유를 인정하는 관계가 아니라 상대의 생활 전부에 자신이 포함된 상태다. 한 번 자신을 사랑한다고 말한 사람에게는 혼자 관계를 끝낼 권리가 없다고 여긴다. 살인을 후회하지 않는다. 실패했다고 여기는 부분은 피해자를 죽인 사실이 아니라 범행을 완전히 사고로 꾸미지 못한 점뿐이다.</p></div>
        </div>
      </section>

      <section className="sheet-section" aria-labelledby="secret-preference">
        <SectionTitle index="04" eyebrow="INNER FABRIC"><span id="secret-preference">L / H / S</span></SectionTitle>
        <div className="preference-stack">
          <PreferenceStrip mark="L" title="LIKE" items={secretPreferences.like} />
          <PreferenceStrip mark="H" title="HATE" items={secretPreferences.hate} />
          <PreferenceStrip mark="S" title="SCARE" text={secretPreferences.scare} />
        </div>
      </section>

      <section className="sheet-section feature-sheet" aria-labelledby="secret-feature">
        <SectionTitle index="05" eyebrow="BEHAVIOR LABEL"><span id="secret-feature">특징</span></SectionTitle>
        <div className="care-label secret-care">
          <dl><div><dt>생일</dt><dd>6월 12일</dd></div><div><dt>혈액형</dt><dd>AB형</dd></div><div><dt>출신</dt><dd>일본 가나가와현</dd></div></dl>
          <p>사건 전에는 복식전문학교 재학생이자 의상실 수선 보조였다. 가까운 사람의 일정과 취향을 기억하는 것을 애정 표현인 동시에 통제 수단으로 사용하며, 상대가 말하지 않은 행선지까지 알고 있을 때 안정감을 느낀다.</p>
          <p className="statement"><strong>위장 진술</strong> 신고 전부터 증거와 자신의 상처를 이용해 구성한 각본이다. 같은 순서와 표현으로 반복하도록 외워 두었다.</p>
        </div>
      </section>

      <section className="incident-section" aria-labelledby="incident-heading">
        <header><p>07 KNOTS / CASE SEQUENCE</p><h2 id="incident-heading">관계를 끝내지 못하게<br />매듭지은 일곱 번의 선택.</h2></header>
        <ol>{incidentTimeline.map(([index, title, text]) => <li key={index}><span>{index}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
      </section>

      <section className="case-summary" aria-labelledby="summary-heading">
        <p>사건 요약 / SUMMARY</p>
        <h2 id="summary-heading">떠나는 대신,<br />누구에게도 갈 수 없게.</h2>
        <div><p>타인의 감정을 읽고 필요한 반응을 연기하는 법을 익힌 시즈쿠는 열아홉 살에 나가세 유토와 교제했다. 유토를 사랑했지만 그 사랑을 소유권처럼 받아들여 휴대전화와 일정을 감시하고 인간관계와 취업까지 조작했다.</p><p>이를 알게 된 유토가 이별과 이사를 결정하자 복제한 열쇠로 그의 집에 들어가 기다렸다. 관계 회복을 거절당한 뒤 계획적으로 살해했으며, 현장과 자신의 상처를 조작해 정당방위로 위장했다. 시즈쿠는 살인을 후회하지 않는다. 유토가 먼저 약속을 저버렸기에 자신이 관계의 결말을 정할 권리가 있었다고 믿는다.</p></div>
      </section>

      <section className="sheet-section history-sheet" aria-labelledby="history-heading">
        <SectionTitle index="06" eyebrow="FULL HISTORY"><span id="history-heading">과거사</span></SectionTitle>
        <details className="unpick-history">
          <summary><span>봉합된 과거사 전문 펼치기</span><b aria-hidden="true">UNPICK</b></summary>
          <div>
            <p>시즈쿠는 감정 표현이 적고 집을 자주 비우는 부모 밑에서 자랐다. 학대를 받거나 생계를 위협받은 적은 없었지만 관심은 성적이나 집안일처럼 눈에 보이는 성과를 냈을 때만 돌아왔다. 어린 시절부터 타인의 기분을 살피고 원하는 반응을 제공하면 관계를 붙잡아 둘 수 있다는 사실을 익혔다. 울거나 사과해야 할 순간을 빠르게 알아차렸지만 그 감정이 실제로 생기지 않는다는 사실을 문제로 여기지는 않았다. 사람에게 사랑받는 법은 배웠으나 사람을 독립된 인격으로 존중하는 법은 배우지 못했다.</p>
            <p>열아홉 살 때 복식전문학교의 공동 수업에서 나가세 유토를 만났다. 유토는 낯선 환경에 적응하지 못하는 듯 보였던 시즈쿠를 자주 챙겼다. 비 오는 날 우산을 함께 쓰며 “곤란한 일이 있으면 언제든 연락해. 계속 곁에 있어 줄게.”라고 말했다. 그에게는 가벼운 호의였지만 시즈쿠는 이를 관계에 대한 약속으로 받아들였다. 두 사람은 몇 달 뒤 교제를 시작했다.</p>
            <p>처음의 시즈쿠는 헌신적인 연인이었다. 유토가 좋아하는 음식을 익히고 과제와 아르바이트 일정을 대신 정리했으며 아플 때는 밤새 곁을 지켰다. 그러나 곧 그의 답장 간격과 만나는 사람, 귀가 시간까지 기록하기 시작했다. 잠든 유토의 휴대전화를 확인하고 예비 열쇠를 몰래 복제했다. 자신과 거리를 두라고 조언한 친구에게는 유토의 계정으로 모욕적인 메시지를 보내 둘 사이를 갈라놓았다. 유토가 다른 지역의 일자리를 알아보자 지원 일정을 삭제하고 담당자에게 포기 연락까지 대신 보냈다. 시즈쿠에게 이런 행동은 방해가 아니라 두 사람의 관계를 위협하는 실수를 자신이 바로잡는 일이었다.</p>
            <p>유토는 복제된 열쇠와 조작된 메시지를 발견한 뒤 이별을 통보했다. 연락하지 말라는 요구에도 시즈쿠가 그의 집 앞에 나타나자 경찰에 신고하겠다고 경고했고, 얼마 뒤 이사를 준비했다. 시즈쿠는 울거나 매달리지 않고 잘못을 인정하는 척했다. 유토가 안심한 동안 그의 일정을 계속 확인했고 이사 전날 복제한 열쇠로 집에 들어가 먼저 기다렸다.</p>
            <p>귀가한 유토가 나가라고 요구하자 시즈쿠는 준비해 온 말로 관계를 되돌리려 했다. 그러나 유토는 자신이 했던 약속은 이미 끝났으며 다시는 시즈쿠를 사랑하지 않을 것이라고 말했다. 시즈쿠는 격분해 우발적으로 공격한 것이 아니다. 그가 살아서 떠나는 것보다 죽어서 누구의 것도 되지 않는 편이 낫다고 판단했고, 집 안의 칼로 그를 찔러 살해했다. 숨이 끊어진 것을 확인한 뒤 현장을 몸싸움처럼 흐트러뜨리고 유토의 손 가까이에 다른 칼을 두었다. 이어 자신의 왼팔에 얕은 상처를 낸 후 신고해 유토가 먼저 공격했으며 자신을 지키려 했다고 진술했다.</p>
            <p>유토의 휴대전화에는 시즈쿠를 불러낸 기록이 없었고 건물 영상에는 그가 귀가하기 전에 시즈쿠가 먼저 들어가는 모습이 남아 있었다. 왼팔의 상처 방향과 현장의 흔적도 진술과 맞지 않았다. 체포된 뒤에도 시즈쿠는 같은 이야기를 반복했다. 유토를 죽인 기억이 없는 것이 아니라, 자신이 정한 관계를 지키기 위해 한 행동을 타인에게 설명할 필요가 없다고 여겼기 때문이다. 그녀는 지금도 유토가 자신을 버린 순간 먼저 약속을 파괴했고 자신은 그 결말을 확정했을 뿐이라고 생각한다.</p>
          </div>
        </details>
      </section>

      <section className="belief-section" aria-labelledby="belief-heading">
        <p>INTERROGATION NOTE / 캐릭터의 사상</p>
        <h2 id="belief-heading">한번 내어 준 마음을<br />되찾아 갈 권리가 있는가.</h2>
        <div><p>사랑한다는 말은 감정의 표현이 아니라 상대에게 건네는 약속이며, 한번 성립한 약속은 어느 한쪽의 변심만으로 취소될 수 없다고 믿는다. 상대가 떠나려는 선택을 존중하는 것은 사랑이 아니라 포기라고 여긴다. 유토를 죽인 일을 사랑 때문에 판단력을 잃은 결과라고 주장하지 않는다. 그가 자신을 떠날 미래와 누구에게도 갈 수 없는 죽음 가운데 후자를 의식적으로 선택했다.</p><p>용서받는다면 자신의 사랑과 소유 방식이 인정받았다고 받아들일 가능성이 높다. 용서받지 못하더라도 피해자의 고통보다 자신의 진심을 이해받지 못했다는 사실에 분노한다. 죄의 존재는 인정하지만 그것이 잘못이라는 판단에는 동의하지 않는다.</p></div>
      </section>

      <section className="closing-label" aria-label="선관 및 오너란">
        <div><span>선관</span><strong>없음</strong></div><div><span>오너닉</span><strong>새드아씨</strong></div><div><span>나이</span><strong>성인</strong></div>
      </section>
    </div>
  );
}

export default function Home() {
  const [mode, setMode] = useState<ProfileMode>("public");

  return (
    <main className="site-shell" data-mode={mode}>
      <div className="thread-line" aria-hidden="true"><i /><i /><i /></div>
      <header className="site-header">
        <a href="#top" aria-label="페이지 맨 위로 이동">HILGRAM</a>
        <p>INMATE PATTERN / 021</p>
        <span>{mode === "public" ? "OPEN" : "UNSEALED"}</span>
      </header>

      <section className="hero" id="top" aria-labelledby="character-name">
        <div className="hero-index"><span>21</span><p>JAPAN<br />XX<br />159 / 49</p></div>
        <div className="hero-name">
          <p className="catchphrase">돌아올 자리는 늘 비워둘게.</p>
          <h1 id="character-name"><small>御影 雫</small>미카게<br />시즈쿠</h1>
          <blockquote>“계속 곁에 있겠다고 했잖아.<br />난 그 말을 믿었을 뿐이야.”</blockquote>
        </div>
        <figure className="fabric-portrait">
          <div className="portrait-crop"><Image src="/mikage-shizuku.webp" alt="짙은 남보라색 양갈래 땋은 머리와 보라색 눈의 미카게 시즈쿠" width={1280} height={1280} priority unoptimized sizes="(max-width: 700px) 100vw, 56vw" /></div>
          <span className="strap strap-one">PROMISE / KEEP TIGHT</span>
          <span className="strap strap-two">RESTRAINT / DO NOT RELEASE</span>
          <figcaption><b>외관 참고용</b><span>공식 구속복 아님</span><span>출처: 픽크루</span></figcaption>
        </figure>
        <div className="hero-mode"><ModeSwitch mode={mode} onChange={setMode} /></div>
      </section>

      <section id="profile-panel" className="profile-panel" role="tabpanel" tabIndex={0} aria-labelledby={mode === "public" ? "public-tab" : "secret-tab"} key={mode}>
        {mode === "public" ? <PublicProfile /> : <SecretProfile />}
      </section>

      <footer className="site-footer"><p>세 번의 심문. 한 번의 고백.</p><small>스토킹 및 살인 소재가 포함된 창작 캐릭터 프로필입니다.</small><a href="#top">TOP ↑</a></footer>
    </main>
  );
}
