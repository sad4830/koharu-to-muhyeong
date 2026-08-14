"use client";

import { useEffect, useRef, useState } from "react";

type View = "public" | "secret-gate" | "secret" | "owner";

const publicBasics = [
  ["이름", "御影 雫 / 미카게 시즈쿠"],
  ["나이", "22세"],
  ["성별", "여성"],
  ["번호", "선점 후 기입"],
  ["키 / 몸무게", "158 cm / 48 kg"],
];

const secretBasics = [
  ["진짜 이름", "御影 雫 / 미카게 시즈쿠"],
  ["나이", "22세"],
  ["진짜 성별", "여성"],
  ["번호", "선점 후 기입"],
  ["키 / 몸무게", "158 cm / 48 kg"],
];

const publicLikes = [
  "낡은 사진을 복원하는 일",
  "포도 맛 사탕",
  "작은 약속을 기억해 주는 사람",
  "가지런히 땋은 머리",
];

const publicHates = [
  "읽고 답하지 않은 메시지",
  "예고 없이 바뀌는 일정",
  "사진이나 대화를 지우는 행동",
  "과거는 지나갔다는 말",
];

const secretLikes = [
  "날짜와 시간이 남은 기록",
  "상대의 취향을 먼저 맞히는 순간",
  "변하지 않는 약속",
  "자신만 알고 있는 사소한 버릇",
];

const secretHates = [
  "관계에 거리를 두자는 말",
  "자신이 모르는 새 인간관계",
  "기억과 현재가 다르다는 지적",
  "타인의 거절을 최종 결정으로 인정하는 일",
];

const openHooks = [
  {
    title: "기억을 맡긴 사람",
    body: "시즈쿠에게 손상된 사진이나 잊고 싶은 기록을 건넨 인물. 복원을 원하는 범위와 시즈쿠가 보존하려는 범위가 달라질 수 있습니다.",
  },
  {
    title: "삭제를 요구한 사람",
    body: "자신에 관한 사진이나 메모를 지워 달라고 분명히 요구한 인물. 시즈쿠가 처음으로 타인의 삭제 권한을 시험받는 관계입니다.",
  },
  {
    title: "마지막 음성을 들은 사람",
    body: "시즈쿠가 간직한 마지막 음성의 존재를 알게 된 인물. 용서와 사실 확인 가운데 무엇을 선택할지는 상대 오너와 협의합니다.",
  },
];

