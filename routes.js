const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

routes.get('/', function(req, res) {
  return res.redirect('/instructors')
})

routes.get('/instructors', function(req, res) {
  return res.render('instructors/index')
})

routes.get('/instructors/create', function(req, res){
  return res.render('instructors/create')
})

routes.post('/instructors', instructors.post)

routes.get('/members', function(req, res) {
  return res.send('members')
})

module.exports = routes


// server.get("/", function(req, res){
//   const about = {
//     avatar_url: "https://avatars0.githubusercontent.com/u/38890065?s=460&u=1c03c2ec60d6b3f50e260177acaa2bf4ef563514&v=4",
//     name: "Rodrigo da Rosa",
//     role: 'Trabalho na <a href="https://secullum.com.br" target="_blank">Secullum Softwares</a>',
//     description: "Tentando aprender algo",
//     links: [
//       {name: "Github", url: "https://github.com/RodrigoRosa7", image: "assets/github.png"}
//     ]
//   }

//   return res.render("about", {about})
// })

// server.get("/portfolio", function(req, res) {
//   return res.render("portfolio", {items: videos})
// })

// server.get("/content", function(req, res) {

//   const cursos = [
//     {name: "starter", image: "https://storage.googleapis.com/golden-wind/bootcamp-launchbase/assets/starter.svg"},
//     {name: "launchbase", image: "https://storage.googleapis.com/golden-wind/bootcamp-launchbase/assets/launchbase.svg"},
//     {name: "gostack", image: "https://storage.googleapis.com/golden-wind/bootcamp-launchbase/assets/gostack.svg"}
//   ]

//   return res.render("content", {cursos})
// })

// server.get("/video", function(req, res) {
//   const id = req.query.id 

//   const video = videos.find(function(teste){
//     return id == teste.id
//   })

//   if(!video){
//     res.send("video not found")
//   }

//   return res.render("video", {item: video})  
// })

// server.get("/courses/:id", function(req, res) {
//   const id = req.params.id;

//   const cursos = [
//     {name: "starter", id: 0},
//     {name: "launchbase", id: 1},
//     {name: "gostack", id: 2}
//   ]

//   const curso = cursos.find(function(curso){
//     return id == curso.name  
//   })

//   if(!curso){
//     res.send("course not found")
//   }

//   return res.render("courses", {item: curso} );
// });