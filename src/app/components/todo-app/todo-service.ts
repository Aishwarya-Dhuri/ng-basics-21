import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private storageKey = 'todos-angular21';


  todos = signal<Todo[]>(this.loadTodos());


  // 📊 computed stats
  totalTodos = computed(() => this.todos().length);
  completedTodos = computed(() => this.todos().filter(t => t.completed).length);
  pendingTodos = computed(() => this.totalTodos() - this.completedTodos());


  private loadTodos(): Todo[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }


  private saveTodos(todos: Todo[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
    this.todos.set(todos);
  }


  addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };
    this.saveTodos([...this.todos(), newTodo]);
  }


  updateTodo(todo: Todo) {
    const updated = this.todos().map(t => t.id === todo.id ? todo : t);
    this.saveTodos(updated);
  }


  deleteTodo(id: number) {
    this.saveTodos(this.todos().filter(t => t.id !== id));
  }
}
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}