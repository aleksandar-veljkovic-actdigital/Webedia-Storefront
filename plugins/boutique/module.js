export default function ExampleModule(moduleOptions) {

  this.addLayout(path.resolve(__dirname + "/layouts/boutique-layout.vue"))

}

// REQUIRED if publishing the module as npm package
module.exports.meta = require('./package.json')
