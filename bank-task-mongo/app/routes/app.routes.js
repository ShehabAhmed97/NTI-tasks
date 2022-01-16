const router = require("express").Router()
const customer = require("../controller/app.controller")

router.get("/err", customer.showErr)

router.get("/", customer.showAll)

router.get("/add", customer.add)
router.post("/add", customer.addLogic)

router.get("/deposit/:id", customer.deposit)
router.post("/deposit/:id", customer.depositLogic)

router.get("/withdraw/:id", customer.withdraw)
router.post("/withdraw/:id", customer.withdrawLogic)

router.get("/single/:id", customer.single)

router.get("/delete/:id", customer.delete)


module.exports = router
