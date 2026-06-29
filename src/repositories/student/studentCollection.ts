import { db } from 'config/firebase';

// 멀티테넌트 격리 진입점 — owners/{uid} 하위로만 접근 (기획-참고사항 §4)
// barrel 미노출. 도메인 내 repository에서 상대경로로만 사용.
export const studentsCol = (uid: string) => db.collection('owners').doc(uid).collection('students');

export const counterRef = (uid: string) =>
  db.collection('owners').doc(uid).collection('counters').doc('registrationNo');
