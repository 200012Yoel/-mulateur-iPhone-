(() => {
  window.captureSimulatorApp = appView => {
    if(!appView?.classList.contains('active') || !appView.dataset.appId)return;
    const content=appView.querySelector('.app-main-content');if(!content?.innerHTML.trim())return;
    const clone=appView.cloneNode(true), screen=document.querySelector('.iphone-screen');
    // Descendant IDs stay inside the snapshot shadow root, preserving ID-based styles.
    clone.removeAttribute('id');
    clone.querySelectorAll('script,.app-switcher').forEach(el=>el.remove());
    clone.querySelectorAll('input,textarea,select,button').forEach(el=>{el.disabled=true;el.tabIndex=-1;});
    clone.style.cssText=`position:absolute;inset:0;width:${screen?.offsetWidth||390}px;height:${screen?.offsetHeight||844}px;pointer-events:none;overflow:hidden;`;
    clone.dataset.snapshotScroll=String(content.scrollTop);
    window.appSnapshots=window.appSnapshots||{};window.appSnapshots[appView.dataset.appId]=clone.outerHTML;
  };
})();

// Apply a small set of device-wide preferences to the simulated phone.
(() => {
  function apply(){
    let preferences={};try{preferences=JSON.parse(localStorage.getItem('iphone.settings.v1')||'{}');}catch{}
    const phone=document.querySelector('.iphone-screen');if(!phone)return;
    phone.classList.toggle('sim-system-reduced-motion',Boolean(preferences['Mouvement/Réduire les animations']));
    phone.classList.toggle('sim-system-low-power',Boolean(preferences['Batterie/Mode économie d’énergie']));
    phone.classList.toggle('sim-system-bold',Boolean(preferences['Affichage et taille du texte/Texte en gras']));
    let dimmer=phone.querySelector(':scope > .sim-system-dimmer');if(!dimmer){dimmer=document.createElement('div');dimmer.className='sim-system-dimmer';dimmer.setAttribute('aria-hidden','true');phone.append(dimmer);}
    const brightness=Number(preferences['Luminosité et affichage/Luminosité']??80);dimmer.style.opacity=String(Math.max(0,Math.min(.65,(80-brightness)/100)));
  }
  window.addEventListener('simulated-settings-changed',apply);window.addEventListener('storage',apply);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();
