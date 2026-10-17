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
