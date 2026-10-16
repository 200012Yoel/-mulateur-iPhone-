/* Local settings simulation. No device credentials or real network operations. */
(() => {
  const storageKey = 'iphone.settings.v1';
  let state = {};
  try { state = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch {}
  const get = (key, fallback) => state[key] ?? fallback;
  const save = () => { try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {} };
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const link = (label, target = label) => ({label, target});
  const toggle = (label, value = true) => ({label, type: 'toggle', value});
  const choice = (label, options) => ({label, type: 'choice', options});
  const field = (label, value) => ({label, type: 'field', value});
  const info = (label, value) => ({label, type: 'info', value});
  const apps = ['Appareil photo', 'App Store', 'Calendrier', 'Cartes', 'Contacts', 'FaceTime', 'Fichiers', 'Horloge', 'Mail', 'Messages', 'Musique', 'Notes', 'Photos', 'Rappels', 'Safari', 'Téléphone'];
  const pages = {
    'Wi-Fi': [toggle('Wi-Fi'), link('Maison', 'Réseau : Maison'), link('Atelier', 'Réseau : Atelier'), link('Invités', 'Réseau : Invités'), link('Autre réseau…'), choice('Confirmer l’accès', ['Notifier', 'Demander', 'Non']), choice('Connexion auto aux partages', ['Automatique', 'Demander', 'Jamais'])],
    'Bluetooth': [toggle('Bluetooth'), link('AirPods', 'Accessoire : AirPods'), link('Enceinte', 'Accessoire : Enceinte')],
    'Données cellulaires': [toggle('Données cellulaires', false), choice('Options', ['Standard', 'Économie de données']), toggle('Données à l’étranger', false), info('Période en cours', '0 octet')],
    'Partage de connexion': [toggle('Autoriser d’autres utilisateurs', false), field('Mot de passe Wi-Fi', 'simulateur123'), toggle('Maximiser la compatibilité', false)],
    'Batterie': [toggle('Pourcentage de la batterie'), toggle('Mode économie d’énergie', false), link('État de santé et recharge'), info('Niveau de batterie', '100 %'), info('Activité', 'Aucune mesure matérielle')],
    'État de santé et recharge': [info('Capacité maximum', '100 % (simulation)'), toggle('Recharge optimisée de la batterie')],
    'Général': ['Informations', 'Mise à jour logicielle', 'Stockage iPhone', 'AirDrop', 'AirPlay et Continuité', 'Image dans l’image', 'Date et heure', 'Clavier', 'Langue et région', 'VPN et gestion de l’appareil', 'Transférer ou réinitialiser l’iPhone'].map(x => link(x)),
    'Informations': [field('Nom', 'iPhone de Yoel'), info('Version du système', 'Simulateur web — thème iOS'), info('Nom du modèle', 'iPhone simulé'), info('Capacité', '128 Go (simulation)')],
    'Mise à jour logicielle': [info('Système', 'Simulateur web'), info('Mises à jour', 'Distribuées avec le site GitHub Pages'), toggle('Mises à jour automatiques')],
    'Stockage iPhone': [info('Stockage', 'Données locales du navigateur'), ...apps.map(x => info(x, 'Application simulée'))],
    'AirDrop': [choice('Réception', ['Contacts uniquement', 'Réception désactivée', 'Tout le monde pendant 10 minutes'])],
    'AirPlay et Continuité': [toggle('Handoff'), choice('AirPlay automatique', ['Demander', 'Jamais', 'Automatique'])],
    'Image dans l’image': [toggle('Lancer l’Incrustation automatiquement')],
    'Date et heure': [toggle('Réglage automatique'), toggle('Affichage 24 h'), choice('Fuseau horaire', ['Paris', 'Londres', 'New York', 'Tokyo'])],
    'Clavier': [choice('Claviers', ['Français', 'Anglais', 'Emoji']), toggle('Majuscules automatiques'), toggle('Correction automatique'), toggle('Prédiction'), toggle('Activer Dictée')],
    'Langue et région': [choice('Langue de l’iPhone', ['Français', 'English']), choice('Région', ['France', 'Belgique', 'Canada', 'Suisse']), choice('Unité de température', ['Celsius', 'Fahrenheit'])],
    'VPN et gestion de l’appareil': [info('VPN', 'Non connecté'), info('Gestion de l’appareil', 'Aucun profil')],
    'Transférer ou réinitialiser l’iPhone': [{label:'Réinitialiser les réglages du simulateur', type:'reset'}],
    'Accessibilité': ['Affichage et taille du texte', 'Mouvement', 'Toucher', 'VoiceOver', 'Zoom', 'Contenu énoncé', 'Audio et visuel'].map(x => link(x)),
    'Affichage et taille du texte': [toggle('Texte en gras', false), toggle('Augmenter le contraste', false), toggle('Réduire la transparence', false), toggle('Filtres de couleur', false)],
    'Mouvement': [toggle('Réduire les animations', false), toggle('Lire les effets des messages')],
    'Toucher': [toggle('AssistiveTouch', false), toggle('Toucher pour réactiver'), toggle('Vibrations')],
    'VoiceOver': [toggle('VoiceOver', false)], 'Zoom': [toggle('Zoom', false)],
    'Contenu énoncé': [toggle('Énoncer la sélection', false), toggle('Énoncer le contenu de l’écran', false)],
    'Audio et visuel': [toggle('Audio mono', false), toggle('Flash LED pour alertes', false)],
    'Luminosité et affichage': [choice('Apparence', ['Claire', 'Sombre']), toggle('Automatique', false), {label:'Luminosité', type:'range', value:80}, toggle('True Tone'), toggle('Night Shift', false), choice('Verrouillage automatique', ['30 secondes', '1 minute', '2 minutes', '5 minutes', 'Jamais']), {label:'Taille du texte', type:'range', value:50}],
    'Appareil photo': [choice('Formats', ['Haute efficacité', 'Le plus compatible']), choice('Enregistrer une vidéo', ['1080p à 30 i/s', '1080p à 60 i/s', '4K à 30 i/s']), toggle('Grille', false), toggle('Niveau', false), toggle('Symétrie de la caméra avant', false)],
    'Centre de contrôle': [toggle('Accès à partir des apps'), info('Commandes', 'Ouvrez le Centre de contrôle depuis l’écran d’accueil')],
    "Écran d’accueil et bibliothèque d’apps": [choice('Nouvelles apps téléchargées', ['Sur l’écran d’accueil', 'Bibliothèque d’apps uniquement']), toggle('Pastilles de notification'), toggle('Afficher la recherche')],
    'En veille': [toggle('En veille'), toggle('Mode Nuit'), toggle('Afficher les notifications')],
    'Fond d’écran': [choice('Fond du simulateur', ['Original', 'Bleu', 'Violet', 'Noir'])],
    'Recherche': [toggle('Afficher les recherches récentes'), toggle('Afficher les suggestions')],
    'Siri': [toggle('Écouter « Siri »', false), toggle('Bouton latéral pour Siri'), choice('Langue', ['Français', 'Anglais'])],
    'Notifications': [choice('Afficher les aperçus', ['Si déverrouillé', 'Toujours', 'Jamais']), choice('Afficher sous forme de', ['Pile', 'Nombre', 'Liste']), ...apps.map(x => link(x, 'Notifications : ' + x))],
    'Sons et vibrations': [{label:'Sonnerie et alertes', type:'range', value:65}, toggle('Utiliser les boutons'), choice('Sonnerie', ['Reflet', 'Ouverture', 'Radar']), choice('Vibrations', ['Toujours', 'En mode silencieux', 'Jamais']), toggle('Clics du clavier')],
    'Concentration': ['Ne pas déranger', 'Repos', 'Travail', 'Temps pour soi'].map(x => link(x)),
    'Temps d’écran': [toggle('Activité dans les apps et sur les sites web', false), link('Temps d’arrêt'), link('Limites d’app'), toggle('Restrictions relatives au contenu', false)],
    'Temps d’arrêt': [toggle('Programmé', false), field('Début', '22:00'), field('Fin', '07:00')],
    'Limites d’app': [toggle('Limites d’app', false), choice('Limite quotidienne', ['1 heure', '2 heures', '3 heures'])],
    'Face ID et code': [info('Face ID', 'Indisponible dans un navigateur'), toggle('Déverrouillage simulé', false), toggle('Centre de contrôle sur écran verrouillé')],
    'Appel d’urgence': [toggle('Appeler avec le bouton latéral', false), info('Appels', 'Aucun appel d’urgence réel depuis ce simulateur')],
    'Confidentialité et sécurité': ['Service de localisation', 'Contacts', 'Photos', 'Microphone', 'Caméra', 'Suivi'].map(x => link(x, 'Autorisation : ' + x)),
    'Cartes et Apple Pay': [info('Paiement', 'Aucune transaction réelle'), toggle('Double-clic sur le bouton latéral')],
    'Game Center': [toggle('Game Center', false), field('Pseudo', 'Joueur')],
    'iCloud': [info('Compte', 'Compte de démonstration'), ...['Photos', 'iCloud Drive', 'Notes', 'Contacts', 'Sauvegarde iCloud'].map(x => toggle(x))],
    'Compte Apple': [info('Compte', 'Yoel Cohen — démonstration'), link('iCloud'), info('Connexion', 'Aucun identifiant Apple demandé')],
    'Apps': apps.map(x => link(x, 'App : ' + x)),
    'Autre réseau…': [field('Nom du réseau', ''), choice('Sécurité', ['WPA2/WPA3', 'Aucune']), info('Connexion', 'Réseau de démonstration uniquement')]
  };
  for (const name of ['Ne pas déranger','Repos','Travail','Temps pour soi']) pages[name] = [toggle('Activer', false), toggle('Partager le statut de concentration'), choice('Notifications autorisées', ['Aucune', 'Contacts', 'Tout le monde'])];
  function definition(title) {
    if (pages[title]) return pages[title];
    if (title.startsWith('Réseau : ')) return [toggle('Connexion auto'), choice('Adresse Wi-Fi privée', ['Fixe', 'Rotation', 'Désactivée']), toggle('Limiter le suivi de l’adresse IP'), choice('Configurer l’IP', ['Automatique', 'Manuel']), field('Adresse IP', '192.168.1.24'), field('Masque de sous-réseau', '255.255.255.0'), field('Routeur', '192.168.1.1'), choice('Configurer le DNS', ['Automatique', 'Manuel']), field('Serveur DNS', '192.168.1.1'), choice('Configurer le proxy', ['Non', 'Manuel', 'Automatique']), {label:'Se connecter à ce réseau',type:'connect'}, {label:'Oublier ce réseau',type:'forget'}];
    if (title.startsWith('Accessoire : ')) return [field('Nom',title.slice(13)), choice('Type d’appareil',['Casque','Enceinte','Autre']), toggle('Connecté',false)];
    if (title.startsWith('App : ')) return [link('Notifications', 'Notifications : '+title.slice(6)), toggle('Actualisation en arrière-plan'), toggle('Données cellulaires'), choice('Langue',['Français','English'])];
    if (title.startsWith('Notifications : ')) return [toggle('Autoriser les notifications'),toggle('Écran verrouillé'),toggle('Centre de notifications'),toggle('Bannières'),toggle('Sons'),toggle('Pastilles')];
    if (title.startsWith('Autorisation : ')) return [toggle(title.slice(15)), ...apps.map(x => toggle(x,false))];
    return [info('État','Non disponible dans cette simulation')];
  }
  window.setupSettingsSimulator = function(root) {
    let route = [], original = root.innerHTML;
    const keyFor = (title, row) => title + '/' + row.label;
    function applyAppearance() {
      root.classList.toggle('sim-dark', get('Luminosité et affichage/Apparence','Claire') === 'Sombre');
      root.classList.toggle('sim-bold',get('Affichage et taille du texte/Texte en gras',false));
      root.classList.toggle('sim-reduced-motion',get('Mouvement/Réduire les animations',false));
    }
    function render() {
      applyAppearance();
      if (!route.length) {
        root.innerHTML = original;
        const search = document.createElement('input');
        search.className = 'sim-search'; search.placeholder = 'Rechercher dans Réglages'; search.setAttribute('aria-label', search.placeholder);
        root.querySelector('h1').after(search);
        search.oninput = () => root.querySelectorAll('.settings-group').forEach(group => {
          let visible = false;
          group.querySelectorAll('.settings-row').forEach(row => { row.hidden = !row.textContent.toLocaleLowerCase('fr').includes(search.value.toLocaleLowerCase('fr')); if (!row.hidden) visible = true; });
          group.hidden = !visible;
        });
        root.querySelector('.profile-card').onclick = () => open('Compte Apple');
        root.querySelectorAll('.settings-row').forEach(row => {
          const label = row.querySelector('.row-label')?.textContent.trim();
          if (!label) return;
          const t = row.querySelector('.toggle');
          row.tabIndex = 0; row.setAttribute('role','button');
          if (t) t.classList.toggle('on',get('Mode Avion',false));
          row.onclick = () => { if (t) { state['Mode Avion'] = !get('Mode Avion',false); save(); render(); } else open(label); };
          row.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); row.click(); } };
        });
        return;
      }
      const title = route.at(-1), rows = definition(title);
      root.innerHTML = `<nav class="sim-nav"><button data-back aria-label="Retour">‹ ${esc(route.length > 1 ? route.at(-2) : 'Réglages')}</button><span>${esc(title.replace(/^(Réseau|App|Notifications|Autorisation|Accessoire) : /,''))}</span></nav><p class="sim-note">${title === 'Wi-Fi' || title === 'Bluetooth' ? 'Appareils et connexions de démonstration. ' : ''}Réglages enregistrés sur ce navigateur.</p><div class="sim-group">${rows.map((row,i) => {
        const key = keyFor(title,row), value = get(key,row.value ?? row.options?.[0] ?? '');
        let control = '<span class="sim-chevron">›</span>';
        if (row.type === 'toggle') control = `<input aria-label="${esc(row.label)}" type="checkbox" ${value ? 'checked' : ''}>`;
        if (row.type === 'choice') control = `<select aria-label="${esc(row.label)}">${row.options.map(x => `<option ${value === x ? 'selected' : ''}>${esc(x)}</option>`).join('')}</select>`;
        if (row.type === 'field') control = `<input aria-label="${esc(row.label)}" type="text" value="${esc(value)}" autocomplete="off">`;
        if (row.type === 'range') control = `<input aria-label="${esc(row.label)}" type="range" min="0" max="100" value="${esc(value)}">`;
        if (row.type === 'info') control = `<span class="sim-value">${esc(value)}</span>`;
        return `<div class="sim-row" data-row="${i}">${row.target || ['reset','connect','forget'].includes(row.type) ? `<button class="sim-link">${esc(row.label)}</button>` : `<span>${esc(row.label)}</span>`}${control}</div>`;
      }).join('')}</div>${title === 'Wi-Fi' ? `<p class="sim-note">Réseau sélectionné : ${esc(get('connectedNetwork','Aucun'))}</p>` : ''}<p class="sim-note" role="status" id="sim-status"></p>`;
      root.querySelector('[data-back]').onclick = () => { route.pop(); render(); };
      root.querySelectorAll('[data-row]').forEach(el => {
        const row = rows[Number(el.dataset.row)], key = keyFor(title,row);
        const input = el.querySelector('input,select');
        if (input) input.onchange = () => { state[key] = input.type === 'checkbox' ? input.checked : input.value; save(); applyAppearance(); };
        const button = el.querySelector('button');
        if (button) button.onclick = () => {
          if (row.target) return open(row.target);
          if (row.type === 'reset') { if (!confirm('Réinitialiser uniquement les réglages de ce simulateur ?')) return; state = {}; save(); route = []; render(); return; }
          if (row.type === 'connect') state.connectedNetwork = title.slice(9);
          if (row.type === 'forget' && get('connectedNetwork','') === title.slice(9)) delete state.connectedNetwork;
          save(); root.querySelector('#sim-status').textContent = row.type === 'connect' ? 'Connexion simulée enregistrée.' : 'Réseau oublié dans le simulateur.';
        };
      });
      root.scrollTop = 0;
    }
    function open(title) { route.push(title); render(); }
    render();
  };
})();
