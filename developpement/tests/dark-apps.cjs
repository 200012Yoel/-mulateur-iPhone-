require('node:fs').mkdirSync('developpement/sorties',{recursive:true});
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 const p=await b.newPage({viewport:{width:1200,height:1000}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(require('url').pathToFileURL(require('path').resolve('index.html')).href);
 assert.equal(await p.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(48, 48, 52)');
 await p.evaluate(()=>window.openApp('settings'));
 const root=p.locator('#generic-app-view .app-main-content');
 await root.locator('.settings-row').filter({has:p.getByText('Wi-Fi',{exact:true})}).click();
 await root.getByRole('button',{name:'Informations sur Maison',exact:true}).click();
 assert(await root.getByRole('combobox',{name:'Configurer le DNS'}).count());
 await root.locator('[data-back]').click();await root.getByRole('checkbox',{name:'Wi-Fi',exact:true}).uncheck();
 assert.equal(await root.locator('[data-network]').count(),0);
 await root.getByRole('checkbox',{name:'Wi-Fi',exact:true}).check();
 assert.equal(await root.locator('[data-network]').count(),4);
 await p.screenshot({path:'developpement/sorties/wifi-dark.png'});
 await root.getByRole('button',{name:'Maison',exact:true}).click();
 await root.getByLabel('Mot de passe de démonstration').fill('demo12345');
 await root.getByRole('button',{name:'Rejoindre',exact:true}).click();
 assert.match(await root.innerText(),/Réseau sélectionné : Maison/);
 await root.locator('[data-back]').click();
 await root.locator('.settings-row').filter({has:p.getByText('Apple Intelligence et Siri',{exact:true})}).click();
 await root.getByRole('button',{name:'Parler et écrire à Siri',exact:true}).click();
 assert(await root.getByRole('checkbox',{name:'Écrire à Siri',exact:true}).count());await root.locator('[data-back]').click();
 await p.screenshot({path:'developpement/sorties/intelligence-dark.png'});
 await p.evaluate(()=>document.getElementById('wifi-menu-settings-btn-row').click());
 assert.equal(await root.locator('.sim-page-title').innerText(),'Wi-Fi');
 for(const app of ['phone','contacts','imessage','music','appstore','galerie','wallet','clock','camera','maps','youtube','instagram','shortcuts','safari','intelligence']){
  await p.evaluate(id=>window.openApp(id),app);await p.waitForTimeout(150);
  const colors=await p.locator('#generic-app-view').evaluate(el=>({background:getComputedStyle(el).backgroundColor,color:getComputedStyle(el).color}));
  assert.equal(colors.background,'rgb(0, 0, 0)',app);
 }
 const externalErrors=errors.filter(e=>e.includes('https://esm.sh/leaflet@'));
 assert.equal(errors.length-externalErrors.length,0,errors.join('\n'));if(externalErrors.length)console.log('LIMITATION: import cartographique externe inaccessible dans cet environnement.');console.log('PASS: fond gris, Wi-Fi depuis Réglages, bouton informations, interrupteur Wi-Fi, sous-menus Siri et 15 applications : surfaces sombres ; aucune nouvelle erreur JavaScript.');
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});

