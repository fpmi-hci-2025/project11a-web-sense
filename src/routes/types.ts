import type { ReactNode } from 'react';

export interface AppRoute {
  path: string;
  element: ReactNode;
  protected?: boolean;
  children?: AppRoute[];
  name?: string;
}
