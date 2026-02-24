const API_URL = 'https://699cc75983e60a406a446756.mockapi.io/produits';

const getProduits = async () => {
  try {
    const response = await fetch(API_URL);
    const tousLesProduits = await response.json();

    const sessionVendeur = JSON.parse(localStorage.getItem('vendeurConnecte')); //

    const mesProduits = tousLesProduits.filter((p) => p.vendeurId === sessionVendeur.id);

    const produitsAffiches = mesProduits.reverse();

    const lesProduits = document.getElementById('lesProduits');
    let pros = '';

    produitsAffiches.forEach((produit) => {
      pros += `
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="p-4 flex items-center space-x-4">
            <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 overflow-hidden">
              <img src="${produit.urlImage}" class="w-full h-full object-cover" alt="">
            </div>
            <div>
              <span class="font-medium text-gray-800 block">${produit.nomProduit}</span>
            </div>
          </td>
          <td class="p-4 text-gray-600">${produit.prix} FCFA</td>
          <td class="p-4 text-gray-600">${produit.stock}</td>
          <td class="p-4 font-medium text-gray-800 text-center">${produit.categorie}</td>
          <td class="p-4 text-gray-800 text-right">
            <div class="flex justify-end gap-5">
              <i idModify="${produit.id}" class="btnEdit fa-solid fa-pen-fancy text-xl cursor-pointer hover:text-[#8E5F44] transition-colors"></i>
              <i idPro="${produit.id}" class="btnDelete fa-solid fa-trash text-xl cursor-pointer hover:text-red-500 transition-colors"></i>
            </div>
          </td>
        </tr>
      `;
    });

    if (lesProduits) {
      lesProduits.innerHTML = pros;
    }

    const totalAnnonce = document.getElementById('totalAnnonce');
    totalAnnonce.textContent = produitsAffiches.length || 0;

    let totalStock = 0;
    const nombreStock = document.getElementById('nombreStock');
    produitsAffiches.forEach((p) => {
      totalStock += p.stock;
    });
    nombreStock.textContent = totalStock;

    const boutons = document.querySelectorAll('.btnDelete');
    boutons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('idPro');
        if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
          deleteProduit(id);
        }
      });
    });

    const boutonsEdit = document.querySelectorAll('.btnEdit');
    boutonsEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('idModify');

        try {
          const response = await fetch(`${API_URL}/${id}`);
          const produit = await response.json();

          document.getElementById('editId').value = produit.id;
          document.getElementById('editNom').value = produit.nomProduit;
          document.getElementById('editImage').value = produit.urlImage;
          document.getElementById('editPrix').value = produit.prix;
          document.getElementById('editStock').value = produit.stock;
          document.getElementById('editCategorie').value = produit.categorie;
          document.getElementById('editDescription').value = produit.description;

          document.getElementById('modalModification').showModal();
        } catch (error) {
          console.error('Erreur lors de la récupération du produit :', error);
          alert('Impossible de charger les détails du produit.');
        }
      });
    });
  } catch (error) {
    console.error('Erreur de chargement:', error);
  }
};

const formProduit = document.getElementById('productForm');
formProduit.addEventListener('submit', async (e) => {
  e.preventDefault();

  const sessionVendeur = JSON.parse(localStorage.getItem('vendeurConnecte'));

  if (!sessionVendeur) {
    alert('Impossible, veuillez vous connecter');
    window.location.href = 'profile.html';
    return;
  }
  try {
    const nouveauProduit = {
      nomProduit: document.getElementById('nomProduit').value,
      urlImage: document.getElementById('urlImage').value,
      categorie: document.getElementById('categorie').value,
      prix: Number(document.getElementById('prix').value),
      stock: Number(document.getElementById('stock').value),
      description: document.getElementById('description').value,
      vendeurId: sessionVendeur.id,
      vendeurNom: sessionVendeur.nom,
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nouveauProduit),
    });

    if (response.ok) {
      alert("Produit ajouté sur l'API !");
      formProduit.reset();
      getProduits();
    }
  } catch (error) {
    console.error("Erreur d'ajout:", error);
    alert("Une erreur est survenue lors de l'ajout");
  }
});

