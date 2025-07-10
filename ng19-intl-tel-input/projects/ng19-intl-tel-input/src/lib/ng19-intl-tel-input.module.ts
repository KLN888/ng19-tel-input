// projects/ng19-tel-input/src/lib/ng19-tel-input.module.ts
import { NgModule } from '@angular/core';
import { ng19TelInput } from './ng19-intl-tel-input.directive';

@NgModule({
  declarations: [ng19TelInput],
  exports: [ng19TelInput]
})
export class Ng19TelInputModule {}
