import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AccountsService, Account } from '../../../core/services/accounts';
import { AddAccountDialog } from '../add-account-dialog/add-account-dialog';

@Component({
  selector: 'app-accounts',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss'
})
export class Accounts implements OnInit {
  accounts: Account[] = [];
  totalBalance = 0;

  constructor(
    private accountsService: AccountsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountsService.getAll().subscribe(accounts => {
      this.accounts = accounts;
      this.totalBalance = accounts.reduce((sum, a) => sum + Number(a.balance), 0);
    });
  }

  openAddDialog() {
    const ref = this.dialog.open(AddAccountDialog);
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.accountsService.createWithInstitution(result).subscribe(() => {
          this.loadAccounts();
        });
      }
    });
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      CHECKING: 'Compte courant',
      SAVINGS: 'Livret',
      INVESTMENT: 'Investissement',
      LIFE_INSURANCE: 'Assurance vie',
      CRYPTO: 'Crypto'
    };
    return labels[type] || type;
  }

  getTypeColor(type: string): string {
    const colors: Record<string, string> = {
      CHECKING: '#1A237E',
      SAVINGS: '#00BCD4',
      INVESTMENT: '#3949AB',
      LIFE_INSURANCE: '#4DD0E1',
      CRYPTO: '#26C6DA'
    };
    return colors[type] || '#1A237E';
  }
}
