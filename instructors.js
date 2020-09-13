const fs = require('fs')
const data = require('./data.json')

exports.post = function(req, res){
  
  const keys = Object.keys(req.body) //retorna um array ["avatar_url", "name", "birth", "gender", "services"]

  for (const key of keys) {
    if(req.body[key] == "")
      return res.send("Preencha todos os campos corretamente")
  }

  data.instructors.push(req.body)

  //é preciso usar o stringify para converter a forma de escrever em js para json
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Erro na gravação de dados.")

    return res.redirect("/instructors")
  })
  
  // return res.send(req.body)
}