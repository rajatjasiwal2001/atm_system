import './style.css';
import { ATMSystem } from './atm.js';
import Swal from 'sweetalert2';

const atmSystem = new ATMSystem();

// Create floating coins animation
function createFloatingCoins() {
  const floatingCoins = document.createElement('div');
  floatingCoins.className = 'floating-coins';
  
  const coins = ['💳', '💸', '🏦', '💰', '📈'];
  const positions = ['10%', '30%', '50%', '70%', '90%'];
  const delays = ['0s', '3s', '6s', '2s', '4s'];
  
  coins.forEach((coin, index) => {
    const coinElement = document.createElement('div');
    coinElement.className = 'coin';
    coinElement.textContent = coin;
    coinElement.style.left = positions[index];
    coinElement.style.animationDelay = delays[index];
    floatingCoins.appendChild(coinElement);
  });
  
  document.body.appendChild(floatingCoins);
}

// Create main ATM interface
function createATMInterface() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="atm-box animate__animated animate__fadeInUp">
      <h2>🏦 ATM Banking System</h2>
      
      <form id="atmForm">
        <div class="mb-3">
          <label for="account" class="form-label">🔢 Account Number</label>
          <input type="text" class="form-control" id="account" name="account" required>
        </div>

        <div class="mb-3">
          <label for="action" class="form-label">⚙️ Select Action</label>
          <select class="form-select" id="action" name="action" required>
            <option value="">-- Choose Action --</option>
            <option value="check_balance">Check Balance 🧾</option>
            <option value="deposit">Deposit 💰</option>
            <option value="withdraw">Withdraw 💸</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="amount" class="form-label">💵 Amount (₹)</label>
          <input type="number" class="form-control" id="amount" name="amount" placeholder="Only for Deposit or Withdraw">
        </div>

        <button type="submit" class="btn btn-primary">🚀 Submit</button>
      </form>

      <div id="result" class="result alert alert-success animate__animated animate__fadeIn mt-4" style="display: none;"></div>
    </div>

    <div class="footer">
      Made with ❤️ by Rajat Jaiswal
    </div>
  `;
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const account = document.getElementById('account').value;
  const action = document.getElementById('action').value;
  const amount = document.getElementById('amount').value;
  
  if (!account || !action) {
    Swal.fire("⚠️ Required", "Please fill out all required fields.", "warning");
    return;
  }
  
  // Check if account exists
  if (!atmSystem.accountExists(account)) {
    Swal.fire("❌ Invalid Account", "Account number not found. Please check your account number.", "error");
    return;
  }
  
  if ((action === 'deposit' || action === 'withdraw')) {
    if (!amount || parseInt(amount) <= 0) {
      Swal.fire("❌ Invalid Amount", "Please enter a valid amount greater than ₹0.", "error");
      return;
    }
    
    if (action === 'withdraw' && !atmSystem.canWithdraw(account, parseInt(amount))) {
      Swal.fire("❌ Insufficient Funds", "You don't have enough balance for this withdrawal.", "error");
      return;
    }
    
    Swal.fire({
      title: `Are you sure?`,
      text: `${action === 'deposit' ? "Deposit 💰" : "Withdraw 💸"} ₹${amount} ${action === 'deposit' ? 'to' : 'from'} Account #${account}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        let message;
        if (action === 'deposit') {
          message = atmSystem.deposit(account, parseInt(amount));
        } else {
          message = atmSystem.withdraw(account, parseInt(amount));
        }
        
        showResult(message);
        Swal.fire("✅ Success", `${action.charAt(0).toUpperCase() + action.slice(1)} completed successfully!`, "success");
      }
    });
    
  } else if (action === 'check_balance') {
    const message = atmSystem.checkBalance(account);
    showResult(message);
    Swal.fire("📊 Balance Retrieved", "Balance information displayed below.", "info");
  }
}

function showResult(message) {
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = message;
  resultDiv.style.display = 'block';
  resultDiv.classList.add('animate__fadeIn');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  createFloatingCoins();
  createATMInterface();
  
  // Add form event listener
  document.getElementById('atmForm').addEventListener('submit', handleFormSubmit);
});