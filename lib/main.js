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
function updtdwn(){window.location.href = "http://www.torzap.com.mx/dl/itsc/";};
function buttonhome() {window.location.href = "index.html";};
function buttonmenu() {window.location.href = "?page=info";};
function dayafter() {window.location.href = "?page=portada&day="+(getAday-1);};
function daynext() {window.location.href = "?page=portada&day="+(parseInt(getAday)+1);};
$(document).ready(function(){
	var jsonexample2 = $.getJSON("app.json", function(datos){
		$("#apptitle").html(datos['name']);
		$("#actvrsn").html(datos['version']);
		//alert(datos['school'].turn);
	});
	$(".finde").html('<img src="src/finde.png" />');
	for(i=0;i<=7;i++){
		$("#day"+i).hide();		
	};
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
		if(getAday == 1){
			$("#dayafter").attr("disabled", "disabled"); 
			$("#dayafter").attr("style", "color:transparent;text-shadow:none;"); 
		};
		if(getAday == 5){
			$("#daynext").attr("disabled", "disabled"); 
			$("#daynext").attr("style", "color:transparent;text-shadow:none;"); 
		};
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
			console.log('Ultima version: '+newversion);
			$.getJSON("app.json", function(datos2){
				var actualversion = datos2['version'];
				if(newversion > actualversion){$(".nwvsnupdt").show();}
				console.log('Version de esta app: '+actualversion);
			});
		},
		error: function(){console.log('Error accediendo a la url: '+appremoteurl);}
	});
});
