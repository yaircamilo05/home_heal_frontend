import { Component, Input } from '@angular/core';
import { ImagesCarousel } from 'src/app/models/images.carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  @Input() ImagesCarousel: ImagesCarousel[] = [];
}
