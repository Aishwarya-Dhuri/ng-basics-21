import { Component, OnInit, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo, TodoService } from './todo-service';

@Component({
  selector: 'app-todo-app',
  imports: [FormsModule],
  templateUrl: './todo-app.html',
  styleUrl: './todo-app.scss',
})
export class TodoApp {
  newTask = '';
  editingId: number | null = null;
  editTitle = '';


  constructor(public todoService: TodoService) { }


  addTask() {
    if (!this.newTask.trim()) return;
    this.todoService.addTodo(this.newTask);
    this.newTask = '';
  }


  toggle(todo: Todo) {
    this.todoService.updateTodo({ ...todo, completed: !todo.completed });
  }


  startEdit(todo: Todo) {
    this.editingId = todo.id;
    this.editTitle = todo.title;
  }


  saveEdit(todo: Todo) {
    this.todoService.updateTodo({ ...todo, title: this.editTitle });
    this.cancelEdit();
  }


  cancelEdit() {
    this.editingId = null;
    this.editTitle = '';
  }


  delete(id: number) {
    this.todoService.deleteTodo(id);
  }
}


