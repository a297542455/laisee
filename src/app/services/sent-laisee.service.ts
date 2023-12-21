import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

export type Form = {
  name: string;
  payee: string;
  bank: string;
  currency: string;
  amount: string;
  count: number;
  account: string;
  blessing: string;
};

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
  // 留一個 userId 方便展示，真實上綫記得刪除
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

  // 改成await方式，方便其他方法使用
  async getAccounts() {
    return await firstValueFrom(
      this.http.get<Account[]>(`/accounts?userId=${this.userId}`)
    );
  }

  // 多個地方要用到，這裏統一處理好返回emojis數組，類似 ['🧧','🧨']
  async getEmojis() {
    const source$ = this.http.get<{ emoji: string }[]>(`/emojis`);
    const res = await firstValueFrom(source$);
    return res
      .filter((item) => item.emoji.length === 5)
      .map((item) => String.fromCodePoint(parseInt(item.emoji, 16)));
  }

  sentCode(code: string) {
    return of(code !== '999999').pipe(delay(300));
  }

  // 錄音接口暫不存在，顯示二進制文件即可
  postRecording(data: Object) {
    console.log('錄音數據 -----> ', data);
    return of(data).pipe(delay(300));
  }
}
