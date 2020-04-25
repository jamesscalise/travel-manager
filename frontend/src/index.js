const clickedCheck = {}

document.addEventListener("DOMContentLoaded", () => {

    let destinationForm = document.getElementById('new-container')

    class Destination{
        constructor(destination){
            this.id = destination.id
            this.name = destination.attributes.name
        }

        static newDestination(destination_data){
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
            let newDestination = new Destination(obj_destination.data)
            newDestination.displayDestination()
         })
        }


      compress(){
         const bin = document.getElementById(`site-card-${this.id}`)
         bin.innerHTML = ''
      }

        displayDestination(){
            const div = document.createElement('div');
            div.setAttribute('class', 'destination-card')
    
            const h1= document.createElement('h1');
            h1.innerHTML = this.name;
            h1.setAttribute('id', this.id)
            div.append(h1);
    
            const siteDiv = document.createElement('div')
            siteDiv.setAttribute('id', `site-card-${this.id}`)
            div.appendChild(siteDiv)

            let destinationContainer = document.getElementById('destination-collection')
    
            destinationContainer.appendChild(div);
            clickedCheck[this.id] = false
            h1.addEventListener('click', (e) => {
                if (!clickedCheck[e.target.id]){
                    clickedCheck[e.target.id] = !clickedCheck[e.target.id]
                    Site.displaySites(e)
                }else{
                    clickedCheck[e.target.id] = !clickedCheck[e.target.id]
                    this.compress()
                }
              })

        }



        static getDestinations(){
            return fetch('http://localhost:3000/destinations')
             .then(res => res.json())
        }
    }

    class Site{
        constructor(site){
            this.id = site.id
            this.name = site.name
            this.destination_id = site.destination_id
        }  
        
        static newSite(site_data){
          fetch('http://localhost:3000/sites', {
            method: 'POST',
            headers:{
            'Content-Type': 'application/json',
            'Accept': "application/json"
            },
            body: JSON.stringify({
              name: site_data.name,
              destination_id: site_data.destination_id
            })
             })
            .then(res => res.json())
            .then((obj_site) => {
             // let new_site = new Site(obj_site.data)
            //  new_site.displaySite()
            site_data.id = obj_site.data.id
            let new_site = new Site(site_data)
            new_site.displaySite()
         })
        }

        static deleteSite(id, destination_id){
          fetch(`http://localhost:3000/sites/${id}`, {
            method: 'DELETE'
             })
             let site = document.getElementById(`site-${id}`)
             site.remove();
            
        }

        displaySite(){
            let site_container = document.getElementById(`site-card-${this.destination_id}`)
            let child = site_container.querySelector('.site-container');

            let div = document.createElement('div')
            div.setAttribute('id', `site-${this.id}`)


            const list = document.createElement('li')

            let btn = document.createElement('button')
            btn.setAttribute('id', this.id)
            btn.innerText = "Delete sight"

            btn.addEventListener('click', (e) => {
              Site.deleteSite(e.target.id, this.destination_id)
              
            })
                          
            list.innerText = this.name;

            div.appendChild(list)
            div.appendChild(btn)

            child.appendChild(div)
        }

        static displaySites(e){
            
          let destination = document.getElementById(`site-card-${e.target.id}`)
          const div = document.createElement('div')
          div.setAttribute('class', 'site-container')
          destination.appendChild(div)
              fetch(`http://localhost:3000/destinations/${e.target.id}`)
                .then(res => res.json())
                .then(json =>{
                      json.data.attributes.sites.forEach(site => {
                      let newSite = new Site(site)
                      newSite.displaySite() 
                    })       
                 })
                   
          let form =
          `
              <div id="new-site-container-${e.target.id}">
                  <form id = "new-site-form-${e.target.id}" style="">
                  <p>Add a sight for this destination</p>
      
                  <input type="text" name="name" value="" placeholder="Enter the sight name" class="input-text">
                  <br>

                  <input type="hidden" id="destination_id" name="destination_id" value="${e.target.id}">

                  
                  <input type="submit" name="submit" value="Add a new sight" class="submit">
                  </form>
                </div>

              `
          destination.insertAdjacentHTML('beforeend', form)   
          let new_form = document.getElementById(`new-site-container-${e.target.id}`)
          new_form.addEventListener('submit', event => {
            event.preventDefault()
            let data = {
                name: event.target.name.value,
                destination_id: event.target.destination_id.value
            }
            Site.newSite(data)
          })
        }

    }

  
    destinationForm.addEventListener('submit', event => {
     event.preventDefault()
      Destination.newDestination(event.target)
    })
    
    Destination.getDestinations().then(json => {
        json.data.forEach(destination => {
            let newDes = new Destination(destination)
            newDes.displayDestination()
        })
      })
      
      
  
})
