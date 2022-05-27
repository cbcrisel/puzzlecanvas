import { sanitizeIdentifier } from "@angular/compiler";

export class Piece{
    public rowIndex:number;
    public colIndex:number;
    
    public x:number;
    public y:number;
    public width:number;
    public height:number;
    public xCorrect:number;
    public yCorrect:number;
    public correct:boolean;
    public bottom:any;
    public top:any;
    public left:any;
    public right:any;
    constructor(rowIndex:number,colIndex:number,size:{x:number,y:number,width:number,height:number,rows:number,cols:number}){
        this.rowIndex=rowIndex;
        this.colIndex=colIndex;
        
        this.width=size.width/size.cols;
        this.height=size.height/size.rows;
        this.x=size.x+this.width*this.colIndex;
        this.y=size.y+this.height*this.rowIndex;
        this.xCorrect=this.x;
        this.yCorrect=this.y;
        this.correct=true;
        this.bottom=null;
        this.top=null;
        this.left=null;
        this.right=null;
    }

    draw(context:any,image:any,size:{x:number,y:number,width:number,height:number,rows:number,cols:number}){
        context.beginPath();
        
       /*  context.drawImage(image,
            this.colIndex*image.width/size.cols,
            this.rowIndex*image.height/size.rows,
            image.width/size.cols,
            image.height/size.rows,
            this.x,
            this.y,
            this.width,
            this.height);  */
            
        const sz=Math.min(this.width,this.height);
        const neck=0.1*sz;
        const tabWidth=0.2*sz;
        const tabHeight=0.2*sz;
        
        //context.rect(this.x,this.y,this.width,this.height);
        //from top to left
        context.moveTo(this.x,this.y);
        //to top right
        if(this.top){
            context.lineTo(this.x+this.width*Math.abs(this.top)-neck,this.y);
            context.lineTo(this.x+this.width*Math.abs(this.top),this.y-tabHeight*Math.sign(this.top));
            context.lineTo(this.x+this.width*Math.abs(this.top)+neck,this.y);
        }
        context.lineTo(this.x+this.width,this.y);
        //to bottom right
        if(this.right){
            context.lineTo(this.x+this.width,this.y+this.height*Math.abs(this.right)-neck);
            context.lineTo(this.x+this.width-tabHeight*Math.sign(this.right),this.y+this.height*Math.abs(this.right));
            context.lineTo(this.x+this.width,this.y+this.height*Math.abs(this.right)+neck);
        }
        context.lineTo(this.x+this.width,this.y+this.height);
        //to bottom left
        if(this.bottom){
            context.lineTo(this.x+this.width*Math.abs(this.bottom)+neck,this.y+this.height);
            context.lineTo(this.x+this.width*Math.abs(this.bottom),this.y+this.height+tabHeight*Math.sign(this.bottom));
            context.lineTo(this.x+this.width*Math.abs(this.bottom)-neck,this.y+this.height);
        }
        context.lineTo(this.x,this.y+this.height);
        //to top left
        if(this.left){
            context.lineTo(this.x,this.y+this.height*Math.abs(this.left)+neck);
            context.lineTo(this.x+tabHeight*Math.sign(this.left),this.y+this.height*Math.abs(this.left));
            context.lineTo(this.x,this.y+this.height*Math.abs(this.left)-neck);
        }
        
        context.lineTo(this.x,this.y);

        context.strokeStyle = "black"
        context.stroke();
    }

    isClose(){
        if(this.distance({x:this.x,y:this.y},{x:this.xCorrect,y:this.yCorrect})<this.width/3){
            return true;
        }
        return false;
    }
    snap(){
        this.x=this.xCorrect;
        this.y=this.yCorrect;
        this.correct=true;
    }
    distance(p1:any,p2:any){
        return Math.sqrt(p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y);
    }
}