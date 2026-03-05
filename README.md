# 🍽️ 레스토랑 웨이팅 리스트

태블릿에서 사용하는 레스토랑 대기 손님 관리 시스템입니다.  
**비용: 완전 무료** | Firebase 무료 플랜 + 로컬 모드 지원

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 📝 손님 자가 등록 | 이름, 전화번호, 인원수 직접 입력 |
| 🔍 순서 확인 | 전화번호 입력 → 현재 순서 및 예상 대기시간 확인 |
| 📞 직원 호출 | 전화번호 크게 표시, 호출 상태 변경 |
| ✅ 착석 완료 | 삭제 시 자동으로 순서 재정렬 |
| 📱 QR 코드 | 손님이 스마트폰으로 순서 확인 가능 |
| 🔒 직원 PIN | 관리 화면은 PIN 보호 (기본: **1234**) |

---

## 🚀 빠른 시작 (로컬 모드 - Firebase 없이)

1. `index.html` 파일을 브라우저로 열기
2. 바로 사용 가능! (데이터는 이 기기의 브라우저에만 저장됨)
3. 직원 화면: 우측 하단을 **5번 빠르게 탭** → PIN 입력 (기본: `1234`)

> ⚠️ **로컬 모드 주의**: 데이터가 한 기기에만 저장되므로, 손님이 다른 기기에서 순서 확인 불가능.  
> 여러 기기에서 실시간 공유하려면 아래 Firebase 설정을 따라주세요.

---

## 🔥 Firebase 설정 (실시간 다중 기기 동기화)

### 1단계: Firebase 프로젝트 생성

1. [Firebase 콘솔](https://console.firebase.google.com) 접속
2. **프로젝트 추가** 클릭
3. 프로젝트 이름 입력 (예: `restaurant-waiting`)
4. Google 애널리틱스: 선택 안 해도 됨 → **프로젝트 만들기**

### 2단계: Firestore 데이터베이스 생성

1. 좌측 메뉴 → **빌드** → **Firestore Database**
2. **데이터베이스 만들기** 클릭
3. **테스트 모드에서 시작** 선택 (30일 후 아래 규칙으로 변경 필요)
4. 위치: `asia-northeast3 (서울)` 선택

### 3단계: 보안 규칙 설정 (Firestore Rules)

Firestore → **규칙** 탭에서 아래 내용으로 교체:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /waitlist/{doc} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

> 더 강력한 보안이 필요하면 관리자에게 문의하세요.

### 4단계: 앱 등록 및 설정값 복사

1. Firebase 콘솔 → 프로젝트 설정 (⚙️) → **일반** 탭
2. 스크롤 내려 **내 앱** → `</>` (웹) 클릭
3. 앱 닉네임 입력 → **앱 등록**
4. `firebaseConfig` 값 복사

### 5단계: index.html 업데이트

`index.html` 파일 상단 `FIREBASE_CONFIG` 부분을 수정:

```javascript
const FIREBASE_CONFIG = {
  apiKey: "복사한-apiKey",
  authDomain: "프로젝트ID.firebaseapp.com",
  projectId: "복사한-projectId",
  storageBucket: "프로젝트ID.appspot.com",
  messagingSenderId: "복사한-messagingSenderId",
  appId: "복사한-appId"
};
```

---

## 🌐 무료 호스팅 (손님이 스마트폰으로 접속하려면)

### 방법 A: Firebase Hosting (추천)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# 폴더: 현재 폴더 (./)
firebase deploy
```
→ `https://프로젝트ID.web.app` 주소 생성

### 방법 B: Netlify Drop (가장 쉬움)

1. [app.netlify.com/drop](https://app.netlify.com/drop) 접속
2. `WATING LIST` 폴더를 드래그 앤 드롭
3. 자동으로 URL 생성됨

---

## 📱 사용 방법

### 손님용 (키오스크 태블릿)
1. 태블릿에서 앱 열기
2. **대기 등록** 탭 → 이름, 전화번호, 인원 입력 → **대기 등록하기**
3. **순서 확인** 탭 → 전화번호 입력 → 현재 순서 확인

### 직원용
1. 우측 하단 모서리를 **5번 빠르게 탭**
2. PIN 입력 (기본: `1234`)
3. 직원 화면에서:
   - **호출** 버튼: 손님 전화번호 크게 표시
   - **착석** 버튼: 착석 완료 처리 + 목록 삭제 + 순서 자동 업데이트
   - **🗑️** 버튼: 노쇼 등 직접 삭제
   - **QR 코드** 버튼: 손님용 QR 코드 표시
   - **설정** 버튼: 레스토랑 이름, PIN, 평균 대기시간 변경

---

## ⚙️ 설정 변경

앱 내 **설정** 메뉴에서 변경 가능:

| 설정 | 기본값 | 설명 |
|------|--------|------|
| 레스토랑 이름 | 레스토랑 | 상단에 표시되는 이름 |
| 직원 PIN | 1234 | 직원 화면 잠금 비밀번호 |
| 평균 대기시간 | 5분 | 팀당 예상 대기시간 (순서 계산용) |

---

## 💡 자주 묻는 질문

**Q: 비용이 정말 0원인가요?**  
A: Firebase 무료(Spark) 플랜은 읽기 5만 회/일, 쓰기 2만 회/일 제공. 일반 레스토랑에서 충분합니다.

**Q: 인터넷이 끊기면?**  
A: 로컬 모드(Firebase 미설정)는 오프라인 완전 동작. Firebase 연결 시 일시적 저장 후 재연결 시 동기화.

**Q: 데이터가 쌓이면?**  
A: 날짜가 바뀌거나 영업 종료 후 직원이 모든 항목을 삭제하면 됩니다.
