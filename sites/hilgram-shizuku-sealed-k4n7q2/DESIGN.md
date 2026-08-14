---
name: "Mikage Shizuku — Sealed Profile"
description: "먹회색 보관실에 어두운 라일락 복원 기록을 겹친 운영진용 비공개 프로필."
colors:
  archive-black: "#1f1b23"
  archive-surface: "#27222c"
  archive-surface-strong: "#2c2631"
  record-white: "#f7f3fa"
  record-muted: "#c8bdcc"
  rule: "#493e4d"
  rule-strong: "#68596d"
  restoration-lilac: "#d6bee7"
  lilac-wash: "#342a3d"
  lilac-ink: "#ecdef5"
  control-lilac: "#d9c2e8"
  control-ink: "#24182c"
  portrait-paper: "#efeeef"
typography:
  display:
    fontFamily: "Shizuku Serif, Noto Serif KR, Noto Serif JP, serif"
    fontSize: "clamp(4.2rem, 7.4vw, 6rem)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Pretendard Variable, Pretendard, Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, system-ui, sans-serif"
    fontSize: "clamp(1.7rem, 3vw, 2.4rem)"
    fontWeight: 760
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Pretendard Variable, Pretendard, Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 2vw, 1.48rem)"
    fontWeight: 520
    lineHeight: 1.7
    letterSpacing: "normal"
  body:
    fontFamily: "Pretendard Variable, Pretendard, Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.25vw, 1.08rem)"
    fontWeight: 400
    lineHeight: 1.9
    letterSpacing: "normal"
  label:
    fontFamily: "Pretendard Variable, Pretendard, Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, system-ui, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: "0.02em"
rounded:
  control: "10px"
  surface: "14px"
  pill: "999px"
spacing:
  control-gap: "4px"
  xs: "8px"
  sm: "10px"
  md: "18px"
  lg: "24px"
  xl: "30px"
  section-block: "clamp(56px, 7vw, 88px)"
  page-inline: "clamp(24px, 4vw, 64px)"
  column-gap: "clamp(54px, 7vw, 118px)"
components:
  archive-navigation:
    backgroundColor: "{colors.archive-black}"
    textColor: "{colors.record-white}"
    typography: "{typography.label}"
    padding: "10px clamp(20px, 4vw, 64px)"
    height: "72px"
  skip-link:
    backgroundColor: "{colors.control-lilac}"
    textColor: "{colors.control-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
  sealed-badge:
    backgroundColor: "transparent"
    textColor: "{colors.restoration-lilac}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "8px 13px"
  portrait-frame:
    backgroundColor: "{colors.portrait-paper}"
    rounded: "{rounded.surface}"
    width: "100%"
  record-row:
    backgroundColor: "transparent"
    textColor: "{colors.record-white}"
    typography: "{typography.body}"
    padding: "20px 0"
  summary-card:
    backgroundColor: "{colors.lilac-wash}"
    textColor: "{colors.record-white}"
    rounded: "{rounded.surface}"
    padding: "clamp(34px, 5vw, 54px)"
  ideology-card:
    backgroundColor: "{colors.archive-surface-strong}"
    textColor: "{colors.record-white}"
    rounded: "{rounded.surface}"
    padding: "clamp(38px, 6vw, 62px)"
  timeline-row:
    backgroundColor: "transparent"
    textColor: "{colors.record-muted}"
    typography: "{typography.body}"
    padding: "22px 0"
  relationship-disclosure:
    backgroundColor: "transparent"
    textColor: "{colors.record-white}"
    rounded: "0"
    padding: "17px 48px 17px 0"
---

# Design System: Mikage Shizuku — Sealed Profile

## Overview

**Creative North Star: "봉인된 복원 원부 (The Sealed Restoration Ledger)"**

“봉인된 복원 원부”는 한때 다정했던 사진과 기록이 통제의 증거로 변한 상태를 보여 주는 시각 체계다. 먹회색 보관실 위에 흐린 흰 기록문, 어두운 라일락 표식, 정밀한 평행선을 얹어 차갑지만 과장되지 않은 열람 경험을 만든다.

표현력은 장식의 양보다 대비와 편집 순서에서 나온다. 세리프 이름과 어두워진 초상이 첫 인상을 만들고, 이후에는 산세리프 본문과 1px 구분선이 긴 기록을 차분하게 운반한다. 피, 칼, 범죄 현장 테이프, 강한 글리치 같은 직접적인 범죄 이미지는 이 세계의 언어가 아니다.

**Key Characteristics:**

- 먹회색과 어두운 라일락의 절제된 단색성
- 흐린 흰 기록문과 제한적으로 쓰는 라일락 강조
- 사진 복원 마크를 닮은 얇은 평행선과 모서리 표식
- 초상에서 진술과 기록으로 넘어가는 차분한 편집 흐름

## Colors

팔레트는 따뜻한 검정에 가까운 먹회색을 기반으로 하고, 보존·복원과 상호작용 표식에만 라일락을 드러낸다.

### Primary

