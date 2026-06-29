import { beforeEach, describe, expect, it } from 'vitest';

import { db } from 'config/firebase';

import { nextRegistrationNo } from './nextRegistrationNo.repository';

// 에뮬레이터(8085) 필요. owner별 counter 격리.
const uid = 'test-owner-nextRegistrationNo';
const counter = () => db.collection('owners').doc(uid).collection('counters').doc('registrationNo');

describe('nextRegistrationNo (emulator)', () => {
  beforeEach(async () => {
    await counter().delete();
  });

  it('연속 호출 → 1, 2, 3', async () => {
    expect(await nextRegistrationNo(uid)).toBe(1);
    expect(await nextRegistrationNo(uid)).toBe(2);
    expect(await nextRegistrationNo(uid)).toBe(3);
  });
});
