const clickedCheck = {}


document.addEventListener("DOMContentLoaded", () => {

  let destinationContainer = document.getElementById('destination-collection')

    let destinationForm = document.getElementById('new-container')

    destinationForm.addEventListener('submit', event => {
     event.preventDefault()
     console.log(event)
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
      //  e.preventDefault()
        const destination = document.getElementsByClassName('site-card')[e.target.id - 1]

        fetch(`http://localhost:3000/destinations/${e.target.id}`)
          .then(res => res.json())
          .then(json =>{
                  json.data.attributes.sites.forEach(site => {
                  
                    
                    const list = document.createElement('li')
                    
                    list.innerText = site.name;

                    destination.appendChild(list)
                  })

                  
              })
              let form =
              `
                  <div id="new-site-container">
                      <form id = 'new-site-form'>
                      <p>Add a sight for this destination</p>
          
                      <input type="text" name="name" value="" placeholder="Enter the sight name" class="input-text">
                      <br>
                      
                      <input type="submit" name="submit" value="Add a new sight" class="submit">
                      </form>
                    </div>
                  `

                  destination.insertAdjacentHTML('beforeend', form)   

                  let site_form = document.getElementById('new-site-container')
                  site_form.addEventListener('submit', event => {
                    event.preventDefault()
                    console.log(event)
                  })

          
      }

      function compress(e){
        e.preventDefault()
        const bin = document.getElementsByClassName('site-card')[e.target.id - 1]
        bin.innerHTML = ''
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
