const { redirect } = require('express/lib/response')
const ValiadtorController = require('./validator.controller')
const dbConnection = require('../../models/dbcon')
var ObjectId = require('mongodb').ObjectID;

class Customer {

    static showErr = (req,res) => {
        res.render("err404")
    }

    static showAll = (req, res) => {
        dbConnection((err, client, db) => {
            db.collection('customers').find().toArray((error, result) => {
                if (error) return redirect('/err')
                const customers = result
                const isEmpty = customers.length == 0
                client.close()
                res.render("all", { pageTitle: "All Customers", customers, isEmpty })
            })
        })
    }

    static add = (req, res) => {
        const customer = { name: "", address: "", phone: "", balance: ""}
        res.render("add", { pageTitle: "add another customer", customer, errors: {} })
    }
    static addLogic = (req, res) => {
        let customer = req.body
        customer.transactions = [{action: "deposit", amount: 1000}]
        customer.balance = 1000
        let errors = {}

        if (!ValiadtorController.isEmptyString(customer.name))
            errors.name = "name is required"
        if (!ValiadtorController.isEmptyString(customer.address))
            errors.address = "address is required"
        if (!ValiadtorController.isEmptyString(customer.phone))
        errors.phone = "phone is required"
        if (!ValiadtorController.isPhoneNumber(customer.phone))
        errors.phone = "Enter a valid phone number"

        if (Object.keys(errors).length > 0){
            return res.render('add', {
                pageTitle: "add another customer",
                errors,
                customer
            })
        }

        dbConnection((err, client, db) => {
            db.collection('customers').insertOne(customer,(error, result)=>{
                if(err) return res.redirect("/err")
                client.close()
                res.redirect("/")
            })
        })
    }

    static searchCustomerByID = (id, customers) => {
        let CustomerIndex = customers.findIndex(el => el._id == id)
        return CustomerIndex
    }

    static single = (req, res) => {
        let isNotFound = false
        const id = req.params.id
        let customers = []
        dbConnection((err, client, db) => {
            db.collection('customers').find().toArray((error, result) => {
                if (error) return redirect('/err')
                customers = result
                const customerIndex = this.searchCustomerByID(id, customers)
                if (customerIndex == -1) isNotFound = true
                res.render("single", {
                    pageTitle: "Customer Details",
                    customer: customers[customerIndex],
                    isNotFound
                })    
                client.close()
            })
        })
    }

    static delete = (req, res) => {
        const id = req.params.id
        dbConnection((err, client, db) => {
            db.collection('customers').deleteOne({_id: ObjectId(`${id}`)},(error, result) => {
                if (error) return redirect('/err')
                client.close()
                res.redirect("/")
            })
        })
    }

    static deposit = (req, res) => {
        const deposit = { amount: 0}
        res.render("deposit", { pageTitle: "Deposit", deposit, errors: {} })
    }

    static depositLogic = (req, res) => {
        let deposit = req.body
        let id = req.params.id
        let customers = []
        let balance = 0
        let transactions = []
        let errors = {}

        if (!deposit.amount)
            errors.amount = "You have to enter the amount of deposition"

        if (Object.keys(errors).length > 0){
            return res.render('deposit', {
                pageTitle: "Deposit",
                errors,
                deposit
            })
        }

        dbConnection((err, client, db) => {
            db.collection('customers').find().toArray((error, result) => {
                if (error) return redirect('/err')
                customers = result
                const customerIndex = this.searchCustomerByID(id, customers)
                if (customerIndex == -1) isNotFound = true
                balance = customers[customerIndex].balance
                transactions = customers[customerIndex].transactions

                balance += Number(deposit.amount)
                transactions.push({action: "deposit", amount: Number(deposit.amount)})

                db.collection('customers').updateOne({_id: ObjectId(`${id}`)},{$set:{balance: balance, transactions: transactions}},(error, result)=>{
                    if(error) return res.redirect("/err")
                    console.log(result)
                    client.close()
                    res.redirect("/")
                })    
    
            })

        })
    }

    static withdraw = (req, res) => {
        const withdraw = { amount: 0}
        res.render("withdraw", { pageTitle: "Withdraw", withdraw, errors: {} })
    }

    static withdrawLogic = (req, res) => {
        let withdraw = req.body
        let id = req.params.id
        let customers = []
        let balance = 0
        let transactions = []
        let errors = {}

        if (!withdraw.amount)
            errors.amount = "You have to enter the amount of withdrawl"

        if (Object.keys(errors).length > 0){
            return res.render('withdraw', {
                pageTitle: "Withdraw",
                errors,
                withdraw
            })
        }

        dbConnection((err, client, db) => {
            db.collection('customers').find().toArray((error, result) => {
                if (error) return redirect('/err')
                customers = result
                const customerIndex = this.searchCustomerByID(id, customers)
                if (customerIndex == -1) isNotFound = true
                balance = customers[customerIndex].balance
                transactions = customers[customerIndex].transactions

                balance -= Number(withdraw.amount)
                transactions.push({action: "withdraw", amount: Number(withdraw.amount)})

                db.collection('customers').updateOne({_id: ObjectId(`${id}`)},{$set:{balance: balance, transactions: transactions}},(error, result)=>{
                    if(error) return res.redirect("/err")
                    console.log(result)
                    client.close()
                    res.redirect("/")
                })    
            })
        })
    }


}

module.exports = Customer