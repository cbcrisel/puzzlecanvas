import { Component, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/Constants';
import { Piece } from 'src/app/models/piece';
import { PuzzleService } from 'src/app/services/puzzle/puzzle.service';
import { SocketsService } from 'src/app/services/websockets/sockets.service';
import { Utils } from 'src/app/Utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasRef',{static:false}) canvasRef: any;

  room:string='';
  isRandom=false;
  imageObj = new Image();
  audioObs = new Audio();
  audioEnd = new Audio();
  imageName:any;
  scaler=0.6;
  photoURL='';
  width=1000;
  height=657;
  size={x:0,y:0,width:0,height:0,rows:3,cols:3};
  pieces:any[]=[];
  selectedPiece:any;
  timeLeft: number = 60;
  interval:any;
  private context: any;
  public hour:any;
  public startHour:any;
  public startMinute:any;
  public startSecond:any;
  public minute:any;
  public second:any;
  public timeFinishedGame: any;
  public startTime: any;
  public endTime: any;
  constructor(
    private _puzzleService:PuzzleService,
    public socketsService: SocketsService,
    private route:ActivatedRoute
  ) {
    
    this.audioObs.src='../../../assets/pop.mp3';
    this.audioObs.load();
    this.audioEnd.src='../../../assets/completed.mp3';
    this.audioEnd.load();
    
   }
   

  ngOnInit(): void {
      this.route.paramMap.subscribe((paramMap:any) => {
        const { params } = paramMap
        this.room=params.game;
      });
      //console.log(this.room);
  }
  ngAfterViewInit(): void {
    /* console.log("WINDOW HEIGHT: "+window.innerHeight);
    console.log("WINDOW WIDTH: "+window.innerWidth); */
    this.getPuzzleInfo();

    
    this.imageObj.onload = () => {
      this.render();
      this.drawImage();
      
    }
    
    
    this.getData();
    this.usuario();
    
  }
  start(){
    this.randomizePieces();
    this.interval = setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);
  }

  usuario(){
    this.socketsService.loginWS(Utils.get(Constants.ACTUAL_USER)??'Jugador X');
  }
  updateDate(date: Date){
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    /* console.log(hours);
    console.log(minutes);
    console.log(seconds); */




    this.hour = hours % 24; //Makes the hour in 12 hours format.
    this.hour = this.hour ? this.hour : 24; // if the hour is 0 then 24 is assigned to it.

    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;// hour with single digit, add 0 in front of it

    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();

    this.second = seconds < 10 ? '0' + seconds : seconds.toString();

  }
  pauseTimeLine() {
    clearInterval(this.interval);
  }
  

  /* startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
    console.log(this.interval)
  } */

  setDifficulty(diff:String){
    switch(diff){
      case 'easy':
        this.size.rows=3;
        this.size.cols=3;
        break;
      case 'medium':
        this.size.rows=5;
        this.size.cols=5;
        break;
      case 'hard':
        this.size.rows=7;
        this.size.cols=7;
        break;
      case 'insane':
        this.size.rows=11;
        this.size.cols=11;
        break;
    }
  }

  getPuzzleInfo(){
    this._puzzleService.getPuzzle(this.room).subscribe(
      Response=>{
        //console.log(Response);
        let srt=environment.server_url+'/'+Response.puzzle.image;
        this.photoURL=srt.replace(/\\/g, "/");
        this.imageName=this.photoURL;
        this.imageObj.src=this.imageName;
        this.setDifficulty(Response.puzzle.difficulty);
        
      }
    )
  }

  private render():any{
    const canvasElement= this.canvasRef.nativeElement;
    this.context = canvasElement.getContext('2d');
   /*  canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight; */
    canvasElement.width=this.width;
    canvasElement.height=this.height;
    //this.imageObj.src = this.imageName;
    //let reziser=this.scaler*Math.min(window.innerWidth/this.imageObj.width,window.innerHeight/this.imageObj.height);
    let reziser=this.scaler*Math.min(canvasElement.width/this.imageObj.width,canvasElement.height/this.imageObj.height)
    this.size.width=reziser*this.imageObj.width;
    this.size.height=reziser*this.imageObj.height;
    /* this.size.x=window.innerWidth/2-this.size.width/2;
    this.size.y=window.innerHeight/2-this.size.height/2; */
    this.size.x=canvasElement.width/2-this.size.width/2;
    this.size.y=canvasElement.height/2-this.size.height/2;
    /* console.log("hola",this.size);
    console.log("chau",canvasElement); */
    this.initializePieces();


    //this.start_time = new Date().getTime();
    this.timeFinishedGame = null;
    this.startHour = new Date().getHours();
    this.startMinute = new Date().getMinutes();
    this.startSecond = new Date().getSeconds();
    /* const time = new Date().getTime();
    this.start_time = this.formatTime(time); */

    this.startTime = ((this.startHour).toString() + ":" + (this.startMinute).toString() + ":" + (this.startSecond + 1));
     this.interval = setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000); 



    this.randomizePieces();
    
  }

  drawImage(){
    //this.context.clearRect(0,0,window.innerWidth,window.innerHeight);
    this.context.clearRect(0,0,this.width,this.height);

      this.context.globalAlpha=0.3;
      this.context.drawImage(this.imageObj,this.size.x,this.size.y,this.size.width,this.size.height);
    
    
    
    this.context.globalAlpha=1;
    for(let i=0;i<this.pieces.length;i++){
      this.pieces[i].draw(this.context,this.imageObj,this.size);
    }
    window.requestAnimationFrame(() => this.drawImage() );    
  }

  initializePieces(){
   /*  this.size.rows=row;
    this.size.cols=col; */
    for(let i=0;i<this.size.rows;i++){
      for(let j=0;j<this.size.cols;j++){
        this.pieces.push(new Piece(i,j,this.size));
      }
    }
     let cnt=0;
    for(let i=0;i<this.size.rows;i++){
      for(let j=0;j<this.size.cols;j++){
        //For the bottom part
        if(i==this.size.rows-1){
          this.pieces[cnt].bottom=null;
        }else{

          const sng=(Math.random()-0.5)<0?-1:1;
          this.pieces[cnt].bottom= sng*(Math.random()*0.4+0.3);
        }
        //for the right part
        if(j==this.size.cols-1){

          this.pieces[cnt].right=null;
        }else{

          const sng=(Math.random()-0.5)<0?-1:1;
          this.pieces[cnt].right= sng*(Math.random()*0.4+0.3);
        }
        //for the left part
        if(j==0){

          this.pieces[cnt].left=null;
        }
        else if(j!=0){

          //console.log(this.pieces[cnt-1]);
          this.pieces[cnt].left=-this.pieces[cnt-1].right;
        }
        // for the top part
        if(i==0){
          this.pieces[cnt].top=null;
        }
        else{
          this.pieces[cnt].top=-this.pieces[cnt-this.size.cols].bottom;
        }
        cnt++;
        } 
        
        
      }
      //console.log(this.pieces); 
    }
    

  randomizePieces(){
    for(let i=0;i<this.pieces.length;i++){
      let loc={
       /*  x:Math.random()*(window.innerWidth-this.pieces[i].width),
        y:Math.random()*(window.innerHeight-this.pieces[i].height) */
        x:Math.random()*(this.width-this.pieces[i].width),
        y:Math.random()*(this.height-this.pieces[i].height)
      }
      this.pieces[i].x=loc.x;
      this.pieces[i].y=loc.y;
      this.pieces[i].correct=false;
    }
  }
  isComplete(){
    for(let i=0;i<this.pieces.length;i++){
      if(!this.pieces[i].correct){
        return false;
      }
    }
    return true;
  }
  

  getData(){
    this.socketsService.listenServerSelectedPiece().subscribe((Response:any)=>{
      this.selectedPiece=Response;
      //console.log("hola",this.selectedPiece);
     
    })
    this.socketsService.listenServer().subscribe((Response:any)=>{
      if(this.selectedPiece!=null){
        //console.log(Response);
     
        this.selectedPiece.x=Response.x;
        this.selectedPiece.y=Response.y;
        this.pieces.forEach(element => {
          if(element.colIndex==this.selectedPiece.colIndex && element.rowIndex==this.selectedPiece.rowIndex){
            element.x=Response.x;
            element.y=Response.y;
            if(element.isClose()){
              element.snap(this.audioObs);
            }
          }
        });  
      }
      
    })
    
  }




  @HostListener('mousedown', ['$event'])
  onMouseDown=(e: any) =>{
    this.selectedPiece=this.getPressedPiece(e);
      if(this.selectedPiece!=null){
       const index=this.pieces.indexOf(this.selectedPiece);
       if(index>-1){
          this.pieces.splice(index,1);
          this.pieces.push(this.selectedPiece);
        }
        this.selectedPiece.offsetX=e.x-this.selectedPiece.x;
        this.selectedPiece.offsetY=e.y-this.selectedPiece.y;
        this.selectedPiece.correct=false;
      }
      //console.log(this.selectedPiece);
      this.socketsService.emitPiece(this.selectedPiece);
  }
  

  @HostListener('mousemove', ['$event'])
  onMouseMove=(e: any) =>{ 
      if(this.selectedPiece!=null){
        this.selectedPiece.x=e.x-this.selectedPiece.offsetX;
        this.selectedPiece.y=e.y-this.selectedPiece.offsetY;
        this.socketsService.emit(this.selectedPiece);
        
      }
      
  }
  

  @HostListener('mouseup', ['$event'])
  onMouseUp=(e: any) =>{
    if(this.selectedPiece!=null){
    if(this.selectedPiece.isClose()){
      this.selectedPiece.snap(this.audioObs);
      if(this.isComplete() && this.timeFinishedGame==null){
        this.getTheTotalTime();
        this.audioEnd.play();
        setTimeout(() => {
          alert('you ended it in: '+ this.timeFinishedGame );
        }, 500);
        
      }
    }
    this.selectedPiece=null;
    }
  }


  getPressedPiece(e:MouseEvent){
    for (let i=this.pieces.length-1;i>=0;i--){
      if(e.x>this.pieces[i].x && e.x<this.pieces[i].x+this.pieces[i].width && e.y>this.pieces[i].y && e.y<this.pieces[i].y+this.pieces[i].height){
        return this.pieces[i];
      } 
    }
    return null;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart=(e: any) =>{
    let location={
      x:e.touches[0].clientX,
      y:e.touches[0].clientY
    }
    this.onMouseDown(location);
  }
  @HostListener('touchmove', ['$event'])
  onTouchMove=(e: any) =>{
    let location={
      x:e.touches[0].clientX,
      y:e.touches[0].clientY
    }
    this.onMouseMove(location);
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd=(e: any) =>{
    this.onMouseUp(e);
  }


  getTheTotalTime(){
    let nowHour = new Date().getHours();
    let nowMinute = new Date().getMinutes();
    let nowSecond = new Date().getSeconds();

    this.endTime = ((nowHour).toString() + ":" + (nowMinute).toString() + ":" + (nowSecond));
    //this.end_time = this.formatTime(new Date().getTime());
    //this.time_finished_game = ((this.end_time - this.start_time));

    let c = ((nowHour * 3600 + nowMinute * 60 + nowSecond) - (this.startHour * 3600 + this.startMinute * 60 + this.startSecond)) - 1;

    const hours = c / 3600;

    c = c % 3600;

    const minutes = c / 60;

    c = c % 60;

    const seconds = c;


    /* console.log(Math.trunc(hours));
    console.log(Math.trunc(minutes));
    console.log(seconds);
 */

    this.timeFinishedGame = ((Math.trunc(hours)).toString() + " Horas " + (Math.trunc(minutes)).toString() + " Minutos " + ((seconds)) + " Segundos");

    this.pauseTimeLine();
    /* console.log(this.startTime);
    console.log(this.endTime);
    console.log(this.timeFinishedGame); */
  }


}
