import type { Router } from 'express';

import { academyRouter } from './academy';
import { studentRouter } from './student';

export interface RouteEntry {
  path: string;
  router: Router;
}

export const routes: RouteEntry[] = [
  { path: '/academy', router: academyRouter },
  { path: '/students', router: studentRouter },
];
