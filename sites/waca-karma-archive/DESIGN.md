---
name: "WACA: Karma Archive"
description: "봉인된 업경 기록을 여는 의식적 WACA 판단 서류 시스템"
colors:
  archive-black: "#090707"
  archive-black-deep: "#050404"
  dossier-surface: "#120d0e"
  dossier-surface-raised: "#1a1214"
  funeral-ivory: "#f2eadc"
  funeral-ivory-strong: "#fff9ed"
  testimony-muted: "#c6b7aa"
  record-faint: "#8b7c73"
  record-line: "rgba(242, 234, 220, 0.18)"
  record-line-strong: "rgba(242, 234, 220, 0.42)"
  coagulated-red: "#ad1937"
  coagulated-red-dark: "#671023"
  coagulated-red-deep: "#4d0817"
  verdict-red: "#ff5a68"
  ark-afterglow: "#7bd6ce"
  ark-afterglow-dark: "#123d3b"
  record-paper: "#ece2d1"
  record-paper-ink: "#241719"
typography:
  display:
    fontFamily: "Noto Serif KR, Batang, serif"
    fontSize: "clamp(4.5rem, 8vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Noto Serif KR, Batang, serif"
    fontSize: "clamp(2.8rem, 6vw, 5.6rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Noto Serif KR, Batang, serif"
    fontSize: "clamp(2rem, 4vw, 4.3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Noto Sans CJK KR, Apple SD Gothic Neo, Malgun Gothic, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "SFMono-Regular, Cascadia Mono, Roboto Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.75
    letterSpacing: "0.1em"
  action:
    fontFamily: "Noto Sans CJK KR, Apple SD Gothic Neo, Malgun Gothic, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 800
    lineHeight: 1.75
    letterSpacing: "normal"
rounded:
  none: "0px"
  circle: "50%"
  petal: "100% 0 100% 0"
spacing:
  compact: "0.5rem"
  control: "0.85rem 1.25rem"
  ledger: "1.5rem"
  block: "2rem"
  section: "clamp(7rem, 12vw, 12rem)"
  page-inline: "max(5vw, calc((100vw - 1440px) / 2))"
components:
  button-primary:
    backgroundColor: "{colors.coagulated-red}"
    textColor: "{colors.funeral-ivory-strong}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "{spacing.control}"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.verdict-red}"
    textColor: "{colors.archive-black-deep}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.funeral-ivory}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "{spacing.control}"
    height: "52px"
  button-seal:
    backgroundColor: "transparent"
    textColor: "{colors.funeral-ivory-strong}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "0.9rem 1.5rem"
    height: "56px"
  archive-nav:
    backgroundColor: "{colors.archive-black}"
    textColor: "{colors.testimony-muted}"
    rounded: "{rounded.none}"
    height: "64px"
  classification-card:
    backgroundColor: "{colors.coagulated-red}"
    textColor: "{colors.funeral-ivory-strong}"
    rounded: "{rounded.none}"
    padding: "2.25rem"
  disclosure-row:
    backgroundColor: "{colors.record-paper}"
    textColor: "{colors.record-paper-ink}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "0.85rem 0"
    height: "52px"
  ledger-row:
    backgroundColor: "transparent"
    textColor: "{colors.funeral-ivory-strong}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "1.1rem 0"
  petal-gauge-active:
    backgroundColor: "{colors.coagulated-red}"
    textColor: "{colors.coagulated-red}"
    rounded: "{rounded.petal}"
    size: "24px 38px"
  music-console:
    backgroundColor: "{colors.archive-black-deep}"
    textColor: "{colors.funeral-ivory-strong}"
    rounded: "{rounded.none}"
    width: "min(365px, calc(100vw - 2rem))"
---

# Design System: WACA Karma Archive

## Overview

**Creative North Star: "봉인된 업경 기록"**

이 시스템은 WACA의 심판 서류를 봉인 해제하는 경험이자, 한 사람의 생일 기록과 사망 기록이 겹쳐 보이는 의식이다. 검은 기록층 위에 장례의 상아 활자와 응고된 적색 판결을 놓고, ARK 잔광만이 기계적으로 사실을 증명한다. 분위기는 ceremonial, forensic, elegiac, restrained의 순서로 작동한다. 먼저 입장 의식을 만들고, 다음으로 판독 가능한 증거를 제시하며, 마지막에 애도와 생존의 여운을 남긴다.

화면은 감정적이지만 감상적으로 흐르지 않는다. 큰 명조 제목과 긴 정적, 얇은 기록선과 수치표, 먹빛과 상아색 기록지의 급격한 전환이 서사를 운반한다. 모든 표면과 조작부는 severe, tactile, dossier-like, square-edged를 기준으로 하며, 둥근 형태는 거울, 결손 원, 촛불, 여섯 꽃잎처럼 증거가 되는 상징에만 허용한다. 인물 초상이나 외부 풍경 이미지는 사용하지 않고 외관도 기록문으로만 남긴다.

