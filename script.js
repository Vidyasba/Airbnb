window.addEventListener("DOMContentLoaded", (event) => {
  // Your code goes here

  const searchButton = document.getElementById("search-button");

  searchButton.addEventListener("click", () => {
    const locationInput = document.getElementById("location-input").value;
    const checkinInput = document.getElementById("checkin-input").value;
    const checkoutInput = document.getElementById("checkout-input").value;
    const guestInput = document.getElementById("guest-input").value;

    api(locationInput, checkinInput, checkoutInput, guestInput);

    //   window.location.href = `landingPage.html?location=${locationInput}&checkin=${checkinInput}&checkout=${checkoutInput}&guests=${guestInput}`;
  });

  async function api(locationInput, checkinInput, checkoutInput, guestInput) {
    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${locationInput}&checkin=${checkinInput}&checkout=${checkoutInput}&adults=${guestInput}`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8e364e3e3fmshf435153671d68bbp13515djsn5449b1928089",
        "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
      },
    };

    const mydata = {
      location: locationInput,
      checkinInput: checkinInput,
      checkoutInput: checkoutInput,
      guestInput: guestInput,
    };
    console.log('mydata',mydata);
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log('my data', data);
      if (data.error == false) {
        localStorage.setItem("mydata", JSON.stringify(mydata));
       
        localStorage.setItem("result", JSON.stringify(data));

        const redirectURL = `landingPage.html?location=${locationInput}&checkin=${checkinInput}&checkout=${checkoutInput}&guests=${guestInput}`;
        window.location.href = redirectURL;
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }
});
