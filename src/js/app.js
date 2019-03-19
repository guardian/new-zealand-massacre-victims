import xr from 'xr';
import { Christchurch } from './modules/christchurch'

var key = "1UMfHH82iz1iZUfymXJfGgxAZDNsmu0c7vNug8dkAHLg"

xr.get('https://interactive.guim.co.uk/docsdata/' + key + '.json?t=' + new Date().getTime()).then((resp) => {

	var data  = resp.data.sheets.data

	new Christchurch(data)

});
