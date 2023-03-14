import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagamentoNewViewEditComponent } from './forma-pagamento-new-view-edit.component';

describe('FormaPagamentoNewViewEditComponent', () => {
  let component: FormaPagamentoNewViewEditComponent;
  let fixture: ComponentFixture<FormaPagamentoNewViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaPagamentoNewViewEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaPagamentoNewViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
