// ==========================================
// FINREPUTE DEMO DATA
// ==========================================

let score = 0;

let balance = 5000;

let transactions = [];


// ==========================================
// UPDATE ENTIRE DASHBOARD
// ==========================================

function updateDashboard() {

    // SCORE

    document.getElementById("score").innerText =
        score;


    // BALANCE

    document.getElementById("balance").innerText =
        "₹" + balance.toLocaleString("en-IN");


    // ======================================
    // REPUTATION FACTORS
    // ======================================

    // Transaction History is now driven by the actual
    // number of transactions the user has made, not the score.
    let transactionScore =
        Math.min(transactions.length * 20, 100);

    let repaymentScore =
        Math.min(Math.round(score / 2), 100);

    let activityScore =
        Math.min(Math.round(score / 1.5), 100);


    setText("transactionPercent", transactionScore + "%");
    setWidth("transactionBar", transactionScore + "%");
    setText("transactionCount", transactions.length + (transactions.length === 1 ? " transaction" : " transactions"));

    setText("repaymentPercent", repaymentScore + "%");
    setWidth("repaymentBar", repaymentScore + "%");

    setText("activityPercent", activityScore + "%");
    setWidth("activityBar", activityScore + "%");


    // ======================================
    // STATUS
    // ======================================

    let status =
        document.getElementById("status");


    if (score === 0) {

        status.innerText =
            "NEW USER";

        status.className =
            "bg-white/10 border border-white/20 px-3 py-1 rounded-full text-[11px] font-bold";

    }

    else if (score < 250) {

        status.innerText =
            "BUILDING TRUST";

        status.className =
            "bg-yellow-500 px-3 py-1 rounded-full text-[11px] font-bold";

    }

    else if (score < 500) {

        status.innerText =
            "MODERATE TRUST";

        status.className =
            "bg-orange-500 px-3 py-1 rounded-full text-[11px] font-bold";

    }

    else {

        status.innerText =
            "LOW RISK";

        status.className =
            "bg-emerald-500 px-3 py-1 rounded-full text-[11px] font-bold";

    }


    updateTransactions();
}


// ==========================================
// SAFE DOM HELPERS
// (avoid crashing updateDashboard if an id
// is ever missing from the page again)
// ==========================================

function setText(id, value) {
    let el = document.getElementById(id);
    if (el) el.innerText = value;
}

function setWidth(id, value) {
    let el = document.getElementById(id);
    if (el) el.style.width = value;
}


// ==========================================
// SEND MONEY SCREEN
// ==========================================

function showSend() {
    document.getElementById("content").innerHTML = `
        <div class="bg-white rounded-2xl p-6 border border-slate-200">

            <h2 class="text-xl font-bold">Send Money</h2>

            <div class="mt-5">
                <label class="text-sm font-semibold">Recipient Name</label>
                <input
                    id="recipient"
                    type="text"
                    class="w-full border rounded-lg p-3 mt-2"
                    placeholder="Enter recipient name"
                >
            </div>

            <div class="mt-4">
                <label class="text-sm font-semibold">UPI ID / Phone Number</label>
                <input
                    id="upi"
                    type="text"
                    class="w-full border rounded-lg p-3 mt-2"
                    placeholder="example@upi"
                >
            </div>

            <div class="mt-4">
                <label class="text-sm font-semibold">Amount</label>
                <input
                    id="amount"
                    type="number"
                    class="w-full border rounded-lg p-3 mt-2"
                    placeholder="₹ Enter amount"
                >
            </div>

            <button
                onclick="sendMoney()"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 mt-6 font-semibold transition-all"
            >
                Send Money
            </button>

        </div>
    `;
}


// ==========================================
// SEND MONEY
// ==========================================

