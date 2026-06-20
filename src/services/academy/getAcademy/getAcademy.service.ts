import { AppError } from 'constants/AppError';
import { AcademyRepository } from 'repositories';

export const getAcademy = async (uid: string) => {
  const profile = await AcademyRepository.getByOwner(uid);

  if (!profile) throw new AppError(404, 'ACADEMY_NOT_FOUND', '학원 정보가 없습니다. 온보딩이 필요합니다.');

  return profile;
};
