import type { Router } from 'express';

export interface RouteEntry {
  path: string;
  router: Router;
}

export const routes: RouteEntry[] = [];
