function getAllMusic() {
	fetch("http://veru.dk/husetkbhapp/wp-json/wp/v2/music?_embed").then(res => res.json()).then(showMusic);


}

function getMusicByTag(id) {

	fetch("http://veru.dk/husetkbhapp/wp-json/wp/v2/music?_embed&tags="+id).then(res=>res.json()).then(showMusic);
}



function getSingleMusicById(myId) {
	//console.log(myId);
	fetch("http://veru.dk/husetkbhapp/wp-json/wp/v2/music/" + myId + "/?_embed").then(res => res.json()).then(showSingleMusic);
}

function getMenu (){
	fetch("http://veru.dk/husetkbhapp/wp-json/wp/v2/tags")
	.then(e=>e.json())
	.then(showMenu)
}

function showMenu(tags){
	//console.log(tags);
	let lt = document.querySelector("#linkTemplate").content;
	tags.forEach(function(tag){

    let clone = lt.cloneNode(true);
	let parent = document.querySelector("#tagMenu");
		clone.querySelector("a").textContent=tag.name;
		clone.querySelector("a").setAttribute("href", "index.html?tagid="+tag.id);
	parent.appendChild(clone);
	});
}
//http://veru.dk/husetkbhapp/wp-json/wp/v2/music?tags=tagid


function showSingleMusic(data) {
	console.log(data);
	document.querySelector("#single h1").textContent = data.title.rendered;
	document.querySelector("#single .price span").textContent = data.acf.price;
	document.querySelector("#single .venue").textContent = data.acf.venue;
	document.querySelector("#single .time").textContent = data.acf.time;
	document.querySelector("#single .date").textContent = data.acf.date;
	document.querySelector("#single .content").innerHTML = data.content.rendered;
	document.querySelector("#single img").setAttribute("src", data._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url);
}


function showMusic(json) {
	json.forEach(function (music) {
		//console.log(music);

		let list = document.querySelector("#list");
		let template = document.querySelector("#musicTemplate").content;


		let clone = template.cloneNode(true);
		let title = clone.querySelector("h1");
		/*let venue = clone.querySelector(".venue");
		let price = clone.querySelector(".price span");
		let time = clone.querySelector(".time");
		let date = clone.querySelector(".date")*/
		let img = clone.querySelector("img");
		let excerpt = clone.querySelector(".excerpt")
		let link = clone.querySelector("a.read-more ");

		title.textContent = music.title.rendered;
		/*venue.textContent = music.acf.venue;
		price.textContent = music.acf.price;
		time.textContent = music.acf.time;
		date.textContent = music.acf.date;*/
		excerpt.innerHTML = music.excerpt.rendered;
		console.log(music._embedded["wp:featuredmedia"][0].media_details.sizes);
		img.setAttribute("src", music._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url);
		link.setAttribute("href", "music.html?id=" + music.id);

		list.appendChild(clone);
	});
}


let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
 let tagid = searchParams.get("tagid");
//console.log(id)


getMenu();

if (id) {
	getSingleMusicById(id);}
if(tagid){
getMusicByTag(tagid);

} else {
	getAllMusic();
}







