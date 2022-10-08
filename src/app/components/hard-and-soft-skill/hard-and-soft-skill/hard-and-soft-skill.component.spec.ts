import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardAndSoftSkillComponent } from './hard-and-soft-skill.component';

describe('HardAndSoftSkillComponent', () => {
  let component: HardAndSoftSkillComponent;
  let fixture: ComponentFixture<HardAndSoftSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardAndSoftSkillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardAndSoftSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
