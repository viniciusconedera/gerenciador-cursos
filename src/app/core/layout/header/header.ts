import { Component, inject, linkedSignal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly router = inject(Router);
  navigateEnd = toSignal(
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
  );
  isMenuOpen = linkedSignal({
    source: this.navigateEnd,
    computation: () => false,
  });

  toggleMenu() {
    this.isMenuOpen.update((currentValue) => !currentValue);
  }

  logout() {
    this.router.navigate(['auth/login']);
  }
}
