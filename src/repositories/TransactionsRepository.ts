import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TotalByTypeDTO {
  transactions: Transaction[];
  type: 'income' | 'outcome';
}

export function getTotalByType({ transactions, type }: TotalByTypeDTO): number {
  return transactions
    .filter(transaction => transaction.type === type)
    .reduce((total, currentValue) => total + currentValue.value, 0);
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = getTotalByType({
      transactions: this.transactions,
      type: 'income',
    });

    const outcome = getTotalByType({
      transactions: this.transactions,
      type: 'outcome',
    });

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
