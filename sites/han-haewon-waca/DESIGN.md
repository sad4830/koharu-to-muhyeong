---
name: "한해원 | WACA II등급 연합 기록"
description: "심전도 감열지와 임상시험 동의서가 겹친 동의 파형 원장"
colors:
  room: "#0b0d0f"
  room-raised: "#15181a"
  paper: "#e9ece7"
  paper-dim: "#dfe3de"
  ink: "#121618"
  ink-muted: "#59605c"
  room-text: "#f1f3ef"
  room-muted: "#a8aeaa"
  rule: "#aeb5af"
  rule-dark: "#34383a"
  blood: "#b51f2e"
  blood-on-dark: "#e05463"
  white: "#ffffff"
typography:
  display:
    fontFamily: "WACA Sans, sans-serif"
    fontSize: "clamp(4.5rem, 8.5vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "WACA Sans, sans-serif"
    fontSize: "clamp(2.7rem, 5.2vw, 5.4rem)"
    fontWeight: 850
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  body:
    fontFamily: "WACA Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.72
  label:
    fontFamily: "WACA Sans, sans-serif"
    fontSize: "0.66rem"
    fontWeight: 650
    lineHeight: 1.72
    letterSpacing: "0.1em"
rounded:
  sharp: "0px"
  signal: "999px"
spacing:
  page-gutter: "clamp(1rem, 3vw, 2.25rem)"
  section-block: "clamp(7rem, 11vw, 11rem)"
  section-inline: "clamp(1.5rem, 5vw, 5rem)"
components:
  primary-link:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "0.75rem 1rem 0.75rem 1.15rem"
    height: "3.25rem"
  primary-link-hover:
    backgroundColor: "{colors.blood}"
    textColor: "{colors.white}"
    rounded: "{rounded.sharp}"
  record-tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.sharp}"
    padding: "0.65rem 1.1rem"
    height: "3rem"
  record-tab-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sharp}"
---

# Design System: 한해원 WACA 기록

## Overview

**Creative North Star: "심전도 감열지와 임상시험 동의서가 겹친 동의 파형 원장"**

냉백색 감열지 문서가 먹빛 격리실 위에 놓이고, 동맥 적색 신호가 동의·배치·회수를 기록한다. 페이지는 영웅 초상이나 게임 스탯이 아니라 체인 오브 커스터디를 따라 읽는 고밀도 원장이다. 비대칭 열, 날카로운 모서리, 긴 세로 기록축으로 검수 순서를 만들며 적색은 상태와 선택에만 제한한다.

**Key Characteristics:**

- 냉백색 종이와 먹빛 격리실의 강한 명도 분할
- 1px 규정선으로 이어지는 증거철·혈액백 라벨 문법
- 자가 호스팅 Pretendard Variable 한 가족의 극단적 굵기·크기 대비
- 동의 → 배치 → 회수를 5.5초에 순환하는 단일 대표 파형
- 인물 외관 없이 선택, 규칙, 기록만으로 정체성을 드러내는 Read 모드

## Colors

냉백색과 먹빛이 넓은 면을 맡고, 동맥 적색은 활성 상태·위험·윤리적 선택만 표시한다.

### Primary

- **동맥 적색** (`blood`): CTA hover, 파형, 번호, 활성 판정, 경계선에만 사용한다.
- **암실 위 적색** (`blood-on-dark`): 먹빛 면의 상태 라벨과 포커스 보조 링에 사용한다.

### Neutral

- **격리실 먹빛** (`room`)과 **상승 먹빛** (`room-raised`): 전역 배경과 능력 구획을 나눈다.
- **감열지 냉백** (`paper`)과 **감열지 음영** (`paper-dim`): 원장·등록부·환자 그리드의 물리적 종이 면이다.
- **문서 잉크** (`ink`, `ink-muted`)와 **암실 문자** (`room-text`, `room-muted`): 서로 다른 면의 본문 계층을 만든다.
- **규정선** (`rule`, `rule-dark`): 종이와 암실 각각의 분할선이다.

**The Arterial Exception Rule.** 동맥 적색은 넓은 장식 면이 아니라 상태, 경고, 선택, 진행 신호일 때만 쓴다.

## Typography

**Display / Body / Label Font:** 로컬 서브셋으로 제공되는 Pretendard Variable 기반 `WACA Sans`와 `sans-serif` 대체 글꼴.

한 서체 안에서 45–920 가변 굵기를 사용한다. 큰 제목은 압축된 비례, 강한 음수 자간, 850–900 굵기로 문서의 압력을 만들고, 본문은 높은 행간, 데이터 라벨은 작은 크기·넓은 자간·tabular 숫자로 임상 기록의 속도를 만든다.

### Hierarchy

- **Display:** 이름 전용. 900 굵기, 0.9 행간, 최대 9ch.
- **Headline:** 섹션 명제. 850 굵기, 1.08 행간, 최대 18ch, 균형 줄바꿈.
- **Body:** 1rem, 1.72 행간. 설명문은 보통 40–70ch에서 멈춘다.
- **Label:** 0.58–0.72rem 범위, 0.03–0.18em 자간. 영문 코드와 판정값에 사용한다.

**The One-Family Rule.** 세리프·고딕 장식체·아이콘 폰트를 추가하지 않고, `WACA Sans`의 크기·굵기·자간만으로 위계를 만든다.

## Layout

