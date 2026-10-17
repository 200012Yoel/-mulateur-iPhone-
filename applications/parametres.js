/* Styles et logique regroupés pour cette application. */
(() => {const style=document.createElement('style');style.dataset.application="parametres";style.textContent="\n        /* Settings App Styles moved from styles/apps.css */\n\n        .app-view.settings-active {\n            background-color: #f2f2f7;\n            overflow-y: hidden;\n            padding-bottom: 0;\n        }\n\n        .app-view.settings-active .app-main-content {\n            background-color: #f2f2f7;\n            display: block;\n            overflow-y: auto;\n            -webkit-overflow-scrolling: touch;\n            padding: 40px 16px 80px 16px;\n        }\n\n        .settings-active h1 {\n            font-size: 34px;\n            font-weight: 700;\n            margin-bottom: 24px;\n            color: black;\n        }\n\n        .settings-active .profile-card {\n            background: white;\n            border-radius: 13px;\n            padding: 14px 16px;\n            display: flex;\n            align-items: center;\n            gap: 14px;\n            margin-bottom: 36px;\n            cursor: pointer;\n            transition: opacity 0.15s;\n        }\n\n        .settings-active .profile-card:active {\n            opacity: 0.6;\n        }\n\n        .settings-active .avatar {\n            width: 60px;\n            height: 60px;\n            border-radius: 50%;\n            background: linear-gradient(145deg, #9ca3d4, #7b83bf);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            font-size: 22px;\n            font-weight: 600;\n            flex-shrink: 0;\n            letter-spacing: 0.5px;\n            color: white;\n        }\n\n        .settings-active .profile-info {\n            flex: 1;\n        }\n\n        .settings-active .profile-name {\n            font-size: 18px;\n            font-weight: 600;\n            color: black;\n        }\n\n        .settings-active .profile-sub {\n            font-size: 13px;\n            color: #8e8e93;\n            margin-top: 2px;\n        }\n\n        .settings-active .chevron {\n            color: #c6c6c8;\n            font-size: 18px;\n        }\n\n        .settings-active .settings-group {\n            background: white;\n            border-radius: 13px;\n            overflow: hidden;\n            margin-bottom: 36px;\n        }\n\n        .settings-active .settings-row {\n            display: flex;\n            align-items: center;\n            padding: 11px 16px;\n            cursor: pointer;\n            transition: background 0.12s;\n            position: relative;\n            min-height: 54px;\n        }\n\n        .settings-active .settings-row:active {\n            background: #e5e5e7;\n        }\n\n        .settings-active .settings-row:not(:last-child)::after {\n            content: '';\n            position: absolute;\n            bottom: 0;\n            left: 58px;\n            right: 0;\n            height: 0.5px;\n            background: #c6c6c8;\n        }\n\n        .settings-active .ic {\n            width: 30px;\n            height: 30px;\n            border-radius: 7px;\n            margin-right: 14px;\n            flex-shrink: 0;\n            display: block;\n            overflow: hidden;\n        }\n\n        .settings-active .row-label {\n            flex: 1;\n            font-size: 17px;\n            font-weight: 400;\n            line-height: 1.3;\n            color: black;\n        }\n\n        .settings-active .chevron-row {\n            color: #c6c6c8;\n            font-size: 17px;\n        }\n\n        .settings-active .toggle {\n            width: 51px;\n            height: 31px;\n            background: #e9e9ea;\n            border-radius: 16px;\n            position: relative;\n            cursor: pointer;\n            transition: background 0.25s;\n            flex-shrink: 0;\n        }\n\n        .settings-active .toggle::after {\n            content: '';\n            position: absolute;\n            width: 27px;\n            height: 27px;\n            background: white;\n            border-radius: 50%;\n            top: 2px;\n            left: 2px;\n            transition: transform 0.25s;\n            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n        }\n\n        .settings-active .toggle.on {\n            background: #34c759;\n        }\n\n        .settings-active .toggle.on::after {\n            transform: translateX(20px);\n        }\n\n        .settings-search-bar {\n            width: 100%;\n            padding: 8px 10px;\n            border: none;\n            border-radius: 8px;\n            background-color: #e5e5e7;\n            font-size: 16px;\n            box-sizing: border-box;\n            margin-top: 10px;\n            outline: none;\n        }\n    "+".settings-active .sim-search{box-sizing:border-box;width:100%;border:0;border-radius:12px;background:#e3e3e8;padding:12px 14px;margin:0 0 22px;font:inherit;color:inherit}\n.settings-active [hidden]{display:none!important}\n.settings-active .sim-nav{position:sticky;top:-40px;z-index:2;background:#f2f2f7ed;backdrop-filter:blur(18px);display:flex;align-items:center;gap:12px;min-height:58px;margin:-10px -8px 16px;padding:8px}\n.settings-active .sim-nav button{color:#007aff;background:none;border:0;font:inherit;max-width:47%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer}\n.settings-active .sim-nav>span{font-weight:600;flex:1;line-height:1.25}\n.settings-active .sim-group{background:white;border-radius:12px;overflow:hidden}\n.settings-active .sim-row{position:relative;display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:48px;padding:8px 16px;box-sizing:border-box;font-size:16px;color:#111}\n.settings-active .sim-row+.sim-row:before{content:'';position:absolute;left:16px;right:0;top:0;border-top:1px solid #d8d8dc}\n.settings-active .sim-row>span:first-child{flex:1;line-height:1.3}\n.settings-active .sim-row input[type=checkbox]{appearance:none;flex-shrink:0;width:51px;height:31px;background:#e4e4e8;border-radius:30px;position:relative;cursor:pointer;transition:background .2s}\n.settings-active .sim-row input[type=checkbox]:after{content:'';position:absolute;top:2px;left:2px;width:27px;height:27px;border-radius:50%;background:#fff;box-shadow:0 2px 4px #0002;transition:transform .2s}\n.settings-active .sim-row input:checked{background:#34c759}\n.settings-active .sim-row input:checked:after{transform:translateX(20px)}\n.settings-active .sim-row select,.settings-active .sim-row input[type=text]{max-width:52%;min-width:0;border:0;background:transparent;color:#73737a;font:inherit;text-align:right;padding:8px 0}\n.settings-active .sim-row input[type=range]{width:45%;accent-color:#007aff}\n.settings-active .sim-note{font-size:12px!important;line-height:1.5;color:#73737a;padding:0 14px;margin:12px 0 18px}\n.settings-active .sim-value{max-width:54%;text-align:right;color:#73737a;font-size:14px}\n.settings-active .sim-link{flex:1;border:0;background:none;text-align:left;padding:6px 0;color:#007aff;font:inherit;cursor:pointer}\n.settings-active .sim-chevron{font-size:24px;color:#b4b4ba}\n.settings-active .sim-dark{background:#000!important;color:#fff;color-scheme:dark}\n.settings-active .sim-dark .sim-group,.settings-active .sim-dark .settings-group,.settings-active .sim-dark .profile-card{background:#1c1c1e}\n.settings-active .sim-dark .sim-row,.settings-active .sim-dark h1,.settings-active .sim-dark .row-label,.settings-active .sim-dark .profile-name{color:#fff}\n.settings-active .sim-dark .sim-nav{background:#000e}\n.settings-active .sim-dark .sim-search{background:#242426}\n.settings-active .sim-bold{font-weight:600}\n.settings-active .sim-reduced-motion *{transition:none!important;animation:none!important}\n.settings-active :focus-visible{outline:2px solid #007aff;outline-offset:3px}\n";document.head.append(style);})();
(() => {
var airplaneIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#ff9500" rx="13"/>
      <path d="M30 8c-2.2 0-4 1.8-4 4v10.5L10 30v5l16-4v9l-4 3v4l8-2 8 2v-4l-4-3v-9l16 4v-5L34 22.5V12c0-2.2-1.8-4-4-4z" fill="white"/>
    </svg>
`;
            var wifiIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#007aff" rx="13"/>
      <g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <path stroke-width="5" d="M11 26c10.5-10 27.5-10 38 0"/>
        <path stroke-width="5" d="M17 33c7-7 19-7 26 0"/>
        <path stroke-width="5" d="M23 40c3.5-3.5 10-3.5 14 0"/>
        <circle cx="30" cy="47" r="3" fill="white" stroke="none"/>
      </g>
    </svg>
`;
            var bluetoothIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#007aff" rx="13"/>
      <path d="M30 12v36M30 12l12 12-12 12M30 48l12-12-12-12" fill="none" stroke="white" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;
            var cellularIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#34c759" rx="13"/>
      <rect x="10" y="36" width="8" height="14" rx="2" fill="white"/>
      <rect x="22" y="28" width="8" height="22" rx="2" fill="white"/>
      <rect x="34" y="20" width="8" height="30" rx="2" fill="white"/>
      <rect x="46" y="12" width="8" height="38" rx="2" fill="white"/>
    </svg>
`;
            var hotspotIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#34c759" rx="13"/>
      <circle cx="30" cy="14" r="7" fill="none" stroke="white" stroke-width="4"/>
      <circle cx="12" cy="46" r="7" fill="none" stroke="white" stroke-width="4"/>
      <circle cx="48" cy="46" r="7" fill="none" stroke="white" stroke-width="4"/>
      <line x1="30" y1="21" x2="12" y2="39" stroke="white" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="30" y1="21" x2="48" y2="39" stroke="white" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="19" y1="46" x2="41" y2="46" stroke="white" stroke-width="3.5" stroke-linecap="round"/>
    </svg>
`;
            var batteryIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#34c759" rx="13"/>
      <rect x="5" y="19" width="44" height="22" rx="5" fill="none" stroke="white" stroke-width="3.5"/>
      <rect x="51" y="26" width="6" height="8" rx="2" fill="white"/>
      <rect x="10" y="24" width="28" height="12" rx="2.5" fill="white"/>
    </svg>
`;
            var generalIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#8e8e93" rx="13"/>
      <circle cx="30" cy="30" r="7" fill="white"/>
      <g fill="white">
        <rect x="28" y="8" width="4" height="7" rx="2"/>
        <rect x="28" y="45" width="4" height="7" rx="2"/>
        <rect x="8" y="28" width="7" height="4" rx="2"/>
        <rect x="45" y="28" width="7" height="4" rx="2"/>
        <rect x="14.5" y="13" width="4" height="7" rx="2" transform="rotate(45 16.5 16.5)"/>
        <rect x="41.5" y="40" width="4" height="7" rx="2" transform="rotate(45 43.5 43.5)"/>
        <rect x="40" y="13" width="4" height="7" rx="2" transform="rotate(-45 42 16.5)"/>
        <rect x="13" y="40" width="4" height="7" rx="2" transform="rotate(-45 15 43.5)"/>
      </g>
    </svg>
`;
            var accessibilityIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#007aff" rx="13"/>
      <circle cx="30" cy="14" r="6" fill="white"/>
      <path d="M30 22c-10 0-14 3-14 3l5 9h7v14h4V34h7l5-9s-4-3-14-3z" fill="white"/>
    </svg>
`;
            var cameraIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#636366" rx="13"/>
      <path d="M22 17l-4 6H9a3 3 0 0 0-3 3v19a3 3 0 0 0 3 3h42a3 3 0 0 0 3-3V26a3 3 0 0 0-3-3H42l-4-6H22z" fill="none" stroke="white" stroke-width="3.5" stroke-linejoin="round"/>
      <circle cx="30" cy="34" r="9" fill="none" stroke="white" stroke-width="3.5"/>
      <circle cx="30" cy="34" r="4" fill="white"/>
      <circle cx="45" cy="23" r="2" fill="white"/>
    </svg>
`;
            var controlCenterIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#636366" rx="13"/>
      <g fill="none" stroke="white" stroke-linecap="round">
        <path stroke-width="3" d="M10 23c3.5-3.5 9-3.5 12.5 0"/>
        <path stroke-width="3" d="M12.5 25.5c1-1 4-1 5 0"/>
        <circle cx="16.3" cy="28" r="2" fill="white" stroke="none"/>
      </g>
      <circle cx="43" cy="20" r="4.5" fill="white"/>
      <g stroke="white" stroke-width="2.5" stroke-linecap="round">
        <line x1="43" y1="11" x2="43" y2="13.5"/>
        <line x1="43" y1="26.5" x2="43" y2="29"/>
        <line x1="34" y1="20" x2="36.5" y2="20"/>
        <line x1="49.5" y1="20" x2="52" y2="20"/>
        <line x1="36.8" y1="13.8" x2="38.6" y2="15.6"/>
        <line x1="47.4" y1="24.4" x2="49.2" y2="26.2"/>
        <line x1="49.2" y1="13.8" x2="47.4" y2="15.6"/>
        <line x1="38.6" y1="24.4" x2="36.8" y2="26.2"/>
      </g>
      <path d="M20 36a8 8 0 1 0 8 8 6 6 0 0 1-8-8z" fill="white"/>
      <path d="M43 32c-1.1 0-2 .9-2 2v5l-5 3v2.5l5-1.5v3l-1.5 1v2l3.5-1 3.5 1v-2L45 47v-3l5 1.5V43l-5-3v-5c0-1.1-.9-2-2-2z" fill="white"/>
    </svg>
`;
            var homeScreenIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#007aff" rx="13"/>
      <rect x="8" y="8" width="18" height="18" rx="4" fill="white"/>
      <rect x="34" y="8" width="18" height="18" rx="4" fill="white"/>
      <rect x="8" y="34" width="18" height="18" rx="4" fill="white"/>
      <rect x="34" y="34" width="18" height="18" rx="4" fill="white"/>
    </svg>
`;
            var standbyIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#1c1c1e" rx="13"/>
      <rect x="6" y="14" width="21" height="15" rx="3" fill="#2c2c2e" stroke="#555" stroke-width="1"/>
      <rect x="9" y="17" width="5" height="4" rx="1" fill="#ff9500"/>
      <rect x="19" y="17" width="5" height="4" rx="1" fill="#ff9500"/>
      <rect x="33" y="14" width="21" height="15" rx="3" fill="#2c2c2e" stroke="#555" stroke-width="1"/>
      <circle cx="43.5" cy="21.5" r="4" fill="none" stroke="white" stroke-width="1.5"/>
      <circle cx="43.5" cy="21.5" r="1.5" fill="#ff9500"/>
      <rect x="6" y="34" width="48" height="12" rx="3" fill="#2c2c2e" stroke="#555" stroke-width="1"/>
    </svg>
`;
            var wallpaperIcon = `
    <svg class="ic" viewBox="0 0 60 60">
      <defs>
        <radialGradient id="wg" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#a8d8ff"/>
          <stop offset="60%" stop-color="#32ade6"/>
          <stop offset="100%" stop-color="#0055cc"/>
        </radialGradient>
      </defs>
      <rect width="60" height="60" fill="url(#wg)" rx="13"/>
      <path d="M0 40 Q15 30 30 40 Q45 50 60 40" fill="none" stroke="white" stroke-width="2" opacity="0.4"/>
      <path d="M0 30 Q15 20 30 30 Q45 40 60 30" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
      <circle cx="20" cy="22" r="8" fill="white" opacity="0.2"/>
      <circle cx="42" cy="18" r="5" fill="white" opacity="0.15"/>
    </svg>
`;
            var brightnessIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#32ade6" rx="13"/>
      <circle cx="30" cy="30" r="9" fill="white"/>
      <g stroke="white" stroke-width="4" stroke-linecap="round">
        <line x1="30" y1="8"  x2="30" y2="15"/>
        <line x1="30" y1="45" x2="30" y2="52"/>
        <line x1="8"  y1="30" x2="15" y2="30"/>
        <line x1="45" y1="30" x2="52" y2="30"/>
        <line x1="15" y1="15" x2="20" y2="20"/>
        <line x1="40" y1="40" x2="45" y2="45"/>
        <line x1="45" y1="15" x2="40" y2="20"/>
        <line x1="20" y1="40" x2="15" y2="45"/>
      </g>
    </svg>
`;
            var searchIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#8e8e93" rx="13"/>
      <g fill="none" stroke="white" stroke-width="5" stroke-linecap="round">
        <circle cx="26" cy="26" r="12"/>
        <line x1="35" y1="35" x2="50" y2="50"/>
      </g>
    </svg>
`;
            var siriIcon = `
    <svg class="ic" viewBox="0 0 60 60">
      <defs>
        <radialGradient id="siriGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1a1a3e"/>
          <stop offset="100%" stop-color="#0a0a1a"/>
        </radialGradient>
      </defs>
      <rect width="60" height="60" fill="url(#siriGrad)" rx="13"/>
      <path d="M8 30 Q14 18 20 30 Q26 42 30 30 Q34 18 40 30 Q46 42 52 30" fill="none" stroke="#ff375f" stroke-width="3" stroke-linecap="round"/>
      <path d="M12 30 Q18 22 24 30 Q30 38 36 30 Q42 22 48 30" fill="none" stroke="#bf5af2" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
      <circle cx="30" cy="30" r="5" fill="#007aff" opacity="0.8"/>
      <circle cx="30" cy="30" r="2.5" fill="#5ac8fa"/>
    </svg>
`;
            var notificationsIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#ff3b30" rx="13"/>
      <path d="M30 9a2.5 2.5 0 0 0-2.5 2.5v1.8C21 15 16 21 16 28v11l-4 5h36l-4-5V28c0-7-5-13-11.5-14.7V11.5A2.5 2.5 0 0 0 30 9z" fill="white"/>
      <path d="M24 44a6 6 0 0 0 12 0" fill="white"/>
    </svg>
`;
            var soundsIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#ff3b30" rx="13"/>
      <path d="M10 23h9l11-10v34L19 37H10z" fill="white"/>
      <path d="M35 19a15 15 0 0 1 0 22" fill="none" stroke="white" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M39 14a21 21 0 0 1 0 32" fill="none" stroke="white" stroke-width="4.5" stroke-linecap="round"/>
    </svg>
`;
            var focusIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#5e5ce6" rx="13"/>
      <path d="M37 13a18 18 0 1 1-18 30A14 14 0 0 0 37 13z" fill="white"/>
    </svg>
`;
            var screenTimeIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#bf5af2" rx="13"/>
      <rect x="16" y="8" width="28" height="44" rx="5" fill="none" stroke="white" stroke-width="3.5"/>
      <rect x="20" y="38" width="6" height="9" rx="1.5" fill="white"/>
      <rect x="28" y="31" width="6" height="16" rx="1.5" fill="white"/>
      <rect x="36" y="25" width="6" height="22" rx="1.5" fill="white"/>
      <rect x="24" y="13" width="12" height="2" rx="1" fill="white" opacity="0.5"/>
    </svg>
`;
            var faceIdIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#30d158" rx="13"/>
      <g fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round">
        <path d="M13 22v-9h9"/>
        <path d="M38 13h9v9"/>
        <path d="M13 38v9h9"/>
        <path d="M38 47h9v-9"/>
        <line x1="22" y1="27" x2="22" y2="29"/>
        <line x1="38" y1="27" x2="38" y2="29"/>
        <path d="M30 29v3l-2 2"/>
        <path d="M22 37c2 3 14 3 16 0"/>
      </g>
    </svg>
`;
            var emergencySosIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#ff3b30" rx="13"/>
      <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle"
        font-family="-apple-system,Helvetica Neue,sans-serif" font-size="20" font-weight="900" fill="white" letter-spacing="1">SOS</text>
    </svg>
`;
            var privacyIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#007aff" rx="13"/>
      <g fill="white">
        <rect x="22" y="28" width="16" height="20" rx="4"/>
        <rect x="22" y="14" width="4.5" height="18" rx="2.5"/>
        <rect x="28" y="11" width="4.5" height="20" rx="2.5"/>
        <rect x="33.5" y="13" width="4.5" height="18" rx="2.5"/>
        <rect x="16" y="22" width="8" height="4.5" rx="2.5"/>
      </g>
    </svg>
`;
            var walletPayIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="#1a1a1a" rx="13"/>
      <rect x="7" y="36" width="46" height="17" rx="4" fill="#f5c200"/>
      <rect x="7" y="26" width="46" height="19" rx="4" fill="#e86820"/>
      <rect x="7" y="14" width="46" height="20" rx="4" fill="#cc2200"/>
      <rect x="7" y="21" width="46" height="5" fill="white" opacity="0.2"/>
      <rect x="13" y="17" width="13" height="9" rx="2.5" fill="#d4a800"/>
      <rect x="13" y="17" width="13" height="9" rx="2.5" fill="none" stroke="#b89000" stroke-width="0.8"/>
      <line x1="13" y1="21.5" x2="26" y2="21.5" stroke="#b89000" stroke-width="0.7"/>
      <line x1="19.5" y1="17" x2="19.5" y2="26" stroke="#b89000" stroke-width="0.7"/>
    </svg>
`;
            var gameCenterIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="white" rx="13"/>
      <circle cx="22" cy="30" r="16" fill="#ff375f"/>
      <circle cx="38" cy="22" r="16" fill="#ff9f0a"/>
      <circle cx="38" cy="38" r="16" fill="#30d158"/>
    </svg>
`;
            var icloudIcon = `
    <svg class="ic" viewBox="0 0 60 60"><rect width="60" height="60" fill="white" rx="13"/>
      <defs>
        <linearGradient id="cloudG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#64b5f6"/>
          <stop offset="100%" stop-color="#1565c0"/>
        </linearGradient>
      </defs>
      <circle cx="21" cy="35" r="12" fill="url(#cloudG)"/>
      <circle cx="39" cy="35" r="12" fill="url(#cloudG)"/>
      <circle cx="30" cy="26" r="12" fill="url(#cloudG)"/>
      <rect x="9" y="31" width="42" height="16" fill="url(#cloudG)"/>
    </svg>
`;
            var appsIcon = `
    <svg class="ic" viewBox="0 0 60 60">
      <defs>
        <linearGradient id="appsBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#7b6ffa"/>
          <stop offset="100%" stop-color="#4338d4"/>
        </linearGradient>
      </defs>
      <rect width="60" height="60" fill="url(#appsBg)" rx="13"/>
      <rect x="9"  y="9"  width="13" height="13" rx="3" fill="#ff375f"/>
      <rect x="24" y="9"  width="13" height="13" rx="3" fill="#ff9f0a"/>
      <rect x="39" y="9"  width="13" height="13" rx="3" fill="#ffd60a"/>
      <rect x="9"  y="24" width="13" height="13" rx="3" fill="#34c759"/>
      <rect x="24" y="24" width="13" height="13" rx="3" fill="#5ac8fa"/>
      <rect x="39" y="24" width="13" height="13" rx="3" fill="#007aff"/>
      <rect x="9"  y="39" width="13" height="13" rx="3" fill="#bf5af2"/>
      <rect x="24" y="39" width="13" height="13" rx="3" fill="#ff6b6b"/>
      <rect x="39" y="39" width="13" height="13" rx="3" fill="#ff9f0a"/>
    </svg>;
`;


window.settingsTemplate = `
    <h1>R\xE9glages</h1>

    <div class="profile-card">
      <div class="avatar">YC</div>
      <div class="profile-info">
        <div class="profile-name">Yoel Cohen</div>
        <div class="profile-sub">Compte Apple, iCloud et autres</div>
      </div>
      <span class="chevron">\u203A</span>
    </div>

    <div class="settings-group">
      <div class="settings-row">
        ${airplaneIcon}
        <span class="row-label">Mode Avion</span>
        <div class="toggle"></div>
      </div>

      <div class="settings-row">
        ${wifiIcon}
        <span class="row-label">Wi-Fi</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${bluetoothIcon}
        <span class="row-label">Bluetooth</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${cellularIcon}
        <span class="row-label">Donn\xE9es cellulaires</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${hotspotIcon}
        <span class="row-label">Partage de connexion</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${batteryIcon}
        <span class="row-label">Batterie</span>
        <span class="chevron-row">\u203A</span>
      </div>
    </div>

    <div class="settings-group">
      <div class="settings-row">
        ${generalIcon}
        <span class="row-label">G\xE9n\xE9ral</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${accessibilityIcon}
        <span class="row-label">Accessibilit\xE9</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${cameraIcon}
        <span class="row-label">Appareil photo</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${controlCenterIcon}
        <span class="row-label">Centre de contr\xF4le</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${homeScreenIcon}
        <span class="row-label" style="line-height:1.3">\xC9cran d'accueil et biblioth\xE8que d'apps</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${standbyIcon}
        <span class="row-label">En veille</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${wallpaperIcon}
        <span class="row-label">Fond d'\xE9cran</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${brightnessIcon}
        <span class="row-label">Luminosit\xE9 et affichage</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${searchIcon}
        <span class="row-label">Recherche</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${siriIcon}
        <span class="row-label">Siri</span>
        <span class="chevron-row">\u203A</span>
      </div>
    </div>

    <div class="settings-group">
      <div class="settings-row">
        ${notificationsIcon}
        <span class="row-label">Notifications</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${soundsIcon}
        <span class="row-label">Sons et vibrations</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${focusIcon}
        <span class="row-label">Concentration</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${screenTimeIcon}
        <span class="row-label">Temps d'\xE9cran</span>
        <span class="chevron-row">\u203A</span>
      </div>
    </div>

    <div class="settings-group">
      <div class="settings-row">
        ${faceIdIcon}
        <span class="row-label">Face ID et code</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${emergencySosIcon}
        <span class="row-label">Appel d'urgence</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${privacyIcon}
        <span class="row-label">Confidentialit\xE9 et s\xE9curit\xE9</span>
        <span class="chevron-row">\u203A</span>
      </div>
    </div>

    <div class="settings-group">
      <div class="settings-row">
        ${walletPayIcon}
        <span class="row-label">Cartes et Apple Pay</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${gameCenterIcon}
        <span class="row-label">Game Center</span>
        <span class="chevron-row">\u203A</span>
      </div>

      <div class="settings-row">
        ${icloudIcon}
        <span class="row-label">iCloud</span>
        <span class="chevron-row">\u203A</span>
      </div>
    </div>

    <div class="settings-group" style="margin-bottom:60px">
      <div class="settings-row">
        ${appsIcon}
        <span class="row-label">Apps</span>
        <span class="chevron-row">\u203A</span>
      </div>
    </div>
`;
})();
/* Local settings simulation. No device credentials or real network operations. */
(() => {
  const storageKey = 'iphone.settings.v1';
  let state = {};
  try { state = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch {}
  const get = (key, fallback) => state[key] ?? fallback;
  const save = () => { try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {} window.dispatchEvent(new Event('simulated-settings-changed')); };
  window.setSimulatedSetting=(key,value)=>{state[key]=value;save();};
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const link = (label, target = label) => ({label, target});
  const toggle = (label, value = true) => ({label, type: 'toggle', value});
  const choice = (label, options) => ({label, type: 'choice', options});
  const field = (label, value) => ({label, type: 'field', value});
  const info = (label, value) => ({label, type: 'info', value});
  const apps = ['Appareil photo', 'App Store', 'Calendrier', 'Cartes', 'Contacts', 'FaceTime', 'Fichiers', 'Horloge', 'Mail', 'Messages', 'Musique', 'Notes', 'Photos', 'Rappels', 'Safari', 'Téléphone'];
  const catalog = () => typeof window.getSimulatorApps === 'function' ? window.getSimulatorApps() : apps.map(name=>({id:name,name}));
  for(const event of ['simulator-apps-changed','app-installed','app-updated','app-uninstalled','storage'])window.addEventListener(event,e=>{
    if(event==='storage' && !['ios_installed_apps','ios_uninstalled_apps',null].includes(e.key))return;
    document.querySelectorAll('.settings-active .app-main-content').forEach(root=>root.refreshSettingsApps?.());
  });
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
    'État de santé et recharge': [info('État de santé de la batterie','Normal'),info('Capacité maximum','100 % (simulation)'),info('Nombre de cycles','128 (simulation)'),info('Date de fabrication','Juillet 2024 — démonstration'),info('Première utilisation','Septembre 2024 — démonstration')],
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
    'Apps par défaut': [choice('Navigateur', ['Safari']), choice('Appels', ['Téléphone']), choice('Messages', ['Messages'])],
    'App : Safari': [link('Siri','Safari : Siri'), link('Recherche','Safari : Recherche'), choice('Navigateur par défaut',['Safari']), choice('Langue',['Français','English']), choice('Moteur de recherche',['Google','Bing','DuckDuckGo','Ecosia','Yahoo']), toggle('Utiliser également en navigation privée'), toggle('Suggestions moteur de rech.'), toggle('Suggestions Safari'), toggle('Afficher les recherches récentes'), choice('Recherche rapide',['Oui','Non']), toggle('Précharger le meilleur résultat'), link('Remplissage automatique','Safari : Remplissage automatique'), toggle('Bloquer les pop-up'), toggle('Empêcher le suivi intersite'), toggle('Alerte si site web frauduleux')],
    'Safari : Siri': [toggle('Apprendre de cette app'), toggle('Afficher dans l’app'), toggle('Suggérer des raccourcis')],
    'Safari : Recherche': [toggle('Afficher l’app dans Rechercher'),toggle('Afficher le contenu dans Rechercher')],
    'Safari : Remplissage automatique': [toggle('Utiliser les coordonnées',false),toggle('Cartes bancaires',false),info('Données','Aucune donnée personnelle enregistrée')],
    'Autre réseau…': [field('Nom du réseau', ''), choice('Sécurité', ['WPA2/WPA3', 'Aucune']), {label:'Rejoindre ce réseau',type:'custom-network'}]
  };
  for (const name of ['Ne pas déranger','Repos','Travail','Temps pour soi']) pages[name] = [toggle('Activer', false), toggle('Partager le statut de concentration'), choice('Notifications autorisées', ['Aucune', 'Contacts', 'Tout le monde'])];
  function definition(title) {
    if(title==='Informations')return pages[title].map(row=>row.label==='Version du système'?info(row.label,'iOS '+get('update/installedMajor','18.6')+' (simulation)'):row.label==='Nom du modèle'?info(row.label,'iPhone 16 Pro Max (simulation)'):row);
    if (pages[title]) return pages[title];
    if (title.startsWith('Réseau : ')) return [toggle('Connexion auto'), choice('Adresse Wi-Fi privée', ['Fixe', 'Rotation', 'Désactivée']), toggle('Limiter le suivi de l’adresse IP'), choice('Configurer l’IP', ['Automatique', 'Manuel']), field('Adresse IP', '192.168.1.24'), field('Masque de sous-réseau', '255.255.255.0'), field('Routeur', '192.168.1.1'), choice('Configurer le DNS', ['Automatique', 'Manuel']), field('Serveur DNS', '192.168.1.1'), choice('Configurer le proxy', ['Non', 'Manuel', 'Automatique']), {label:'Se connecter à ce réseau',type:'connect'}, {label:'Oublier ce réseau',type:'forget'}, info('Adresse Wi-Fi','02:00:00:16:26:18 (simulation)'),info('Sécurité','WPA2/WPA3 personnel')];
    if (title.startsWith('Accessoire : ')) return [field('Nom',title.slice(13)), choice('Type d’appareil',['Casque','Enceinte','Autre']), toggle('Connecté',false)];
    if(title==='App : Appareil photo')return pages['Appareil photo'];
    if(title==='App : Photos')return [toggle('Afficher les éléments masqués'),toggle('Lecture automatique des vidéos'),choice('Données cellulaires',['Non','Oui']),info('Photothèque','Photos enregistrées sur ce navigateur')];
    if(title==='App : Raccourcis')return [choice('Version de Raccourcis',['Classique','Apple Intelligence']),info('Version de l’interface','2.0'),info('Actions intelligentes','Traitement de texte local de démonstration'),toggle('Synchronisation iCloud',false),toggle('Partage privé',false),info('Actions disponibles','Apps installées et actions locales du simulateur')];
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
    root.refreshSettingsApps=()=>{if(root.settingsSession===session && (route.at(-1)==='Apps' || route.at(-1)?.startsWith('App : ')))render();};
    const keyFor = (title, row) => title + '/' + row.label;
    function applyAppearance() {
      root.classList.add('sim-dark');root.classList.toggle('sim-ios26',Number(get('update/installedMajor',18))>=26);
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
        const profile=root.querySelector('.profile-card');const profileName=profile.querySelector('.profile-name');if(profileName)profileName.textContent=get('account/name','Yoel Cohen');const avatar=profile.querySelector('.avatar');if(avatar)avatar.textContent=get('account/name','Yoel Cohen').split(' ').filter(Boolean).map(part=>part[0]).join('').slice(0,2);profile.setAttribute('role','button');profile.tabIndex=0;profile.setAttribute('aria-label','Ouvrir le compte Apple');profile.onclick=()=>open('Compte Apple');profile.onkeydown=e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();open('Compte Apple');}};
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
      if (title === 'Compte Apple') return renderAccount();
      if (title === 'iCloud') return renderCloud();
      if (title.startsWith('Appareil du compte : ')) return renderAccountDevice(title.slice(21));
      if (title === 'Wi-Fi') return renderWifi();
      if (title === 'Batterie') return renderBattery();
      if (title === 'Recharge') return renderCharging();
      if (title === 'AirDrop') return renderAirDrop();
      if (title === 'Apps') return renderApps();
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
        const groups = title.startsWith('Réseau : ') ? {1:'CONFIDENTIALITÉ',3:'ADRESSE IPV4',7:'DNS',9:'PROXY HTTP',10:'RÉSEAU'} : title === 'Général' ? {3:'CONNECTIVITÉ',6:'LANGUE ET SAISIE',10:'GESTION'} : title === 'App : Safari' ? {2:'NAVIGATEUR',3:'LANGUE PRÉFÉRÉE',4:'RECHERCHER',11:'GÉNÉRAL',13:'CONFIDENTIALITÉ ET SÉCURITÉ'} : title === 'Apple Intelligence et Siri' ? {1:'SIRI',6:'EXTENSIONS'} : title === 'Mises à jour automatiques' ? {2:'FICHIERS SYSTÈME'} : {};
        const section = groups[i];
        if (row.type === 'info' || ['connect','forget','custom-network','reset'].includes(row.type)) control = row.type === 'info' ? control : '';
        return `${section ? '</div><h3 class="sim-section-label">'+section+'</h3><div class="sim-group">' : ''}<div class="sim-row" data-row="${i}">${row.target || row.type === 'choice' || ['reset','connect','forget','custom-network'].includes(row.type) ? `<button class="sim-link ${row.type === 'forget' || row.type === 'reset' ? 'sim-destructive' : ''}">${esc(row.label)}</button>` : `<span>${esc(row.label)}</span>`}${control}</div>`;
      }).join('')}</div>${title === 'Wi-Fi' ? `<p class="sim-note">Réseau sélectionné : ${esc(get('connectedNetwork','Aucun'))}</p>` : ''}<p class="sim-note" role="status" id="sim-status"></p>`;
      root.querySelector('[data-back]').onclick = () => { route.pop(); render(); };
      root.querySelectorAll('[data-row]').forEach(el => {
        const row = rows[Number(el.dataset.row)], key = keyFor(title,row);
        const input = el.querySelector('input,select');
        if(title.startsWith('Réseau : ') && input?.type==='text'){const manualIP=get(title+'/Configurer l’IP','Automatique')==='Manuel',manualDNS=get(title+'/Configurer le DNS','Automatique')==='Manuel';if(['Adresse IP','Masque de sous-réseau','Routeur'].includes(row.label))input.disabled=!manualIP;if(row.label==='Serveur DNS')input.disabled=!manualDNS;input.setAttribute('inputmode','decimal');}
        if (input) input.onchange = () => { state[key] = input.type === 'checkbox' ? input.checked : input.value; if(title==='Informations personnelles' && row.label==='Nom')state['account/name']=input.value; save(); applyAppearance(); if(title.startsWith('Réseau : ') && ['Configurer l’IP','Configurer le DNS'].includes(row.label))render(); };
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
    function renderApps() {
      const query=root.querySelector('[data-app-search]')?.value || '';
      const focused=document.activeElement?.matches('[data-app-search]'), scroll=root.scrollTop;
      const list=catalog().sort((a,b)=>a.name.localeCompare(b.name,'fr'));
      root.innerHTML=nav('Apps')+'<section class="sim-apps-page"><input class="sim-search" data-app-search placeholder="Recherche" aria-label="Rechercher une app"><div class="sim-group sim-default-apps"><button class="sim-option-row" data-defaults><span class="sim-default-icon" aria-hidden="true">▦</span><span class="sim-app-name">Apps par défaut<small>Gérez les apps par défaut de l’iPhone</small></span><span class="sim-chevron" aria-hidden="true">›</span></button></div><div data-app-list></div><nav class="sim-alphabet" aria-label="Index des apps"></nav><p class="sim-note">Les apps et leurs icônes suivent celles de l’écran d’accueil du simulateur.</p></section>';
      const search=root.querySelector('[data-app-search]');search.value=query;
      function filter() {
        const matches=list.filter(app=>app.name.toLocaleLowerCase('fr').includes(search.value.toLocaleLowerCase('fr')));
        const groups=new Map();for(const app of matches){const letter=app.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').slice(0,1).toLocaleUpperCase('fr');if(!groups.has(letter))groups.set(letter,[]);groups.get(letter).push(app);}
        root.querySelector('[data-app-list]').innerHTML=matches.length?[...groups].map(([letter,items],index)=>`<section data-letter="${esc(letter)}"><h3 class="sim-section-label">${esc(letter)}</h3><div class="sim-group">${items.map(app=>`<button class="sim-option-row sim-app-row" data-app-id="${esc(app.id)}"><span class="sim-app-icon" aria-hidden="true">${app.iconHTML || esc(app.name.slice(0,1))}</span><span class="sim-app-name">${esc(app.name)}</span><span class="sim-chevron" aria-hidden="true">›</span></button>`).join('')}</div></section>`).join(''):'<p class="sim-note" role="status">Aucune app trouvée.</p>';
        root.querySelector('.sim-alphabet').innerHTML=[...groups.keys()].map(letter=>`<button aria-label="Aller à ${esc(letter)}" data-index="${esc(letter)}">${esc(letter)}</button>`).join('');
        root.querySelector('.sim-default-apps').hidden=Boolean(search.value);
        root.querySelectorAll('[data-index]').forEach(button=>button.onclick=()=>{const section=[...root.querySelectorAll('[data-letter]')].find(el=>el.dataset.letter===button.dataset.index);if(section){root.scrollTop=section.offsetTop-70;section.querySelector('button')?.focus({preventScroll:true});}});
        root.querySelectorAll('[data-app-id]').forEach(button=>button.onclick=()=>{const app=list.find(a=>a.id===button.dataset.appId);if(app)open('App : '+(app.id==='shortcuts'?'Raccourcis':app.name));});
      }
      search.oninput=filter;filter();backButton();root.querySelector('[data-defaults]').onclick=()=>open('Apps par défaut');if(focused)search.focus({preventScroll:true});root.scrollTop=query?scroll:0;
    }
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
      const target=Number(get('update/target',26)), installedMajor=Number(get('update/installedMajor',get('update/installed',false)?target:18));
      const now=Date.now(), downloadStarted=get('update/downloadStarted',0), installStarted=get('update/installStarted',0);
      let phase=installedMajor>=target?'installed':'available', percent=0;
      if (installStarted && installedMajor<target) {
        percent=Math.min(100,Math.floor((now-installStarted)/60));phase='installing';
        if(percent===100){state['update/installed']=true;state['update/installedMajor']=target;save();phase='installed';}
      } else if(downloadStarted && phase!=='installed') {
        const elapsed=now-downloadStarted;
        phase=elapsed<8000?'downloading':elapsed<12000?'preparing':'ready';
        percent=phase==='downloading'?Math.min(100,Math.floor(elapsed/80)):phase==='preparing'?Math.min(100,Math.floor((elapsed-8000)/40)):100;
      }
      const busy=['downloading','preparing','installing'].includes(phase);
      const labels={available:'Une mise à jour est disponible',downloading:'Téléchargement…',preparing:'Préparation de la mise à jour…',ready:'Prête à être installée',installing:'Installation…',installed:'Votre iPhone est à jour'};
      root.innerHTML=nav('Mise à jour logicielle','Général')+`<div data-update-screen><div class="sim-group"><button class="sim-option-row" data-auto><span>Mises à jour automatiques</span><span class="sim-value">${get('Mises à jour automatiques/Installer les mises à jour iOS',true)?'Oui':'Non'} ›</span></button><button class="sim-option-row" data-beta><span>Mises à jour bêta</span><span class="sim-value">${esc(get('Mises à jour bêta/Programme bêta','Non'))} ›</span></button></div><article class="sim-update-card"><div class="sim-update-icon" aria-hidden="true">${target}</div><h1>iOS ${target}</h1><p class="sim-update-caption">Mise à jour de démonstration</p><p class="sim-update-state" role="status" aria-live="polite">${labels[phase]}</p>${busy?`<progress max="100" value="${percent}" aria-label="${labels[phase]}"></progress><p class="sim-note">${percent} % · Simulation locale</p>`:''}${phase==='installed'?'<div class="sim-update-check" aria-hidden="true">✓</div>':'<p>Améliorations de l’interface et correctifs pour le simulateur.</p><button class="sim-inline-link" data-notes>En savoir plus</button>'}</article>${phase==='available'?'<button class="sim-primary" data-download>Mettre à jour maintenant</button><button class="sim-secondary" data-tonight>Mettre à jour cette nuit</button>':phase==='ready'?'<button class="sim-primary" data-install>Installer maintenant</button>':busy?'<button class="sim-secondary" data-cancel-update>Annuler la simulation</button>':'<button class="sim-secondary" data-recheck>Rechercher des mises à jour</button>'}${target===26 && installedMajor<27 && !busy?'<h3 class="sim-section-label">ÉGALEMENT DISPONIBLE</h3><div class="sim-group"><button class="sim-option-row" data-upgrade><span>Mettre à niveau vers iOS 27</span><span class="sim-chevron" aria-hidden="true">›</span></button></div>':target===27 && installedMajor<26 && !busy?'<button class="sim-secondary" data-older>Voir la mise à jour iOS 26</button>':''}<p class="sim-note sim-centered">Aucune mise à jour Apple n’est téléchargée. Cette démonstration ne modifie que l’état du simulateur.</p><p class="sim-note" role="status" id="sim-status"></p></div>`;
      if(phase==='installing'){const boot=document.createElement('section');boot.className='sim-update-restart';boot.innerHTML=`<div class="sim-boot-name">iPhone</div><progress max="100" value="${percent}" aria-label="Installation du système simulé"></progress><p>${percent<80?'Installation…':'Redémarrage…'}</p><small>Simulation iOS ${target}</small>`;root.append(boot);}
      if(phase==='available' && get('update/scheduled',false))root.querySelector('#sim-status').textContent='Choix « cette nuit » enregistré. Relancez manuellement la démonstration quand vous le souhaitez.';
      backButton();root.querySelector('[data-auto]').onclick=()=>open('Mises à jour automatiques');root.querySelector('[data-beta]').onclick=()=>open('Mises à jour bêta');
      const bind=(selector,handler)=>{const el=root.querySelector(selector);if(el)el.onclick=handler;};
      const choose=version=>{state['update/target']=version;delete state['update/downloadStarted'];delete state['update/installStarted'];state['update/installed']=installedMajor>=version;save();render();};
      bind('[data-upgrade]',()=>choose(27));bind('[data-older]',()=>choose(26));
      bind('[data-download]',()=>{state['update/downloadStarted']=Date.now();delete state['update/scheduled'];save();render();});
      bind('[data-install]',()=>{state['update/installStarted']=Date.now();save();render();});
      bind('[data-cancel-update]',()=>{delete state['update/downloadStarted'];delete state['update/installStarted'];save();render();});
      bind('[data-tonight]',()=>{state['update/scheduled']=true;save();root.querySelector('#sim-status').textContent='Choix « cette nuit » enregistré. Relancez la démonstration avec « Mettre à jour maintenant » quand vous le souhaitez.';});
      bind('[data-notes]',()=>open('À propos de cette mise à jour'));
      pages['À propos de cette mise à jour']=[info('Interface','Liquid Glass sombre'),info('Wi-Fi','Réseaux, IP, DNS et proxy'),info('Installation','Simulation locale, sans téléchargement iOS')];
      bind('[data-recheck]',()=>{root.querySelector('#sim-status').textContent='Recherche terminée : votre simulateur est à jour.';});
      if(busy)updateTimer=setTimeout(()=>{if(root.isConnected && root.settingsSession===session && route.at(-1)==='Mise à jour logicielle' && root.querySelector('[data-update-screen]'))render();},250);
    }
    function renderAccount() {
      const devices=get('account/devices',[{id:'iphone',name:'iPhone de Yoel',model:'iPhone 16 Pro Max',current:true},{id:'mac',name:'MacBook Pro',model:'MacBook Pro 14 pouces'},{id:'watch',name:'Apple Watch',model:'Apple Watch Series 10'}]);
      const name=get('account/name','Yoel Cohen');
      const groups=[['Informations personnelles','Connexion et sécurité','Paiement et livraison','Abonnements'],['iCloud','Famille','Localiser','Contenu multimédia et achats']];
      root.innerHTML=nav('Compte Apple')+`<header class="sim-account-hero"><div class="sim-account-avatar" aria-hidden="true">${esc(name.split(' ').map(x=>x[0]).join('').slice(0,2))}</div><h1>${esc(name)}</h1><p>Compte de démonstration</p></header>${groups.map(group=>`<div class="sim-group sim-spaced">${group.map(label=>`<button class="sim-option-row" data-account-page="${esc(label)}" aria-label="${esc(label)}"><span>${esc(label)}</span><span class="sim-chevron">›</span></button>`).join('')}</div>`).join('')}<h3 class="sim-section-label">APPAREILS</h3><div class="sim-group">${devices.map(device=>`<button class="sim-option-row sim-device-row" data-device="${esc(device.id)}"><span class="sim-device-symbol" aria-hidden="true">${device.id==='mac'?'▱':device.id==='watch'?'◉':'▯'}</span><span><strong>${esc(device.name)}</strong><small>${esc(device.model)}${device.current?' · Cet iPhone':''}</small></span><span class="sim-chevron">›</span></button>`).join('')}</div><p class="sim-note">Appareils fictifs du simulateur. Aucun accès à votre véritable compte Apple.</p>`;
      backButton();root.querySelectorAll('[data-device]').forEach(button=>button.onclick=()=>open('Appareil du compte : '+button.dataset.device));
      pages['Informations personnelles']=[field('Nom',name),field('Date de naissance','Non renseignée'),choice('Langue préférée',['Français','English'])];
      pages['Connexion et sécurité']=[info('Adresse e-mail','Compte local de démonstration'),info('Identification à deux facteurs','Non disponible'),link('Récupération de compte')];
      pages['Récupération de compte']=[info('Contact de récupération','Aucun contact configuré')];
      pages['Paiement et livraison']=[info('Mode de paiement','Aucun'),info('Adresse de livraison','Aucune adresse enregistrée')];
      pages['Abonnements']=[info('Abonnements actifs','Aucun abonnement')];
      pages['Famille']=[info('Partage familial','Non configuré')];
      pages['Localiser']=[toggle('Localiser mon iPhone'),toggle('Réseau Localiser'),toggle('Envoyer la dernière position')];
      pages['Contenu multimédia et achats']=[info('Compte','Démonstration'),link('Abonnements'),info('Historique des achats','Aucun achat réel')];
      root.querySelectorAll('[data-account-page]').forEach(button=>button.onclick=()=>open(button.dataset.accountPage));
    }
    function renderCloud(){
      let photos=[];try{photos=JSON.parse(localStorage.getItem('capturedPhotos')||'[]');}catch{}
      const services=['Photos','iCloud Drive','Notes','Contacts','Rappels','Safari'];
      root.innerHTML=nav('iCloud','Compte Apple')+`<header class="sim-cloud-hero"><div aria-hidden="true">☁</div><h1>iCloud</h1><p>Vos données et vos apps.</p></header><div class="sim-group sim-cloud-storage"><strong>Stockage du simulateur</strong><div class="sim-storage-track"><span></span></div><p>${photos.length} photo${photos.length>1?'s':''} enregistrée${photos.length>1?'s':''} localement</p><p class="sim-note">Aucun stockage iCloud réel n’est utilisé.</p></div><h3 class="sim-section-label">ENREGISTRÉ SUR ICLOUD</h3><div class="sim-group">${services.map(service=>`<label class="sim-row"><span>${service}</span><input type="checkbox" aria-label="${esc(service)}" data-cloud="${esc(service)}" ${get('iCloud/'+service,true)?'checked':''}></label>`).join('')}</div><h3 class="sim-section-label">SAUVEGARDE DE L’APPAREIL</h3><div class="sim-group"><button class="sim-option-row" data-backup><span>Sauvegarde iCloud</span><span class="sim-value">${get('cloud/lastBackup',null)?'Effectuée':'Non effectuée'} ›</span></button></div><p class="sim-note">Préférences locales de démonstration. Aucun fichier n’est envoyé à Apple.</p>`;
      backButton();root.querySelectorAll('[data-cloud]').forEach(input=>input.onchange=()=>{state['iCloud/'+input.dataset.cloud]=input.checked;save();});root.querySelector('[data-backup]').onclick=()=>{pages['Sauvegarde iCloud']=[toggle('Sauvegarder cet iPhone',false),info('Dernière sauvegarde','Aucune sauvegarde iCloud réelle'),info('Conservation des données','Les apps enregistrent leurs données dans ce navigateur')];open('Sauvegarde iCloud');};
    }
    function renderAccountDevice(id) {
      const devices=get('account/devices',[{id:'iphone',name:'iPhone de Yoel',model:'iPhone 16 Pro Max',current:true},{id:'mac',name:'MacBook Pro',model:'MacBook Pro 14 pouces'},{id:'watch',name:'Apple Watch',model:'Apple Watch Series 10'}]);
      const device=devices.find(item=>item.id===id);if(!device){route.pop();return render();}
      root.innerHTML=nav(device.name,'Compte Apple')+`<header class="sim-account-hero"><div class="sim-device-large" aria-hidden="true">${id==='mac'?'▱':id==='watch'?'◉':'▯'}</div><h1>${esc(device.name)}</h1></header><div class="sim-group"><div class="sim-row"><span>Modèle</span><span class="sim-value">${esc(device.model)}</span></div><div class="sim-row"><span>Version</span><span class="sim-value">${id==='iphone'?'iOS '+esc(get('update/installedMajor','18.6')):id==='mac'?'macOS':'watchOS'} · simulation</span></div><div class="sim-row"><span>Appareil de confiance</span><span class="sim-value">Oui · démonstration</span></div></div>${device.current?'<p class="sim-note">Cet iPhone est l’appareil actuel du simulateur.</p>':'<button class="sim-secondary sim-destructive" data-remove-device>Supprimer du compte</button>'}`;
      backButton();root.querySelector('[data-remove-device]')?.addEventListener('click',()=>{if(!confirm('Retirer cet appareil fictif du compte du simulateur ?'))return;state['account/devices']=devices.filter(item=>item.id!==id);save();route.pop();render();});
    }
    function renderBattery() {
      const period=get('battery/period','24'), day=period==='24', selected=get('battery/selected',-1), activity=get('battery/showActivity',false);
      const levels=[93,94,98,100,100,94,85,78,72,65,58,64,71,80,84,79,73,68,62,59,54,49,45,42];
      root.innerHTML=nav('Batterie')+`<h1 class="sim-page-title">Batterie</h1><div class="sim-group"><label class="sim-row"><span>Pourcentage de la batterie</span><input type="checkbox" aria-label="Pourcentage de la batterie" ${get('Batterie/Pourcentage de la batterie',true)?'checked':''} data-setting="Batterie/Pourcentage de la batterie"></label><label class="sim-row"><span>Mode économie d’énergie</span><input type="checkbox" aria-label="Mode économie d’énergie" ${get('Batterie/Mode économie d’énergie',false)?'checked':''} data-setting="Batterie/Mode économie d’énergie"></label></div><p class="sim-note">Réduit temporairement l’activité en arrière-plan dans la simulation.</p><div class="sim-group"><button class="sim-option-row" data-health><span>État de santé de la batterie</span><span class="sim-value">Normal ›</span></button><button class="sim-option-row" data-charge><span>Recharge</span><span class="sim-value">${esc(get('battery/limit',100))} % ›</span></button></div><div class="sim-segments" role="group" aria-label="Période de la batterie"><button data-period="24" aria-pressed="${day}">Dernières 24 heures</button><button data-period="10" aria-pressed="${!day}">10 derniers jours</button></div><div class="sim-battery-summary"><h3>Dernière recharge à 100 %</h3><p>Aujourd’hui, 06:00</p></div><h3 class="sim-section-label">${day?'NIVEAU DE LA BATTERIE':'UTILISATION DE LA BATTERIE'}</h3><div class="sim-chart" role="group" aria-label="Historique de batterie fictif, ${day?'24 heures':'10 jours'}"><div class="sim-bars">${(day?levels:levels.slice(0,10)).map((level,i)=>`<button class="sim-battery-bar" data-battery-slot="${i}" aria-label="${day?i+' h':'Jour '+(i+1)} : ${level} %" aria-pressed="${selected===i}" style="height:${day?level:35+(i*17)%60}%;background:${i<5?'#30d158':i<13?'#50b96a':'#30d158'}" title="${level} %"></button>`).join('')}</div><div class="sim-chart-axis"><span>${day?'00:00':'Lun.'}</span><span>${day?'06:00':'Jeu.'}</span><span>${day?'12:00':'Dim.'}</span><span>${day?'18:00':'Mer.'}</span></div></div><h3 class="sim-section-label">ACTIVITÉ</h3><div class="sim-chart sim-activity" role="img" aria-label="Activité fictive"><div class="sim-bars">${(day?levels:levels.slice(0,10)).map((_,i)=>`<span style="height:${8+(i*13)%85}%"></span>`).join('')}</div></div><div class="sim-screen-time"><div><span>Écran activé</span><strong>${day?'4 h 28 min':'5 h 12 min'}</strong></div><div><span>Écran éteint</span><strong>${day?'38 min':'42 min'}</strong></div></div><div class="sim-usage-heading"><h3 class="sim-section-label">${selected>=0?'SÉLECTION : '+(day?selected+' H':'JOUR '+(selected+1)):'UTILISATION PAR APP'}</h3><button class="sim-inline-link" data-activity>${activity?'Afficher la batterie':'Afficher l’activité'}</button>${selected>=0?'<button class="sim-inline-link" data-clear-slot>Tout afficher</button>':''}</div><div class="sim-group">${[['Safari',32],['Raccourcis',18],['Photos',12],['Écran d’accueil',9]].map(([name,value])=>`<div class="sim-row sim-battery-app"><span class="sim-app-icon" aria-hidden="true">${catalog().find(app=>app.name===name)?.iconHTML||'▦'}</span><span>${name}</span><span class="sim-value">${activity?Math.round(value*(selected>=0?1:5))+' min':Math.max(1,value-(selected>=0?selected%8:0))+' %'}</span></div>`).join('')}</div><p class="sim-note">Historique et statistiques de démonstration. Aucune mesure de la batterie de votre ordinateur.</p>`;
      backButton();root.querySelectorAll('[data-battery-slot]').forEach(button=>button.onclick=()=>{state['battery/selected']=Number(button.dataset.batterySlot);save();render();});root.querySelector('[data-activity]').onclick=()=>{state['battery/showActivity']=!activity;save();render();};root.querySelector('[data-clear-slot]')?.addEventListener('click',()=>{state['battery/selected']=-1;save();render();});root.querySelectorAll('[data-setting]').forEach(input=>input.onchange=()=>{state[input.dataset.setting]=input.checked;save();});
      root.querySelector('[data-health]').onclick=()=>open('État de santé et recharge');root.querySelector('[data-charge]').onclick=()=>open('Recharge');
      root.querySelectorAll('[data-period]').forEach(button=>button.onclick=()=>{state['battery/period']=button.dataset.period;state['battery/selected']=-1;save();render();});root.scrollTop=0;
    }
    function renderCharging() {
      const limit=Number(get('battery/limit',100));
      root.innerHTML=nav('Recharge','Batterie')+`<h1 class="sim-page-title">Recharge</h1><div class="sim-group sim-charge-limit"><h3>Limite de recharge</h3><p>Choisissez la limite de recharge de votre iPhone.</p><input type="range" min="80" max="100" step="5" value="${limit}" aria-label="Limite de recharge"><div class="sim-charge-ticks">${[80,85,90,95,100].map(value=>`<button data-limit="${value}" aria-pressed="${limit===value}">${value} %</button>`).join('')}</div></div><p class="sim-note">Une limite inférieure peut contribuer à réduire l’usure de la batterie. Préférence de démonstration.</p>${limit===100?`<div class="sim-group"><label class="sim-row"><span>Recharge optimisée de la batterie</span><input type="checkbox" aria-label="Recharge optimisée de la batterie" ${get('battery/optimized',true)?'checked':''}></label></div><p class="sim-note">Réduit le temps passé à pleine charge en s’adaptant aux habitudes de recharge. Cette fonction est simulée.</p>`:'<p class="sim-note">La recharge optimisée est disponible avec une limite à 100 %.</p>'}`;
      backButton();const change=value=>{state['battery/limit']=Number(value);save();render();};root.querySelector('input[type=range]').onchange=e=>change(e.target.value);root.querySelectorAll('[data-limit]').forEach(button=>button.onclick=()=>change(button.dataset.limit));const optimized=root.querySelector('input[type=checkbox]');if(optimized)optimized.onchange=()=>{state['battery/optimized']=optimized.checked;save();};root.scrollTop=0;
    }
    function renderAirDrop(){
      const options=['Réception désactivée','Contacts uniquement','Tout le monde pendant 10 minutes'],value=get('AirDrop/Réception','Contacts uniquement');
      root.innerHTML=nav('AirDrop','Général')+`<header class="sim-airdrop-hero"><div aria-hidden="true">◎</div><h1>AirDrop</h1><p>Partagez avec les appareils Apple à proximité.</p></header><div class="sim-group" role="radiogroup" aria-label="Réception AirDrop">${options.map((name,i)=>`<button class="sim-option-row" role="radio" aria-checked="${name===value}" data-airdrop="${i}"><span>${esc(name)}</span><span class="sim-check" aria-hidden="true">${name===value?'✓':''}</span></button>`).join('')}</div><p class="sim-note">Choisissez qui peut voir votre appareil. Aucun transfert réel depuis cette simulation.</p><h3 class="sim-section-label">COMMENCER LE PARTAGE</h3><div class="sim-group"><label class="sim-row"><span>Rapprocher les appareils</span><input type="checkbox" aria-label="Rapprocher les appareils" data-airdrop-toggle="Rapprocher les appareils" ${get('AirDrop/Rapprocher les appareils',true)?'checked':''}></label></div><h3 class="sim-section-label">HORS DE PORTÉE</h3><div class="sim-group"><label class="sim-row"><span>Utiliser les données cellulaires</span><input type="checkbox" aria-label="Utiliser les données cellulaires" data-airdrop-toggle="Utiliser les données cellulaires" ${get('AirDrop/Utiliser les données cellulaires',true)?'checked':''}></label></div>`;
      backButton();root.querySelectorAll('[data-airdrop]').forEach(button=>button.onclick=()=>{state['AirDrop/Réception']=options[Number(button.dataset.airdrop)];save();render();});root.querySelectorAll('[data-airdrop-toggle]').forEach(input=>input.onchange=()=>{state['AirDrop/'+input.dataset.airdropToggle]=input.checked;save();});root.scrollTop=0;
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
