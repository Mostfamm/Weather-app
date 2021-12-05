let data = new TempManagers();
let renderer = new Renderer();

async function loadPage() {
    await data.getDataFromDB()
    renderer.renderData(data.getData())
}

$(document).ready(async function () {
    loadPage()
})

async function handleSearch() {
    let res = await data.getCityData($('input').val())

    renderer.renderData(JSON.stringify([res]))
    
}

$('#search-btn').on('click', handleSearch)

$('#results').on('click', '.save-btn', function () {
    let name = $(this).closest('.save-remove-btns').siblings('.city-info').find('h2').text();
    let temperature = $(this).closest('.save-remove-btns').siblings('.city-info').find('.city-temp').text();
    let condition = $(this).closest('.save-remove-btns').siblings('.city-info').find('figcaption').text();
    let src = $(this).closest('.save-remove-btns').siblings('.city-info').find('img').attr('alt')
    
    data.saveCity({
        name: name,
        temperature: temperature,
        condition: condition,
        conditionPic: src
    })
})


$('#results').on('click', '.remove-btn', function () {
    let name = $(this).closest('.save-remove-btns').siblings('.city-info').find('h2').text();
    data.removeCity(name)
})
