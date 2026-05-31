import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GoalsService, Goal } from '../../../core/services/goals';
import {AddGoalDialog} from '../add-goal-dialog/add-goal-dialog';

@Component({
  selector: 'app-goals',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule, MatProgressBarModule],
  templateUrl: './goals.html',
  styleUrl: './goals.scss'
})
export class Goals implements OnInit {
  goals: Goal[] = [];

  constructor(private goalsService: GoalsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadGoals();
  }

  loadGoals() {
    this.goalsService.getAll().subscribe(goals => {
      this.goals = goals;
    });
  }

  getProgress(goal: Goal): number {
    return Math.min(100, Math.round((Number(goal.currentAmount) / Number(goal.targetAmount)) * 100));
  }

  getRemainingDays(deadline: string): number {
    const diff = new Date(deadline).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  delete(id: number) {
    this.goalsService.delete(id).subscribe(() => this.loadGoals());
  }


  openAddDialog() {
  const ref = this.dialog.open(AddGoalDialog);
  ref.afterClosed().subscribe(result => {
    if (result) {
      this.goalsService.create(result).subscribe(() => this.loadGoals());
    }
  });
}
}
