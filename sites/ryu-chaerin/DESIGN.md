---
name: "WACA 연합 기록 | 류채린"
description: "8카운트 안무 시트와 WACA 작전 기록이 결합된 캐릭터 프로필 디자인 시스템"
colors:
  stadium-ink: "#17191f"
  record-paper: "#f3f0ea"
  record-surface: "#e7e2d9"
  muted-copy: "#59595f"
  operational-coral: "#d63f55"
  operational-coral-deep: "#a91f37"
  operational-coral-hover: "#891229"
  signal-on-night: "#ff8998"
  ink-on-signal: "#fff8f5"
  rule-line: "#b8b3aa"
  focus-blue: "#1779c5"
typography:
  display:
    fontFamily: "Black Han Sans, sans-serif"
    fontSize: "clamp(4.4rem, 10vw, 8.6rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Black Han Sans, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5.6rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Noto Sans KR Variable, Apple SD Gothic Neo, sans-serif"
    fontSize: "1.34rem"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Noto Sans KR Variable, Apple SD Gothic Neo, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Noto Sans KR Variable, Apple SD Gothic Neo, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 760
    lineHeight: 1.7
    letterSpacing: "0.14em"
rounded:
  control: "8px"
  action: "10px"
  record: "14px"
components:
  primary-action:
    backgroundColor: "{colors.operational-coral-deep}"
    textColor: "{colors.ink-on-signal}"
    typography: "{typography.body}"
    rounded: "{rounded.action}"
    padding: "0 20px"
    height: "48px"
  primary-action-hover:
    backgroundColor: "{colors.operational-coral-hover}"
    textColor: "{colors.ink-on-signal}"
    typography: "{typography.body}"
    rounded: "{rounded.action}"
    padding: "0 20px"
    height: "48px"
  navigation-link:
    backgroundColor: "transparent"
    textColor: "{colors.muted-copy}"
    typography: "{typography.body}"
    rounded: "{rounded.action}"
    padding: "0 14px"
    height: "44px"
  count-cell:
    backgroundColor: "color-mix(in srgb, {colors.record-paper} 7%, transparent)"
    textColor: "{colors.record-paper}"
    rounded: "{rounded.control}"
    width: "44px"
    height: "58px"
  count-cell-selected:
    backgroundColor: "{colors.operational-coral-deep}"
    textColor: "{colors.ink-on-signal}"
    rounded: "{rounded.control}"
    width: "44px"
    height: "58px"
  trait-chip:
    backgroundColor: "transparent"
    textColor: "{colors.stadium-ink}"
    typography: "{typography.body}"
    padding: "14px 18px"
    height: "72px"
  operational-card:
    backgroundColor: "{colors.stadium-ink}"
    textColor: "{colors.record-paper}"
    rounded: "{rounded.record}"
    padding: "clamp(30px, 6vw, 70px)"
  signal-card:
    backgroundColor: "{colors.operational-coral-deep}"
    textColor: "{colors.ink-on-signal}"
    rounded: "{rounded.record}"
    padding: "clamp(30px, 6vw, 70px)"
---

# Design System: WACA 연합 기록 | 류채린

## Overview

**Creative North Star: "8카운트 작전 기록"**

이 시스템은 치어 안무의 8카운트 시트와 WACA 작전 서류를 한 장의 기록물처럼 결합한다. 먹색 경기장 표면 위에 아이보리 기록지를 겹치고, 코랄 레드는 현재 선택과 작전 전환만 알리는 단일 신호로 사용한다. 에너지는 장식의 양보다 카운트, 포메이션 선, 숫자 리듬, 강한 명암 전환에서 나온다.

화면은 읽기를 우선하지만 정적인 문서처럼 보이지 않는다. 큰 제목과 비대칭 열, 가로 규칙선, 각진 점수판이 긴 한국어 본문을 작전 기록의 순서로 나누며, 조작 가능한 8카운트 보드가 세계관과 사용성을 한 번에 보여준다. 일반적인 프로필 카드 모음과 초상화 중심 구성을 거부하고, 편집 지면처럼 이어지는 섹션과 측정 가능한 능력 규칙을 전면에 둔다.

