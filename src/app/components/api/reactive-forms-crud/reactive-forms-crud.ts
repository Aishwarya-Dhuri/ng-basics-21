import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-reactive-forms-crud',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-forms-crud.html',
  styleUrl: './reactive-forms-crud.scss',
})
export class ReactiveFormsCrud {
  http = inject(HttpClient);
   competitionList = signal<Competition[]>([]);

  projectForm = new FormGroup({
    competitionId   :  new FormControl(0),
    title :new FormControl(''),
    description : new FormControl(''),
    startDate : new FormControl(''),
    endDate : new FormControl(''),
    status : new FormControl(''),

  });

  constructor() {
    this.getAllCompetitions()
  }


  getAllCompetitions() {
     this.http.get("https://api.freeprojectapi.com/api/ProjectCompetition/GetAllCompetition").subscribe(
      {
        next: (res)=>{
          
          this.competitionList.set(res as Competition[]);
          console.log("Competitions fetched successfully",res);
        },
        error: (err)=>{
          alert(err.error.message);
        }
      }
    );
  }

  saveCompetition(){
    const formValue = this.projectForm.value;
     this.http.post("https://api.freeprojectapi.com/api/ProjectCompetition/competition",formValue).subscribe(
      {
        next: (res)=>{
            alert("Competition created successfully");
            this.projectForm.reset();
               this.getAllCompetitions();
        },
        error: (err)=>{
          alert(err.error.message);
        }
      }
    );
  }

   onUpdateCompetition(){
    const formValue = this.projectForm.value;
     this.http.put("https://api.freeprojectapi.com/api/ProjectCompetition/update/"+formValue.competitionId,formValue).subscribe(
      {
        next: (res)=>{
            alert("Competition updated successfully");
            this.projectForm.reset();
               this.getAllCompetitions();
        },
        error: (err)=>{
          alert(err.error.message);
        }
      }
    );
  }



  onEditCompetition(competition:Competition){
     this.projectForm = new FormGroup({
        competitionId   :  new FormControl(competition.competitionId),
        title :new FormControl(competition.title),
        description : new FormControl(competition.description),
        startDate : new FormControl(competition.startDate),
        endDate : new FormControl(competition.endDate),
        status : new FormControl(competition.status),
    });
    
     this.getAllCompetitions();
  }

   onDeleteCompetition(competitionId:number){
    console.log("Delete competition with ID:", competitionId);
    const isConrfirmed = confirm("Are you sure to delete this competition?");
    if(isConrfirmed){
      this.http.delete("https://api.freeprojectapi.com/api/ProjectCompetition/delete/"+competitionId).subscribe(
        {
          next: (res)=>{
            console.log("Competition deleted successfully",res);
            alert("Competition deleted successfully");
            this.getAllCompetitions();
          },
          error: (err)=>{
            alert(err.error.message);
          }
        }
      );    
  }
    
  }
}

export class Competition {
  competitionId!: number;
  title!: string;
  description!: string;
  startDate!: string;
  endDate!: string;
  status!: string;
} 