- **복원 라일락:** 캐치프레이즈, 시점 표기, 링크, 초상 모서리와 포커스 링에 사용한다. 의미를 가리키는 색이지 넓은 면을 채우는 브랜드 배경이 아니다.

### Secondary

- **라일락 워시:** 과거사 요약처럼 한 번 멈춰 읽어야 하는 문서 패널을 배경 톤으로 구분한다.
- **라일락 잉크:** 어두운 라일락 표면 위의 핵심 문장과 패널 제목을 밝히는 데 사용한다.
- **컨트롤 라일락 / 컨트롤 잉크:** 건너뛰기 링크처럼 접근성을 위한 고대비 컨트롤 한 쌍이다.

### Neutral

- **아카이브 블랙:** 페이지와 고정 헤더의 기본 보관실 색이다.
- **아카이브 서피스 / 스트롱:** 보조 표면과 사상 패널을 배경보다 한 단계씩 들어 올린다.
- **레코드 화이트:** 이름, 제목, 사실값처럼 가장 높은 정보 대비를 담당한다.
- **레코드 뮤트:** 긴 본문, 설명, 캡션처럼 지속해서 읽는 텍스트의 눈부심을 낮춘다.
- **룰 / 스트롱 룰:** 표, 레코드 행, 푸터와 작은 장식의 정밀한 경계를 만든다.
- **포트레이트 페이퍼:** 외관 이미지가 로드되기 전에도 복원 사진의 밝은 종이 바탕을 유지한다.

**The 라일락 희소성 Rule.** 복원 라일락은 상태와 의미를 가리킬 때만 사용하고, 화면 대부분은 먹회색과 흐린 흰색이 지배하게 한다.

## Typography

**Display Font:** Shizuku Serif, Noto Serif KR/JP 계열 폴백

**Body Font:** Pretendard Variable, Pretendard와 한국어 시스템 산세리프 폴백

**Character:** 세리프는 복원된 이름표처럼 느리고 기념비적이며, 산세리프는 운영진이 실제 기록을 검토하기 위한 현대적이고 중립적인 목소리다. 이 대비는 인물의 기억과 문서의 사실을 분리한다.

### Hierarchy

- **Display:** 일본어 진짜 이름과 워드마크에만 쓴다. 첫 화면의 이름은 매우 크고 촘촘하게, 워드마크는 같은 가족의 소형 표식으로 운용한다.
- **Headline:** 각 기록 섹션의 제목이다. 굵고 조밀하지만 본문과 같은 산세리프를 써서 장문 구조를 빠르게 훑게 한다.
- **Title:** 결정적 진술과 사상 리드처럼 본문보다 한 단계 큰 읽기 문장이다.
- **Body:** 16px보다 작아지지 않으며 긴 서사는 최대 72ch, 넉넉한 행간과 한국어 단어 단위 줄바꿈을 유지한다.
- **Label:** 메타데이터, 표의 키, 상태 표식에 사용한다. 작은 크기일수록 굵기와 자간으로 판독성을 보완한다.

**The 두 목소리 Rule.** 세리프는 이름과 정체성에만, 산세리프는 진술·설명·데이터·조작에 사용한다.

## Layout

데스크톱은 최대 1480px 컨테이너 안에서 초상과 문서를 0.88:1.12 비율의 두 열로 나눈다. 왼쪽 초상은 최대 640px이며 상단에서 100px 떨어진 위치에 고정되고, 오른쪽은 첫 화면 높이를 사용해 이름과 결정적 진술을 세로 중앙에 둔다. 페이지 좌우 여백과 열 간격은 화면 폭에 따라 유동적으로 증가한다.

980px 아래에서는 열과 제목 크기를 조금 압축한다. 760px 이하에서는 단일 열로 전환해 초상을 최대 230px로 줄이고, 캡션과 기본 사실을 먼저 읽힌 뒤 이름과 진술을 배치한다. 두 칸짜리 선호도와 특징 목록, 좌우 분할된 과거사도 한 열로 풀린다. 430px 이하에서는 레코드 키와 값을 위아래로 쌓는다.

섹션은 넉넉한 수직 간격과 1px 상단 룰로 분리한다. 긴 서사는 카드의 연속이 아니라 하나의 기록 흐름으로 유지하고, 요약과 사상처럼 독해 전환이 필요한 지점만 채워진 표면으로 강조한다. 선관 뒤에는 오너란과 외관 출처를 같은 기록 문법으로 이어 붙인다.

## Elevation & Depth

기본 깊이는 그림자보다 톤 차이와 선으로 만든다. 초상 프레임만 보관된 사진처럼 깊고 확산된 그림자를 가지며, 사상 패널에는 거의 보이지 않는 라일락 기운을 더한다. 요약 패널과 일반 기록은 평평하게 두어 문서의 차분함을 유지한다.

### Shadow Vocabulary

- **아카이브 포트레이트:** 초상을 배경에서 충분히 분리하는 넓고 낮은 검정 그림자다.
- **사상 잔광:** 핵심 사상 패널에만 쓰는 매우 약한 라일락 주변광이다.

**The 톤 우선 Rule.** 새 표면은 먼저 배경 톤과 1px 룰로 계층을 만들고, 그림자는 실제로 떠 있는 사진이나 핵심 패널에만 허용한다.

