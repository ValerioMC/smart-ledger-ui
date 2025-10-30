import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../auth/auth';
import { LanguageService, Language } from '../../services/language.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  standalone: true
})
export class Layout implements OnInit {
  username: string = '';
  sidebarOpen = true;
  languageMenuOpen = false;
  languages: Language[] = [];
  currentLanguage?: Language;

  menuItems: MenuItem[] = [
    {
      label: 'menu.dashboard',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      route: '/dashboard'
    },
    {
      label: 'menu.transactions',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      route: '/transactions'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.username = currentUser.username;
    }
    this.updateActiveRoute();
    this.router.events.subscribe(() => {
      this.updateActiveRoute();
    });

    // Initialize language
    this.languages = this.languageService.getSupportedLanguages();
    this.currentLanguage = this.languageService.getCurrentLanguageDetails();
  }

  updateActiveRoute(): void {
    const currentRoute = this.router.url;
    this.menuItems.forEach(item => {
      item.active = currentRoute.startsWith(item.route);
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleLanguageMenu(): void {
    this.languageMenuOpen = !this.languageMenuOpen;
  }

  changeLanguage(language: Language): void {
    this.languageService.setLanguage(language.code);
    this.currentLanguage = language;
    this.languageMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
