let form = document.getElementById("form");
let inputValue = document.getElementById("country-input");
let submitBtn = document.getElementById("submit-search");
let randomBtn = document.getElementById("random-btn");
let resultsList = document.getElementById("results-list");
let output = document.getElementById("output");

const edamamAppID = "605b1768";
const edamamAppKey = "d2159e6469acba495c81cdce12ad0bcd";
const dishIntro = document.getElementById('dish-intro');
const dishImgElem = document.getElementById('dish-img');
const ingredientsElem = document.getElementById('ingredients');
const recipeURLelem = document.getElementById('recipe-url');

//fetch recipe and display the label, img, indgredients, and maybe health labels
function displayDish() {
  const cuisineType = countrieMapping[resultCountry] //access the mapped value of the countrieMapping object 
  console.log(cuisineType);

//handle output in case cuisineType is undefined, not do fetch

//
  fetch(`https://api.edamam.com/api/recipes/v2/?type=public&q=a&cuisineType=${cuisineType}&app_id=${edamamAppID}&app_key=${edamamAppKey}`)
  .then((res) =>
  res.json())
  .then((response) => {
    //display recipe
    const recipe = response.hits[0].recipe;
    const mealType = recipe.mealType[0];
    dishIntro.innerText = `Not sure what to have for ${mealType}? Here's a dish from ${resultCountry}: ${recipe.label}!`

    const dishImg = recipe.image;
    dishImgElem.src= dishImg; 

    const ingredients = recipe.ingredientLines;
    console.log(ingredients);
    ingredientsElem.innerText = `Make the best ${recipe.label} using the following ingredients: ${ingredients}`;
    console.log(response);

    //create link
    const a = document.createElement('a');
    const linkText = document.createTextNode('here');
    a.appendChild(linkText);
    a.title = "here";
    a.href = recipe.url;

    //display link
    recipeURLelem.innerText = `Try out this recipe ${a}`
  
  });
}

//randomise the recipe shown

// Show search results before submitting

let timeout = 0;

window.addEventListener("load", searchResults);

function searchResults() {
  inputValue.onkeyup = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        resultsList.innerHTML = "";
        
        clearTimeout(timeout);

        if (inputValue.value.trim().length === 0) {
          return;
        }

        let nameResults = data.flatMap(country => country.name.common);
        
        timeout = setTimeout(() => {
          nameResults.forEach(result => {
            if (result.toLowerCase().includes(inputValue.value.toLowerCase())) {
              let listItem = document.createElement("li");
              listItem.id = "country-list-item";
              listItem.innerText = result;
              listItem.addEventListener("click", function() {
                inputValue.value = result;
                resultsList.innerHTML = "";})
              resultsList.appendChild(listItem);
            }
          });
        }, 200);
      })
      .catch(() => {
        resultsList.innerHTML = "<li>No result found</li>";
      });
  }
  }


// Submit input and show final result

form.addEventListener("submit", getCountry);

let resultCountry;

function getCountry(event) {
  event.preventDefault();

  let formData = new FormData(form);
  let value = formData.get("country");

  fetch(`https://restcountries.com/v3.1/name/${value}`)
      .then((response) => {
        if (!response.ok) {
          const error = new Error(response.status);
          throw error;
        }
        else {
          return response.json();
        }
      })
      .then((data) => {
        resultCountry = data[0].name.common;
        output.innerHTML = `${resultCountry} 
                            <img src=${data[0].flags.png} alt="flag of ${resultCountry}" id="flag">`;
        resultsList.innerHTML = "";   
        displayDish()    
      })
      .catch((error) => {
        resultsList.innerHTML = "<li>No result found</li>";
        output.innerText = "";
        console.log(error)});
  inputValue.value = "";
}

// Generate a random country

randomBtn.addEventListener("click", randomCountry);

function randomCountry() {

  fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (!response.ok) {
          const error = new Error(response.status);
          throw error;
        }
        else {
          return response.json();
        }
      })
      .then((data) => {
        let nameResults = data.flatMap(country => country.name.common);
        let flagResults = data.flatMap(country => country.flags.png);
        let randomIndex = Math.floor(Math.random() * nameResults.length)
        resultCountry = nameResults[randomIndex];
        output.innerHTML = `${resultCountry} 
                            <img src=${flagResults[randomIndex]} alt="flag of ${resultCountry}" id="flag">`;
        displayDish()
        return resultCountry;
        
      })
      .catch((error) => {
        console.log(error)});
}


// ****************
// * Display Dish *
// ****************

//map countries to cuisine types 

