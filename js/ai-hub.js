const loadData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const allAi = data.data.tools;
  // console.log(allAi)
  displayAi(allAi);
};

const displayAi = (allAi) => {
  const aiContainer = document.getElementById("card-container");

  allAi.forEach((ai) => {
    console.log(ai);
    const aiCard = document.createElement("div");
    aiCard.classList = `card bg-base-100 p-4 space-y-6 gap-4 shadow-xl`;
    aiCard.addEventListener("click", () => {
      showDetails(ai.id);
    });

    aiCard.innerHTML = `
        <figure><img src="${ai?.image || "No Image"}" alt="image" /></figure>
        <div class="list-decimal space-y-3">
            <h3 class="card-title font-semibold">Features</h3>
            
            <li>Natural language processing</li>
            <li>Contextual understanding</li>
            <li>Text generation</li>
            
        </div>
        <hr>
        <div>
            <h2 class="card-title mb-3">${ai.name}</h2>
            <p><i class="fa-solid fa-calendar-days" style="color: #424243;"></i> ${
              ai.published_in
            }</i></p>
        </div>
        </div>
        `;

    aiContainer.appendChild(aiCard);
  });
};

const showDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  const allAi = data.data;
  showDetailsModal(allAi);
};

const showDetailsModal = (allAi) => {
  console.log(allAi)
  const modalContainer = document.getElementById("modal-details-container");
  modalContainer.innerHTML = "";
  const modalCard = document.createElement("div");
  modalCard.classList = `flex p-16 gap-5`;
  modalCard.innerHTML = `
    <div class='bg-red-50 p-7 border rounded-lg border-[#EB5757]'>
    
        <h2 class="">${allAi?.description}</h2>
    <div class='flex justify-between gap-4 items-center'>
        <h2 class="bg-white text-xs text-[#03A30A] font-bold p-3 rounded-lg">${allAi?.pricing[0]?.price !== undefined ? allAi.pricing[0].price : 'null'}</h2>
        <h2 class="bg-white text-xs text-[#F28927] font-bold p-3 rounded-lg">${allAi?.pricing[1]?.price !== undefined ? allAi.pricing[1].price : 'null'}</h2>
        <h2 class="bg-white text-xs text-[#EB5757] font-bold p-3 rounded-lg">${allAi?.pricing[2]?.price !== undefined ? allAi.pricing[2].price : 'null'}</h2>
    </div>
    <div class='flex justify-between gap-4 mt-7'>
        <div>
            <h4 class='text-6 font-semibold'>Features</h4>
            <li>${allAi?.features[1]?.feature_name}</li>
            <li>${allAi?.features[2]?.feature_name}</li>
            <li>${allAi?.features[3]?.feature_name}</li>
        </div>
        <div>
            <h4 class='text-6 font-semibold'>Integrations</h4>
            <li>${allAi?.integrations[0] !== undefined ? allAi.integrations[0] : 'null'}</li>
            <li>${allAi?.integrations[1] !== undefined ? allAi.integrations[1] : 'null'}</li>
            <li>${allAi?.integrations[2] !== undefined ? allAi.integrations[2] : 'null'}</li>
        </div>
    </div>
    
    </div>
    <div class='p-3 space-y-2 text-center rounded-lg border-2 border-[#E7E7E7]'>
      <img class='rounded-lg mb-3' src="${allAi?.image_link[0]}" alt="image"/>
          <p class='text-6 font-semibold'>${allAi?.input_output_examples[0].input}</p>
          <p class='text-base font-normal'>${allAi?.input_output_examples[1].output}</p>
    </div>
    `;
  modalContainer.appendChild(modalCard);

  show_details_modal.showModal();
};





loadData();
