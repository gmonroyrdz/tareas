import { Injectable, signal, computed } from '@angular/core';

export type Priority = 'alta' | 'media' | 'baja' ;

export interface Task{
  id: number;
  title: string;
  done: boolean;
  priority: Priority;
}

@Injectable({
  providedIn: 'root',
})
export class Todo {
  private tasks = signal<Task[]>([
    {id: 1, title:'Configurar proyecto Angular Material', done:false,priority:'alta'},
    {id: 2, title:'Instalar dependeicas con npm install', done:true, priority:'media'},
    {id: 3, title:'Crear modulo de tareas', done:false, priority:'media'},
    {id: 4, title:'Implementar servicio con Signals', done:false, priority:'alta'},
    {id: 5, title:'Escribir pruebas unitarias', done:false, priority:'baja'}
  ]);

  private nextId = 6;

  readonly tasksSignal = this.tasks.asReadonly();

  readonly total = computed(() => this.tasks.length);
  readonly completed = computed(() => this.tasks().filter(t => t.done).length);
  readonly progress = computed(() => this.total() ? Math.round(( this.completed() / this.total() ) * 100): 0 );

  addTask(title: string, priority: Priority) : void{
    if (!title.trim()) return;
    const newTask: Task = {
      id: this.nextId++,
      title: title.trim(),
      done: false,
      priority:'baja'
    };
    this.tasks.update(t => [newTask, ...t]);
  }

  deleteTask(id: number) :void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
  }

  toggleDone(id: number){
    this.tasks.update(tasks => tasks.map(task => task.id === id ? { ...task, done: !task.done}: task));
  }
}
