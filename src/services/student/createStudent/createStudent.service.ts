import { StudentRepository } from 'repositories';
import type { CreateStudentInput } from 'validations';

export const createStudent = (uid: string, input: CreateStudentInput) => StudentRepository.create(uid, input);
