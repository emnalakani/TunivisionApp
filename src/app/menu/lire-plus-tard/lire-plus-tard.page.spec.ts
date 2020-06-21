import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LirePlusTardPage } from './lire-plus-tard.page';

describe('LirePlusTardPage', () => {
  let component: LirePlusTardPage;
  let fixture: ComponentFixture<LirePlusTardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LirePlusTardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LirePlusTardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
