// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Drag/Drop Test',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Drag/Drop Test',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);

//  add tabs
//
tabGroup.addTab(tab1);

var win = win1;

var annotation = Titanium.Map.createAnnotation({
	latitude:42.334537,
	longitude:-71.170101,
	title:"Drag Me",
	animate:true,
	draggable:true,
	leftButton:'../images/atlanta.jpg',
	image:"../images/boston_college.png"
});

var boston = {latitude:42.334537,longitude:-71.170101,latitudeDelta:0.010, longitudeDelta:0.018};

//
// CREATE MAP VIEW
//
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region: boston,
	animate:true,
	regionFit:true,
	userLocation:true,
	annotations:[annotation]
});


win.add(mapview);

// map view pin change drag state event listener
mapview.addEventListener('pinchangedragstate', function(evt)
{
	if (evt.oldState == "dragging") {
		annotation.subtitle = [annotation.latitude, ':', annotation.longitude].join(' ');
	}
	Ti.API.info(['newState:', evt.newState, 'oldState', evt.oldState].join(' '));
});



// open tab group
tabGroup.open();
