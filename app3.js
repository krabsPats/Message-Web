const express = require('express')
const { type } = require('os')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { randomFillSync, randomInt } = require('crypto')
const port = 4000



let messages = []

app.get('/', (req,res)=>{
    res.sendFile(__dirname.replace('\\app', '')+'\\text.html')
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

    app.get('/test', (req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/octet-stream', // Indicating binary data
        });
      
        // First binary chunk
        const firstChunk = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello" in binary
        res.write(firstChunk);
        res.end()
    })
app.listen(port,()=>{
    console.log(`server has started at ${port}`)
})
