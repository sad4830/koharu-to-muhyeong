---
name: "켄자쿠 인물 기록"
description: "한지 병리도감과 육체 교체 장부의 문법으로 읽는 비대칭 인물 기록"
colors:
  ink-black: "#0a0c10"
  ink-soft: "#12161a"
  moss-oxidized: "#2c392d"
  moss-muted: "#62705f"
  old-gold: "#9a7838"
  old-gold-pale: "#c9b678"
  bone: "#e7e2d8"
  paper: "#d9d2c5"
  text-muted: "#a8a397"
  stitch-red: "#a53c3b"
  focus-aqua: "#52d9f3"
  divider-on-dark: "rgb(231 226 216 / 18%)"
typography:
  display:
    fontFamily: "Archivo Variable, Noto Sans KR Variable, sans-serif"
    fontSize: "clamp(64px, 9.1vw, 138px)"
    fontWeight: 810
    lineHeight: 0.85
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo Variable, Noto Sans KR Variable, sans-serif"
    fontSize: "clamp(40px, 6vw, 86px)"
    fontWeight: 790
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Archivo Variable, Noto Sans KR Variable, sans-serif"
    fontSize: "clamp(22px, 2.3vw, 32px)"
    fontWeight: 700
    lineHeight: 1.3
  lead:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "clamp(17px, 1.55vw, 21px)"
    fontWeight: 400
    lineHeight: 1.8
  body:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "12px"
    fontWeight: 720
    lineHeight: 1.7
  navigation:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "13px"
    fontWeight: 650
    lineHeight: 1.7
  control:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "14px"
    fontWeight: 720
    lineHeight: 1.7
  control-strong:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "16px"
    fontWeight: 780
    lineHeight: 1.7
rounded:
  none: "0"
  full: "50%"
spacing:
  compact: "8px"
  small: "12px"
  control-inline: "18px"
  content-gap: "28px"
  block-gap: "38px"
  header-gutter: "clamp(20px, 4vw, 64px)"
  page-gutter: "clamp(20px, 7vw, 112px)"
  section-block: "clamp(100px, 12vw, 180px)"
  mobile-gutter: "18px"
components:
  button-primary:
    backgroundColor: "rgb(44 57 45 / 72%)"
    textColor: "{colors.bone}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "14px 18px"
  button-primary-hover:
    backgroundColor: "{colors.old-gold-pale}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.none}"
  button-scope:
    backgroundColor: "transparent"
    textColor: "{colors.old-gold-pale}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "14px 18px"
  button-scope-pressed:
    backgroundColor: "{colors.old-gold-pale}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.none}"
  button-spoiler:
    backgroundColor: "{colors.old-gold-pale}"
    textColor: "{colors.ink-black}"
    typography: "{typography.control-strong}"
    rounded: "{rounded.none}"
    padding: "14px 18px"
  button-spoiler-hover:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    typography: "{typography.navigation}"
    rounded: "{rounded.none}"
    padding: "8px 0"
  ability-tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.none}"
    padding: "18px 24px"
  ability-tab-selected:
    backgroundColor: "{colors.moss-oxidized}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
  evidence-note:
    backgroundColor: "transparent"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.none}"
    padding: "26px 0 0 28px"
  lineage-entry:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "17px 0 0"
  plan-step:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "35px 28px 38px"
  source-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.none}"
    padding: "18px 0"
---

# Design System: 켄자쿠 인물 기록

## Overview

**Creative North Star: "해부 병리도감 × 육체 교체 장부"**

이 시스템은 켄자쿠의 정체를 한 사람의 초상보다 여러 육체를 관통하는 병리 기록으로 다룬다. 먹흑 바탕, 산화된 이끼, 오래된 금, 뼈와 한지의 색이 결계 도면 같은 얇은 선과 봉합 자국을 만나며, 정보 밀도는 중간 이상이지만 화면마다 하나의 강한 표본이나 문장을 먼저 읽게 한다.

페이지는 일반적인 카드 대시보드를 거부하고, 비대칭 장부와 해부 도감의 큰 활자·수평 계보·선형 절차로 사실을 조직한다. 첫 화면의 범위 제어와 상태 문장이 현재 애니메이션 또는 원작 범위를 먼저 고지하며, 원작 전용 육체·술식·출처와 최종 기록은 독자의 단계적 선택 뒤 같은 장부 흐름에서 열린다.

