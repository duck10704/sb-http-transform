const httpTransform = require('./index.js');

const r = httpTransform.load('./resources/json/test.json');
const rr = httpTransform.load('./resources/yaml/test.yml');

console.log('json:', r);
console.log('yaml:', rr);
