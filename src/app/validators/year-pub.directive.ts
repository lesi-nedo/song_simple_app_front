import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function yearPubValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const regIn = /^(?:(?:1[6-9]|[2-9]\d)?\d{2})(?:(?:(\/|-|\.)(?:0?[13578]|1[02])\1(?:31))|(?:(\/|-|\.)(?:0?[13-9]|1[0-2])\2(?:29|30)))$|^(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(\/|-|\.)0?2\3(?:29)$|^(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:0?[1-9]|1\d|2[0-8])$/
    const regexM = new RegExp(regIn);
    const forb = regexM.test(control.value);
    return forb ? {wrongDate: {value: control.value}} : null;
  }
}
