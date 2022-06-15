import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/Constants';
import { Utils } from 'src/app/Utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged:boolean;
  token:any;
  constructor(

  ) { 
    this.token=Utils.get(Constants.ACTUAL_ACCESS_TOKEN);
    this.logged= this.token != null;
  }

  ngOnInit(): void {
  }

}
