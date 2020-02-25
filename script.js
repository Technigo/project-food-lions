const restaurants = document.getElementById("restaurants")
const highestFirst = (info) => {


    info.sort(function (a, b) {
        return b.restaurant.average_cost_for_two - a.restaurant.average_cost_for_two

    })

    console.log(info)
    restaurants.innerHTML = ""


    info.forEach(item => {
        restaurants.innerHTML += `<p>Restaurant name: ${item.restaurant.name} 
     Average cost: ${item.restaurant.currency} ${item.restaurant.average_cost_for_two / 2}
     Address ${item.restaurant.location.address}
     </p> <img src="${item.restaurant.thumb}">
     <p>Review: ${item.restaurant.user_rating.aggregate_rating} /5 ${item.restaurant.user_rating.rating_text}</p>
     `
    })

};

fetch('https://developers.zomato.com/api/v2.1/search?entity_id=91&entity_type=city&cuisines=82',
    { headers: { 'user-key': "8e3b45cc8d20404f3751e42d9cef2e88" } }
)
    .then(response => {
        return response.json()
    })
    .then(info => {



        console.log(info)


        document.getElementById('test').addEventListener("click", () => highestFirst(info.restaurants))

        info.restaurants.forEach(item => {
            restaurants.innerHTML += `<p>Restaurant name: ${item.restaurant.name} 
         Average cost: ${item.restaurant.currency} ${item.restaurant.average_cost_for_two / 2}
         Address ${item.restaurant.location.address}
         </p> <img src="${item.restaurant.thumb}">
         <p>Review: ${item.restaurant.user_rating.aggregate_rating} /5 ${item.restaurant.user_rating.rating_text}</p>
         `
        });




    })