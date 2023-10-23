import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AccountNumberService {
  private _accountNumber = new BehaviorSubject<string>('')
  accountNumber$ = this._accountNumber.asObservable()

  set(accountNumber: string) {
    this._accountNumber.next(accountNumber)
  }

  get() {
    return this._accountNumber.value
  }
}
