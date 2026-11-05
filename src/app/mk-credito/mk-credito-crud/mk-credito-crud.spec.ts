import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MkCreditoCrudComponent } from './mk-credito-crud';
import { MkCreditoService } from '../../services/mk-credito.service';

describe('MkCreditoCrudComponent', () => {
  let component: MkCreditoCrudComponent;
  let fixture: ComponentFixture<MkCreditoCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MkCreditoCrudComponent
      ],
      providers: [MkCreditoService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MkCreditoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
