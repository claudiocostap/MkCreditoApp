import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaCrudComponent } from './pessoa-crud';

describe('PessoaCrud', () => {
  let component: PessoaCrudComponent;
  let fixture: ComponentFixture<PessoaCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
