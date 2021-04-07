import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConseilsPage } from './conseils.page';

describe('ConseilPage', () => {
  let component: ConseilsPage;
  let fixture: ComponentFixture<ConseilsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConseilsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConseilsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
