// code pour récupérer les produits :

const API_URL = 'https://699cc75983e60a406a446756.mockapi.io/produits';

const fetchProduits = async () => {
  try {
    const response = await fetch(API_URL);
    const tousLesProduits = await response.json();

    const produitsAffiches = tousLesProduits.reverse();

    const totalAnnonce = document.getElementById('totalAnnonce');
    const produitsValides = document.getElementById('nombreStock');
    const produitsEnAttente = document.getElementById('nbCommandes');
    totalAnnonce.textContent = produitsAffiches.length;
    produitsValides.textContent = produitsAffiches.filter((p) => p.status === 'publie').length;
    produitsEnAttente.textContent = produitsAffiches.filter((p) => p.status === 'en_attente').length;

    const lesProduits = document.getElementById('lesProduits');
    let pros = '';
    produitsAffiches.forEach((produit) => {
      pros += `
      <tr class="hover:bg-slate-50/50 transition-colors group">
        <td class="px-8 py-5">
          <div class="flex items-center gap-5">
            <div class="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 p-1 shadow-sm group-hover:shadow-md transition-all">
              <img
                src="${produit.urlImage}"
                class="w-full h-full object-cover rounded-xl"
                alt=""
              />
            </div>
            <div>
              <span class="font-black text-md text-slate-800 block mb-1">${produit.nomProduit}</span>
            </div>
          </div>
        </td>
        <td class="px-8 py-5">
          <div class="flex items-center gap-3">
            <p class="font-bold text-slate-700">${produit.vendeurNom}</p>
          </div>
        </td>
        <td class="px-8 py-5">
          <p class="font-black text-brown-admin">${produit.prix} FCFA</p>
        </td>
        <td class="p-4 text-center">
            <span class="px-2 py-1 ${produit.status === 'en_attente' ? ' bg-red-50 text-red-700' : 'bg-green-50 text-green-700'} rounded-md text-xs font-bold">
              ${produit.status} 
            </span>
        </td>
        <td class="px-8 py-5 text-right">
          <div class="flex justify-end gap-3">
              <button
                data-id="${produit.id}" 
                class="btn-refuser px-3 py-1 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-bold border border-red-100 shadow-sm active:scale-95"
              >
                <i class="fas fa-xmark mr-2"></i> Refuser
              </button>
              <button
                data-id="${produit.id}"
                class="btn-valider px-3 py-1 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-all font-black border border-green-100 shadow-sm active:scale-95"
              >
                <i class="fas fa-check-double mr-2"></i> Valider
              </button>
          </div>
        </td>
      </tr>
      `;
    });

    if (lesProduits) {
      lesProduits.innerHTML = pros;
    }

    document.querySelectorAll('.btn-valider').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        await modifierStatutProduit(id, 'publie');
      });
    });

    document.querySelectorAll('.btn-refuser').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Voulez-vous vraiment rejeter et supprimer ce produit ?')) {
          await supprimerProduit(id);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
fetchProduits();

const modifierStatutProduit = async (id, nouveauStatut) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nouveauStatut }),
    });

    if (response.ok) {
      alert('Produit validé avec succès !');
      fetchProduits();
    }
  } catch (error) {
    console.error('Erreur validation:', error);
  }
};

const supprimerProduit = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (response.ok) {
      fetchProduits();
    }
  } catch (error) {
    console.error('Erreur suppression:', error);
  }
};

// code pour gerer la navigation :
const btnModeration = document.getElementById('btn-menu-moderation'); // Le bouton "Vue d'ensemble"
const btnUsers = document.getElementById('btn-menu-users'); // Le bouton "Utilisateurs"

// On récupère les sections dans le Main
const sectionModeration = document.getElementById('section-moderation');
const sectionUsers = document.getElementById('section-users');

// NAVIGATION VERS UTILISATEURS
btnUsers.onclick = (e) => {
  e.preventDefault();
  sectionModeration.classList.add('hidden'); // On cache la modération
  sectionUsers.classList.remove('hidden'); // On montre les users

  // Style actif (Optionnel : mettre le bouton en marron)
  btnUsers.classList.add('bg-brown-admin', 'text-white');
  btnModeration.classList.remove('bg-brown-admin', 'text-white');
};

// NAVIGATION VERS MODÉRATION
btnModeration.onclick = (e) => {
  e.preventDefault();
  sectionUsers.classList.add('hidden'); // On cache les users
  sectionModeration.classList.remove('hidden'); // On montre la modération

  // Style actif
  btnModeration.classList.add('bg-brown-admin', 'text-white');
  btnUsers.classList.remove('bg-brown-admin', 'text-white');
};
