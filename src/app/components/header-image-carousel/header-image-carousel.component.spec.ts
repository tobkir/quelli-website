import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderImageCarouselComponent } from './header-image-carousel.component';

describe('HeaderImageCarouselComponent', () => {
  let component: HeaderImageCarouselComponent;
  let fixture: ComponentFixture<HeaderImageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderImageCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderImageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
