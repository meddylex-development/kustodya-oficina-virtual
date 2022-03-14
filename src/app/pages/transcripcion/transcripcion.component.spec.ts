import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscripcionComponent } from './transcripcion.component';

describe('TranscripcionComponent', () => {
  let component: TranscripcionComponent;
  let fixture: ComponentFixture<TranscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
