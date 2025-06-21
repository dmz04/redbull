const questionContainer = document.getElementById('question-container');
const resultDiv = document.getElementById('result');

const steps = [
  {
    question: "What is your goal?",
    options: [
      { id: 'performer', text: "To perform" },
      { id: 'chiller', text: "To chill" },
      { id: 'party', text: "To party" },
    ],
  },
  {
    question: "What type of energy do you prefer?",
    options: {
      performer: [
        { id: 'boost_mental', text: "Mental boost" },
        { id: 'boost_physique', text: "Physical boost" },
        { id: 'endurance', text: "Long endurance" },
      ],
      chiller: [
        { id: 'sans_sucre', text: "Sugarfree" },
        { id: 'gout_fruite', text: "Fruity taste" },
        { id: 'fraicheur', text: "Maximum freshness" },
      ],
      party: [
        { id: 'gout_intense', text: "Intense taste" },
        { id: 'cocktail', text: "For cocktails" },
        { id: 'a_plusieurs', text: "For sharing" },
      ],
    },
  },
  {
    question: "Where will you drink it?",
    options: [
      { id: 'desk', text: "At your desk" },
      { id: 'outdoors', text: "Outdoors" },
      { id: 'home', text: "At home" },
      { id: 'party_place', text: "At a party" },
    ],
  },
];

let currentStep = 0;
const answers = {};

function renderStep(stepIndex) {
  resultDiv.innerHTML = '';
  questionContainer.innerHTML = '';
  const step = steps[stepIndex];

  let optionsToShow = step.options;
  if (stepIndex === 1) {
    // Filter options based on step 1 answer
    optionsToShow = step.options[answers['step1']] || [];
  }

  let html = `<div class="step active"><h2>${step.question}</h2><div class="options">`;

  optionsToShow.forEach(opt => {
    html += `<div tabindex="0" class="option" data-id="${opt.id}">${opt.text}</div>`;
  });

  html += '</div></div>';

  questionContainer.innerHTML = html;

  // Add event listeners for options
  document.querySelectorAll('.option').forEach(el => {
    el.addEventListener('click', () => {
      selectOption(stepIndex, el.dataset.id);
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectOption(stepIndex, el.dataset.id);
      }
    });
  });
}

