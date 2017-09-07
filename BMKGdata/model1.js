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
	
	const date = new Date()
	const current_hour = date.getHours()
	console.log(current_hour)
	if (0<=current_hour<=5) {
		jam.push(0);
		}
	 else if (6<=current_hour<=11){
		 jam.push(1);
	 }
	  else if (12<=current_hour<=17){
		 jam.push(2);
	 }else if (18<=current_hour<=23){
		 jam.push(3);
	 }

  const feature =  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [apt.longitude[0], apt.latitude[0]]
    },
    properties: {
      
	  
	  uuid: apt.id[0],
	  region: parseFloat(apt.region[0]),
	  time_progress: parseFloat(apt.level[0]),
	  city: apt.description[0],
	  description: apt.parameter[0].data.description,
	  datetimes: parseFloat(apt.parameter[0].timerange[jam].data.datetime),
	  value: apt.parameter[0].timerange[jam].value,
	  waktu:current_hour
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


