import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverBusinessCanvasComponent } from './popover-business-canvas.component';

describe('PopoverBusinessCanvasComponent', () => {
  let component: PopoverBusinessCanvasComponent;
  let fixture: ComponentFixture<PopoverBusinessCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverBusinessCanvasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverBusinessCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
