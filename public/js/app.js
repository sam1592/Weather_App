const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log('hello')
  message2.textContent = "";
  message1.textContent = 'Loading......'

  const location = search.value

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = "";
        message2.textContent = data.error
      } else {
        message1.textContent = data.forecast
        message2.textContent = ''
      }
    });
  });
})