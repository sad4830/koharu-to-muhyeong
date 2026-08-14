---
name: "Mikage Shizuku / HILGRAM"
description: "A restrained photo-restoration record where considerate memory and coercive preservation share one visual grammar."
colors:
  public-bg: "#f5f3f7"
  public-surface: "#fcfbfd"
  public-surface-strong: "#ffffff"
  public-text: "#24212b"
  public-muted: "#625d6c"
  public-line: "#d8d1df"
  public-line-strong: "#b9aec2"
  public-accent: "#694b7d"
  public-accent-soft: "#e9ddf1"
  public-accent-ink: "#4f3560"
  public-button: "#67457f"
  public-button-text: "#ffffff"
  secret-bg: "#1f1b23"
  secret-surface: "#27222c"
  secret-surface-strong: "#2c2631"
  secret-text: "#f7f3fa"
  secret-muted: "#c8bdcc"
  secret-line: "#493e4d"
  secret-line-strong: "#68596d"
  secret-accent: "#d6bee7"
  secret-accent-soft: "#342a3d"
  secret-accent-ink: "#ecdef5"
  secret-button: "#d9c2e8"
  secret-button-text: "#24182c"
typography:
  display:
    fontFamily: "Shizuku Serif, Noto Serif KR, Noto Serif JP, serif"
    fontSize: "clamp(4.2rem, 7.4vw, 6rem)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Pretendard Variable, Pretendard, Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.5vw, 4.9rem)"
    fontWeight: 780
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Pretendard Variable, Pretendard, Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, system-ui, sans-serif"
    fontSize: "clamp(1.7rem, 3vw, 2.4rem)"
    fontWeight: 760
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Pretendard Variable, Pretendard, Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.25vw, 1.08rem)"
    fontWeight: 400
    lineHeight: 1.9
    letterSpacing: "normal"
  label:
    fontFamily: "Pretendard Variable, Pretendard, Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 800
    lineHeight: 1.55
    letterSpacing: "0.08em"
rounded:
  control: "10px"
  action: "12px"
  surface: "14px"
  pill: "999px"
spacing:
  switch-gap: "4px"
  compact: "8px"
  control: "12px"
  inset: "18px"
  content: "24px"
  group: "30px"
  section: "clamp(56px, 7vw, 88px)"
components:
  view-switcher:
    backgroundColor: "{colors.public-surface}"
    textColor: "{colors.public-muted}"
    rounded: "{rounded.surface}"
    padding: "4px"
  view-switcher-active:
    backgroundColor: "{colors.public-text}"
    textColor: "{colors.public-bg}"
    rounded: "{rounded.control}"
  button-primary:
    backgroundColor: "{colors.secret-button}"
    textColor: "{colors.secret-button-text}"
    rounded: "{rounded.action}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.secret-text}"
    rounded: "{rounded.action}"
    padding: "12px 20px"
  restoration-panel:
    backgroundColor: "{colors.secret-accent-soft}"
    textColor: "{colors.secret-text}"
    rounded: "{rounded.surface}"
    padding: "clamp(34px, 5vw, 54px)"
---

# Design System: Mikage Shizuku / HILGRAM

## Overview

**Creative North Star: "복원 기록의 여백"**

이 시스템은 모던한 사진 복원 기록처럼 보인다. 흐린 흰 종이와 먹회색 화면, 절제된 라일락 한 색, 넓게 남긴 여백이 인물과 문장을 먼저 보이게 한다. 장식은 복원의 정밀함을 암시하는 1px 크롭 마크와 음성 기록선, 한 쌍의 초상 평행선, 기록 번호에 한정하며, 중간 정도의 장식성은 유지하되 과시적으로 번쩍이지 않는다.

공개와 비밀은 서로 다른 장식 세계가 아니라 같은 습관의 밝고 어두운 판본이다. 동일한 구조와 의미 역할을 유지한 채 토큰만 전환해, 친절한 기억이 통제적 보존으로 바뀌는 순간을 사용자가 직접 열어 보게 한다. 피, 칼, 범죄 현장 테이프, 강한 글리치 같은 흔한 범죄 서류 연출은 쓰지 않는다.

