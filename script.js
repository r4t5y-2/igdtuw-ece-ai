// ==========================================
// FINREPUTE DEMO DATA
// ==========================================

let score = 0;

let balance = 5240;

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


    // TRUST SCORE

    document.getElementById("trustScore").innerText =
        score + "/850";


    // PROGRESS

    let progress =
        (score / 850) * 100;

    document.getElementById("progress").style.width =
        progress + "%";


    // ======================================
    // REPUTATION FACTORS
    // ======================================

    let transactionScore =
        Math.min(score, 100);

    let repaymentScore =
        Math.min(Math.round(score / 2), 100);

    let activityScore =
        Math.min(Math.round(score / 1.5), 100);


    document.getElementById(
        "transactionPercent"
    ).innerText =
        transactionScore + "%";


    document.getElementById(
        "transactionBar"
    ).style.width =
        transactionScore + "%";


    document.getElementById(
        "repaymentPercent"
    ).innerText =
        repaymentScore + "%";


    document.getElementById(
        "repaymentBar"
    ).style.width =
        repaymentScore + "%";


    document.getElementById(
        "activityPercent"
    ).innerText =
        activityScore + "%";


    document.getElementById(
        "activityBar"
    ).style.width =
        activityScore + "%";


    // ======================================
    // STATUS
    // ======================================

    let status =
        document.getElementById("status");


    if (score === 0) {

        status.innerText =
            "NEW USER";

        status.className =
            "bg-slate-600 px-3 py-1 rounded-full text-xs font-bold mb-2";

    }

    else if (score < 250) {

        status.innerText =
            "BUILDING TRUST";

        status.className =
            "bg-yellow-500 px-3 py-1 rounded-full text-xs font-bold mb-2";

    }

    else if (score < 500) {

        status.innerText =
            "MODERATE TRUST";

        status.className =
            "bg-orange-500 px-3 py-1 rounded-full text-xs font-bold mb-2";

    }

    else {

        status.innerText =
            "LOW RISK";

        status.className =
            "bg-emerald-500 px-3 py-1 rounded-full text-xs font-bold mb-2";

    }


    updateTransactions();
}


// ==========================================
// SEND MONEY SCREEN
// ==========================================

function showSend() {

    document.getElementById("content").innerHTML = `

        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-5">

            <h3 class="text-lg font-bold">
                Send Money
            </h3>

            <p class="text-sm text-slate-500 mt-1">
                Make a transaction and build your financial history.
            </p>


            <!-- RECIPIENT -->

            <input
                id="recipient"
                type="text"
                placeholder="Recipient name"
                class="w-full border border-slate-200 rounded-xl p-3 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
            >


            <!-- UPI -->

            <input
                id="upi"
                type="text"
                placeholder="UPI ID / Phone number"
                class="w-full border border-slate-200 rounded-xl p-3 mt-3 outline-none focus:ring-2 focus:ring-indigo-500"
            >


            <!-- AMOUNT -->

            <input
                id="amount"
                type="number"
                placeholder="Enter amount"
                class="w-full border border-slate-200 rounded-xl p-3 mt-3 outline-none focus:ring-2 focus:ring-indigo-500"
            >


            <!-- BUTTON -->

            <button
                onclick="sendMoney()"
                class="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold">

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
    // ======================================

    score += 50;


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
                    FinRepute Score +50
                </p>

            </div>

        </div>

    `;
}


// ==========================================
// BUILD REPUTATION
// ==========================================

function showReputation() {

    document.getElementById("content").innerHTML = `

        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-5">

            <h3 class="text-lg font-bold">
                Build Your Reputation
            </h3>

            <p class="text-sm text-slate-500 mt-1">
                Record responsible financial behaviour.
            </p>


            <select
                id="activity"
                class="w-full border border-slate-200 rounded-xl p-3 mt-4 outline-none">

                <option value="50">
                    Complete Transaction (+50)
                </option>

                <option value="100">
                    Pay Bill On Time (+100)
                </option>

                <option value="150">
                    Repay Loan On Time (+150)
                </option>

                <option value="75">
                    Maintain Account Activity (+75)
                </option>

            </select>


            <button
                onclick="completeActivity()"
                class="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold">

                Record Activity

            </button>

        </div>

    `;
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