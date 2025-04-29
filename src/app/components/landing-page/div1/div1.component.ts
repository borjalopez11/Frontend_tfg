import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-div1',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './div1.component.html',
  styleUrl: './div1.component.css'
})
export class Div1Component {

  protected readonly RouterLink = RouterLink;
}