**Key Characteristics:**

- 흐린 종이와 먹회색을 오가는 동일한 의미 토큰
- 한 번에 한 목소리만 내는 절제된 라일락
- 사진 복원용 여백, 14px 표면, 1px 크롭·음성 기록선
- 세리프 이름표와 가독성 높은 산세리프 기록문의 대비
- 색뿐 아니라 라벨, 버튼 상태, 명시적 관문으로 구분되는 공개와 비밀

## Colors

팔레트는 공개 상태의 흐린 종이와 비밀 상태의 먹회색 보관실을 같은 라일락 계열로 묶는다. 각 테마는 배경, 표면, 본문, 보조문, 선, 강조, 버튼 역할을 일대일로 유지한다.

### Primary

- **보존 라일락** (`public-accent`, `public-button`): 공개 상태의 캐치프레이즈, 링크, 키워드와 결정적 동작에만 사용한다.
- **복원 라일락** (`secret-accent`, `secret-button`): 어두운 상태에서 같은 의미를 더 밝은 명도로 이어 간다.

### Neutral

- **흐린 복원지** (`public-bg`, `public-surface`, `public-surface-strong`): 페이지, 반투명 상단 바, 강조 기록 면을 단계적으로 구분한다.
- **먹회색 보관실** (`secret-bg`, `secret-surface`, `secret-surface-strong`): 비밀 상태의 동일한 세 층이며, 새 장식이 아니라 밝기 반전으로 전환을 알린다.
- **기록 먹색** (`public-text`, `public-muted`)과 **복원 백색** (`secret-text`, `secret-muted`): 제목과 긴 본문의 위계를 담당한다.
- **평행 기록선** (`public-line`, `public-line-strong`, `secret-line`, `secret-line-strong`): 1px 구획과 2px 화살표에만 사용한다.
- **라일락 워시** (`public-accent-soft`, `secret-accent-soft`): 요약처럼 의미상 한 단계 압축된 기록 면을 만든다.

**The One Lilac Rule.** 라일락은 정보의 핵심, 현재 상태, 복원 표시를 위한 한 목소리다. 큰 면적의 장식 배경으로 확장하지 않는다.

**The Semantic Mirror Rule.** 공개와 비밀은 동일한 의미 역할을 동일한 위치에서 교체한다. 색만 달라져도 정보 구조와 조작 방식은 바뀌지 않는다.

## Typography

**Display Font:** Shizuku Serif, 로컬 `/fonts/noto-serif-kr-shizuku.woff`를 `font-weight: 700`으로 셀프 호스팅하고 Noto Serif KR, Noto Serif JP, serif로 폴백한다.

**Body Font:** Pretendard Variable, Pretendard, Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, system-ui, sans-serif.

**Character:** 이름은 묵직한 복원 인장처럼 세리프로 남기고, 기록과 조작은 중립적인 산세리프로 읽힌다. 장식성은 서체 교체보다 크기, 무게, 여백의 대비에서 나온다.

### Hierarchy

- **Display** (`700`, `clamp(4.2rem, 7.4vw, 6rem)`, `1.03`): 첫 화면의 인물명에만 사용한다. 모바일은 `clamp(3.2rem, 16vw, 4.8rem)`으로 재조정한다.
- **Headline** (`780`, `clamp(2.6rem, 5.5vw, 4.9rem)`, `1.08`): 비밀 기록 관문의 경고 제목처럼 한 번의 중요한 판단에 사용한다.
- **Title** (`760`, `clamp(1.7rem, 3vw, 2.4rem)`, `1.25`): 기록 섹션 제목이다.
- **Body** (`400`, `clamp(1rem, 1.25vw, 1.08rem)`, `1.9`): 한국어 장문은 최대 `72ch`, `text-wrap: pretty`, `word-break: keep-all`을 사용한다.
- **Label** (`700–850`, `0.68rem–0.96rem`, 최대 `0.12em`): 메타데이터와 기록 번호에는 높은 무게와 제한된 자간을 사용한다.

