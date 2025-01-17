const express = require('express')
const { type } = require('os')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const port = 4000
const fs = require('fs/promises')
const mysql2 = require("mysql2")

const { SqlConnection } = require('./sql');

const SSE = [200,{"Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive", "access-control-allow-origin": "*",}]

let messages = ["jfje"]

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'\\index.html')
})

function POST(){
    app.use(bodyParser.text({type: 'text/plain'}))

    app.post('/message', (req,res) =>{

        
        messages.push(req.body)

        console.log(messages)

        res.send(messages[messages.length-1])

    })
    
    
    
}

POST()


app.get('/messageRetriver', (req, res)=>{

    res.writeHead(SSE[0], SSE[1])



    res.write(messages[messages.length-1])

    if(messages.length === 3){
        res.end()
    }
        
})

app.listen(port,()=>{
    console.log(`server has started at ${port}`)
})

const mainDB = new SqlConnection("localhost", 3306, "root", "blue707", "mydb");

mainDB.Connect((done)=>{
    console.log(done)
})
mainDB.Query('insert into message (value) value("jgj");')
mainDB.EndConnection()



