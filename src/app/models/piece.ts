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
            context.bezierCurveTo(
                this.x+this.width*Math.abs(this.top)-neck,
                this.y-tabHeight*Math.sign(this.top)*0.2,
                this.x+this.width*Math.abs(this.top)-tabWidth,
                this.y-tabHeight*Math.sign(this.top),
                this.x+this.width*Math.abs(this.top),
                this.y-tabHeight*Math.sign(this.top)
            ); 
            context.bezierCurveTo(
                this.x+this.width*Math.abs(this.top)+tabWidth,
                this.y-tabHeight*Math.sign(this.top),
                this.x+this.width*Math.abs(this.top)+neck,
                this.y-tabHeight*Math.sign(this.top)*0.2,
                this.x+this.width*Math.abs(this.top)+neck,
                this.y
            );

            //context.lineTo(this.x+this.width*Math.abs(this.top),this.y-tabHeight*Math.sign(this.top));
            //context.lineTo(this.x+this.width*Math.abs(this.top)+neck,this.y);
        }
        context.lineTo(this.x+this.width,this.y);
        //to bottom right
        if(this.right){
            context.lineTo(this.x+this.width,this.y+this.height*Math.abs(this.right)-neck);

            context.bezierCurveTo(
                this.x+this.width+tabWidth*Math.sign(this.right)*0.2,
                this.y+this.height*Math.abs(this.right)-neck,
                this.x+this.width-tabHeight*Math.sign(this.right),
                this.y+this.height*Math.abs(this.right)-tabWidth,
                this.x+this.width-tabHeight*Math.sign(this.right),
                this.y+this.height*Math.abs(this.right)
            );

            context.bezierCurveTo(
                this.x+this.width-tabHeight*Math.sign(this.right),
                this.y+this.height*Math.abs(this.right)+tabWidth,
                this.x+this.width-tabHeight*Math.sign(this.right)*0.2,
                this.y+this.height*Math.abs(this.right)+neck,
                
                this.x+this.width,
                this.y+this.height*Math.abs(this.right)+neck
            );

            //context.lineTo(this.x+this.width-tabHeight*Math.sign(this.right),this.y+this.height*Math.abs(this.right));
            //context.lineTo(this.x+this.width,this.y+this.height*Math.abs(this.right)+neck);
        }
        context.lineTo(this.x+this.width,this.y+this.height);
        //to bottom left
        if(this.bottom){
            context.lineTo(this.x+this.width*Math.abs(this.bottom)+neck,this.y+this.height);
            
            context.bezierCurveTo(
                this.x+this.width*Math.abs(this.bottom)+neck,
                this.y+this.height+tabHeight*Math.sign(this.bottom)*0.2,
                this.x+this.width*Math.abs(this.bottom)+tabWidth,
                this.y+this.height+tabHeight*Math.sign(this.bottom),
                this.x+this.width*Math.abs(this.bottom),
                this.y+this.height+tabHeight*Math.sign(this.bottom)
            );
            context.bezierCurveTo(
                this.x+this.width*Math.abs(this.bottom)-tabWidth,
                this.y+this.height+tabHeight*Math.sign(this.bottom),
                this.x+this.width*Math.abs(this.bottom)-neck,
                this.y+this.height+tabHeight*Math.sign(this.bottom)*0.2,
                
                this.x+this.width*Math.abs(this.bottom)-neck,
                this.y+this.height
            );

            //context.lineTo(this.x+this.width*Math.abs(this.bottom),this.y+this.height+tabHeight*Math.sign(this.bottom));
            //context.lineTo(this.x+this.width*Math.abs(this.bottom)-neck,this.y+this.height);
        }
        context.lineTo(this.x,this.y+this.height);
        //to top left
        if(this.left){
            context.lineTo(this.x,this.y+this.height*Math.abs(this.left)+neck);

            context.bezierCurveTo(
                this.x+tabWidth*Math.sign(this.left)*0.2,
                this.y+this.height*Math.abs(this.left)+neck,
                this.x+tabHeight*Math.sign(this.left),
                this.y+this.height*Math.abs(this.left)+tabWidth,
                this.x+tabHeight*Math.sign(this.left),
                this.y+this.height*Math.abs(this.left)
            );

            context.bezierCurveTo(
                this.x+tabHeight*Math.sign(this.left),
                this.y+this.height*Math.abs(this.left)-tabWidth,
                this.x+tabHeight*Math.sign(this.left)*0.2,
                this.y+this.height*Math.abs(this.left)-neck,
                this.x,
                this.y+this.height*Math.abs(this.left)-neck
            )

            //context.lineTo(this.x+tabHeight*Math.sign(this.left),this.y+this.height*Math.abs(this.left));
            context.lineTo(this.x,this.y+this.height*Math.abs(this.left)-neck);
        }
        
        context.lineTo(this.x,this.y);
        context.save();
        context.clip();

        const scaledTabHeight = Math.min((image.width/size.cols),(image.height/size.rows))*tabHeight/sz;

        context.drawImage(image,
            this.colIndex*image.width/size.cols-scaledTabHeight,
            this.rowIndex*image.height/size.rows-scaledTabHeight,
            image.width/size.cols+2*scaledTabHeight,
            image.height/size.rows+2*scaledTabHeight,
            this.x-tabHeight,
            this.y-tabHeight,
            this.width+tabHeight*2,
            this.height+tabHeight*2);

        context.restore();
        context.strokeStyle = "black"
        context.stroke();
    }

    isClose(){
        if(this.distance({x:this.x,y:this.y},{x:this.xCorrect,y:this.yCorrect})<this.width/3){
            return true;
        }
        return false;
    }
    snap(audio:any){
        this.x=this.xCorrect;
        this.y=this.yCorrect;
        this.correct=true;
        audio.play();
    }
    distance(p1:any,p2:any){
        return Math.sqrt(p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y);
    }
}