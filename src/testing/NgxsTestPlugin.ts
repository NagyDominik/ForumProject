import { Inject, Injectable, InjectionToken } from '@angular/core';
import { NgxsPlugin } from '@ngxs/store';
import { of } from 'rxjs';

export const NGXS_ACTIONS = new InjectionToken('NGXS_ACTIONS');

@Injectable()
export class NgxsTestPlugin implements NgxsPlugin {
  constructor(@Inject(NGXS_ACTIONS) private actions: any[]) { }

  handle(state, action, next) {
    console.log('Action called in test', action);
    this.actions.push(action);
    return of(state);
  }
}
