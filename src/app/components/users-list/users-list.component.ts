import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/Constants';
import { SocketsService } from 'src/app/services/websockets/sockets.service';
import { Utils } from 'src/app/Utils';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit,AfterViewInit {
  users=[]
  constructor(
    private socketService: SocketsService
  ) { 
  
  }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    this.user();
    this.getUsers()
  }
  getUsers(){
    this.socketService.listenUser().subscribe(
      (Response:any)=>{
        this.users=Response
        console.log(this.users)
      }
    )
  }
  user(){
    this.socketService.loginWS(Utils.get(Constants.ACTUAL_USER)??'Jugador X');
  }
}