**The Name Is the Seal Rule.** 셀프 호스팅 세리프는 인물명과 워드마크에만 사용한다. 본문이나 인터페이스 전반으로 번지지 않는다.

## Layout

데스크톱 본문은 최대 `1480px`의 두 열 그리드다. 초상 열은 `minmax(350px, 0.88fr)`, 기록 열은 `minmax(0, 1.12fr)`로 약 42:58을 이루며, 열 간격은 `clamp(54px, 7vw, 118px)`이다. 초상은 상단에서 `100px` 떨어진 위치에 고정되고, 오른쪽 인트로는 `calc(100dvh - 128px)`의 첫 화면 안에서 이름과 한 문장을 중앙에 놓는다. 전체 좌우 여백은 `clamp(24px, 4vw, 64px)`이고 섹션 리듬은 `clamp(56px, 7vw, 88px)`이다.

`980px` 이하에서는 열 비율과 간격을 줄이고 복잡한 내부 그리드를 단순화한다. `760px` 이하에서는 한 열로 전환해 초상, 기본 사실, 이름, 문장을 순서대로 쌓고, 초상은 최대 `230px`, 페이지 여백은 `18px`이 된다. 비밀 관문에서는 초상을 감춰 판단 문장과 동작을 먼저 보인다. `430px` 이하에서는 기록 행을 한 열로 바꾸고 관문 버튼을 전체 너비로 쌓는다.

**The Restoration Margin Rule.** 여백은 비어 있는 장식이 아니라 사진과 기록을 분리하는 작업 공간이다. 새로운 모듈이 생겨도 핵심 콘텐츠 폭과 섹션 호흡을 먼저 보존한다.

## Elevation & Depth

기본 구조는 1px 선과 색조 레이어로 평평하게 유지한다. 초상 프레임에만 공개 상태 `0 24px 70px rgba(65, 45, 77, 0.13)`, 비밀 상태 `0 26px 74px rgba(7, 4, 9, 0.38)`의 넓고 낮은 그림자를 사용한다. 사상 패널은 `0 18px 54px color-mix(in srgb, var(--accent) 8%, transparent)`으로 더 약하게 떠오른다. 상단 바의 `16px` 블러는 문맥을 잃지 않는 고정 탐색을 위한 것이며, 투명도 감소 설정에서는 즉시 단색 배경으로 바뀐다.

**The Flat Record Rule.** 카드마다 그림자를 주지 않는다. 깊이는 초상, 결정적 사상 패널, 고정 상단 바에만 허용한다.

## Shapes

주요 표면은 부드럽지만 장난스럽지 않은 `14px` 모서리를 공유한다. 관문 버튼은 `12px`, 스위처 내부 상태는 `10px`, 스크롤 손잡이와 평행선 끝은 `999px`이다. 구획은 대부분 1px 직선이며, 사진 프레임 안쪽 `16px` 위치의 길이 `28px`, 두께 `1px` 크롭 마크와 길이 `76px`, 두께 `2px`의 두 평행선이 복원 기록의 반복 서명이다. 음성 기록 위의 평행선은 길이 `72px`와 `46px`, 두께 `1px`다.

**The One-Pixel Evidence Rule.** 선은 장식 테두리가 아니라 기록의 구획과 정렬 증거다. 크롭 마크, 평행선, 행 구분 외에 두꺼운 프레임을 추가하지 않는다.

## Components

### View Switcher

