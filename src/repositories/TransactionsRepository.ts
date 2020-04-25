import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionsRepositoryDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const income = this.transactions
      .filter(tran => tran.type === 'income')
      .reduce((amount, current) => {
        return amount + current.value;
      }, 0);
    const outcome = this.transactions
      .filter(tran => tran.type === 'outcome')
      .reduce((amount, current) => {
        return amount + current.value;
      }, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({
    title,
    value,
    type,
  }: TransactionsRepositoryDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
