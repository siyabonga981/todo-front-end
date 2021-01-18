import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  showForm = false;
  tasks: any[] = [];
  dateObj = new Date();
  date = this.dateObj.getDate();
  month = this.dateObj.getMonth() + 1;
  year = this.dateObj.getFullYear();
  dateCreated = this.year + "-" + this.month + "-" + this.date;
  task: any;
  newTask = "";


  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): any {
    this.api.genericGet('tasks').subscribe(res => {
      // Doesn't take res
      this.tasks = [res];
      this.tasks = this.tasks[0];
      console.log(this.tasks);
    }, err => {
      console.log(err);
    });

  }

  setTask(): any {
    if (this.newTask) {
      this.task = {
        dateCompleted: null,
        dateCreated: this.dateCreated,
        markedComplete: null,
        taskDescription: "",
        taskName: this.newTask
      }

      this.showForm = true;
    }
  }

  addTask(): any {
    this.api.addTodo('tasks', this.task).subscribe(res => {
      this.getTasks();
      this.newTask = "";
      this.showForm = false;
    }, err => {
      console.log(err);
    });
  }

  selectTask(item) {
    this.showForm = true;
    this.task = item;
  }

  updateTask(): any {
    console.log(this.task, "Update This");

    this.api.updateTodo('tasks/' + this.task['_id'], this.task).subscribe(res => {
      this.showForm = false;
      this.getTasks();
    }, err => {
      console.log(err);
    });
  }

  markAsRead(item): any {
    if (item.markedComplete) {
      return false;
    }

    item.dateCompleted = this.dateCreated;
    this.task = item;
    this.task.markedComplete = true;

    this.updateTask();
  }

  deleteTask(id): void {
    this.api.deleteTodo('tasks/' + id, this.task).subscribe(res => {
      this.getTasks();
    }, err => {
      console.log(err);
    });
  }
}
