# Character Site Factory

이 저장소는 캐릭터 사이트를 하나씩 자동 배포하는 팩토리입니다.

## 새 사이트 추가

1. `sites/<slug>/` 아래에 독립 실행 가능한 웹 프로젝트를 둡니다.
2. 그 폴더에 `site.factory.json`을 추가합니다.

```json
{
  "project": "slug"
}
```

3. `main`에 반영합니다.

GitHub Actions가 `sites/` 아래에서 변경된 사이트만 찾아 Vercel 프로젝트를
만들거나 기존 프로젝트에 연결한 뒤 Production으로 배포합니다. 같은 폴더를
다시 수정하면 같은 프로젝트가 자동 재배포됩니다.

새 사이트의 폴더명과 `project` 값은 같아야 합니다. 현재 저장소 루트의
코하루 사이트만 예외이며, 기존 Vercel Git 연결로 자동 재배포됩니다. 루트
`site.factory.json`은 소스 변경 없는 수동 재배포에 사용됩니다. `sites/`
아래 팩토리 프로젝트는 Vercel Dashboard에서 다시 Git Import 하지 마세요.
같은 사이트가 두 번 배포될 수 있습니다.

## 최초 1회 설정

GitHub 저장소의 Actions secret에 팀 범위 Vercel 토큰을 아래 이름으로
등록합니다.

```text
VERCEL_TOKEN
```

토큰은 저장소에 직접 기록하지 않습니다. 토큰을 등록한 직후에는 실패한 첫
실행을 한 번 다시 실행하거나, Actions 화면에서 `site` 값을 `.`으로 지정해
수동 실행합니다. 이후에는 `main` push만으로 자동 재배포됩니다.