function sendMoney() {

    let recipient =
        document.getElementById("recipient").value.trim();


    let upi =
        document.getElementById("upi").value.trim();


    let amount =
        Number(
            document.getElementById("amount").value
        );


    // VALIDATION

    if (recipient === "") {

        alert("Please enter the recipient name.");

        return;
    }


    if (upi === "") {

        alert("Please enter a UPI ID or phone number.");

        return;
    }


    if (amount <= 0) {

        alert("Please enter a valid amount.");

        return;
    }


    if (amount > balance) {

        alert("Insufficient balance.");

        return;
    }


    // ======================================
    // UPDATE BALANCE
    // ======================================

    balance -= amount;


    // ======================================
    // INCREASE SCORE
    // Amounts under ₹100 earn 10 points,
    // ₹100 and above earn 50 points.
    // ======================================

    let pointsEarned = amount < 100 ? 10 : 50;

    score += pointsEarned;


    if (score > 850) {

        score = 850;

    }


    // ======================================
    // ADD TRANSACTION
    // ======================================

    transactions.unshift({

        name: recipient,

        upi: upi,

        amount: amount

    });


    // UPDATE UI

    updateDashboard();


    // SUCCESS MESSAGE

    document.getElementById("content").innerHTML = `

        <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">

            <div class="flex items-center gap-3">

                <div class="bg-emerald-100 text-emerald-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    ✓
                </div>


                <div>

                    <h3 class="text-lg font-bold text-emerald-700">
                        Payment Successful
                    </h3>

                    <p class="text-sm text-slate-600">
                        Money sent to ${recipient}
                    </p>

                </div>

            </div>


            <div class="bg-white rounded-xl p-4 mt-4">

                <div class="flex justify-between">

                    <span class="text-slate-500">
                        Amount
                    </span>

                    <strong>
                        ₹${amount.toLocaleString("en-IN")}
                    </strong>

                </div>


                <div class="flex justify-between mt-3">

                    <span class="text-slate-500">
                        Recipient
                    </span>

                    <strong>
                        ${recipient}
                    </strong>

                </div>


                <div class="flex justify-between mt-3">

                    <span class="text-slate-500">
                        UPI
                    </span>

                    <span>
                        ${upi}
                    </span>

                </div>

            </div>


            <div class="mt-4 bg-indigo-50 rounded-xl p-4">

                <p class="text-sm text-slate-500">
                    Reputation Update
                </p>

                <p class="text-indigo-600 font-bold mt-1">
                    FinRepute Score +${pointsEarned}
                </p>

            </div>

        </div>

    `
}



// ==========================================
// BUILD REPUTATION
// ==========================================



let suspiciousActivity = false;

function showWarnings() {

    if (suspiciousActivity) {

        alert(
            "⚠ 1 Suspicious Activity Detected\n\n" +
            "Unusual transaction detected.\n" +
            "The transaction amount is higher than your usual activity.\n\n" +
            "Risk Level: MEDIUM"
        );

    } else {

        alert(
            "✓ No Warnings\n\n" +
            "No suspicious financial activity has been detected.\n\n" +
            "Your account is currently safe."
        );

    }
}


// ==========================================
// COMPLETE ACTIVITY
// ==========================================

function completeActivity() {

    let points =
        Number(
            document.getElementById("activity").value
        );


    score += points;


    if (score > 850) {

        score = 850;

    }


    updateDashboard();


    document.getElementById("content").innerHTML = `

        <div class="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">

            <h3 class="font-bold text-indigo-700">
                Activity Recorded ✓
            </h3>

            <p class="text-sm text-slate-600 mt-2">
                Your financial behaviour has been added
                to your reputation profile.
            </p>

            <p class="text-indigo-600 font-bold mt-3">
                FinRepute Score +${points}
            </p>

        </div>

    `;
}


// ==========================================
// LOAN SCREEN
// ==========================================

