import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransactionsService, Transaction } from '../../../core/services/transactions';
import { AddTransactionDialog } from '../add-transaction-dialog/add-transaction-dialog';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions implements OnInit {
  transactions: Transaction[] = [];
  totalIncome = 0;
  totalExpenses = 0;

  constructor(
    private transactionsService: TransactionsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionsService.getAll().subscribe(transactions => {
      this.transactions = transactions;
      this.totalIncome = transactions
        .filter(t => t.type === 'CREDIT')
        .reduce((sum, t) => sum + Number(t.amount), 0);
      this.totalExpenses = transactions
        .filter(t => t.type === 'DEBIT')
        .reduce((sum, t) => sum + Number(t.amount), 0);
    });
  }

  openAddDialog() {
    const ref = this.dialog.open(AddTransactionDialog);
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.transactionsService.create(result).subscribe(() => {
          this.loadTransactions();
        });
      }
    });
  }
}
