# 📍 Lokit (로킷)

**사진과 장소를 함께 기록하는 지도 기반 앨범 서비스**

Lokit은 사진을 앨범 단위로 관리하고,  
촬영 위치를 기반으로 지도 위에서 추억을 한눈에 돌아볼 수 있는 **모바일 중심 서비스**입니다.

---

## 👥 팀원

<table>
    <tr align="center">
        <td colspan="2"><b>Frontend</b></td>
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

| 목적        | 도구      |
| ----------- | --------- |
| 트래픽 분석 | GA        |
| 이벤트 분석 | Amplitude |
| 퍼널 분석   | Mixpanel  |
| UX 분석     | Clarity   |
| 에러 추적   | Sentry    |

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
