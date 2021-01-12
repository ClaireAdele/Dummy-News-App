const app = require("./app")

app.listen(9093,(err)=>{
  if(err)console.log(err)
  else{
    console.log("server running on port 9093")
  }
})