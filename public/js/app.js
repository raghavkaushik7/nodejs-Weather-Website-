const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')



// messageOne.textContent = 'From JavaScript'
weatherForm.addEventListener('submit', (e) => {
   messageOne.textContent = 'Loading...'
   messageTwo.textContent=''
    e.preventDefault()
    const location =search.value
    fetch('/weather?address='+encodeURIComponent(location)).then((response={}) => {   
 response.json().then((data) => {
         if(data.error){
            messageOne.textContent ="OOPS!"
            messageTwo.textContent=data.error
         }else {
            messageOne.textContent =data.location
            messageTwo.textContent=data.forecast
         }
     })
})

})

