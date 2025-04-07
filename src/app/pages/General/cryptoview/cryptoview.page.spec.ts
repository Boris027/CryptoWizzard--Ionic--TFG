import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CryptoviewPage } from './cryptoview.page';

describe('CryptoviewPage', () => {
  let component: CryptoviewPage;
  let fixture: ComponentFixture<CryptoviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
