/*class TempManager {
     
    constructor (){
        this.cityData={}
    }

    getDataFromDB ()
    {
        $.ajax({
               url: 'http://localhost:3030/cities',
               type: 'GET',
               data: {},
               dataType: "json",
               complete: (data)=>{
   //console.log(data.weather);
             this.cityData=data
                console.log(this.cityData.weather);
               }
          })    
}
getCityData (cityName)
    {
let data2
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&APPID=00938d9d2f51ca8ceb650e7e4c0fbe60",
            type: 'GET',
            data: {},
            dataType: "json",
            complete:   (data)=>{
 
 data2 =data
         //console.log(data2.responseJSON);        
            }
       }) 
       //this.cityData.push(data2)
       console.log(data2); 
    }

    getCityData1 = async function (cityName) {
        
        let city = await  $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&APPID=00938d9d2f51ca8ceb650e7e4c0fbe60",
            type: 'GET',
            data: {},
            dataType: "json",
            complete: function(data){
 
                //cityData.push(data)  
                return data.weather     
            }
       })
       console.log(city)
       console.log(this.cityData);
      // TempManager.cityData.push("city")
    }




    saveCity (cityName)
    {
        for(let city of this.cityData ){
            if(city.name=cityName){
                $.ajax({
                    url: '/city',
                    type: 'POST',
                    data: {name: city.name, temperature: city.temperature ,condition: city.condition,conditionPic:city.conditionPic},
                    dataType: "json",
                    complete: {}
               })
            }
        }
           
    }

    removeCity (cityName)
    {
        
    }

}

//console.log(ce1.cityData);

    

const ce1= new TempManager()
 ce1.getDataFromDB()
 ce1.getCityData1('London')
// ce1.saveCity('London')
 //console.log(ce1.cityData);
 */


 class TempManagers {
    constructor() { this.cityData = [] }

    getData() { return JSON.stringify(this.cityData)
      //  console.log(JSON.parse(this.cityData));
       // return this.cityDatas
        
    }

    async getDataFromDB() {
        // this.cityData = []
        let res = await $.get('/cities')
        this.cityData = res
    }

    async getCityData(cityName) {
        let res = await $.get(`/city/${cityName}`)
        this.cityData.push(res)
        return res
    }

    async saveCity(obj) {
       
        const res = await $.ajax({
            url: '/city',
            method: 'POST',
            data: obj
        })
        // this.getDataFromDB()
    }


    async removeCity(cityName) {
        const res = await $.ajax({
            url: `/city/${cityName}`,
            method: 'DELETE'
        })
        // this.getDataFromDB()
    }

}

