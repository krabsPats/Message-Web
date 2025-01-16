mysql2 = require('mysql2')

class SqlConnection{
constructor(host,port,user,password,database){

    

this.connectSql = mysql2.createConnection({  
    host: host,
    port: port,
    user: user,
    password: password,
    database: database})
    
}

Connect(callback){
    this.connectSql.connect((err)=>  {

    if(err) {callback("SQL Connection Failed"); throw err};
   
 })
    callback("SQL Connection Completed")
}

Query(queryText){
    this.connectSql.query(queryText, (err,)=>{
        if(err){console.log()}
 })
}

EndConnection(){
    this.connectSql.end()}

}

module.exports.SqlConnection = SqlConnection;
