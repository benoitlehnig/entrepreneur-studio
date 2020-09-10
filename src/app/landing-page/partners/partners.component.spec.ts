import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartnersComponent } from './partners.component';

describe('PartnersComponent', () => {
  let component: PartnersComponent;
  let fixture: ComponentFixture<PartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
