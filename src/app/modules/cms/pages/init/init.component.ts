import { Component } from '@angular/core';
import { ImagesCarousel } from 'src/app/models/images.carousel';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent {

    images:ImagesCarousel[] = [
    {
      imageSrc: '../../../../../assets/images/anciana-canas-tomando-selfie-telefono-movil-persona-mayor-disfruta-tecnologia_442523-221.avif',
      imageAlt: 'Image',
      title: 'Luz Ángela López',
      description:'Increíble cómo la plataforma trajo la fiesta al hospital en casa. ¡El equipo médico es como mi grupo de rock personal, siempre listos para rockear el tratamiento y hacerme sentir genial!'
    },
    {
      imageSrc: '../../../../../assets/images/anciana-canas-tomando-selfie-telefono-movil-persona-mayor-disfruta-tecnologia_442523-221.avif',
      imageAlt: 'Image',
      title: 'Luz Ángela López',
      description:'Increíble cómo la plataforma trajo la fiesta al hospital en casa. ¡El equipo médico es como mi grupo de rock personal, siempre listos para rockear el tratamiento y hacerme sentir genial!'
    },
    {
      imageSrc: '../../../../../assets/images/anciana-canas-tomando-selfie-telefono-movil-persona-mayor-disfruta-tecnologia_442523-221.avif',
      imageAlt: 'Image',
      title: 'Luz Ángela López',
      description:'Increíble cómo la plataforma trajo la fiesta al hospital en casa. ¡El equipo médico es como mi grupo de rock personal, siempre listos para rockear el tratamiento y hacerme sentir genial!'
    }
  ]
}
