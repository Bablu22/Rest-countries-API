const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const error = document.getElementById('Error')
const detailContainer = document.getElementById('detail');

searchBtn.addEventListener('click', function () {
    const searchValue = searchInput.value;
    searchInput.value = ''
    if (searchValue == '') {
        error.classList.remove('d-none');
        const countryContainer = document.getElementById('country-container');
        countryContainer.textContent = ''

    }
    else {
        error.classList.add('d-none');

    }
    // spinner.classList.add("d-none");
    const url = `https://restcountries.eu/rest/v2/name/${searchValue}`
    spinner.classList.remove("d-none");
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            // Setting a timer of 1.5s, before removing the spinnner, and showing data
            setTimeout(() => {
                spinner.classList.add("d-none");
                showCountry(data);
            }, 1500);
        })

})

const showCountry = (countries) => {
    const countryContainer = document.getElementById('country-container');
    countryContainer.textContent = ''
    if (countries.message == "Not Found") {
        error.classList.remove('d-none');
        error.innerText = 'Country not found'
    }
    else {
        error.classList.add('d-none');
    }
    detailContainer.textContent = ''
    for (country of countries) {
        const div = document.createElement('div');
        div.classList.add('col-md-3')
        div.innerHTML = `
            <!-- Image -->
            <div class="rounded overflow-hidden border p-2">
            <img src="${country.flag}" class="w-100" alt="" />
            </div>
            <!-- Body -->
            <div class=" py-2 d-flex justify-content-between  align-items-center d-md-block text-md-center
                ">
            <h4>${country.name}</h4>
            <button class="btn btn-dark" onclick="showDetail('${country.alpha3Code}')">Learn More</button>
            </div>
        
        `
        countryContainer.appendChild(div);



    }

}

function showDetail(alpha3Code) {

    fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}`)
        .then(res => res.json())
        .then(data => {


            detailContainer.innerHTML = `
   
            <div class="col-md-7">
                <div class="rounded overflow-hidden border p-2">
                <img src="${data.flag}" class="w-100" alt="" />
                </div>
            </div>
             <div class="col-md-5">
                <h1>${data.name}</h1>
                <p>Capital: ${data.capital}</p>
                <p>Population: ${data.population}</p>
                <p>Area: ${data.area}</p>
             <p>Languages: ${country.languages[0].name}</p> 
            </div>
        
       
        `
            window.scrollTo(0, 50);

        })


}

