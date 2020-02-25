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

    showRestaurant(info)
    // restaurants.innerHTML = ""

    // info.forEach(item => {
    //     restaurants.innerHTML += `<section class="card"><img  src="${item.restaurant.thumb}"><h2>${item.restaurant.name}</h2><p>Average cost: ${item.restaurant.currency} ${item.restaurant.average_cost_for_two / 2}Address ${item.restaurant.location.address}</p><p class="rating">★ ${item.restaurant.user_rating.aggregate_rating} /5 ${item.restaurant.user_rating.rating_text}</p></section>`
    // })

};

const accordion = () => {
    document.getElementById('sort-options').classList.toggle('shown')
    document.getElementById('showSort').classList.toggle('minus')
}

document.getElementById('showSort').onclick = accordion


let restoInfo;
let averageCost;
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
        restoInfo = info.restaurants
        // showRestaurant(info.restaurants);


        document.getElementById('highestFirst').addEventListener("change", () => sortPrice(info.restaurants))
        document.getElementById('lowestFirst').addEventListener("change", () => sortPrice(info.restaurants))

        info.restaurants.forEach(item => {
            restaurants.innerHTML += `<section class="card"><img  src="${item.restaurant.thumb}"><h2>${item.restaurant.name}</h2><p>Average cost: ${item.restaurant.currency} ${item.restaurant.average_cost_for_two / 2}Address ${item.restaurant.location.address}</p><p class="rating">★ ${item.restaurant.user_rating.aggregate_rating} /5 ${item.restaurant.user_rating.rating_text}</p><section>`
        });

    })


const showRestaurant = (array) => {
    if (document.getElementById('highestFirst').checked) {
        array.sort(function (a, b) {
            return b.restaurant.average_cost_for_two - a.restaurant.average_cost_for_two
        })
    }
    else if (document.getElementById('lowestFirst').checked) {
        array.sort(function (a, b) {
            return a.restaurant.average_cost_for_two - b.restaurant.average_cost_for_two
        })
    }
    console.log("show restau", array.length, array)
    restaurants.innerHTML = `<p></p>`
    array.forEach(item => {
        restaurants.innerHTML += `<p>Restaurant name: ${item.restaurant.name} 
 Average cost: ${item.restaurant.currency} ${item.restaurant.average_cost_for_two / 2}
 Address ${item.restaurant.location.address}
 </p> <img src="${item.restaurant.thumb}">
 <p>Review: ${item.restaurant.user_rating.aggregate_rating} /5 ${item.restaurant.user_rating.rating_text}</p>
 `
    })
}
const filterFunction = () => {
    const filteredArray = restoInfo.filter(item => item.restaurant.highlights.includes("Takeaway Available"))
    console.log(filteredArray);
    showRestaurant(filteredArray);
};
const filterDeliveryFunction = () => {
    const filteredArray = restoInfo.filter(item => item.restaurant.highlights.includes("Delivery"))
    console.log(filteredArray);
    showRestaurant(filteredArray);
};
const filterPriceLow = () => {
    const filteredArray = restoInfo.filter(item => item.restaurant.average_cost_for_two <= 30)
    console.log(filteredArray);
    showRestaurant(filteredArray);
};
const filterPriceMedium = () => {
    const filteredArray = restoInfo.filter(item => item.restaurant.average_cost_for_two > 30 && item.restaurant.average_cost_for_two < 45)
    console.log(filteredArray);
    showRestaurant(filteredArray);
};
const filterPriceHigh = () => {
    const filteredArray = restoInfo.filter(item => item.restaurant.average_cost_for_two >= 45)
    console.log(filteredArray);
    showRestaurant(filteredArray);
};
document.getElementById('hasTakeaway').addEventListener('click', filterFunction)
document.getElementById('hasDelivery').addEventListener('click', filterDeliveryFunction)
document.getElementById('priceLow').addEventListener('click', filterPriceLow)
document.getElementById('priceMedium').addEventListener('click', filterPriceMedium)
document.getElementById('priceHigh').addEventListener('click', filterPriceHigh)

let currentRestaurant 