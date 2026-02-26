//------------------------------------------------ Header ------------------------------------------------//

// Header dropdowns
const dropdownBtn = document.querySelectorAll('.dropdown-btn');

dropdownBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    const dropdown = btn.nextElementSibling;

    document.querySelectorAll('.dropdown-content').forEach(menu => {
      if (menu !== dropdown) {
        menu.classList.add('hidden');
      }
    });

    dropdown.classList.toggle('hidden');
  });
    dropdown.classList.toggle('hidden');
  });
});

// Header Offcanvas
const offcanvasBtn = document.querySelector('.offcanvas-btn');

offcanvasBtn.addEventListener('click', () => {
  const dropdownContent = offcanvasBtn.nextElementSibling;
  dropdownContent.classList.remove('hidden');
})

const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', () => {
  const offcanvasContent = document.querySelector('.offcanvas-content');
  offcanvasContent.classList.add('hidden');
})


// search input

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keydown', (event) => {

  if (event.key === 'Enter') {

    const searchTerm = searchInput.value.trim();

    window.location.href =
      `product.html?search=${encodeURIComponent(searchTerm)}`;

  }

});

// ------------------------------------------------ Hero Carousel ------------------------------------------------ //

const slider = document.getElementById('slider');
const slides = slider.children;

const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const pauseBtn = document.getElementById('pause');

let index = 0;
let totalSlides = slides.length;
let autoSlide;
let isPaused = false;

function slide(i) {
  slider.style.transform = `translateX(-${i * 100}%)`;
  slider.style.transform = `translateX(-${i * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  index++;
  if (index >= totalSlides) {
    index = 0;
  }
  slide(index);
})

prevBtn.addEventListener('click', () => {
  index--;
  if (index < 0) {
    index = totalSlides - 1;
  }
  slide(index);
})

function startAutoSlide() {
  autoSlide = setInterval(() => {
    index++;
    if (index >= totalSlides) {
      index = 0;
    }
    slide(index);
  }, 7000)
}
startAutoSlide();

pauseBtn.addEventListener("click", () => {
  if (!isPaused) {
    clearInterval(autoSlide);
    pauseBtn.innerHTML = '<i class="bi bi-play"></i>';
    isPaused = true;
  } else {
    startAutoSlide();
    pauseBtn.innerHTML = '<i class="bi bi-pause"></i>';
    isPaused = false;
  }
});

// --------------------------------------Produits--------------------------------------//

const HOME_API_URL = 'https://699cc75983e60a406a446756.mockapi.io/produits';

import { ajouterAuPanier, fetchLocal } from './cartLogique.js';

let produitsDisponibles = [];

const getProduits = async () => {
  try {
    const response = await fetch(HOME_API_URL);
    const produits = await response.json();
    produitsDisponibles = produits.reverse();

    const homeContainer = document.getElementById('homeProduits');
    if (!homeContainer) return;

    let pros = '';
    produitsDisponibles.forEach((produit) => {
      pros += `
        <div class="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden p-2">
          <div class="relative bg-primary-purple rounded-2xl mb-4 p-4 flex justify-center items-center h-56">
            <i class="bi bi-heart text-2xl text-gray-400 absolute top-4 right-4 cursor-pointer"></i>
            <div class="w-full h-full flex items-center justify-center">
              <img src="${produit.urlImage}" alt="${produit.nomProduit}" class="max-h-55 w-60 object-contain" />
            </div>
          </div>

          <div class="px-2">
            <div class="flex justify-between items-center mb-3">
              <h1 class="text-xl font-medium text-text-color">${produit.nomProduit}</h1>
              <div class="flex items-center text-yellow-500">
                <i class="bi bi-star-fill text-lg"></i>
                <span class="ml-1 text-sm font-semibold text-text-color">4.7</span>
              </div>
            </div>

            <p class="text-xl font-bold text-gray-500 mb-5">${produit.prix} FCFA</p>

            <button idPro="${produit.id}" 
              class="btnPro w-full cursor-pointer bg-[#8E5F44] text-white font-semibold py-3 px-3 rounded-xl flex items-center justify-center shadow-md hover:bg-amber-700 transition duration-150"
            >
              <i class="bi bi-cart3 text-xl mr-3"></i>
              Ajouter au Panier
            </button>
          </div>
        </div>
      `;
    });

    homeContainer.innerHTML = pros;

    // bo afficher produit ba paré si guay deff li, sur la meme fonction
    const boutons = document.querySelectorAll('.btnPro');
    boutons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('idPro');
        const produitChoisi = produitsDisponibles.find((p) => p.id === id);
        ajouterAuPanier(produitChoisi);
        nombreSurPanier();
      });
    });
  } catch (error) {
    console.error('Erreur chargement produits :', error);
  }
};

// bi mome pour ajouter le nombre de produits sur le panier apres mome guay deff si kaw icone panier bi si headers bi
const nombreSurPanier = () => {
  const data = fetchLocal('commandes');
  const totalPan = document.getElementById('totalPan');
  if (totalPan) {
    totalPan.textContent = data.length;
  }
};

document.getElementById('accountBtn').addEventListener('click', (e) => {
  e.preventDefault();
  const session = localStorage.getItem('vendeurConnecte');
  if (session) {
    window.open('./admin.html', '_blank');
  } else {
    window.location.href = 'profile.html'
  }
})


getProduits();
nombreSurPanier();
