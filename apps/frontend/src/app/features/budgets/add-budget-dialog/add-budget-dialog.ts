import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-budget-dialog',
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './add-budget-dialog.html',
  styleUrl: './add-budget-dialog.scss'
})
export class AddBudgetDialog implements OnInit {
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();
  limit = 0;
  categoryId: number | null = null;
  categories: Category[] = [];

  months = [
    { value: 1, label: 'Janvier' }, { value: 2, label: 'Février' },
    { value: 3, label: 'Mars' }, { value: 4, label: 'Avril' },
    { value: 5, label: 'Mai' }, { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' }, { value: 8, label: 'Août' },
    { value: 9, label: 'Septembre' }, { value: 10, label: 'Octobre' },
    { value: 11, label: 'Novembre' }, { value: 12, label: 'Décembre' },
  ];

  constructor(
    private dialogRef: MatDialogRef<AddBudgetDialog>,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<Category[]>(`${environment.apiUrl}/categories`).subscribe(cats => {
      this.categories = cats;
      if (cats.length > 0) this.categoryId = cats[0].id;
    });
  }

  confirm() {
    this.dialogRef.close({ month: this.month, year: this.year, limit: this.limit, categoryId: this.categoryId });
  }

  cancel() {
    this.dialogRef.close();
  }
}
