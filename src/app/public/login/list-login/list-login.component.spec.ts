import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoginComponent } from './list-login.component';

describe('ListLoginComponent', () => {
  let component: ListLoginComponent;
  let fixture: ComponentFixture<ListLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
