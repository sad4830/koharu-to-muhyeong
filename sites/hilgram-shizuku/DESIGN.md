---
name: "HILGRAM: 미카게 시즈쿠"
description: "정상 운행도처럼 보이는 공개 진술이 봉인 기록에서 단방향 사건 노선으로 재배선되는 캐릭터 프로필 시스템"
colors:
  open-ground: "#f1f1f6"
  open-surface: "#e7e7ef"
  open-surface-strong: "#dcdce7"
  open-ink: "#15151c"
  open-muted: "#555462"
  open-line: "rgba(21, 21, 28, 0.24)"
  open-line-soft: "rgba(21, 21, 28, 0.12)"
  open-accent: "#67439a"
  open-accent-contrast: "#f7f5fb"
  sealed-ground: "#0e0f15"
  sealed-surface: "#171820"
  sealed-surface-strong: "#21222d"
  sealed-ink: "#f0eff5"
  sealed-muted: "#b9b7c3"
  sealed-line: "rgba(240, 239, 245, 0.27)"
  sealed-line-soft: "rgba(240, 239, 245, 0.13)"
  sealed-accent: "#bca4eb"
  sealed-accent-contrast: "#15121a"
typography:
  display:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "clamp(3.3rem, 6.1vw, 5.9rem)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.7rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "clamp(1.25rem, 2.3vw, 2rem)"
    fontWeight: 820
    lineHeight: 1.25
  body:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  route-label:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.09em"
rounded:
  square: "0px"
  node: "999px"
spacing:
  xs: "0.75rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.5rem"
  section: "clamp(4.8rem, 8vw, 8rem)"
components:
  mode-switch:
    backgroundColor: "transparent"
    textColor: "{colors.open-muted}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "0.75rem"
    height: "72px"
  mode-switch-selected-open:
    backgroundColor: "{colors.open-accent}"
    textColor: "{colors.open-accent-contrast}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "0.75rem"
    height: "72px"
  mode-switch-selected-sealed:
    backgroundColor: "{colors.sealed-accent}"
    textColor: "{colors.sealed-accent-contrast}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "0.75rem"
    height: "72px"
  status-toggle-open:
    backgroundColor: "{colors.open-accent}"
    textColor: "{colors.open-accent-contrast}"
    typography: "{typography.route-label}"
    rounded: "{rounded.square}"
    padding: "0.72rem 0.85rem"
  information-board-open:
    backgroundColor: "{colors.open-surface}"
    textColor: "{colors.open-ink}"
    rounded: "{rounded.square}"
    padding: "clamp(2rem, 5vw, 5rem)"
---

# Design System: HILGRAM: 미카게 시즈쿠

## Overview

**Creative North Star: "막차 이후 환승도"**

이 시스템은 차가운 역내 운행도와 인물 포스터를 결합해, 상냥한 공개 진술이 봉인된 단방향 사건 기록으로 바뀌는 순간을 보여 준다. 공개 화면은 라벤더빛 회백색 종이와 낮은 채도의 보라 노선으로 정상 운행을 가장하고, 비밀 화면은 같은 구조를 자정의 차콜 바탕과 자외선빛 노선으로 뒤집는다. 장식은 독립적인 문양이 아니라 정보의 연결 관계를 설명하는 선, 정거장, 칸막이로만 사용한다.

시각 밀도는 중간이고 정보량은 높다. 큰 인물 크롭과 플랫폼 규모의 이름이 첫 화면의 감정적 진입점을 맡고, 이후에는 직각 보드와 넓은 행간, 72자 안팎의 본문 폭으로 긴 제출 기록을 읽게 한다. 공개와 비밀은 서로 다른 사이트가 아니라 동일한 인물의 두 운행 상태이므로 레이아웃 문법은 유지하고 색, 노드 수, 이미지 처리, 증거 노출 순서만 재배선한다.

**Key Characteristics:**

- 차가운 역내 사인과 단방향 노선을 닮은 정보 구조
- 공개 라이트와 비밀 다크가 같은 토큰 역할을 공유하는 이중 상태
- 직각 패널, 1px 칸막이, 원형 정거장 노드의 반복
- 인물 포스터와 압축 영문 노선 라벨의 대비
- 장문의 설정을 스캔과 정독 모두에 맞추는 넓은 여백과 강한 제목 위계

## Colors

공개 상태는 차가운 라벤더 회색 위에 짙은 보라 노선을 놓고, 봉인 상태는 거의 검은 차콜 위에 밝은 라일락 노선을 놓는다.

### Primary

- **Open Route Violet:** 공개 탭의 선택 상태, 노선, 정거장, 포커스 링, 핵심 표식에만 사용한다.
- **Sealed Ultraviolet:** 봉인 상태에서 같은 역할을 이어받아 진실이 드러나는 전환을 강조한다.

### Neutral

