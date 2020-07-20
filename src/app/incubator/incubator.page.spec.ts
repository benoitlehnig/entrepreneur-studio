import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncubatorPage } from './incubator.page';

describe('IncubatorPage', () => {
  let component: IncubatorPage;
  let fixture: ComponentFixture<IncubatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncubatorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncubatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
