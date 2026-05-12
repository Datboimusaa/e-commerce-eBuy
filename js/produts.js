const API_URL = 'https://699cc75983e60a406a446756.mockapi.io/produits';

const staticProducts = [
  /* MODE HOMME */

  {
    id: 'sh1',
    nomProduit: 'Djellaba marocain',
    prix: 18000,
    urlImage: "https://www.djellaba-homme.fr/1254-home_default/gandoura-marocaine.jpg",
    categorie: "mode-homme",
    subcategory: "tshirt",
    tags: ["ramadan"],
    motsCles: ['traditionnelle', 'brodée', 'capuche']
  },

  {
    id: 'sh2',
    nomProduit: 'T-shirt Blanc Homme',
    prix: 7500,
    urlImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoLYZfNsdF_JryV_NbG_fr85EyAoId0ljSNQ&s",
    categorie: "mode-homme",
    subcategory: "tshirt",
    tags: ["valentin"],
    motsCles: ['basique', 'coton', 'ajusté']
  },

  {
    id: 'jh1',
    nomProduit: 'Jean Slim Homme',
    prix: 15000,
    urlImage: "https://www.districenter.fr/61917-medium_default/jean-slim-gris-homme.jpg",
    categorie: "mode-homme",
    subcategory: "jeans",
    tags: [],
    motsCles: ['ajusté', 'stretch', 'denim']
  },

  {
    id: 'jh2',
    nomProduit: 'Jean Bleu Homme',
    prix: 16000,
    urlImage: "https://img01.ztat.net/article/spp-media-p1/8c3e7b7ccbe44014a13707f3c8c6a7eb/ed005151cd76404c8f093f57b223e523.jpg?imwidth=762",
    categorie: "mode-homme",
    subcategory: "jeans",
    tags: ["ramadan"],
    motsCles: ['brut', 'délavé', 'indigo']
  },

  /* MODE FEMME */

  {
    id: 'sf1',
    nomProduit: 'Robe Fleurie',
    prix: 18000,
    urlImage: "https://princesse-fleurie.com/cdn/shop/products/Robe-noire-fleurie_600x.jpg?v=1749907409",
    categorie: "mode-femme",
    subcategory: "robes",
    tags: ["valentin"],
    motsCles: ['bohème', 'longue', 'imprimée']
  },

  {
    id: 'sf2',
    nomProduit: 'Abaya marocaine',
    prix: 18000,
    urlImage: "../assets/images/hero-product-1.png",
    categorie: "mode-femme",
    subcategory: "robes",
    tags: ["ramadan"],
    motsCles: ['fluide', 'caftan', 'modeste']
  },

  {
    id: 'sf3',
    nomProduit: 'Robe Rouge',
    prix: 20000,
    urlImage: "https://www.dressself.com/cdn/shop/products/redeveningdress-1_8427f27e-06f0-4cfd-a160-1e97c3499b60.jpg?v=1654670950",
    categorie: "mode-femme",
    subcategory: "robes",
    tags: [],
    motsCles: ['soirée', 'élégante', 'ajustée']
  },

  {
    id: 'tsf1',
    nomProduit: 'T-shirt Femme Rose',
    prix: 7000,
    urlImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhjZILGqwB5iL-8d8hKl-ANilt5R6ZxwlUQQ&s",
    categorie: "mode-femme",
    subcategory: "tshirt",
    tags: ["valentin"],
    motsCles: ['tshirt', 'soirée', 'élégante', 'ajustée']
  },

  {
    id: "tsf2",
    nomProduit: "T-shirt Femme Blanc",
    prix: 6500,
    urlImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBKCcK-zwtxJZW-M-sIbf9cSl7jNEnrsS4w&s",
    categorie: "mode-femme",
    subcategory: "tshirt",
    tags: [],
    motsCles: ['basique', 'coton', 'col-v']
  },

  /* ELECTRONIQUES */

  {
    id: "e1",
    nomProduit: "Casque Bluetooth",
    prix: 25000,
    urlImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj2fk9mUz9uDyiv6ZFPq3VBQdl5Kqi-yqQVQ&s",
    categorie: "electroniques",
    subcategory: "audio",
    tags: ['nouveaux-produits'],
    motsCles: ['sans-fil', 'réduction-bruit', 'autonomie']
  },

  {
    id: "e2",
    nomProduit: "Ecouteurs Sans Fil",
    prix: 15000,
    urlImage: "https://www.electromenager-dakar.com/wp-content/uploads/2025/11/BD04-510x510.png.webp",
    categorie: "electroniques",
    subcategory: "audio",
    tags: ["ramadan"],
    motsCles: ['intra-auriculaire', 'antibruit', 'tactile']
  },

  {
    id: "e3",
    nomProduit: "Smartphone Android",
    prix: 120000,
    urlImage: "https://images-cdn.ubuy.com.sa/63b46431ffafdf2f462e84a6-christmas-gifts-clearance-cbcbtwo-smart.jpg",
    categorie: "electroniques",
    subcategory: "phones",
    tags: ['best-sellers'],
    motsCles: ['débloqué', 'oled', 'performant']
  },

  {
    id: "e4",
    nomProduit: "Montre Connectée",
    prix: 30000,
    urlImage: "https://static.wixstatic.com/media/f16a46_de3f1121a8224d74b64ab697f27aec3a~mv2.jpg/v1/fill/w_480,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/f16a46_de3f1121a8224d74b64ab697f27aec3a~mv2.jpg",
    categorie: "electroniques",
    subcategory: "wearables",
    tags: ["valentin"],
    motsCles: ['sportive', 'étanche', 'santé']
  },

  /* MAISON CUISINE */

  {
    id: "m1",
    nomProduit: "Blender",
    prix: 22000,
    urlImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzl8Ap-4L9EPCiEfREfWZSZAaVtjzWc3CTIw&s",
    categorie: "maison-cuisine",
    subcategory: "appliances",
    tags: ["ramadan"],
    motsCles: []
  },

  {
    id: "m2",
    nomProduit: "Mixeur",
    prix: 20000,
    urlImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGuqf6WXmZErogKS0DAyI6OsHpEIB_QxcoA&s",
    categorie: "maison-cuisine",
    subcategory: "appliances",
    tags: [],
    motsCles: []
  },

  {
    id: "m3",
    nomProduit: "Set Assiettes",
    prix: 15000,
    urlImage: "../assets/images/hero-product-2.png",
    categorie: "maison-cuisine",
    subcategory: "vaisselle",
    tags: ["ramadan"],
    motsCles: []
  },

  {
    id: "m4",
    nomProduit: "Poêle Cuisine",
    prix: 12000,
    urlImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_aLBMQUToqUqtDp1mHpZmK10vqiYry7-dGQ&s",
    categorie: "maison-cuisine",
    subcategory: "ustensiles",
    tags: ["ramadan"],
    motsCles: []
  }

];

