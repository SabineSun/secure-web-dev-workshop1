// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json');
console.log('🚀 It Works!');

/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */

// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations
function getFilmingLocationsNumber () {
	return filmingLocations.length;
}
console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris.`)



// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in array
function sortFilmingLocationsByStartDate() {
	let sortedFilm = filmingLocations;
	sortedFilm.sort(function(a,b){
		return new Date(a.fields.date_debut) - new Date(b.fields.date_debut);
	}).reverse();
	return sortedFilm;
}
const sortedArray = sortFilmingLocationsByStartDate()
console.log(`The date of the most recent film is ${sortedArray[0].fields.date_debut} and the oldest is ${sortedArray[sortedArray.length-1].fields.date_debut}.`);



// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result
function getFilmingLocationsNumber2020 () {
	let count =0;
	for (const film of filmingLocations){
		if (film.fields.annee_tournage=="2020"){
			count++;
		}
	}
	return count++;
}
console.log('There is ' + getFilmingLocationsNumber2020() + ' of filming locations in 2020')

// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerYear () {
	const filmPerYear = {}
	for (let film of filmingLocations){
		filmPerYear[film.fields.annee_tournage] = filmPerYear[film.fields.annee_tournage] + 1 || 1
	}
	return filmPerYear;
}
console.log("Number of filming locations per year :");
console.log(getFilmingLocationsNumberPerYear());


// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerDistrict () {
	const filmPerDistrict ={}
	for (const film of filmingLocations){
		filmPerDistrict[film.fields.ardt_lieu] = filmPerDistrict[film.fields.ardt_lieu] + 1||1;
	}
	return filmPerDistrict;
}
console.log("Number of filming locations by district :");
console.log(getFilmingLocationsNumberPerDistrict());


// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array
function getFilmLocationsByFilm() {
	let result = [];
	let count =1;
	for (const film of filmingLocations){
		let name = film.fields.nom_tournage;
		if (result.find(element => element.film === name)) {
			const index = result.findIndex(element => element.film === name)
			result[index].locations++;
		}else {
			result.push({film: name, locations: count});
		}
	}
	result.sort((a, b) => (a.locations> b.locations) ? 1 : -1).reverse();
	return result;
}
console.log("Number of locations per film, sorted in descending order :");
console.log(getFilmLocationsByFilm());


// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {
	const diffFilm =[];
	for (let film of filmingLocations){
		if(!diffFilm.includes(film.fields.nom_tournage)){
			diffFilm.push(film.fields.nom_tournage);
		}
	}
	return diffFilm.length
}
console.log('There is ' + getNumberOfFilms() + ' of different films.');



// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations () {
	let array =[];
	for (let i=0; i<filmingLocations.length; i++){
		if (filmingLocations[i].fields.nom_tournage == 'LRDM - Patriot season 2'){
			array.push(filmingLocations[i].fields.adresse_lieu);
		}
	}
	return array;
}
console.log('All the filming locations of `LRDM - Patriot season 2`');
console.log(getArseneFilmingLocations());


// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result
function getFavoriteFilmsLocations (favoriteFilms) {
	const array ={};
	for (const film of favoriteFilms){
		array[film]=[];
	}
	for(const film of filmingLocations){
		if(film.fields.nom_tournage in array){
			if(!array[film.fields.nom_tournage].includes(film.fields.ardt_lieu)) {
				array[film.fields.nom_tournage].push(film.fields.ardt_lieu);
			}
		}
	}
	return array;

}
const favoriteFilms = [
	'LRDM - Patriot season 2',
	'Alice NEVERS',
	'Emily in Paris',
]
console.log(getFavoriteFilmsLocations(favoriteFilms));


// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm () {
	const obj = {};
	for (let i=0; i<filmingLocations.length; i++){
		if (filmingLocations[i].fields.nom_tournage in obj){
			obj[filmingLocations[i].fields.nom_tournage].push(filmingLocations[i].fields.adresse_lieu)
		} else{
			obj[filmingLocations[i].fields.nom_tournage]=new Array();
			obj[filmingLocations[i].fields.nom_tournage].push(filmingLocations[i].fields.adresse_lieu)
		}
	}
	return obj;
}
console.log(getFilmingLocationsPerFilm());



// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes () {
	const obj={};
	for (let i=0; i<filmingLocations.length; i++){
		obj[filmingLocations[i].fields.type_tournage]= obj[filmingLocations[i].fields.type_tournage] +1 || 1;
	}
	return obj;
}
console.log(countFilmingTypes());



// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes () {
	const obj = countFilmingTypes();
	const sortedArray = [];
	for(let element in obj){
		sortedArray.push({element, count: obj[element]});
	}
	sortedArray.sort((a,b) => {
		return a.count - b.count;
	})
	return sortedArray.reverse();
}
console.log(sortedCountFilmingTypes());

/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms / (1000 * 60 * 60 * 24)).toFixed(0)} days, ${((ms / (1000 * 60 * 60)) % 24).toFixed(0)} hours and ${((ms / (1000 * 60)) % 60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration
function getLongestFilmingLocation(){
	let _duration = [];
	let _index = 0;
	filmingLocations.forEach(location => {
		const _endDate = new Date(location.fields.date_fin);
		const _startDate = new Date(location.fields.date_debut);
		_duration.push({
			id:_index,
			duration:_endDate - _startDate,
		})
		_index++;
	});
	let _longest = Math.max(..._duration.map(obj => {
		return obj.duration;
	}));
	let _res = _duration.find(obj => obj.duration === _longest);
	return {id:_res.id,duration:duration(_res.duration)};
}

console.log(getLongestFilmingLocation());

function getAverageFilmingDuration(){
	let _total = 0;
	filmingLocations.forEach(element => {
		const _end = new Date(element.fields.date_fin);
		const _begin = new Date(element.fields.date_debut);
		_total+= _end - _begin;
	})

	return duration(_total/filmingLocations.length);
}
console.log(`Average filming duration : ${getAverageFilmingDuration()}`)