import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddToolComponent } from './add-tool.component';

describe('AddToolComponent', () => {
  let component: AddToolComponent;
  let fixture: ComponentFixture<AddToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToolComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
