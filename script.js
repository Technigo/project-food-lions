fetch('https://developers.zomato.com/api/v2.1/search?entity_id=91&entity_type=city&cuisines=82',
    { headers: { 'user-key': "8e3b45cc8d20404f3751e42d9cef2e88" } }
)
    .then(response => {
        return response.json()
    })
    .then(info => {
        console.log(info)
    })