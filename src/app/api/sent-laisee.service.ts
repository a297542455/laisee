import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
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

  async getEmojis() {
    const source$ = this.http.get<{ emoji: string }[]>(`/emojis`);
    const res = await firstValueFrom(source$);
    return res.map((item) => item.emoji);
  }

  sentCode(code: string) {
    if (code === '666666') {
      return false;
    }
    return true;
  }
}
