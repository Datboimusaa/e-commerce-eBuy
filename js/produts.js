const API_URL = 'https://699cc75983e60a406a446756.mockapi.io/produits';

const staticProducts = [

/* MODE HOMME */

{
id: "sh1",
nomProduit: "T-shirt Noir Homme",
prix: 8000,
urlImage: "https://i.imgur.com/8Km9tLL.jpg",
category: "mode-homme",
subcategory: "tshirt",
tags: ["ramadan"]
},

{
id: "sh2",
nomProduit: "T-shirt Blanc Homme",
prix: 7500,
urlImage: "https://i.imgur.com/9XqQZ3D.jpg",
category: "mode-homme",
subcategory: "tshirt",
tags: ["valentin"]
},

{
id: "jh1",
nomProduit: "Jean Slim Homme",
prix: 15000,
urlImage: "https://i.imgur.com/FYb9QkR.jpg",
category: "mode-homme",
subcategory: "jeans",
tags: []
},

{
id: "jh2",
nomProduit: "Jean Bleu Homme",
prix: 16000,
urlImage: "https://i.imgur.com/xDBo7nM.jpg",
category: "mode-homme",
subcategory: "jeans",
tags: ["ramadan"]
},


/* MODE FEMME */

{
id: "sf1",
nomProduit: "Robe Fleurie",
prix: 18000,
urlImage: "https://i.imgur.com/ZANVnHE.jpg",
category: "mode-femme",
subcategory: "robes",
tags: ["valentin"]
},

{
id: "sf2",
nomProduit: "Robe Rouge",
prix: 20000,
urlImage: "https://i.imgur.com/v6KQF4p.jpg",
category: "mode-femme",
subcategory: "robes",
tags: []
},

{
id: "tsf1",
nomProduit: "T-shirt Femme Rose",
prix: 7000,
urlImage: "https://i.imgur.com/MY6Z9Yd.jpg",
category: "mode-femme",
subcategory: "tshirt",
tags: ["valentin"]
},

{
id: "tsf2",
nomProduit: "T-shirt Femme Blanc",
prix: 6500,
urlImage: "https://i.imgur.com/TaF7JkM.jpg",
category: "mode-femme",
subcategory: "tshirt",
tags: []
},


/* ELECTRONIQUES */

{
id: "e1",
nomProduit: "Casque Bluetooth",
prix: 25000,
urlImage: "https://i.imgur.com/3tVgsra.jpg",
category: "electroniques",
subcategory: "audio",
tags: []
},

{
id: "e2",
nomProduit: "Ecouteurs Sans Fil",
prix: 15000,
urlImage: "https://i.imgur.com/Ig9o4kU.jpg",
category: "electroniques",
subcategory: "audio",
tags: ["ramadan"]
},

{
id: "e3",
nomProduit: "Smartphone Android",
prix: 120000,
urlImage: "https://i.imgur.com/Ba8Yz6D.jpg",
category: "electroniques",
subcategory: "phones",
tags: []
},

{
id: "e4",
nomProduit: "Montre Connectée",
prix: 30000,
urlImage: "https://i.imgur.com/6dXGQF7.jpg",
category: "electroniques",
subcategory: "wearables",
tags: ["valentin"]
},


/* MAISON CUISINE */

{
id: "m1",
nomProduit: "Blender",
prix: 22000,
urlImage: "https://i.imgur.com/Y6XQK6p.jpg",
category: "maison-cuisine",
subcategory: "appliances",
tags: ["ramadan"]
},

{
id: "m2",
nomProduit: "Mixeur",
prix: 20000,
urlImage: "https://i.imgur.com/jEXFQ7W.jpg",
category: "maison-cuisine",
subcategory: "appliances",
tags: []
},

{
id: "m3",
nomProduit: "Set Assiettes",
prix: 15000,
urlImage: "https://i.imgur.com/6YV9Z6U.jpg",
category: "maison-cuisine",
subcategory: "vaisselle",
tags: []
},

{
id: "m4",
nomProduit: "Poêle Cuisine",
prix: 12000,
urlImage: "https://i.imgur.com/3XQ9Z6J.jpg",
category: "maison-cuisine",
subcategory: "ustensiles",
tags: ["ramadan"]
}

];

