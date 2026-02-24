const API_URL = 'https://699cc75983e60a406a446756.mockapi.io/produits';

const getProduits = async () => {
  try {
    const response = await fetch(API_URL);
    const produits = await response.json();

    const produitsAffiches = produits.reverse();
    const lesProduits = document.getElementById('lesProduits');

    let pros = '';
    produitsAffiches.forEach((produit) => {
      pros += `
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="p-4 flex items-center space-x-4">
            <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              <i class="fas fa-laptop fa-lg"></i>
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
              <i class="fa-solid fa-trash text-xl cursor-pointer hover:text-red-500 transition-colors"></i>
            </div>
          </td>
        </tr>
      `;
    });
    lesProduits.innerHTML = pros;

    const boutons = document.querySelectorAll('.btnDelete');
    boutons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('idPro');
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
  try {
    const nouveauProduit = {
      nomProduit: document.getElementById('nomProduit').value,
      urlImage: document.getElementById('urlImage').value,
      categorie: document.getElementById('categorie').value,
      prix: Number(document.getElementById('prix').value),
      stock: Number(document.getElementById('stock').value),
      description: document.getElementById('description').value,
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nouveauProduit),
    });

    if (response.ok) {
      alert("Produit ajouté sur l'API !");
      document.getElementById('productForm').reset();
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
