import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SentLaiseePage } from './sent-laisee.page';

describe('SentLaiseePage', () => {
  let component: SentLaiseePage;
  let fixture: ComponentFixture<SentLaiseePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SentLaiseePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
