const readDataFromStorage = () => {
    let data
    try{
        data = JSON.parse(localStorage.getItem('users'))
        if(!Array.isArray(data)) throw new Error('data isn\'t array')
    }
    catch(exp){
        data=[]
    }
    return data
}
const setDataToStorage = (myData) => {
    if(!Array.isArray(myData)) myData=[]
    myData = JSON.stringify(myData)
    localStorage.setItem('users', myData)
}


const getCurrentIdFromStorage = () => {
    let currentId
    try{
        currentId = JSON.parse(localStorage.getItem('currentId'))
        if(currentId == null) throw new Error('There are no users yet')
    }
    catch(exp){
        currentId=5000
    }
    return currentId
}

const setCurrentIdToStorage = (myData) => {
    myData = JSON.stringify(myData)
    localStorage.setItem('currentId', myData)
}


const content= document.querySelector("#content")
const single = document.querySelector("#single")
const addUser = document.querySelector('#addUser')

let currentId = getCurrentIdFromStorage();

const userMainHeads = [
    {name:"accNum", default: currentId, isDefault:true},
    {name:"name", default:null, isDefault:false},
    {name:"address", default:null, isDefault:false},
    {name:"phone", default:null, isDefault:false},
    {name:"balance", default:1000, isDefault:true},
    {name: "transactions", default: [{"action": "Deposition", "amount": 1000}], isDefault: true}
]

if(addUser){
    addUser.addEventListener("submit", function(e){
        e.preventDefault()
        const usersData=readDataFromStorage()
        const user = {}
        userMainHeads.forEach(head => {
            if(head.isDefault) user[head.name]= head.default
            else user[head.name]=this.elements[head.name].value
        });
        usersData.push(user)

        setCurrentIdToStorage(currentId + 1)

        this.reset()
        setDataToStorage(usersData)
        window.location.replace("index.html")
    })
}
const createMyOwnElement = (element, parent, classes="", textContent="",attributes=[])=>{
    const el = document.createElement(element)
    parent.appendChild(el)
    if(classes!="") el.classList = classes
    if(textContent!="") el.innerHTML = textContent
    attributes.forEach(attribute=>{
        el.setAttribute(attribute.attName, attribute.attrVal)
    })
    return el
}
drawItems = () =>{
    content.innerHTML=""
    const usersData=readDataFromStorage()
    if(usersData.length==0){
        const tr = createMyOwnElement('tr',content, "alert alert-danger text-center")
        createMyOwnElement('td', tr,"", "No Users Yet", [{attName:"colspan", attrVal:8}] )
    }
    else{
     usersData.forEach((user, i)=>{
      const tr = createMyOwnElement('tr',content)
      userMainHeads.forEach( head => {
          if(head.name !== "transactions"){
            createMyOwnElement('td', tr,"", user[head.name])
          }
        })
      const td = createMyOwnElement('td',tr)
      const showBtn = createMyOwnElement('button', td, "btn btn-primary mx-3", "Show")
      showBtn.addEventListener('click', (e)=> show(user, i))
      const depositBtn = createMyOwnElement('button', td, "btn btn-dark mx-3", "Deposit")
      depositBtn.addEventListener('click', (e)=> deposit(i))
      const withdrawBtn = createMyOwnElement('button', td, "btn btn-secondary mx-3", "Withdraw")
      withdrawBtn.addEventListener('click', (e)=> withdraw(i))
      const delBtn = createMyOwnElement('button', td, "btn btn-danger mx-3", "delete")
      delBtn.addEventListener('click', ()=> deleteUser(usersData, user.accNum))

    })    
    }
}


if(content) drawItems()

if(single){
    single.innerHTML = ''
    let user = JSON.parse(localStorage.getItem("user"))
    const tr = createMyOwnElement('tr',single)
    userMainHeads.forEach( head => {
        if(head.name == "transactions"){
            let transactions = ''
            user[head.name].forEach(transaction => transactions += `${transaction.action} : ${transaction.amount}<br>` )
            createMyOwnElement('td', tr,"", transactions)
        }else{
          createMyOwnElement('td', tr,"", user[head.name])
        }
      })
    const td = createMyOwnElement('td',tr)
    const depositBtn = createMyOwnElement('button', td, "btn btn-primary mx-3", "Deposit")
    depositBtn.addEventListener('click', (e)=> deposit(localStorage.getItem("selectedIndex")))
    const withdrawBtn = createMyOwnElement('button', td, "btn btn-secondary mx-3", "Withdraw")
    withdrawBtn.addEventListener('click', (e)=> withdraw(localStorage.getItem("selectedIndex")))

}

deleteUser= (usersData, id, tr) =>{
    newData = usersData.filter(u=> u.accNum != id)
    setDataToStorage(newData)
     drawItems()
}

show=(user, index)=>{
    localStorage.setItem('selectedIndex', index)
    localStorage.setItem("user", JSON.stringify(user))
    window.location.replace("single.html")
}    



deposit=( index)=>{
    localStorage.setItem('transactionIndex', index)
    localStorage.setItem('transactionType', "deposition")
    window.location.replace("transaction.html")
}

withdraw=( index)=>{
    localStorage.setItem('transactionIndex', index)
    localStorage.setItem('transactionType', "withdraw")
    window.location.replace("transaction.html")
}

const transactionForm= document.querySelector("#transaction")

if(transactionForm){
    const usersData=readDataFromStorage()
    let id = localStorage.getItem('transactionIndex')
    let type = localStorage.getItem('transactionType')
    let user = usersData[id]
    let userTransactions = user.transactions
    if(type == "deposition"){
        transactionForm.addEventListener('submit', (e)=>{
            e.preventDefault()
            let amount = Number(transactionForm.elements.amount.value)

            //updating the balance
            user.balance = user.balance + amount

            //updating transactions array
            userTransactions.push({"action": "Deposition", "amount": amount })
            user.transactions = userTransactions
            
            //updating allUsers array
            usersData[id] = user

            setDataToStorage(usersData)
            window.location.replace("index.html")
        })  
    }else if(type == "withdraw"){
        transactionForm.addEventListener('submit', (e)=>{
            e.preventDefault()
            let amount = Number(transactionForm.elements.amount.value)

            //updating the balance
            user.balance = user.balance - amount

            //updating transactions array
            userTransactions.push({"action": "Withdraw", "amount": amount })
            user.transactions = userTransactions
            
            //updating allUsers array
            usersData[id] = user

            setDataToStorage(usersData)
            window.location.replace("index.html")
        })  
    }
}

