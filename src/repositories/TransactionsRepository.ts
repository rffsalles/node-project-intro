import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  // eslint-disable-next-line class-methods-use-this
  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulator: Balance, cur: Transaction) => {
        switch (cur.type) {
          case 'income':
            accumulator.income += cur.value;
            accumulator.total += cur.value;
            break;
          case 'outcome':
            accumulator.outcome += cur.value;
            accumulator.total -= cur.value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      { income: 0, outcome: 0, total: 0 },
    );
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
