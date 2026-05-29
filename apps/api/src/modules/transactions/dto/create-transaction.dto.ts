import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
    label: string;
    amount: number;
    date: string;
    type: TransactionType;
    accountId: number;
    categoryId?: number;
}