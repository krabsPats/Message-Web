const express = require('express')
const { type } = require('os')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const port = 4000



let messages = []

app.get('/', (req,res)=>{
    res.sendFile(__dirname.replace('\\app', '')+'\\frontend\\text.html')
})

function POST(){
    app.use(bodyParser.text({type: 'text/plain'}))

    app.post('/message', (req,res) =>{


        messages.push(req.body)

        console.log(messages)
    
    })
    
    
}

POST()


app.listen(port,()=>{
    console.log(`server has started at ${port}`)
})