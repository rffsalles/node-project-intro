import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
interface FilterDTO {
  title: string;
  type: 'income' | 'outcome';
}
interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

interface Transactions {
  transactions: Transaction[];
  balance: BalanceDTO;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all({ title, type }: FilterDTO): Transactions {
    const result = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return result;
  }

  // eslint-disable-next-line class-methods-use-this
  public getBalance(): BalanceDTO {
    const income = this.transactions.reduce(function (prev, cur) {
      if (cur.type === 'income') {
        return prev + cur.value;
      }
      return prev + 0;
    }, 0);
    const outcome = this.transactions.reduce(function (prev, cur) {
      if (cur.type === 'outcome') {
        return prev + cur.value;
      }
      return prev + 0;
    }, 0);
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
