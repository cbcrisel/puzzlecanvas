import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  public socketStatus=false;
  callback: EventEmitter<any> = new EventEmitter();
  constructor(
    private socket: Socket
  ) { 
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emit=(payload={})=>{
    this.socket.emit('event',payload);
   // console.log('emitiendo ',payload);
  }

 /*  listen() {
    this.socket.on('event',(data:any)=>this.callback.emit(data))
  }  */
  listenServer(){
    return this.socket.fromEvent('event');
  }

}
