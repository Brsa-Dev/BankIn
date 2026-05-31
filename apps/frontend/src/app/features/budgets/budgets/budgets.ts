import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BudgetsService, Budget } from '../../../core/services/budgets';
import {AddBudgetDialog} from '../add-budget-dialog/add-budget-dialog';

@Component({
  selector: 'app-budgets',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule, MatProgressBarModule],
  templateUrl: './budgets.html',
  styleUrl: './budgets.scss'
})
export class Budgets implements OnInit {
  budgets: Budget[] = [];
  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  constructor(private budgetsService: BudgetsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadBudgets();
  }

  loadBudgets() {
    this.budgetsService.getAll().subscribe(budgets => {
      this.budgets = budgets;
    });
  }

  openAddDialog() {
    const ref = this.dialog.open(AddBudgetDialog);
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.budgetsService.create(result).subscribe(() => this.loadBudgets());
      }
    });
  }

  getMonthName(month: number): string {
    return new Date(2026, month - 1).toLocaleDateString('fr-FR', { month: 'long' });
  }

  getProgress(budget: Budget): number {
    return Math.min(100, Math.round((0 / Number(budget.limit)) * 100));
  }

  delete(id: number) {
    this.budgetsService.delete(id).subscribe(() => this.loadBudgets());
  }
}
