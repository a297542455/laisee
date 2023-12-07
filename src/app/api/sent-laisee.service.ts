import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const defaultValue = {
  name: '',
  payee: '模擬數據**',
  bank: '大新銀行',
  currency: 'CNY',
  amount: '20',
  account: '',
};

const accounts = [
  { id: 111111111, CNY: 11100, HKD: 11000, USD: 10000 },
  { id: 222222222, CNY: 22200, HKD: 22000, USD: 20000 },
  { id: 333333333, CNY: 33300, HKD: 33000, USD: 30000 },
  { id: 444444444, CNY: 44400, HKD: 44000, USD: 40000 },
];

export type Form = typeof defaultValue;
export type Accounts = typeof accounts;

@Injectable({
  providedIn: 'root',
})
export class SentLaiseeService {
  constructor(private http: HttpClient) {}
  // 999999999 模擬錯誤信息，包括step1的id錯誤，step3的id獲取賬號列表等
  getData(name: string): Form {
    console.log('getData -----> ', name);
    if (name == '999999999') {
      return defaultValue;
    }
    return { ...defaultValue, name };
  }
  getAccounts(name: string) {
    return accounts;
  }
}
