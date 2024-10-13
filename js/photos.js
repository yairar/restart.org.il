
var allPhotos = [
/*oct*/
{src:'irusim1', w:1400, h:990, title:'מפל האירוסים', tags: 'winter', month:'10'},
{src:'kineret1', w:1400, h:990, title:'נוף לכנרת', tags: 'spring', month:'10'},
{src:'orvim1', w:1400, h:990, title:'מפל עורבים', tags: 'winter', month:'10'},
{src:'nov1', w:1400, h:934, title:'ואדי נוב בשיא הזרימה', tags: 'winter', month:'10'},

];


function openPhotoSwipe(subsetTag) {
    
	//console.log('Input tag = '+subsetTag);
	
// build subset of allPhotos according to TAG
	let itemsSubset = [];
	let photoItem = {};
	if (subsetTag == 'ALL') {
		itemsSubset = allPhotos;
		// create full image urls
		itemsSubset.forEach(item => {
			item.src = 'images/map/big/'+item.src+'.jpg';
		});
	}
	else {
		for (i = 0; i < allPhotos.length; i++) {
			//console.log('item['+i+'].tags='+allPhotos[i].tags);
			tagIndex = allPhotos[i].tags.indexOf(subsetTag);
			//console.log('x='+x);
			if (tagIndex != -1) {
				photoItem = {};
				// object copy is needed here in order not to change original allPhotos array
				Object.assign(photoItem, allPhotos[i]); 
				// create full image url before adding to itemsSubset
				photoItem.src = 'images/map/big/'+photoItem.src+'.jpg';
				itemsSubset.push(photoItem);
			}
		}
	}
	
	var pswpElement = document.querySelectorAll('.pswp')[0];
    // define options (if needed)
    var options = {
      	history: false,
      	//focus: false,

        //showAnimationDuration: 0,
        //hideAnimationDuration: 0,
		
		shareButtons: [
			{id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'}
		]
        
    };

    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, itemsSubset, options);
    gallery.init();
};

function openPhotoSwipeVideo(id) {
	
	var itemsSubset =[
	  {
		html: '<video controls autoplay><source src="images/video/'+id+'.mp4" type="video/mp4"></video>'
	  },
	];
	
	var pswpElement = document.querySelectorAll('.pswp')[0];
    // define options (if needed)
    var options = {
      	history: false,
	
		shareButtons: [
			{id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'}
		]
        
    };

    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, itemsSubset, options);
    gallery.init();	
}

