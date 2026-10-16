const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true, ...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
 const page=await browser.newPage({viewport:{width:420,height:850}});
 await page.goto(require('url').pathToFileURL(require('path').resolve('index.html')).href);
 const source=fs.readFileSync('index.html','utf8');
 const raw=source.split('var settingsTemplate = `')[1].split('`;')[0].replace(/\$\{[^}]+\}/g,'');
 const template=Function('return `'+raw+'`')();
 await page.evaluate(html=>{document.body.innerHTML='<div class="app-view active settings-active"><div class="app-main-content" id="test-root" style="position:fixed;inset:0;overflow:auto;height:100vh;box-sizing:border-box"></div></div>'; const root=document.querySelector('#test-root');root.innerHTML=html;window.setupSettingsSimulator(root)},template);
 const root=page.locator('#test-root');
 const names=await root.locator('.row-label').allTextContents();
 for(const name of names){if(name==='Mode Avion')continue; await root.locator('.settings-row').filter({has:page.getByText(name,{exact:true})}).click();assert(await root.locator('.sim-nav').count(),name);await root.locator('[data-back]').click()}
 await root.locator('.settings-row').filter({has:page.getByText('Wi-Fi',{exact:true})}).click();
 await root.getByRole('button',{name:'Maison',exact:true}).click();
 await root.getByRole('combobox',{name:'Configurer le DNS'}).selectOption('Manuel');
 await root.getByRole('button',{name:'Se connecter à ce réseau',exact:true}).click();
 assert.match(await root.innerText(),/Connexion simulée enregistrée/);
 await root.locator('[data-back]').click();assert.match(await root.innerText(),/Réseau sélectionné : Maison/);
 await root.locator('[data-back]').click();
 await root.locator('.sim-search').fill('Bluetooth');assert.equal(await root.locator('.settings-row:visible').count(),1);
 await root.locator('.sim-search').fill('');
 await root.locator('.settings-row').filter({has:page.getByText('Luminosité et affichage',{exact:true})}).click();await root.getByRole('combobox',{name:'Apparence',exact:true}).selectOption('Sombre');assert(await root.evaluate(el=>el.classList.contains('sim-dark')));
 await root.locator('[data-back]').click();

 await page.reload();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('iphone.settings.v1')));assert.equal(saved['Réseau : Maison/Configurer le DNS'],'Manuel');assert.equal(saved.connectedNetwork,'Maison');assert.equal(saved['Luminosité et affichage/Apparence'],'Sombre');
 console.log('PASS: '+(names.length-1)+' rubriques, Wi-Fi, DNS, connexion, recherche, thème et persistance après rechargement.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