## Shapes

형태 언어는 날카로운 기록선과 부드러운 봉인 표면의 조합이다. 헤더 표식과 접근성 컨트롤은 10px 모서리, 초상과 강조 패널은 14px 모서리를 사용한다. 완전한 알약형은 스크롤 손잡이와 평행선 끝처럼 작은 기능적 디테일에만 쓴다.

초상은 정사각형으로 잘리고 네 모서리에 얇은 복원 표식을 가진다. 나머지 정보 구조는 둥근 카드 대신 1px 수평선, 분할선과 정확한 열 정렬로 구성한다.

## Components

### Archive Navigation

- **Style:** 흐린 반투명 아카이브 블랙과 하단 룰로 본문 위에 고정된다. 왼쪽은 세리프 워드마크, 오른쪽은 운영진 열람 상태다.
- **Responsive:** 모바일에서는 보조 HILGRAM 라벨을 숨기되 워드마크와 상태 표식은 유지한다.
- **Accessibility:** 투명도 감소 설정에서는 완전 불투명한 배경으로 바뀐다.

### Skip Link

- **Shape:** 10px 모서리의 고대비 라일락 컨트롤이다.
- **State:** 평소 화면 밖에 있다가 키보드 포커스 시 왼쪽 위에 나타난다. 모든 포커스 가능한 항목은 3px 복원 라일락 외곽선과 4px 오프셋을 공유한다.

### Sealed Badge

- **Style:** 투명 배경, 강한 룰 테두리, 복원 라일락 글자로 상태만 조용히 표시한다.
- **Density:** 최소 터치 높이를 침범하지 않으면서 헤더보다 시각적 무게가 낮아야 한다.

### Portrait Archive

- **Frame:** 1:1 비율, 14px 모서리, 밝은 포트레이트 페이퍼 배경과 확산 그림자를 사용한다.
- **Image Treatment:** 채도와 밝기를 낮춘 초상 위에 어두운 대각선 오버레이, 날짜 메타데이터, 모서리 복원선과 두 개의 평행선을 겹친다.
- **Motion:** 첫 진입에서만 위에서 아래로 봉인이 열리듯 드러나며, 모션 감소 설정에서는 즉시 표시한다.

### Ruled Records

- **Rows:** 키와 값을 분할선으로 정렬하고 양쪽 끝에 수평 룰을 둔다. 키는 레코드 뮤트, 값은 레코드 화이트다.
- **Responsive:** 가장 좁은 화면에서는 키와 값을 위아래로 쌓되 룰의 연속성은 보존한다.

### Summary and Ideology Panels

- **Summary:** 라일락 워시 위에 밝은 제목과 본문을 놓는 평평한 14px 패널이다.
- **Ideology:** 스트롱 아카이브 표면과 라일락 잔광으로 한 단계 더 무게를 준다.
- **Padding:** 데스크톱에서는 유동적으로 넓어지고 모바일에서는 24px 안팎의 고정 여백으로 압축한다.

### Timeline

- **Style:** 왼쪽의 라일락 시점과 오른쪽의 설명을 1px 룰 위에 반복한다. 숫자는 탭형 숫자를 사용해 세로 정렬을 안정시킨다.
- **Responsive:** 모바일에서 시점 열과 간격을 줄이되 두 열 구조는 유지한다.

### Relationship Disclosure

- **Style:** 테두리 없는 기본 details 요소를 수평 룰 사이에 놓고, 오른쪽 라일락 꺾쇠가 열림 상태에 따라 회전한다.
- **State:** 제목 전체가 최소 58px 높이의 클릭 영역이며 hover는 텍스트 대비, focus는 공통 외곽선으로 표현한다.

## Do's and Don'ts

### Do:

- Do 아카이브 블랙을 화면의 중심으로 두고 그림자보다 표면 톤으로 깊이를 만든다.
- Do 세리프는 이름과 워드마크에만, 산세리프는 모든 장문과 데이터에 사용한다.
- Do 복원 라일락을 캐치프레이즈, 시점, 링크, 포커스처럼 의미가 있는 표식에만 쓴다.
- Do 레코드 행은 1px 룰, 16px 이상의 본문, 최대 72ch와 넉넉한 행간을 유지한다.
- Do 760px 이하에서 단일 열로 전환하고 초상, 사실, 이름, 진술의 읽기 순서를 보존한다.

### Don't:

- Don't 피, 칼, 범죄 현장 테이프, 경고색 빨강, 강한 글리치를 시각적 지름길로 사용하지 않는다.
- Don't 초상을 원색으로 밝히거나 캐릭터 이미지가 문서보다 먼저 소리치게 만들지 않는다.
- Don't 모든 섹션을 둥근 카드로 감싸 기록의 연속성과 수평 룰 리듬을 끊지 않는다.
- Don't 장문 본문에 장식 세리프나 16px 미만의 한국어 글자를 사용하지 않는다.
- Don't 정보 이해를 애니메이션이나 배경 투명도에 의존시키지 않는다.
