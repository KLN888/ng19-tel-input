import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import 'intl-tel-input/build/css/intlTelInput.css';

declare const window: any;
const defaultUtilScript = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.1/js/utils.js';

@Directive({
  selector: '[ng19TelInput]',
  standalone:false
})
export class ng19TelInput implements OnInit {
  @Input('ng19TelInputOptions') ng19TelInputOptions: { [key: string]: any } = {};
  @Output('hasError') hasError: EventEmitter<boolean> = new EventEmitter();
  @Output('ng19TelOutput') ng19TelOutput: EventEmitter<any> = new EventEmitter();
  @Output('countryChange') countryChange: EventEmitter<any> = new EventEmitter();
  @Output('intlTelInputObject') intlTelInputObject: EventEmitter<any> = new EventEmitter();

  ngTelInput: any;

  constructor(private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: string) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.ng19TelInputOptions = {
        ...this.ng19TelInputOptions,
        utilsScript: this.getUtilsScript(this.ng19TelInputOptions)
      };
      this.ngTelInput = window.intlTelInput(this.el.nativeElement, {
        ...this.ng19TelInputOptions
      });

      this.el.nativeElement.addEventListener("countrychange", () => {
        this.countryChange.emit(this.ngTelInput.getSelectedCountryData());
      });

      this.intlTelInputObject.emit(this.ngTelInput);
    }
  }

  @HostListener('blur') onBlur() {
    let isInputValid: boolean = this.isInputValid();
    if (isInputValid) {
      let telOutput = this.ngTelInput.getNumber();
      this.hasError.emit(isInputValid);
      this.ng19TelOutput.emit(telOutput);
    } else {
      this.hasError.emit(isInputValid);
    }
  }

  isInputValid(): boolean {
    return this.ngTelInput.isValidNumber();
  }

  setCountry(country: any) {
    this.ngTelInput.setCountry(country);
  }

  getUtilsScript(options: any) {
    return options.utilsScript || defaultUtilScript;
  }
}
