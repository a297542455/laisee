// 1. 导入必要的 Angular 模块
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

// 2. 创建一个拦截器服务
@Injectable()
export class MyInterceptor implements HttpInterceptor {
  baseUrl = 'http://localhost:3000';

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.handleRequest(request);
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err)),
      map((event: HttpEvent<any>) => this.handleResponse(event))
    );
  }

  /**
   * 请求参数拦截处理
   */
  handleRequest(request: any) {
    // console.log(`拦截器A在请求发起前的拦截处理`, request);
    let url = request.url;
    url = url.startsWith('http') ? url : this.baseUrl + url;
    return request.clone({
      // 服務器请求头一致
      headers: request.headers
        .set('token', 'my-auth-token2')
        .set('self-header', 'test2'),
      url,
    });
  }

  /**
   * 錯誤統一处理
   */
  private handleError(error: HttpErrorResponse) {
    alert('服務器錯誤，請稍後再試!');
    return throwError(() => error);
  }

  /**
   * 返回结果拦截处理
   */
  private handleResponse(event: HttpEvent<any>) {
    // console.log(event,'handleResponse');
    if (event instanceof HttpResponse && event.status === 200) {
      const res = event.body;
      if (res && res.code === 200 && res.data) {
        return new HttpResponse({ status: 200, body: res.data }); // 返回新的 HttpResponse 对象
      } else {
        alert('請求狀態不正確，請檢查請求'); // 使用 mergeMap 展平 Observable
        throw new Error('請求狀態不正確，請檢查請求');
      }
    }
    // angular攔截器會發送兩次，第一次需要返回 event，第二次才是上面的真實數據
    return event;
  }
}
