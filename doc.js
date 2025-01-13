const express = require('express')
const { type } = require('os')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const port = 4000
const fs = require('fs/promises')





function DocMaker(dir){

    this.dir = dir

    this.documenting= async function() {const decoder = new TextDecoder

    let data = await fs.readFile(__dirname+this.dir)    
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

}}


let HTML = new DocMaker('\\index.html')

HTML.documenting()