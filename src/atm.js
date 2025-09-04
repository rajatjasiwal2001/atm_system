export class ATMSystem {
  constructor() {
    this.userAccounts = {
      "121": { name: "Rajat Jaiswal", amount: 601452210 },
      "122": { name: "Ashish Singh", amount: 15000 },
      "123": { name: "Sumesh Chauhan", amount: 1010452 },
      "124": { name: "Princy Maurya", amount: 100000 },
      "125": { name: "Sanjeev Sir", amount: 1000 },
      "126": { name: "Rachit Mishra", amount: 200000 },
      "127": { name: "Shanu Yadav", amount: 3000412 },
      "128": { name: "Shrishti Jaiswal", amount: 40010140 },
      "129": { name: "Mamta Vishwarama", amount: 5001452 },
      "130": { name: "Akash Gupta", amount: 1000 },
      "131": { name: "Byuti", amount: 709000 }
    };
  }

  accountExists(accountNumber) {
    return this.userAccounts.hasOwnProperty(accountNumber);
  }

  getUser(accountNumber) {
    return this.userAccounts[accountNumber];
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  deposit(accountNumber, amount) {
    const user = this.getUser(accountNumber);
    const previousBalance = user.amount;
    user.amount += amount;
    
    return `💰 Hi ${user.name}, Your Balance was ${this.formatCurrency(previousBalance)}. New Balance is ${this.formatCurrency(user.amount)}.`;
  }

  withdraw(accountNumber, amount) {
    const user = this.getUser(accountNumber);
    const previousBalance = user.amount;
    user.amount -= amount;
    
    return `💸 Hi ${user.name}, Your Balance was ${this.formatCurrency(previousBalance)}. New Balance is ${this.formatCurrency(user.amount)}.`;
  }

  checkBalance(accountNumber) {
    const user = this.getUser(accountNumber);
    return `🏦 Hi ${user.name}, Your Current Balance is ${this.formatCurrency(user.amount)}.`;
  }

  canWithdraw(accountNumber, amount) {
    const user = this.getUser(accountNumber);
    return user.amount >= amount;
  }
}