function showLoan() {

    document.getElementById("content").innerHTML = `

        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-5">

            <h3 class="text-lg font-bold">
                Loan Eligibility
            </h3>

            <p class="text-sm text-slate-500 mt-1">
                Check eligibility based on your reputation score.
            </p>


            <input
                id="loanAmount"
                type="number"
                placeholder="Enter requested amount"
                class="w-full border border-slate-200 rounded-xl p-3 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
            >


            <button
                onclick="checkLoan()"
                class="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold">

                Check Eligibility

            </button>

        </div>

    `;
}


// ==========================================
// CHECK LOAN
// ==========================================

function checkLoan() {

    let requested =
        Number(
            document.getElementById("loanAmount").value
        );


    if (requested <= 0) {

        alert("Please enter a valid loan amount.");

        return;
    }


    // Prototype calculation

    let eligibleAmount =
        Math.min(
            Math.floor(score / 50) * 1000,
            15000
        );


    // ELIGIBLE

    if (
        requested <= eligibleAmount &&
        eligibleAmount > 0
    ) {

        document.getElementById("content").innerHTML = `

            <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">

                <p class="text-xs text-emerald-600 font-bold uppercase tracking-wide">
                    FinRepute Assessment
                </p>

                <h3 class="text-xl font-bold mt-2">
                    ✓ Loan Eligible
                </h3>

                <p class="text-sm text-slate-600 mt-2">
                    Your current financial reputation supports
                    this request.
                </p>


                <div class="bg-white rounded-xl p-4 mt-4">

                    <p class="text-sm text-slate-500">
                        Eligible Amount
                    </p>

                    <p class="text-2xl font-bold mt-1">
                        ₹${eligibleAmount.toLocaleString("en-IN")}
                    </p>

                </div>


                <p class="text-emerald-600 font-semibold mt-4">
                    Risk Level: Low
                </p>

            </div>

        `;

    }


    // NOT ELIGIBLE

    else {

        document.getElementById("content").innerHTML = `

            <div class="bg-orange-50 border border-orange-200 rounded-2xl p-5">

                <p class="text-xs text-orange-600 font-bold uppercase">
                    FinRepute Assessment
                </p>

                <h3 class="text-xl font-bold text-orange-700 mt-2">
                    Build More Trust
                </h3>

                <p class="text-sm text-slate-600 mt-2">
                    Complete more responsible financial
                    activities to improve your eligibility.
                </p>


                <div class="bg-white rounded-xl p-4 mt-4">

                    <p class="text-sm text-slate-500">
                        Current Eligible Amount
                    </p>

                    <p class="text-2xl font-bold mt-1">
                        ₹${eligibleAmount.toLocaleString("en-IN")}
                    </p>

                </div>

            </div>

        `;

    }

}


// ==========================================
// TRANSACTIONS PAGE
// ==========================================

function showTransactions() {

    document.getElementById("content").innerHTML = `

        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-5">

            <h3 class="text-lg font-bold">
                Transaction History
            </h3>

            <p class="text-sm text-slate-500 mt-1">
                Your recent financial activity.
            </p>

        </div>

    `;


    document.getElementById("transactionList")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// UPDATE TRANSACTION LIST
// ==========================================

function updateTransactions() {

    let list =
        document.getElementById("transactionList");


    if (transactions.length === 0) {

        list.innerHTML = `

            <p class="py-4 text-slate-400">
                No transactions yet.
            </p>

        `;

        return;
    }


    list.innerHTML = "";


    transactions.forEach(
        transaction => {

            list.innerHTML += `

                <div class="flex justify-between items-center py-4">

                    <div>

                        <p class="font-medium">
                            ${transaction.name}
                        </p>

                        <p class="text-xs text-slate-400 mt-1">
                            ${transaction.upi}
                        </p>

                    </div>


                    <span class="text-red-500 font-semibold">
                        - ₹${transaction.amount.toLocaleString("en-IN")}
                    </span>

                </div>

            `;

        }
    );

}


// ==========================================
// START DASHBOARD
// ==========================================

updateDashboard();