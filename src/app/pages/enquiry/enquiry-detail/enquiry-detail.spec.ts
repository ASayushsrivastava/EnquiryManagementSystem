import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryDetail } from './enquiry-detail';

describe('EnquiryDetail', () => {
  let component: EnquiryDetail;
  let fixture: ComponentFixture<EnquiryDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquiryDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
