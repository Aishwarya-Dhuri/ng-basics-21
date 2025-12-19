import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-post-api',
  imports: [FormsModule],
  templateUrl: './post-api.html',
  styleUrl: './post-api.scss',
})
export class PostApi {
  http = inject(HttpClient);
  newBatchObj : Batch = new Batch();
  
  batchList = signal<Batch[]>([]);
  constructor() {
    this.getAllBatches();
  }

  getAllBatches(){
    this.http.get("https://api.freeprojectapi.com/api/FeesTracking/batches").subscribe(
      {
        next: (res)=>{
          
          this.batchList.set(res as Batch[]);
          console.log("Batches fetched successfully",res);
        },
        error: (err)=>{
          alert(err.error.message);
        }
      }
    );
  }

  onSaveBatch(){
    this.http.post("https://api.freeprojectapi.com/api/FeesTracking/batches",this.newBatchObj).subscribe(
      {
        next: (res)=>{
          console.log("Batch created successfully",res);
          alert("Batch created successfully");
           this.getAllBatches();
        },
        error: (err)=>{
          alert(err.error.message);
        }
      }
    );
  }

  onEditBatch(batch:Batch){
    const stringData = JSON.stringify(batch);
    const strObject = JSON.parse(stringData);
    this.newBatchObj = strObject;
  }

  onUpdateBatch(){
    this.http.put("https://api.freeprojectapi.com/api/FeesTracking/batches/"+this.newBatchObj.batchId,this.newBatchObj).subscribe(
      {
        next: (res)=>{
          console.log("Batch updated successfully",res);
          alert("Batch updated successfully");
          this.getAllBatches();
        },
        error: (err)=>{
          alert(err.error.message);
        }
      }
    );
  }

  onDeleteBatch(batchId:number){
    const isConrfirmed = confirm("Are you sure to delete this batch?");
    if(!isConrfirmed){
      return;
    }
     this.http.delete("https://api.freeprojectapi.com/api/FeesTracking/batches/"+batchId).subscribe(
      {
        next: (res)=>{
          console.log("Batch deleted successfully",res);
          alert("Batch deleted successfully");
          this.getAllBatches();
        },
        error: (err)=>{
          alert(err.error.message);
        }
      }
    );
  }
}

class Batch{
  batchId:number;
  batchName:string;
  createdDate:Date;
  constructor(){
    this.batchId=0;
    this.batchName="";
    this.createdDate=new Date();
  }
}
