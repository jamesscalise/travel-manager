document.addEventListener("DOMContentLoaded", () => {

    const destinationContainer = document.getElementById('destination-collection')


    fetch("http://localhost:3000/destinations")
  .then(resp => resp.json())
  .then(function(json){
    json.forEach(destination => {
      const div = document.createElement('div');
      
      const h2= document.createElement('h2');
      //const image = document.createElement('img');
     // image.setAttribute('class', 'toy-avatar');
      h2.innerHTML = destination.name;
     // image.src = toy.image;
      div.appendChild(h2);
    //  div.appendChild(image);
      destinationContainer.appendChild(div);
    })
  });
})
