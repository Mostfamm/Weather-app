class Renderer {
    constructor() { }

    renderData(citiesArr) {
        $('#search-input').empty()
        const arr = JSON.parse(citiesArr)
        const source = $('#cities-template').html()
        const template = Handlebars.compile(source)
        let newHtml = template({ cities: arr })
        $('#results').append(newHtml)
    }

}
