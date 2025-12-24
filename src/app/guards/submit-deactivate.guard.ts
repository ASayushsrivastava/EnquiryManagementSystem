import { CanDeactivateFn } from '@angular/router';
import { SubmitForm } from '../pages/submit-form/submit-form';

export const submitDeactivateGuard: CanDeactivateFn<SubmitForm> = (component) => {
  if (component.isFormDirty()) {
    return confirm('You have unsaved changes. Leave anyway?');
  }
  return true;
};
