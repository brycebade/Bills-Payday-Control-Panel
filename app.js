/* Paycheck / Summary */

const paycheckInput = document.querySelector("#paycheck-input")
const paycheckBtn = document.querySelector("#set-paycheck")
const totalBillsAmnt = document.querySelector("#total-bills")
const totalPaidAmnt = document.querySelector("#total-paid")
const remainingAmnt = document.querySelector("#remaining")

let paycheckAmount = 0

let bills = []

paycheckBtn.addEventListener("click", () => {
    const checkAmount = Number(paycheckInput.value)
    paycheckAmount = checkAmount

    remainingAmnt.textContent = `Remaining: $${paycheckAmount.toFixed(2)}`
})

console.log(bills)
