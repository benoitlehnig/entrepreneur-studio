import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimeElementComponent } from './time-element.component';

describe('TimeElementComponent', () => {
  let component: TimeElementComponent;
  let fixture: ComponentFixture<TimeElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeElementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
