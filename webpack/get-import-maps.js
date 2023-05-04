const fs = require('fs');
const path = require('path');

// get SystemJS importmap object
// env: local | dev | stg | pro
function getImportmaps(env) {
  const importmapTypeList = ['vendors', 'core', 'ma'];
  const importmapObj = importmapTypeList.reduce((accumulator, importmapType) => {
    return {
      ...accumulator,
      ...JSON.parse(
        fs.readFileSync(path.resolve(__dirname, `../client/src/importmaps/${env}/${importmapType}.importmap.json`))
      ),
    };
  }, {});

  return JSON.stringify({
    imports: importmapObj,
  });
}

exports.getImportmaps = getImportmaps;
