console.log('JS loaded');

const loadData = async () => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    toggleSpinner(true);
    try {
        const res = await fetch(URL);
        const data = await res.json();
        const fetchData = data.data.tools;
        if (hasSeeMoreClicked === true){
            displayData(fetchData);
        }else{
            displayData(fetchData.slice(0,6));
        }
    } catch (error) {
        console.log(error);
    }
}

const displayData = (data) => {
    console.log(data);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    data.forEach(singleTool => {
        //console.log(singleTool.id);

        const { image, name, features, published_in, id } = singleTool;

        const displayFeaturesList = displayFeatures(features);

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'my-3');
        cardDiv.style.width = '24rem';


        cardDiv.innerHTML = `
            <img src="${image}" class=" mt-3" style=" height: 200px; width: 100%" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Features</p>
                ${displayFeaturesList}
                
                <hr>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <p class="card-text">${name}</p>
                        <p class="card-text"><i class="fa-regular fa-calendar-days"></i> ${published_in}</p>
                    </div>
                    <div>
                        <i onclick="loadModal('${id}')" class="fas fa-arrow-right" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </div>
                </div>
            </div>
        `
        cardContainer.appendChild(cardDiv);
    });
    toggleSpinner(false)
}
const displayFeatures = (features) => {
    let output = '';
    let serial = 1;
    features.forEach(singleElement => {
        output += `<p class="card-text">${serial}. ${singleElement}</p>`;
        serial = serial + 1;
    })
    return output;
}
const loadModal = async (id) => {
    console.log(id);
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    try {
        const res = await fetch(URL);
        const data = await res.json();
        displayModalData(data.data);
    } catch (error) {
        console.log(error);
    }

}

const displayModalData = (data) => {
    console.log(data);
    const modalContainer = document.getElementById('modal-container');
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal-content');
    //modalDiv.style.width = '50%';
    const score = accuracyPercentage(data.accuracy.score);
    const integrations = displayIntegrations(data.integrations || []);
    const features = displayModalFeatures(data.features);
    modalContainer.innerHTML = '';
    modalDiv.innerHTML = `
        <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body card-body d-flex my-3 gap-3 rounded">
            <div class="bg-danger-subtle border border-1 border-dark-subtle p-3 rounded w-50">
                <p class"text-center">${data.description}</p>
                <div class="d-flex flex-column gap-2 flex-sm-row  justify-content-between align-items-center">
                    <div class="bg-light-subtle p-2 rounded">
                        <p class="p-0 m-0">${data.pricing !== null && data.pricing[0].price !== '0' && data.pricing[0].price !== 'No cost' ? data.pricing[0].price : 'Free of cost'}</p>
                        <p class="p-0 m-0">${data.pricing !== null && data.pricing[0].plan ? data.pricing[0].plan : ''}</p>
                    </div>
                    <div class="bg-light-subtle p-2 rounded">
                        <p class="p-0 m-0">${data.pricing !== null && data.pricing[1].price !== '0' && data.pricing[1].price !== 'No cost' ? data.pricing[1].price : 'Free of cost'}</p>
                        <p class="p-0 m-0">${data.pricing !== null && data.pricing[1].plan ? data.pricing[1].plan : ''}</p>
                    </div>
                    <div class="bg-light-subtle p-2 rounded">
                        <p class="p-0 m-0">${data.pricing !== null && data.pricing[2].price !== '0' && data.pricing[2].price !== 'No cost' && data.pricing[2].price !== 'Contact us for pricing' && data.pricing[2].price !== 'Contact us ' ? data.pricing[2].price : 'Free of cost'}</p>
                        <p class="p-0 m-0">${data.pricing !== null && data.pricing[2].plan ? data.pricing[2].plan : ''}</p>
                    </div>
                </div>

                <div class="d-flex justify-content-between flex-column flex-sm-row">
                    <div class="text-left mt-3">
                        <p class="p-0 m-0">Features</p>
                        ${features.length === 0 ? 'No data found' : features}
                        
                    </div>
                    <div class="text-left mt-3">
                        <p class="p-0 m-0">Integrations</p>               
                        ${data.integrations === null || data.integrations.length === 0 ? 'No data found' : integrations}
                    </div>
                </div>

            </div>
            <div class="border text-center border-1 border-dark-subtle p-3 rounded position-relative w-50">
                <p class="${score ? '' : 'd-none'} bg-danger p-1 m-3 rounded position-relative position-sm-absolute top-20 end-0">${score} % accuracy</p>
                <img src="${data.image_link[0]}" class="card-img-top bg-cover rounded" alt="...">
                <p>${data.input_output_examples !== null && data.input_output_examples[0].input ? data.input_output_examples[0].input : 'No not yet'}</p>
                <p style="overflow-wrap: break-word;" >${data.input_output_examples !== null && data.input_output_examples[0].output ? data.input_output_examples[0].output : 'Take a Break'}</p>
            </div>
        </div>
    `;
    modalContainer.appendChild(modalDiv);
}
const displayModalFeatures = (features) => {
    let output = '';
    const featuresObjectKeysArray = Object.keys(features);

    featuresObjectKeysArray.forEach(singleObjectKey => {
        //console.log(singleObjectKey);

        const obj = features[singleObjectKey];
        //console.log(obj);

        output += `<p class="p-0 m-0">. ${obj.feature_name}</p>`
    })
    return output;
}
const displayIntegrations = (integrations) => {
    let output = '';
    integrations.forEach(singleElement => {
        output += `<p class="p-0 m-0">. ${singleElement}</p>`;
    })
    return output;

}
const accuracyPercentage = (score) => {
    console.log(score);
    const scorePercentage = score * 100;
    return scorePercentage;
}
const loadFullData = () => {
    hasSeeMoreClicked = true;
    loadData();
}

//loader 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

let hasSeeMoreClicked = false;

const loadByDate = async () => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    toggleSpinner(true);
    try {
        const res = await fetch(URL);
        const data = await res.json();
        const fetchData = data.data.tools;
        fetchData.sort((a, b) => {
            const dateA = a.published_in.split('/'); 
            const dateB = b.published_in.split('/');
            //console.log({dateA, dateB});
            //console.log(dateB);
            const aDate = new Date(dateA[2], dateA[0], dateA[1]); 
            const bDate = new Date(dateB[2], dateB[0], dateB[1]);
            //console.log({aDate, bDate}); 
            return aDate - bDate;
        })

        if (hasSeeMoreClicked === true){
            displayData(fetchData);
        }else{
            displayData(fetchData.slice(0,6));
        }
    } catch (error) {
        console.log(error);
    }
}
