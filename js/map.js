// The following example creates complex markers retrieved from array

// Globals
let infowindow;
let mymap;
let allMarkers = [];

let locations = [
// [0] - icon file name, [1] - Title in Hebrew, [2-3] - Position, [4]-Base name for all photos, [5]- Photo numbers, 
["moatzagolan","מועצה אזורית גולן","32.993488916111616", "35.69139782783812",""],

["hubazelet","האבזלת","32.80364838353456", "35.71856324074095",""],
];


function initMap() {
	
	mymap = L.map('map').setView([32.99190514425066, 35.69189135429686], 10);
	
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);
	
	setMarkersbyMonth(mymap, 'all');
}

function setMarkersbyMonth(map, month) {
    // Adds markers to the map.
	
	let totalPoints = 0;

    /* Reading locations from array */
	locations.forEach(point => {
		let label = point[1];
		let photoNamesAll = point[4];
		let popupHtml = '<img src="images/map/'+point[0]+'.jpg" width="100%"><br><div align="center">'+label+'</div>';
		let photos = [];
		let photoNames = photoNamesAll.split(',');
		let photoIndex = 1;
		let numOfPhotos = photoNames.length;
		let toPush = 0;
		let monthId = '';
		//console.log(photoNamesAll + ', total=' + numOfPhotos);
		photoNames.forEach(photoName => {
			if (month == 'all') {
				toPush = 1;
			} else {
				monthId = getMonthByPhotoName(photoName);
				//console.log('getMonthByPhotoName('+photoName+') = '+ monthId);
				if (month == monthId) {
					toPush = 1;
				}
			}
			if (toPush) {
				if (month == 'all') {
					photos.push({href: 'images/map/big/'+photoName+'.jpg', title: '('+photoIndex+' of '+numOfPhotos+') '+label});
				} else {
					photos.push({href: 'images/map/big/'+photoName+'.jpg', title: label});
				}
				photoIndex++;
			}
		});
				
		if (photoIndex > 1) {
			totalPoints++;
			let min_width = 300;
			if (window.screen.width < 1000) {
				min_width = 100;
			}
			let popup = L.popup({minWidth: min_width})
						.setContent(popupHtml);
						
			let marker = L.marker([parseFloat(point[2]), parseFloat(point[3])], {title: label})
			.bindTooltip(label)
			.addTo(map)
			.bindPopup(popup)
			.on('click', function( e ) {
							//e.preventDefault();
							jQuery(function($) {
								$.swipebox(photos);
							});
						}
			);
			allMarkers.push(marker);
		}
    });

	console.log('setMarkers for month: '+month+' total='+totalPoints);
} /* setMarkers */


function getMonthByPhotoName(phName) {
	let retVal = '';
	for (let i=0; i<allPhotos.length; i++) {
		if (phName == allPhotos[i].src) {
			retVal = allPhotos[i].month;
			break;
		}
	}
	return retVal;
} /* getMonthByPhotoName */

function clearMapAndSetNewMarkersByMonth(monthId) {
	allMarkers.forEach(marker => {
		mymap.removeLayer(marker);
	})
	setMarkersbyMonth(mymap, monthId);
}

initMap();

