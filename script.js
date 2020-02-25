const restaurants = document.getElementById("restaurants")
const sortPrice = (info) => {

    if (document.getElementById('highestFirst').checked) {
        info.sort(function (a, b) {
            return b.restaurant.average_cost_for_two - a.restaurant.average_cost_for_two
        })
    }
    else if (document.getElementById('lowestFirst').checked) {
        info.sort(function (a, b) {
            return a.restaurant.average_cost_for_two - b.restaurant.average_cost_for_two
        })
    }

    console.log(info)
    restaurants.innerHTML = ""

    info.forEach(item => {
        restaurants.innerHTML += `<section class="card"><img  src="${item.restaurant.thumb}"><h2>${item.restaurant.name}</h2><p>Average cost: ${item.restaurant.currency} ${item.restaurant.average_cost_for_two / 2}Address ${item.restaurant.location.address}</p><p class="rating">★ ${item.restaurant.user_rating.aggregate_rating} /5 ${item.restaurant.user_rating.rating_text}</p></section>`
    })

};

const accordion = () => {
    document.getElementById('sort-options').classList.toggle('shown')
    document.getElementById('showSort').classList.toggle('minus')
}

document.getElementById('showSort').onclick = accordion


fetch('https://developers.zomato.com/api/v2.1/search?entity_id=91&entity_type=city&cuisines=82',
    { headers: { 'user-key': "fd4251c5054a8885892b370d31bb5c07" } }
)
    .then(response => {
        return response.json()
    })
    .then(info => {

        info.restaurants.sort(function (a, b) {
            return a.restaurant.average_cost_for_two - b.restaurant.average_cost_for_two
        })

        console.log(info)


        document.getElementById('highestFirst').addEventListener("change", () => sortPrice(info.restaurants))
        document.getElementById('lowestFirst').addEventListener("change", () => sortPrice(info.restaurants))

        info.restaurants.forEach(item => {
            restaurants.innerHTML += `<section class="card"><img  src="${item.restaurant.thumb}"><h2>${item.restaurant.name}</h2><p>Average cost: ${item.restaurant.currency} ${item.restaurant.average_cost_for_two / 2}Address ${item.restaurant.location.address}</p><p class="rating">★ ${item.restaurant.user_rating.aggregate_rating} /5 ${item.restaurant.user_rating.rating_text}</p><section>`
        });

    })
