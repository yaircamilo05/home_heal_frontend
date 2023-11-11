import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ApplicationRef, Injectable } from '@angular/core';
import { ToastComponent } from '../modules/shared/components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  constructor(private overlay: Overlay, private appRef: ApplicationRef) {}

  show(message: string, style: string): void {
    const overlayRef = this.overlay.create({
      hasBackdrop: false,
      positionStrategy: this.overlay.position().global().centerHorizontally().bottom('20px'),
    });

    const toastPortal = new ComponentPortal(ToastComponent);
    const toastRef = overlayRef.attach(toastPortal);

    toastRef.instance.message = message;
    toastRef.instance.style = style;

    this.appRef.tick();

    setTimeout(() => {
      overlayRef.detach();
    }, 3000); // Oculta el toast después de 3 segundos, puedes ajustar el tiempo según tus necesidades
  }
}
