console.log('Client side javascript is running!');
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
 response.json().then((data)=>{
      console.log(data);
 })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const moist = document.querySelector('#moist')
const kili = document.querySelector('#kili')


weatherForm.addEventListener('submit', (e)=>{
    const location = search.value;
    e.preventDefault();
    moist.textContent = 'Loading';
    kili.textContent = ''
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((response)=>{
      if(response.error){
          console.log(response.error)
        return moist.textContent = response.error;
      }
      else {
          console.log(response.location);
          moist.textContent = response.location;
          
          console.log(response.forecast);
        return kili.textContent = `The weather is ${response.forecast.weather_descriptions} and temperature is ${response.forecast.temperature}. It feels like ${response.forecast.feelslike}`
      }
  })
})
   console.log(location);
})