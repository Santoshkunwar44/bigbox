const express = require('express')
const app = express()
const morgan = require("morgan")

app.use(morgan("common"))



app.listen(8000,()=>console.log("server started ..."))