function RecordList({ rows }: { rows: string[][] }) {
  return (
    <dl className="record-list">
      {rows.map(([label, value]) => (
        <div className="record-row" key={label}>
          <dt>{label}</dt>
          <dd>
            {value.startsWith("https://") ? (
              <a href={value} target="_blank" rel="noreferrer">
                {value}
              </a>
            ) : (
              value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function PreferenceGroup({
  likes,
  hates,
  scared,
}: {
  likes: string[];
  hates: string[];
  scared: string;
}) {
  return (
    <div className="preference-grid">
      <section>
        <h3>Like</h3>
        <ul>
          {likes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Hate</h3>
        <ul>
          {hates.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="scared-preference">
        <h3>Scared</h3>
        <p>{scared}</p>
      </section>
    </div>
  );
}

function RelationshipHooks() {
  return (
    <div className="hooks" aria-label="열린 선관 제안">
      {openHooks.map((hook) => (
        <details key={hook.title}>
          <summary>{hook.title}</summary>
          <p>{hook.body}</p>
        </details>
      ))}
    </div>
  );
}

function PublicProfile() {
  return (
    <div className="profile-copy view-enter" id="profile-content">
      <header className="profile-intro">
        <h1 data-view-heading="public" tabIndex={-1}>
          <span lang="ja">御影 雫</span>
          <small>미카게 시즈쿠</small>
        </h1>
        <div className="voice-record">
          <blockquote>
            “좋아하는 건 오래 보고 싶잖아요. 그러니까 저는, 아주 잘 기억해요.”
          </blockquote>
          <p className="catchphrase">[ 기억해 두면, 없어지지 않아요. ]</p>
        </div>
      </header>

      <section className="content-section" aria-labelledby="public-record">
        <h2 id="public-record">공개 프로필</h2>
        <RecordList rows={publicBasics} />
      </section>

      <section
        className="content-section reading-section"
        aria-labelledby="public-appearance"
      >
        <h2 id="public-appearance">외관</h2>
        <p>
          옅은 보랏빛이 감도는 먹회색 머리카락을 허벅지 아래까지 길러 양옆으로
          굵게 땋았다. 정수리에는 길게 뻗은 잔머리가 있고, 무거운 앞머리가 왼쪽
          눈을 반쯤 가린다. 양쪽 앞머리에는 은색 일자 핀을 두 개씩 나란히 꽂는다.
          크고 둥근 연보라색 눈, 늘 옅게 달아오른 뺨, 코 옆의 작은 점이 눈에 띈다.
          입꼬리를 조금 올린 채 상대를 오래 바라보는 버릇 때문에 첫인상은 순하고
          얌전하다.
        </p>
        <p>
          힐그램 안에서는 흰색 하이넥 셔츠형 원피스와 흰 바지를 겹쳐 입는다.
          검은 구속줄이 위팔, 손목, 허리, 발목을 고정하며 장식은 둥근 은색
          머리핀과 옅은 라일락색 박음질뿐이다. 입소 전 즐겨 하던 긴 분홍색
          네일과 반지는 회수되었고 손톱 끝에 옅은 색만 남았다. 발에는 흰색
          캔버스화를 신고 검은 고정끈을 맨다. 전신은 가늘고 작은 체구지만 자세를
          흐트러뜨리는 일이 거의 없다.
        </p>
      </section>

      <section
        className="content-section reading-section"
        aria-labelledby="public-personality"
      >
        <h2 id="public-personality">성격</h2>
        <div className="keyword-line" aria-label="성격 키워드">
          <span>세심한</span>
          <span>상냥한</span>
          <span>끈질긴</span>
        </div>
        <p>
          다른 사람이 흘려 말한 취향과 약속을 놀라울 만큼 정확히 기억한다. 먼저
          필요한 물건을 건네고, 대화가 끊기면 상대가 편한 주제로 조용히 이어
          준다. 거절당해도 표정을 흐리지 않으며 한 발 물러나는 것처럼 보인다.
          다만 자신이 중요하다고 판단한 일은 끝났다는 말을 들어도 혼자 계속
          챙긴다. 친절과 집요함의 경계가 흐리지만 본인은 이를 책임감이라 믿는다.
        </p>
      </section>

      <section className="content-section" aria-labelledby="public-preferences">
        <h2 id="public-preferences">L / H / S</h2>
        <PreferenceGroup
          likes={publicLikes}
          hates={publicHates}
          scared="공란"
        />
      </section>

      <section className="content-section" aria-labelledby="public-features">
        <h2 id="public-features">특징</h2>
        <div className="feature-grid">
          <p><strong>생일</strong><span>9월 12일</span></p>
          <p><strong>혈액형</strong><span>A형</span></p>
          <p><strong>국적</strong><span>일본</span></p>
          <p><strong>직업</strong><span>사진 복원 스튜디오 보조</span></p>
          <p><strong>말투</strong><span>나직한 존댓말. 상대의 이름을 자주 부른다.</span></p>
          <p><strong>습관</strong><span>대화가 끝난 시간과 마지막 문장을 메모한다.</span></p>
        </div>
      </section>

      <section
        className="content-section reading-section"
        aria-labelledby="public-relationship"
      >
        <h2 id="public-relationship">선관</h2>
        <p>
          현재 확정 선관은 없습니다. 공개 프로필과 비밀 프로필을 합쳐 최대 3명까지
          협의할 수 있습니다.
        </p>
      </section>
    </div>
  );
}

function SecretProfile() {
  return (
    <div className="profile-copy view-enter" id="profile-content">
      <header className="profile-intro secret-intro">
        <h1 data-view-heading="secret" tabIndex={-1}>
          <span lang="ja">御影 雫</span>
          <small>미카게 시즈쿠</small>
        </h1>
        <div className="voice-record">
          <blockquote>
            “그 애가 저를 사랑했던 건 사실이에요. 저는 그 사실이 사라지지 않게 했을 뿐이에요.”
          </blockquote>
          <p className="catchphrase">[ 사랑은 변하기 전에 보관해야 한다. ]</p>
        </div>
      </header>

      <section className="content-section" aria-labelledby="secret-record">
        <h2 id="secret-record">비밀 프로필</h2>
        <RecordList rows={secretBasics} />
      </section>

      <section
        className="content-section reading-section"
        aria-labelledby="secret-appearance"
      >
        <h2 id="secret-appearance">외관</h2>
        <p>
          공개 프로필에 적힌 모습과 같다. 다만 긴 앞머리 아래의 왼쪽 눈은 상대가
          자리를 뜨거나 시선을 돌릴 때 훨씬 오래 움직임을 좇는다. 웃을 때 두 손으로
          하트를 만드는 습관은 연인과 찍은 첫 사진의 자세를 반복하는 것이다.
          압박을 받으면 은색 머리핀 두 쌍이 정확히 평행한지 손끝으로 확인한다.
        </p>
        <p>
          흰 구속복의 검은 허리끈을 유독 단단히 조여 매며, 풀린 매듭을 보면 대화를
          멈추고 바로잡는다. 입소 전에는 연인의 기념일마다 같은 라일락색 옷과
          하트 장신구를 착용했다. 지금 남은 라일락색 박음질은 본인이 허락받은
          유일한 장식이다.
        </p>
      </section>

      <section
        className="content-section reading-section"
        aria-labelledby="secret-personality"
      >
        <h2 id="secret-personality">성격</h2>
        <div className="keyword-line" aria-label="비밀 성격 키워드">
          <span>보존 강박</span>
          <span>통제적 애정</span>
          <span>선택적 정직</span>
        </div>
        <p>
          시즈쿠의 세심함은 상대를 이해하기 위한 관찰에서 시작했지만, 지금은
          상대가 변하지 못하도록 관리하는 방식이 되었다. 사실관계는 좀처럼
          거짓말하지 않는다. 대신 타인의 거절과 변화만 일시적인 오류로 취급한다.
          자신이 대신 기억하고 준비하면 관계가 안전해진다고 믿으며, 그 과정에서
          상대가 느끼는 두려움은 현재의 혼란일 뿐이라고 축소한다. 죄를 고백할 수는
          있지만 자신이 사랑한 사람의 선택권을 빼앗았다는 문장만은 아직 말하지 못한다.
        </p>
      </section>

      <section className="content-section" aria-labelledby="secret-preferences">
        <h2 id="secret-preferences">L / H / S</h2>
        <PreferenceGroup
          likes={secretLikes}
          hates={secretHates}
          scared="사랑했던 사람이 자신과 무관한 미래를 선택하고, 그 선택을 존중해 달라고 요구하는 것."
        />
      </section>

      <section className="content-section" aria-labelledby="secret-features">
        <h2 id="secret-features">특징</h2>
        <div className="feature-grid">
          <p><strong>생일</strong><span>9월 12일</span></p>
          <p><strong>혈액형</strong><span>A형</span></p>
          <p><strong>국적</strong><span>일본</span></p>
          <p><strong>직업</strong><span>사진 복원 스튜디오 보조</span></p>
          <p><strong>소지 기록</strong><span>삭제하지 못한 47초짜리 음성 파일</span></p>
          <p><strong>범행 대상</strong><span>연인이었던 사에키 토우마, 당시 23세</span></p>
        </div>
      </section>

      <section className="content-section summary-panel" aria-labelledby="story-summary">
        <h2 id="story-summary">과거사 요약</h2>
        <p>
          시즈쿠는 손상된 사진을 원래 모습에 가깝게 되돌리는 일을 배우며, 변한
          현재보다 가장 아름다웠던 과거가 더 진실하다고 믿게 되었다. 연인 사에키
          토우마가 자신의 세심함을 사랑해 주자 모든 대화와 습관을 기록하기 시작했다.
          기록은 곧 감시가 되었고 토우마는 관계를 끝내려 했다. 시즈쿠는 마지막으로
          추억을 정리하자며 그를 스튜디오로 불러 계획적으로 움직였고, 돌아갈 기회를
          주지 않은 채 살해했다. 이후 그의 계정과 사진을 이용해 이별과 잠적을 꾸몄지만,
          “사랑했던 건 진짜지만 끝낼 권리도 내게 있다”는 마지막 음성을 지우지 못해
          범행이 드러났다. 지금도 살인을 인정하면서 사랑을 보존했다는 해석은 놓지 않는다.
        </p>
      </section>

      <article className="content-section story" aria-labelledby="full-story">
        <h2 id="full-story">과거사</h2>

        <section>
          <h3>고치는 법을 먼저 배운 아이</h3>
          <p>
            시즈쿠의 어머니는 오래된 가족사진을 복원하는 작은 작업실에서 일했다.
            찢어진 모서리를 잇고 바랜 얼굴의 색을 되찾는 일은 특별한 기적처럼
            보였지만, 어머니는 늘 복원은 새로 만드는 일이 아니라 남아 있는 증거를
            존중하는 일이라고 말했다. 시즈쿠는 그중 앞부분만 받아들였다. 상처 난
            것도 충분히 공을 들이면 가장 좋았던 모습으로 되돌릴 수 있다는 믿음이었다.
          </p>
          <p>
            열두 살 때 가장 친한 친구가 이사한 뒤 연락이 끊겼다. 누구의 잘못도
            아니었지만 시즈쿠는 둘이 함께 찍은 사진과 편지를 날짜순으로 정리하며
            버텼다. 친구가 없는 현재보다 기록 속에서 웃는 둘이 더 선명했다. 그때부터
            관계가 멀어지는 이유를 묻는 대신, 좋았던 순간을 정확히 보관하면 관계도
            사라지지 않는다고 믿었다.
          </p>
        </section>

        <section>
          <h3>사랑받은 방식</h3>
          <p>
            스무 살의 시즈쿠는 사진 복원 스튜디오에서 보조로 일하며 대학 사진
            동아리에서 사에키 토우마를 만났다. 토우마는 자신이 무심코 말한 음료와
            영화 제목을 시즈쿠가 기억해 주는 일을 좋아했다. 첫 데이트의 영수증,
            함께 탄 전철 시각, 감기에 걸린 날 먹은 약까지 정리한 작은 앨범을 받고
            그는 “네가 기억해 줘서 좋다”고 말했다. 시즈쿠에게 그 문장은 사랑의
            규칙이 되었다.
          </p>
          <p>
            처음의 기록은 배려였다. 그러나 토우마의 답장이 늦어질수록 시즈쿠는
            빈칸을 견디지 못했다. 공유가 끝난 위치 기록을 계속 확인하고, 그의
            휴대전화에 남은 대화를 몰래 복사하고, 자신이 모르는 사람과 찍힌 사진을
            인화본에서 지웠다. 덕분에 시즈쿠는 늘 완벽한 선물과 대답을 준비했고
            다툼도 정확한 과거 문장으로 이겼다. 단기적으로 관계는 조용해졌지만,
            토우마는 점점 사랑받는 사람이 아니라 정리되는 자료처럼 느꼈다.
          </p>
        </section>

        <section>
          <h3>끝내자는 문장</h3>
          <p>
            토우마가 백업 파일을 발견했을 때 그는 처음으로 분명히 그만두라고 말했다.
            시즈쿠는 사과하고 자료를 지우겠다고 답했지만 삭제하지 않았다. 대신 더
            들키지 않는 방식으로 기록했다. 결국 토우마는 관계를 끝내고 혼자 살 집을
            알아보았다. 시즈쿠에게 이별은 한 사람의 현재 선택이 아니었다. 기록 속에서
            자신을 사랑하던 진짜 토우마가 피로와 주변 사람에게 잠시 흐려진 상태였다.
          </p>
          <p>
            시즈쿠는 한 달만 제대로 정리할 시간을 달라고 했다. 그동안 스튜디오의
            작업대 위에 두 사람의 사진을 날짜순으로 복원하고, 사건 뒤에 보낼 메시지와
            자신의 동선을 미리 준비했다. 범행 당일에는 모든 자료를 돌려주겠다고
            토우마를 불렀다. 문을 잠그고 그의 몸이 둔해지도록 미리 준비한 음료를
            건넨 뒤, 다시 사랑한다고 말해 달라고 요구했다. 토우마는 “사랑했던 건
            진짜지만 끝낼 권리도 내게 있다”고 답했다.
          </p>
        </section>

        <section>
          <h3>남기기로 한 선택</h3>
          <p>
            시즈쿠는 그 말을 녹음하고 있었다. 토우마가 힘을 잃은 뒤에도 멈출 수 있는
            순간은 있었다. 그러나 그가 문밖으로 나가면 기록 속 사랑까지 거짓이 될
            것이라 생각했다. 시즈쿠는 스튜디오 장비의 검은 고정끈으로 그의 목을 졸랐고,
            손이 풀리려는 순간 한 번 더 힘을 주었다. 우발적인 실수가 아니라, 상대의
            미래보다 자신이 보존한 과거를 선택한 살인이었다.
          </p>
          <p>
            이후 토우마의 계정으로 잠시 떠나겠다는 메시지를 보내고 사진의 시간 정보를
            바꾸었다. 헤어진 연인이 사라진 것처럼 보이게 만드는 데 자신이 배운 기술을
            사용했다. 단 하나, 마지막 음성 파일은 지우지 못했다. 그 안에 남은
            “사랑했던 건 진짜”라는 문장을 없애면 자신이 지키려 한 사랑도 사라진다고
            믿었기 때문이다. 수사관은 그 파일의 원본 정보에서 스튜디오와 범행 시각을
            확인했다. 시즈쿠는 체포 직후 살해 사실을 인정했지만, 토우마를 빼앗았다는
            말 대신 변하기 전의 그를 지켰다고 진술했다.
          </p>
        </section>
      </article>

      <section className="content-section" aria-labelledby="timeline-title">
        <h2 id="timeline-title">인과 연표</h2>
        <ol className="timeline">
          <li><time>12세</time><p>친구와 연락이 끊긴 뒤 사진과 편지를 정리하며 기록은 관계를 보존한다는 믿음을 만든다.</p></li>
          <li><time>20세</time><p>토우마가 자신의 기억력과 세심함을 사랑해 주자 기록 행동이 관계의 보상으로 굳어진다.</p></li>
          <li><time>21세</time><p>불안을 줄이기 위해 기록 범위를 넓히고, 배려는 동의 없는 감시와 편집으로 변한다.</p></li>
          <li><time>22세</time><p>이별을 현재의 선택이 아닌 오류로 해석하고, 준비한 마지막 만남에서 토우마를 살해한다.</p></li>
          <li><time>현재</time><p>사실은 고백하지만 타인의 변화와 거절을 지울 권리가 자신에게 없었다는 책임은 인정하지 못한다.</p></li>
        </ol>
      </section>

      <section className="content-section ideology" aria-labelledby="ideology-title">
        <h2 id="ideology-title">캐릭터의 사상</h2>
        <p className="ideology-lead">
          “사람은 흔들리지만, 한때 진심이었던 기록은 흔들리지 않는다.”
        </p>
        <p>
          시즈쿠는 가장 행복했던 순간의 마음을 한 사람의 본질로 보고, 그 뒤의 변화는
          외부 요인이나 피로가 만든 손상이라고 생각한다. 그래서 타인의 현재 의사보다
          과거의 약속을 더 높은 증거로 취급한다. 그녀가 심문에서 넘어야 할 지점은
          살해 사실의 인정이 아니다. 사랑했던 과거가 진짜였어도 상대에게 관계를 끝내고
          변할 권리가 있었다고 인정하는 것이다.
        </p>
      </section>

      <section
        className="content-section reading-section"
        aria-labelledby="secret-relationship"
      >
        <h2 id="secret-relationship">선관</h2>
        <p>
          현재 확정 선관은 없습니다. 아래 내용은 모두 관계 제안이며 상대 오너와 합의한
          뒤에만 확정됩니다. 공개 프로필과 합쳐 최대 3명까지 가능합니다.
        </p>
        <RelationshipHooks />
      </section>
    </div>
  );
}

function SecretGate({
  onOpen,
  onCancel,
}: {
  onOpen: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="secret-gate view-enter" id="profile-content">
      <p className="gate-mark" aria-hidden="true">PRIVATE</p>
      <h1 data-view-heading="secret-gate" tabIndex={-1}>
        이 기록은 살인과 집착의 진상을 포함합니다.
      </h1>
      <p>
        비밀 프로필에는 피해자, 범행 과정, 은폐 시도, 캐릭터의 왜곡된 사상이
        구체적으로 적혀 있습니다. 내용을 확인하시겠습니까?
      </p>
      <div className="gate-actions">
        <button className="primary-action" type="button" onClick={onOpen}>
          비밀 프로필 열기
        </button>
        <button className="secondary-action" type="button" onClick={onCancel}>
          공개 프로필로 돌아가기
        </button>
      </div>
      <p className="gate-meta" aria-hidden="true">
        <span>ENTRY 01</span>
        <span>RESTORATION RECORD / SEALED</span>
      </p>
    </div>
  );
}

function OwnerProfile() {
  return (
    <div className="profile-copy owner-copy view-enter" id="profile-content">
      <header className="profile-intro">
        <h1 data-view-heading="owner" tabIndex={-1}>오너란</h1>
        <div className="voice-record">
          <blockquote>프로필 및 선관 협의는 오너를 통해 진행합니다.</blockquote>
          <p className="catchphrase">[ OWNER INFORMATION ]</p>
        </div>
      </header>
      <section className="content-section" aria-labelledby="owner-record">
        <h2 id="owner-record">오너 정보</h2>
        <RecordList
          rows={[
            ["오너닉", "새드아씨"],
            ["나이", "성인"],
            ["외관 출처", "Picrew"],
            ["원본 링크", "https://picrew.me/en/image_maker/1649970"],
          ]}
        />
      </section>
      <section
        className="content-section reading-section"
        aria-labelledby="owner-note"
      >
        <h2 id="owner-note">확인 사항</h2>
        <p>
          첨부 이미지는 입소 전 외관 참고용입니다. 힐그램 내부 의상은 프로필에 적힌
          흰색 주조의 지정 구속복과 검은 구속줄을 기준으로 합니다. 선관은 합의 이후에만
          확정하며 상대 캐릭터의 감정과 행동을 미리 정하지 않습니다.
        </p>
      </section>
    </div>
  );
}

export default function ProfileClient() {
  const [view, setView] = useState<View>("public");
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const shouldFocusView = useRef(false);

  const theme =
    view === "secret" || view === "secret-gate" ? "secret" : "public";

  useEffect(() => {
    if (!shouldFocusView.current) return;

    document
      .querySelector<HTMLElement>(`[data-view-heading="${view}"]`)
      ?.focus({ preventScroll: true });
    shouldFocusView.current = false;
  }, [view]);

  const selectView = (nextView: View) => {
    window.scrollTo({ top: 0, behavior: "auto" });
    shouldFocusView.current = true;
    setView(nextView);
  };

  const openSecret = () => {
    if (secretUnlocked) {
      selectView("secret");
      return;
    }
    selectView("secret-gate");
  };

  return (
    <div className="site-shell" data-theme={theme} data-view={view}>
      <a className="skip-link" href="#profile-content">본문으로 건너뛰기</a>

      <header className="topbar">
        <a
          className="wordmark"
          href="#top"
          aria-label="미카게 시즈쿠 프로필 처음으로"
        >
          <span lang="ja">御影 雫</span>
          <small>HILGRAM</small>
        </a>
        <nav className="view-switcher" aria-label="프로필 구분">
          <button
            type="button"
            aria-current={view === "public" ? "page" : undefined}
            aria-controls="profile-content"
            onClick={() => selectView("public")}
          >
            공개
          </button>
          <button
            type="button"
            aria-current={
              view === "secret" || view === "secret-gate" ? "page" : undefined
            }
            aria-controls="profile-content"
            aria-expanded={view === "secret" || view === "secret-gate"}
            onClick={openSecret}
          >
            비밀
          </button>
          <button
            type="button"
            aria-current={view === "owner" ? "page" : undefined}
            aria-controls="profile-content"
            onClick={() => selectView("owner")}
          >
            오너
          </button>
        </nav>
      </header>

      <main className="profile-layout" id="top">
        <aside className="portrait-column" aria-label="캐릭터 외관">
          <div className="portrait-frame">
            <img
              src="/mikage-shizuku.webp"
              width="1200"
              height="1200"
              alt="보라색 눈과 긴 땋은 머리의 여성이 고딕 로리타 복장으로 손하트를 만들며 미소 짓는 상반신 그림"
            />
            <div className="archive-meta" aria-hidden="true">
              <span>ORIGINAL 01</span>
              <span>RESTORE LOG / 09.12</span>
            </div>
            <div className="parallel-mark" aria-hidden="true"><i /><i /></div>
          </div>
          <p className="portrait-caption">
            입소 전 외관 참고 / 힐그램 지정 의상은 프로필 서술 기준
          </p>
          <div className="portrait-facts" aria-label="기본 정보">
            <span>22세</span>
            <span>여성</span>
            <span>158 cm / 48 kg</span>
          </div>
        </aside>

        <section className="content-column">
          {view === "public" && <PublicProfile />}
          {view === "secret-gate" && (
            <SecretGate
              onOpen={() => {
                setSecretUnlocked(true);
                selectView("secret");
              }}
              onCancel={() => selectView("public")}
            />
          )}
          {view === "secret" && <SecretProfile />}
          {view === "owner" && <OwnerProfile />}
        </section>
      </main>

      <footer className="site-footer">
        <p>御影 雫 / 22 / 女性</p>
        <div>
          <a href="https://posty.pe/pkv5n8fc" target="_blank" rel="noreferrer">
            HILGRAM 총공지
          </a>
          <span>오너 새드아씨</span>
          <a
            href="https://picrew.me/en/image_maker/1649970"
            target="_blank"
            rel="noreferrer"
          >
            외관 출처 Picrew
          </a>
        </div>
      </footer>
    </div>
  );
}
