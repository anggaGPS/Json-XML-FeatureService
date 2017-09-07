'use strict'
// Cache configured time or 1 hour
const config = require('config')
//const ttl = (config.craigslist && config.craigslist.ttl) || 60 * 60
const ttl = 0
const request = require('request').defaults({gzip: true})
const types = require('./mappings/types.js')

module.exports = function () {
  // This is our one public function it's job its to fetch data from craigslist and return as a feature collection
  this.getData = function (req, callback) {
    const city = req.params.host
    const type = req.params.id
    request(`http://localhost/bmkg/cuaca.php?city=${city}&param=${type}&map=1`, (err, res, body) => {
      if (err) return callback(err)
      const apartments = translate(res.body)
      apartments.ttl = ttl
      apartments.metadata = {
        name: `${city} ${type}`,
        description: `Craigslist ${type} listings proxied by https://github.com/dmfenton/koop-provider-craigslist`
      }
      callback(null, apartments)
    })
  }
}

// Map accross all elements from a Craigslist respsonse and translate it into a feature collection
function translate (data) {
  const list = JSON.parse(data)
  //console.log(list)

  const featureCollection = {
    type: 'FeatureCollection',
    features: []
  }
  if (list) {
    const apartments = list.filter(node => { return node.id[0] })
    featureCollection.features = apartments.map(formatFeature)
  }
  return featureCollection
}

// This function takes a single element from the craigslist response and translates it to GeoJSON
// TODO format based on schema types for other craiglists things like jobs
function formatFeature (apt) {
	const jam=[]
	const cuaca1=[]
	const nilai=[]
	
	
	
	const date = new Date()
	const current_hour = date.getHours()

		
	
	if ( 0<=current_hour && current_hour<=5) {
		jam.push(3)
		//console.log('1')
		}
	 else if ( 6<=current_hour && current_hour<=11){
		 jam.push(0)
		// console.log('2')
	 }
	  else if ( 12<=current_hour && current_hour<=17){
		 jam.push(1)
		 //console.log('3')
	 }
	 else if ( 18<=current_hour && current_hour<=23){
		 jam.push(2)
		 //console.log('4')
	 }
	 const value= apt.parameter[0].timerange[jam].value
	 
if(apt.parameter[0].data.description=='Weather') {
	 if (value==60){
		//console.log('Hujan Ringan')
		cuaca1.push('Hujan Ringan')
	}
	else if(value==61)
	{
			//console.log('Hujan Sedang')
			 cuaca1.push('Hujan Sedang')
	}
	else if(value==80)
	{
		//console.log('Hujan Lokal')
		cuaca1.push('Hujan Lokal')
	}

	else if(91<=value && value<=98)
	{
		//console.log('Hujan Petir')
		cuaca1.push('Hujan Petir')
	}
	else if(101<=value && value<=102)
	{
		//console.log('Cerah Berawan')
		cuaca1.push('Cerah Berawan')
	}
	
	else if(1<=value && value<=6)
	{
		//console.log('Kabut')
		cuaca1.push('Kabut')
	}
	else if(value==103)
	{
		//console.log('Berawan')
		cuaca1.push('Berawan')
	}
	else if(value==104)
	{
		//console.log('Berawan Tebal')
		cuaca1.push('Berawan Tebal')
	}
	else if(value==45)
	{
		//console.log('Udara Kabur')
		cuaca1.push('Udara Kabur')
	}
	else if(value==100)
	{
		//console.log('Cerah')
		cuaca1.push(null)
		//const cuaca1=['tes']
	}
	
	}
	else {
		cuaca1.push(apt.parameter[0].timerange[jam].sasd)
	}
	if (apt.parameter[0].data.description=='Wind direction' || apt.parameter[0].data.description=='Temperature' || apt.parameter[0].data.description=='Wind speed'){
		
		//const nilai=apt.parameter[0].timerange[jam].value[0]
			nilai.push(apt.parameter[0].timerange[jam].value[0])
	//	console.log('bukan cuaca')
	}
	else {
		//const nilai=apt.parameter[0].timerange[jam].value)
		nilai.push(apt.parameter[0].timerange[jam].value)
	}
	//console.log(apt.parameter[0].data.description)
	
	
	
  const feature =  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [apt.longitude[0], apt.latitude[0]]
    },
    properties: {
      
	  
	  uuid: parseFloat(apt.id[0]),
	  region: parseFloat(apt.region[0]),
	  time_progress: parseFloat(apt.level[0]),
	  city: apt.description[0],
	  description: apt.parameter[0].data.description,
	  datetimes: apt.parameter[0].timerange[jam].data.datetime,
	  value: parseFloat(nilai),
	  waktu:current_hour,
	  cuaca: cuaca1[0]
	 
	 // datetime: apt.parameter.timerange.attributes[2].datetime,
	  //value: apt.parameter.timerange.value
	
     //postDate: dateFormat(apt.PostedDate),
     // posting: 'https:' + apt.type,
     // thumbnail: apt.ImageThumb
    }
  }
 if (!isNaN(feature.properties.price) && !isNaN(feature.properties.bedrooms)) {
   const ppbr = feature.properties.price / feature.properties.bedrooms
   if (ppbr !== 0 && ppbr !== Infinity) feature.properties.pricePerBedroom = ppbr
 }
 return feature
}


