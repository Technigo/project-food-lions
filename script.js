let restoInfo;
let averageCost;
fetch('https://developers.zomato.com/api/v2.1/search?entity_id=91&entity_type=city&cuisines=82',
    { headers: { 'user-key': "8e3b45cc8d20404f3751e42d9cef2e88" } }
)
    .then(response => {
        return response.json()
    })
    .then(info => {
        console.log(info)
        restoInfo = info.restaurants
        showRestaurant(info.restaurants);
    })
const showRestaurant = (array) => {
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