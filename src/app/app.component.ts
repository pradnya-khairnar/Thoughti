import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'User Tasks';
  users: Array<string> = [];
  tasks: Task[] = [];
  charCount: number = 0;
  importTasks: Task[] = [];
  importantFlag: boolean = true;
  taskForm: FormGroup;
  expiryDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      taskDescription: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      expiryDate: new FormControl(
        formatDate(this.expiryDate, 'yyyy-MM-dd', 'en')
      ),
      users: new FormControl(''),
      important: new FormControl('', Validators.required),
    });

    this.taskService.getUsers().subscribe((user: []) => {
      this.users = user;
    });
    this.taskService.getTasks().subscribe((task: Task[]) => {
      this.tasks = task;
      this.importTasks = this.tasks.filter((task: Task) => {
        return task.Important;
      });
    });
  }
  onClose(taskName: string) {
    this.importTasks = this.importTasks.filter((task: Task) => {
      if (taskName === task.Task) {
        return false;
      }
      return true;
    });
  }

  charChange() {
    this.charCount = this.taskDescription.length;
  }
  changeFlag(e: any) {
    this.importantFlag = e.target.checked;
  }

  onSubmit() {
    let impVal = this.taskForm.get('important')?.value;
    impVal = this.importantFlag;
    console.log('submitted', this.taskForm.value);
  }
  get taskDescription() {
    return this.taskForm.get('taskDescription')?.value;
  }
}
