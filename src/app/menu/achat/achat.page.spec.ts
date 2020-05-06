import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AchatPage } from './achat.page';

describe('AchatPage', () => {
  let component: AchatPage;
  let fixture: ComponentFixture<AchatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AchatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