const deleteProduit = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      getProduits();
    }
  } catch (error) {
    console.error('Erreur de suppression:', error);
  }
};

getProduits();

const contProduits = document.getElementById('page01');
const contFournisseurs = document.getElementById('page02');
const contCommandes = document.getElementById('page03');

const btn01 = document.getElementById('btn01');
const btn02 = document.getElementById('btn02');
const btn03 = document.getElementById('btn03');

btn01.addEventListener('click', () => {
  contProduits.classList.remove('hidden');
  contFournisseurs.classList.add('hidden');
  contCommandes.classList.add('hidden');
});

btn03.addEventListener('click', () => {
  contProduits.classList.add('hidden');
  contFournisseurs.classList.remove('hidden');
  contCommandes.classList.add('hidden');
});

btn02.addEventListener('click', () => {
  contProduits.classList.add('hidden');
  contFournisseurs.classList.add('hidden');
  contCommandes.classList.remove('hidden');
});

const sessionVendeur = JSON.parse(localStorage.getItem('vendeurConnecte'));
if (!sessionVendeur) {
  window.location.href = 'profile.html';
} else {
  const affichageNom = document.getElementById('nomBoutique');
  if (affichageNom) {
    affichageNom.textContent = sessionVendeur.nom;
  }
}

// code pour déconnecter :
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
      localStorage.removeItem('vendeurConnecte');
      window.location.href = './index.html';
    }
  });
}

// code pour la modification :
const formEditProduit = document.getElementById('formEditProduit');

if (formEditProduit) {
  formEditProduit.addEventListener('submit', async (e) => {
    e.preventDefault();

    const idProduit = document.getElementById('editId').value;

    const produitModifie = {
      nomProduit: document.getElementById('editNom').value,
      urlImage: document.getElementById('editImage').value,
      prix: Number(document.getElementById('editPrix').value),
      stock: Number(document.getElementById('editStock').value),
      categorie: document.getElementById('editCategorie').value,
      description: document.getElementById('editDescription').value,
    };

    try {
      const response = await fetch(`${API_URL}/${idProduit}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produitModifie),
      });

      if (response.ok) {
        document.getElementById('modalModification').close();
        getProduits();
      } else {
        alert("Erreur lors de la mise à jour sur l'API.");
      }
    } catch (error) {
      console.error("Erreur d'édition:", error);
      alert('Une erreur de connexion est survenue.');
    }
  });
}

// code pour les commandes reçu :
const API_COMMANDES = 'https://699dcb9c83e60a406a477403.mockapi.io/Commandes';

window.marquerCommeLivree = async (id) => {
  if (!confirm('Confirmer la livraison de cette commande ?')) return;

  try {
    await fetch(`${API_COMMANDES}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut: 'Livrée' }),
    });
    getCommandes();
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error);
  }
};

const updateDashboardStats = (commandes, vendeurId) => {
  let revenuTotal = 0;
  let nbCommandesVendeur = 0;

  commandes.forEach((cmd) => {
    const mesProduits = cmd.articles.filter((art) => String(art.vendeurId) === String(vendeurId));
    if (mesProduits.length > 0) {
      nbCommandesVendeur++;
      mesProduits.forEach((p) => (revenuTotal += p.prix * (p.quantite || 1)));
    }
  });

  const elRevenu = document.getElementById('revenuTotal');
  const elNbCommandes = document.getElementById('nbCommandes');

  if (elRevenu) elRevenu.innerHTML = `${revenuTotal} <span class="text-[15px]">FCFA</span>`;
  if (elNbCommandes) elNbCommandes.textContent = nbCommandesVendeur;
};

