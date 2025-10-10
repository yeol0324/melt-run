# 핵심 기획 구조

## 게임 루프

플레이어(눈사람)가 자동으로 앞으로 이동

점프 또는 중력 반전으로 장애물 회피

전진할수록 눈사람 크기 증가 (점수 기반)

장애물 충돌 시 크기 절반 감소

작아지면 다시 회복 가능 (눈을 굴리거나 아이템 획득)

### 게임 목표

최대한 오래 살아남아 “가장 거대한 눈사람” 기록 세우기.

### 화면 구성

배경(눈밭) + 전경(플레이어) + 장애물 + 점수 UI.

# 물리적/시각적 시스템 정의

## 크기 변화 로직

점수 증가 → scale += 0.01

충돌 시 → scale \*= 0.5

특정 scale 이상 시 이동속도 조정(speed -= scale \* 0.2)

## 점프 및 중력 로직

기본 중력: gravity = 0.5

점프 시: velocityY = -10

React에서 requestAnimationFrame으로 물리 갱신.

## 장애물 생성 로직

일정 프레임 간격마다 Math.random()으로 y좌표, 속도 랜덤.

collisionCheck(player, obstacle) 충돌 감지 → 눈 크기 감소.

## 점수 시스템

매 프레임 이동 시 score += deltaTime

scale과 연동: scale = 1 + score / 1000.

# 기술 스택 및 개발 환경 세팅

React + Vite + TypeScript

## 애니메이션 엔진

requestAnimationFrame 기반 또는 react-spring / framer-motion

TODO:

## 물리엔진 선택

단순: useState + canvas 충돌 감지

고급: matter-js

## 렌더링 방식

2D 버전: <canvas> 기반 (가볍고 모바일 적합)

3D 버전: react-three-fiber (눈 덩이 질감 표현 가능)

## 개발 단계 플로우

Canvas 세팅 — 배경/캐릭터/장애물 그리기

게임 루프 구현 — 이동·중력·충돌·점수 갱신

눈 크기 변화 반영 — scale 값에 따라 sprite 크기 조정

UI 및 점수 표시 — React state와 연결

충돌/감속/패널티 처리 — 눈 크기 반감 애니메이션

모바일 터치 조작 추가 — tap → jump

사운드 추가 — 점프, 충돌, 성장 효과음

테스트 및 튜닝 — 난이도 곡선, 성능 확인

프로토타입 완성 후 → Snowball 성장 곡선 및 UI polishing.

```md
src/
├─ app/
│ ├─ Layout.tsx
│ ├─ main.tsx
│ └─ providers/
│ &nbsp; └─ store-provider.tsx
├─ pages/
│ └─ game/
│ &nbsp; └─ GamePage.tsx
├─ entities/
│ ├─ snowman/
│ │ ├─ model/types.ts
│ │ ├─ model/useSnowman.ts
│ │ └─ ui/Snowman.tsx
│ └─ world/
│ &nbsp; ├─ model/useWorld.ts
│ &nbsp; └─ ui/World.tsx
├─ shared/
│ ├─ config/constants.ts
│ └─ types.ts
└─ app.css
```
