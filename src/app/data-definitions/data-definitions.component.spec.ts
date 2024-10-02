import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDefinitionsComponent } from './data-definitions.component';

describe('DataDefinitionsComponent', () => {
  let component: DataDefinitionsComponent;
  let fixture: ComponentFixture<DataDefinitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDefinitionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
