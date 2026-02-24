const API_URL = 'https://699cc75983e60a406a446756.mockapi.io/produits';

import { ajouterAuPanier, fetchLocal } from './cartLogique.js';

let produitsDisponibles = [];

const getProduits = async () => {
  try {
    const response = await fetch(API_URL);
    const produits = await response.json();
    produitsDisponibles = produits.reverse();

    const lesProduits = document.getElementById('lesProduits');
    if (!lesProduits) return;

    let pros = '';
    produitsDisponibles.forEach((produit) => {
      pros += `
        <div class="w-75 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden p-2">
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

    lesProduits.innerHTML = pros;

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

getProduits();
nombreSurPanier();
