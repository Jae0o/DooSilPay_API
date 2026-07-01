import { patchStudent } from '../patchStudent';

// ST-4 소프트 삭제 — deletedAt 기록. findAllByOwner/findById가 자동 제외.
export const softDelete = (uid: string, id: string) => patchStudent(uid, id, { deletedAt: new Date().toISOString() });
