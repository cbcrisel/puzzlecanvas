import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PuzzleService } from 'src/app/services/puzzle/puzzle.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  public files:any
  constructor(
    private _puzzleService:PuzzleService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  upload(event:any){
    const file=event.target.files[0];
    this.files=file  
  }
  uploadImg(forma:NgForm){
    const data= new FormData();
    data.append('file',this.files);
    data.append('difficulty',forma.value.difficulty);
    this._puzzleService.postPuzzle(data).subscribe(
      Response=>{
        console.log(Response);
        this.router.navigate(['/puzzle']);
      }
    )
  }
}
