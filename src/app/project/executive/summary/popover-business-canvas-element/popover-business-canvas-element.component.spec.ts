import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverBusinessCanvasElementComponent } from './popover-business-canvas-element.component';

describe('PopoverBusinessCanvasElementComponent', () => {
  let component: PopoverBusinessCanvasElementComponent;
  let fixture: ComponentFixture<PopoverBusinessCanvasElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverBusinessCanvasElementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverBusinessCanvasElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
