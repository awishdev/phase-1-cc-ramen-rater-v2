// index.js
const ramenHolder = {};
let ramenCounter = 1;
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

};

const addSubmitListener = () => {
  // Add code
  let ramenForm = document.querySelector("form");
  ramenForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    buildRamen(e.target);
    
    ramenForm.reset()})
    

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
    <img id="${ramen.id}" src="${ramen.image}" class="ramenImg" /> 
  `;
  ramenHolder[`${ramen.id}`] = {
    name: `${ramen.name}`,
    image: `${ramen.image}`,
    rating: ramen.rating,
    comment: `${ramen.comment}`
    
  };
  
  document.getElementById("ramen-menu").appendChild(card);
  document.getElementById(`${ramen.id}`).addEventListener("click", () =>  handleClick(ramen));
  ramenCounter += 1;
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
