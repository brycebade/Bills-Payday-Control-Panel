/* Paycheck / Summary */

const paycheckInput = document.querySelector("#paycheck-input")
const paycheckBtn = document.querySelector("#set-paycheck")
const totalBillsAmnt = document.querySelector("#total-bills")
const totalPaidAmnt = document.querySelector("#total-paid")
const remainingAmnt = document.querySelector("#remaining")
const billsTbody = document.querySelector("#bills-tbody")

let paycheckAmount = 0

const renderBills = () => {
   billsTbody.innerHTML = ""

   for (const bill of bills) {
      const topRow = document.createElement("tr")
      
      const billName = document.createElement("td")
      billName.textContent = bill.name
      topRow.appendChild(billName)
      
      const billAmount = document.createElement("td")
      billAmount.textContent = `$${bill.amountOwed.toFixed(2)}`
      topRow.appendChild(billAmount)
      
      const billDue = document.createElement("td")
      billDue.textContent = bill.dueDay
      topRow.appendChild(billDue)

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

      const paymentsLeft = document.createElement("td")
      paymentsLeft.textContent = bill.paymentsRemaining
      topRow.appendChild(paymentsLeft)

      const paidSoFar = document.createElement("td")
      const paidSoFarBox = document.createElement("input")
      paidSoFarBox.type = "number"
      paidSoFarBox.value = bill.paidSoFar
      paidSoFar.appendChild(paidSoFarBox)
      topRow.appendChild(paidSoFar)
      
    
      billsTbody.appendChild(topRow)
   }
}

paycheckBtn.addEventListener("click", () => {
   const checkAmount = Number(paycheckInput.value)
   paycheckAmount = checkAmount

   updateSummary()
})

const updateSummary = () => {
   let totalBills = 0
   let totalPaid = 0
      
   for(const bill of bills) {
      totalBills += bill.amountOwed
    if (bill.paid === true) 
      totalPaid += bill.amountOwed
   }

   const remaining = paycheckAmount - totalPaid
   
   totalBillsAmnt.textContent = `Total Bills: $${totalBills.toFixed(2)}`
   totalPaidAmnt.textContent = `Total Paid: $${totalPaid.toFixed(2)}`
   remainingAmnt.textContent = `Remaining: $${remaining.toFixed(2)}`
}

renderBills()
console.log(bills)
