const fs = require('fs')
const data = require('../data.json')
const {date} = require('../utils')

//foi preciso instalar npm install intl para funcionar para pt-BR
const Intl = require('intl')

exports.index = function(req, res) {

  let members = data.members.map(function(member){
    const newMember = {
      ...member
    }

    return newMember
  })

  return res.render('members/index', {members})
}

exports.create = function(req, res){
  return res.render('members/create')
}

exports.post = function(req, res){
  
  const keys = Object.keys(req.body) //retorna um array ["avatar_url", "name", "birth", "gender", "services"]

  for (const key of keys) {
    if(req.body[key] == "")
      return res.send("Preencha todos os campos corretamente")
  }

  birth = Date.parse(req.body.birth)

  // let id = 1
  // const lastMember = data.members[data.members.length -1]

  // if(lastMember) return id = Number(lastMember.id + 1)

  const id = Number(data.members.length + 1)

  data.members.push({
    id,
    ...req.body,
    birth
  })

  //é preciso usar o stringify para converter a forma de escrever em js para json
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Erro na gravação de dados.")

    return res.redirect(`/members/${id}`)
  })
}

exports.show = function(req, res) {
  //req.params
  const {id} = req.params

  const memberFound = data.members.find(function(member){
    return member.id == id
  })

  if(!memberFound) return res.send("Membro não encontrado!")
  
  const member = {
    ...memberFound,
    birth: date(memberFound.birth).birthDay,
  }

  return res.render("members/show", {member})
}

exports.edit = function(req, res) {
  const {id} = req.params

  const memberFound = data.members.find(function(member){
    return member.id == id
  })

  if(!memberFound) {
    return res.send("Membro não encontrado!")
  }

  const member = {
    ...memberFound,
    birth: date(memberFound.birth).iso
  }

  return res.render("members/edit", {member})
}

exports.put = function(req, res) {
  const {id} = req.body
  let index = 0

  const memberFound = data.members.find(function(member, foundIndex){
    if(id == member.id) {
      index = foundIndex
      return true
    }    
  })

  if(!memberFound) return res.send('Membro não encontrado!')

  const member = {
    ...memberFound,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.members[index] = member

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Erro na gravação de dados!")

    return res.redirect(`/members/${id}`)
  })
}

exports.delete = function(req, res) {
  const {id} = req.body

  const filteredMembers = data.members.filter(function(member){
    return member.id != id
  })

  data.members = filteredMembers

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Erro na exclusão")

    return res.redirect("/members")
  })
}