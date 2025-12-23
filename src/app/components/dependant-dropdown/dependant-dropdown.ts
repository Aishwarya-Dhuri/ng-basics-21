import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-dependant-dropdown',
  imports: [FormsModule],
  templateUrl: './dependant-dropdown.html',
  styleUrl: './dependant-dropdown.scss',
})
export class DependantDropdown implements OnInit {
  departmentList = signal<any[]>([]);
   designationList = signal<any[]>([]);
   employeeList = signal<any[]>([]);

  http =inject(HttpClient);
  newEmployeeObj : Employee = new Employee();
  isEdit = false;

  @ViewChild('formData') formData!: NgForm;

  
  ngOnInit(){
    this.getDepartments();
    this.getAllEmployees();
  }


  getDepartments() {
      this.http.get("https://api.freeprojectapi.com/api/EmployeeApp/GetDepartments").subscribe({
        next:(res:any)=>{
          console.log(res);
          this.departmentList.set(res);
          
        },
        error:(err:any)=>{
          console.log(err);
        },
      })
  }

  getDesignationByDepartmentId(selectedDesignationName?: string){
    this.http.get("https://api.freeprojectapi.com/api/EmployeeApp/GetDesignationsByDeptId?deptId="+this.newEmployeeObj.departmentId).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.designationList.set(res);
        if (selectedDesignationName) {
          this.newEmployeeObj.designationId = this.designationList().find(d => d.designationName === selectedDesignationName)?.designationId || 0;
        }
      },
      error:(err:any)=>{
        console.log(err);
      },
    })
  }

  createEmployee(){
    const payload = { ...this.newEmployeeObj };
    if (payload.dateOfJoining) {
      payload.dateOfJoining = payload.dateOfJoining + 'T00:00:00.000Z';
    }
    this.http.post("https://api.freeprojectapi.com/api/EmployeeApp/CreateEmployee", payload).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert("Employee Created Successfully");
        this.getAllEmployees();
        this.formData.resetForm();
        this.newEmployeeObj = new Employee();
      },
      error:(err:any)=>{
        console.log(err);
      },
    })
  }

  getAllEmployees(){
    this.http.get("https://api.freeprojectapi.com/api/EmployeeApp/GetEmployees").subscribe({
      next:(res:any)=>{
        console.log(res); 
        this.employeeList.set(res);
      },
      error:(err:any)=>{
        console.log(err);
      },
    })
  }

  updateEmployee(employee?: any){
    if (employee) {
      // Populate form for editing
      this.newEmployeeObj.employeeId = employee.employeeId;
      this.newEmployeeObj.fullName = employee.fullName;
      this.newEmployeeObj.email = employee.email;
      this.newEmployeeObj.phone = employee.phone;
      this.newEmployeeObj.gender = employee.gender;
      this.newEmployeeObj.dateOfJoining = employee.dateOfJoining ? employee.dateOfJoining.split('T')[0] : '';
      this.newEmployeeObj.employeeType = employee.employeeType;
      this.newEmployeeObj.salary = employee.salary;
      // Find departmentId by name
      this.newEmployeeObj.departmentId = this.departmentList().find(d => d.departmentName === employee.departmentName)?.departmentId || 0;
      this.isEdit = true;
      // Load designations and set designationId
      this.getDesignationByDepartmentId(employee.designationName);
    } else {
      // Perform update
      const payload = { ...this.newEmployeeObj };
      if (payload.dateOfJoining) {
        payload.dateOfJoining = payload.dateOfJoining + 'T00:00:00.000Z';
      }
      this.http.put("https://api.freeprojectapi.com/api/EmployeeApp/UpdateEmployee?id=" + this.newEmployeeObj.employeeId, payload).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert("Employee Updated Successfully");
          this.getAllEmployees();
          this.isEdit = false;
          this.formData.resetForm();
          this.newEmployeeObj = new Employee();
        },
        error:(err:any)=>{
          console.log(err);
        },
      })
    }
  }

  deleteEmployee(employeeId:any){ 
    this.http.delete("https://api.freeprojectapi.com/api/EmployeeApp/DeleteEmployee?id=" + employeeId).subscribe({
      next:(res:any)=>{
        console.log(res); 
        alert("Employee Deleted Successfully");
        this.getAllEmployees();
      },
      error:(err:any)=>{
        console.log(err);
      },
    })      
  }

  cancel() {
    this.isEdit = false;
    this.formData.resetForm();
    this.newEmployeeObj = new Employee();
  }
}

class Employee{
    employeeId: number;
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    dateOfJoining: string;
    departmentId: number;
    designationId: number;
    employeeType: string;
    salary: number;

     constructor(){
        this.employeeId=0;
        this.fullName="";
        this.email="";
        this.phone="";
        this.gender="";
        this.dateOfJoining="";
        this.departmentId=0;
        this.designationId=0;
        this.employeeType="";
        this.salary=0;
  }
}
