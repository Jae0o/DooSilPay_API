import { AcademyRepository } from 'repositories';
import type { UpsertAcademyInput } from 'validations';

export const saveAcademy = (uid: string, input: UpsertAcademyInput) => AcademyRepository.upsertByOwner(uid, input);