**Key Characteristics:**

- 검은 기록층과 상아색 증거지 사이의 판결 전환
- 응고된 적색 봉인과 희소한 ARK 잔광
- 명조 서사, 고딕 본문, 모노스페이스 증거 라벨의 엄격한 역할 분담
- 직각 표면, 1px 기록선, 증거에만 허용되는 원과 꽃잎
- 평평한 색면 중첩과 음악 콘솔에만 허용되는 지속적 elevation

## Colors

먹빛 기록지와 장례의 상아가 독해의 바탕을 만들고, 응고된 적색이 봉인과 판결을, ARK 잔광이 검증된 시스템 상태를 맡는다.

### Primary

- **응고된 적색** (`coagulated-red`, `#ad1937`): 개봉 행동, II등급 판정판, 활성 꽃잎처럼 사람이 내린 결정에 사용한다.
- **응고된 적색 음영** (`coagulated-red-dark`, `#671023`): 적색 표면 안의 낮은 대비와 연결 상태에 사용한다.
- **응고된 적색 봉인** (`coagulated-red-deep`, `#4d0817`): 봉인 구역 전체를 점유하는 깊은 배경이며 링크와 인용의 잉크로도 재사용한다.
- **응고된 적색 판결** (`verdict-red`, `#ff5a68`): 경고 라벨, 시간 오류, hover, 활성 신호처럼 즉시 판독되어야 하는 적색이다.

### Secondary

- **ARK 잔광** (`ark-afterglow`, `#7bd6ce`): 초점 윤곽, 기록 범위 라벨, 공식 영상 링크 등 기계가 확인한 상태에만 사용한다.
- **ARK 잔광 심부** (`ark-afterglow-dark`, `#123d3b`): 잔광의 저채도 배경이나 어두운 시스템 상태를 위한 보조색이다.

### Neutral

- **먹빛 기록지** (`archive-black`, `#090707`): 공개 기록의 기본 배경이다.
- **먹빛 기록지 심부** (`archive-black-deep`, `#050404`): 입장 게이트와 최종 판정처럼 가장 닫힌 장면을 만든다.
- **먹빛 기록층** (`dossier-surface`, `#120d0e`): 인접 섹션을 분리하는 평평한 tonal layer다.
- **먹빛 기록층 상부** (`dossier-surface-raised`, `#1a1214`): 원형 증거물 안쪽처럼 같은 재료에서 한 단계 밝은 면을 만든다.
- **장례의 상아** (`funeral-ivory`, `#f2eadc`): 어두운 기록지 위의 본문과 선의 기준색이다.
- **장례의 상아 선명** (`funeral-ivory-strong`, `#fff9ed`): 제목과 핵심 판정처럼 최대 대비가 필요한 활자에 사용한다.
- **퇴색한 증언** (`testimony-muted`, `#c6b7aa`): 설명문, 긴 본문, 보조 내비게이션에 사용한다.
- **낡은 기록** (`record-faint`, `#8b7c73`): 각주, 크레디트, 정의 목록의 항목명에 사용한다.
- **상아색 기록선** (`record-line`, `rgba(242, 234, 220, 0.18)`): 기본 구획선이다.
- **상아색 기록선 강조** (`record-line-strong`, `rgba(242, 234, 220, 0.42)`): 장부의 시작과 중요한 경계에 사용한다.
- **장례의 상아 기록지** (`record-paper`, `#ece2d1`): 능력 판정과 봉인 해제 후 증거 문서를 위한 밝은 표면이다.
- **먹빛 기록 잉크** (`record-paper-ink`, `#241719`): 상아색 기록지 위의 본문과 굵은 기록선에 사용한다.

### Named Rules

**The Sealed Verdict Rule.** 응고된 적색은 봉인, 판결, 오류, 활성 상태에만 쓴다. 넓은 장식색으로 소비하지 않는다.

**The ARK Is Evidence Rule.** ARK 잔광은 시스템이 확인한 정보와 접근성 초점에만 쓴다. 감정적 장식이나 넓은 배경으로 확장하지 않는다.

## Typography

**Display Font:** Noto Serif KR with Batang and serif fallback  
**Body Font:** Noto Sans CJK KR with Apple SD Gothic Neo, Malgun Gothic, and system sans-serif fallback  
**Label/Mono Font:** SFMono-Regular with Cascadia Mono, Roboto Mono, and ui-monospace fallback

