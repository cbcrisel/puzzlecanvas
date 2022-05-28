import { Component, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Piece } from 'src/app/models/piece';
import { PuzzleService } from 'src/app/services/puzzle/puzzle.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasRef',{static:false}) canvasRef: any;

  isRandom=false;
  imageObj = new Image();
  imageName:any;
  scaler=0.7;
  photoURL='';
  size={x:0,y:0,width:0,height:0,rows:3,cols:3};
  pieces:any[]=[];
  selectedPiece:any;
  private context: any;
  constructor(
    private _puzzleService:PuzzleService
  ) {
    
    //this.imageName='https://pm1.narvii.com/6365/8b690f9fc407f382b5ba09cc1a36d44398cae740_hq.jpg'
    //this.imageName=`http://localhost:3000/public/uploads/file-1653576370481-128823015.jpg `
   }
   


  ngOnInit(): void {
     
  }
  ngAfterViewInit(): void {
    this.getPuzzleInfo();
    
    
   
    this.imageObj.onload = () => {
      this.drawImage();
    }
    
  }
  getPuzzleInfo(){
    this._puzzleService.getPuzzle().subscribe(
      Response=>{
        //console.log(Response.puzzle);
        let srt='http://localhost:3000/'+Response.puzzle.image;
        this.photoURL=srt.replace(/\\/g, "/");
        this.imageName=this.photoURL;
        this.imageObj.src=this.imageName;
        console.log(this.imageObj);
        console.log(this.photoURL);
        this.render();
      }
    )
  }

  private render():any{
    const canvasElement= this.canvasRef.nativeElement;
    this.context = canvasElement.getContext('2d');
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
    //this.imageObj.src = this.imageName;
    console.log(this.imageObj);
    console.log(this.photoURL);
    let reziser=this.scaler*Math.min(window.innerWidth/this.imageObj.width,window.innerHeight/this.imageObj.height);
    this.size.width=reziser*this.imageObj.width;
    this.size.height=reziser*this.imageObj.height;
    this.size.x=window.innerWidth/2-this.size.width/2;
    this.size.y=window.innerHeight/2-this.size.height/2;

    this.initializePieces(3,3);
    this.randomizePieces();
    
  }

  drawImage(){
    this.context.clearRect(0,0,window.innerWidth,window.innerHeight);
    

      this.context.globalAlpha=0.3;
      this.context.drawImage(this.imageObj,this.size.x,this.size.y,this.size.width,this.size.height);
    
    
    
    this.context.globalAlpha=1;
    for(let i=0;i<this.pieces.length;i++){
      this.pieces[i].draw(this.context,this.imageObj,this.size,);
    }
    window.requestAnimationFrame(() => this.drawImage() );    
  }

  initializePieces(row:number, col:number){
    this.size.rows=row;
    this.size.cols=col;
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
      console.log(this.pieces); 
    }
    

  randomizePieces(){
    for(let i=0;i<this.pieces.length;i++){
      let loc={
        x:Math.random()*(window.innerWidth-this.pieces[i].width),
        y:Math.random()*(window.innerHeight-this.pieces[i].height)
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
      console.log(this.selectedPiece);
  }
  

  @HostListener('mousemove', ['$event'])
  onMouseMove=(e: any) =>{ 
      if(this.selectedPiece!=null){
        this.selectedPiece.x=e.x-this.selectedPiece.offsetX;
        this.selectedPiece.y=e.y-this.selectedPiece.offsetY;
        console.log(this.selectedPiece.x);
      }
    
  }
  

  @HostListener('mouseup', ['$event'])
  onMouseUp=(e: any) =>{
    if(this.selectedPiece!=null){
    if(this.selectedPiece.isClose()){
      this.selectedPiece.snap();
      if(this.isComplete()){
        alert('you ended it');
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


}
