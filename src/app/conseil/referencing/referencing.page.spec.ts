import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReferencingPage } from './referencing.page';

describe('ReferencingPage', () => {
  let component: ReferencingPage;
  let fixture: ComponentFixture<ReferencingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferencingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReferencingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
