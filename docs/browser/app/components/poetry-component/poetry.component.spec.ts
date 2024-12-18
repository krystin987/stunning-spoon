import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoetryComponent } from './poetry.component';

describe('PoetryComponent', () => {
  let component: PoetryComponent;
  let fixture: ComponentFixture<PoetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoetryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
