#! /usr/bin/env node
import inquirer from "inquirer";

 //first store current balance and pin code in variable
let mycurrentBalance = 10000;
let mypincode = 1234

//our program's first heading bank name
console.log(`\n\n\t###_SHABBIR BANK LMT_###\t\n\n`);

//user name input taken from user through prompt 
let user = await inquirer.prompt(
    {
        name: "username",
        type: "input",
        message: `please enter your username\t`,
        validate: function(input:string){
            if(input.length >= 5){
                return true;
            }else{
                return "username length must be greater then 5"
            }
        }
    }
)
let pinCode = await inquirer.prompt(
    {
        name: "pin",
        type: "number",
        message: `${user.username} please enter your PIN   `,  
    }
)

console.log(`\n\twelcome ${user.username}\n`);

while(true){
    
    
    if(mypincode === pinCode.pin){
        let transation = await inquirer.prompt([
            {
                name: "trans",
                type: "list",
                message:"please select a transaction",
                choices:["balance inquiry", "fast Cash", "Cash withdrawal", "cash deposit","exit"]
            }
        ])
    
        if(transation.trans === "balance inquiry" ){
            console.log(`\n\tmr ${user.username} your current balance is ${mycurrentBalance}rs\n`);
    
        }else if(transation.trans === "fast Cash"){
            let fast = await inquirer.prompt([
                {
                    name:"fastcash",
                    type: "list",
                    message: "select the amount which you withdrawal",
                    choices:[1000,2000,5000,10000],
                }
            ])

            if(fast.fastcash>mycurrentBalance){
                console.log(`your account balance is insuffcient `);
                
            }else{
                console.log(`\n\n${user.username}, you have successfully withdrawal ${fast.fastcash}rs \n    your remaining balance is ${mycurrentBalance = mycurrentBalance-fast.fastcash}rs \n\n`);
            }

        }else if(transation.trans === "Cash withdrawal"){
            let withdrawal = await inquirer.prompt([
                {
                    name: "cashwithdrawal",
                    type: "number",
                    message: "enter amount in rupees",
                }
            ]) 
        
               if(withdrawal.cashwithdrawal< mycurrentBalance){
                console.log(`\n\nyou have successfully withdrawal ${withdrawal.cashwithdrawal}rs \n\nnow your remaining balance is ${mycurrentBalance=mycurrentBalance-withdrawal.cashwithdrawal}rs \n\n`);
    
               }else{
                console.log(`${user.username} your balance is insufficent  `);
               }
        }else if(transation.trans === "cash deposit"){
            let deposit = await inquirer.prompt([
                {
                    name: "cashdeposit",
                    type: "number",
                    message:"enter amount to deposit"
                }
            ])
            if(isNaN(deposit.cashdeposit)){
                console.log(`please enter only amount value `);
                
            }else{
                console.log(`\n\nyou have successfully deposit ${deposit.cashdeposit}rs \n\n now your current balance is ${mycurrentBalance=mycurrentBalance+deposit.cashdeposit}rs`);
            }
        }else if(transation.trans === "exit"){
            console.log(`\n\t\t### thank you for using ATM ###\n`);
            process.exit()
            
        }
    
    }else{
        console.log(`\n\n${user.username}, please enter vaild pin`);
        break;
    }
}