**Character:** 명조는 기억, 고백, 판결문처럼 오래 남는 문장을 들고, 고딕은 긴 기록을 피로 없이 읽게 한다. 모노스페이스는 사건 코드, 시간, 등급, ARK 상태처럼 증거성이 있는 짧은 데이터에만 개입한다.

### Hierarchy

- **Display** (700, `clamp(4.5rem, 8vw, 6rem)`, `0.98`): 첫 화면의 인명과 봉인 장면의 단일 판결에 사용한다.
- **Headline** (700, `clamp(2.8rem, 6vw, 5.6rem)`, `1.12`): 주요 기록 구간의 제목이다.
- **Title** (700, `clamp(2rem, 4vw, 4.3rem)`, `1.15`): 사건 장, 능력명, 관계 기록의 서사 단위를 구분한다.
- **Body** (400, `1rem`, `1.75`): 기본 기록문이다. 긴 본문은 대체로 68ch에서 70ch를 넘지 않고 서사 구간에서는 행간을 1.9에서 2.05까지 넓힌다.
- **Label** (600, `0.72rem`, `0.1em`): 사건 코드, 문서 범위, 판정 상태를 짧고 성긴 대문자 리듬으로 표기한다.

### Named Rules

**The Serif Bears Memory Rule.** 감정과 기억을 운반하는 제목, 능력명, 판결 인용은 명조로 쓴다. 설명 UI까지 명조로 확장하지 않는다.

**The Monospace Proves, Never Performs Rule.** 모노스페이스는 증거 라벨과 수치에만 쓴다. 분위기를 만들기 위한 장식 활자로 사용하지 않는다.

## Layout

전체 페이지는 `max(5vw, calc((100vw - 1440px) / 2))`의 유동 인라인 여백을 기준으로 하고, 주요 장부와 사건 흐름은 1080px에서 1180px 사이의 읽기 폭에 고정한다. 섹션은 대체로 `clamp(7rem, 12vw, 12rem)`의 큰 수직 호흡을 사용한다. 제목 블록은 좁은 증거 라벨 열과 넓은 서사 제목 열을 비대칭으로 맞추고, 본문은 68ch에서 70ch 안에서 멈춘다.

데스크톱 게이트는 사건 색인, 본문, 결손 원의 세 열로 열리고, 이후 장부는 2열 정의 목록과 비대칭 능력 구성을 교차한다. 같은 크기의 카드 반복 대신 기록선, 여백, 색면 전환으로 묶음을 만든다. 980px 이하에서는 게이트와 주요 2열 구성이 단일 열로 접히고, 640px 이하에서는 페이지 여백이 1.15rem으로 고정되며 장부, 사건 타임라인, 증거 표, 판정표가 모두 한 열로 바뀐다.

상단 고정 내비게이션은 데스크톱에서 64px 높이를 유지한다. 640px 이하에서는 안전 영역을 포함한 하단 4분할 내비게이션으로 이동하고, 음악 콘솔은 그 위에 떠서 본문과 조작부를 가리지 않는다.

## Elevation & Depth

기본 시스템은 그림자 없이 평평하다. 깊이는 먹빛 기록층의 단계, 상아색 증거지로의 급격한 전환, 1px 선, 결손 원의 중첩, 큰 여백으로 만든다. 재사용 가능한 그림자는 지속적으로 화면 위에 머무는 음악 콘솔에만 허용한다. 발광하는 상태점과 마지막 불씨는 elevation이 아니라 국소 신호이므로 표면 그림자로 확장하지 않는다.

### Shadow Vocabulary

- **Persistent Music Console** (`box-shadow: 0 20px 65px rgba(0, 0, 0, 0.55)`): 고정 재생 패널이 기록 본문과 충돌하지 않도록 분리할 때만 사용한다.

### Named Rules

**The Flat Dossier Rule.** 문서 표면은 색면과 기록선으로 분리한다. 카드, 버튼, 내비게이션에 임의의 drop shadow를 추가하지 않는다.

## Shapes

조작부, 카드, 내비게이션, 콘솔은 모두 직각이다. 경계는 대부분 1px이며 상위 장부의 시작만 더 강한 선을 쓴다. 재료는 잘린 종이와 봉인판처럼 보여야 하며 부드러운 앱 카드처럼 보이면 안 된다.

원은 거울, 결손된 시간, 촛불, 판정 궤도처럼 서사적 증거를 표시할 때만 쓴다. 꽃잎의 `100% 0 100% 0` 형태는 《업경: 여섯 고백》의 충전 상태 전용이다. 45도 회전한 작은 사각형은 사건 타임라인의 증거점이며, 일반 chip이나 장식으로 재사용하지 않는다.

**The Evidence Owns Curves Rule.** 둥근 형태는 증거 오브젝트에만 허용한다. 상호작용 요소와 정보 컨테이너를 둥글게 만들지 않는다.

