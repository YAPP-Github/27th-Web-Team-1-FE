> 레포지토리가 https://github.com/Team-Lokit/lokit-fe 로 이전되었습니다.

# 🔐 Lokit (로킷)

**둘만의 순간을 지도 위에 기록하는 커플 지도 서비스**

Lokit(로킷)은 커플의 일상 속 크고 작은 모든 순간을  
촬영 위치를 기반으로 지도 위에 아카이빙하고, 둘만의 추억으로 함께 쌓아가는 **모바일 중심 서비스**입니다.

> 따로 찍고 따로 보던 어제의 우리를 하나의 지도로 연결해요.

---

## ✨ 이런 커플에게 필요해요

- **추억은 하나인데 사진첩은 각자**: 사진이 각자 폰에 흩어져 있어, 같이 보려 해도 흐름이 끊겨요.
- **매번 사진 주고받기 번거로움**: 카톡으로 받으면 화질이 깨지고, 나중엔 찾기도 힘들어요.
- **인스타 비공개 계정도 우리만의 공간은 아님**: 알고리즘, 광고, 추천 게시물이 끼어들죠.

---

## 🗺️ 주요 기능

| 기능                    | 설명                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------- |
| **장소 기반 자동 정리** | 우리가 함께한 곳이 지도 위에 발자국으로 쌓여, 어디서 얼마나 함께했는지 한눈에 보여요. |
| **프라이빗**            | 광고도 알고리즘 피드도 없어요. 초대코드로 연결된 둘만 들어올 수 있어요.               |
| **부담감 제로**         | 키우기 미션이나 반복 질문 없이, 우리의 사진과 기록에만 담백하게 집중해요.             |
| **맥락 축적**           | 사진이 아니라 이야기가 쌓여요. 하루의 기록이 모여 우리만의 지도가 완성돼요.           |

---

## 📲 다운로드

<a href="https://apps.apple.com/us/app/%EB%A1%9C%ED%82%B7-lokit/id6767100896">
  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store에서 다운로드" height="48">
</a>

