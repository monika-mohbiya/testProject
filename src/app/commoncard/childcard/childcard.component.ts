import { Component } from '@angular/core';
import { CommoncardComponent } from "../commoncard.component";

@Component({
  selector: 'app-childcard',
  imports: [CommoncardComponent],
  templateUrl: './childcard.component.html',
  styleUrl: './childcard.component.scss'
})
export class ChildcardComponent {

}
