const publicBasics = [
  ["이름", "御影 雫 / 미카게 시즈쿠"],
  ["나이", "22세"],
  ["성별", "여성"],
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

function PreferenceGroup() {
  return (
    <div className="preference-grid">
      <section>
        <h3>Like</h3>
        <ul>
          {publicLikes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Hate</h3>
        <ul>
          {publicHates.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="scared-preference">
        <h3>Scared</h3>
        <p>공란</p>
      </section>
    </div>
  );
}

function PublicProfile() {
  return (
    <div className="profile-copy view-enter" id="profile-content" tabIndex={-1}>
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

      <section className="content-section reading-section" aria-labelledby="public-appearance">
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

      <section className="content-section reading-section" aria-labelledby="public-personality">
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
        <PreferenceGroup />
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

      <section className="content-section reading-section" aria-labelledby="public-relationship">
        <h2 id="public-relationship">선관</h2>
        <p>현재 확정 선관은 없습니다. 전체 선관은 최대 3명까지 협의할 수 있습니다.</p>
      </section>
    </div>
  );
}

export default function ProfileClient() {
  return (
    <div className="site-shell" data-theme="public">
      <a className="skip-link" href="#profile-content">본문으로 건너뛰기</a>
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="미카게 시즈쿠 프로필 처음으로">
          <span lang="ja">御影 雫</span>
          <small>HILGRAM</small>
        </a>
        <p className="public-badge">공개 프로필</p>
      </header>

      <main className="profile-layout" id="top">
        <aside className="portrait-column" aria-label="캐릭터 외관">
          <div className="portrait-frame">
            <img src="/mikage-shizuku.webp" width="1200" height="1200" alt="보라색 눈과 긴 땋은 머리의 여성이 고딕 로리타 복장으로 손하트를 만들며 미소 짓는 상반신 그림" />
            <div className="archive-meta" aria-hidden="true"><span>ORIGINAL 01</span><span>RESTORE LOG / 09.12</span></div>
            <div className="parallel-mark" aria-hidden="true"><i /><i /></div>
          </div>
          <p className="portrait-caption">입소 전 외관 참고 / 힐그램 지정 의상은 프로필 서술 기준</p>
          <div className="portrait-facts" aria-label="기본 정보"><span>22세</span><span>여성</span><span>158 cm / 48 kg</span></div>
        </aside>

        <section className="content-column">
          <PublicProfile />
        </section>
      </main>

      <footer className="site-footer">
        <p>御影 雫 / 22 / 女性</p>
        <div>
          <a href="https://posty.pe/pkv5n8fc" target="_blank" rel="noreferrer">HILGRAM 총공지</a>
        </div>
      </footer>
    </div>
  );
}
