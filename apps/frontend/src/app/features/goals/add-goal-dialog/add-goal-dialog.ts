import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-goal-dialog',
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-goal-dialog.html',
  styleUrl: './add-goal-dialog.scss'
})
export class AddGoalDialog {
  name = '';
  targetAmount = 0;
  currentAmount = 0;
  deadline = '';

  constructor(private dialogRef: MatDialogRef<AddGoalDialog>) {}

  confirm() {
    this.dialogRef.close({
      name: this.name,
      targetAmount: this.targetAmount,
      currentAmount: this.currentAmount,
      deadline: this.deadline || undefined
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
