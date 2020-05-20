import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TiketsComponent } from './tikets.component';

describe('TiketsComponent', () => {
  let component: TiketsComponent;
  let fixture: ComponentFixture<TiketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiketsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TiketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
