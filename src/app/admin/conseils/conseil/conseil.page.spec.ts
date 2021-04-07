import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConseilPage } from './conseil.page';

describe('ConseilPage', () => {
  let component: ConseilPage;
  let fixture: ComponentFixture<ConseilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConseilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConseilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