import { ajouterAuPanier, fetchLocal, saveLocal } from './cartLogique.js';

let produitsDisponibles = [];

const getProduits = async () => {
  try {
    const response = await fetch(API_URL);
    const produits = await response.json();
    const APIProducts = produits.reverse().filter((p) => p.status === 'publie');

    produitsDisponibles = [...staticProducts, ...APIProducts];
    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get('category');
    const selectedTag = params.get('tag');
    const selectedSearch = params.get('search');

    let filteredProducts = produitsDisponibles;

    // Filter by category
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((produit) => produit.categorie === selectedCategory);
    }

    // Filter by tag
    if (selectedTag) {
      const tagLower = selectedTag.toLowerCase();
      filteredProducts = filteredProducts.filter(
        produit => Array.isArray(produit.tags) && produit.tags.some(tag => tag.toLowerCase() === tagLower)
      );
    }

    // Search filter

    if (selectedSearch) {

      const searchLower = selectedSearch.toLowerCase();

      filteredProducts = filteredProducts.filter(produit => {

        const mots = Array.isArray(produit.motCles)
          ? produit.motCles
          : [];

        return (
          produit.nomProduit.toLowerCase().includes(searchLower)
          ||
          mots.some(mot =>
            mot.toLowerCase().includes(searchLower)
          )
        );

      });

    }

    const lesProduits = document.getElementById('lesProduits');
    let pros = '';
    filteredProducts.forEach((produit) => {
      pros += `
        <div class="bg-white  rounded-xl border border-gray-200 shadow-lg overflow-hidden p-2">
          <div class="relative bg-primary-purple rounded-2xl mb-4 p-4 flex justify-center items-center h-56">
            <button class="heartBtn text-2xl text-gray-400 absolute top-4 right-4 cursor-pointer data-id="${produit.id}" ">❤️</button>
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

    const hearts = document.querySelectorAll('.heartBtn');

    hearts.forEach((btn) => {
      btn.addEventListener('click', () => {

        const id = btn.getAttribute('data-id');

        ajouterWishlist(id);

      });
    });
  } catch (error) {
    console.log("Erreur lors du chargement des produits de l'API :", error);
  }
};

const afficherWishlist = async () => {

  const wishlist =
    JSON.parse(localStorage.getItem('wishlist')) || [];

  const container =
    document.getElementById('wishlistContainer');

  // Load products from API
  const response = await fetch(API_URL);
  const apiProduits = await response.json();

  const tousProduits = [...staticProducts, ...apiProduits];

  let html = '';

  wishlist.forEach(id => {

    const produit = tousProduits.find(p => p.id == id);

    if(produit){

      html += `

      <div class="bg-white rounded-xl border shadow p-3">

          <img src="${produit.urlImage}"
          class="w-full h-40 object-contain">

          <h2 class="text-lg font-semibold mt-2">
          ${produit.nomProduit}
          </h2>

          <p class="text-gray-500">
          ${produit.prix} FCFA
          </p>

      </div>

      `;

    }

  });

  container.innerHTML = html;

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

const getWishlist = () => {
  const data = localStorage.getItem('wishlist');
  return data ? JSON.parse(data) : [];
};

const saveWishlist = (wishlist) => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

function ajouterWishlist(id) {

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Check if already exists
  if (!wishlist.includes(id)) {
    wishlist.push(id);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  alert("Produit ajouté à la wishlist ❤️");

}

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
afficherWishlist();

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