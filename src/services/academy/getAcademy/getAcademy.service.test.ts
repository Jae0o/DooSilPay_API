import { describe, expect, it, vi } from 'vitest';

import { AppError } from 'constants/AppError';
import { AcademyRepository } from 'repositories';

import { getAcademy } from './getAcademy.service';

// repositories 배럴을 mock → firebase init·실제 Firestore 없이 서비스 규칙만 검증.
vi.mock('repositories', () => ({ AcademyRepository: { getByOwner: vi.fn() } }));

describe('getAcademy', () => {
  it('문서 없음 → AppError 404 ACADEMY_NOT_FOUND', async () => {
    vi.mocked(AcademyRepository.getByOwner).mockResolvedValue(null);

    await expect(getAcademy('uid-1')).rejects.toMatchObject({ status: 404, code: 'ACADEMY_NOT_FOUND' });
    await expect(getAcademy('uid-1')).rejects.toBeInstanceOf(AppError);
  });

  it('문서 있음 → 프로필 반환', async () => {
    const profile = {
      ownerId: 'uid-1',
      name: '두실학원',
      ownerName: '홍길동',
      updatedAt: '2026-01-01T00:00:00.000Z',
    };
    vi.mocked(AcademyRepository.getByOwner).mockResolvedValue(profile);

    await expect(getAcademy('uid-1')).resolves.toEqual(profile);
  });
});
