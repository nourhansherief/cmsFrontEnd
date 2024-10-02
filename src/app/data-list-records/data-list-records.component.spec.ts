import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataListRecordsComponent } from './data-list-records.component';

describe('DataListRecordsComponent', () => {
  let component: DataListRecordsComponent;
  let fixture: ComponentFixture<DataListRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataListRecordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataListRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
