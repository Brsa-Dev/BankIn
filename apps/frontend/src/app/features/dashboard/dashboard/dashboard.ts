import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {Color, LegendPosition, NgxChartsModule, ScaleType} from '@swimlane/ngx-charts';
import { AccountsService, Account } from '../../../core/services/accounts';
import { TransactionsService, Transaction } from '../../../core/services/transactions';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule, MatIconModule, NgxChartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  accounts: Account[] = [];
  transactions: Transaction[] = [];
  totalBalance = 0;

  // Donut chart data
  allocationData: { name: string; value: number }[] = [];colorScheme: Color = {
    name: 'bankin',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#1A237E', '#00BCD4', '#3949AB', '#4DD0E1', '#26C6DA']
  };

  legendPosition = LegendPosition.Below;

  // Données graphique dépenses par catégorie
  categoryData: { name: string; value: number }[] = [];

  constructor(
    private accountsService: AccountsService,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit() {
    this.accountsService.getAll().subscribe(accounts => {
      this.accounts = accounts;
      this.totalBalance = accounts.reduce((sum, a) => sum + Number(a.balance), 0);
      this.buildAllocationData(accounts);
    });

    this.transactionsService.getAll().subscribe(transactions => {
      this.transactions = transactions.slice(0, 6);
    });

    this.transactionsService.getAll().subscribe(transactions => {
      this.transactions = transactions.slice(0, 6);
      this.buildCategoryData(transactions);
    });
  }

  buildAllocationData(accounts: Account[]) {
    const labels: Record<string, string> = {
      CHECKING: 'Comptes courants',
      SAVINGS: 'Épargne',
      INVESTMENT: 'Investissements',
      LIFE_INSURANCE: 'Assurance vie',
      CRYPTO: 'Crypto'
    };

    const groups: Record<string, number> = {};
    accounts.forEach(a => {
      const label = labels[a.type] || a.type;
      groups[label] = (groups[label] || 0) + Number(a.balance);
    });

    this.allocationData = Object.entries(groups)
      .map(([name, value]) => ({ name, value }))
      .filter(d => d.value > 0);
  }

  buildCategoryData(transactions: Transaction[]) {
    const groups: Record<string, number> = {};
    transactions
      .filter(t => t.type === 'DEBIT')
      .forEach(t => {
        const cat = t.category?.name || 'Autre';
        groups[cat] = (groups[cat] || 0) + Number(t.amount);
      });

    this.categoryData = Object.entries(groups)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }
}
