import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoModule } from 'src/core/models/todo/todo.module';
import { TodoService } from '../service/todo.service';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  todoList: TodoModule[] = [];
  todoFrom = new FormGroup({
    todo: new FormControl('', Validators.required)
  });

  constructor(private formBuilder: FormBuilder,
    private todoService: TodoService) {

  }

  ngOnInit(): void {
    // to get data when the page is loaded
    this.getTodoList();
  }

  get f() {
    // to pass form controls infromation to html, like is valid or not
    return this.todoFrom.controls;
  }

  submitTodoItem() {
    // on submit add data to localstorage
    if (!this.todoFrom.invalid) {
      let date = new Date();
      let data: TodoModule = {
        Id: this.todoFrom.value.todo + this.todoService.generateId(),
        todo: this.todoFrom.value.todo,
        creationDate: date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + " " + date.getHours() + ':' + date.getMinutes(),
        isCompeted: false,
      };
      this.todoService.addTodoItem(data)
    }
    this.getTodoList()
  }

  getTodoList() {
    // to get data from localstorage
    this.todoList = this.todoService.getTodoList();
    if (JSON.stringify(this.todoList) == '[{}]')
      this.todoList = [];
  }

  deleteTodoItem(itemId: string) {
     // to delete item from localstorage
    this.todoService.deleteTodoList(itemId);
    this.getTodoList();
  }
}
