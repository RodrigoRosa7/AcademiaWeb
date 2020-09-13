const express = require("express")
const nunjucks = require("nunjucks")
const routes = require('./routes')
const server = express()

//Usado para poder receber os dados para o back, quando dá submit no form por exemplo
server.use(express.urlencoded({extended: true}))

server.use(express.static("public"))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: false
})

server.listen(5000, function() {
  console.log("server is running")
})

server.use(function(req, res) {
  res.status(404).render("not-found");
});