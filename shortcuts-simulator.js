/* A local shortcut editor/executor. No access to native iOS automation APIs. */
(() => {
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
  const save=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}};
  const colors=['#7057c9','#b34571','#2a7b81','#b66b37','#3974bb'];
  const tabIcons=[
    '<svg viewBox="0 0 28 28" aria-hidden="true"><path d="M3 9l11-7 11 7-11 7zM3 14l11 7 11-7v5l-11 7-11-7z" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="13" r="11" fill="currentColor"/><path d="M9 13l3 3 7-7" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/></svg>',
    '<svg viewBox="0 0 28 28" aria-hidden="true"><rect x="3" y="7" width="22" height="19" rx="4" fill="currentColor"/><path d="M7 3h14M5 5h18" stroke="currentColor" stroke-width="2"/><path d="M14 10l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#000"/></svg>'
  ];
  const types={app:'Ouvrir l’app',text:'Afficher du texte',wifi:'Définir le Wi-Fi',lowpower:'Mode économie d’énergie'};
  window.setupShortcutsSimulator=root=>{
    let shortcuts=read('ios_shortcuts',[]);if(!Array.isArray(shortcuts))shortcuts=[];
    shortcuts=shortcuts.map(s=>({...s,actions:s.actions?.length?s.actions:s.action?[{type:['app','url'].includes(s.action)?'app':'text',value:s.action==='url'?'safari':s.value||s.name}]:[]}));
    let automations=read('ios_shortcuts_automations',[]);if(!Array.isArray(automations))automations=[];
    let tab='Raccourcis', editing=null, query='', result='', selecting=false;const selected=new Set();
    const persist=()=>{const current=shortcuts.find(s=>s.id===editing);if(current)current.updatedAt=Date.now();save('ios_shortcuts',shortcuts);};
    const apps=()=>window.getSimulatorApps?.()||[];
    const actionName=a=>types[a.type]||'Action';
    function run(shortcut) {
      const messages=[];let appToOpen;
      for(const action of shortcut.actions){
        if(action.type==='app'){if(apps().some(a=>a.id===action.value))appToOpen=action.value;messages.push('App prête à être ouverte.');}
        if(action.type==='text')messages.push(String(action.value));
        if(action.type==='wifi'){window.setSimulatedSetting?.('Wi-Fi/Wi-Fi',action.value===true||action.value==='true');messages.push('Wi-Fi simulé modifié.');}
        if(action.type==='lowpower'){window.setSimulatedSetting?.('Batterie/Mode économie d’énergie',action.value===true||action.value==='true');messages.push('Mode économie d’énergie simulé modifié.');}
      }
      result=messages.join(' ')||'Ajoutez une action à ce raccourci.';render();if(appToOpen)window.openApp(appToOpen);
    }
    function create(name='Nouveau raccourci',actions=[]) {
      const shortcut={id:'shortcut-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),name,color:colors[shortcuts.length%colors.length],updatedAt:Date.now(),actions};
      shortcuts.push(shortcut);persist();editing=shortcut.id;result='';render();
    }
    function render() {
      window.hideSystemKeyboard?.();const current=shortcuts.find(s=>s.id===editing);
      if(current)return editor(current);
      root.innerHTML=`<section class="shortcuts-modern"><header class="shm-nav ${tab!=='Raccourcis'?'shm-hidden-nav':''}"><button data-folder aria-label="Afficher les dossiers">‹ Raccourcis</button><div><button data-selection>${selecting?'Terminé':'Sélectionner'}</button><button data-create aria-label="Créer un raccourci">＋</button></div></header><h1>${esc(tab==='Raccourcis'?'Tous les raccourcis':tab)}</h1>${tab==='Raccourcis'?`<input class="shm-search" aria-label="Rechercher un raccourci" placeholder="Recherche" value="${esc(query)}"><div class="shm-grid"></div>${selecting?'<button class="shm-destructive" data-delete-selection>Supprimer la sélection</button>':''}`:tab==='Galerie'?`<p class="shm-description">Des idées pour gagner du temps au quotidien.</p><div class="shm-gallery">${[['Mode économie','lowpower'],['Couper le Wi-Fi','wifi'],['Dire bonjour','text']].map(([name,type],i)=>`<button data-gallery="${type}" style="background:${colors[i]}"><span>✦</span><strong>${name}</strong><small>Ajouter le raccourci ＋</small></button>`).join('')}</div>`:`<p class="shm-description">Créer une automatisation personnelle.</p>${automations.length?'':'<div class="shm-auto-empty"><div aria-hidden="true">✦</div><h2>Aucune automatisation</h2><p>Exécutez vos raccourcis lors d’un événement.</p>'}<button class="shm-primary" data-automation>Nouvelle automatisation</button>${automations.length?'':'</div>'}<div class="shm-auto-list">${automations.map((a,i)=>`<div><span>◷ ${esc(a.trigger)}</span><small>${esc(shortcuts.find(s=>s.id===a.shortcut)?.name||'Raccourci supprimé')}</small><button data-test="${i}" ${shortcuts.some(s=>s.id===a.shortcut)?'':'disabled'}>Tester</button><button data-delete-auto="${i}" aria-label="Supprimer cette automatisation">Supprimer</button></div>`).join('')}</div><p class="shm-description">Les déclencheurs sont simulés et peuvent être testés manuellement.</p>`}<p class="shm-result" role="status">${esc(result)}</p><nav class="shm-tabs" aria-label="Onglets Raccourcis">${['Raccourcis','Automatisation','Galerie'].map((name,i)=>`<button data-tab="${name}" aria-current="${name===tab?'page':'false'}"><span aria-hidden="true">${tabIcons[i]}</span>${name}</button>`).join('')}</nav></section>`;
      root.querySelector('[data-selection]').onclick=()=>{selecting=!selecting;selected.clear();render();};
      root.querySelector('[data-delete-selection]')?.addEventListener('click',()=>{if(!selected.size)return;if(!confirm('Supprimer les raccourcis sélectionnés ?'))return;shortcuts=shortcuts.filter(s=>!selected.has(s.id));persist();selected.clear();selecting=false;render();});
      root.querySelector('[data-create]').onclick=()=>create();root.querySelector('[data-folder]').onclick=folders;
      root.querySelectorAll('[data-tab]').forEach(button=>button.onclick=()=>{tab=button.dataset.tab;result='';render();});
      const search=root.querySelector('.shm-search');if(search){search.oninput=()=>{query=search.value;grid();};grid();}
      root.querySelectorAll('[data-gallery]').forEach(button=>button.onclick=()=>{const type=button.dataset.gallery;create(button.querySelector('strong').textContent,[{type,value:type==='text'?'Bonjour !':type==='lowpower'}]);});
      root.querySelector('[data-automation]')?.addEventListener('click',automationForm);
      root.querySelectorAll('[data-test]').forEach(button=>button.onclick=()=>{const shortcut=shortcuts.find(s=>s.id===automations[Number(button.dataset.test)].shortcut);if(shortcut)run(shortcut);});
      root.querySelectorAll('[data-delete-auto]').forEach(button=>button.onclick=()=>{automations.splice(Number(button.dataset.deleteAuto),1);save('ios_shortcuts_automations',automations);render();});
    }
    function grid(){
      const list=shortcuts.filter(s=>s.name.toLocaleLowerCase('fr').includes(query.toLocaleLowerCase('fr')));
      root.querySelector('.shm-grid').innerHTML=list.length?list.map(s=>`<article class="shm-tile" style="background:${colors.includes(s.color)?s.color:colors[0]}"><div><span aria-hidden="true">✦</span><button data-edit="${esc(s.id)}" aria-label="Modifier ${esc(s.name)}">•••</button></div><button class="shm-tile-run" ${selecting?'data-select':'data-run'}="${esc(s.id)}" ${selecting?'aria-pressed="'+selected.has(s.id)+'"':''}><strong>${selecting&&selected.has(s.id)?'✓ ':''}${esc(s.name)}</strong><small>${s.actions.length} action${s.actions.length>1?'s':''}</small></button></article>`).join(''):'<div class="shm-empty"><span>▧</span><h2>Aucun raccourci</h2><p>Créez un raccourci ou explorez la Galerie.</p><button data-empty-create>Créer un raccourci</button></div>';
      root.querySelectorAll('[data-select]').forEach(button=>button.onclick=()=>{if(selected.has(button.dataset.select))selected.delete(button.dataset.select);else selected.add(button.dataset.select);grid();});
      root.querySelectorAll('[data-edit]').forEach(button=>button.onclick=()=>{editing=button.dataset.edit;result='';render();});root.querySelectorAll('[data-run]').forEach(button=>button.onclick=()=>run(shortcuts.find(s=>s.id===button.dataset.run)));
      root.querySelector('[data-empty-create]')?.addEventListener('click',()=>create());
    }
    function editor(shortcut){
      root.innerHTML=`<section class="shortcuts-modern shm-editor"><header class="shm-nav"><button data-done>Terminé</button><button data-run-editor aria-label="Exécuter le raccourci">▶</button></header><input class="shm-name" aria-label="Nom du raccourci" value="${esc(shortcut.name)}"><p class="shm-description">${shortcut.actions.length} action(s)</p><div class="shm-action-list">${shortcut.actions.map((action,i)=>`<article><span>${esc(actionName(action))}</span><strong>${esc(action.type==='app'?apps().find(a=>a.id===action.value)?.name||'App indisponible':['wifi','lowpower'].includes(action.type)?(action.value===true||action.value==='true'?'Activer':'Désactiver'):String(action.value))}</strong><div><button data-up="${i}" aria-label="Monter l’action ${i+1}" ${i?'':'disabled'}>↑</button><button data-down="${i}" aria-label="Descendre l’action ${i+1}" ${i<shortcut.actions.length-1?'':'disabled'}>↓</button><button data-remove="${i}" aria-label="Supprimer l’action ${i+1}">×</button></div></article>`).join('')}</div><button class="shm-primary" data-add-action>＋ Ajouter une action</button><button class="shm-destructive" data-delete>Supprimer le raccourci</button><p class="shm-result" role="status">${esc(result)}</p></section>`;
      root.querySelector('[data-done]').onclick=()=>{editing=null;render();};root.querySelector('[data-run-editor]').onclick=()=>run(shortcut);
      root.querySelector('.shm-name').onchange=e=>{shortcut.name=e.target.value.trim()||'Nouveau raccourci';persist();};
      root.querySelector('[data-add-action]').onclick=()=>picker(shortcut);root.querySelector('[data-delete]').onclick=()=>{if(!confirm('Supprimer ce raccourci ?'))return;shortcuts=shortcuts.filter(s=>s.id!==shortcut.id);persist();editing=null;render();};
      for(const [attr,delta] of [['up',-1],['down',1]])root.querySelectorAll(`[data-${attr}]`).forEach(button=>button.onclick=()=>{const i=Number(button.dataset[attr]);[shortcut.actions[i],shortcut.actions[i+delta]]=[shortcut.actions[i+delta],shortcut.actions[i]];persist();render();});
      root.querySelectorAll('[data-remove]').forEach(button=>button.onclick=()=>{shortcut.actions.splice(Number(button.dataset.remove),1);persist();render();});
    }
    function modal(title,body){const sheet=document.createElement('section');sheet.className='shm-sheet';sheet.setAttribute('role','dialog');sheet.setAttribute('aria-label',title);sheet.innerHTML=`<header class="shm-nav"><h2>${esc(title)}</h2><button data-close>Fermer</button></header>${body}`;root.querySelector('.shortcuts-modern').append(sheet);sheet.querySelector('[data-close]').onclick=()=>{window.hideSystemKeyboard?.();sheet.remove();};return sheet;}
    function picker(shortcut){
      const sheet=modal('Ajouter une action',`<form><label>Action<select name="type" aria-label="Type d’action">${Object.entries(types).map(([type,name])=>`<option value="${type}">${name}</option>`).join('')}</select></label><div data-value></div><button class="shm-primary" type="submit">Ajouter</button></form>`);
      const form=sheet.querySelector('form'),type=form.elements.type;
      const valueField=()=>{sheet.querySelector('[data-value]').innerHTML=type.value==='app'?`<label>App<select name="value" aria-label="App à ouvrir">${apps().map(a=>`<option value="${esc(a.id)}">${esc(a.name)}</option>`).join('')}</select></label>`:type.value==='text'?'<label>Texte<textarea name="value" aria-label="Texte à afficher" required>Bonjour !</textarea></label>':'<label>État<select name="value" aria-label="État"><option value="true">Activer</option><option value="false">Désactiver</option></select></label>';};type.onchange=valueField;valueField();form.onsubmit=e=>{e.preventDefault();shortcut.actions.push({type:type.value,value:form.elements.value.value});persist();render();};
    }
    function folders(){const sheet=modal('Raccourcis','<button class="shm-list-button" data-all>Tous les raccourcis</button><button class="shm-list-button" data-recent>Modifiés récemment</button>');sheet.querySelector('[data-all]').onclick=()=>{tab='Raccourcis';query='';render();};sheet.querySelector('[data-recent]').onclick=()=>{shortcuts.sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));persist();tab='Raccourcis';render();};}
    function automationForm(){
      if(!shortcuts.length){result='Créez d’abord un raccourci à exécuter.';render();return;}
      const sheet=modal('Nouvelle automatisation',`<form><label>Événement<select name="trigger" aria-label="Événement"><option>Heure de la journée</option><option>Niveau de la batterie</option><option>Chargeur connecté</option><option>Wi-Fi</option></select></label><label>Raccourci<select name="shortcut" aria-label="Raccourci à exécuter">${shortcuts.map(s=>`<option value="${esc(s.id)}">${esc(s.name)}</option>`).join('')}</select></label><p class="shm-description">Scénario de démonstration ; aucun déclenchement réel en arrière-plan.</p><button class="shm-primary">Créer l’automatisation</button></form>`);
      sheet.querySelector('form').onsubmit=e=>{e.preventDefault();const form=e.target;automations.push({trigger:form.elements.trigger.value,shortcut:form.elements.shortcut.value});save('ios_shortcuts_automations',automations);render();};
    }
    render();
  };
})();
