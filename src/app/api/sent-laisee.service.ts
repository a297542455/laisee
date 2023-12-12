import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

const defaultValue = {
  name: '13333333333',
  payee: '模擬數據**',
  bank: '模擬銀行',
  currency: 'CNY',
  amount: '20',
  count: 1,
  account: '111111111',
  blessing: '恭喜發財利是逗來🧧🧧',
};

const accounts = [
  { id: '111111111', CNY: 11100, HKD: 11000, USD: 10000 },
  { id: '222222222', CNY: 22200, HKD: 22000, USD: 20000 },
  { id: '333333333', CNY: 33300, HKD: 33000, USD: 30000 },
  { id: '444444444', CNY: 44400, HKD: 44000, USD: 40000 },
];

// 聯係人選項
const contacts = [
  {
    id: '13333333333',
    mobile: '13333333333',
    Email: '13333333333@a.com',
    FPSID: '333333333',
  },
  {
    id: '188@a.com',
    mobile: '18888888888',
    Email: '188@a.com',
    FPSID: '88888888',
  },
  {
    id: '666666666',
    mobile: '16666666666',
    Email: '16666666666@a.com',
    FPSID: '666666666',
  },
];

export const emojis = ['🧧', '🧨', '🍊', '🍾', '🎉', '🎊', '❤️', '🎃', '😊'];

export type Form = typeof defaultValue;

export type Contact = {
  id: string;
  mobile?: string;
  Email?: string;
  FPSID?: string;
  userId?: string;
};

export type Account = {
  id: string;
  CNY: number;
  HKD: number;
  USD: number;
  userId?: string;
};

export type ActionSheetButtons<T> = {
  text: string;
  role?: string;
  data?: T;
}[];

@Injectable({
  providedIn: 'root',
})
export class SentLaiseeService {
  private userId = '13333333333';
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    const userId = this.route.snapshot.queryParamMap.get('userId') as string;
    this.userId = userId || this.userId;
  }

  // url中携帶 userId
  getUserId(): string {
    return this.userId;
  }

  getContactByName(name: string, type: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`/contacts?${type}=${name}`);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`/contacts?userId=${this.userId}`);
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`/accounts?userId=${this.userId}`);
  }

  getEmojis() {
    return emojis;
  }

  sentCode(code: string) {
    if (code === '666666') {
      return false;
    }
    return true;
  }
}
