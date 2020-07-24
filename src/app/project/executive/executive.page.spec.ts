import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExecutivePage } from './executive.page';

describe('ExecutivePage', () => {
  let component: ExecutivePage;
  let fixture: ComponentFixture<ExecutivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExecutivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
