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
  count: 1,
  account: '',
  blessing: '恭喜發財利是逗來🧧🧧',
};

const accounts = [
  { id: 111111111, CNY: 11100, HKD: 11000, USD: 10000 },
  { id: 222222222, CNY: 22200, HKD: 22000, USD: 20000 },
  { id: 333333333, CNY: 33300, HKD: 33000, USD: 30000 },
  { id: 444444444, CNY: 44400, HKD: 44000, USD: 40000 },
];

// 聯係人選項
const contacts = [
  {
    id: '13333333333',
    text: 'Tina電話: 13333333333',
  },
  {
    id: '123@qq.com',
    text: 'Tina郵箱: 123@qq.com',
  },
  {
    id: '888888888',
    text: 'Tina FPS: 888888888',
  },
  {
    id: '999999999',
    text: '錯誤示範: 999999999',
  },
];

export const emojis = ['🧧', '🧨', '🍊', '🍾', '🎉', '🎊', '❤️', '🎃', '😊'];

export type Form = typeof defaultValue;

export type Contact = {
  id: string;
  text: string;
};

export type Account = {
  id: number;
  CNY: number;
  HKD: number;
  USD: number;
};

export type ActionSheetButtons<T> = {
  text: string | number;
  role?: string;
  data?: T;
}[];

@Injectable({
  providedIn: 'root',
})
export class SentLaiseeService {
  constructor(private http: HttpClient) {}
  // 999999999 模擬錯誤信息
  getData(name: string): Form {
    if (name == '999999999') {
      return defaultValue;
    }
    return { ...defaultValue, name };
  }
  getContacts(name: string) {
    return contacts;
  }
  getAccounts(name: string) {
    return accounts;
  }
  getEmojis() {
    return emojis;
  }
}
