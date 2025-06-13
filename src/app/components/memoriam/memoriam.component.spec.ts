import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriamComponent } from './memoriam.component';

describe('MemoriamComponent', () => {
  let component: MemoriamComponent;
  let fixture: ComponentFixture<MemoriamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoriamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoriamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
