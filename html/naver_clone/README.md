# 네이버 클론 코딩하기

### 일시

2023-07-21

### 규칙

- 되도록 npm이 아닌 yarn을 사용

### commit message [`참고1`](https://jane-aeiou.tistory.com/93) [`참고2`](https://meetup.nhncloud.com/posts/106)

- 명령문으로 작성
- [이모지](https://gitmoji.dev/)

- `FEAT` 새로운 기능 추가
- `FIX` 버그 수정
- `DOCS` 문서 수정
- `STYLE` 코드 스타일 변경 (코드 포매팅, 세미콜론 누락 등) 기능 수정이 없는 경우
- `DESIGN` 사용자 UI 디자인 변경 (CSS 등)
- `TEST` 테스트 코드, 리팩토링 테스트 코드 추가
- `REFACTOR` 코드 리팩토링
- `PERF` 성능 개선
- `CHORE` 빌드 업무 수정, 패키지 매니저 수정 (gitignore 수정 등)
- `RENAME` 파일 혹은 폴더명을 수정만 한 경우
- `REMOVE` 파일을 삭제만 한 경우

| 사용 시점 | 사용 키워드                                 |
| --------- | ------------------------------------------- |
| 해결      | Closes(종료), Fixes(수정), Resolves(해결)   |
| 참고      | Ref(참고), Related to(관련), See also(참고) |

### 사용 기술 혹은 라이브러리

- Node.js 18.12.0
- HTML5
- scss
  - dart scss (npm install -g sass) 1.64.0 compiled with dart2js 3.0.6
  - reset css cdn (html head link)
- JavaScript

## 차례

1. 초기설정 (2023-07-22)

   - [dart scss](https://sass-lang.com/dart-sass/)

     - scss 선택 이유
       - css보다 가독성이 좋고, 재사용이 가능하다.
       - sass에 비해 비교적 최근 버전이다.

   - dart sass 사용 이유

     - 작성한 scss 파일을 css로 읽어주는 컴파일 도구를 사용해야 한다.
     - `node-sass`는 node의 버전 변경에 따른 호환성 문제를 겪을 수 있으며, 신규 업데이트 된 sass 버전을 사용할 수 없다. (곧 사용되지 않을 추세)
     - 그에 반해 `dart sass`는 노드 버전 호환성이 좋고, 신규 기능을 사용할 수 있어 채택했다.

     - dart로 전환 방법

       - 기존에 설치했던 node-sass나 sass가 있다면, uninstall 한다.
       - 설치 `npm install -g sass`
       - 설치 버전 확인 `sass --version`

     - dart sass 명령어

       - `sass scss위치 css위치`
       - `sass --watch scss위치 css위치` (저장 시 자동 업데이트)

   - VSCODE 확장자 프로그램

     - Sass: .scss 작성 가능
     - Live Sass Complier: 라이브코딩, scss를 css로 자동 컴파일
       - 하단의 Watch sass 버튼 활성화 시 .scss 저장할 때마다 .css에 실시간 적용 (`Watching...` 상태)
       - 하단의 Go Live 버튼 활성화 시 .scss 저장할 때마다 자동으로 html 갱신 (새로고침 x)

   - css 초기화
     - google에 'reset css'를 검색
     - reset css cdn (html head link)
