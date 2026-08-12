import { FlowSimulator } from "./flow-simulator";

const identity = [
  ["이름", "黒瀬 凪 | 쿠로세 나기"],
  ["죄명", "역류(逆流)"],
  ["나이", "24세"],
  ["성별", "XX"],
  ["국적", "일본"],
  ["신장 · 체중", "176cm · 68kg"],
  ["소속", "칠죄교단"],
  ["부서 및 직급", "분노의 죄인"],
  ["등급", "II등급"],
  ["활동 시점", "2027년 · 베들레헴 특별성역"],
] as const;

const counters = [
  {
    title: "면으로 덮는다",
    text: "폭발, 열기, 냉기, 독무처럼 방향 하나로 흘릴 수 없는 광역 현상은 받아칠 수 없다.",
  },
  {
    title: "리듬을 바꾼다",
    text: "같은 동작의 속도와 궤도를 바꾸거나 페인트를 섞으면 읽어 둔 패턴이 즉시 무효가 된다.",
  },
  {
    title: "시야를 나눈다",
    text: "두 방향 이상의 동시 공격과 제3자의 기습은 한 흐름에 집중한 나기의 사각을 찌른다.",
  },
  {
    title: "접촉을 끊는다",
    text: "정신 간섭, 내부 발현, 무형 저주처럼 팔과 손으로 접촉할 수 없는 공격에는 반류가 성립하지 않는다.",
  },
] as const;

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="쿠로세 나기 기록 첫 화면">
          <span>SEPTEM PECCATA</span>
          <strong>逆流</strong>
        </a>
        <nav aria-label="프로필 바로가기">
          <a href="#record">기록</a>
          <a href="#temper">성향</a>
          <a href="#abilities">능력</a>
          <a href="#counter">파훼</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">분노의 죄인 | II등급</p>
          <h1>
            정의가 다수라면,
            <br />
            그 다수를 꺾는다.
          </h1>
          <p className="hero-sub">
            힘을 부딪치지 않는다. 읽고, 흘리고, 가장 약해진 순간에 돌려준다.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#abilities">
              전투 기록 열람
            </a>
            <a className="text-action" href="#record">
              신원 확인
            </a>
          </div>
        </div>
        <FlowSimulator />
      </section>

      <section className="identity-section section-shell" id="record">
        <div className="section-heading">
          <p>죄인 등록 기록</p>
          <h2>쿠로세 나기</h2>
          <span>黒瀬 凪</span>
        </div>
        <dl className="identity-grid">
          {identity.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="manifesto section-shell" aria-labelledby="manifesto-title">
        <div className="manifesto-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div>
          <h2 id="manifesto-title">“승자가 붙인 이름을 진실이라 부르지 마.”</h2>
          <p>
            나기의 욕망은 선악을 없애는 것이 아니다. 수가 많다는 이유로 누군가를 악이라
            몰아붙이는 질서를, 그 질서가 가장 자신 있어 하는 힘으로 무너뜨리는 것이다.
            교단에도 충성보다 도전을 앞세우며 약자를 짓밟는 죄인은 같은 편이라도 꺾는다.
          </p>
        </div>
      </section>

      <section className="profile-section section-shell" id="temper">
        <article className="appearance-panel">
          <div className="profile-title">
            <span>외관</span>
            <h2>그림 없이 남은 목격 기록</h2>
          </div>
          <p>
            짙은 남청색 머리는 쇄골 언저리에서 거칠게 끊기며, 훈련할 때만 목덜미에서 낮게
            묶는다. 빛을 받으면 금빛이 번지는 갈색 눈은 평소 반쯤 감겨 있지만 싸움이
            시작되면 상대의 어깨와 골반, 발끝을 빠르게 훑는다. 햇볕에 그을린 피부와 단단한
            체형, 여러 번 터져 굳은 손마디가 오랜 근접전을 드러낸다. 차콜색 민소매 상의 위에
            비대칭 랩 재킷을 걸치고, 넓은 회청색 바지와 밑창이 얇은 검은 전투화를 신는다.
            양팔의 푸른 회색 천은 장식이 아니라 손목과 팔꿈치의 과부하를 붙잡기 위한 붕대다.
          </p>
          <p className="source-note">외관 이미지 없음 | 텍스트 묘사만 수록</p>
        </article>

        <article className="temper-panel">
          <div className="profile-title">
            <span>성격</span>
            <h2>반권위적 · 승부 집착 · 약자 편애</h2>
          </div>
          <div className="temper-copy">
            <p>
              직급과 명성보다 눈앞의 행동을 믿는다. 처음 보는 상대에게도 반말을 쓰고 명령의
              이유가 납득되지 않으면 죄악의 지시조차 되묻는다. 싸움에서는 화를 터뜨리기보다
              오히려 침착해진다. 맞을수록 상대의 버릇이 보이는 순간을 즐기며, 패배는 수치가
              아니라 다음 승부를 위한 자료로 취급한다.
            </p>
            <p>
              약자를 괴롭히는 행위를 유난히 싫어하지만 스스로를 정의로운 사람이라 부르지는
              않는다. 쓰러진 민간인을 안전한 곳으로 옮겨 놓고도 “내 싸움에 방해돼서”라고
              둘러댄다. 그 모순을 지적받으면 대답 대신 상대에게 겨루자고 손짓한다.
            </p>
          </div>
        </article>
      </section>

      <section className="history-section section-shell">
        <div className="history-label">특징 및 이력</div>
        <div className="history-copy">
          <h2>가스 폭발로 정리된 밤</h2>
          <p>
            열아홉 살 때 도쿄 외곽의 이능 사건에 휘말렸다. WACA는 현장을 수습하고 사건을
            가스 폭발로 발표했으며, 생존자들의 기억까지 조정했다. 나기는 사람을 구한 뒤에도
            무엇이 있었는지 말할 권리조차 빼앗는 질서를 받아들이지 못했다. 그 분노가 영력을
            깨웠고, 가장 깊은 곳의 속삭임은 그녀에게 욕망을 숨기지 않아도 된다고 말했다.
          </p>
          <p>
            현재는 베들레헴 특별성역 주변에서 WACA 전투원을 추적한다. 단, 비전투원과
            민간인을 사냥감으로 삼지 않는다. 힘없는 자를 건드리는 교단원과 자주 충돌해 내부
            징계 기록도 많다. 강한 자가 독점한 정의를 강한 자의 방식으로 깨뜨리겠다는 욕망만은
            한 번도 꺾인 적이 없다.
          </p>
        </div>
      </section>

      <section className="abilities-section section-shell" id="abilities">
        <div className="abilities-heading">
          <h2>두 개의 흐름</h2>
          <p>
            II등급 상한에 맞춰 능력은 2개만 보유한다. 신체 능력이나 상대 이능 자체를 복제하지
            않는다.
          </p>
        </div>

        <article className="ability ability-primary">
          <div className="ability-name">
            <span>근접 반격술</span>
            <h3>《반류쇄경》</h3>
            <p>反流碎勁</p>
          </div>
          <div className="ability-body">
            <p className="ability-lead">
              팔과 손바닥을 따라 얇은 영력의 흐름을 만든다. 접촉한 힘을 원형 궤도로 흘린 뒤,
              무너진 자세의 틈으로 되돌려 보낸다.
            </p>
            <div className="rule-clusters">
              <div>
                <h4>발동 조건</h4>
                <p>
                  방향을 눈으로 확인할 수 있고 팔이나 손으로 접촉 가능한 단일 공격이어야 한다.
                  사거리 밖에서는 단순한 보법과 체술만 사용할 수 있다.
                </p>
              </div>
              <div>
                <h4>출력과 범위</h4>
                <p>
                  반경 2m의 근접전 한정. 최대 출력은 중형 건물 1채를 파괴할 위력의 단일 공격을
                  한 번 흘려 되돌리는 수준이며, 여러 공격을 저장하거나 합산할 수 없다.
                </p>
              </div>
              <div>
                <h4>지속 · 쿨타임</h4>
                <p>지속 3지문. 종료 후 쿨타임 2지문.</p>
              </div>
              <div>
                <h4>패널티</h4>
                <p>
                  성공할 때마다 손목, 팔꿈치, 어깨가 충격의 일부를 부담한다. 한 번의 발동 중
                  세 차례 받아치면 관절이 떨려 이후 2지문 동안 최대 출력 반격이 불가능하다.
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="ability ability-secondary">
          <div className="ability-name">
            <span>관찰형 전투 감각</span>
            <h3>《파형독파》</h3>
            <p>波形讀破</p>
          </div>
          <div className="ability-body">
            <p className="ability-lead">
              호흡, 중심 이동, 영력의 고조가 반복되는 순서를 읽어 한 대상의 한 공격 패턴만
              예측한다. 대응이 정교해질 뿐, 공격을 복사하거나 자동으로 피하지 않는다.
            </p>
            <div className="rule-clusters">
              <div>
                <h4>발동 조건</h4>
                <p>
                  동일 대상이 같은 구조의 공격을 두 차례 사용하는 전 과정을 시야 안에서 직접
                  관찰해야 한다. 대상이나 분석 패턴을 바꾸면 축적은 처음부터 다시 시작한다.
                </p>
              </div>
              <div>
                <h4>효과</h4>
                <p>
                  다음 동작의 시작점과 예상 경로를 먼저 읽어 회피와 《반류쇄경》의 접촉 타이밍을
                  보조한다. 한 번에 한 대상, 한 패턴만 유지한다.
                </p>
              </div>
              <div>
                <h4>지속 · 쿨타임</h4>
                <p>분석 2지문. 효과 3지문. 종료 후 쿨타임 3지문.</p>
              </div>
              <div>
                <h4>패널티</h4>
                <p>
                  분석 중 시야가 대상에게 좁아져 제3자의 공격과 환경 변화에 둔해진다. 효과가
                  끝나면 두통과 복시가 발생하며 1지문 동안 새 패턴을 분석할 수 없다.
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="sequence-section section-shell" aria-labelledby="sequence-title">
        <h2 id="sequence-title">흐름은 네 동작으로 완성된다</h2>
        <ol>
          <li>
            <strong>맞닿는다</strong>
            <span>공격의 방향을 손끝으로 확인한다.</span>
          </li>
          <li>
            <strong>원 밖으로 뺀다</strong>
            <span>정면 충돌을 피하고 힘의 중심을 비운다.</span>
          </li>
          <li>
            <strong>리듬을 읽는다</strong>
            <span>호흡과 중심 이동의 반복을 기억한다.</span>
          </li>
          <li>
            <strong>빈 곳에 돌려준다</strong>
            <span>무너진 자세를 향해 남은 힘을 보낸다.</span>
          </li>
        </ol>
      </section>

      <section className="counter-section section-shell" id="counter">
        <div className="counter-heading">
          <h2>흐름을 끊는 법</h2>
          <p>반류는 무적의 방패가 아니다. 접촉, 시야, 반복 중 하나만 끊어도 파훼할 수 있다.</p>
        </div>
        <div className="counter-grid">
          {counters.map((counter) => (
            <article key={counter.title}>
              <h3>{counter.title}</h3>
              <p>{counter.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="last-section section-shell">
        <div className="limits-panel">
          <div>
            <span>성물</span>
            <strong>없음</strong>
            <p>보유 능력 2개로 II등급의 능력 수 상한을 모두 사용한다.</p>
          </div>
          <div>
            <span>권능</span>
            <strong>미각성</strong>
            <p>자신의 욕망을 완성하지 못했으며 현재 권능은 존재하지 않는다.</p>
          </div>
        </div>
        <div className="preferences-panel">
          <div>
            <span>L</span>
            <p>강한 상대, 솔직한 적의, 새벽 훈련, 무가당 차, 떠돌이 개</p>
          </div>
          <div>
            <span>H</span>
            <p>다수결의 정의, 동정, 약자만 고르는 폭력, 이유 없는 명령, 총기</p>
          </div>
          <div>
            <span>기타</span>
            <p>반말을 사용한다. 상대가 쓰러지면 먼저 일어설 수 있는지 확인한 뒤 승리를 선언한다.</p>
          </div>
        </div>
      </section>

      <footer>
        <p>SEPTEM PECCATA | 분노의 죄인 기록</p>
        <span>OWNER 새드아씨</span>
      </footer>
    </main>
  );
}