- **iOS**: [App Store에서 다운로드](https://apps.apple.com/us/app/%EB%A1%9C%ED%82%B7-lokit/id6767100896)
- **Android**: 출시 준비 중

---

## 🔗 공식 채널

- **웹사이트**: [www.lokit.co.kr](https://www.lokit.co.kr/)
- **소개 페이지**: [lokit.framer.website](https://lokit.framer.website/)
- **Instagram**: [@lokit*official*](https://www.instagram.com/lokit_official_/)

---

## 👥 Maintainers

<table>
    <tr align="center">
        <td colspan="3"><b>Frontend</b></td>
    </tr>
    <tr align="center">
        <td>
            <img src="https://avatars.githubusercontent.com/u/86469788?v=4?size=100" width="100">
            <br>
            <a href="https://github.com/salmonco"><I>salmonco</I></a>
        </td>
        <td>
            <img src="https://avatars.githubusercontent.com/u/106425326?v=4?size=100" width="100">
            <br>
            <a href="https://github.com/H0ngJu"><I>H0ngJu</I></a>
        </td>
        <td>
            <img src="https://avatars.githubusercontent.com/u/70315572?v=4?size=100" width="100">
            <br>
            <a href="https://github.com/Limgabi"><I>Limgabi</I></a>
        </td>
    </tr>
</table>

## 🙌 Contributors

<table>
    <tr align="center">
        <td>
            <img src="https://avatars.githubusercontent.com/u/89020004?v=4?size=100" width="100">
            <br>
            <a href="https://github.com/ohksj77"><I>ohksj77</I></a>
        </td>
    </tr>
</table>

## 🧩 프로젝트 구성

### 📱 플랫폼 구성

#### Mobile App (Shell)

- **React Native** 기반
- Android / iOS 동시 지원
- 앱 외곽(UI Shell) 및 네이티브 기능 담당
  - 로그인 트리거
  - 권한 요청 (갤러리, 위치)
  - WebView 컨테이너
- 주요 화면은 **WebView를 통해 Web 서비스 렌더링**

#### Web (Core UI)

- **Next.js** 기반
- 서비스의 핵심 화면 및 비즈니스 로직 담당
- WebView 환경을 고려한 반응형 UI
- 추후 Web 단독 서비스 확장 가능 구조

---

### 📦 모노레포 구조

**pnpm workspaces + Turborepo** 기반 모노레포로 구성되어 있습니다.

```
lokit-fe
├── apps
│   ├── web      # Next.js 기반 핵심 UI (WebView 렌더링)
│   └── mobile   # React Native 앱 셸 (Android / iOS)
└── packages
    ├── api-client      # Orval 자동 생성 API 클라이언트
    ├── sentry          # 공용 에러 추적 설정
    └── webview-bridge  # Web ↔ Native 통신 브릿지
```

---

### 🧰 주요 명령어

```bash
pnpm dev            # 개발 서버 실행
pnpm build          # 빌드
pnpm lint           # 린트 검사
pnpm test           # 테스트
pnpm format:fix     # 포맷팅
pnpm storybook      # 스토리북 실행
pnpm generate:api   # Swagger 기반 API 클라이언트 생성
```

---

## 🛠️ 기술 스택

### Frontend

| 구분             | 기술             | 참고                                                  |
| ---------------- | ---------------- | ----------------------------------------------------- |
| Web Framework    | **Next.js**      | WebView에서 동작하는 핵심 UI 구현, SEO 대응 및 확장성 |
| Mobile Framework | **React Native** | Android / iOS 동시 개발                               |
| RN Tooling       | react-native-cli | Expo 대비 빌드 속도 및 네이티브 제어                  |
| Styling          | Emotion          | 동적 상태 기반 스타일링 가독성                        |
| UI 문서화        | Storybook        | 디자이너/개발자 협업                                  |
| 상태 관리        | Context API      | 내장 API, 단순 구조                                   |
| 서버 상태        | TanStack Query   | 캐싱 및 비동기 상태 관리                              |

---

### Testing / Tooling

| 구분               | 기술                          |
| ------------------ | ----------------------------- |
| Unit / Integration | Vitest, React Testing Library |
| Mocking            | MSW                           |
| Formatter          | Prettier                      |
| Lint               | ESLint                        |
| Package Manager    | pnpm                          |
| Build Tool         | Vite (Storybook / Test 용도)  |

---

### Analytics / Monitoring

| 목적               | 도구                          |
| ------------------ | ----------------------------- |
| 태그 관리 / 트래픽 | Google Tag Manager (GTM → GA) |
| 이벤트 / 퍼널 분석 | Mixpanel                      |
| 에러 추적          | Sentry                        |

---

### API

| 항목        | 기술                                        |
| ----------- | ------------------------------------------- |
| HTTP Client | Orval                                       |
| 특징        | Swagger 기반 API + React Query 훅 자동 생성 |

---

## 📁 폴더 & 코드 컨벤션

### 폴더 구조

| 대상          | 규칙                 |
| ------------- | -------------------- |
| 라우팅 폴더   | `kebab-case`         |
| 컴포넌트 폴더 | `PascalCase`         |
| 페이지 파일   | `MainPage.tsx`       |
| 스타일 파일   | `MainPage.styles.ts` |

---

### 스타일링 컨벤션

| 네이밍        | 의미                   |
| ------------- | ---------------------- |
| `*-Wrapper`   | 최상위 레이아웃        |
| `*-Container` | 레이아웃 / 포지션 담당 |
| Text / Button | 의미 기반 컴포넌트     |

---

### Export 규칙

| 대상                 | 방식           |
| -------------------- | -------------- |
| 함수 / 훅 / 컴포넌트 | named export   |
| 페이지               | default export |

---

### 타입 규칙

| 구분        | 기준               |
| ----------- | ------------------ |
| `interface` | 객체 타입          |
| `type`      | 유니온 / 조합 타입 |

---

## 🌳 브랜치 전략

### 기본 브랜치

- **main**
  - 실제 배포 브랜치
  - 항상 안정적인 상태 유지

- **develop**
  - 다음 배포를 위한 통합 브랜치
  - 모든 기능 브랜치는 `develop`을 기준으로 생성

---

### 기능 브랜치 규칙

**형식**

- `feat/#이슈번호-기능명`
- `fix/#이슈번호-버그설명`
- `docs/#이슈번호-문서작업`
- `refactor/#이슈번호-리팩토링내용`
- `chore/#이슈번호-환경설정`
- `style/#이슈번호-컨벤션`
- `test/#이슈번호-테스트`

---

### 머지 규칙

- 모든 Pull Request는 **develop 브랜치로 머지**
- PR 머지 전 **Approve 필수**
- **Squash Merge** 방식 사용
- 머지 완료 후 **기능 브랜치 자동 삭제**

---

### 브랜치 타입 설명

| 타입     | 설명                     |
| -------- | ------------------------ |
| feat     | 새로운 기능 개발         |
| fix      | 버그 수정                |
| docs     | 문서 추가 / 수정         |
| refactor | 기능 변경 없는 구조 개선 |
| chore    | 파일 이동, 설정 변경 등  |
| style    | 코드 포맷 / 컨벤션       |
| test     | 테스트 코드              |
