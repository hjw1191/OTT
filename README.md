 OTT 프로젝트 (배포 https://app.cloudtype.io/)

 프로젝트 개요
이 프로젝트는 React를 사용한 프론트엔드와 Node.js를 사용한 백엔드로 구성된 OTT(Over-The-Top) 스트리밍 플랫폼입니다. MongoDB를 사용하여 드라마 데이터를 관리하며, YouTube, TMDB, TuneFind, Vibe API를 통해 영화 및 음악 정보를 제공하는 기능을 구현했습니다. Cloudtype을 사용하여 프론트엔드와 백엔드를 함께 배포하여 쉽게 관리할 수 있도록 설정했습니다. 이 프로젝트는 개인이 처음으로 구현한 웹사이트 프로젝트입니다.

기존에는 영화나 드라마의 OST(Original Soundtrack)를 따로 찾아야 하는 불편함이 있었지만, 이 프로젝트에서는 영화와 드라마의 OST를 한 곳에서 함께 볼 수 있어 사용자 편의를 크게 높였습니다.

 주요 기능
- 드라마 목록 관리: MongoDB에 저장된 드라마 데이터를 조회하고, 사용자에게 리스트 형태로 제공합니다.
- 영화 및 음악 검색: TMDB, YouTube, TuneFind, Vibe API를 사용하여 영화와 음악을 검색하고 재생할 수 있습니다.
- OST 통합 보기: 영화와 드라마의 OST를 한 곳에서 쉽게 찾아볼 수 있는 기능을 제공하여 사용자 편의를 높였습니다.
- 로그인 및 사용자 인증: 사용자 인증 시스템을 통해 로그인 후 접근 가능한 보호된 기능을 제공합니다.
- 프론트엔드와 백엔드 통합 배포: Cloudtype을 통해 프론트엔드와 백엔드를 하나의 환경에서 배포 및 관리합니다.

 기술 스택
- 프론트엔드: React
- 백엔드: Node.js, Express.js
- 데이터베이스: MongoDB
- 배포 플랫폼: Cloudtype
- 외부 API: YouTube Data API, TMDB API, TuneFind API, Vibe API

 프로젝트 구조
```bash
OTT/
│
├── backend/                      백엔드 코드
│   ├── server.js                 메인 서버 파일
│   ├── auth.js                   인증 관련 모듈
│   ├── db.js                     데이터베이스 연결 설정
│   ├── controllers/              비즈니스 로직 처리
│   │   ├── dramaController.js    드라마 관련 로직
│   │   ├── movieController.js    영화 관련 로직
│   │   └── musicController.js    음악 관련 로직
│   └── routes/                   API 라우팅 정의
│       ├── dramaRoutes.js        드라마 관련 API 라우팅
│       ├── movieRoutes.js        영화 관련 API 라우팅
│       └── musicRoutes.js        음악 관련 API 라우팅
│
├── frontend/                     프론트엔드 코드
│   ├── public/                   정적 파일
│   ├── src/                      소스 코드
│   │   ├── components/           React 컴포넌트
│   │   ├── pages/                페이지 구성
│   │   └── App.js                메인 애플리케이션 파일
│   ├── package.json              프론트엔드 패키지 설정 파일
│   └── .env                      환경 변수 설정 파일
│
└── README.md                     프로젝트 리드미 파일

외부 API 사용 내역
1. YouTube Data API
사용 목적: YouTube에서 동영상 데이터를 가져오거나 스트리밍 URL을 제공하여 비디오 콘텐츠를 사용자에게 제공.
주요 기능:
동영상 검색 및 메타데이터 조회.
스트리밍 URL 생성 및 동영상 재생.
사용 방식:
Google Cloud에서 API 키 발급 후, Node.js 서버에서 fetch로 데이터 요청.

2. TMDB (The Movie Database) API
사용 목적: 영화, 드라마 등 엔터테인먼트 관련 데이터를 제공하는 API로, 인기 영화 리스트나 드라마 정보를 제공합니다.
주요 기능:
영화 및 드라마 검색.
상세 정보(줄거리, 배우 등) 조회.
사용 방식:
TMDB API 키를 통해 서버에서 요청을 보내고 데이터를 받아서 프론트엔드에 전달.

3. TuneFind API
사용 목적: 영화나 드라마에 사용된 사운드트랙을 검색하고, 음악 정보를 제공합니다.
주요 기능:
특정 드라마/영화에 사용된 음악 리스트 조회.
음악의 스트리밍 정보 제공.
사용 방식:
TuneFind에서 발급받은 API 키로 요청을 보내 음악 데이터를 수집.

4. Vibe API
사용 목적: Vibe의 음악 스트리밍 정보를 제공하며, 사용자가 음악을 검색하고 재생할 수 있도록 합니다.
주요 기능:
인기 음악, 재생 목록 제공.
음악 검색 및 재생 URL 제공.
사용 방식:
Vibe API를 통해 음악 검색 및 재생 URL을 받아와 사용자가 음악을 들을 수 있도록 합니다.
데이터베이스 구조
MongoDB - 드라마 데이터 관리
컬렉션: dramas
{
  "_id": "드라마 ID",
  "title": "드라마 제목",
  "description": "드라마 설명",
  "releaseDate": "출시 날짜",
  "episodes": [
    {
      "episodeNumber": 1,
      "title": "에피소드 제목",
      "url": "비디오 URL"
    }
  ]
}
loudtype을 사용한 배포
Cloudtype 소개: Cloudtype은 프론트엔드와 백엔드를 통합하여 쉽게 배포할 수 있는 클라우드 플랫폼입니다. CI/CD 기능을 제공하여 코드 업데이트 시 자동으로 배포가 가능합니다.
배포 과정:
Cloudtype 계정 생성 후 프로젝트를 생성합니다.
GitHub 리포지토리와 연동하여 소스 코드를 가져옵니다.
프론트엔드와 백엔드를 각각의 서비스로 설정하고, 필요한 환경 변수를 등록합니다.
배포 버튼을 클릭하면 자동으로 애플리케이션이 빌드 및 배포됩니다.
프로젝트에서 발생한 주요 오류와 해결 방법
1. 오류: CORS(Cross-Origin Resource Sharing) 문제
원인: CORS 설정 미흡으로 인해 프론트엔드와 백엔드가 다른 도메인에서 동작할 때 문제가 발생.
해결 방법:
Node.js 서버에서 cors 패키지를 사용하여 모든 요청을 허용하거나 필요한 도메인만 허용하도록 설정했습니다.

2. 오류: API 호출 시 403 오류 (Forbidden)
원인: 잘못된 API 키 사용 또는 API 요청 횟수 제한 초과.
해결 방법:
API 키의 유효성을 확인하고, 필요시 새로운 API 키를 발급받거나 요청량을 늘리는 요금제로 업그레이드했습니다.

3. 오류: 프론트엔드와 백엔드 간 통신 오류 (404 또는 500 오류)
원인: 잘못된 API 엔드포인트 사용 또는 서버 오류.
해결 방법:
API 엔드포인트를 정확히 확인하고, 서버 로그를 분석하여 발생 원인을 파악하고 수정했습니다.

4. 오류: API 데이터가 화면에 표시되지 않음
원인: 비동기 통신 문제 또는 React 상태 관리 문제.
해결 방법:
useEffect와 useState를 사용하여 API 호출을 처리하고, 에러 처리를 통해 문제가 발생했을 때 사용자에게 알림을 표시했습니다.

5. 오류: Git 푸시 오류
원인: Git 명령어 사용 미숙, 푸시 권한 문제, 충돌 등의 오류.
해결 방법:
Git 사용법을 반복적으로 연습하고, 오류 메시지를 분석하여 해결책을 찾았습니다.
git pull로 최신 코드를 받아와 충돌을 해결하고 다시 푸시하는 방법을 익혔습니다.
.gitignore 파일을 설정하여 불필요한 파일이 푸시되지 않도록 관리했습니다.
배운 점과 느낀 점
API와 서버의 중요성: 외부 API와 서버의 데이터 처리 및 전달 과정이 웹 개발에서 매우 중요한 역할을 한다는 것을 배웠습니다.
프론트엔드와 백엔드의 통합: 두 부분의 협업이 웹사이트의 정상 작동을 위해 필수적이며, 이를 위한 데이터 처리와 API 설계의 중요성을 실감했습니다.
Git 사용법: Git 사용 중 발생하는 다양한 오류를 해결하면서 Git과 GitHub의 중요성과 사용법을 익히게 되었습니다.
문제 해결 능력: 개발 과정에서 마주한 다양한 기술적 문제들을 해결하면서 문제 해결 능력을 키웠습니다.
끊임없는 도전과 학습: 예상치 못한 문제들에도 포기하지 않고 해결해 나가며 성장할 수 있었습니다.
