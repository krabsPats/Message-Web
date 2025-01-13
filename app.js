const express = require('express')
const { type } = require('os')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const port = 4000
const fs = require('fs/promises')




let messages = []

    

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'\\index.html')
})

function POST(){
    app.use(bodyParser.text({type: 'text/plain'}))

    app.post('/message', (req,res) =>{


        messages.push(req.body)

        console.log(messages)
    
    })
    
    
    
}

POST()


app.get('/messageRetriver', (req, res)=>{

   
    res.writeHead(200, {"Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "access-control-allow-origin": "*",
    });

    let num = 0;

let intervelThing = setInterval(() => {
    res.write(Math.random().toString())
    console.log(Math.random())
  
    num += 1
    console.log(num)

    if(num == 5){
        clearInterval(intervelThing);
        res.end();
    }


}, 1000)            
})

app.listen(port,()=>{
    console.log(`server has started at ${port}`)
})






