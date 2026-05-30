import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-account-dialog',
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './add-account-dialog.html',
  styleUrl: './add-account-dialog.scss'
})
export class AddAccountDialog {
  name = '';
  type = 'CHECKING';
  balance = 0;
  currency = 'EUR';
  institutionName = '';

  accountTypes = [
    { value: 'CHECKING', label: 'Compte courant' },
    { value: 'SAVINGS', label: 'Livret' },
    { value: 'INVESTMENT', label: 'Investissement' },
    { value: 'LIFE_INSURANCE', label: 'Assurance vie' },
    { value: 'CRYPTO', label: 'Crypto' },
  ];

  constructor(private dialogRef: MatDialogRef<AddAccountDialog>) {}

  confirm() {
    this.dialogRef.close({
      name: this.name,
      type: this.type,
      balance: this.balance,
      currency: this.currency,
      institutionName: this.institutionName
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
