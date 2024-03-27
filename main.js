#! /usr/bin/env node
import inquirer from "inquirer";
//first store current balance and pin code in variable
let mycurrentBalance = 10000;
let mypincode = 1234;
//our program's first heading bank name
console.log(`\n\n\t\tSHABBIR BANK LMT\t\t\t\t\n\n`);
//user name input taken from user through prompt 
let user = await inquirer.prompt({
    name: "username",
    type: "input",
    message: `please enter your username                `,
    validate: function (value) {
        if (value.length === 0) {
            return "please enter username";
        }
        else {
            return true;
        }
    }
});
//pin code taken from user through prompt
let pinCode = await inquirer.prompt({
    name: "pin",
    type: "number",
    message: ` ${user.username} please enter your PIN        `,
});
if (mypincode === pinCode.pin) {
    //print welcome message
    console.log(`\n\nwelcome ${user.username}\n\n`);
    let transation = await inquirer.prompt([{
            name: "trans",
            type: "list",
            message: "please select a transaction",
            choices: ["balance inquiry", "fast Cash", "Cash withdrawal", "cash deposit"]
        }]);
    if (transation.trans === "balance inquiry") {
        console.log(`\n\t\t\t\t\t\t\tmr ${user.username} your current balance is ${mycurrentBalance}rs`);
    }
    else if (transation.trans === "fast Cash") {
        let fast = await inquirer.prompt([{
                name: "fastcash",
                type: "list",
                message: "select the amount which you withdrawal",
                choices: [1000, 2000, 5000, 10000],
            }]);
        if (fast.fastcash === 1000 || 2000 || 5000 || 10000) {
            console.log(`\n\n${user.username}, you have successfully withdrawal ${fast.fastcash}rs \n    your remaining balance is ${mycurrentBalance - fast.fastcash}rs \n\n`);
        }
    }
    else if (transation.trans === "Cash withdrawal") {
        let withdrawal = await inquirer.prompt([
            {
                name: "cashwithdrawal",
                type: "number",
                message: "enter amount in rupees",
            }
        ]);
        if (withdrawal.cashwithdrawal < mycurrentBalance) {
            console.log(`\n\nyou have successfully withdrawal ${withdrawal.cashwithdrawal}rs \n\nnow your remaining balance is ${mycurrentBalance - withdrawal.cashwithdrawal}rs \n\n`);
        }
        else {
            console.log(`${user.username} your balance is insufficent  `);
        }
    }
    else if (transation.trans === "cash deposit") {
        let deposit = await inquirer.prompt([{
                name: "cashdeposit",
                type: "number",
                message: "enter amount what you deposit"
            }]);
        if (deposit.cashdeposit > 0) {
            console.log(`\n\nyou have successfully deposit ${deposit.cashdeposit}rs \n\n now you are current balance is ${mycurrentBalance + deposit.cashdeposit}rs`);
        }
    }
}
else {
    console.log(`\n\n${user.username}, please enter vaild pin`);
}
