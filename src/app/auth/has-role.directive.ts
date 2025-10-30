import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, Role } from './auth';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit, OnDestroy {
  private requiredRoles: Role[] = [];
  private requireAll = false;
  private subscription?: Subscription;

  @Input() set appHasRole(roles: Role | Role[]) {
    this.requiredRoles = Array.isArray(roles) ? roles : [roles];
    this.updateView();
  }

  @Input() set appHasRoleRequireAll(requireAll: boolean) {
    this.requireAll = requireAll;
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to currentUser changes to update view when user logs in/out
    this.subscription = this.authService.currentUser.subscribe(() => {
      this.updateView();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private updateView(): void {
    const hasRole = this.requireAll
      ? this.authService.hasAllRoles(this.requiredRoles)
      : this.authService.hasAnyRole(this.requiredRoles);

    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
