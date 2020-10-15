//script para deixar sempre ativado o menu de instrutor ou membros
const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')

for (item of menuItems) {
  if(currentPage.includes(item.getAttribute("href"))){
    item.classList.add('active')
  }
}

