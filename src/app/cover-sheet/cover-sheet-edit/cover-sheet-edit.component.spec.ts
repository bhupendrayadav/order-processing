import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverSheetEditComponent } from './cover-sheet-edit.component';

describe('CoverSheetEditComponent', () => {
  let component: CoverSheetEditComponent;
  let fixture: ComponentFixture<CoverSheetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverSheetEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverSheetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
