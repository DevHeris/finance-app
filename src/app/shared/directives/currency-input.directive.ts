import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencyInput]',
})
export class CurrencyInputDirective {
  private readonly prefix = '$ ';

  constructor(private el: ElementRef) {
    this.el.nativeElement.value = this.prefix; // Start with the dollar sign
  }

  @HostListener('focus') onFocus() {
    this.moveCaretToEnd();
  }

  @HostListener('blur') onBlur() {
    // If only the prefix is present, clear it to show a clean empty input
    if (this.el.nativeElement.value === this.prefix) {
      this.el.nativeElement.value = '';
    }
  }

  @HostListener('input', ['$event']) onInput(event: InputEvent) {
    const inputElement = this.el.nativeElement as HTMLInputElement;

    // Remove any characters before the prefix and ensure prefix is always present
    if (!inputElement.value.startsWith(this.prefix)) {
      inputElement.value = this.prefix + inputElement.value.replace(/[^0-9.]/g, '');
    } else {
      // Allow only numeric input after the prefix
      inputElement.value =
        this.prefix + inputElement.value.substring(this.prefix.length).replace(/[^0-9.]/g, '');
    }

    this.moveCaretToEnd();
  }

  private moveCaretToEnd() {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    inputElement.setSelectionRange(this.prefix.length, this.prefix.length);
  }
}
