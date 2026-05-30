import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AccountsService, Account } from '../../../core/services/accounts';
import { TransactionsService, Transaction } from '../../../core/services/transactions';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  accounts: Account[] = [];
  transactions: Transaction[] = [];
  totalBalance = 0;

  constructor(
    private accountsService: AccountsService,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit() {
    this.accountsService.getAll().subscribe(accounts => {
      this.accounts = accounts;
      this.totalBalance = accounts.reduce((sum, a) => sum + Number(a.balance), 0);
    });

    this.transactionsService.getAll().subscribe(transactions => {
      this.transactions = transactions.slice(0, 6);
    });
  }
}