import { ajouterAuPanier, fetchLocal, saveLocal } from './cartLogique.js';

let produitsDisponibles = [];

const getProduits = async () => {
  try {
    const response = await fetch(API_URL);
    const produits = await response.json();
    const APIProducts = produits.reverse();
    produitsDisponibles = [...staticProducts, ...APIProducts];

    const lesProduits = document.getElementById('lesProduits');
    let pros = '';
    produitsDisponibles.forEach((produit) => {
      pros += `
        <div class="lg:w-75 bg-white  rounded-xl border border-gray-200 shadow-lg overflow-hidden p-2">
          <div class="relative bg-primary-purple rounded-2xl mb-4 p-4 flex justify-center items-center h-56">
            <i class="bi bi-heart text-2xl text-gray-400 absolute top-4 right-4 cursor-pointer"></i>
            <div class="w-full h-full flex items-center justify-center">
              <img src="${produit.urlImage}" alt="${produit.nomProduit}" class="max-h-55 w-60 object-contain" />
            </div>
          </div>

          <div class="px-2">
            <div class="flex justify-between items-center mb-3">
              <h1 class="text-md lg:text-2xl md:text-xl font-medium truncate text-text-color">${produit.nomProduit}</h1>
              <div class="flex items-center text-yellow-500">
                <i class="bi bi-star-fill text-lg"></i>
                <span class="ml-1 text-sm font-semibold text-text-color">4.7</span>
              </div>
            </div>

            <p class="text-md lg:text-xl md:text-xl font-bold text-gray-500 mb-5">${produit.prix} FCFA</p>

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

    if (lesProduits) {
      lesProduits.innerHTML = pros;
    }

    const boutons = document.querySelectorAll('.btnPro');
    boutons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('idPro');
        const produitChoisi = produitsDisponibles.find((p) => p.id === id);
        ajouterAuPanier(produitChoisi);
        getCommandes();
        nombreSurPanier();
      });
    });
  } catch (error) {
    console.log("Erreur lors du chargement des produits de l'API :", error);
  }
};

const getCommandes = () => {
  try {
    const data = fetchLocal('commandes').reverse();

    const lesCommandes = document.getElementById('lesCommandes');
    const nombreArticle = document.getElementById('nombreArticle');
    const totalPanier = document.getElementById('totalPanier');

    if (nombreArticle) nombreArticle.textContent = data.length;

    let total = 0;
    data.forEach((p) => {
      total += Number(p.prix) * p.quantite;
    });

    if (totalPanier) {
      totalPanier.textContent = total;
    }

    let content = '';
    data.forEach((produit) => {
      content += `
       <div class="flex items-center justify-between bg-white border border-slate-100 rounded-2xl p-3 shadow-sm mb-2">
            <div class="flex items-center gap-4">
              <img src="${produit.urlImage || produit.image}" class="w-20 h-20 rounded-2xl object-cover" alt="Produit" />
              <div>
                <h3 class="font-bold text-lg text-slate-800">${produit.nomProduit || produit.nom}</h3>
                <p class="text-slate-400 font-medium">${produit.prix} FCFA</p>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <span class="font-bold text-slate-800 text-lg">${produit.prix * produit.quantite} FCFA</span>
              <div class="join bg-slate-100 rounded-lg">
                <button data-id="${produit.id}" class="btnMoins btn btn-ghost btn-xs join-item px-2">-</button>
                <button class="btn btn-ghost btn-xs join-item pointer-events-none px-2">${produit.quantite}</button>
                <button data-id="${produit.id}" class="btnPlus btn btn-ghost btn-xs join-item px-2">+</button>
              </div>
              <button data-id="${produit.id}" class="btnDeleteCommande btn btn-ghost text-red-400 hover:text-red-600 hover:bg-red-50 btn-sm">Supprimer</button>
            </div>
        </div>
      `;
    });

    if (lesCommandes) {
      lesCommandes.innerHTML = content;
    }

    activerPanier();
  } catch (error) {
    console.log('Erreur lors de la récupération des commandes:', error);
  }
};

const activerPanier = () => {
  document.querySelectorAll('.btnPlus').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      let commandes = fetchLocal('commandes');
      const index = commandes.findIndex((c) => c.id === id);
      if (index !== -1) {
        commandes[index].quantite += 1;
        saveLocal('commandes', commandes);
        getCommandes();
      }
    });
  });

  document.querySelectorAll('.btnMoins').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      let commandes = fetchLocal('commandes');
      const index = commandes.findIndex((c) => c.id === id);
      if (index !== -1 && commandes[index].quantite > 1) {
        commandes[index].quantite -= 1;
        saveLocal('commandes', commandes);
        getCommandes();
      }
    });
  });

  document.querySelectorAll('.btnDeleteCommande').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Voulez-vous supprimer cet article du panier ?')) {
        let commandes = fetchLocal('commandes');
        commandes = commandes.filter((c) => c.id !== id);
        saveLocal('commandes', commandes);
        getCommandes();
        nombreSurPanier();
      }
    });
  });
};

const nombreSurPanier = () => {
  const data = fetchLocal('commandes');
  const totalPan = document.getElementById('totalPan');
  if (totalPan) {
    totalPan.textContent = data.length || 0;
  }
};

getProduits();
getCommandes();
nombreSurPanier();

// code pour la session de l'user
const userIcon = document.getElementById('userIcon');
if (userIcon) {
  userIcon.addEventListener('click', (e) => {
    e.preventDefault();
    const session = localStorage.getItem('vendeurConnecte');
    if (session) {
      window.open('./admin.html', '_blank');
    } else {
      window.location.href = './profile.html';
    }
  });
}

// code pour le commande :
const btnModalCommande = document.getElementById('btnModalCommande');
if (btnModalCommande) {
  btnModalCommande.addEventListener('click', () => {
    const commandes = fetchLocal('commandes');

    if (commandes.length === 0) {
      alert('Votre panier est vide !');
      return;
    }
    const total = document.getElementById('totalPanier').textContent;
    document.getElementById('modalTotalPrix').textContent = total + ' FCFA';

    document.getElementById('modalCommande').showModal();
  });
}

const API_COMMANDES = 'https://699dcb9c83e60a406a477403.mockapi.io/Commandes';

const formCommande = document.getElementById('formCommande');

if (formCommande) {
  formCommande.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = document.getElementById('clientNom').value;
    const telephone = document.getElementById('clientTelephone').value;
    const adresse = document.getElementById('clientAdresse').value;

    const panier = JSON.parse(localStorage.getItem('commandes') || '[]');

    if (panier.length === 0) {
      alert('Votre panier est vide !');
      return;
    }

    try {
      const commandeGlobale = {
        clientNom: nom,
        clientTelephone: telephone,
        clientAdresse: adresse,
        dateAchat: new Date().toLocaleDateString('fr-FR'),
        statut: 'En attente',
        articles: panier.map((produit) => ({
          produitId: produit.id,
          nom: produit.nomProduit,
          prix: produit.prix,
          quantite: produit.quantite || 1,
          image: produit.urlImage,
          vendeurId: produit.vendeurId,
        })),
      };

      await fetch(API_COMMANDES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commandeGlobale),
      });

      alert('🎉 Commande validée avec succès !');

      localStorage.removeItem('commandes');
      document.getElementById('modalCommande').close();
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la commande :', error);
      alert('Une erreur de connexion est survenue.');

      const btnSubmit = formCommande.querySelector('button[type="submit"]');
      btnSubmit.innerHTML = textOriginal;
      btnSubmit.disabled = false;
    }
  });
}

// Header dropdowns
const dropdownBtn = document.querySelectorAll('.dropdown-btn');

dropdownBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const dropdown = btn.nextElementSibling;

    document.querySelectorAll('.dropdown-content').forEach((menu) => {
      if (menu !== dropdown) {
        menu.classList.add('hidden');
      }
    });

    dropdown.classList.toggle('hidden');
  });
});

const offcanvasBtn = document.querySelector('.offcanvas-btn');

offcanvasBtn.addEventListener('click', () => {
  const dropdownContent = offcanvasBtn.nextElementSibling;
  dropdownContent.classList.remove('hidden');
});

const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', () => {
  const offcanvasContent = document.querySelector('.offcanvas-content');
  offcanvasContent.classList.add('hidden');
});
