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
    id: crypto.randomUUID(),
    produitId: produit.id,
    nom: produit.nomProduit,
    prix: produit.prix,
    image: produit.urlImage,
    quantite: 1,
  };

  commandes.push(commande);
  saveLocal('commandes', commandes);
  alert('Produit ajouté au panier !');
  return true;
};
