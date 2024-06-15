// index.js
let ramenCounter = 1;
let currentRamen = 1;
// Callbacks
const handleClick = (ramen) => {
  // Add code
  //find elements and add ramen info to DOM
  let displayCard = document.getElementById("ramen-detail");
  let ramenImg = displayCard.getElementsByClassName("detail-image");
  let ramenName = displayCard.getElementsByClassName("name");
  let ramenRestaurant = displayCard.getElementsByClassName("restaurant");

  ramenImg[0].src = `${ramen.image}`;
  ramenName[0].textContent = `${ramen.name}`;
  ramenRestaurant[0].textContent = `${ramen.restaurant}`

  let ramenRating = document.getElementById("rating-display");
  let ramenComment = document.getElementById("comment-display");
  ramenRating.textContent = `${ramen.rating}`;
  ramenComment.textContent = `${ramen.comment}`;

  //sets current ramen for use when deleting from DOM
  currentRamen = ramen.id;
};

const addSubmitListener = () => {
  // Add code
  let ramenForm = document.querySelector("form");
  ramenForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    buildRamen(e.target);
    
    ramenForm.reset()})
    

}

function deleteRamen(ramenId){
  //console.log("click")
  //ramen.parentNode.remove();

  //delete ramen from db.json
  fetch(`http://localhost:3000/ramens/${ramenId}`,{
    method:'DELETE',
    headers: {
      'Content-Type':'application/json'
    }
  })
}  

const buildRamen = (newRamen) => {
  //create object with new ramen info
  let ramenObj = {
    id: ramenCounter,
    name: `${newRamen.name.value}`,
    image: `${newRamen.image.value}`,
    restaurant: `${newRamen.restaurant.value}`,
    rating: newRamen.rating.value,
    comment: `${newRamen.comment.value}`
  };
  //add new ramen object to DOM
  renderRamen(ramenObj);
  

}

const displayRamens = () => {
  // Add code
  fetch(`http://localhost:3000/ramens`)
  .then(response => response.json())
  .then(data => data.forEach(ramen => {
    renderRamen(ramen)}))

};
function renderRamen(ramen){

  //create a div the ramen
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div>
      <img id="${ramen.id}" src="${ramen.image}" class="ramenImg" /> 
    </div>
    <div>
      <button type="button" id="del${ramen.id}">Delete</button>
    </div>
  `;
  //append ramen div to DOM
  document.getElementById("ramen-menu").appendChild(card);

  //add click functionality
  document.getElementById(`${ramen.id}`).addEventListener("click", () =>  handleClick(ramen));
  document.getElementById(`del${ramen.id}`).addEventListener("click", () =>  {
    //card.remove();
    deleteRamen(`${ramen.id}`)
    //check if displayed ramen is the one being deleted and remove it from DOM
    if(ramen.id === currentRamen){
      clearRamen();
    }
  });

  //display first ramen by default
  if(ramenCounter === 1){
    handleClick(ramen);
  }
  ramenCounter += 1;
}

function clearRamen(){

    // remove deleted ramen from the display in DOM
    let displayCard = document.getElementById("ramen-detail");
    let ramenImg = displayCard.getElementsByClassName("detail-image");
    let ramenName = displayCard.getElementsByClassName("name");
    let ramenRestaurant = displayCard.getElementsByClassName("restaurant");
  
    ramenImg[0].src = ``;
    ramenName[0].textContent = ``;
    ramenRestaurant[0].textContent = ``
  
    let ramenRating = document.getElementById("rating-display");
    let ramenComment = document.getElementById("comment-display");
    ramenRating.textContent = ``;
    ramenComment.textContent = ``;

}

const main = () => {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();
}

main()
// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
