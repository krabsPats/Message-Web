const express = require('express')
const { type } = require('os')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const port = 4000
const fs = require('fs/promises')




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





async function docMaker(){
    const decoder = new TextDecoder

    let data = await fs.readFile(__dirname+'/text.html')    
    let dataDecode = decoder.decode(data);



    
let arr = dataDecode.split("")

let arrIndex = [];

let varAdder = []

for(let i = 0; i < arr.length; i += 1){
    if(arr[i] == "/" && arr[i+1] == "/" && arr[i+2] == "~"){
        varAdder.push(i)
    }

    if(arr[i] == "~" && arr[i+1] == "~"){
        varAdder.push(i)

    }

    if(varAdder.length == 2){
        arrIndex.push(varAdder)
        varAdder = []
    }


}




console.log(arr)    
console.log(arrIndex)

let content = "";

for(let i = 0; i < arrIndex.length; i += 1){
    content += (`at index ${ arrIndex[i][0]}`+" - "+arr.slice(arrIndex[i][0]+3,arrIndex[i][1]).join("") +"\n\n")  
}

console.log(content)

fs.writeFile(__dirname+"\\README.md", content, (err)=>{
    if(err){
        console.log("error within writing doc")
    }
})


}


docMaker()