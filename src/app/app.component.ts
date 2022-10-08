import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Nav } from './models/nav';
import { NavService } from './services/nav.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio-FrontEnd';



  constructor() { }

  ngOnInit() {

    }


}
