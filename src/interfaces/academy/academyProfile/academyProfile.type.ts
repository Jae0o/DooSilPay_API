export interface AcademyProfile {
  ownerId: string; // = uid (문서 ID와 동일)
  name: string; // 학원명/상호 (필수)
  ownerName: string; // 대표자/교습자명 (필수)
  bizNo?: string; // 사업자등록번호 (선택)
  tel?: string; // 대표 전화 (선택)
  address?: string; // 학원 주소 (선택)
  signatureUrl?: string; // 서명 이미지 (이번 범위 밖)
  updatedAt: string; // ISO
}
