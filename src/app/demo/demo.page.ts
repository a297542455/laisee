import { Component, OnInit } from '@angular/core';
import {
  Subject,
  auditTime,
  buffer,
  bufferCount,
  bufferTime,
  catchError,
  concat,
  concatAll,
  debounceTime,
  delay,
  delayWhen,
  distinct,
  distinctUntilChanged,
  filter,
  from,
  fromEvent,
  fromEventPattern,
  interval,
  map,
  merge,
  mergeAll,
  of,
  retry,
  retryWhen,
  sampleTime,
  switchAll,
  switchMap,
  take,
  tap,
  throttleTime,
  timer,
  zip,
} from 'rxjs';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage {
  constructor() {
    // var egghead = new Producer();
    // // egghead 同時具有 註冊監聽者及移除監聽者 兩種方法
    // var source1 = fromEventPattern(
    //   (handler) => egghead.addListener(handler),
    //   (handler) => egghead.removeListener(handler)
    // );

    // const un1 = source1.subscribe({
    //   next: function (value) {
    //     console.log('next', value);
    //   },
    //   complete: function () {
    //     console.log('complete!');
    //   },
    //   error: function (error) {
    //     console.log(error);
    //   },
    // });
    // const un2 = source1.subscribe({
    //   next: function (value) {
    //     console.log('next', value);
    //   },
    //   complete: function () {
    //     console.log('complete!');
    //   },
    //   error: function (error) {
    //     console.log(error);
    //   },
    // });
    // egghead.notify('Hello! Can you hear me1?');
    // egghead.notify('Hello! Can you hear me2?');
    // egghead.notify('Hello! Can you hear me3?');
    // un1.unsubscribe();
    // un2.unsubscribe();

    // var obs1 = interval(1000);
    // var obs2 = interval(300);

    // 等待 obs1 執行完，也就是 01234 都打印完，才執行 obs2
    // var obs1 = interval(1000).pipe(take(5));
    // var obs2 = interval(500).pipe(take(2));
    // of(obs1, obs2)
    //   .pipe(switchAll())
    //   .subscribe((value) => console.log(value));

    // {
    //   // 等待 obs1 執行完，也就是 01234 都打印完，才執行 obs2
    // var example = of(obs1, obs2).pipe(concatAll());
    // example.subscribe((value) => console.log(value));
    // }
    // var obs3 = interval(1000).pipe(take(2));
    // var example = concat(obs1, obs2, obs3);
    // example.subscribe((value) => console.log(value));

    // var example = merge(obs1, obs2);
    // example.subscribe((value) => console.log(value));

    // var example = zip(obs1, obs2, (x, y) => x + y);
    // example.subscribe((value) => console.log(value));

    // var obs1 = interval(333);
    // var example = obs1.pipe(buffer(interval(1000)));
    // var example = obs1.pipe(bufferTime(1000));
    // var example = obs1.pipe(bufferCount(3));
    // example.subscribe((value) => console.log(value));

    // let startTime = +new Date();
    // var obs1 = fromEvent(document, 'click');
    // var example = obs1.pipe(
    //   map((x) => (startTime = +new Date())),
    //   debounceTime(1000)
    // );
    // example.subscribe({
    //   next: (value) => console.log(+new Date() - startTime),
    // });

    let start = +new Date();
    // interval(300)
    //   .pipe(debounceTime(100))
    //   .subscribe((x) =>
    //     console.log(`debounceTime，耗时： ${+new Date() - start},值：${x}`)
    //   );
    //  输出：耗时： 400值：0，耗时： 700值：1，耗时： 1000值：2
    // 没输出
    // interval(300)
    //   .pipe(throttleTime(1000))
    //   .subscribe((x) =>
    //     console.log(`throttleTime,耗时： ${+new Date() - start},值：${x}`)
    //   );
    // 输出：耗时： 300值：0，耗时： 1500值：4，耗时： 2700值：8
    // interval(300)
    //   .pipe(auditTime(1000))
    //   .subscribe((x) =>
    //     console.log(`auditTime，耗时： ${+new Date() - start},值：${x}`)
    //   );
    // 输出：耗时： 1300值：3，耗时： 2500值：4，耗时： 3700值：11
    //
    // interval(300)
    //   .pipe(sampleTime(1000))
    //   .subscribe((x) =>
    //     console.log(`sampleTime，耗时： ${+new Date() - start},值：${x}`)
    //   );
    // 输出：耗时： 1000值：2，耗时： 2000值：5，耗时： 3000值：9
    // of(1, 2, 3, 1, 2)
    //   .pipe(distinct())
    //   .subscribe((x) => console.log(x));

    // const source = interval(1000);
    // const result = source.pipe(
    //   map((value) => {
    //     if (value > 5) {
    //       // error will be picked up by retryWhen
    //       throw value;
    //     }
    //     return value;
    //   })
    // );

    // result.subscribe((value) => console.log(value));

    const subject = new Subject<number>();

    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`),
    });
    subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`),
    });

    // 作为 Observable 订阅变化
    subject.next(1);
    subject.next(2);
    // observerA: 1
    // observerB: 1
    // observerA: 2
    // observerB: 2

    // 作为 Observer 被订阅
    const observable = from([1, 2, 3]);
    observable.subscribe(subject);
    // observerA: 1
    // observerB: 1
    // observerA: 2
    // observerB: 2
    // observerA: 3
    // observerB: 3
  }
}

class Producer {
  listeners: any[] = [];
  constructor() {
    this.listeners = [];
  }
  addListener(listener: any) {
    if (typeof listener === 'function') {
      console.log('listener -----> ', listener);
      this.listeners.push(listener);
    } else {
      throw new Error('listener 必須是 function');
    }
    console.log('addListener -----> ', this.listeners);
  }
  removeListener(listener: any) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
    console.log('removeListener -----> ', this.listeners);
  }
  notify(message: any) {
    this.listeners.forEach((listener) => {
      listener(message);
    });
    console.log('notify -----> ', this.listeners);
  }
}