const getCommandes = async () => {
  try {
    const response = await fetch(API_COMMANDES);
    const toutesLesCommandes = await response.json();

    const sessionVendeur = JSON.parse(localStorage.getItem('vendeurConnecte'));
    if (!sessionVendeur) return;

    updateDashboardStats(toutesLesCommandes, sessionVendeur.id);

    const conteneurCommandes = document.getElementById('conteneurCommandes');
    let cartesHTML = '';

    toutesLesCommandes.reverse().forEach((commandeGlobale) => {
      const mesProduits = commandeGlobale.articles.filter((article) => String(article.vendeurId) === String(sessionVendeur.id));

      if (mesProduits.length === 0) return;

      let monTotal = 0;
      let listeProduitsHTML = '';

      mesProduits.forEach((p) => {
        const qte = p.quantite || 1;
        monTotal += p.prix * qte;
        listeProduitsHTML += `
          <div class="flex items-center gap-3 p-2 bg-gray-50 rounded-xl mb-2">
            <img src="${p.urlImage || p.image}" class="w-12 h-12 rounded-lg object-cover border border-white shadow-sm">
            <div class="grow">
              <p class="text-sm font-bold text-slate-800">${p.nomProduit || p.nom}</p>
              <p class="text-xs text-slate-500">${p.prix} FCFA x ${qte}</p>
            </div>
            <span class="font-bold text-slate-700 text-sm">${p.prix * qte} FCFA</span>
          </div>`;
      });

      cartesHTML += `
        <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col hover:border-[#8E5F44]/30 transition-all duration-300">
          
          <div class="p-5 border-b border-slate-50">
            <div class="flex justify-between items-start mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-[#8E5F44]/10 rounded-full flex items-center justify-center text-[#8E5F44]">
                  <i class="bi bi-person-fill text-lg"></i>
                </div>
                <div>
                  <h3 class="font-black text-slate-800 leading-none">${commandeGlobale.clientNom}</h3>
                  <span class="text-[10px] text-slate-400 uppercase tracking-widest font-bold">${commandeGlobale.dateAchat}</span>
                </div>
              </div>
              <span class="px-3 py-1 ${commandeGlobale.statut === 'Livrée' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-800'} text-[10px] font-black rounded-full uppercase italic">
                ${commandeGlobale.statut || 'En attente'}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2 mt-4">
              <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <p class="text-[9px] text-slate-400 font-bold uppercase mb-1">Téléphone</p>
                <p class="text-xs font-bold text-slate-700 truncate"><i class="bi bi-telephone mr-1 text-[#8E5F44]"></i>${commandeGlobale.clientTelephone}</p>
              </div>
              <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <p class="text-[9px] text-slate-400 font-bold uppercase mb-1">Livraison</p>
                <p class="text-xs font-bold text-slate-700 truncate" title="${commandeGlobale.clientAdresse}"><i class="bi bi-geo-alt mr-1 text-[#8E5F44]"></i>${commandeGlobale.clientAdresse}</p>
              </div>
            </div>
          </div>

          <div class="p-5 flex-grow">
            <h4 class="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">Articles à préparer</h4>
            
            <div class="max-h-64 overflow-y-auto pr-2 custom-scrollbar">
               ${listeProduitsHTML}
            </div>
          </div>

          <div class="p-5 bg-slate-50/80 border-t border-slate-100 flex justify-between items-center mt-auto">
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase">Mon gain</p>
              <p class="text-xl font-black text-[#8E5F44]">${monTotal} <small class="text-xs font-bold">FCFA</small></p>
            </div>
            ${
              commandeGlobale.statut !== 'Livrée'
                ? `
              <button onclick="marquerCommeLivree('${commandeGlobale.id}')" 
                class="px-6 py-2.5 bg-[#8E5F44] text-white text-xs font-black rounded-xl hover:bg-[#704a35] shadow-lg shadow-[#8E5F44]/20 transition-all active:scale-95"
              >
                LIVRÉE
              </button>
            `
                : `<div class="flex items-center gap-1 text-green-600 font-black text-xs italic"><i class="bi bi-check-circle-fill text-lg"></i> TERMINÉ</div>`
            }
          </div>

        </div>
      `;
    });

    conteneurCommandes.innerHTML = cartesHTML || '<p class="col-span-full text-center py-10 text-slate-400 font-medium">Aucune commande pour le moment.</p>';
  } catch (error) {
    console.error('Erreur:', error);
  }
};

getCommandes();