- **Open Platform Ground / Surface / Strong Surface:** 공개 기록의 페이지, 정보 보드, 강조 칸을 단계적으로 분리한다.
- **Open Ink / Muted Ink:** 제목과 확정 정보에는 본문 잉크를, 설명과 보조 라벨에는 뮤트 잉크를 사용한다.
- **Sealed Night Ground / Surface / Strong Surface:** 비밀 기록의 자정 배경과 사건 보드, 최종 사상 구간을 구분한다.
- **Sealed Ink / Muted Ink:** 어두운 바탕에서도 같은 정보 위계를 유지한다.
- **Open/Sealed Line:** 모든 표와 보드의 1px 구조선이다. 부드러운 선은 사진 캡션처럼 한 단계 낮은 구획에만 쓴다.

### Named Rules

**The Same Line Rule.** 공개와 비밀에서 색의 역할은 바뀌지 않는다. 바탕, 표면, 잉크, 보조 잉크, 노선 강조색을 일대일로 교체해 동일 인물의 두 상태임을 보존한다.

**The Sparse Signal Rule.** 보라색은 연결, 선택, 진실, 포커스를 뜻할 때만 쓴다. 넓은 면을 무작위로 채우거나 세 번째 강조색을 추가하지 않는다.

## Typography

**Display Font:** Noto Sans KR Variable (with sans-serif fallback)  
**Body Font:** Noto Sans KR Variable (with sans-serif fallback)  
**Label Font:** Barlow Condensed (with sans-serif fallback)

**Character:** 굵고 압축된 한국어 제목은 플랫폼 벽면의 큰 역명처럼 보이고, 좁은 Barlow Condensed 라벨은 노선 코드와 상태 표시를 기계적으로 정리한다. 본문은 같은 Noto Sans KR 계열의 규칙적인 획과 넓은 행간으로 긴 서사의 피로를 줄인다.

### Hierarchy

- **Display:** 최상단 인물명에만 사용한다. 아주 굵고 촘촘하며 한 줄 길이를 짧게 제한한다.
- **Headline:** 프로필 구간, 사건 경로, 사상 질문의 대형 제목에 사용한다.
- **Title:** 성격 키워드, 보드 내부 제목, 사건 정거장명에 사용한다.
- **Body:** 일반 기록은 기본 행간을 사용하고, 장문 분석과 과거사는 행간을 2까지 넓혀 최대 72ch 안에서 읽힌다.
- **Route Label:** 영문 상태, 노선 코드, 수치 표시에 사용하며 좁은 글자폭과 자간으로 본문과 명확히 구분한다.

### Named Rules

**The Platform Scale Rule.** 대형 한국어 제목은 짧고 결정적인 문구에만 허용한다. 설명 문장을 큰 글씨로 늘리거나 모든 구간을 같은 크기로 외치지 않는다.

**The Two-Family Rule.** 한국어 정보는 Noto Sans KR, 영문 운행 코드와 수치는 Barlow Condensed를 사용한다. 별도의 장식 서체는 추가하지 않는다.

## Layout

최대 페이지 폭은 1540px, 장문 콘텐츠 폭은 1240px이다. 데스크톱 첫 화면은 인물 포스터와 운행 보드를 약 1.18:0.82로 나누며, 860px 이하에서는 운행 보드를 먼저 보여 주고 인물 포스터를 아래에 쌓는다. 1100px에서는 헤더의 설명을 숨기고, 860px에서는 신원·분석·사건 경로를 2열 또는 1열로 줄이며, 600px에서는 대부분의 보드를 완전한 단일 열로 바꾼다. 360px 이하에서는 탭 보조 문구를 숨겨 터치 목표를 유지한다.

헤더는 68px 높이로 고정되며 모바일에서는 60px로 줄고, 스크롤 중에도 현재 공개 범위와 전환 버튼을 유지한다. 본문 구간은 큰 수직 리듬을 사용하고, 칸 내부는 0.75rem에서 2.5rem 사이의 밀도로 운용한다. 노선은 데스크톱에서 가로 또는 세로 축으로 흐르며, 선 위의 원형 노드가 항목 수와 사건 순서를 직접 나타낸다.

**The Route Before Card Rule.** 정보는 둥근 카드 묶음으로 분절하지 않는다. 먼저 하나의 선형 경로와 큰 보드를 만들고, 1px 경계로 내부 칸을 나눈다.

## Elevation & Depth

기본은 평면이다. 깊이는 색조가 다른 표면, 1px 구조선, 사진의 명암 처리로 만든다. 그림자는 끈적이는 헤더 아래의 매우 얕은 분리와 인물 사진 내부의 가장자리 음영에만 쓰며, 보드나 버튼을 떠 있는 카드처럼 만들지 않는다.

### Shadow Vocabulary

- **Header Separation:** 헤더가 문서 위에 고정되어 있음을 알리는 낮고 넓은 음영이다.
- **Portrait Edge:** 인물 포스터 안쪽 가장자리를 보드와 분리하는 내부 음영이다.

### Named Rules

**The Flat Station Rule.** 정적인 정보 표면에는 그림자를 쓰지 않는다. 위계가 필요하면 표면 단계와 선 굵기, 여백을 먼저 조정한다.

## Shapes

