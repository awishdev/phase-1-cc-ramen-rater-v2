// index.js
let ramenCounter = 1;
let currentRamen = 1;
// Callbacks
const handleClick = (ramen) => {
  // Add code
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
  fetch(`http://localhost:3000/ramens/${ramenId}`,{
    method:'DELETE',
    headers: {
      'Content-Type':'application/json'
    }
  })
}  

const buildRamen = (newRamen) => {
  let ramenObj = {
    id: ramenCounter,
    name: `${newRamen.name.value}`,
    image: `${newRamen.image.value}`,
    restaurant: `${newRamen.restaurant.value}`,
    rating: newRamen.rating.value,
    comment: `${newRamen.comment.value}`
  };
  
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

  document.getElementById("ramen-menu").appendChild(card);
  document.getElementById(`${ramen.id}`).addEventListener("click", () =>  handleClick(ramen));
  document.getElementById(`del${ramen.id}`).addEventListener("click", () =>  {
    //card.remove();
    deleteRamen(`${ramen.id}`)
    if(ramen.id === currentRamen){
      clearRamen();
    }
  });
  if(ramenCounter === 1){
    handleClick(ramen);
  }
  ramenCounter += 1;
}

function clearRamen(){

    // Add code
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
