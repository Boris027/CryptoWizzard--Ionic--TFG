import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListcontentPage } from './listcontent.page';

describe('ListcontentPage', () => {
  let component: ListcontentPage;
  let fixture: ComponentFixture<ListcontentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcontentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
