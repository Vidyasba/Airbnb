
//to store lat and long
const locations=[];

window.addEventListener("DOMContentLoaded", (event) => {
  // Retrieve data from localStorage
  const storedData = localStorage.getItem("result");
  const mydata =localStorage.getItem("mydata");

  if (storedData) {
    const data = JSON.parse(storedData);
    const extradata=JSON.parse(mydata);

    console.log("Data from localStorage:", data);
    console.log('Extra data like location,chckinoutdate',extradata);

    const mid1= document.getElementById("mid1");
    const checkinInput=document.getElementById("checkinInput");
    const checkoutInput=document.getElementById("checkoutInput");
    const guestInput=document.getElementById("guestInput");
    mid1.textContent=`${extradata.long}`;
    mid2.textContent=`${extradata.checkinInput} -- ${extradata.checkoutInput}`;
    mid3.textContent=`${extradata.guestInput}`;



   
    listings = data.results;

    // console.log("lists", listings);
    const listingsContainer = document.getElementById("listings-container");

      // to locate all points on single map
  // Construct the OpenStreetMap URL with All Locations
const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${getBoundingBox(locations)}&marker=${locations.map(loc => `${loc.lon},${loc.lat}`).join(';')}&layer=mapnik`;

// Set the src attribute of your <iframe> to the constructed OpenStreetMap URL
const mapIframe = document.getElementById("mapIframe");
mapIframe.src = mapUrl;

// Function to calculate the bounding box of all locations
function getBoundingBox(locations) {
  const lats = locations.map(loc => loc.lat);
  const lons = locations.map(loc => loc.lon);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  return `${minLon},${minLat},${maxLon},${maxLat}`;
}
//In this code, the locations array is populated inside the loop, and after gathering all the latitude and longitude values, the OpenStreetMap URL is constructed and set as the src attribute of your <iframe> with the ID mapIframe. This way

















    listings.forEach((listing) => {
      const numberOfGuests = listing.persons;
      const numberOfBeds = listing.beds;
      const name = listing.name;
      const numberofbathroom=listing.bathrooms;
      const reviews=listing.reviewsCount;
      const  ratingcount=listing.rating;
      const roomtype=listing.type;
      const longitude=listing.lng;
      const latitude =listing.lat;
      console.log(longitude, latitude);

      //pushing lat and long to my array
      locations.push({ lat: latitude, lon: longitude });

      // Create a new card element
      const card = document.createElement("div");
      card.classList.add("card"); // You can define a CSS class for styling your cards

      const imagecard = document.createElement("div");
      imagecard.classList.add("imagecard");

      listing.images.forEach((image, index) => {
        // Check if it's the first image in the array
        if (index === 0) {
          const firstImage = image;
          // console.log(firstImage);

          // Create an image element and set its source
          const img = document.createElement("img");
          img.id = "custom-img-id";
          img.src = firstImage;
          imagecard.appendChild(img);
        }
      });

      const datacard = document.createElement("div");
      datacard.classList.add("datacard");

      //type of room
      const hoteltype=document.createElement("p");
      hoteltype.id="hoteltype";
      hoteltype.textContent=`${roomtype}`;
      datacard.appendChild(hoteltype);

      // Create heading for name
      const hotelname=document.createElement("h2");
      hotelname.textContent=`${name}`;
      datacard.appendChild(hotelname);




      card.appendChild(imagecard);
      // Create paragraphs for number of guests and number of beds
      const guestsPara = document.createElement("p");
      guestsPara.id="guest";
      guestsPara.textContent = `${numberOfGuests} guests,`;
      datacard.appendChild(guestsPara);
      // Create paragraphs for number of guests and number of beds
      const bedsPara = document.createElement("p");
      bedsPara.id="bed";
      bedsPara.textContent = `${numberOfBeds} bed, `;
      datacard.appendChild(bedsPara);

      //create span for bathroom
      const bath=document.createElement('span');
      bath.id="bath";
      bath.textContent=`${numberofbathroom} bath`;
      bedsPara.appendChild(bath);
      // console.log(bath);

      
    

      // Append the card to the listings container
      card.appendChild(datacard);
      listing.previewAmenities.forEach((extradata) => {
        // Check if it's the first image in the array
            // console.log(extradata);
          const spantag = document.createElement("span");
          spantag.id = "spanWifi";
          spantag.textContent=`${extradata}.`;
          datacard.appendChild(spantag);
      });


      //appending the reviewcount and rating
      const footer=document.createElement('div');
      const reviewcount =document.createElement('span');
      const rating = document.createElement('span');

      footer.id="datacardfooter";
      rating.textContent=` ${ratingcount}  `;
      reviewcount.textContent=`, ( ${reviews}) Views`;

      //star

      const ratingdiv=document.createElement('span');
      const ratingimage=document.createElement('img');
      ratingimage.id="ratingimg";
      ratingimage.src='images/star.png';
      ratingdiv.appendChild(ratingimage);
     

      footer.appendChild(rating);
      rating.appendChild(ratingdiv);
      footer.appendChild(reviewcount);
      datacard.appendChild(footer);


      //fetching latitude and logitude values for each data passed
      
    
  
    console.log("ow",longitude,latitude);
    // Construct the Google Maps URL with latitude and longitude values
    var mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  
    // Get the <iframe> element and set the src attribute
    var mapIframe = document.getElementById("mapIframe");
    mapIframe.src = mapUrl;
 


      listingsContainer.appendChild(card);


    });
  } else {
    // Handle the case when there is no data in localStorage
    console.log("No data found in localStorage");
  }






});
