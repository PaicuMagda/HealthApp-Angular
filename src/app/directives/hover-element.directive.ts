import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverElement]',
  standalone: true,
})
export class HoverElementDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.addHoverListenerStyles();
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.removeHostListenerStyles();
  }

  private addHoverListenerStyles() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'transform',
      'scale(1.1)'
    );
    this.renderer.setStyle(
      this.element.nativeElement,
      'box-shadow',
      '7px 7px 7px 7px rgba(0.4,0.4,0.4,0.4)'
    );
  }

  private removeHostListenerStyles() {
    this.renderer.removeStyle(this.element.nativeElement, 'box-shadow');
    this.renderer.removeStyle(this.element.nativeElement, 'transform');
  }
}