**Key Characteristics:**

- 먹흑과 뼈색이 크게 교차하는 병리 표본의 명암
- 붉은 봉합선, 금빛 규칙선, 결계 원이 만드는 추적 가능한 구조
- Archivo의 압축된 거대 제목과 Noto Sans KR의 검증 가능한 본문
- 각진 장부 셀과 선형 구획을 우선하는 무카드 구성
- 첫 화면 범위 선택에서 시작해 최종 기록 해제로 이어지는 2단계 스포일러 서사

## Colors

색은 어두운 먹과 누렇게 바랜 종이를 기본 재료로 삼고, 이끼와 오래된 금은 구조를, 봉합 적색은 계보와 경고를 표시한다.

### Primary

- **산화 이끼:** 선택된 술식, 스포일러 금고, 행동의 어두운 채움에 사용한다.
- **바랜 이끼:** 밝은 종이 위 보조 라벨과 얇은 분류 표식에 사용한다.

### Secondary

- **오래된 금:** 결계선, 표본 프레임, 단계 경계처럼 오래 축적된 기록의 구조를 표시한다.
- **옅은 오래된 금:** 강조 레이블, 활성 텍스트, 채워진 스포일러 버튼에 사용한다.

### Tertiary

- **봉합 적색:** 육체 계보, 불확실성 경고, 봉합선에만 집중적으로 사용한다.
- **수술등 아쿠아:** 키보드 포커스 윤곽에만 사용하는 접근성 신호다.

### Neutral

- **먹흑:** 페이지 바탕과 가장 어두운 본문 잉크다.
- **부드러운 먹:** 계보 구간에 근소한 층차를 만든다.
- **뼈색:** 어두운 바탕의 주 텍스트이자 밝은 표본면이다.
- **한지색:** 술식 설명 영역과 밝은 보조 텍스트에 사용한다.
- **바랜 주석색:** 어두운 면의 보조 정보와 출처 메타데이터에 사용한다.
- **어두운 면 구획선:** 셀과 장부를 나누되 카드처럼 둘러싸지 않는 반투명 규칙선이다.

**The Scar Tissue Rule.** 봉합 적색은 계보·경고·상처의 기능이 있는 선과 짧은 표식에만 쓰고, 넓은 장식 면으로 확장하지 않는다.

## Typography

**Display Font:** Archivo Variable (Noto Sans KR Variable 대체)
**Body Font:** Noto Sans KR Variable (sans-serif 대체)
**Label Font:** Noto Sans KR Variable

**Character:** 제목은 압축되고 무거운 표본 라벨처럼 밀어붙이며, 본문은 한국어의 긴 사실 설명을 안정적으로 받친다. 한자 윤곽과 초대형 숫자·글자는 정보 계층이 아니라 해부 표본으로도 작동한다.

### Hierarchy

- **Display** (810, `clamp(64px, 9.1vw, 138px)`, 0.85): 첫 화면의 이름에만 사용한다.
- **Headline** (790, `clamp(40px, 6vw, 86px)`, 1.02): 각 장의 논제를 한 문장으로 제시한다.
- **Title** (700, `clamp(22px, 2.3vw, 32px)`, 1.3): 육체, 계획 단계, 하위 기록의 명칭에 사용한다.
- **Lead** (400, `clamp(17px, 1.55vw, 21px)`, 1.8): 섹션 논제를 65자 안팎의 읽기 폭으로 설명한다.
- **Body** (400, 16px, 1.7): 검증된 사실과 작동 방식을 설명한다.
- **Label** (720, 12px, 1.7): 범위, 출처 강도, 연대, 경고의 짧은 메타데이터에 사용한다.

**The Two-Register Rule.** 거대하고 조밀한 제목과 여유 있는 한국어 본문을 짝지으며, 본문 전체를 전시용 굵기나 좁은 행간으로 만들지 않는다.

## Layout

