console.log('JS loaded');

const loadData = async () => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    toggleSpinner(true);
    try{
        const res = await fetch(URL);
        const data = await res.json();
        displayData(data.data.tools.slice(0,6));
    }catch(error){
        console.log(error);
    }
}

const displayData = (data) => {
    //console.log(data);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    data.forEach(singleTool => {
        //console.log(singleTool.id);

        const {image,name,features,published_in, id} = singleTool;
        
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'my-3');
        cardDiv.style.width = '24rem';
        

        cardDiv.innerHTML = `
            <img src="${image}" class="card-img-top bg-cover mt-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Features</p>
                <p class="card-text">1. ${features[0]}</p>
                <p class="card-text">2. ${features[1]}</p>
                <p class="card-text">3. ${features[2]}</p>
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

const loadModal = async (id) => {
    console.log(id);

    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    try{
        const res = await fetch(URL);
        const data = await res.json();
        displayModalData(data.data);
    }catch(error){
        console.log(error);
    }

}

const displayModalData = (data) => {
    console.log(data.accuracy);
    const modalContainer = document.getElementById('modal-container');
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal-content');
    modalContainer.innerHTML = '';
    modalDiv.innerHTML = `
        <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body card-body d-flex my-3 gap-3 rounded">
            <div class="bg-danger-subtle border border-1 border-dark-subtle p-3 rounded">
                <p class"text-center">${data.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="bg-light-subtle p-2 rounded">
                        <p class="p-0 m-0">${data.pricing[0].price}</p>
                        <p class="p-0 m-0">${data.pricing[0].plan}</p>
                    </div>
                    <div class="bg-light-subtle p-2 rounded">
                        <p class="p-0 m-0">${data.pricing[1].price}</p>
                        <p class="p-0 m-0">${data.pricing[1].plan}</p>
                    </div>
                    <div class="bg-light-subtle p-2 rounded">
                        <p class="p-0 m-0">${data.pricing[2].price}</p>
                        <p class="p-0 m-0">${data.pricing[2].plan}</p>
                    </div>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                    <div class="text-left mt-3">
                        <p class="p-0 m-0">Features</p>
                        <p class="p-0 m-0">. ${data.features['1'].feature_name}</p>
                        <p class="p-0 m-0">. ${data.features['2'].feature_name}</p>
                        <p class="p-0 m-0">. ${data.features['3'].feature_name}</p>      
                    </div>
                    <div class="text-left mt-3">
                        <p class="p-0 m-0">Integrations</p>
                        <p class="p-0 m-0">. ${data.integrations[0]}</p>
                        <p class="p-0 m-0">. ${data.integrations[1]}</p>
                        <p class="p-0 m-0">. ${data.integrations[2]}</p>
                    </div>
                </div>

            </div>
            <div class="border text-center border-1 border-dark-subtle p-3 rounded position-relative">
                <p class="bg-danger p-0 m-3 rounded position-absolute top-20 end-0" style="width: 20%;">${accuracyPercentage(data.accuracy.score)}</p>
                <img src="${data.image_link[0]}" class="card-img-top bg-cover rounded" alt="...">
                <p>${data.input_output_examples[0].input}</p>
                <p>${data.input_output_examples[0].output}</p>
            </div>
        </div>
    `;
    modalContainer.appendChild(modalDiv);
}

const accuracyPercentage = (score) => {
    const scorePercentage = score * 100;
    return scorePercentage + '% accuracy';
}
const loadFullData = async () => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    //toggleSpinner(true);
    try{
        const res = await fetch(URL);
        const data = await res.json();
        displayData(data.data.tools);
    }catch(error){
        console.log(error);
    }
}

//loader 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}