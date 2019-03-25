import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { MatButtonModule, MatMenuModule, MatIconModule } from '@angular/material';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navbarDe: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    navbarDe = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button of `Forum`', () => {
    expect(navbarDe.query(By.css('button')).nativeElement.innerText).toBe('Forum');
  });

  it('should have a menu', () => {
    expect(navbarDe.query(By.css('mat-menu')).nativeElement).toBeDefined();
  });
});
