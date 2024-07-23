document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault();
    let amountInput = document.getElementById('amount');
    let termInput = document.getElementById('term');
    let rateInput = document.getElementById('rate');
    // Get form values
    let amount = document.getElementById('amount').value;
    let term = document.getElementById('term').value;
    let rate = document.getElementById('rate').value;
    let type = document.querySelector('input[name="mortgage-type"]:checked');

    // Validation
    let isValid = true;

    // Amount validation
    if (!amount) {
        document.getElementById('amount').classList.add('input-error');
        document.getElementById('amount-error').classList.remove('hidden');
        document.querySelector('.pound-icon').classList.add('bg-error');
        isValid = false;
    } else {
        document.getElementById('amount').classList.remove('input-error');
        document.getElementById('amount-error').classList.add('hidden');
        document.querySelector('.pound-icon').classList.remove('bg-error');
    }

    // Term validation
    if (!term) {
        document.getElementById('term').classList.add('input-error');
        document.getElementById('term-error').classList.remove('hidden');
        document.querySelector('.years').classList.add('bg-error');
        isValid = false;
    } else {
        document.getElementById('term').classList.remove('input-error');
        document.getElementById('term-error').classList.add('hidden');
        document.querySelector('.years').classList.remove('bg-error');
    }

    // Rate validation
    if (!rate) {
        document.getElementById('rate').classList.add('input-error');
        document.getElementById('rate-error').classList.remove('hidden');
        document.querySelector('.rate').classList.add('bg-error');
        isValid = false;
    } else {
        document.getElementById('rate').classList.remove('input-error');
        document.getElementById('rate-error').classList.add('hidden');
        document.querySelector('.rate').classList.remove('bg-error');
    }

    // Type validation
    if (!type) {
        document.getElementById('type-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('type-error').classList.add('hidden');
    }

    if (!isValid) {
        return;
    }

    // Calculate repayments
    const p = Number(amount);
    const r = (Number(rate) / 100) / 12;
    const monthlyInterestRate = r / 12;
    const n = Number(term) * 12;

    let monthlyRepayment;
    if (type.value === 'repayment') {
        monthlyRepayment = p * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    } else {
        monthlyRepayment = p * monthlyInterestRate;
    }

    const totalRepayment = monthlyRepayment * n;

    // Display results
    document.getElementById('monthly-repayments').textContent = `${Number(monthlyRepayment.toFixed(2)).toLocaleString()}`;
    document.getElementById('total-repayment').textContent = `${Number(totalRepayment.toFixed(2)).toLocaleString()}`;
    document.querySelector('.empty').classList.add('hidden');
    document.querySelector('.results').classList.remove('hidden');

    document.querySelector(".clear-all").addEventListener('click', function () {
        document.querySelector('.empty').classList.remove('hidden');
        document.querySelector('.results').classList.add('hidden');
        amountInput.value = '';
        rateInput.value = '';
        termInput.value = '';
        document.querySelectorAll("input[type='radio']").forEach((ele) => {
            ele.checked = false;
        })
    });
});