function selectOption(stepIndex, optionId) {
  answers[`step${stepIndex + 1}`] = optionId;
  currentStep++;
  if (currentStep < steps.length) {
    renderStep(currentStep);
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.innerHTML = '';

  const s1 = answers['step1'];
  const s2 = answers['step2'];
  const s3 = answers['step3'];

  let products = [];

  if (s1 === 'performer') {
    if (s2 === 'boost_mental') {
      products = [
        { name: 'Red Bull Classic', description: 'Original taste for maximum focus.', url: 'https://www.redbull.com' },
        { name: 'Red Bull Sugarfree', description: 'Energy without sugar for mental clarity.', url: 'https://www.redbull.com' },
      ];
    } else if (s2 === 'boost_physique') {
      products = [
        { name: 'Red Bull Sugarfree', description: 'Energy without sugar for physical effort.', url: 'https://www.redbull.com' },
        { name: 'Red Bull Total Zero', description: 'Zero calories, zero sugar, full energy.', url: 'https://www.redbull.com' },
      ];
    } else if (s2 === 'endurance') {
      products = [
        { name: 'Red Bull Tropical Edition', description: 'Exotic flavor for long endurance.', url: 'https://www.redbull.com' },
        { name: 'Red Bull Yellow Edition', description: 'Citrus flavor for sustained energy.', url: 'https://www.redbull.com' },
      ];
    }
  } else if (s1 === 'chiller') {
    if (s2 === 'sans_sucre') {
      products = [
        { name: 'Red Bull Sugarfree', description: 'Light and sugar-free.', url: 'https://www.redbull.com' },
        { name: 'Red Bull Total Zero', description: 'No sugar, no calories.', url: 'https://www.redbull.com' },
      ];
    } else if (s2 === 'gout_fruite') {
      products = [
        { name: 'Red Bull Tropical Edition', description: 'Fruity and refreshing.', url: 'https://www.redbull.com' },
        { name: 'Red Bull Watermelon Edition', description: 'Sweet watermelon flavor.', url: 'https://www.redbull.com' },
      ];
    } else if (s2 === 'fraicheur') {
      products = [
        { name: 'Red Bull Yellow Edition', description: 'Fresh and unique taste.', url: 'https://www.redbull.com' },
        { name: 'Red Bull Blue Edition', description: 'Blueberry flavor for freshness.', url: 'https://www.redbull.com' },
      ];
    }
  } else if (s1 === 'party') {
    if (s2 === 'gout_intense') {
      products = [
        { name: 'Red Bull Intense Edition', description: 'Powerful taste for lively parties.', url: 'https://www.redbull.com' },
        { name: 'Red Bull Red Edition', description: 'Strong cranberry flavor.', url: 'https://www.redbull.com' },
      ];
    } else if (s2 === 'cocktail') {
      products = [
        { name: 'Red Bull Classic', description: 'Ideal for mixing cocktails.', url: 'https://www.redbull.com' },
        { name: 'Red Bull Sugarfree', description: 'Mix cocktails without sugar.', url: 'https://www.redbull.com' },
      ];
    } else if (s2 === 'a_plusieurs') {
      products = [
        { name: 'Red Bull Tropical Edition', description: 'Perfect to share with friends.', url: 'https://www.redbull.com' },
        { name: 'Red Bull Orange Edition', description: 'Great for group parties.', url: 'https://www.redbull.com' },
      ];
    }
  }

  const places = {
    desk: 'enjoying at your desk',
    outdoors: 'enjoying outdoors',
    home: 'relaxing at home',
    party_place: 'having fun at a party',
  };

  const idealFor = `Ideal for: ${places[s3] || ''}.`;

  let productsHTML = '<ul class="product-list">';
  products.forEach(p => {
    productsHTML += `
      <li>
        <strong>${p.name}</strong><br />
        <span>${p.description}</span><br />
        <a href="${p.url}" target="_blank" rel="noopener noreferrer">Official site</a>
      </li>`;
  });
  productsHTML += '</ul>';

  const storesHTML = `
    <div id="local-stores">
      <div class="store-card">
        <h3>🛒 Amazon</h3>
        <a href="https://www.amazon.com/s?k=red+bull" target="_blank" rel="noopener noreferrer">Amazon USA</a>
        <a href="https://www.amazon.co.uk/s?k=red+bull" target="_blank" rel="noopener noreferrer">Amazon UK</a>
        <a href="https://www.amazon.de/s?k=red+bull" target="_blank" rel="noopener noreferrer">Amazon Germany</a>
        <a href="https://www.amazon.fr/s?k=red+bull" target="_blank" rel="noopener noreferrer">Amazon France</a>
      </div>
      <div class="store-card">
        <h3>🇪🇺 Europe</h3>
        <a href="https://www.carrefour.fr/search?q=red+bull" target="_blank" rel="noopener noreferrer">Carrefour</a>
        <a href="https://www.auchan.fr/recherche?q=red+bull" target="_blank" rel="noopener noreferrer">Auchan</a>
        <a href="https://www.lidl.fr/recherche?q=red+bull" target="_blank" rel="noopener noreferrer">Lidl</a>
      </div>
      <div class="store-card">
        <h3>🇫🇷 France</h3>
        <a href="https://www.monoprix.fr/search?q=red+bull" target="_blank" rel="noopener noreferrer">Monoprix</a>
        <a href="https://www.intermarche.com/recherche?q=red+bull" target="_blank" rel="noopener noreferrer">Intermarché</a>
        <a href="https://www.carrefour.fr/search?q=red+bull" target="_blank" rel="noopener noreferrer">Carrefour</a>
      </div>
    </div>
  `;

  resultDiv.innerHTML = `
    <p>🎯 <strong>Recommended Red Bulls:</strong></p>
    ${productsHTML}
    <p>${idealFor}</p>
    ${storesHTML}
    <p class="official-link">
      Visit the <a href="https://www.redbull.com" target="_blank" rel="noopener noreferrer">official Red Bull website</a> for more information.
    </p>
  `;
}

// Initial render
renderStep(currentStep);
