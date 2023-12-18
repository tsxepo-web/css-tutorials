import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test-css';
  activeDropdownId: string = '';
  isActive: { [key: string]: boolean } = {};

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscPressed(event: Event) {
    this.closeDropdown();
  }

  toggleDropdown(dropdownId: string) {
    Object.keys(this.isActive).forEach((key) => {
      if (key !== dropdownId) {
        this.isActive[key] = false;
      }
    });
    this.isActive[dropdownId] = !this.isActive[dropdownId];
    this.activeDropdownId = this.isActive[dropdownId] ? dropdownId : '';
  }

  closeDropdown() {
    if (this.activeDropdownId) {
      this.isActive[this.activeDropdownId] = false;
      this.activeDropdownId = '';
    }
  }
}
