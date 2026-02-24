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
              <i class="fa-solid fa-pen-fancy text-xl cursor-pointer hover:text-[#8E5F44] transition-colors"></i>
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
const btn01 = document.getElementById('btn01');
const btn02 = document.getElementById('btn02');
const btn03 = document.getElementById('btn03');

btn01.addEventListener('click', () => {
  contFournisseurs.classList.add('hidden');
  contProduits.classList.remove('hidden');
});
btn03.addEventListener('click', () => {
  contProduits.classList.add('hidden');
  contFournisseurs.classList.remove('hidden');
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

const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
      localStorage.removeItem('vendeurConnecte');
      window.location.href = './index.html';
    }
  });
}
