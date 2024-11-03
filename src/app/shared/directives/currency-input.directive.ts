import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencyInput]',
})
export class CurrencyInputDirective {
  private readonly prefix = '$ ';

  constructor(private el: ElementRef) {
    this.setDisplayValue();
  }

  private setDisplayValue() {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const rawValue = this.getRawValue(inputElement.value);
    inputElement.value = this.prefix + rawValue;
  }

  private getRawValue(value: string): string {
    // Remove the prefix to get the raw numeric value
    return value.replace(this.prefix, '');
  }

  @HostListener('focus') onFocus() {
    this.setDisplayValue();
  }

  @HostListener('input', ['$event']) onInput(event: InputEvent) {
    const inputElement = this.el.nativeElement as HTMLInputElement;

    // Get the raw numeric input and reapply the prefix
    const rawValue = this.getRawValue(inputElement.value);
    inputElement.value = this.prefix + rawValue;
  }

  @HostListener('blur') onBlur() {
    // Ensure the prefix is still shown when the input loses focus
    this.setDisplayValue();
  }
}