**Key Characteristics:**

- 먹색 경기장과 아이보리 기록지의 강한 명암 교대
- 한 화면에 하나의 목소리로 쓰이는 코랄 레드 작전 신호
- 8분할 카운트, 포메이션 선, 숫자 기록이 만드는 경기 운영 리듬
- 큰 한글 디스플레이와 촘촘한 본문의 편집형 대비
- 비대칭 열과 연속 지면을 중심으로 한 비카드형 프로필 구조

## Colors

팔레트는 무채색 기록 매체를 바탕으로 코랄 레드 신호와 파란 접근성 포커스만 분명하게 분리한다.

### Primary

- **작전 코랄** (#d63f55): 분류 표식, 상태 강조, 어두운 면의 신호에 사용한다.
- **깊은 작전 코랄** (#a91f37): 라이트 테마의 주요 행동, 인용 면, 핵심 능력 면에 사용한다.
- **압축 코랄** (#891229): 주요 행동의 호버 상태에만 사용해 현재 상호작용을 알린다.
- **야간 신호 핑크** (#ff8998): 먹색 표면 위의 선택 상태와 숫자 신호에 사용한다.
- **신호 위 아이보리** (#fff8f5): 코랄 면 위의 본문과 행동 레이블을 위한 전용 전경색이다.

### Neutral

- **경기장 먹색** (#17191f): 라이트 테마의 기본 잉크이자 능력 구간과 점수판의 고정 야간 배경이다.
- **기록지 아이보리** (#f3f0ea): 라이트 테마의 페이지 바탕이자 야간 면의 고정 전경색이다.
- **기록지 음영** (#e7e2d9): 외관, 전투 루프, 현장 파일처럼 문서 층이 바뀌는 구간에 사용한다.
- **연필 회색** (#59595f): 설명, 보조 문장, 비활성 내비게이션에 사용한다.
- **서류 규칙선** (#b8b3aa): 표, 리본, 목록을 카드 대신 나누는 1px 경계다.

### Tertiary

- **접근성 블루** (#1779c5): 모든 키보드 포커스의 3px 외곽선에만 사용한다. 브랜드 신호와 섞지 않는다.

시스템 다크 테마에서는 기본 잉크와 종이가 각각 밝은 기록색 (#f1eee8)과 경기장 먹색 (#17191f)으로 교대한다. 표면은 (#22252d), 보조 문장은 (#b9b7b2), 작전 코랄은 (#f05b70), 깊은 코랄 텍스트 신호는 (#ff8293), 규칙선은 (#464952), 포커스는 (#69b8f0)으로 전환된다. 고정 야간 면과 고정 아이보리 전경은 테마와 무관하게 유지한다.

**The 단일 신호 Rule.** 코랄은 현재 선택, 작전 전환, 중요한 분류에만 쓴다. 장식용 보조색을 추가하지 않는다.

**The 역할 보존 Rule.** 시스템 테마가 바뀌어도 야간 점수판과 아이보리 기록 전경의 역할은 서로 뒤집지 않는다.

## Typography

**Display Font:** Black Han Sans (with sans-serif)

**Body Font:** Noto Sans KR Variable (with Apple SD Gothic Neo, sans-serif)

**Character:** 검고 압축된 디스플레이 글자는 경기장 전광판의 즉시성을 만들고, 가변 고딕 본문은 작전 규칙과 장문 서사를 차분하게 정리한다. 두 서체의 대비가 인물의 무대 에너지와 현장 기록의 정확성을 동시에 지탱한다.

### Hierarchy

- **Display** (400, clamp(4.4rem, 10vw, 8.6rem), 0.88): 첫 화면의 이름처럼 한 번에 읽혀야 하는 정체성에만 사용한다.
- **Headline** (400, clamp(2.5rem, 6vw, 5.6rem), 1.06): 각 기록 구간의 선언형 제목과 큰 인용에 사용한다.
- **Title** (400, 1.34rem, 1.7): 성격 항목, 현장 파일, 세부 규칙의 소제목에 사용한다.
- **Body** (400, 1rem, 1.7): 한국어 설명과 규칙 본문에 사용하며, 주요 설명 열은 약 58ch에서 66ch 안에 둔다.
- **Label** (760, 0.72rem, 0.14em): WACA 분류, 점수판 머리말, 영문 기록 표식에 사용한다.

**The 제목 압축 Rule.** Black Han Sans는 큰 선언과 카운트 상태에만 쓴다. 긴 본문과 작은 조작 레이블에는 사용하지 않는다.

**The 숫자 정렬 Rule.** 카운트와 작전 지표에는 tabular 숫자를 사용해 기록표의 열이 흔들리지 않게 한다.

## Layout

첫 화면은 최대 1380px 안에서 이름 영역과 점수판을 0.82 대 1.18의 비대칭 두 열로 배치한다. 본문 기록은 최대 1220px, 반복되는 핵심 내용은 최대 1090px로 좁혀 긴 한국어 문장의 읽기 폭을 통제한다. 섹션 간 수직 간격은 `clamp(86px, 12vw, 168px)`를 중심으로 크게 잡고, 내부 정보는 1px 규칙선과 촘촘한 패딩으로 묶는다.

900px 이하에서는 주요 두 열이 한 열로 전환되고, 640px 이하에서는 페이지 여백이 16px로 줄어든다. 8카운트는 8열에서 4열로, 4칸 지표는 2열로, 세부 규칙과 현장 파일은 1열로 재배치된다. 44px 최소 조작 크기와 논리적 읽기 순서는 모든 폭에서 유지한다.

**The 연속 지면 Rule.** 기본 정보 구조는 서로 떨어진 작은 카드 묶음이 아니라, 넓은 섹션과 규칙선이 이어지는 편집 지면으로 만든다.

**The 비대칭 균형 Rule.** 두 열이 필요할 때 같은 폭을 자동으로 선택하지 않는다. 제목, 기록, 능력의 중요도에 따라 0.8 대 1.2 안팎의 긴장을 유지한다.

## Elevation & Depth

깊이는 대부분 먹색, 아이보리, 음영지의 톤 교대와 1px 규칙선으로 만든다. 그림자는 행동과 대표 점수판에만 제한하는 혼합 방식이며, 일반 정보 면과 표 셀에는 그림자를 붙이지 않는다. 고정 헤더는 종이색 90% 혼합과 12px 배경 흐림으로 문서 위에 얇게 떠 있다.

### Shadow Vocabulary

- **행동 신호 광** (`0 12px 28px color-mix(in srgb, var(--accent) 26%, transparent)`): 주요 행동 아래에만 얕은 코랄 잔광을 만든다.
- **점수판 부유** (`0 34px 80px color-mix(in srgb, var(--night) 25%, transparent)`): 첫 화면의 8카운트 보드를 경기장 장비처럼 들어 올린다.

**The 제한된 부유 Rule.** 그림자는 주요 행동과 첫 화면 점수판에만 허용한다. 정보의 위계는 먼저 톤과 규칙선으로 해결한다.

## Shapes

형태 언어는 직선형 기록표 안에 제한된 곡률을 넣는 방식이다. 카운트 셀은 8px, 행동은 10px, 대표 점수판과 능력 면은 14px를 사용한다. 가로 규칙선과 비대칭 그리드가 기본 골격이고, 점수판의 사선 코랄 띠와 포메이션 선이 유일한 반복 장식이다.

**The 세 단계 곡률 Rule.** 작은 조작은 8px, 행동은 10px, 큰 기록 면은 14px만 사용한다. 알약형 모서리와 과도하게 둥근 프로필 카드는 만들지 않는다.

## Components

### Buttons

- **Shape:** 단단한 직사각형 행동은 10px, 카운트 셀은 8px 곡률을 사용한다.
- **Primary:** 깊은 작전 코랄 바탕과 신호 위 아이보리 전경, 좌우 20px 패딩, 최소 높이 48px을 사용한다.
- **Hover / Focus:** 호버에서 압축 코랄로 어두워지고 2px 올라간다. 활성 시 1px 내려가며 0.99배로 줄고, 키보드 포커스에는 접근성 블루 3px 외곽선을 4px 띄워 표시한다.
- **Count:** 야간 면 위의 투명한 아이보리 셀이 선택되면 깊은 작전 코랄 면으로 전환된다. 숫자는 800 굵기와 고정 폭 정렬을 쓴다.

### Chips

- **Style:** 외관 특징 칩은 별도 캡슐 배경 없이 규칙선이 있는 4열 기록표의 셀로 표현한다.
- **State:** 선택 기능이 없는 정적 기록이며, 모바일에서는 2열로 재배치한다.

### Cards / Containers

- **Corner Style:** 대표 점수판과 능력 기록은 14px 곡률을 사용한다.
- **Background:** 작전 면은 경기장 먹색, 긴급 전환 면은 깊은 작전 코랄, 일반 기록은 종이 또는 기록지 음영을 사용한다.
- **Shadow Strategy:** 대표 점수판만 부유 그림자를 갖고, 능력과 정보 면은 색면과 규칙선만 사용한다.
- **Border:** 표와 리본은 1px 서류 규칙선, 야간 세부 구획은 현재 전경색의 35% 혼합선을 사용한다.
- **Internal Padding:** 큰 기록 면은 `clamp(30px, 6vw, 70px)`, 작은 정보 면은 18px에서 30px을 사용한다.

### Navigation

헤더는 최소 높이 68px의 고정형 종이 면이다. 링크는 보조 회색, 0.9rem, 650 굵기, 최소 높이 44px이며 호버에서 기록지 음영과 기본 잉크로 전환된다. 640px 이하에서는 헤더 높이를 60px로 줄이고 WACA 표식을 숨기되 인물명과 세 개의 주요 목적지는 유지한다.

### 8카운트 보드

먹색 14px 면 위에 8개 숫자 셀, 현재 상태 문장, 사선 코랄 신호, 수평 격자와 포메이션 선을 결합한다. 각 셀은 독립 버튼이며 `aria-pressed` 상태를 코랄 면으로 드러낸다. 진입 동작은 감속 곡선으로 840ms 동안 이루어지고, 사용자가 모션 감소를 선택하면 모든 애니메이션과 실질적 전환 시간을 제거한다.

### 능력 기록과 세부 공개

능력 기록은 큰 제목, 4칸 지표, 두 열 설명, 공개 상태의 세부 규칙 순서로 읽힌다. 세부 공개 머리말은 최소 높이 58px이며, 열림 상태에서 더하기 기호를 45도 돌려 닫기 상태와 구분한다. 코랄 능력 면에서는 동일한 구조를 유지하되 모든 전경을 신호 위 아이보리로 바꾼다.

## Do's and Don'ts

### Do:

- **Do** 코랄은 선택, 분류, 작전 전환처럼 의미가 있는 신호에만 사용한다.
- **Do** 긴 한국어 규칙은 큰 선언형 제목, 지표 행, 세부 본문의 순서로 나눈다.
- **Do** 8분할 카운트와 포메이션 선을 세계관과 기능이 만나는 대표 패턴으로 재사용한다.
- **Do** 라이트와 다크 테마에서 키보드 포커스, 44px 최소 조작 크기, 모션 감소를 유지한다.
- **Do** 인물 외관은 텍스트 기록과 기하학으로 표현한다.

### Don't:

- **Don't** 일반적인 작은 프로필 카드 여러 장으로 페이지를 분절하지 않는다.
- **Don't** 코랄과 경쟁하는 장식용 보조색이나 그라데이션 팔레트를 추가하지 않는다.
- **Don't** 초상화, 인물 실루엣, 이미지 자리표시자를 만들지 않는다.
- **Don't** 모든 컨테이너에 그림자나 알약형 모서리를 적용하지 않는다.
- **Don't** 장식 때문에 능력의 범위, 지속, 재사용 대기, 패널티와 파훼 순서를 흐리지 않는다.
