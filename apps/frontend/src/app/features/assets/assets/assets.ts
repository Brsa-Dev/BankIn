import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AssetsService, Asset } from '../../../core/services/assets';
import {AddAssetDialog} from '../add-asset-dialog/add-asset-dialog';

@Component({
  selector: 'app-assets',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './assets.html',
  styleUrl: './assets.scss'
})
export class Assets implements OnInit {
  assets: Asset[] = [];
  totalValue = 0;

  constructor(private assetsService: AssetsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadAssets();
  }

  loadAssets() {
    this.assetsService.getAll().subscribe(assets => {
      this.assets = assets;
      this.totalValue = assets.reduce((sum, a) => sum + Number(a.estimatedValue), 0);
    });
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      REAL_ESTATE: 'Immobilier',
      STOCK: 'Actions',
      CRYPTO: 'Crypto',
      VEHICLE: 'Véhicule',
      OTHER: 'Autre'
    };
    return labels[type] || type;
  }

  getTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      REAL_ESTATE: 'home',
      STOCK: 'trending_up',
      CRYPTO: 'currency_bitcoin',
      VEHICLE: 'directions_car',
      OTHER: 'category'
    };
    return icons[type] || 'category';
  }

  getTypeColor(type: string): string {
    const colors: Record<string, string> = {
      REAL_ESTATE: '#5C6BC0',
      STOCK: '#1A237E',
      CRYPTO: '#26C6DA',
      VEHICLE: '#FF8A65',
      OTHER: '#90A4AE'
    };
    return colors[type] || '#90A4AE';
  }

  openAddDialog() {
    const ref = this.dialog.open(AddAssetDialog);
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.assetsService.create(result).subscribe(() => this.loadAssets());
      }
    });
  }

  delete(id: number) {
    this.assetsService.delete(id).subscribe(() => this.loadAssets());
  }
}
