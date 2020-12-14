const {date} = require('../../lib/utils')
const Member = require('../models/Member')
//foi preciso instalar npm install intl para funcionar para pt-BR
const Intl = require('intl')

module.exports = {
  index(req, res){
    
    let {filter, page, limit} = req.query

    page = page || 1
    limit = limit || 2
    let offset = limit * (page -1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(members){
        const pagination = {
          page,
          total: Math.ceil(members[0].total / limit)
        }
        
        return res.render('members/index', {members, pagination, filter})
      }
    }

    Member.paginate(params)
  },

  create(req, res){
    Member.instructorSelectOptions(function(options){
      return res.render('members/create', {instructorOptions: options})
    })

  },

  post(req, res){
    const keys = Object.keys(req.body)

    for (const key of keys) {
      if(req.body[key] == "")
        return res.send("Preencha todos os campos corretamente")
    }

    Member.create(req.body, function(member){
      return res.redirect(`/members/${member.id}`)
    })
    
  },

  show(req, res){
    Member.find(req.params.id, function(member){
      if(!member) return res.send("Instrutor não encontrado!")

      member.birth = date(member.birth).birthDay

      return res.render('members/show', {member})

    })
  },

  edit(req, res){
    Member.find(req.params.id, function(member){
      if(!member) return res.send("Instrutor não encontrado!")

      member.birth = date(member.birth).iso
      
      Member.instructorSelectOptions(function(options){
        return res.render('members/edit', {member, instructorOptions: options})
      })

    })

  },

  put(req, res){
    const keys = Object.keys(req.body)

    for (const key of keys) {
      if(req.body[key] == "")
        return res.send("Preencha todos os campos corretamente")
    }

    Member.update(req.body, function(){
      return res.redirect(`members/${req.body.id}`)
    })
  },

  delete(req, res){
    Member.delete(req.body.id, function(){
      return res.redirect('/members')
    })
  }
}