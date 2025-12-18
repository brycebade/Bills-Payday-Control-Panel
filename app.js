const paycheckInput = document.querySelector("#paycheck-input")
const paycheckBtn = document.querySelector("#set-paycheck")
const totalBillsAmnt = document.querySelector("#total-bills")
const totalPaidAmnt = document.querySelector("#total-paid")
const remainingAmnt = document.querySelector("#remaining")
const billsTbody = document.querySelector("#bills-tbody")
const savingsAmnt = document.querySelector("#total-paid-savings")
const sharedAmnt = document.querySelector("#total-paid-shared")
const sharedInput = document.querySelector("#shared-input")
const savingsInput = document.querySelector("#savings-input")
const billsStartInput = document.querySelector("#bills-start")
const billsEndInput = document.querySelector("#bills-end")

let paycheckAmount = 0
let payWindowStartDay = null
let payWIndowEndDay = null
let payWindowCrossesMonth = null

const updateAllLocationsUI = (shared, savings) => {
   sharedAmnt.textContent = `Shared Account: $${shared.toFixed(2)}`
   savingsAmnt.textContent = `Savings Account: $${savings.toFixed(2)}`
}

// Render all bills and create bills table

const renderBills = () => {
   billsTbody.innerHTML = ""

   for (const bill of bills) {
      const topRow = document.createElement("tr")

      const billPaid = document.createElement("td")
      const paidCheckbox = document.createElement("input")
      paidCheckbox.type = "checkbox"
      paidCheckbox.checked = bill.paid
      paidCheckbox.addEventListener("change", () => {
         bill.paid = paidCheckbox.checked
         updateSummary()
      })
      billPaid.appendChild(paidCheckbox)
      topRow.appendChild(billPaid)

      const billName = document.createElement("td")
      billName.textContent = bill.name
      topRow.appendChild(billName)

      const billAmount = document.createElement("td")
      billAmount.textContent = `$${bill.amountOwed.toFixed(2)}`
      topRow.appendChild(billAmount)

      const billDue = document.createElement("td")
      billDue.textContent = bill.dueDay
      topRow.appendChild(billDue)

      const paidSoFar = document.createElement("td")
      const paidSoFarBox = document.createElement("input")
      paidSoFarBox.type = "number"
      paidSoFarBox.value = bill.paidSoFar
      paidSoFar.appendChild(paidSoFarBox)
      topRow.appendChild(paidSoFar)

      const paymentsLeft = document.createElement("td")
      paymentsLeft.textContent = bill.paymentsRemaining
      topRow.appendChild(paymentsLeft)

      billsTbody.appendChild(topRow)
   }
}

/* Paycheck / Summary */

paycheckBtn.addEventListener("click", () => {
   // read basic number inputs
   const checkAmount = Number(paycheckInput.value)
   const shared = Number(sharedInput.value)
   const savings = Number(savingsInput.value)

   // read date inputs as strings
   const startDateValue = billsStartInput.value
   const endDateValue = billsEndInput.value

   if (checkAmount <= 0) return
   if (shared < 0 || savings < 0) return
   if (checkAmount < shared + savings) return
   if(startDateValue === "" || endDateValue === "") return

   // turn YYYY-MM-DD into just the day numbers
   const startDate = startDateValue.split("-")
   const endDate = endDateValue.split("-")

   const startDay = Number(startDate[2])
   const endDay = Number(endDate[2])

   // determine if the range crosses into a new month
   const crossesMonth = startDay > endDay

   paycheckAmount = checkAmount - shared - savings
   payWindowStartDay = startDay
   payWindowEndDay = endDay
   payWindowCrossesMonth = crossesMonth

   // update UI
   updateAllLocationsUI(shared, savings)
   updateSummary()
})

const isBillInCurrentWindow = (bill) => {
    if (payWindowStartDay === null || payWindowEndDay === null) {
        return true
    }

    const due = bill.dueDay

    if (!payWindowCrossesMonth) {
        return due >= payWindowStartDay && due <= payWindowEndDay
    }
    return due >= payWindowStartDay || due <= payWindowEndDay
}

const updateSummary = () => {
   let totalBills = 0
   let totalPaid = 0

   for(const bill of bills) {
      if (!isBillInCurrentWindow(bill)) {
        continue
      }

      totalBills += bill.amountOwed

    if (bill.paid === true) {
      totalPaid += bill.amountOwed
    }
   }

   const remaining = paycheckAmount - totalPaid

   totalBillsAmnt.textContent = `Total Bills: $${totalBills.toFixed(2)}`
   totalPaidAmnt.textContent = `Total Paid: $${totalPaid.toFixed(2)}`
   remainingAmnt.textContent = `Remaining: $${remaining.toFixed(2)}`
}

renderBills()
