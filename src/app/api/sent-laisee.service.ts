import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SentLaiseeService {
  constructor(private http: HttpClient) {}

  getData(name: string): Form {
    console.log('getData -----> ', name);
    if (name == '999999999') {
      return { name: '', payee: '', bank: '' };
    }
    return {
      name,
      payee: '模擬數據**',
      bank: '大新銀行',
    };
  }
}

interface Form {
  name: string;
  payee?: string;
  bank?: string;
}
