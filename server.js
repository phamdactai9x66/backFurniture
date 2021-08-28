const express = require("express");
let path = require("path");
require('dotenv').config()
let cookie_parser = require("cookie-parser");
const cors = require("cors")
const morgan = require("morgan");
var methodOverride = require('method-override')
let express_layouts = require("express-ejs-layouts");


const db_NoSQL = require("./views/config/db");
let passport = require("passport");

const routes = require("./views/routes");
const { render } = require("node-sass");
const app = express()
 const port = 5000
const server = require("http").createServer(app);
// const io = require("socket.io")(server, { cors: { origin: "*" } })
// let chat = require("./views/app/models/chat");
// app.use(cors())

// async function handlePromise(params) {
//   try {
//     let data = await params;
//     return [data, null];
//   } catch (error) {
//     return [null, error];
//   }
// }

// io.on("connection", (socket) => {
//   // console.log("xin chao nhe");
//   socket.on("test1", async (dataResponse) => {
//     let createChat = new chat({ ...dataResponse });

//     let [data, error] = await handlePromise(createChat.save());
//     if (data) {
//       io.emit("dataResponse", data);
//     }
//   })
// })



// db1.connect();
db_NoSQL.connect();



app.use(morgan());
app.use(methodOverride('_method'))

app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "views/public")))

//co the lay du lieu duoc submit bang form data bang property body
app.use(express.urlencoded({ extended: true }));
//su dung code js de sumbit
app.use(express.json());

app.use(cookie_parser())
app.use(passport.initialize());
app.use(passport.session());

//validator
// app.use(express_validator())

//su dung layout
app.use(express_layouts);


routes(app)

//action dispatcher function handler chinh la controller


//khoi tao server
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
