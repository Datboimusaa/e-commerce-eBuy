const USER_API = 'https://699cc75983e60a406a446756.mockapi.io/users';

const loginFormContainer = document.getElementById('loginFormContainer');
const registerFormContainer = document.getElementById('registerFormContainer');
const btnShowRegister = document.getElementById('btnShowRegister');
const btnShowLogin = document.getElementById('btnShowLogin');

btnShowRegister.addEventListener('click', () => {
  loginFormContainer.classList.add('hidden');
  loginFormContainer.classList.remove('block');

  registerFormContainer.classList.remove('hidden');
  registerFormContainer.classList.add('block');
});

btnShowLogin.addEventListener('click', () => {
  registerFormContainer.classList.add('hidden');
  registerFormContainer.classList.remove('block');

  loginFormContainer.classList.remove('hidden');
  loginFormContainer.classList.add('block');
});

const btnRegister = document.getElementById('btnRegister');

// inscription
btnRegister.addEventListener('click', async () => {
  const nom = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  if (!nom || !email || !password) {
    alert('Veuillez remplir tous les champs !');
    return;
  }

  const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert('Veuillez entrer un email valide !');
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.');
    return;
  }

  const nouveauVendeur = { nom, email, password, status: 'vendeur simple' };

  try {
    const response = await fetch(USER_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nouveauVendeur),
    });

    if (response.ok) {
      alert('Félicitations ! Ton compte est créé. Tu peux maintenant te connecter.');

      document.getElementById('registerName').value = '';
      document.getElementById('registerEmail').value = '';
      document.getElementById('registerPassword').value = '';

      btnShowLogin.click();
    } else {
      alert('Erreur lors de la création du compte.');
    }
  } catch (error) {
    console.error('Erreur serveur :', error);
  }
});

// la connexion :
const btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', async () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert('Veuillez remplir tous les champs !');
    return;
  }

  try {
    const response = await fetch(USER_API);
    const utilisateurs = await response.json();

    const vendeurTrouve = utilisateurs.find((u) => u.email === email && u.password === password);

    if (vendeurTrouve) {
      localStorage.setItem('vendeurConnecte', JSON.stringify(vendeurTrouve));
      window.location.href = './admin.html';
    } else {
      alert("L'email ou le mot de passe est incorrect.");
    }
  } catch (error) {
    console.error('Erreur serveur :', error);
  }
});
