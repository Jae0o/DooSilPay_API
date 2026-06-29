export interface Student {
  id: string;
  registrationNo: number; // 등록번호 (owner별 채번, monotonic)
  name: string;
  birthDate?: string; // YYYY-MM-DD
  subjectName?: string; // ST-1 교습과목
  monthlyFee: number;
  paymentDay?: number; // 1~31
  guardianName?: string;
  guardianContact?: string;
  contact?: string;
  memo?: string;
  status: 'active' | 'inactive';
  deletedAt: string | null; // ST-4 소프트 삭제
  createdAt: string; // ISO
  updatedAt: string; // ISO
}
