import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParainnagePage } from './parainnage.page';

describe('ParainnagePage', () => {
  let component: ParainnagePage;
  let fixture: ComponentFixture<ParainnagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParainnagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParainnagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
