import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private httpClient: HttpClient) {}

  getTasks() {
    return this.httpClient.get<Task[]>('http://localhost:3000/tasks');
  }
  getUsers() {
    return this.httpClient.get<[]>('http://localhost:3000/users');
  }
  submit() {
    // this.httpClient.post<Task[]>('http://localhost:3000/tasks',);
  }
}
