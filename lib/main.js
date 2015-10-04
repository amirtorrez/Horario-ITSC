var f = new Date(),i,getAday;
var diasSemana = new Array("Domingo","Lunes","Mártes","Miércoles","Jueves","Viernes","Sábado");
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
};
var getPage = getUrlVars()["page"];
var getAday = getUrlVars()["day"];
function updtlnk(){window.location.href = "?page=info";};
function buttonhome() {window.location.href = "index.html";};
function buttonmenu() {window.location.href = "?page=info";};
var tDay = f.getDay;
function dayafter() {window.location.replace(getAday==0?"?page=portada&day=6":"?page=portada&day="+(getAday-1));};
function daynext() {window.location.replace(getAday==6?"?page=portada&day=0":"?page=portada&day="+(parseInt(getAday)+1));};
$(window).load(function() {
	$('#preloader').fadeOut('slow');
	$('body').css({'overflow':'visible'});
});
$(document).ready(function(){
	$.getJSON("app.json", function(datos){
		$("#apptitle").html(datos['name']);
		$("#actvrsn").html(datos['version']);
	});
	$(".finde").html('<img src="src/finde.png" height="300" />');
	for(i=0;i<=7;i++){$("#day"+i).hide();};
	switch(getPage){
		case 'info': $("#nwvsnupdt1").hide();$("#info").show();$("#nav_title").html('Información');break;
		case 'menu': $("#menu").show();$("#nav_title").html('Menu'); break;
		case 'materias': $("#materias").show();$("#nav_title").html('Materias'); break;
		case 'portada': default: $("#portada").show();$("#navhome").show(); break;
	};
	if(getPage == 'portada' || getPage == null || getPage.length == 0){
		if(getAday == null || getAday.length == 0){
			$("#getDay").html(diasSemana[f.getDay()]);
			$("#day"+f.getDay()).show();
			getAday = f.getDay();
		} else {
			$("#getDay").html(diasSemana[getAday]);
			$("#day"+getAday).show();
		};
		$("#buttonmenu").show();
		$("#buttonhome").hide();
		if(getAday == 1){$("#dayafter").hide();};
		if(getAday == 5){$("#daynext").hide();};
	} else {
		$("#buttonhome").show();
		$("#buttonmenu").attr("style", "color:transparent;text-shadow:none;"); 
		$("#buttonmenu").attr("onclick", "");
	};
	if(getPage == 'info'){$("#nwvsnupdt1").hide();};
	var appremoteurl = 'http://www.torzap.com.mx/apps/Class/version.json';
	$.ajax({
		url: appremoteurl+'?callback=?',
		datatype: 'jsonp',
		success: function(datos1){
			var newversion = datos1['newversion'];
			$("#nwvrsn").html(newversion);
			$("#nw_vrsn").html(newversion);
			console.log('Ultima version: '+newversion);
			$.getJSON("app.json", function(datos2){
				var actualversion = datos2['version'];
				if(newversion > actualversion){$(".nwvsnupdt").show();}
				if(getPage == 'info') {$("#nwvsnupdt1").hide();}
				console.log('Version de esta app: '+actualversion);
			});
		},
		error: function(){console.log('Error accediendo a la url: '+appremoteurl);}
	});
	var old = console.log;
	var logger = document.getElementById('console');
	console.log = function (message) {
		if (typeof message == 'object') {
			logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
		} else {
			logger.innerHTML += message + '<br />';
		}
	}
});
