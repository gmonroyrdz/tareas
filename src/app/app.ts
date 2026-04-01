import { Component, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importa los módulos de Angular Material que vas a usar
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { Todo, Priority } from './services/todo';


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonToggleModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers :[Todo],
})
export class App {
  filter = signal<'todas' | 'pendientes' | 'completadas' | 'alta'>('todas');
  selectedPriority = signal<Priority>('media');
  newTaskTitle = '';

  constructor(public todoService: Todo) {}

  addTask(): void {
    if (this.newTaskTitle.trim()) {
      this.todoService.addTask(this.newTaskTitle, this.selectedPriority());
      this.newTaskTitle = '';
    }
  }

  setFilter(filter: 'todas' | 'pendientes' | 'completadas' | 'alta'): void {
    this.filter.set(filter);
  }

  setPriority(priority: Priority): void {
    this.selectedPriority.set(priority);
  }

  onFilterChange(event: any): void {
    this.setFilter(event);
  }

  onPriorityChange(event: any): void {
    this.setPriority(event);
  }

  get filteredTasks() {
    const tasks = this.todoService.tasksSignal();
    switch (this.filter()) {
      case 'pendientes':
        return tasks.filter(t => !t.done);
      case 'completadas':
        return tasks.filter(t => t.done);
      case 'alta':
        return tasks.filter(t => t.priority === 'alta');
      default:
        return tasks;
    }
  }
}
