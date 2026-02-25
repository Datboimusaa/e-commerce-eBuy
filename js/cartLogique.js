export const fetchLocal = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveLocal = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const ajouterAuPanier = (produit) => {
  let commandes = fetchLocal('commandes');

  const existe = commandes.some((p) => p.produitId === produit.id);
  if (existe) {
    alert('Ce produit est déjà dans le panier');
    return false;
  }

  const commande = {
    id: produit.id,
    produitId: produit.id,
    nomProduit: produit.nomProduit || produit.nom,
    prix: produit.prix,
    urlImage: produit.urlImage || produit.image,
    vendeurId: produit.vendeurId,
    quantite: 1,
  };

  commandes.push(commande);
  saveLocal('commandes', commandes);
  alert('Produit ajouté au panier !');
  return true;
};
