from flask import Flask, render_template, request

app = Flask(__name__)

class ATM:
    """ATM class to handle basic banking operations: deposit, withdraw, check balance."""

    def __init__(self, account):
        """Initialize the ATM with a specific account number."""
        self.user_account = {
            "121": {"name": "Rajat Jaiswal", "amount": 601452210},
            "122": {"name": "ashish singh", "amount": 15000},
            "123": {"name": "sumesh chauhan", "amount": 1010452},
            "124": {"name": "princy maurya", "amount": 100000},
            "125": {"name": "sanjeev sir", "amount": 1000},
            "126": {"name": "rachit mishra", "amount": 200000},
            "127": {"name": "shanu yadav", "amount": 3000412},
            "128": {"name": "shrishti jaiswal", "amount": 40010140},
            "129": {"name": "mamta vishwarama", "amount": 5001452},
            "130": {"name": "akash gupta", "amount": 1000},
            "131": {"name": "byuti", "amount": 709000},
        }
        self.account = account

    def deposit(self, amount):
        user = self.user_account[self.account]
        previous_balance = user["amount"]
        new_balance = previous_balance + amount
        user["amount"] = new_balance
        return f"💰 Hi {user['name']}, Your Balance was ₹{previous_balance}. New Balance is ₹{new_balance}."

    def withdraw(self, amount):
        user = self.user_account[self.account]
        previous_balance = user["amount"]
        new_balance = previous_balance - amount
        user["amount"] = new_balance
        return f"💸 Hi {user['name']}, Your Balance was ₹{previous_balance}. New Balance is ₹{new_balance}."

    def check_balance(self):
        user = self.user_account[self.account]
        return f"🏦 Hi {user['name']}, Your Current Balance is ₹{user['amount']}."

@app.route("/", methods=["GET", "POST"])
def index():
    message = ""
    if request.method == "POST":
        account = request.form.get("account")
        action = request.form.get("action")
        amount = request.form.get("amount")

        atm = ATM(account)

        if action == "check_balance":
            message = atm.check_balance()

        elif action == "deposit" and amount:
            message = atm.deposit(int(amount))

        elif action == "withdraw" and amount:
            message = atm.withdraw(int(amount))

    return render_template("atm.html", message=message)

if __name__ == "__main__":
    app.run(debug=True)
