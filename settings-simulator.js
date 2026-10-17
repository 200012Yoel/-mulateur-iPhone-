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
    'Apple Intelligence et Siri': [toggle('Apple Intelligence'), link('Parler et écrire à Siri'), choice('Langue', ['Français (France)', 'English (United States)']), choice('Voix', ['Voix 1', 'Voix 2']), link('Réponses de Siri'), toggle('Autoriser Siri lorsque verrouillé'), link('ChatGPT'), link('Rapport Apple Intelligence')],
    'Parler et écrire à Siri': [choice('Détecter', ['« Siri » ou « Dis Siri »', '« Dis Siri »', 'Non']), toggle('Bouton latéral pour Siri'), toggle('Écrire à Siri')],
    'Réponses de Siri': [choice('Réponses vocales', ['Automatiques', 'Privilégier les réponses silencieuses', 'Privilégier les réponses énoncées']), toggle('Toujours afficher les sous-titres de Siri'), toggle('Toujours afficher la demande')],
    'ChatGPT': [toggle('Utiliser ChatGPT', false), toggle('Confirmer les demandes à ChatGPT'), info('Compte', 'Non connecté — démonstration')],
    'Rapport Apple Intelligence': [choice('Durée du rapport', ['15 minutes', '7 jours', 'Désactivé']), info('Rapport', 'Aucune requête envoyée depuis ce menu de démonstration')],
    'Bluetooth': [toggle('Bluetooth'), link('AirPods', 'Accessoire : AirPods'), link('Enceinte', 'Accessoire : Enceinte')],
    'Données cellulaires': [toggle('Données cellulaires', false), choice('Options', ['Standard', 'Économie de données']), toggle('Données à l’étranger', false), info('Période en cours', '0 octet')],
    'Partage de connexion': [toggle('Autoriser d’autres utilisateurs', false), field('Mot de passe Wi-Fi', 'simulateur123'), toggle('Maximiser la compatibilité', false)],
    'Batterie': [toggle('Pourcentage de la batterie'), toggle('Mode économie d’énergie', false), link('État de santé et recharge'), info('Niveau de batterie', '100 %'), info('Activité', 'Aucune mesure matérielle')],
    'État de santé et recharge': [info('Capacité maximum', '100 % (simulation)'), toggle('Recharge optimisée de la batterie')],
    'Général': ['Informations', 'Mise à jour logicielle', 'Stockage iPhone', 'AirDrop', 'AirPlay et Continuité', 'Image dans l’image', 'Date et heure', 'Clavier', 'Langue et région', 'VPN et gestion de l’appareil', 'Transférer ou réinitialiser l’iPhone'].map(x => link(x)),
    'Informations': [field('Nom', 'iPhone de Yoel'), info('Version du système', 'Simulateur web — thème iOS'), info('Nom du modèle', 'iPhone simulé'), info('Capacité', '128 Go (simulation)')],
    'Mises à jour automatiques': [toggle('Télécharger les mises à jour iOS'), toggle('Installer les mises à jour iOS'), toggle('Réponses de sécurité et fichiers système')],
    'Mises à jour bêta': [choice('Programme bêta', ['Non', 'iOS Developer Beta (démo)', 'iOS Public Beta (démo)']), info('Compte Apple', 'Compte de démonstration')],
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
    'Luminosité et affichage': [choice('Apparence', ['Sombre']), toggle('Automatique', false), {label:'Luminosité', type:'range', value:80}, toggle('True Tone'), toggle('Night Shift', false), choice('Verrouillage automatique', ['30 secondes', '1 minute', '2 minutes', '5 minutes', 'Jamais']), {label:'Taille du texte', type:'range', value:50}],
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
    'Autre réseau…': [field('Nom du réseau', ''), choice('Sécurité', ['WPA2/WPA3', 'Aucune']), {label:'Rejoindre ce réseau',type:'custom-network'}]
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
  window.setupSettingsSimulator = function(root, initialPage) {
    root.querySelectorAll('.sim-search,.sim-home-value').forEach(el=>el.remove());
    const session = Symbol('settings'); root.settingsSession = session;
    let updateTimer;
    let route = initialPage ? [initialPage] : [], original = root.innerHTML;
    const optionPages = new Map();
    const keyFor = (title, row) => title + '/' + row.label;
    function applyAppearance() {
      root.classList.add('sim-dark');
      root.classList.toggle('sim-bold',get('Affichage et taille du texte/Texte en gras',false));
      root.classList.toggle('sim-reduced-motion',get('Mouvement/Réduire les animations',false));
      root.classList.toggle('sim-solid',get('Affichage et taille du texte/Réduire la transparence',false));
      root.classList.toggle('sim-high-contrast',get('Affichage et taille du texte/Augmenter le contraste',false));
    }
    function render() {
      clearTimeout(updateTimer);
      if(window.hideSystemKeyboard)window.hideSystemKeyboard();
      applyAppearance();
      if (!route.length) {
        root.innerHTML = original;
        const siri = [...root.querySelectorAll('.row-label')].find(el => el.textContent.trim() === 'Siri');
        if (siri) siri.textContent = 'Apple Intelligence et Siri';
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
          if (label === 'Wi-Fi') {
            const value = document.createElement('span'); value.className='sim-home-value';
            value.textContent=get('Wi-Fi/Wi-Fi',true)?get('connectedNetwork','SFR-d340_5GHz'):'Non';
            row.querySelector('.chevron-row')?.before(value);
          }
          row.tabIndex = 0; row.setAttribute('role','button');
          if (t) t.classList.toggle('on',get('Mode Avion',false));
          row.onclick = () => { if (t) { state['Mode Avion'] = !get('Mode Avion',false); save(); render(); } else open(label); };
          row.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); row.click(); } };
        });
        return;
      }
      const title = route.at(-1), rows = definition(title);
      if (title === 'Wi-Fi') return renderWifi();
      if (title === 'Mise à jour logicielle') return renderUpdate();
      if (optionPages.has(title)) return renderOptions(optionPages.get(title));
      root.innerHTML = `<nav class="sim-nav"><button data-back aria-label="Retour">‹ ${esc(route.length > 1 ? route.at(-2) : 'Réglages')}</button><span>${esc(title.replace(/^(Réseau|App|Notifications|Autorisation|Accessoire) : /,''))}</span></nav>${title === 'Apple Intelligence et Siri' ? '<header class="sim-ai-hero"><div class="sim-ai-orb">✦</div><h2>Apple Intelligence<br>et Siri</h2><p>Une intelligence personnelle, intégrée à votre iPhone.</p></header>' : ''}<p class="sim-note">Réglages enregistrés sur ce navigateur. ${title === 'Apple Intelligence et Siri' ? 'Interface de démonstration ; les services Apple ne sont pas connectés.' : ''}</p><div class="sim-group">${rows.map((row,i) => {
        const key = keyFor(title,row), value = get(key,row.value ?? row.options?.[0] ?? '');
        let control = '<span class="sim-chevron">›</span>';
        if (row.type === 'toggle') control = `<input aria-label="${esc(row.label)}" type="checkbox" ${value ? 'checked' : ''}>`;
        if (row.type === 'choice') control = `<select aria-label="${esc(row.label)}">${row.options.map(x => `<option ${value === x ? 'selected' : ''}>${esc(x)}</option>`).join('')}</select>`;
        if (row.type === 'field') control = `<input aria-label="${esc(row.label)}" type="text" value="${esc(value)}" autocomplete="off">`;
        if (row.type === 'range') control = `<input aria-label="${esc(row.label)}" type="range" min="0" max="100" value="${esc(value)}">`;
        if (row.type === 'info') control = `<span class="sim-value">${esc(value)}</span>`;
        const groups = title.startsWith('Réseau : ') ? {1:'CONFIDENTIALITÉ',3:'ADRESSE IPV4',7:'DNS',9:'PROXY HTTP',10:'RÉSEAU'} : title === 'Général' ? {3:'CONNECTIVITÉ',6:'LANGUE ET SAISIE',10:'GESTION'} : title === 'Apple Intelligence et Siri' ? {1:'SIRI',6:'EXTENSIONS'} : title === 'Mises à jour automatiques' ? {2:'FICHIERS SYSTÈME'} : {};
        const section = groups[i];
        if (row.type === 'info' || ['connect','forget','custom-network','reset'].includes(row.type)) control = row.type === 'info' ? control : '';
        return `${section ? '</div><h3 class="sim-section-label">'+section+'</h3><div class="sim-group">' : ''}<div class="sim-row" data-row="${i}">${row.target || row.type === 'choice' || ['reset','connect','forget','custom-network'].includes(row.type) ? `<button class="sim-link ${row.type === 'forget' || row.type === 'reset' ? 'sim-destructive' : ''}">${esc(row.label)}</button>` : `<span>${esc(row.label)}</span>`}${control}</div>`;
      }).join('')}</div>${title === 'Wi-Fi' ? `<p class="sim-note">Réseau sélectionné : ${esc(get('connectedNetwork','Aucun'))}</p>` : ''}<p class="sim-note" role="status" id="sim-status"></p>`;
      root.querySelector('[data-back]').onclick = () => { route.pop(); render(); };
      root.querySelectorAll('[data-row]').forEach(el => {
        const row = rows[Number(el.dataset.row)], key = keyFor(title,row);
        const input = el.querySelector('input,select');
        if (input) input.onchange = () => { state[key] = input.type === 'checkbox' ? input.checked : input.value; save(); applyAppearance(); };
        const button = el.querySelector('button');
        if (button) button.onclick = () => {
          if (row.target) return open(row.target);
          if (row.type === 'choice') {
            const target = title + ' › ' + row.label;
            optionPages.set(target,{title:row.label, key, options:row.options}); return open(target);
          }
          if (row.type === 'reset') { if (!confirm('Réinitialiser uniquement les réglages de ce simulateur ?')) return; state = {}; save(); route = []; render(); return; }
          if (row.type === 'custom-network') {
            const name=get('Autre réseau…/Nom du réseau','').trim();
            if (!name) { root.querySelector('#sim-status').textContent='Saisissez le nom du réseau.'; return; }
            state.customNetworks=[...new Set([...get('customNetworks',[]),name])];state.knownNetworks=[...new Set([...get('knownNetworks',['SFR-d340_5GHz']),name])];state.connectedNetwork=name;save();route.pop();render();return;
          }
          if (row.type === 'connect') { state.connectedNetwork = title.slice(9); state.knownNetworks=[...new Set([...get('knownNetworks',['SFR-d340_5GHz']),title.slice(9)])]; }
          if (row.type === 'forget') {
            if (!confirm('Oublier « '+title.slice(9)+' » dans le simulateur ?')) return;
            if (get('connectedNetwork','SFR-d340_5GHz') === title.slice(9)) state.connectedNetwork='';
            state.knownNetworks=get('knownNetworks',['SFR-d340_5GHz']).filter(n=>n!==title.slice(9));
          }
          save(); root.querySelector('#sim-status').textContent = row.type === 'connect' ? 'Connexion simulée enregistrée.' : 'Réseau oublié dans le simulateur.';
        };
      });
      root.scrollTop = 0;
    }
    function nav(title, parent = 'Réglages') {
      return `<nav class="sim-nav"><button data-back aria-label="Retour">‹ ${esc(parent)}</button><span>${esc(title)}</span></nav>`;
    }
    function backButton() { root.querySelector('[data-back]').onclick=()=>{route.pop();render();}; }
    function renderOptions(page) {
      const value=get(page.key,page.options[0]);
      const prefix=page.key.slice(0,page.key.lastIndexOf('/'));
      let fields=[];
      if(value==='Manuel') {
        if(page.title==='Configurer l’IP')fields=[['Adresse IP','192.168.1.24'],['Masque de sous-réseau','255.255.255.0'],['Routeur','192.168.1.1']];
        if(page.title==='Configurer le DNS')fields=[['Serveur DNS','192.168.1.1'],['Domaine de recherche','']];
        if(page.title==='Configurer le proxy')fields=[['Serveur',''],['Port','8080']];
      }
      if(value==='Automatique' && page.title==='Configurer le proxy')fields=[['URL du fichier PAC','']];
      root.innerHTML=nav(page.title)+`<h1 class="sim-page-title">${esc(page.title)}</h1><div class="sim-group" role="radiogroup" aria-label="${esc(page.title)}">${page.options.map((option,i)=>`<button class="sim-option-row" role="radio" aria-checked="${value===option}" tabindex="${value===option?0:-1}" data-option="${i}"><span>${esc(option)}</span><span class="sim-check" aria-hidden="true">${value===option?'✓':''}</span></button>`).join('')}</div>${fields.length?`<h3 class="sim-section-label">CONFIGURATION</h3><div class="sim-group">${fields.map(([label,fallback])=>`<label class="sim-row"><span>${esc(label)}</span><input type="text" aria-label="${esc(label)}" data-config="${esc(label)}" value="${esc(get(prefix+'/'+label,fallback))}" autocomplete="off" spellcheck="false"></label>`).join('')}</div>`:''}<p class="sim-note">Le choix est conservé pour cette simulation.</p>`;
      backButton();root.querySelectorAll('[data-option]').forEach(button=>{
        button.onclick=()=>{state[page.key]=page.options[Number(button.dataset.option)];save();render();root.querySelector(`[data-option="${button.dataset.option}"]`).focus();};
        button.onkeydown=e=>{if(!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(e.key))return;e.preventDefault();const next=(Number(button.dataset.option)+(['ArrowDown','ArrowRight'].includes(e.key)?1:-1)+page.options.length)%page.options.length;root.querySelector(`[data-option="${next}"]`).click();};
      });
      root.querySelectorAll('[data-config]').forEach(input=>input.onchange=()=>{state[prefix+'/'+input.dataset.config]=input.value;save();});root.scrollTop=0;
    }
    function renderUpdate() {
      const now=Date.now(), downloadStarted=get('update/downloadStarted',0), installStarted=get('update/installStarted',0);
      let phase=get('update/installed',false)?'installed':'available', percent=0;
      if (installStarted && !get('update/installed',false)) {
        percent=Math.min(100,Math.floor((now-installStarted)/60));phase='installing';
        if(percent===100){state['update/installed']=true;save();phase='installed';}
      } else if(downloadStarted && phase!=='installed') {
        const elapsed=now-downloadStarted;
        phase=elapsed<8000?'downloading':elapsed<12000?'preparing':'ready';
        percent=phase==='downloading'?Math.min(100,Math.floor(elapsed/80)):phase==='preparing'?Math.min(100,Math.floor((elapsed-8000)/40)):100;
      }
      const busy=['downloading','preparing','installing'].includes(phase);
      const labels={available:'Une mise à jour est disponible',downloading:'Téléchargement…',preparing:'Préparation de la mise à jour…',ready:'Prête à être installée',installing:'Installation…',installed:'Votre iPhone est à jour'};
      root.innerHTML=nav('Mise à jour logicielle','Général')+`<div data-update-screen><div class="sim-group"><button class="sim-option-row" data-auto><span>Mises à jour automatiques</span><span class="sim-value">${get('Mises à jour automatiques/Installer les mises à jour iOS',true)?'Oui':'Non'} ›</span></button><button class="sim-option-row" data-beta><span>Mises à jour bêta</span><span class="sim-value">${esc(get('Mises à jour bêta/Programme bêta','Non'))} ›</span></button></div><article class="sim-update-card"><div class="sim-update-icon" aria-hidden="true">27</div><h1>iOS 27</h1><p class="sim-update-caption">Mise à jour de démonstration</p><p class="sim-update-state" role="status" aria-live="polite">${labels[phase]}</p>${busy?`<progress max="100" value="${percent}" aria-label="${labels[phase]}"></progress><p class="sim-note">${percent} % · Simulation locale</p>`:''}${phase==='installed'?'<div class="sim-update-check" aria-hidden="true">✓</div>':'<p>Une interface plus fluide, des contrôles translucides et des menus repensés pour votre simulateur.</p><button class="sim-inline-link" data-notes>En savoir plus</button>'}</article>${phase==='available'?'<button class="sim-primary" data-download>Mettre à jour maintenant</button><button class="sim-secondary" data-tonight>Mettre à jour cette nuit</button>':phase==='ready'?'<button class="sim-primary" data-install>Installer maintenant</button>':busy?'<button class="sim-secondary" data-cancel-update>Annuler la simulation</button>':'<button class="sim-secondary" data-recheck>Rechercher des mises à jour</button>'}<p class="sim-note sim-centered">Aucune mise à jour Apple n’est téléchargée. Cette démonstration ne modifie que l’état du simulateur.</p><p class="sim-note" role="status" id="sim-status"></p></div>`;
      if(phase==='available' && get('update/scheduled',false))root.querySelector('#sim-status').textContent='Choix « cette nuit » enregistré. Relancez manuellement la démonstration quand vous le souhaitez.';
      backButton();root.querySelector('[data-auto]').onclick=()=>open('Mises à jour automatiques');root.querySelector('[data-beta]').onclick=()=>open('Mises à jour bêta');
      const bind=(selector,handler)=>{const el=root.querySelector(selector);if(el)el.onclick=handler;};
      bind('[data-download]',()=>{state['update/downloadStarted']=Date.now();delete state['update/scheduled'];save();render();});
      bind('[data-install]',()=>{state['update/installStarted']=Date.now();save();render();});
      bind('[data-cancel-update]',()=>{delete state['update/downloadStarted'];delete state['update/installStarted'];save();render();});
      bind('[data-tonight]',()=>{state['update/scheduled']=true;save();root.querySelector('#sim-status').textContent='Choix « cette nuit » enregistré. Relancez la démonstration avec « Mettre à jour maintenant » quand vous le souhaitez.';});
      bind('[data-notes]',()=>open('À propos de cette mise à jour'));
      pages['À propos de cette mise à jour']=[info('Interface','Liquid Glass sombre'),info('Wi-Fi','Réseaux, IP, DNS et proxy'),info('Installation','Simulation locale, sans téléchargement iOS')];
      bind('[data-recheck]',()=>{root.querySelector('#sim-status').textContent='Recherche terminée : votre simulateur est à jour.';});
      if(busy)updateTimer=setTimeout(()=>{if(root.isConnected && root.settingsSession===session && route.at(-1)==='Mise à jour logicielle' && root.querySelector('[data-update-screen]'))render();},250);
    }
    function renderWifi() {
      const enabled = get('Wi-Fi/Wi-Fi',true), connected = get('connectedNetwork','SFR-d340_5GHz');
      const networks = [...new Set(['SFR-d340_5GHz','Maison','Atelier','Invités',...get('customNetworks',[])])];
      const networkRow = name => `<div class="sim-network"><button class="sim-network-name" data-network="${esc(name)}">${connected === name ? '<span class="sim-check">✓</span>' : ''}<span>${esc(name)}</span></button><span class="sim-signal" aria-label="Réseau sécurisé"><svg viewBox="0 0 16 20" width="10" height="13" aria-hidden="true"><rect x="2" y="8" width="12" height="10" rx="2" fill="currentColor"/><path d="M4 8V5a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/></svg> <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M9 16a5 5 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="12" cy="20" r="1.5" fill="currentColor"/></svg></span><button class="sim-info" data-info="${esc(name)}" aria-label="Informations sur ${esc(name)}">i</button></div>`;
      root.innerHTML = `<nav class="sim-nav"><button data-back aria-label="Retour">‹ Réglages</button><span>Wi-Fi</span><button data-edit>Modifier</button></nav><h1 class="sim-page-title">Wi-Fi</h1><div class="sim-group"><label class="sim-row"><span>Wi-Fi</span><input type="checkbox" aria-label="Wi-Fi" ${enabled?'checked':''}></label>${enabled && connected ? networkRow(connected):''}</div>${enabled?`<h3 class="sim-section-label">Réseaux <span class="sim-spinner" aria-label="Recherche de réseaux"></span></h3><div class="sim-group">${networks.filter(n=>n!==connected).map(networkRow).join('')}<div class="sim-row"><button class="sim-link" data-other>Autre…</button></div></div><div class="sim-group sim-spaced"><div class="sim-row"><button class="sim-link" data-ask>Confirmer l’accès</button><select aria-label="Confirmer l’accès">${['Demander','Notifier','Non'].map(n=>`<option ${get('Wi-Fi/Confirmer l’accès','Demander')===n?'selected':''}>${n}</option>`).join('')}</select></div><div class="sim-row"><button class="sim-link" data-hotspot>Connexion auto aux partages</button><span class="sim-value">${esc(get('Wi-Fi/Connexion auto aux partages','Demander'))} ›</span></div></div><p class="sim-note">Les réseaux connus sont rejoints automatiquement. Si aucun réseau connu n’est disponible, vous pouvez choisir un réseau.</p>`:'<p class="sim-note">Le Wi-Fi est désactivé.</p>'}<p class="sim-note">Réseau sélectionné : ${esc(enabled ? connected || 'Aucun' : 'Aucun')}<br>Réseaux de démonstration.</p>`;
      root.querySelector('[data-back]').onclick = () => { route.pop(); render(); };
      root.querySelector('[data-edit]').onclick = () => open('Réseaux connus');
      pages['Réseaux connus'] = get('knownNetworks',['SFR-d340_5GHz']).map(n=>link(n,'Réseau : '+n));
      if(!pages['Réseaux connus'].length)pages['Réseaux connus']=[info('Réseaux connus','Aucun réseau mémorisé')];
      root.querySelector('input').onchange = e => {state['Wi-Fi/Wi-Fi']=e.target.checked;save();render();};
      root.querySelectorAll('[data-info]').forEach(b=>b.onclick=()=>open('Réseau : '+b.dataset.info));
      root.querySelectorAll('[data-network]').forEach(b=>b.onclick=()=>{
        if (b.dataset.network === connected) return open('Réseau : '+connected);
        const sheet=document.createElement('section');sheet.className='sim-join';sheet.setAttribute('role','dialog');sheet.setAttribute('aria-label','Rejoindre '+b.dataset.network);
        sheet.innerHTML=`<form><nav class="sim-nav"><button type="button" data-cancel>Annuler</button><span>Mot de passe</span><button type="submit">Rejoindre</button></nav><h2>Rejoindre « ${esc(b.dataset.network)} »</h2><p class="sim-note">Réseau simulé : utilisez un mot de passe fictif. Aucune connexion réelle.</p><div class="sim-group"><label class="sim-row"><span>Mot de passe</span><input aria-label="Mot de passe de démonstration" type="password" required minlength="8" autocomplete="off" placeholder="8 caractères minimum"></label></div></form>`;
        root.append(sheet);sheet.querySelector('[data-cancel]').onclick=()=>sheet.remove();
        sheet.querySelector('form').onsubmit=e=>{e.preventDefault();state.connectedNetwork=b.dataset.network;state.knownNetworks=[...new Set([...get('knownNetworks',['SFR-d340_5GHz']),b.dataset.network])];save();render();};
        sheet.querySelector('input').focus();
      });
      const other=root.querySelector('[data-other]'); if(other)other.onclick=()=>open('Autre réseau…');
      const select=root.querySelector('select');if(select)select.onchange=()=>{state['Wi-Fi/Confirmer l’accès']=select.value;save();};
      for(const [selector,label,options] of [['[data-ask]','Confirmer l’accès',['Demander','Notifier','Non']],['[data-hotspot]','Connexion auto aux partages',['Demander','Automatique','Jamais']]]) {
        const button=root.querySelector(selector);if(button)button.onclick=()=>{const target='Wi-Fi › '+label;optionPages.set(target,{title:label,key:'Wi-Fi/'+label,options});open(target);};
      }
      root.scrollTop=0;
    }
    function open(title) {
      const normalize=value=>value.replace(/['’]/g,'’');
      route.push(Object.keys(pages).find(key=>normalize(key)===normalize(title)) || title);render();
    }
    render();
  };
})();
