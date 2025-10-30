import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService, Role } from './auth';

export interface RoleGuardData {
  roles: Role[];
  requireAll?: boolean;
}

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const data = route.data as RoleGuardData;
  const requiredRoles = data?.roles || [];
  const requireAll = data?.requireAll || false;

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const hasRequiredRoles = requireAll
    ? authService.hasAllRoles(requiredRoles)
    : authService.hasAnyRole(requiredRoles);

  if (!hasRequiredRoles) {
    // User is authenticated but doesn't have required roles
    // Redirect to a "forbidden" or home page
    router.navigate(['/']);
    return false;
  }

  return true;
};
