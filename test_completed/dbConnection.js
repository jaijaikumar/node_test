//database connection
const mongoose =require('mongoose');
mongoose.connect("mongodb://localhost:27017/data", {
  useNewUrlParser: "true", useUnifiedTopology:"true"
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})