첫 화면은 데스크톱에서 왼쪽 기록문과 오른쪽 공식 표본을 62:38 경계로 나누고, 중앙 봉합선이 두 증거를 연결한다. 기록 열람과 범위 선택은 10px 간격의 한 쌍으로 놓이고 현재 범위 상태가 바로 아래에 남는다. 고정 헤더는 68px, 영웅 영역은 최소 100dvh이며, 주요 섹션은 유동 세로 여백과 페이지 거터를 공유한다. 콘텐츠 폭은 대체로 1060px에서 1320px 안에서 관리하고, 설명문은 약 62ch에서 65ch로 제한한다. 공식 전신 표본은 데스크톱 프레임 높이의 89%로 줄여 머리부터 발끝까지 여백과 함께 보인다.

1080px 이하에서는 다섯 칸 육체 계보가 세 칸으로, 네 단계 계획이 두 칸으로 바뀌며 긴 수평선을 개별 기록선으로 분해한다. 767px 이하에서는 헤더가 60px이 되고 거터는 18px로 고정된다. 내비게이션은 닫힌 동안 `hidden`이며 열릴 때 표시되는 한 열 목록으로, 영웅과 두 행동은 세로 흐름으로, 계보·술식 콘솔·계획·출처·완결 기록은 모두 한 열로 전환된다. 모바일 표본은 더 짧은 프레임 안에서 높이 94%를 사용한다. 술식 선택 그룹만 두 열 제어판을 유지해 비교 속도를 보존한다.

**The Ledger Before Cards Rule.** 정보를 독립된 둥근 카드로 흩뜨리지 말고, 공통 기준선·열·연대·단계가 먼저 보이는 장부 구조로 묶는다.

## Elevation & Depth

기본 표면은 평평하다. 깊이는 먹흑·부드러운 먹·한지·뼈색의 큰 면 전환, 1px 규칙선, 방사형 결계 그래디언트와 이미지 명암으로 만든다. 그림자는 주 행동의 낮은 주변광, 공식 표본의 강한 낙하 그림자, 붉은 봉합선의 미세한 발광에만 쓰며, 고정 헤더에는 반투명 먹 면과 16px 배경 흐림을 적용한다.

### Shadow Vocabulary

- **행동 주변광** (`0 18px 55px rgb(0 0 0 / 24%)`): 첫 기록 열람 버튼을 배경에서 분리한다.
- **표본 낙하 그림자** (`0 38px 42px rgb(0 0 0 / 58%)`): 공식 전신 이미지를 표본 프레임 앞에 세운다.
- **봉합 발광** (`0 0 24px rgb(165 60 59 / 34%)`): 중앙 봉합선에만 낮은 발광을 준다.

**The Flat Evidence Rule.** 상시 떠 있는 카드 그림자를 만들지 말고, 깊이는 증거물의 층과 상태 변화가 필요한 지점에만 부여한다.

## Shapes

상호작용과 정보 면은 반경 0의 날카로운 모서리를 기본으로 한다. 형태는 1px 직선, 개방된 위·아래 경계, 사각 단계 표식으로 만들며, 육체 계보의 매듭은 정사각형을 45도로 돌린 마름모다. 완전한 원은 결계 지도와 배경 좌표에만 쓰이고 컨테이너 실루엣에는 쓰이지 않는다.

**The Sharp Anatomy Rule.** 둥근 카드와 알약형 제어를 추가하지 말고, 절개선처럼 명확한 직선과 잘린 모서리를 유지한다.

## Components

### Navigation

- **Style:** 먹흑 반투명 헤더 위 13px 보조색 텍스트이며, 데스크톱 항목 간격은 32px이다.
- **Hover / Focus:** hover는 뼈색으로 밝아지며 300ms 동안 금빛 밑줄이 오른쪽에서 왼쪽으로 열린다. 포커스는 2px 아쿠아 윤곽과 5px 오프셋을 공유한다.
- **Mobile:** 767px 이하에서는 42px 메뉴 제어와 최소 높이 52px의 한 열 목록으로 바뀐다. 닫힌 목록은 `hidden`으로 레이아웃과 접근성 트리에서 빠지고, 열린 상태에서만 표시된다.

### Buttons

