import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapacitorPage } from './capacitor.page';

describe('CapacitorPage', () => {
  let component: CapacitorPage;
  let fixture: ComponentFixture<CapacitorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CapacitorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