최대 콘텐츠 폭은 88rem이고, 공통 섹션은 유동형 상하·좌우 여백을 사용한다. 데스크톱 첫 화면은 세로 등록 rail, 중앙 copy, 우측 signal, 하단 facts의 비대칭 원장이다. 능력지는 좁은 색인축과 두 개의 정보 열을 공유하고, 나머지 기록은 1px 선으로 연결된 표·타임라인·비대칭 2열을 사용한다.

- **1100px 이하:** hero와 능력지를 2열로 축소하고 signal을 copy 아래에 놓는다.
- **820px 이하:** 첫 화면의 시각·DOM 읽기 순서를 `rail → facts → copy → signal`로 고정한다. 내비게이션은 44px 이상 높이의 가로 스크롤 행이 되고, 다열 표와 서사는 한 열로 접힌다.
- **520px 이하:** 능력 색인축은 44px, 정의 목록은 40/60 비율, 타임라인은 단일 열로 바뀌며 긴 값은 줄바꿈한다.

**The Ledger Order Rule.** 모바일에서도 판정(facts)을 서사(copy)보다 먼저 보여 주고, 파형(signal)은 설명 뒤에 배치한다.

## Elevation & Depth

기본은 그림자 없는 평면 원장이다. 종이 표면만 격리실에서 물리적으로 들려 보이도록 hero와 ability sheet에 구조적 그림자를 쓰고, 상태점과 타임라인 점에는 작은 적색 잔광만 허용한다. 나머지 깊이는 명도 면과 규정선으로 만든다.

**The Evidence Stack Rule.** 그림자는 종이 증거철의 층을 설명할 때만 사용하며, 카드 hover 장식으로 반복하지 않는다.

## Shapes

컨테이너, 버튼, 탭, 표는 모두 0px의 날카로운 모서리와 1px 규정선을 사용한다. 999px 원형은 상태점, 파형 표본점, 타임라인 마커처럼 생체 신호를 나타내는 작은 요소에만 쓴다. 2px 선은 기록의 시작이나 공개 범위를 구분하는 상단 규정선으로 제한한다.

**The Sharp Consent Rule.** 둥근 카드, 캡슐형 버튼, 부드러운 앱 패널을 만들지 않는다. 원형은 오직 신호 표식이다.

## Components

### Navigation

- 먹빛 sticky bar, 하단 `rule-dark` 규정선, 44px 이상 링크 타깃을 사용한다.
- 링크 hover와 focus-visible에서 텍스트가 밝아지고, 동맥 적색 1px 밑줄이 왼쪽에서 펼쳐진다.
- 820px 이하에서는 두 번째 행 전체를 가로 스크롤 내비게이션으로 쓴다.

### Primary and Text Links

- Primary는 잉크 면 위 감열지 텍스트, 날카로운 모서리, 선으로 그린 화살표를 사용하며 hover에서 동맥 적색 면으로 전환한다.
- Text link는 밑줄과 44px 터치 높이를 유지하고 hover에서 동맥 적색으로 바뀐다.

### Consent Waveform

- 기본 파형은 어두운 규정선, 진행 파형은 3px 동맥 적색과 square cap이다.
- 하나의 5.5초 주기에서 동의(0–28%), 배치(36–58%), 회수(66–94%)가 차례로 어두운 적색 면에 활성화된다.
- `prefers-reduced-motion: reduce`에서는 이동과 순환을 멈추고 전체 파형과 세 단계를 정적인 활성 상태로 표시한다.

### Record Tabs and Sheets

- 탭은 1px 잉크 외곽선 안에서 선택 상태를 잉크 면/감열지 문자로 반전한다. 좌우 화살표 키로 탭 선택과 포커스를 함께 이동한다.
- 등록 행과 능력지는 규정선, tabular 숫자, 좁은 라벨 열로 구성하고 820px 이하에서 정보 열을 한 열로 접는다.

### Accessibility

- 감열지/잉크는 15.27:1, 암실/밝은 문자는 17.43:1, 보조 암실 문자는 8.62:1, 보조 잉크 문자는 감열지에서 5.42:1이다.
- 전역 focus-visible은 2px 감열지 outline과 4px 암실 적색 링을 쓰고, 밝은 문서 면에서는 2px 잉크 outline과 4px 동맥 적색 링으로 반전한다.
- skip link, 의미 있는 landmark, tablist/tabpanel 관계, 44px 최소 터치 타깃을 유지한다.

## Do's and Don'ts

### Do:

- **Do** 냉백색 종이와 먹빛 방을 큰 면으로 분리하고, 1px 규정선으로 정보의 소유·순서를 연결한다.
- **Do** 동맥 적색을 상태·선택·진행에만 사용하고, 본문은 검증된 명도 대비 조합을 유지한다.
- **Do** 모바일 첫 화면을 `rail → facts → copy → signal` 순서로 보존한다.
- **Do** 파형은 동의 → 배치 → 회수 5.5초 순환 하나만 대표 모션으로 사용하고 reduced-motion 정지 상태를 제공한다.

### Don't:

- **Don't** 캐릭터 외관, 초상, 실루엣, 신체 일부, 외형 서술을 생성하거나 암시하지 않는다.
- **Don't** 관, 박쥐 떼, 성당 장식, 십자가, 피 튀김 같은 고전 뱀파이어 고딕·호러 모티프를 사용하지 않는다.
- **Don't** 둥근 카드 대시보드, 게임 스탯창, 공식 WACA 서비스처럼 보이는 UI를 만들지 않는다.
