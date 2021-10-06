import { Injectable } from '@angular/core';
import { TodoModule } from 'src/core/models/todo/todo.module';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private localstorageService: LocalstorageService) { }

  key: string = 'todoItems';

  addTodoItem(todoItem: TodoModule) {
    // To get data from component and pass it to local storage service
    let existingTodoList: TodoModule[] = [];
    if (JSON.stringify(this.localstorageService.getItem('todoItems')) != '[{}]') {
      existingTodoList = this.localstorageService.getItem('todoItems');
    }
    existingTodoList.push(todoItem);

    this.localstorageService.setItem(this.key, existingTodoList);
  }

  generateId() {
    // To generate todo unique id for identifying and deleting 
    return Math.floor((Math.random() * 6) + 1);
  }

  getTodoList() {
    // To get data from local storage
    return this.localstorageService.getItem(this.key);
  }

  deleteTodoList(itemId: string) {
    // To delet todo from localstorage 
    let existingTodoList: TodoModule[] = [];
    existingTodoList = this.localstorageService.getItem(this.key);
    let index = existingTodoList.findIndex(x => x.Id === itemId);
    existingTodoList.splice(index, 1);
    this.localstorageService.setItem(this.key, existingTodoList);
  }
}
