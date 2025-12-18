import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-get-api',
  imports: [],
  templateUrl: './get-api.html',
  styleUrl: './get-api.scss',
})
export class GetApi {
  private http = inject(HttpClient);

  userList = signal<any[]>([]);
  productsList = signal<any[]>([]);

  fetchUsers(){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data) => {
      this.userList.set(data as any[]);
    });
  }
  fetchProducts(){
    this.http.get('https://fake-store-api.mock.beeceptor.com/api/products').subscribe((data) => {
      this.productsList.set(data as any[]);
    });
  }

  constructor() {
  
  }


}
