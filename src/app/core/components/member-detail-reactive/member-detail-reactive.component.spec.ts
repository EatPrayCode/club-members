import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailReactiveComponent } from './member-detail-reactive.component';

describe('MemberDetailReactiveComponent', () => {
  let component: MemberDetailReactiveComponent;
  let fixture: ComponentFixture<MemberDetailReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDetailReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
