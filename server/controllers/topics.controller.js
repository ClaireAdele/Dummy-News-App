
const {selectAllTopics} = require("../models/topics.model")

exports.getAllTopics = (req,res,next) =>{
  selectAllTopics().then((topics)=>{
  console.log(topics)
    res.send(topics)
  })
}