import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantChatbotComponent } from './assistant-chatbot.component';

describe('AssiatantChatbotComponent', () => {
  let component: AssistantChatbotComponent;
  let fixture: ComponentFixture<AssistantChatbotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistantChatbotComponent]
    });
    fixture = TestBed.createComponent(AssistantChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