const countrieMapping = {
  "Sweden": "Sweden",
  "Albania": "Albania",
  "Vanuatu": "Vanuatu",
  "Mauritius": "Mauritius",
  "United Kingdom": "British",
  "Portugal": "Portugal",
  "Ivory Coast": "Ivory Coast",
  "Georgia": "Georgia",
  "Bhutan": "Bhutan",
  "Namibia": "Namibia",
  "Netherlands": "Netherlands",
  "Uruguay": "Uruguay",
  "Belgium": "Belgium",
  "Guernsey": "Guernsey",
  "United States Virgin Islands": "Caribbean",
  "Uganda": "Uganda",
  "Liechtenstein": "Liechtenstein",
  "Guinea-Bissau": "Guinea-Bissau",
  "South Korea": "Asian",
  "Cuba": "Caribbean",
  "Montenegro": "Montenegro",
  "Norway": "Norway",
  "Saint Vincent and the Grenadines": "Caribbean",
  "Mayotte": "Mayotte",
  "Latvia": "Latvia",
  "Paraguay": "Paraguay",
  "Jersey": "Jersey",
  "Laos": "South East Asian",
  "Qatar": "Qatar",
  "Dominican Republic": "Caribbean",
  "Bouvet Island": "Bouvet Island",
  "Slovakia": "Slovakia",
  "Bosnia and Herzegovina": "Bosnia and Herzegovina",
  "Panama": "Caribbean",
  "Myanmar": "South East Asian",
  "Barbados": "Caribbean",
  "Cambodia": "South East Asian",
  "Antigua and Barbuda": "Caribbeana",
  "Kenya": "Kenya",
  "India": "Indian",
  "São Tomé and Príncipe": "São Tomé and Príncipe",
  "Faroe Islands": "Faroe Islands",
  "Czechia": "Czechia",
  "Montserrat": "Caribbean",
  "South Georgia": "South Georgia",
  "Ukraine": "Ukraine",
  "Djibouti": "Djibouti",
  "Greenland": "Greenland",
  "Tonga": "Tonga",
  "United States": "American",
  "Norfolk Island": "Norfolk Island",
  "Republic of the Congo": "Republic of the Congo",
  "Lebanon": "Lebanon",
  "Uzbekistan": "Uzbekistan",
  "Guam": "Guam",
  "Estonia": "Estonia",
  "Tuvalu": "Tuvalu",
  "Bermuda": "Caribbean",
  "South Sudan": "South Sudan",
  "Costa Rica": "Costa Rica",
  "Finland": "Finland",
  "Gambia": "Gambia",
  "French Polynesia": "French Polynesia",
  "Belize": "Caribbean",
  "Kiribati": "Kiribati",
  "French Guiana": "Caribbean",
  "Andorra": "Andorra",
  "Kosovo": "Kosovo",
  "Mozambique": "Mozambique",
  "Puerto Rico": "Puerto Rico",
  "Australia": "Australia",
  "Azerbaijan": "Azerbaijan",
  "Sudan": "Sudan",
  "Chad": "Chad",
  "Eritrea": "Eritrea",
  "Malaysia": "South East Asian",
  "Kuwait": "Kuwait",
  "Northern Mariana Islands": "Northern Mariana Islands",
  "New Zealand": "New Zealand",
  "Morocco": "Mediterranean",
  "Somalia": "Somalia",
  "Singapore": "Singapore",
  "Timor-Leste": "Timor-Leste",
  "Greece": "Mediterranean",
  "Botswana": "Botswana",
  "Indonesia": "South East Asian",
  "North Macedonia": "North Macedonia",
  "Tanzania": "Tanzania",
  "Eswatini": "Eswatini",
  "Central African Republic": "Central African Republic",
  "Bolivia": "Bolivia",
  "Solomon Islands": "Solomon Islands",
  "Thailand": "South East Asian",
  "Réunion": "Réunion",
  "Croatia": "Croatia",
  "Burundi": "Burundi",
  "United Arab Emirates": "United Arab Emirates",
  "Palau": "Palau",
  "Falkland Islands": "Falkland Islands",
  "Malawi": "Malawi",
  "Bangladesh": "Bangladesh",
  "Canada": "Canada",
  "Jamaica": "Caribbean",
  "Luxembourg": "Luxembourg",
  "Monaco": "Monaco",
  "Tunisia": "Mediterranean",
  "Equatorial Guinea": "Equatorial Guinea",
  "Martinique": "Caribbean",
  "Cape Verde": "Cape Verde",
  "Aruba": "Caribbean",
  "American Samoa": "American Samoa",
  "Nigeria": "Nigeria",
  "Cocos (Keeling) Islands": "Cocos (Keeling) Islands",
  "Spain": "Mediterranean",
  "Iraq": "Iraq",
  "Tokelau": "Tokelau",
  "Zimbabwe": "Zimbabwe",
  "Guinea": "Guinea",
  "Ghana": "Ghana",
  "Wallis and Futuna": "Wallis and Futuna",
  "Kyrgyzstan": "Kyrgyzstan",
  "Macau": "Macau",
  "Bahrain": "Bahrain",
  "Ethiopia": "Ethiopia",
  "Gibraltar": "Gibraltar",
  "Isle of Man": "Isle of Man",
  "Pakistan": "Pakistan",
  "Åland Islands": "Åland Islands",
  "Honduras": "Honduras",
  "Haiti": "Caribbean",
  "Caribbean Netherlands": "Caribbean Netherlands",
  "Nauru": "Nauru",
  "Trinidad and Tobago": "Caribbean",
  "Saint Barthélemy": "Saint Caribbean",
  "DR Congo": "DR Congo",
  "Denmark": "Denmark",
  "Venezuela": "Venezuela",
  "Ireland": "Ireland",
  "Dominica": "Caribbean",
  "Benin": "Benin",
  "British Indian Ocean Territory": "British Indian Ocean Territory",
  "Mauritania": "Mauritania",
  "South Africa": undefined,
  "Saint Pierre and Miquelon": "Saint Pierre and Miquelon",
  "San Marino": "San Marino",
  "Egypt": "Mediterranean",
  "Tajikistan": "Tajikistan",
  "Marshall Islands": "Marshall Islands",
  "Japan": "Japanese",
  "Pitcairn Islands": "Pitcairn Islands",
  "Senegal": "Senegal",
  "Palestine": "Palestine",
  "Gabon": "Gabon",
  "Anguilla": "Caribbean",
  "Mexico": "Mexico",
  "Papua New Guinea": "Papua New Guinea",
  "Serbia": "Serbia",
  "Argentina": "Argentina",
  "Mali": "Mali",
  "Oman": "Oman",
  "Malta": "Malta",
  "Maldives": "Maldives",
  "Austria": "Austria",
  "Western Sahara": "Western Sahara",
  "North Korea": "North Korea",
  "British Virgin Islands": "Caribbean",
  "Burkina Faso": "Burkina Faso",
  "Micronesia": "Micronesia",
  "Lithuania": "Lithuania",
  "Colombia": "Colombia",
  "Rwanda": "Rwanda",
  "Madagascar": "Madagascar",
  "France": "French",
  "Moldova": "Moldova",
  "Nepal": "Nepal",
  "Afghanistan": "Afghanistan",
  "Saudi Arabia": "Saudi Arabia",
  "Ecuador": "Ecuador",
  "Vatican City": "Vatican City",
  "Zambia": "Zambia",
  "Germany": "Germany",
  "Turkey": "Mediterranean",
  "Yemen": "Yemen",
  "Comoros": "Comoros",
  "Curaçao": "Caribbean",
  "Italy": "Italian",
  "Bulgaria": "Bulgaria",
  "Brazil": "Brazil",
  "Turks and Caicos Islands": "Caribbean",
  "Lesotho": "Lesotho",
  "Hungary": "Hungary",
  "Guatemala": "Guatemala",
  "Chile": "Chile",
  "Cyprus": "Cyprus",
  "Heard Island and McDonald Islands": "Heard Island and McDonald Islands",
  "Saint Kitts and Nevis": "Caribbean",
  "Sierra Leone": "Sierra Leone",
  "Brunei": "Brunei",
  "Seychelles": "Seychelles",
  "Saint Helena, Ascension and Tristan da Cunha": "Saint Helena, Ascension and Tristan da Cunha",
  "Israel": "Mediterranean",
  "Peru": "Peru",
  "Romania": "Romania",
  "Svalbard and Jan Mayen": "Svalbard and Jan Mayen",
  "French Southern and Antarctic Lands": "French Southern and Antarctic Lands",
  "China": "Chinese",
  "Mongolia": "Mongolia",
  "Libya": "Mediterranean",
  "Hong Kong": "Hong Kong",
  "Algeria": "Mediterranean",
  "Guyana": "Caribbean",
  "Philippines": "South East Asian",
  "Poland": "Poland",
  "Guadeloupe": "Caribbean",
  "Armenia": "Armenia",
  "Jordan": "Jordan",
  "Niger": "Niger",
  "Slovenia": "Slovenia",
  "Angola": "Angola",
  "Cook Islands": "Cook Islands",
  "Russia": "Russia",
  "Cayman Islands": "Caribbean",
  "Turkmenistan": "Turkmenistan",
  "Antarctica": "Antarctica",
  "Grenada": "Caribbean",
  "El Salvador": "El Salvador",
  "Saint Lucia": "Caribbean",
  "Syria": "Mediterranean",
  "Kazakhstan": "Kazakhstan",
  "Belarus": "Belarus",
  "Sri Lanka": "Asian",
  "Saint Martin": "Caribbean",
  "Liberia": "Liberia",
  "Iceland": "Iceland",
  "New Caledonia": "New Caledonia",
  "Bahamas": "Caribbean",
  "United States Minor Outlying Islands": "United States Minor Outlying Islands",
  "Niue": "Niue",
  "Samoa": "Samoa",
  "Vietnam": "South East Asian",
  "Cameroon": "Cameroon",
  "Fiji": "Fiji",
  "Sint Maarten": "Caribbean",
  "Nicaragua": "Nicaragua",
  "Taiwan": "Taiwan",
  "Iran": "Asian",
  "Suriname": "Suriname",
  "Togo": "Togo",
  "Switzerland": "Switzerland",
  "Christmas Island": "Christmas Island"
};


//display results


      