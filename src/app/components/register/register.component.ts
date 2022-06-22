import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _userService:UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  createUser(forma:NgForm){
    const role={
      role:"ADMIN_ROLE"
    }
    const data=Object.assign(forma.value,role)
    this._userService.postUser(data).subscribe(
      Response=>{
        alert('Usuario Creado');
        this.router.navigate(['/login'])
      }
    )
  }
}
