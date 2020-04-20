const clickedCheck = {}


document.addEventListener("DOMContentLoaded", () => {

  let destinationContainer = document.getElementById('destination-collection')

    let destinationForm = document.getElementById('new-container')

    destinationForm.addEventListener('submit', event => {
     event.preventDefault()
     console.log("this works!")
      postDestination(event.target)
    })

    function postDestination(destination_data){
      fetch('http://localhost:3000/destinations', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Accept': "application/json"
        },
        body: JSON.stringify({
          "name": destination_data.name.value
        })
      })
      .then(res => res.json())
      .then((obj_destination) => {
        //let new_toy = renderToys(obj_toy)
        //divCollect.append(new_toy)
        renderDestinations(obj_destination.data)
        console.log(obj_destination)
      })
     // console.log(destination_data.name.value)
    }
    

    function getDestinations(){
        return fetch('http://localhost:3000/destinations')
        .then(res => res.json())
    }

    function sites(e) {
        console.log(e.target.id)
        e.preventDefault()
      
        fetch(`http://localhost:3000/destinations/${e.target.id}`)
          .then(res => res.json())
          .then(json =>{
                  json.data.attributes.sites.forEach(site => {
                    const destination = document.getElementsByClassName('site-card')[e.target.id - 1]
                  //  const siteCard = destination.get
                    
                    const list = document.createElement('li')
                    
                   // const p = document.createElement('small')
                 //   const small = document.createAttribute('small')
                 
                  //  p.setAttribute('site_id', site.id)
                    list.innerText = site.name;

                 //   list.appendChild(p)
                    destination.appendChild(list)
                   // destination.getElementsByClassName("site-container").appendChild(siteBin)
                  })
              }
          )
      }

      function compress(e){
        e.preventDefault()
        const bin = document.getElementsByClassName('site-card')[e.target.id - 1]
        bin.innerHTML = ''
      }

     function editText(e){
         
     } 

    function renderDestinations(destination){
        const div = document.createElement('div');
        div.setAttribute('class', 'destination-card')

        

        const h1= document.createElement('h1');
        h1.innerHTML = destination.attributes.name;
        h1.setAttribute('id', destination.id)
        div.append(h1);

        const siteDiv = document.createElement('div')
        siteDiv.setAttribute('class', 'site-card')
        div.appendChild(siteDiv)

        destinationContainer.appendChild(div);
        clickedCheck[destination.id] = false
        h1.addEventListener('click', (e) => {
            if (!clickedCheck[e.target.id]){
                console.log(e.target.id)
                clickedCheck[e.target.id] = !clickedCheck[e.target.id]
                sites(e)
            }else{
                console.log(e.target.id)
                clickedCheck[e.target.id] = !clickedCheck[e.target.id]
                compress(e)
            }
          })
    }

    getDestinations().then(json => {
        

        json.data.forEach(destination => {
            console.log(destination);
          renderDestinations(destination);
        })
      })
      
      
  
})
