import type { Router } from 'express';

import { academyRouter } from './academy';

export interface RouteEntry {
  path: string;
  router: Router;
}

export const routes: RouteEntry[] = [{ path: '/academy', router: academyRouter }];
