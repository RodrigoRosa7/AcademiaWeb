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
    },

    date: function date (timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return `${year}-${month}-${day}`
    }
}