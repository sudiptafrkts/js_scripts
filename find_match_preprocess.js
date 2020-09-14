const fs = require('fs');
const fm_utils = require("./find_match_utils");
const hereconf = JSON.parse(fs.readFileSync('here_conf.json', 'utf8')).heremaps;

if (process.argv.length <= 2) {
    filename = __filename.slice(1 + __filename.lastIndexOf('/'));
    process.stdout.write('usage : node ' + filename + ' input_json_file\n');
} else {
    const filename = process.argv[2];
    fs.readFile(filename, 'utf8', function (err, contents) {
        if (err) {
            console.error(err);
        } else {
            // console.log('ok read');
            preprocessAndWriteContents(filename, contents);
        }
    });
}



function preprocessAndWriteContents(filename, data) {
    data = JSON.parse(data);
    data = fm_utils.geoCodeLoadsWithMissingData(data, hereconf);
    data = fm_utils.setTravelTimeAndDistanceFromHere(data, hereconf);
    console.table(fm_utils.hitCount);
    fs.writeFile('usit_load_data.json', JSON.stringify(data), (e) => {
        if (e) console.error("Write Error : ", e);
    });
}
