import { create } from './create';
import { findAllByOwner } from './findAllByOwner';
import { findById } from './findById';
import { nextRegistrationNo } from './nextRegistrationNo';

export const StudentRepository = { nextRegistrationNo, create, findAllByOwner, findById };