- **Shape:** 외곽은 `14px`, 내부 상태는 `10px`; `4px` 간격과 패딩을 가진 세 칸 그리드다.
- **State:** 기본은 보조문 색, 현재 페이지는 본문색 배경과 페이지 배경색 글자로 반전한다. 버튼은 최소 `44px` 높이를 유지한다.
- **Motion:** 색과 배경은 `180ms ease`, 누름은 아래로 `1px`; 포커스는 전역 `3px` 라일락 외곽선과 `4px` 오프셋이다.

### Portrait Frame

- **Shape:** 정사각형, `14px` 모서리, `overflow: hidden`; 이미지는 `contain`, 상단 중앙 정렬이다.
- **Signature:** 안쪽 `16px`의 1px 크롭 마크, 우하단의 두 평행선, 상단 기록 메타데이터를 겹친다.
- **Theme:** 비밀 상태에서 이미지는 `saturate(0.76) contrast(1.05) brightness(0.82)`와 `scale(1.01)`로 조용히 어두워진다.

### Record Rows and Grids

- **Structure:** 기록 행은 `minmax(112px, 0.36fr) / 1fr`, `26px` 간격, 상하 `20px` 패딩과 1px 구분선을 사용한다.
- **Responsive:** `760px` 이하에서는 라벨 열을 `104px`로 줄이고, `430px` 이하에서는 한 열과 `5px` 간격으로 쌓는다.

### Restoration Panels

- **Summary:** 라일락 워시 배경, `14px` 모서리, `clamp(34px, 5vw, 54px)` 내부 여백으로 요약 기록을 묶는다.
- **Ideology:** 강한 표면색과 매우 약한 라일락 그림자로 핵심 사상을 분리한다.

### Gate Actions

- **Primary:** 비밀 버튼색 면과 대비 글자, `12px 20px`, 최소 높이 `48px`, `12px` 모서리다.
- **Secondary:** 투명 배경과 강한 구분선으로 되돌아가기 동작을 제공한다.
- **States:** `160ms ease`로 배경과 색을 바꾸며, 눌림은 아래로 `1px` 이동한다. `430px` 이하에서는 두 버튼 모두 전체 너비다.

### Disclosure Rows

- **Structure:** 위아래 1px 선 사이에 최소 `58px` 높이의 요약 행을 둔다.
- **Indicator:** 라일락 2px 직각선을 회전해 열림과 닫힘을 표현하며 `180ms ease`로 전환한다.

### View Transition

- **Entry:** 콘텐츠는 `430ms cubic-bezier(0.16, 1, 0.3, 1)` 동안 `18px` 아래와 `5px` 블러에서 복원된다. 초상은 같은 이징으로 `620ms` 클립 리빌을 사용한다.
- **Theme:** 배경과 글자, 이미지 필터는 `280ms ease`; 초상 확대는 `500ms cubic-bezier(0.16, 1, 0.3, 1)`이다.
- **Reduced motion:** `prefers-reduced-motion: reduce`에서는 모든 애니메이션과 관련 전환을 제거한다.

## Do's and Don'ts

### Do:

- **Do** 공개와 비밀에 동일한 구조와 의미 역할을 유지하고, 정확한 테마 토큰으로 상태를 바꾼다.
- **Do** 라일락을 현재 상태, 핵심 문장, 복원 표시처럼 해석에 필요한 지점에만 쓴다.
- **Do** 14px 표면, 1px 기록선, 넓은 여백을 함께 사용해 모던한 사진 복원 기록의 인상을 유지한다.
- **Do** 상태를 색뿐 아니라 텍스트 라벨, `aria-current`, 명시적 관문 동작으로 전달한다.

### Don't:

- **Don't** 피, 칼, 범죄 현장 테이프, 강한 글리치로 비밀이나 폭력을 장식한다.
- **Don't** 모든 섹션을 카드화하거나 그림자로 띄워 기록의 연속성을 끊는다.
- **Don't** 세리프를 본문과 조작부까지 확장하거나 라일락을 다색 장식 팔레트로 늘린다.
- **Don't** 모션 감소와 투명도 감소 설정을 우회한다.
