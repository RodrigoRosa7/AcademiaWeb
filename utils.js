module.exports = {
    age: function age (timestamp) {
        const today = new Date()
        const birthDay = new Date(timestamp)
    
        //ano
        let age = today.getFullYear() - birthDay.getFullYear()
    
        //month
        const month = today.getMonth() - birthDay.getMonth()
    
        if(month < 0 || month == 0 && today.getDate() < birthDay.getDate()) {
            age = age - 1
        }
    
        return age
      }
}