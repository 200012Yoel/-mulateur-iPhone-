/* Styles et logique regroupés pour cette application. */
(() => {const style=document.createElement('style');style.dataset.application="photos";style.textContent="\n        #gallery-app-container {\n            --bg: #ffffff;\n            --surface: #f2f2f7;\n            --surface2: #e5e5e7;\n            --text: #000000;\n            --text2: rgba(0, 0, 0, 0.55);\n            --accent: #007aff;\n            --warn: #ff9500;\n            --tab-h: 82px;\n            --gap: 2px;\n\n            display: flex;\n            flex-direction: column;\n            height: 100%;\n            background: var(--bg);\n            color: var(--text);\n            position: absolute;\n            inset: 0;\n            overflow: hidden;\n            border-radius: 44px;\n        }\n\n        .gallery-header {\n            padding: 60px 16px 12px;\n            flex-shrink: 0;\n        }\n\n        .header-top {\n            display: flex;\n            justify-content: space-between;\n            align-items: flex-start;\n            margin-bottom: 4px;\n        }\n\n        .gallery-title {\n            font-size: 34px;\n            font-weight: 700;\n            letter-spacing: -0.5px;\n        }\n\n        .header-btns {\n            display: flex;\n            gap: 10px;\n            align-items: center;\n            margin-top: 6px;\n        }\n\n        .header-btn {\n            background: var(--surface2);\n            border: none;\n            color: var(--text);\n            width: 34px;\n            height: 34px;\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            font-size: 14px;\n            cursor: pointer;\n            transition: opacity 0.15s;\n        }\n\n        .header-btn:active {\n            opacity: 0.6;\n        }\n\n        .select-btn {\n            background: var(--surface2);\n            border: none;\n            color: var(--text);\n            padding: 7px 16px;\n            border-radius: 20px;\n            font-size: 15px;\n            font-weight: 600;\n            cursor: pointer;\n            transition: opacity 0.15s;\n        }\n\n        .select-btn:active {\n            opacity: 0.6;\n        }\n\n        .storage-warning {\n            display: flex;\n            align-items: center;\n            gap: 6px;\n            font-size: 13px;\n            color: var(--text2);\n            padding: 0 0 2px;\n        }\n\n        .storage-warning span {\n            font-size: 14px;\n        }\n\n        /* SCROLL CONTAINER */\n        .scroll-area {\n            flex: 1;\n            overflow-y: auto;\n            overflow-x: hidden;\n            -webkit-overflow-scrolling: touch;\n            scroll-behavior: smooth;\n            padding-bottom: 100px;\n        }\n\n        .scroll-area::-webkit-scrollbar {\n            display: none;\n        }\n\n        /* DATE SECTION */\n        .date-section {\n            margin-bottom: 2px;\n        }\n\n        .date-label {\n            padding: 16px 16px 8px;\n            font-size: 20px;\n            font-weight: 700;\n            letter-spacing: -0.3px;\n            position: sticky;\n            top: 0;\n            background: rgba(255, 255, 255, 0.85);\n            backdrop-filter: blur(20px);\n            -webkit-backdrop-filter: blur(20px);\n            z-index: 10;\n        }\n\n        .date-sublabel {\n            font-size: 13px;\n            color: var(--text2);\n            font-weight: 400;\n            margin-left: 6px;\n        }\n\n        /* PHOTO GRID */\n        .photo-grid {\n            display: grid;\n            grid-template-columns: repeat(4, 1fr);\n            gap: var(--gap);\n        }\n\n        .photo-cell {\n            aspect-ratio: 1;\n            position: relative;\n            overflow: hidden;\n            cursor: pointer;\n        }\n\n        .photo-content {\n            width: 100%;\n            height: 100%;\n            transition: filter 0.15s;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            background: var(--surface);\n        }\n\n        .photo-content img {\n            width: 100%;\n            height: 100%;\n            object-fit: cover;\n        }\n\n        .photo-cell:active .photo-content {\n            filter: brightness(0.7);\n        }\n\n        .video-badge {\n            position: absolute;\n            bottom: 6px;\n            right: 6px;\n            background: rgba(0, 0, 0, 0.55);\n            color: #fff;\n            font-size: 11px;\n            font-weight: 600;\n            padding: 2px 6px;\n            border-radius: 4px;\n            display: flex;\n            align-items: center;\n            gap: 3px;\n        }\n\n        .video-badge::before {\n            content: '▶';\n            font-size: 9px;\n        }\n\n        /* TAB BAR */\n        .gallery-tab-bar {\n            height: var(--tab-h);\n            background: rgba(249, 249, 249, 0.94);\n            backdrop-filter: blur(30px);\n            -webkit-backdrop-filter: blur(30px);\n            border-top: 0.5px solid rgba(0, 0, 0, 0.1);\n            display: flex;\n            align-items: flex-start;\n            padding-top: 10px;\n            flex-shrink: 0;\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            right: 0;\n            z-index: 50;\n            padding-bottom: 25px;\n        }\n\n        .tab-item {\n            flex: 1;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            gap: 4px;\n            cursor: pointer;\n        }\n\n        .tab-icon {\n            font-size: 24px;\n            line-height: 1;\n            opacity: 0.4;\n            transition: opacity 0.2s;\n        }\n\n        .tab-item.active .tab-icon {\n            opacity: 1;\n        }\n\n        .tab-label {\n            font-size: 10px;\n            color: var(--text2);\n            font-weight: 500;\n        }\n\n        .tab-item.active .tab-label {\n            color: var(--accent);\n        }\n\n        /* Scroll to top button */\n        .scroll-top-btn {\n            position: absolute;\n            bottom: calc(var(--tab-h) + 20px);\n            left: 20px;\n            width: 34px;\n            height: 34px;\n            background: rgba(50, 50, 52, 0.9);\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            font-size: 14px;\n            cursor: pointer;\n            opacity: 0;\n            transition: opacity 0.3s;\n            z-index: 60;\n            border: none;\n            color: white;\n            pointer-events: none;\n        }\n\n        .scroll-top-btn.visible {\n            opacity: 1;\n            pointer-events: auto;\n        }\n\n        /* LIGHTBOX */\n        #gallery-lightbox-view {\n            position: absolute;\n            inset: 0;\n            z-index: 200;\n            background: #000;\n            display: flex;\n            flex-direction: column;\n            opacity: 0;\n            pointer-events: none;\n            transition: opacity 0.25s;\n            border-radius: 44px;\n        }\n\n        #gallery-lightbox-view.open {\n            opacity: 1;\n            pointer-events: all;\n        }\n\n        .lb-header {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            padding: 56px 20px 16px;\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            z-index: 10;\n            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);\n        }\n\n        .lb-back {\n            background: none;\n            border: none;\n            color: var(--accent);\n            font-size: 17px;\n            cursor: pointer;\n            padding: 4px;\n        }\n\n        .lb-date-info {\n            font-size: 13px;\n            color: rgba(255, 255, 255, 0.6);\n            text-align: center;\n        }\n\n        .lb-main {\n            flex: 1;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            overflow: hidden;\n            position: relative;\n        }\n\n        .lb-image-wrap {\n            width: 100%;\n            height: 100%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n\n        #lb-main-img {\n            max-width: 100%;\n            max-height: 100%;\n            object-fit: contain;\n            transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.2s;\n        }\n\n        .lb-footer {\n            padding: 10px 20px 40px;\n            display: flex;\n            flex-direction: column;\n            gap: 12px;\n            background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);\n        }\n\n        .swipe-strip {\n            display: flex;\n            overflow-x: auto;\n            gap: 2px;\n            padding: 4px 0;\n            scrollbar-width: none;\n        }\n\n        .swipe-strip::-webkit-scrollbar {\n            display: none;\n        }\n\n        .strip-thumb {\n            flex-shrink: 0;\n            width: 48px;\n            height: 48px;\n            border-radius: 4px;\n            cursor: pointer;\n            border: 2px solid transparent;\n            transition: border-color 0.2s;\n            background: var(--surface);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n\n        .strip-thumb.active {\n            border-color: white;\n        }\n\n        .strip-thumb img {\n            width: 100%;\n            height: 100%;\n            object-fit: cover;\n            border-radius: 2px;\n        }\n\n        .lb-actions {\n            display: flex;\n            justify-content: space-around;\n            align-items: center;\n        }\n\n        .action-btn {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            gap: 4px;\n            color: rgba(255, 255, 255, 0.7);\n            font-size: 11px;\n            background: none;\n            border: none;\n            cursor: pointer;\n        }\n\n        .action-btn svg {\n            width: 22px;\n            height: 22px;\n        }\n\n        /* Nav arrows for desktop-like feel if needed */\n        .lb-nav {\n            position: absolute;\n            top: 50%;\n            transform: translateY(-50%);\n            background: rgba(255, 255, 255, 0.1);\n            border: none;\n            color: white;\n            width: 44px;\n            height: 44px;\n            border-radius: 50%;\n            display: none;\n            /* Hide by default on mobile */\n            align-items: center;\n            justify-content: center;\n            cursor: pointer;\n            z-index: 20;\n        }\n\n        .lb-nav.prev {\n            left: 10px;\n        }\n\n        .lb-nav.next {\n            right: 10px;\n        }\n    "+"#gallery-app-container{--bg:#000;--surface:#1c1c1e;--surface2:#2c2c2e;--text:#f5f5f7;--text2:#98989e;--accent:#0a84ff}.gm-search{box-sizing:border-box;width:100%;padding:13px 16px;background:#1c1c1e;color:#fff;border:0;border-radius:25px;font:inherit;margin:10px 0}.gm-collections{display:grid;gap:12px;padding:18px}.gm-collections button{border:0;border-radius:17px;padding:22px 18px;text-align:left;background:#1c1c1e;color:#fff;font:inherit;font-size:18px}.gm-collections button span{float:right;color:#8e8e93}.gm-ios26 .gallery-header{padding:55px 18px 25px}.gm-ios26 .gallery-title{font-size:32px}.gm-ios26 .select-btn{border:1px solid #ffffff20;border-radius:25px;background:#1c1c1e;color:#fff;padding:11px 16px}.gm-ios26 .date-label{display:none}.gm-ios26 .photo-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;padding:0}.gm-ios26 .photo-cell{border-radius:0;aspect-ratio:1}.gm-ios26 .gallery-tab-bar{background:#202020ed;border:1px solid #ffffff20;border-radius:32px;bottom:18px;left:20px;right:20px;width:auto;height:64px;min-height:64px;padding:3px;box-sizing:border-box;backdrop-filter:blur(24px)}.gm-ios26 .tab-item{border-radius:28px;padding:5px 3px;gap:2px;min-width:0}.gm-ios26 .tab-item.active{background:#454547}.gm-ios26 .tab-icon{font-size:23px}.gm-ios26 .tab-label{font-size:10px}\n";document.head.append(style);})();
window.galleryTemplate = `
<div id="gallery-app-container">
    <div class="gallery-header">
        <div class="header-top">
            <div class="gallery-title">Galerie</div>
            <div class="header-btns">
                <button class="header-btn" id="gallery-delete-selected-btn" style="display: none; font-size: 20px; background: transparent; border: none; color: #ff3b30; cursor: pointer; padding: 4px; line-height: 1; margin-right: 10px;">\u{1F5D1}\uFE0F</button>
                <button class="select-btn" id="gallery-select-btn">S\xE9lectionner</button>
            </div>
        </div>
    </div>

    <div class="scroll-area" id="gallery-scroll-area">
        <div id="gallery-content"></div>
    </div>

    <button class="scroll-top-btn" id="gallery-scroll-top">\u2191</button>

    <div class="gallery-tab-bar">
        <div class="tab-item active">
            <div class="tab-icon">\u{1F5BC}\uFE0F</div>
            <div class="tab-label">Phototh\xE8que</div>
        </div>
        <div class="tab-item">
            <div class="tab-icon">\u{1F4DA}</div>
            <div class="tab-label">Collections</div>
        </div>
        <div class="tab-item">
            <div class="tab-icon">\u{1F50D}</div>
            <div class="tab-label">Rechercher</div>
        </div>
    </div>

    <!-- LIGHTBOX -->
    <div id="gallery-lightbox-view">
        <div class="lb-header">
            <button class="lb-back" id="lb-back-btn">\u2039 Retour</button>
            <div class="lb-date-info" id="lb-date-info"></div>
            <button class="lb-back">\u22EF</button>
        </div>
        <div class="lb-main">
            <div class="lb-image-wrap">
                <img id="lb-main-img" src="" alt="">
                <video id="lb-main-video" controls autoplay loop playsinline style="display:none; max-height: 80%; max-width: 100%; border-radius: 12px; object-fit: contain; width: 100%; height: 100%;"></video>
            </div>
            <button class="lb-nav prev" id="lb-prev-btn">\u2039</button>
            <button class="lb-nav next" id="lb-next-btn">\u203A</button>
        </div>
        <div class="lb-footer">
            <div class="swipe-strip" id="gallery-swipe-strip"></div>
            <div class="lb-actions">
                <button class="action-btn" id="lb-share-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                    <span>Partager</span>
                </button>
                <button class="action-btn" id="lb-like-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="lb-heart-svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    <span>Favoris</span>
                </button>
                <button class="action-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    <span>Infos</span>
                </button>
                <button class="action-btn" id="lb-delete-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    <span>Supprimer</span>
                </button>
            </div>
        </div>
    </div>
</div>
`;
window.setupGalleryApp = function() {
                const appView = document.getElementById("generic-app-view");
                const appMainContent = appView ? appView.querySelector(".app-main-content") : null;
                if (!appMainContent) return;
                if (!document.getElementById("gallery-actionsheet-styles")) {
                    const style = document.createElement("style");
                    style.id = "gallery-actionsheet-styles";
                    style.innerHTML = `
            .ios-action-sheet-overlay {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.4);
                z-index: 1000;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding: 10px 10px 30px 10px;
                opacity: 0;
                transition: opacity 0.25s ease;
                pointer-events: none;
            }
            .ios-action-sheet-overlay.active {
                opacity: 1;
                pointer-events: auto;
            }
            .ios-action-sheet {
                background: rgba(244, 244, 244, 0.85);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border-radius: 14px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                margin-bottom: 8px;
                transform: translateY(100%);
                transition: transform 0.25s cubic-bezier(0.19, 1, 0.22, 1);
            }
            .ios-action-sheet-overlay.active .ios-action-sheet {
                transform: translateY(0);
            }
            .ios-action-sheet-title {
                padding: 14px 16px;
                font-size: 13px;
                color: #8f8f93;
                text-align: center;
                border-bottom: 0.5px solid rgba(0, 0, 0, 0.15);
                line-height: 1.4;
            }
            .ios-action-sheet-btn {
                padding: 14px 16px;
                font-size: 20px;
                text-align: center;
                background: transparent;
                border: none;
                cursor: pointer;
                border-bottom: 0.5px solid rgba(0, 0, 0, 0.15);
                width: 100%;
            }
            .ios-action-sheet-btn:last-child {
                border-bottom: none;
            }
            .ios-action-sheet-btn.danger {
                color: #ff3b30;
                font-weight: 500;
            }
            .ios-action-sheet-btn:active {
                background: rgba(0, 0, 0, 0.05);
            }
            .ios-action-sheet-cancel {
                background: white;
                border-radius: 14px;
                padding: 14px 16px;
                font-size: 20px;
                font-weight: 600;
                color: #007aff;
                text-align: center;
                cursor: pointer;
                border: none;
                width: 100%;
                transform: translateY(100%);
                transition: transform 0.25s cubic-bezier(0.19, 1, 0.22, 1);
            }
            .ios-action-sheet-overlay.active .ios-action-sheet-cancel {
                transform: translateY(0);
            }
            .ios-action-sheet-cancel:active {
                background: rgba(0, 0, 0, 0.05);
            }
            .photo-cell.selecting .photo-content {
                position: relative;
            }
            .photo-cell.selecting::after {
                content: '';
                position: absolute;
                inset: 0;
                background: rgba(255, 255, 255, 0.3);
                border: 3px solid #007aff;
                border-radius: 8px;
                box-sizing: border-box;
                pointer-events: none;
            }
            .photo-cell.selecting .select-badge {
                position: absolute;
                top: 6px;
                right: 6px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #007aff;
                border: 2px solid #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 12px;
                font-weight: bold;
                z-index: 5;
                line-height: 1;
            }
            .photo-cell.not-selecting .select-badge {
                position: absolute;
                top: 6px;
                right: 6px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.2);
                border: 2px solid #fff;
                z-index: 5;
            }
            .gallery-tab-bar.disabled {
                pointer-events: none !important;
                opacity: 0.5 !important;
            }
        `;
                    document.head.appendChild(style);
                }
                const scrollArea = appMainContent.querySelector("#gallery-scroll-area");
                const content = appMainContent.querySelector("#gallery-content");
                const scrollTopBtn = appMainContent.querySelector("#gallery-scroll-top");
                const lightbox = appMainContent.querySelector("#gallery-lightbox-view");
                const lbImg = appMainContent.querySelector("#lb-main-img");
                const lbVid = appMainContent.querySelector("#lb-main-video");
                const lbDateInfo = appMainContent.querySelector("#lb-date-info");
                const swipeStrip = appMainContent.querySelector("#gallery-swipe-strip");
                const backBtn = appMainContent.querySelector("#lb-back-btn");
                const prevBtn = appMainContent.querySelector("#lb-prev-btn");
                const nextBtn = appMainContent.querySelector("#lb-next-btn");
                const deleteBtn = appMainContent.querySelector("#lb-delete-btn");
                const likeBtn = appMainContent.querySelector("#lb-like-btn");
                const shareBtn = appMainContent.querySelector("#lb-share-btn");
                const demoPhotos = [
                    { date: "1 mars 2026", sub: "Aujourd'hui", color: "#1a1a2e", icon: "\u{1F30C}" },
                    { date: "1 mars 2026", sub: "Aujourd'hui", color: "#16213e", icon: "\u2728" },
                    { date: "1 mars 2026", sub: "Aujourd'hui", color: "#0f3460", icon: "\u{1F4BB}", video: "0:14" },
                    { date: "28 f\xE9vrier 2026", sub: "Hier", color: "#1b4332", icon: "\u{1F33F}" },
                    { date: "28 f\xE9vrier 2026", sub: "Hier", color: "#40916c", icon: "\u{1F340}" },
                    { date: "26 f\xE9vrier 2026", sub: "Mercredi", color: "#03071e", icon: "\u{1F5A5}\uFE0F" },
                    { date: "24 f\xE9vrier 2026", sub: "Lundi", color: "#004e89", icon: "\u{1F30A}" }
                ];
                let photos = [];
                let currentIndex = 0;
                let galleryFilter='all',galleryQuery='';
                let likedPhotos=new Set();try{const saved=JSON.parse(localStorage.getItem('iphone.photos.favorites')||'[]');if(Array.isArray(saved))likedPhotos=new Set(saved);}catch{}
                const photoKey=photo=>{if(!photo)return '';if(!photo.real)return 'demo-'+photo.demoIndex;if(photo.mediaId)return photo.mediaId;let hash=2166136261;for(const c of photo.src||''){hash^=c.charCodeAt(0);hash=Math.imul(hash,16777619);}return 'media-'+(hash>>>0)+'-'+(photo.src?.length||0);};
                let isSelectionMode = false;
                let selectedIndices = /* @__PURE__ */ new Set();
                const loadPhotos = () => {
                    let captured = [];
                    try {
                        captured = JSON.parse(localStorage.getItem("capturedPhotos") || "[]");
                        if (!Array.isArray(captured)) captured = [];
                    } catch (e) {
                        captured = [];
                    }
                    let deletedDemoIndices = [];
                    try {
                        deletedDemoIndices = JSON.parse(localStorage.getItem("deletedDemoPhotos") || "[]");
                        if (!Array.isArray(deletedDemoIndices)) deletedDemoIndices = [];
                    } catch (e) {
                        deletedDemoIndices = [];
                    }
                    const currentDemoPhotos = demoPhotos.map((p, i) => ({ ...p, demoIndex: i })).filter((p, i) => !deletedDemoIndices.includes(i));
                    photos = captured.map((item) => {
                        if (typeof item === "string") {
                            return { src: item, date: "Aujourd'hui", sub: "", real: true };
                        } else if (item && typeof item === "object") {
                            return { src: item.src, mediaId:item.id, poster:item.poster, date: item.date || "Aujourd'hui", sub: "", real: true, video: item.isVideo ? item.duration || "Vidéo" : undefined, isVideo: item.isVideo };
                        }
                        return null;
                    }).filter(Boolean).concat(currentDemoPhotos);
                    photos=photos.filter(photo=>(galleryFilter!=='favorites'||likedPhotos.has(photoKey(photo)))&&(galleryFilter!=='videos'||Boolean(photo.isVideo||photo.video))&&(!galleryQuery||(photo.date+' '+(photo.mode||'')+' '+(photo.isVideo?'vidéo':'photo')).toLocaleLowerCase('fr').includes(galleryQuery.toLocaleLowerCase('fr'))));
                };
                window.refreshSimulatorPhotos=()=>{if(content.isConnected)renderGallery();};
                const groupByDate = () => {
                    const map = {};
                    photos.forEach((p, i) => {
                        p.id = i;
                        const key = p.date + (p.sub ? `_${p.sub}` : "");
                        if (!map[key]) map[key] = { label: p.date, sub: p.sub, items: [] };
                        map[key].items.push(p);
                    });
                    return Object.values(map);
                };
                const renderGallery = () => {
                    loadPhotos();
                    const groups = groupByDate();
                    let html = "";
                    groups.forEach((group) => {
                        html += `
                <div class="date-section">
                    <div class="date-label">${group.label} <span class="date-sublabel">${group.sub}</span></div>
                    <div class="photo-grid">`;
                        group.items.forEach((photo, idx) => {
                            const isSelected = selectedIndices.has(photo.id);
                            html += `
                    <div class="photo-cell ${isSelectionMode ? isSelected ? "selecting" : "not-selecting" : ""}" data-index="${photo.id}">
                        <div class="photo-content">
                            ${photo.real ? `<img src="${photo.poster || photo.src}" />` : `<span style="font-size:32px">${photo.icon}</span>`}
                            ${isSelectionMode ? `<div class="select-badge">${isSelected ? "\u2713" : ""}</div>` : ""}
                        </div>
                        ${photo.video ? `<div class="video-badge">${photo.video}</div>` : ""}
                    </div>`;
                        });
                        html += `</div></div>`;
                    });
                    content.innerHTML = html || '<div style="padding: 40px; text-align: center; opacity: 0.5;">Aucune photo</div>';
                    content.querySelectorAll(".photo-cell").forEach((cell) => {
                        cell.addEventListener("click", () => {
                            const index = parseInt(cell.dataset.index);
                            if (isSelectionMode) {
                                if (selectedIndices.has(index)) {
                                    selectedIndices.delete(index);
                                    cell.classList.remove("selecting");
                                    cell.classList.add("not-selecting");
                                    const badge = cell.querySelector(".select-badge");
                                    if (badge) badge.textContent = "";
                                } else {
                                    selectedIndices.add(index);
                                    cell.classList.remove("not-selecting");
                                    cell.classList.add("selecting");
                                    const badge = cell.querySelector(".select-badge");
                                    if (badge) badge.textContent = "\u2713";
                                }
                            } else {
                                currentIndex = index;
                                openLightbox();
                            }
                        });
                    });
                };
                const buildStrip = () => {
                    swipeStrip.innerHTML = photos.map((p, i) => `
            <div class="strip-thumb${i === currentIndex ? " active" : ""}" data-index="${i}">
                ${p.real ? `<img src="${p.poster || p.src}" />` : `<span>${p.icon}</span>`}
            </div>
        `).join("");
                    swipeStrip.querySelectorAll(".strip-thumb").forEach((thumb) => {
                        thumb.addEventListener("click", (e) => {
                            e.stopPropagation();
                            currentIndex = parseInt(thumb.dataset.index);
                            updateLightbox();
                        });
                    });
                };
                const updateLightbox = () => {
                    const p = photos[currentIndex];
                    if (!p) {
                        closeLightbox();
                        return;
                    }
                    lbImg.style.opacity = "0";
                    setTimeout(() => {
                        if (p.real) {
                            if (p.isVideo) {
                                lbImg.style.display = "none";
                                lbImg.src = "";
                                if (lbVid) {
                                    lbVid.src = p.src;
                                    lbVid.style.display = "block";
                                }
                            } else {
                                if (lbVid) {
                                    lbVid.style.display = "none";
                                    lbVid.src = "";
                                }
                                lbImg.src = p.src;
                                lbImg.style.display = "block";
                            }
                        } else {
                            if (lbVid) {
                                lbVid.style.display = "none";
                                lbVid.src = "";
                            }
                            lbImg.src = "";
                            lbImg.style.display = "none";
                        }
                        lbDateInfo.textContent = `${p.date} ${p.sub ? "\u2022 " + p.sub : ""}`;
                        const heart = likeBtn?.querySelector("#lb-heart-svg");
                        if (heart) {
                            if (likedPhotos.has(photoKey(photos[currentIndex]))) {
                                heart.style.fill = "red";
                                heart.style.stroke = "red";
                            } else {
                                heart.style.fill = "none";
                                heart.style.stroke = "currentColor";
                            }
                        }
                        swipeStrip.querySelectorAll(".strip-thumb").forEach((t, i) => {
                            t.classList.toggle("active", i === currentIndex);
                        });
                        const activeThumb = swipeStrip.querySelector(".strip-thumb.active");
                        if (activeThumb) activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                        lbImg.style.opacity = "1";
                    }, 50);
                };
                const openLightbox = () => {
                    updateLightbox();
                    buildStrip();
                    lightbox.classList.add("open");
                };
                const closeLightbox = () => {
                    if (lbVid) { lbVid.pause(); }
                    lightbox.classList.remove("open");
                };
                const navLb = (dir) => {
                    if (lbVid) { lbVid.pause(); lbVid.currentTime = 0; }
                    currentIndex = (currentIndex + dir + photos.length) % photos.length;
                    updateLightbox();
                };
                backBtn?.addEventListener("click", closeLightbox);
                prevBtn?.addEventListener("click", () => navLb(-1));
                nextBtn?.addEventListener("click", () => navLb(1));
                scrollTopBtn?.addEventListener("click", () => {
                    scrollArea.scrollTo({ top: 0, behavior: "smooth" });
                });
                scrollArea?.addEventListener("scroll", () => {
                    scrollTopBtn.classList.toggle("visible", scrollArea.scrollTop > 300);
                });
                deleteBtn?.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const p = photos[currentIndex];
                    if (!p) return;
                    const container = document.querySelector("#gallery-app-container");
                    if (!container) return;
                    const existingOverlay = container.querySelector(".ios-action-sheet-overlay");
                    if (existingOverlay) existingOverlay.remove();
                    const overlay = document.createElement("div");
                    overlay.className = "ios-action-sheet-overlay";
                    overlay.innerHTML = `
            <div class="ios-action-sheet">
                <div class="ios-action-sheet-title">Voulez-vous supprimer cette photo ?</div>
                <button class="ios-action-sheet-btn danger" id="action-sheet-delete-btn">Supprimer la photo</button>
            </div>
            <button class="ios-action-sheet-cancel" id="action-sheet-cancel-btn">Annuler</button>
        `;
                    container.appendChild(overlay);
                    setTimeout(() => {
                        overlay.classList.add("active");
                    }, 10);
                    const dismissActionSheet = () => {
                        overlay.classList.remove("active");
                        setTimeout(() => {
                            overlay.remove();
                        }, 250);
                    };
                    overlay.addEventListener("click", (evt) => {
                        if (evt.target === overlay) dismissActionSheet();
                    });
                    overlay.querySelector("#action-sheet-cancel-btn").addEventListener("click", (evt) => {
                        evt.stopPropagation();
                        dismissActionSheet();
                    });
                    overlay.querySelector("#action-sheet-delete-btn").addEventListener("click", (evt) => {
                        evt.stopPropagation();
                        dismissActionSheet();
                        if (p.real) {
                            let captured = JSON.parse(localStorage.getItem("capturedPhotos") || "[]");
                            captured = captured.filter((item) => {
                                const src = item && typeof item === "object" ? item.src : item;
                                return src !== p.src;
                            });
                            localStorage.setItem("capturedPhotos", JSON.stringify(captured));
                        } else if (p.demoIndex !== void 0) {
                            let deleted = JSON.parse(localStorage.getItem("deletedDemoPhotos") || "[]");
                            deleted.push(p.demoIndex);
                            localStorage.setItem("deletedDemoPhotos", JSON.stringify(deleted));
                        }
                        let uninstalled = JSON.parse(localStorage.getItem("ios_uninstalled_apps") || "[]");
                        if (!uninstalled.includes("phone")) {
                            uninstalled.push("phone");
                            localStorage.setItem("ios_uninstalled_apps", JSON.stringify(uninstalled));
                        }
                        let previouslyInstalled = JSON.parse(localStorage.getItem("ios_previously_installed_apps") || "[]");
                        if (!previouslyInstalled.includes("phone")) {
                            previouslyInstalled.push("phone");
                            localStorage.setItem("ios_previously_installed_apps", JSON.stringify(previouslyInstalled));
                        }
                        if (window.renderHomeScreen) {
                            window.renderHomeScreen();
                        }
                        renderGallery();
                        if (photos.length === 0) {
                            closeLightbox();
                        } else {
                            currentIndex = Math.max(0, Math.min(currentIndex, photos.length - 1));
                            updateLightbox();
                            buildStrip();
                        }
                    });
                });
                likeBtn?.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (likedPhotos.has(photoKey(photos[currentIndex]))) likedPhotos.delete(photoKey(photos[currentIndex]));
                    else likedPhotos.add(photoKey(photos[currentIndex]));
                    localStorage.setItem('iphone.photos.favorites',JSON.stringify([...likedPhotos]));
                    updateLightbox();
                });
                let touchStartX = 0, touchStartY = 0;
                lightbox.addEventListener("touchstart", (e) => {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                }, { passive: true });
                lightbox.addEventListener("touchend", (e) => {
                    const dx = e.changedTouches[0].clientX - touchStartX;
                    const dy = e.changedTouches[0].clientY - touchStartY;
                    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
                        navLb(dx < 0 ? 1 : -1);
                    } else if (dy > 80 && Math.abs(dx) < 50) {
                        closeLightbox();
                    }
                }, { passive: true });
                const selectBtn = appMainContent.querySelector("#gallery-select-btn");
                const deleteSelectedBtn = appMainContent.querySelector("#gallery-delete-selected-btn");
                const tabBar = appMainContent.querySelector(".gallery-tab-bar");
                if (selectBtn) {
                    selectBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        isSelectionMode = !isSelectionMode;
                        if (isSelectionMode) {
                            selectBtn.textContent = "Annuler";
                            if (deleteSelectedBtn) deleteSelectedBtn.style.display = "block";
                            if (tabBar) tabBar.classList.add("disabled");
                        } else {
                            selectBtn.textContent = "S\xE9lectionner";
                            if (deleteSelectedBtn) deleteSelectedBtn.style.display = "none";
                            if (tabBar) tabBar.classList.remove("disabled");
                            selectedIndices.clear();
                        }
                        renderGallery();
                    });
                }
                if (deleteSelectedBtn) {
                    deleteSelectedBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        if (selectedIndices.size === 0) return;
                        const container = document.querySelector("#gallery-app-container");
                        if (!container) return;
                        const existingOverlay = container.querySelector(".ios-action-sheet-overlay");
                        if (existingOverlay) existingOverlay.remove();
                        const overlay = document.createElement("div");
                        overlay.className = "ios-action-sheet-overlay";
                        overlay.innerHTML = `
                <div class="ios-action-sheet">
                    <div class="ios-action-sheet-title">Voulez-vous supprimer tout ?</div>
                    <button class="ios-action-sheet-btn danger" id="action-sheet-delete-selected-btn">Supprimer</button>
                </div>
                <button class="ios-action-sheet-cancel" id="action-sheet-cancel-selected-btn">Annuler</button>
            `;
                        container.appendChild(overlay);
                        setTimeout(() => {
                            overlay.classList.add("active");
                        }, 10);
                        const dismissActionSheet = () => {
                            overlay.classList.remove("active");
                            setTimeout(() => {
                                overlay.remove();
                            }, 250);
                        };
                        overlay.addEventListener("click", (evt) => {
                            if (evt.target === overlay) dismissActionSheet();
                        });
                        overlay.querySelector("#action-sheet-cancel-selected-btn").addEventListener("click", (evt) => {
                            evt.stopPropagation();
                            dismissActionSheet();
                        });
                        overlay.querySelector("#action-sheet-delete-selected-btn").addEventListener("click", (evt) => {
                            evt.stopPropagation();
                            dismissActionSheet();
                            let captured = JSON.parse(localStorage.getItem("capturedPhotos") || "[]");
                            let deletedDemo = JSON.parse(localStorage.getItem("deletedDemoPhotos") || "[]");
                            selectedIndices.forEach((id) => {
                                const p = photos[id];
                                if (p) {
                                    if (p.real) {
                                        captured = captured.filter((item) => {
                                            const src = item && typeof item === "object" ? item.src : item;
                                            return src !== p.src;
                                        });
                                    } else if (p.demoIndex !== void 0) {
                                        deletedDemo.push(p.demoIndex);
                                    }
                                }
                            });
                            localStorage.setItem("capturedPhotos", JSON.stringify(captured));
                            localStorage.setItem("deletedDemoPhotos", JSON.stringify(deletedDemo));
                            isSelectionMode = false;
                            if (selectBtn) selectBtn.textContent = "S\xE9lectionner";
                            if (deleteSelectedBtn) deleteSelectedBtn.style.display = "none";
                            if (tabBar) tabBar.classList.remove("disabled");
                            selectedIndices.clear();
                            renderGallery();
                        });
                    });
                }
                const galleryContainer=appMainContent.querySelector('#gallery-app-container');
                let galleryPrefs={};try{galleryPrefs=JSON.parse(localStorage.getItem('iphone.settings.v1')||'{}');}catch{}
                galleryContainer.classList.toggle('gm-ios26',Number(galleryPrefs['update/installedMajor']||18)>=26);
                const galleryTitle=galleryContainer.querySelector('.gallery-title');galleryTitle.textContent='Photothèque';
                const tabs=[...galleryContainer.querySelectorAll('.gallery-tab-bar .tab-item')];
                const symbols=['▣','▤','⌕'];tabs.forEach((tab,index)=>{tab.querySelector('.tab-icon').textContent=symbols[index];tab.setAttribute('role','button');tab.tabIndex=0;tab.setAttribute('aria-label',['Photothèque','Collections','Rechercher dans Photos'][index]);tab.onkeydown=event=>{if(['Enter',' '].includes(event.key)){event.preventDefault();tab.click();}};tab.onclick=()=>{
                    if(isSelectionMode)return;tabs.forEach(item=>item.classList.toggle('active',item===tab));galleryContainer.querySelector('.gm-search')?.remove();galleryQuery='';galleryFilter='all';
                    if(index===1){galleryTitle.textContent='Collections';content.innerHTML='<div class="gm-collections"><button data-collection="favorites">♡ Favoris <span>›</span></button><button data-collection="videos">▹ Vidéos <span>›</span></button><button data-collection="all">▣ Toutes les photos <span>›</span></button></div>';content.querySelectorAll('[data-collection]').forEach(button=>button.onclick=()=>{galleryFilter=button.dataset.collection;galleryTitle.textContent=galleryFilter==='favorites'?'Favoris':galleryFilter==='videos'?'Vidéos':'Photothèque';renderGallery();});return;}
                    galleryTitle.textContent=index===2?'Rechercher':'Photothèque';if(index===2){const input=document.createElement('input');input.className='gm-search';input.type='search';input.placeholder='Date, photo, vidéo';input.setAttribute('aria-label','Rechercher dans la photothèque');galleryContainer.querySelector('.gallery-header').append(input);input.oninput=()=>{galleryQuery=input.value;renderGallery();};input.focus();}renderGallery();
                };});
                renderGallery();
            };
