const httpTransform = require('./index.js');

const r = httpTransform.load('./input/json/test.json');
const rr = httpTransform.load('./input/yaml/test.yaml');

console.log('json:', r);
console.log('yaml:', rr);
