import { AssetType } from '@prisma/client';

export class CreateAssetDto {
    name: string;
    type: AssetType;
    estimatedValue: number;
    currency?: string;
}