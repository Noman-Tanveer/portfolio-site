import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssiatantChatbotComponent } from './assiatant-chatbot.component';

describe('AssiatantChatbotComponent', () => {
  let component: AssiatantChatbotComponent;
  let fixture: ComponentFixture<AssiatantChatbotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssiatantChatbotComponent]
    });
    fixture = TestBed.createComponent(AssiatantChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
