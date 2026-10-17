window.cameraTemplate = `
    <style>
        .camera-app-container {
            position: absolute;
            inset: 32px 0 0;
            background: #000;
            display: flex;
            flex-direction: column;
            color: white;
            overflow: hidden;
            user-select: none;
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif;
            z-index: 10;
        }

        /* Top Bar */
        .cam-top-bar {
            height: 52px;
            padding: 8px 16px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 20;
            background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
            box-sizing: border-box;
        }

        .cam-top-left, .cam-top-right {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .cam-icon-btn {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.35);
            border: 1px solid rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
            font-size: 11px;
            font-weight: 700;
            position: relative;
        }

        .cam-icon-btn:active {
            transform: scale(0.92);
        }

        .cam-icon-btn.active {
            background: #ffd60a;
            color: #000;
            border-color: #ffd60a;
        }

        .cam-icon-btn.active svg {
            fill: #000;
            stroke: #000;
        }

        .cam-drawer-arrow {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.35);
            border: 1px solid rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .cam-drawer-arrow.open svg {
            transform: rotate(180deg);
        }

        .cam-badge-btn {
            padding: 4px 8px;
            border-radius: 12px;
            background: rgba(0, 0, 0, 0.35);
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.5px;
            cursor: pointer;
            color: #fff;
            transition: all 0.2s ease;
        }

        .cam-badge-btn.off {
            color: rgba(255, 255, 255, 0.4);
            text-decoration: line-through;
        }

        /* Viewfinder Area */
        .cam-viewfinder-wrapper {
            flex: 1;
            position: relative;
            background: #050505;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .cam-viewfinder-wrapper.ratio-1-1 {
            aspect-ratio: 1 / 1;
            flex: none;
            width: 100%;
            height: 390px;
            margin: auto 0;
        }

        .cam-viewfinder-wrapper.ratio-16-9 {
            position: absolute;
            inset: 0;
            z-index: 5;
        }

        .cam-stream-video, .cam-fallback-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            inset: 0;
            transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.3s ease;
        }

        .cam-stream-video.selfie, .cam-fallback-img.selfie {
            transform: scaleX(-1);
        }

        /* Grid Overlay */
        .cam-grid-overlay {
            position: absolute;
            inset: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 10;
        }

        .cam-grid-overlay.active {
            opacity: 0.45;
        }

        .cam-grid-cell {
            border: 0.5px solid rgba(255, 255, 255, 0.6);
        }

        /* Tap to focus reticle */
        .cam-focus-reticle {
            position: absolute;
            width: 70px;
            height: 70px;
            border: 1.5px solid #ffd60a;
            box-shadow: 0 0 6px rgba(255, 214, 10, 0.6);
            pointer-events: none;
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0;
            transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease;
            z-index: 25;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .cam-focus-reticle.active {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }

        .cam-focus-sun {
            position: absolute;
            right: -24px;
            color: #ffd60a;
            font-size: 16px;
            cursor: pointer;
            pointer-events: auto;
            transition: transform 0.1s ease;
        }

        /* Zoom Control Capsule */
        .cam-zoom-capsule {
            position: absolute;
            bottom: 14px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(0, 0, 0, 0.45);
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 3px 6px;
            border-radius: 24px;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            z-index: 20;
            box-shadow: 0 4px 16px rgba(0,0,0,0.4);
        }

        .cam-zoom-btn {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 700;
            color: #ffd60a;
            background: rgba(255, 255, 255, 0.08);
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .cam-zoom-btn:active {
            transform: scale(0.9);
        }

        .cam-zoom-btn.active {
            background: rgba(255, 255, 255, 0.28);
            color: #fff;
            transform: scale(1.08);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        /* Video Recording Header & Timer */
        .cam-recording-header {
            position: absolute;
            top: 60px;
            left: 50%;
            transform: translateX(-50%);
            display: none;
            align-items: center;
            gap: 8px;
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 700;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            z-index: 30;
            backdrop-filter: blur(12px);
        }

        .cam-recording-header.active {
            display: flex;
        }

        .cam-rec-dot {
            width: 9px;
            height: 9px;
            background: #ff3b30;
            border-radius: 50%;
            animation: camBlink 1s infinite;
        }

        @keyframes camBlink {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(0.85); }
        }

        .cam-rec-quality {
            font-size: 10px;
            color: rgba(255, 255, 255, 0.7);
            padding-left: 6px;
            border-left: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Portrait Lighting Wheel Overlay */
        .cam-portrait-overlay {
            position: absolute;
            bottom: 56px;
            left: 0;
            right: 0;
            display: none;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            z-index: 22;
            pointer-events: none;
        }

        .cam-portrait-overlay.active {
            display: flex;
        }

        .cam-portrait-f-badge {
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 2px 10px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 700;
            color: #ffd60a;
            backdrop-filter: blur(10px);
        }

        .cam-portrait-light-pill {
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid #ffd60a;
            color: #ffd60a;
            padding: 4px 14px;
            border-radius: 16px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        /* Secondary Quick Settings Drawer */
        .cam-controls-drawer {
            display: none;
            width: 100%;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 10px 14px 6px;
            box-sizing: border-box;
            z-index: 25;
            flex-direction: column;
            gap: 10px;
            animation: camSlideUp 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .cam-controls-drawer.active {
            display: flex;
        }

        @keyframes camSlideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .cam-drawer-icons-row {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;
        }

        .cam-drawer-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            color: #fff;
            opacity: 0.85;
            transition: all 0.2s ease;
        }

        .cam-drawer-item:hover, .cam-drawer-item.active {
            opacity: 1;
            color: #ffd60a;
        }

        .cam-drawer-circle {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.12);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 700;
            transition: all 0.2s ease;
        }

        .cam-drawer-item.active .cam-drawer-circle {
            background: #ffd60a;
            color: #000;
        }

        .cam-drawer-label {
            font-size: 10px;
            font-weight: 600;
        }

        /* Drawer Sub-Option Slider/Pills */
        .cam-suboptions-bar {
            display: none;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            padding: 4px 0;
            overflow-x: auto;
        }

        .cam-suboptions-bar.active {
            display: flex;
        }

        .cam-subopt-pill {
            padding: 5px 12px;
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.12);
            color: #fff;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s ease;
        }

        .cam-subopt-pill.active {
            background: #ffd60a;
            color: #000;
            font-weight: 700;
        }

        .cam-exposure-slider-wrap {
            display: none;
            align-items: center;
            gap: 12px;
            width: 90%;
            margin: 0 auto;
            color: #ffd60a;
            font-size: 12px;
            font-weight: 700;
        }

        .cam-exposure-slider-wrap.active {
            display: flex;
        }

        .cam-exposure-slider {
            flex: 1;
            -webkit-appearance: none;
            height: 4px;
            border-radius: 2px;
            background: rgba(255, 255, 255, 0.3);
            outline: none;
        }

        .cam-exposure-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #ffd60a;
            cursor: pointer;
            box-shadow: 0 0 6px rgba(0,0,0,0.5);
        }

        /* Countdown Overlay */
        .cam-countdown-overlay {
            position: absolute;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 80px;
            font-weight: 800;
            color: #ffd60a;
            text-shadow: 0 4px 20px rgba(0,0,0,0.8);
            z-index: 50;
            pointer-events: none;
            animation: camPulseCount 1s infinite;
        }

        .cam-countdown-overlay.active {
            display: flex;
        }

        @keyframes camPulseCount {
            0% { transform: scale(1.2); opacity: 1; }
            80% { transform: scale(0.9); opacity: 0.8; }
            100% { transform: scale(0.8); opacity: 0; }
        }

        /* White Flash Animation */
        .cam-flash-screen {
            position: absolute;
            inset: 0;
            background: #fff;
            opacity: 0;
            pointer-events: none;
            z-index: 60;
            transition: opacity 0.08s ease-out;
        }

        .cam-flash-screen.flash {
            opacity: 0.95;
            transition: none;
        }

        /* Bottom Controls Bar */
        .cam-bottom-section {
            background: #000;
            padding: 6px 16px calc(24px + env(safe-area-inset-bottom));
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 20;
        }

        /* Mode Selector Carousel */
        .cam-mode-carousel {
            width: 100%;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding: 8px 0 14px;
            mask-image: linear-gradient(to right, transparent, black 25%, black 75%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 25%, black 75%, transparent);
        }

        .cam-mode-carousel::-webkit-scrollbar {
            display: none;
        }

        .cam-mode-track {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            padding: 0 40px;
            width: max-content;
            margin: 0 auto;
        }

        .cam-mode-btn {
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.6px;
            color: rgba(255, 255, 255, 0.6);
            cursor: pointer;
            white-space: nowrap;
            text-transform: uppercase;
            transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
            scroll-snap-align: center;
            padding: 4px 6px;
        }

        .cam-mode-btn.active {
            color: #ffd60a;
            transform: scale(1.05);
        }

        /* Shutter, Gallery, Flip Row */
        .cam-actions-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            max-width: 340px;
            padding: 0 8px;
        }

        /* Gallery Thumbnail */
        .cam-gallery-thumb {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #1c1c1e;
            border: 2px solid rgba(255, 255, 255, 0.25);
            background-size: cover;
            background-position: center;
            cursor: pointer;
            transition: transform 0.2s ease, border-color 0.2s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .cam-gallery-thumb:active {
            transform: scale(0.92);
        }

        /* Shutter Button */
        .cam-shutter-outer {
            width: 76px;
            height: 76px;
            border-radius: 50%;
            border: 4px solid #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
            background: transparent;
            box-sizing: border-box;
            position: relative;
        }

        .cam-shutter-outer:active {
            transform: scale(0.92);
        }

        .cam-shutter-inner {
            width: 62px;
            height: 62px;
            border-radius: 50%;
            background: #fff;
            transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* Video mode shutter */
        .cam-shutter-outer.video-mode .cam-shutter-inner {
            background: #ff3b30;
            width: 58px;
            height: 58px;
        }

        .cam-shutter-outer.recording .cam-shutter-inner {
            border-radius: 12px;
            width: 28px;
            height: 28px;
            background: #ff3b30;
        }

        /* Camera Flip Button */
        .cam-flip-btn {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #fff;
            transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
            box-shadow: 0 2px 10px rgba(0,0,0,0.4);
        }

        .cam-flip-btn:active {
            transform: scale(0.9) rotate(180deg);
        }
    </style>

    <div class="camera-app-container">
        <!-- Flash Effect -->
        <div class="cam-flash-screen" id="cam-flash-screen"></div>

        <!-- Countdown Display -->
        <div class="cam-countdown-overlay" id="cam-countdown-overlay">3</div>

        <!-- Top Bar -->
        <div class="cam-top-bar">
            <div class="cam-top-left">
                <!-- Flash Button -->
                <button class="cam-icon-btn" id="cam-btn-flash" title="Flash">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>

                <!-- Night Mode Button -->
                <button class="cam-icon-btn" id="cam-btn-night" title="Mode Nuit">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                        <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
                    </svg>
                </button>

                <!-- Exposure Badge -->
                <div class="cam-badge-btn" id="cam-badge-exposure" style="display:none;">±0.0</div>
            </div>

            <!-- Top Center Chevron Drawer Arrow -->
            <button class="cam-drawer-arrow" id="cam-drawer-toggle" title="Options avancées">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 15 12 9 18 15"></polyline>
                </svg>
            </button>

            <div class="cam-top-right">
                <!-- Photographic Styles Button -->
                <button class="cam-icon-btn" id="cam-btn-styles" title="Styles photographiques">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8">
                        <rect x="3" y="3" width="7" height="7" rx="1"/>
                        <rect x="14" y="3" width="7" height="7" rx="1"/>
                        <rect x="3" y="14" width="7" height="7" rx="1"/>
                        <rect x="14" y="14" width="7" height="7" rx="1"/>
                    </svg>
                </button>

                <!-- Live Photos Button -->
                <button class="cam-icon-btn active" id="cam-btn-live" title="Live Photos">
                    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6">
                        <circle cx="12" cy="12" r="9" stroke-dasharray="3 3"/>
                        <circle cx="12" cy="12" r="5"/>
                        <circle cx="12" cy="12" r="2" fill="currentColor"/>
                    </svg>
                </button>

                <!-- RAW / Resolution Toggle -->
                <button class="cam-badge-btn" id="cam-btn-raw" title="Format RAW">RAW MAX</button>
            </div>
        </div>

        <!-- Viewfinder -->
        <div class="cam-viewfinder-wrapper" id="cam-viewfinder">
            <video id="camera-stream" autoplay playsinline class="cam-stream-video" style="display:none;"></video>
            <img src="camera_viewfinder.png" class="cam-fallback-img" id="camera-fallback-img" alt="Viseur" onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80'" />

            <!-- Rule of Thirds Grid -->
            <div class="cam-grid-overlay" id="cam-grid-overlay">
                <div class="cam-grid-cell"></div><div class="cam-grid-cell"></div><div class="cam-grid-cell"></div>
                <div class="cam-grid-cell"></div><div class="cam-grid-cell"></div><div class="cam-grid-cell"></div>
                <div class="cam-grid-cell"></div><div class="cam-grid-cell"></div><div class="cam-grid-cell"></div>
            </div>

            <!-- Focus Reticle & Sun Exposure Slider -->
            <div class="cam-focus-reticle" id="cam-focus-reticle">
                <span class="cam-focus-sun">☀️</span>
            </div>

            <!-- Video Recording Timer Header -->
            <div class="cam-recording-header" id="cam-recording-header">
                <div class="cam-rec-dot"></div>
                <span id="cam-recording-timer-text">00:00</span>
                <span class="cam-rec-quality" id="cam-rec-quality">4K • 60</span>
            </div>

            <!-- Portrait Mode Depth & Lighting Indicators -->
            <div class="cam-portrait-overlay" id="cam-portrait-overlay">
                <div class="cam-portrait-f-badge">ƒ 2.8</div>
                <div class="cam-portrait-light-pill" id="cam-portrait-light-label">Lumière naturelle</div>
            </div>

            <!-- Zoom Capsule -->
            <div class="cam-zoom-capsule">
                <div class="cam-zoom-btn" data-zoom="0.5">.5</div>
                <div class="cam-zoom-btn active" data-zoom="1">1x</div>
                <div class="cam-zoom-btn" data-zoom="2">2</div>
                <div class="cam-zoom-btn" data-zoom="5">5</div>
            </div>
        </div>

        <!-- Controls Drawer (Secondary Tray) -->
        <div class="cam-controls-drawer" id="cam-controls-drawer">
            <div class="cam-drawer-icons-row">
                <!-- 1. Flash -->
                <div class="cam-drawer-item" data-drawer-tab="flash">
                    <div class="cam-drawer-circle">⚡</div>
                    <span class="cam-drawer-label">Flash</span>
                </div>
                <!-- 2. Night Mode -->
                <div class="cam-drawer-item" data-drawer-tab="night">
                    <div class="cam-drawer-circle">🌙</div>
                    <span class="cam-drawer-label">Nuit</span>
                </div>
                <!-- 3. Styles -->
                <div class="cam-drawer-item" data-drawer-tab="styles">
                    <div class="cam-drawer-circle">🎨</div>
                    <span class="cam-drawer-label">Styles</span>
                </div>
                <!-- 4. Format / Ratio -->
                <div class="cam-drawer-item" data-drawer-tab="ratio">
                    <div class="cam-drawer-circle">4:3</div>
                    <span class="cam-drawer-label">Format</span>
                </div>
                <!-- 5. Exposure -->
                <div class="cam-drawer-item" data-drawer-tab="exposure">
                    <div class="cam-drawer-circle">±</div>
                    <span class="cam-drawer-label">Expo</span>
                </div>
                <!-- 6. Timer Retardateur -->
                <div class="cam-drawer-item" data-drawer-tab="timer">
                    <div class="cam-drawer-circle">⏱️</div>
                    <span class="cam-drawer-label">Retardateur</span>
                </div>
                <!-- 7. Filters -->
                <div class="cam-drawer-item" data-drawer-tab="filters">
                    <div class="cam-drawer-circle">✨</div>
                    <span class="cam-drawer-label">Filtres</span>
                </div>
            </div>

            <!-- Sub-Option Selectors -->
            <!-- Flash options -->
            <div class="cam-suboptions-bar" id="cam-subbar-flash">
                <div class="cam-subopt-pill active" data-val="auto">Auto</div>
                <div class="cam-subopt-pill" data-val="on">Oui</div>
                <div class="cam-subopt-pill" data-val="off">Non</div>
            </div>

            <!-- Night mode options -->
            <div class="cam-suboptions-bar" id="cam-subbar-night">
                <div class="cam-subopt-pill active" data-val="auto">Auto (1s)</div>
                <div class="cam-subopt-pill" data-val="max">Max (3s)</div>
                <div class="cam-subopt-pill" data-val="off">Désactivé</div>
            </div>

            <!-- Styles options -->
            <div class="cam-suboptions-bar" id="cam-subbar-styles">
                <div class="cam-subopt-pill active" data-style="standard">Standard</div>
                <div class="cam-subopt-pill" data-style="vivid">Vif et chaud</div>
                <div class="cam-subopt-pill" data-style="warm">Chaleureux</div>
                <div class="cam-subopt-pill" data-style="cool">Froid</div>
                <div class="cam-subopt-pill" data-style="dramatic">Dramatique</div>
            </div>

            <!-- Ratio options -->
            <div class="cam-suboptions-bar" id="cam-subbar-ratio">
                <div class="cam-subopt-pill active" data-ratio="4-3">4:3</div>
                <div class="cam-subopt-pill" data-ratio="16-9">16:9</div>
                <div class="cam-subopt-pill" data-ratio="1-1">Carré 1:1</div>
            </div>

            <!-- Exposure slider -->
            <div class="cam-exposure-slider-wrap" id="cam-subbar-exposure">
                <span>-2.0</span>
                <input type="range" min="-20" max="20" value="0" class="cam-exposure-slider" id="cam-exposure-input" />
                <span>+2.0</span>
                <span id="cam-exposure-val" style="min-width: 32px; text-align: right;">0.0</span>
            </div>

            <!-- Timer retardateur options -->
            <div class="cam-suboptions-bar" id="cam-subbar-timer">
                <div class="cam-subopt-pill active" data-delay="0">Non</div>
                <div class="cam-subopt-pill" data-delay="3">3 s</div>
                <div class="cam-subopt-pill" data-delay="10">10 s</div>
            </div>

            <!-- Filters options -->
            <div class="cam-suboptions-bar" id="cam-subbar-filters">
                <div class="cam-subopt-pill active" data-filter="none">Original</div>
                <div class="cam-subopt-pill" data-filter="vivid">Vif</div>
                <div class="cam-subopt-pill" data-filter="vivid-warm">Vif chaud</div>
                <div class="cam-subopt-pill" data-filter="dramatic">Dramatique</div>
                <div class="cam-subopt-pill" data-filter="mono">Mono</div>
                <div class="cam-subopt-pill" data-filter="silvertone">Argenté</div>
                <div class="cam-subopt-pill" data-filter="noir">Noir</div>
            </div>
        </div>

        <!-- Bottom Controls Section -->
        <div class="cam-bottom-section">
            <!-- Mode Carousel -->
            <div class="cam-mode-carousel" id="cam-mode-carousel">
                <div class="cam-mode-track">
                    <span class="cam-mode-btn" data-mode="ACCÉLÉRÉ">ACCÉLÉRÉ</span>
                    <span class="cam-mode-btn" data-mode="RALENTI">RALENTI</span>
                    <span class="cam-mode-btn" data-mode="CINÉMATIQUE">CINÉMATIQUE</span>
                    <span class="cam-mode-btn" data-mode="VIDÉO">VIDÉO</span>
                    <span class="cam-mode-btn active" data-mode="PHOTO">PHOTO</span>
                    <span class="cam-mode-btn" data-mode="PORTRAIT">PORTRAIT</span>
                    <span class="cam-mode-btn" data-mode="PANO">PANO</span>
                </div>
            </div>

            <!-- Action Buttons: Gallery Thumbnail, Shutter, Flip -->
            <div class="cam-actions-row">
                <!-- Gallery Thumbnail -->
                <div class="cam-gallery-thumb" id="cam-gallery-thumb" title="Photos"></div>

                <!-- Shutter Button -->
                <div class="cam-shutter-outer" id="cam-shutter-btn" title="Prendre une photo">
                    <div class="cam-shutter-inner"></div>
                </div>

                <!-- Camera Flip Button -->
                <div class="cam-flip-btn" id="cam-flip-btn" title="Changer de caméra">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 10c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 2.21 1 4.21 2.6 5.6L4 18"/>
                        <path d="M4 14c0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.21-1-4.21-2.6-5.6L20 6"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
`;
window.setupCameraApp = async function() {
                const container = document.querySelector(".camera-app-container");
                if (!container) return;

                const viewfinderWrapper = container.querySelector("#cam-viewfinder");
                const viewfinderVideo = container.querySelector("#camera-stream");
                const fallbackImg = container.querySelector("#camera-fallback-img");
                const zoomBtns = container.querySelectorAll(".cam-zoom-btn");
                const modeBtns = container.querySelectorAll(".cam-mode-btn");
                const shutterBtn = container.querySelector("#cam-shutter-btn");
                const flipBtn = container.querySelector("#cam-flip-btn");
                const galleryThumb = container.querySelector("#cam-gallery-thumb");
                const flashBtn = container.querySelector("#cam-btn-flash");
                const nightBtn = container.querySelector("#cam-btn-night");
                const liveBtn = container.querySelector("#cam-btn-live");
                const stylesBtn = container.querySelector("#cam-btn-styles");
                const rawBtn = container.querySelector("#cam-btn-raw");
                const drawerToggle = container.querySelector("#cam-drawer-toggle");
                const controlsDrawer = container.querySelector("#cam-controls-drawer");
                const drawerItems = container.querySelectorAll(".cam-drawer-item");
                const flashScreen = container.querySelector("#cam-flash-screen");
                const countdownOverlay = container.querySelector("#cam-countdown-overlay");
                const recHeader = container.querySelector("#cam-recording-header");
                const recTimerText = container.querySelector("#cam-recording-timer-text");
                const portraitOverlay = container.querySelector("#cam-portrait-overlay");
                const portraitLightLabel = container.querySelector("#cam-portrait-light-label");
                const gridOverlay = container.querySelector("#cam-grid-overlay");
                try { const preferences=JSON.parse(localStorage.getItem('iphone.settings.v1')||'{}');gridOverlay?.classList.toggle('active',Boolean(preferences['App : Appareil photo/Grille']??preferences['Appareil photo/Grille']));const quality=preferences['App : Appareil photo/Enregistrer une vidéo']??preferences['Appareil photo/Enregistrer une vidéo'];if(quality)container.querySelector('#cam-rec-quality').textContent=quality.replace(' à ',' • ').replace(' i/s',''); } catch {}
                const focusReticle = container.querySelector("#cam-focus-reticle");

                let currentFacingMode = "environment";
                let currentStream = null;
                let cameraAlive = true;
                let currentZoom = "1";
                let currentMode = "PHOTO";
                requestAnimationFrame(()=>{const selected=container.querySelector('.cam-mode-btn.active'),carousel=container.querySelector('#cam-mode-carousel');if(selected&&carousel)carousel.scrollLeft=selected.offsetLeft-carousel.offsetLeft-(carousel.clientWidth-selected.offsetWidth)/2;});
                let timerDelay = 0; // 0, 3, 10
                let isRecording = false;
                let recordSeconds = 0;
                let recordInterval = null;
                let mediaRecorder = null;
                let recordedChunks = [];
                let exposureBias = 0;
                let currentFilter = "none";
                let currentStyle = "standard";

                // Update Gallery Thumbnail Preview
                const refreshGalleryThumb = () => {
                    if (!galleryThumb) return;
                    try {
                        const photos = JSON.parse(localStorage.getItem("capturedPhotos") || "[]");
                        if (photos.length > 0) {
                            const first = photos[0];
                            const src = first && typeof first === "object" ? first.poster || first.src : first;
                            galleryThumb.style.backgroundImage = `url('${src}')`;
                        } else {
                            galleryThumb.style.backgroundImage = `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop&q=80')`;
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };
                refreshGalleryThumb();

                if (galleryThumb) {
                    galleryThumb.addEventListener("click", (e) => {
                        e.stopPropagation();
                        if (window.openApp) window.openApp("galerie");
                    });
                }

                // Camera Stream Initialization
                const startStream = async (facing) => {
                    if (currentStream) {
                        currentStream.getTracks().forEach(t => t.stop());
                    }
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({
                            video: (()=>{let prefs={};try{prefs=JSON.parse(localStorage.getItem('iphone.settings.v1')||'{}');}catch{}const quality=prefs['App : Appareil photo/Enregistrer une vidéo']??prefs['Appareil photo/Enregistrer une vidéo']??'1080p à 30 i/s';return {facingMode:facing,width:{ideal:quality.includes('4K')?3840:1920},height:{ideal:quality.includes('4K')?2160:1080},frameRate:{ideal:quality.includes('60')?60:30}};})(),
                            audio: false
                        });
                        if(!cameraAlive || !container.isConnected){stream.getTracks().forEach(track=>track.stop());return;}
                        if (viewfinderVideo) {
                            viewfinderVideo.srcObject = stream;
                            viewfinderVideo.style.display = "block";
                            if (fallbackImg) fallbackImg.style.display = "none";
                            currentStream = stream;
                            if (facing === "user") {
                                viewfinderVideo.classList.add("selfie");
                            } else {
                                viewfinderVideo.classList.remove("selfie");
                            }
                        }
                    } catch (err) {
                        console.warn("Camera access not available, using fallback visual.", err);
                        if (viewfinderVideo) viewfinderVideo.style.display = "none";
                        if (fallbackImg) fallbackImg.style.display = "block";
                    }
                };
                startStream(currentFacingMode);

                // Camera Flip (Rear / Front)
                if (flipBtn) {
                    flipBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
                        startStream(currentFacingMode);
                        if (fallbackImg) {
                            if (currentFacingMode === "user") {
                                fallbackImg.classList.add("selfie");
                            } else {
                                fallbackImg.classList.remove("selfie");
                            }
                        }
                    });
                }

                // Zoom Handler
                const applyZoom = (zoomVal) => {
                    currentZoom = zoomVal;
                    const scale = zoomVal === "0.5" ? 1.15 : zoomVal === "1" ? 1.45 : zoomVal === "2" ? 2.1 : 3.4;
                    const target = (viewfinderVideo && viewfinderVideo.style.display !== "none") ? viewfinderVideo : fallbackImg;
                    if (target) {
                        target.style.transform = `${target.classList.contains("selfie") ? "scaleX(-1) " : ""}scale(${scale})`;
                    }
                };
                applyZoom("1");

                zoomBtns.forEach((btn) => {
                    btn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        zoomBtns.forEach((b) => b.classList.remove("active"));
                        btn.classList.add("active");
                        applyZoom(btn.dataset.zoom);
                    });
                });

                // Sound Effect Helper
                const playShutterSound = () => {
                    try {
                        const audio = new Audio("camera_shutter.mp3");
                        audio.volume = 0.6;
                        audio.play().catch(() => {});
                    } catch (e) {}
                };

                // Flash screen effect
                const triggerFlashEffect = () => {
                    if (!flashScreen) return;
                    flashScreen.classList.add("flash");
                    setTimeout(() => {
                        flashScreen.classList.remove("flash");
                    }, 120);
                };

                // Mode Carousel Handling
                const portraitLights = ["Lumière naturelle", "Lumière de studio", "Lumière de contour", "Lumière de scène", "Scène mono", "High-Key mono"];
                let portraitLightIndex = 0;

                modeBtns.forEach((btn) => {
                    btn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        if (isRecording) return;
                        modeBtns.forEach((b) => b.classList.remove("active"));
                        btn.classList.add("active");
                        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                        currentMode = btn.dataset.mode || btn.textContent.trim();

                        // Update shutter appearance
                        if (currentMode.includes("VID") || currentMode.includes("CIN") || currentMode.includes("RALENTI") || currentMode.includes("ACCÉLÉRÉ")) {
                            shutterBtn?.classList.add("video-mode");
                        } else {
                            shutterBtn?.classList.remove("video-mode");
                        }

                        // Portrait Overlay
                        if (currentMode === "PORTRAIT") {
                            portraitOverlay?.classList.add("active");
                        } else {
                            portraitOverlay?.classList.remove("active");
                        }
                    });
                });

                // Portrait lighting change upon tap on portrait overlay
                if (portraitOverlay) {
                    portraitOverlay.addEventListener("click", (e) => {
                        e.stopPropagation();
                        portraitLightIndex = (portraitLightIndex + 1) % portraitLights.length;
                        if (portraitLightLabel) portraitLightLabel.textContent = portraitLights[portraitLightIndex];
                    });
                }

                // Controls Drawer Toggle
                if (drawerToggle) {
                    drawerToggle.addEventListener("click", (e) => {
                        e.stopPropagation();
                        controlsDrawer?.classList.toggle("active");
                        drawerToggle.classList.toggle("open");
                    });
                }

                // Drawer Tabs Handling
                drawerItems.forEach((item) => {
                    item.addEventListener("click", (e) => {
                        e.stopPropagation();
                        const tab = item.dataset.drawerTab;
                        drawerItems.forEach((d) => d.classList.remove("active"));
                        item.classList.add("active");

                        // Hide all subbar options
                        container.querySelectorAll(".cam-suboptions-bar, .cam-exposure-slider-wrap").forEach((bar) => {
                            bar.classList.remove("active");
                        });

                        const activeSubbar = container.querySelector(`#cam-subbar-${tab}`);
                        if (activeSubbar) activeSubbar.classList.add("active");
                    });
                });

                // Sub-options pills click
                container.querySelectorAll(".cam-subopt-pill").forEach((pill) => {
                    pill.addEventListener("click", (e) => {
                        e.stopPropagation();
                        const parent = pill.parentElement;
                        parent.querySelectorAll(".cam-subopt-pill").forEach((p) => p.classList.remove("active"));
                        pill.classList.add("active");

                        // Ratio change
                        if (pill.dataset.ratio) {
                            viewfinderWrapper.className = "cam-viewfinder-wrapper";
                            if (pill.dataset.ratio === "1-1") {
                                viewfinderWrapper.classList.add("ratio-1-1");
                            } else if (pill.dataset.ratio === "16-9") {
                                viewfinderWrapper.classList.add("ratio-16-9");
                            }
                        }

                        // Timer delay change
                        if (pill.dataset.delay !== undefined) {
                            timerDelay = parseInt(pill.dataset.delay, 10) || 0;
                        }

                        // Filter change
                        if (pill.dataset.filter) {
                            currentFilter = pill.dataset.filter;
                            const target = (viewfinderVideo && viewfinderVideo.style.display !== "none") ? viewfinderVideo : fallbackImg;
                            if (target) {
                                if (currentFilter === "mono" || currentFilter === "noir") target.style.filter = "grayscale(100%) contrast(120%)";
                                else if (currentFilter === "silvertone") target.style.filter = "grayscale(80%) sepia(20%)";
                                else if (currentFilter === "vivid" || currentFilter === "vivid-warm") target.style.filter = "saturate(160%) contrast(110%)";
                                else if (currentFilter === "dramatic") target.style.filter = "contrast(140%) saturate(80%)";
                                else target.style.filter = "none";
                            }
                        }
                    });
                });

                // Exposure Slider
                const exposureInput = container.querySelector("#cam-exposure-input");
                const exposureVal = container.querySelector("#cam-exposure-val");
                const exposureBadge = container.querySelector("#cam-badge-exposure");
                if (exposureInput) {
                    exposureInput.addEventListener("input", (e) => {
                        const val = (parseFloat(e.target.value) / 10).toFixed(1);
                        exposureBias = val;
                        if (exposureVal) exposureVal.textContent = (val > 0 ? `+${val}` : `${val}`);
                        if (exposureBadge) {
                            exposureBadge.style.display = val == 0 ? "none" : "block";
                            exposureBadge.textContent = (val > 0 ? `+${val}` : `${val}`);
                        }
                        const target = (viewfinderVideo && viewfinderVideo.style.display !== "none") ? viewfinderVideo : fallbackImg;
                        if (target) {
                            const brightness = 1 + (parseFloat(val) * 0.2);
                            target.style.filter = `brightness(${brightness})`;
                        }
                    });
                }

                // Tap-to-Focus Reticle
                if (viewfinderWrapper) {
                    viewfinderWrapper.addEventListener("click", (e) => {
                        if (e.target.closest(".cam-zoom-capsule") || e.target.closest(".cam-recording-header")) return;
                        const rect = viewfinderWrapper.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;

                        if (focusReticle) {
                            focusReticle.style.left = `${x}px`;
                            focusReticle.style.top = `${y}px`;
                            focusReticle.classList.remove("active");
                            void focusReticle.offsetWidth; // trigger reflow
                            focusReticle.classList.add("active");
                            setTimeout(() => {
                                focusReticle.classList.remove("active");
                            }, 2500);
                        }
                    });
                }

                // Top Bar Quick Toggles (Flash, Night, Live, Styles, RAW)
                if (flashBtn) {
                    flashBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        flashBtn.classList.toggle("active");
                    });
                }

                if (nightBtn) {
                    nightBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        nightBtn.classList.toggle("active");
                    });
                }

                if (liveBtn) {
                    liveBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        liveBtn.classList.toggle("active");
                    });
                }

                if (stylesBtn) {
                    stylesBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        controlsDrawer?.classList.add("active");
                        drawerToggle?.classList.add("open");
                        container.querySelector('[data-drawer-tab="styles"]')?.click();
                    });
                }

                if (rawBtn) {
                    rawBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        rawBtn.classList.toggle("off");
                    });
                }

                // Capture Function
                const takePhotoNow = () => {
                    playShutterSound();
                    triggerFlashEffect();

                    let photoSrc = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80";
                    if (viewfinderVideo && viewfinderVideo.style.display !== "none") {
                        try {
                            const canvas = document.createElement("canvas");
                            canvas.width = viewfinderVideo.videoWidth || 1280;
                            canvas.height = viewfinderVideo.videoHeight || 720;
                            const ctx = canvas.getContext("2d");
                            if (currentFacingMode === "user") {
                                ctx.translate(canvas.width, 0);
                                ctx.scale(-1, 1);
                            }
                            ctx.drawImage(viewfinderVideo, 0, 0, canvas.width, canvas.height);
                            photoSrc = canvas.toDataURL("image/jpeg", 0.88);
                        } catch (err) {
                            console.error("Canvas grab error", err);
                        }
                    }

                    try {
                        const photos = JSON.parse(localStorage.getItem("capturedPhotos") || "[]");
                        const dateStr = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
                        photos.unshift({
                            id:'media-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),
                            src: photoSrc,
                            date: dateStr,
                            mode: currentMode,
                            isVideo: false
                        });
                        localStorage.setItem("capturedPhotos", JSON.stringify(photos));
                    } catch (err) {
                        console.error("LocalStorage error", err);
                    }

                    refreshGalleryThumb();
                };

                // Shutter Button Action (Photo / Video / Countdown)
                if (shutterBtn) {
                    shutterBtn.addEventListener("click", async (e) => {
                        e.stopPropagation();

                        // Video / Cinematic / Slow-Mo / Timelapse Recording
                        if (currentMode.includes("VID") || currentMode.includes("CIN") || currentMode.includes("RALENTI") || currentMode.includes("ACCÉLÉRÉ")) {
                            if (!isRecording) {
                                if(!currentStream || typeof MediaRecorder==='undefined'){recHeader?.classList.add('active');if(recTimerText)recTimerText.textContent='Caméra vidéo indisponible';setTimeout(()=>recHeader?.classList.remove('active'),2500);return;}
                                recordedChunks=[];
                                const mime=['video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'].find(type=>MediaRecorder.isTypeSupported(type));
                                try{mediaRecorder=new MediaRecorder(currentStream,mime?{mimeType:mime}:{});}catch{if(recTimerText)recTimerText.textContent='Enregistrement indisponible';recHeader?.classList.add('active');return;}
                                const recorder=mediaRecorder,chunks=[],started=Date.now();
                                const posterCanvas=document.createElement('canvas');posterCanvas.width=320;posterCanvas.height=180;try{posterCanvas.getContext('2d').drawImage(viewfinderVideo,0,0,320,180);}catch{}
                                const poster=posterCanvas.toDataURL('image/jpeg',.7);
                                recorder.ondataavailable=event=>{if(event.data.size)chunks.push(event.data);};
                                recorder.onstop=()=>{const blob=new Blob(chunks,{type:recorder.mimeType||'video/webm'});const reader=new FileReader();const duration=Math.max(1,Math.round((Date.now()-started)/1000));reader.onload=()=>{try{const photos=JSON.parse(localStorage.getItem('capturedPhotos')||'[]');photos.unshift({id:'media-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),src:reader.result,poster,date:new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'}),mode:currentMode,duration:duration+'s',isVideo:true});localStorage.setItem('capturedPhotos',JSON.stringify(photos));refreshGalleryThumb();window.refreshSimulatorPhotos?.();}catch{if(recTimerText)recTimerText.textContent='Stockage local plein';recHeader?.classList.add('active');}};reader.readAsDataURL(blob);};
                                mediaRecorder.start(250);
                                isRecording = true;
                                shutterBtn.classList.add("recording");
                                recHeader?.classList.add("active");
                                recordSeconds = 0;
                                if (recTimerText) recTimerText.textContent = "00:00";

                                recordInterval = setInterval(() => {
                                    recordSeconds++;
                                    const mins = Math.floor(recordSeconds / 60).toString().padStart(2, "0");
                                    const secs = (recordSeconds % 60).toString().padStart(2, "0");
                                    if (recTimerText) recTimerText.textContent = `${mins}:${secs}`;
                                }, 1000);

                                playShutterSound();
                            } else {
                                isRecording = false;
                                shutterBtn.classList.remove("recording");
                                recHeader?.classList.remove("active");
                                clearInterval(recordInterval);
                                playShutterSound();

                                if(mediaRecorder?.state==='recording')mediaRecorder.stop();
                                refreshGalleryThumb();
                            }
                            return;
                        }

                        // Photo with optional countdown
                        if (timerDelay > 0) {
                            let count = timerDelay;
                            if (countdownOverlay) {
                                countdownOverlay.textContent = count;
                                countdownOverlay.classList.add("active");
                            }
                            const countInterval = setInterval(() => {
                                count--;
                                if (count <= 0) {
                                    clearInterval(countInterval);
                                    if (countdownOverlay) countdownOverlay.classList.remove("active");
                                    takePhotoNow();
                                } else {
                                    if (countdownOverlay) countdownOverlay.textContent = count;
                                }
                            }, 1000);
                        } else {
                            takePhotoNow();
                        }
                    });
                }

                window.simulatorCameraCleanup=()=>{cameraAlive=false;if(mediaRecorder?.state==='recording')mediaRecorder.stop();if(currentStream){currentStream.getTracks().forEach(track=>track.stop());currentStream=null;}if(recordInterval)clearInterval(recordInterval);};
                // Cleanup stream on close
                const originalCloseApp = window.closeApp;
                window.closeApp = function () {
                    window.simulatorCameraCleanup?.();
                    if (currentStream) {
                        currentStream.getTracks().forEach((track) => track.stop());
                        currentStream = null;
                    }
                    if (recordInterval) clearInterval(recordInterval);
                    window.closeApp = originalCloseApp;
                    if (originalCloseApp) originalCloseApp();
                };
            };
