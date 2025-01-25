import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTypingBlinkingCursor]'
})
export class TypingBlinkingCursorDirective implements OnInit {
  @Input() textToType: string = '';
  @Input() typingSpeed: number = 20;
  @Input() cursorBlinkInterval: number = 750;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.startTyping();
  }

  startTyping(): void {
    const element = this.el.nativeElement;
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index <= this.textToType.length) {
        element.textContent = this.textToType.substring(0, index);
        index++;
      } else {
        clearInterval(typingInterval);
        this.startBlinkingCursor();
      }
    }, this.typingSpeed);
  }

  startBlinkingCursor(): void {
    const cursorElement = document.createElement('span');
    cursorElement.textContent = '|';
    cursorElement.style.animation = 'blink-caret 0.75s step-end infinite';
    cursorElement.style.display = 'inline-block';
    cursorElement.style.verticalAlign = 'bottom';

    // Adjust cursor appearance
    cursorElement.style.fontWeight = 'bold'; // Make cursor bold
    this.el.nativeElement.appendChild(cursorElement);

    setInterval(() => {
      cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';
    }, this.cursorBlinkInterval);
  }
}

/*
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTypingBlinkingCursor]'
})
export class TypingBlinkingCursorDirective implements OnInit {
  @Input() textToType: string = '';
  @Input() typingSpeed: number = 20;
  @Input() cursorBlinkInterval: number = 750;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.startTyping();
  }

  startTyping(): void {
    const element = this.el.nativeElement;
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index <= this.textToType.length) {
        element.textContent = this.textToType.substring(0, index);
        index++;
      } else {
        clearInterval(typingInterval);
        this.startBlinkingCursor();
      }
    }, this.typingSpeed);
  }

  startBlinkingCursor(): void {
    const cursorElement = document.createElement('span');
    cursorElement.textContent = '|';
    cursorElement.style.animation = 'blink-caret 0.75s step-end infinite';
    cursorElement.style.display = 'inline-block';
    cursorElement.style.verticalAlign = 'bottom';

    // Adjust cursor appearance
    cursorElement.style.fontWeight = 'bold'; // Make cursor bold
    this.el.nativeElement.appendChild(cursorElement);

    setInterval(() => {
      cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';
    }, this.cursorBlinkInterval);
  }
}
*/