- **Shape:** 모두 각진 사각형(0 radius)이며 최소 172px에서 180px의 안정된 너비를 가진다.
- **Primary:** 반투명 이끼 면, 오래된 금 1px 경계, 뼈색 텍스트, 14px 18px 내부 여백이다.
- **Scope:** 주 행동과 나란히 놓이는 투명 면과 옅은 금색 텍스트의 제어다. `aria-pressed="true"`이면 옅은 금 면과 먹흑 텍스트로 반전되어 현재 원작 범위를 표시한다.
- **Spoiler:** 범위가 원작으로 열린 뒤에만 최종 기록을 해제한다. 옅은 오래된 금으로 채운 뒤 hover에서 투명 이끼 면으로 반전한다.
- **Hover / Focus:** hover는 2px 상승, active는 1px 하강하고 220ms에서 250ms의 ease 전환을 쓴다. 포커스는 공통 아쿠아 윤곽을 유지한다.

### Scope Status

- **First Viewport:** 범위 라벨, 누름 상태를 가진 범위 버튼, 10px 라이브 상태 문장이 같은 선택을 세 번 다른 방식으로 확인시킨다.
- **Disclosure:** 원작 범위가 닫히면 원작 전용 육체, 술식, 비교 기록, 출처가 렌더링되지 않으며 최종 기록 제어는 첫 화면 범위 선택으로 돌려보낸다.

### Ability Tabs

- **Style:** `role="group"` 안에서 누름 상태를 가진 버튼을 사용한다. 데스크톱에서는 최소 높이 88px의 세로 장부, 모바일에서는 2열 제어판이다.
- **State:** 비선택 항목은 투명 한지 면이며 hover에서 이끼색 10% 면과 6px 수평 이동을 쓴다. `aria-pressed="true"` 항목은 산화 이끼 면과 뼈색 텍스트로 고정한다. 원작 범위가 닫히면 원작 전용 능력 버튼 자체를 제외한다.

### Hero Specimen

- **Image:** 공식 전신 이미지는 데스크톱 표본 프레임 높이의 89%로 배치해 전체 인물과 주변 결계선을 함께 보여준다.
- **Credit:** 이미지 우측 하단에 10px 출처 문구를 놓고 뼈색 52% 투명도로 보조 정보임을 유지한다.

### Evidence Notes

- **Style:** 카드 배경 없이 왼쪽의 봉합 적색 1px 선과 28px 들여쓰기로 불확실성·검증 원칙을 분리한다.
- **Hierarchy:** 12px 적색 라벨, 굵은 핵심 문장, 14px 설명 순서다.

### Lineage & Plan Records

- **Lineage:** 데스크톱에서는 봉합 적색 수평선과 마름모 매듭에 다섯 육체를 걸고, 좁은 화면에서는 각 기록의 위 경계로 분해한다.
- **Plan:** 오래된 금 위 경계와 반투명 세로 규칙선으로 네 단계를 연결하며, 48px 정사각 단계 표식을 사용한다.

### Source Links

- **Style:** 최소 높이 92px의 3열 행으로 출처명, 근거 범위, 열기 동사를 배치하고 아래쪽 1px 구획선만 둔다.
- **Hover / Focus:** hover에서 산화 이끼색으로 바뀌며 5px 이동하고, 키보드 포커스는 공통 아쿠아 윤곽을 사용한다.

**The Same-Place Disclosure Rule.** 첫 화면 범위 선택은 원작 전용 장부 항목을 조건부로 열고, 최종 기록 해제는 별도 팝업이나 새 카드가 아니라 현재 금고 위치에서 연다.

## Do's and Don'ts

### Do:

- Do use 먹흑·이끼·오래된 금·뼈·한지의 큰 면 전환으로 장을 구분한다.
- Do keep 봉합 적색은 계보, 불확실성, 경고처럼 의미가 있는 짧은 선에 집중한다.
- Do preserve 명확한 포커스 윤곽과 `prefers-reduced-motion`·`prefers-reduced-transparency` 대체 동작을 제공한다.
- Do organize 육체와 계획을 공통 기준선, 연대, 단계로 읽히는 장부에 배치한다.
- Do show the active spoiler scope in the first viewport with visible label, pressed state, and live status text.

### Don't:

- Don't turn the page into a generic rounded-card dashboard.
- Don't use persistent shadows on every container or soften the system with pill controls.
- Don't render 원작 전용 records before the first-viewport scope control is explicitly pressed.
- Don't fill uncertain facts with decorative statistics or unverified profile values.
