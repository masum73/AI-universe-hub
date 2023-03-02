console.log('JS loaded');

const loadData = async () => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
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
        console.log(singleTool);

        const {image,name,features,published_in} = singleTool;
        
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
                        <p class="card-text">${published_in}</p>
                    </div>
                    <div>
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        `
        cardContainer.appendChild(cardDiv);
    });
}

const loadFullData = async () => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    try{
        const res = await fetch(URL);
        const data = await res.json();
        displayData(data.data.tools);
    }catch(error){
        console.log(error);
    }
}
