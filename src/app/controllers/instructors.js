const {age, date} = require('../../lib/utils')
const Instructor = require('../models/Instructor')
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
      callback(listInstructors){
        let instructors = []
  
        for (instructor of listInstructors) {
          instructor.subjects_taught = instructor.subjects_taught.split(',')
          instructors.push(instructor)
        }

        const pagination = {
          page,
          total: Math.ceil(listInstructors[0].total / limit)
        }
        
        return res.render('instructors/index', {instructors, pagination, filter})
      }
    }

    Instructor.paginate(params)
  },

  create(req, res){
    return res.render('instructors/create')
  },

  post(req, res){
    const keys = Object.keys(req.body) //retorna um array ["avatar_url", "name", "birth", "gender", "services"]

    for (const key of keys) {
      if(req.body[key] == "")
        return res.send("Preencha todos os campos corretamente")
    }

    Instructor.create(req.body, function(instructor){
      return res.redirect(`/instructors/${instructor.id}`)
    })
    
  },

  show(req, res){
    Instructor.find(req.params.id, function(instructor){
      if(!instructor) return res.send("Instrutor não encontrado!")

      instructor.age = age(instructor.birth_date)
      instructor.degree = instructor.education_level
      instructor.typeClass = instructor.class_type
      instructor.services = instructor.subjects_taught.split(', ')
      instructor.created_at = date(instructor.created_at).format

      return res.render('instructors/show', {instructor})

    })
  },

  edit(req, res){
    Instructor.find(req.params.id, function(instructor){
      if(!instructor) return res.send("Instrutor não encontrado!")

      instructor.birth = date(instructor.birth_date).iso
      instructor.degree = instructor.education_level
      instructor.typeClass = instructor.class_type
      instructor.services = instructor.subjects_taught

      return res.render('instructors/edit', {instructor})

    })

  },

  put(req, res){
    const keys = Object.keys(req.body) //retorna um array ["avatar_url", "name", "birth", "gender", "services"]

    for (const key of keys) {
      if(req.body[key] == "")
        return res.send("Preencha todos os campos corretamente")
    }

    Instructor.update(req.body, function(){
      return res.redirect(`instructors/${req.body.id}`)
    })
  },

  delete(req, res){
    Instructor.delete(req.body.id, function(){
      return res.redirect('/instructors')
    })
  }
}