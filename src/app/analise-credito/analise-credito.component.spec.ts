import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AnaliseCreditoComponent } from './analise-credito.component';
import { MkCreditoService } from '../services/mk-credito.service';

describe('AnaliseCreditoComponent', () => {
  let component: AnaliseCreditoComponent;
  let fixture: ComponentFixture<AnaliseCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AnaliseCreditoComponent
      ],
      providers: [MkCreditoService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaliseCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

