import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaCrud } from './pessoa-crud';

describe('PessoaCrud', () => {
  let component: PessoaCrud;
  let fixture: ComponentFixture<PessoaCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaCrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
