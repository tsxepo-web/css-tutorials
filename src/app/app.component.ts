import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test-css';
  isDropdownOpen = false;

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    const isDropdownButton = (event.target as HTMLElement).matches(
      '[data-dropdown-button]'
    );

    if (
      !isDropdownButton &&
      (event.target as HTMLElement).closest('[data-dropdown]') !== null
    ) {
      return;
    }

    let currentDropdown: HTMLElement | null;

    if (isDropdownButton) {
      currentDropdown = (event.target as HTMLElement).closest(
        '[data-dropdown]'
      );
      currentDropdown!.classList.toggle('active');
      this.isDropdownOpen = currentDropdown!.classList.contains('active');
    }

    document
      .querySelectorAll('[data-dropdown].active')
      .forEach((dropdown: any) => {
        if (dropdown === currentDropdown) return;
        dropdown.classList.remove('active');
      });
  }

  toggleDropdown() {
    const dropdownElement =
      this.el.nativeElement.querySelector('[data-dropdown]');
    dropdownElement.classList.toggle('active');
    this.isDropdownOpen = dropdownElement.classList.contains('active');
  }
}
