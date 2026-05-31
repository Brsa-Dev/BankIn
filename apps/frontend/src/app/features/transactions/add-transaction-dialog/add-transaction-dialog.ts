import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { AccountsService, Account } from '../../../core/services/accounts';
import { environment } from '../../../../environments/environment';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-transaction-dialog',
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './add-transaction-dialog.html',
  styleUrl: './add-transaction-dialog.scss'
})
export class AddTransactionDialog implements OnInit {
  label = '';
  amount = 0;
  type = 'DEBIT';
  date = new Date().toISOString().split('T')[0];
  accountId: number | null = null;
  categoryId: number | null = null;
  accounts: Account[] = [];
  categories: Category[] = [];

  transactionTypes = [
    { value: 'DEBIT', label: 'Dépense' },
    { value: 'CREDIT', label: 'Revenu' },
  ];

  constructor(
    private dialogRef: MatDialogRef<AddTransactionDialog>,
    private accountsService: AccountsService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.accountsService.getAll().subscribe(accounts => {
      this.accounts = accounts;
      if (accounts.length > 0) this.accountId = accounts[0].id;
    });

    this.http.get<Category[]>(`${environment.apiUrl}/categories`).subscribe(cats => {
      this.categories = cats;
    });
  }

  confirm() {
    this.dialogRef.close({
      label: this.label,
      amount: this.amount,
      type: this.type,
      date: this.date,
      accountId: this.accountId,
      categoryId: this.categoryId || undefined
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
