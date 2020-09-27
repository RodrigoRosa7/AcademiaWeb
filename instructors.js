const fs = require('fs')
const data = require('./data.json')
const {age, date} = require('./utils')

//foi preciso instalar npm install intl para funcionar para pt-BR
const Intl = require('intl')

exports.index = function(req, res) {

  let instructors = data.instructors.map(function(instructor){
    const newInstructor = {
      ...instructor,
      services: instructor.services.split(",")
    }

    return newInstructor
  })

  return res.render('instructors/index', {instructors})
}

exports.post = function(req, res){
  
  const keys = Object.keys(req.body) //retorna um array ["avatar_url", "name", "birth", "gender", "services"]

  for (const key of keys) {
    if(req.body[key] == "")
      return res.send("Preencha todos os campos corretamente")
  }

  let { avatar_url, name, birth, degree, typeClass, gender, services} = req.body

  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.instructors.length + 1)

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    degree,
    typeClass,
    gender,
    services,
    created_at
  })

  //é preciso usar o stringify para converter a forma de escrever em js para json
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Erro na gravação de dados.")

    return res.redirect("/instructors")
  })
  
  // return res.send(req.body)
}

exports.show = function(req, res) {
  //req.params
  const {id} = req.params

  const instructorFound = data.instructors.find(function(instructor){
    return instructor.id == id
  })

  if(!instructorFound) {
    return res.send("Instrutor não encontrado!")
  }

  const instructor = {
    ...instructorFound,
    age: age(instructorFound.birth),
    degree: instructorFound.degree.charAt(0).toUpperCase() 
      + instructorFound.degree.slice(1),
    typeClass: instructorFound.typeClass.charAt(0).toUpperCase() 
      + instructorFound.typeClass.slice(1),
    services: instructorFound.services.split(","),
    created_at: new Intl.DateTimeFormat('pt-BR').format(instructorFound.created_at),
  }

  return res.render("instructors/show", {instructor})
}

exports.edit = function(req, res) {
  const {id} = req.params

  const instructorFound = data.instructors.find(function(instructor){
    return instructor.id == id
  })

  if(!instructorFound) {
    return res.send("Instrutor não encontrado!")
  }

  const instructor = {
    ...instructorFound,
    birth: date(instructorFound.birth)
  }

  return res.render("instructors/edit", {instructor})
}

exports.put = function(req, res) {
  const {id} = req.body
  let index = 0

  const instructorFound = data.instructors.find(function(instructor, foundIndex){
    if(id == instructor.id) {
      index = foundIndex
      return true
    }    
  })

  if(!instructorFound) return res.send('Instrutor não encontrado!')

  const instructor = {
    ...instructorFound,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.instructors[index] = instructor

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Erro na gravação de dados!")

    return res.redirect(`/instructors/${id}`)
  })
}

exports.delete = function(req, res) {
  const {id} = req.body

  const filteredInstructors = data.instructors.filter(function(instructor){
    return instructor.id != id
  })

  data.instructors = filteredInstructors

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Erro na exclusão")

    return res.redirect("/instructors")
  })
}