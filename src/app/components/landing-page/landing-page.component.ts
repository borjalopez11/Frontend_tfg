import { Component } from '@angular/core';
import {Div1Component} from "./div1/div1.component";
import {Div2Component} from "./div2/div2.component";
import {Div3Component} from "./div3/div3.component";
import {Div4Component} from "./div4/div4.component";


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [Div1Component, Div2Component, Div3Component, Div4Component],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
