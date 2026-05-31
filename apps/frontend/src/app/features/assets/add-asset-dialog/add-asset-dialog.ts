import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-asset-dialog',
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './add-asset-dialog.html',
  styleUrl: './add-asset-dialog.scss'
})
export class AddAssetDialog {
  name = '';
  type = 'REAL_ESTATE';
  estimatedValue = 0;
  currency = 'EUR';

  assetTypes = [
    { value: 'REAL_ESTATE', label: 'Immobilier' },
    { value: 'STOCK', label: 'Actions / Bourse' },
    { value: 'CRYPTO', label: 'Crypto' },
    { value: 'VEHICLE', label: 'Véhicule' },
    { value: 'OTHER', label: 'Autre' },
  ];

  constructor(private dialogRef: MatDialogRef<AddAssetDialog>) {}

  confirm() {
    this.dialogRef.close({ name: this.name, type: this.type, estimatedValue: this.estimatedValue, currency: this.currency });
  }

  cancel() {
    this.dialogRef.close();
  }
}
