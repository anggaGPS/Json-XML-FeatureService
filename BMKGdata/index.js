// the name of provider is used by koop to help build default routes for FeatureService and a preview
const pkg = require('./package.json')
module.exports = {
  name: 'bmkg',
  hosts: true,
  Model: require('./model'),
  version: pkg.version,
  type: 'provider'
},{
  name: 'waze',
  hosts: true,
  Model: require('./model1'),
  version: pkg.version,
  type: 'provider'
}

