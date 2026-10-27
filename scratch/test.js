const fs = require('fs');
try {
  JSON.parse(fs.readFileSync('data/syllabus_registry.json'));
  console.log('JSON OK');
} catch (e) {
  console.log('JSON ERROR', e);
}