보드, 탭, 상태 버튼, 표는 모두 직각이다. 둥근 형태는 노선의 정거장, 탭 코드 배지, 사건 순번처럼 경로의 지점을 뜻할 때만 사용한다. 구조선은 보통 1px이고, 활성 구간의 밑줄이나 정거장 테두리만 2px에서 3px로 굵어진다. 인물 사진은 별도 둥근 프레임 없이 보드의 한 면 전체를 차지한다.

**The Circle Means Stop Rule.** 원은 정거장 또는 순번이라는 의미를 가져야 한다. 일반 컨테이너, 버튼 모서리, 장식 배경에 원형을 남용하지 않는다.

## Components

### Mode Switch

- **Shape:** 직각 2열 탭이며 각 탭의 최소 높이는 72px, 모바일은 62px이다.
- **Default:** 투명 바탕과 보조 잉크를 사용하고, 두 상태 사이를 1px 선으로 나눈다.
- **Selected:** 현재 상태의 노선 강조색으로 면 전체를 채우고 강조 대비색을 사용한다.
- **Hover / Focus:** 호버는 한 단계 강한 표면으로 바꾸고, 포커스는 3px 강조색 외곽선을 4px 떨어뜨려 표시한다. 좌우 화살표와 Home/End 키 조작을 지원한다.

### Sticky Status Toggle

- **Shape:** 헤더 우측의 직각 소형 버튼이다.
- **State:** `OPEN LINE`과 `SEALED LINE`을 표시하며 페이지 어디서나 반대 기록으로 전환한다.
- **Behavior:** 눌림은 1px 수직 이동, 호버는 밝기 변화만 사용한다. 현재 모드는 URL의 기록 쿼리에도 반영된다.

### Information Boards

- **Corner Style:** 모든 모서리는 직각이다.
- **Background:** 기본 바탕 위에 surface 또는 surface-strong 단계만 사용한다.
- **Border:** 상단·좌측 외곽선과 셀별 우측·하단 1px 선으로 하나의 연속 표를 만든다.
- **Internal Padding:** 일반 셀은 1.2rem에서 2.5rem, 사건 보드는 화면 폭에 따라 더 넓어진다.

### Route Nodes and Timeline Stops

- **Style:** 강조색 3px 테두리, 현재 바탕색 내부, 완전한 원형이다.
- **Meaning:** 공개 첫 화면은 네 정거장, 봉인 첫 화면은 일곱 정거장으로 상태 변화를 즉시 보여 준다.
- **Sequence:** 사건 타임라인에서는 세로 노선과 번호 배지가 한 방향으로만 이어진다.

### Transfer Board

- **Style:** 봉인 탭 바로 아래에만 나타나는 직각 2열 보드다.
- **Content:** 소재 고지를 먼저 제시하고 `3개의 모순`과 `7개의 선택` 앵커를 같은 화면에서 제공한다.
- **State:** 링크 호버는 텍스트 밑줄만 추가해 정보 보드의 안정성을 유지한다.

### History Disclosure

- **Style:** 위아래 구조선 사이의 전체 너비 summary다.
- **Behavior:** 우측의 더하기 표식이 열릴 때 수평선으로 회전한다. 장문은 최대 72ch이며 기본적으로 접혀 있다.

### Motion

첫 진입에서는 인물 포스터가 가로로 드러나고, 노선이 그려진 뒤, 정보 보드가 짧게 상승한다. 공개·비밀 전환은 배경과 텍스트 색을 320ms에서 480ms 사이에 바꾸고, 인물 사진은 채도·대비·크롭을 480ms에서 700ms 사이에 조정한다. `prefers-reduced-motion: reduce`에서는 진입 애니메이션, 부드러운 스크롤, 상태 전환을 제거한다.

## Do's and Don'ts

### Do:

- **Do** 공개와 봉인 상태에 동일한 정보 구조와 토큰 역할을 유지한다.
- **Do** 직각 보드, 1px 구획선, 의미 있는 원형 정거장으로 정보를 연결한다.
- **Do** 한국어 장문은 최대 72ch와 넓은 행간으로 제한하고 모바일에서 단일 열로 재배치한다.
- **Do** 모든 전환에 키보드 포커스, 정확한 상태 전달, 모션 감소 대체를 함께 제공한다.
- **Do** 인물 이미지에는 참고 범위, 공식 복장과의 차이, 픽크루 출처를 가까이 표시한다.

### Don't:

- **Don't** 둥근 프로필 카드, 유리 질감, 과한 그림자, 떠 있는 카드 묶음으로 운행도 문법을 희석한다.
- **Don't** 보라색 외의 경쟁 강조색이나 의미 없는 장식 노드를 추가한다.
- **Don't** 공개 라이트와 비밀 다크를 별개 브랜드처럼 재설계하거나 색만 바꾼 채 사건 구조를 숨긴다.
- **Don't** 압축 영문 라벨 서체를 한국어 본문이나 긴 문장에 사용한다.
- **Don't** 긴 과거사를 첫 화면에 그대로 펼치거나 인물 이미지의 용도와 출처를 분리한다.
