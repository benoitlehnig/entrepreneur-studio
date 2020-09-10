import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessCanvasElementComponent } from './business-canvas-element.component';

describe('BusinessCanvasElementComponent', () => {
  let component: BusinessCanvasElementComponent;
  let fixture: ComponentFixture<BusinessCanvasElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCanvasElementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessCanvasElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
