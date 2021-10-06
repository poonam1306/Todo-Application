import { Injectable } from '@angular/core';
import { TodoModule } from 'src/core/models/todo/todo.module';

@Injectable()
export class LocalstorageService {

  constructor() { }

  getItem(key: string) {
    // To get Localstorage data
    return JSON.parse(window.localStorage.getItem(key) || '[{}]');
  }

  setItem(key: string, value: TodoModule[]) {
    // To set item to Localstorage
    window.localStorage[key] = JSON.stringify(value);
  }

  removeItem(key: string) {
    // To remove item from Localstorage 
    window.localStorage.removeItem(key);
  }

  clear() {
    // Clear localstorage - not in use currently
    window.localStorage.clear();
  }
}