## Components

### Buttons

- **Shape:** 잘린 봉인판 같은 직각 모서리와 최소 52px 높이. 기본 패딩은 `0.85rem 1.25rem`이다.
- **Primary:** 응고된 적색 바탕에 선명한 장례의 상아 활자, 굵기 800을 사용한다.
- **Hover / Focus:** hover에서 판결 적색으로 밝아지고 글자는 먹빛으로 반전한다. 키보드 초점은 3px ARK 잔광 윤곽과 4px offset으로 표시한다. 색 전환은 180ms ease다.
- **Secondary:** 투명 배경과 강한 상아색 기록선, 장례의 상아 활자를 사용한다. 음악 연결 오류처럼 보조 경로가 실제로 필요할 때만 나타난다.
- **Seal:** 56px 높이의 투명 버튼이다. 상아색 선과 활자를 쓰고 hover에서 상아색 면으로 반전하며 2px만 위로 이동한다.

### Cards / Containers

- **Corner Style:** 모든 기록 컨테이너는 0px 직각이다.
- **Classification Panel:** 응고된 적색 면, 2.25rem 패딩, 최소 490px 높이로 II등급을 하나의 물리적 판정판처럼 보이게 한다.
- **Ledger Containers:** 별도 카드 배경 없이 상단과 하단의 1px 기록선, 1.1rem 행 패딩, 비대칭 정의 열로 구성한다.
- **Evidence Containers:** 상아색 기록지 위에서 1px 먹빛 기록선과 2열 표를 사용하고, 모바일에서는 한 열로 접는다.
- **Shadow Strategy:** 재사용 표면은 평평하다. 음악 콘솔 외에는 elevation을 추가하지 않는다.

### Disclosures

- **Style:** 능력의 패널티와 파훼법은 상아색 기록지 위의 `<details>` 장부로 제시한다. 상하 기록선과 최소 52px summary를 사용한다.
- **Focus:** 전역 ARK 잔광 초점 윤곽을 그대로 사용한다.
- **State:** 열림 상태는 추가 카드나 그림자를 만들지 않고 본문 패딩만 드러낸다.

### Navigation

- **Desktop:** 64px 높이의 먹빛 고정 바, 하단 1px 기록선, 중앙 목차를 사용한다. 링크는 퇴색한 증언색이며 hover에서 선명한 상아색과 밑줄로 바뀐다.
- **Mobile:** 640px 이하에서 화면 하단의 4분할 기록 탭이 된다. 각 탭은 최소 52px 높이를 확보하고 브랜드 표기는 숨긴다.
- **Entry State:** 기록 개봉 전에는 보이지 않고 조작할 수 없으며, 개봉 뒤 360ms opacity와 540ms 감속 이동으로 나타난다.

### Petal Gauge

여섯 개의 검은 유리 꽃잎은 `24px × 38px` 크기와 비대칭 꽃잎 모서리를 사용한다. 비활성 상태는 윤곽만 남기고 0.35 opacity, 활성 상태는 응고된 적색 면과 선으로 채운다. 일반 진행 표시나 평점으로 재사용하지 않는다.

### Persistent Music Console

폭은 최대 365px이며 화면 우하단에 고정된다. 먹빛 심부 배경, 상아색 기록선, 직각 모서리, 시스템에서 유일한 지속적 패널 그림자를 사용한다. 헤더는 58px 이상, 개별 조작부는 44px 이상이며, 펼침 상태에서만 16:9 공식 YouTube 플레이어와 3분할 제어 행을 보인다. 모바일에서는 하단 내비게이션과 안전 영역 위에 배치한다.

## Do's and Don'ts

### Do:

- **Do** use 응고된 적색 for seals, verdicts, errors, and active states.
- **Do** use ARK 잔광 for verified system status, links that leave the dossier, and keyboard focus.
- **Do** structure dense information with 1px ledger lines, asymmetric columns, and generous vertical silence.
- **Do** alternate 먹빛 기록지 and 장례의 상아 기록지 when the story changes evidentiary status.
- **Do** reserve circles, cut wedges, candles, and petals for evidence-bearing motifs.
- **Do** keep appearance text-only and preserve reduced-motion and keyboard behavior.

### Don't:

- **Don't** add a character portrait, exterior image, silhouette, copied illustration, or MV still.
- **Don't** soften buttons, cards, navigation, or the music console with generic rounded corners.
- **Don't** use same-size card grids, ornamental glass, gradient text, or decorative glow.
- **Don't** use monospace type as atmosphere; it belongs to codes, timestamps, grades, and ARK states.
- **Don't** add reusable shadows outside the persistent music console.
- **Don't** turn 응고된 적색 or ARK 잔광 into broad decorative backgrounds without a verdict or evidence role.
