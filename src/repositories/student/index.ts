import { create } from './create';
import { findAllByOwner } from './findAllByOwner';
import { findById } from './findById';
import { nextRegistrationNo } from './nextRegistrationNo';
import { setStatus } from './setStatus';
import { softDelete } from './softDelete';
import { update } from './update';

export const StudentRepository = {
  nextRegistrationNo,
  create,
  findAllByOwner,
  findById,
  update,
  setStatus,
  softDelete,
};
