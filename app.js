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
    billsTbody.appendChild(topRow)
   }
}

paycheckBtn.addEventListener("click", () => {
    const checkAmount = Number(paycheckInput.value)
    paycheckAmount = checkAmount

    remainingAmnt.textContent = `Remaining: $${paycheckAmount.toFixed(2)}`
})

renderBills()
