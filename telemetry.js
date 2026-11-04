/**
 * Qalmotype Telemetry & Analytics Engine (Zero-Cost Client Architecture)
 * Captures real-time presence, city geolocation, engagement dwell time, and studio exports.
 */

(function () {
  'use strict';

  const STORAGE_KEY_LOGS = 'qalmotype_telemetry_logs';
  const STORAGE_KEY_DAILY = 'qalmotype_telemetry_daily';
  const STORAGE_KEY_ACTIVE = 'qalmotype_active_sessions';
  const STORAGE_KEY_GEO = 'qalmotype_geo_cache';
  const STORAGE_KEY_CONFIG = 'qalmotype_remote_config';

  // 1. Initialize Visitor & Session Identification
  let visitorId = localStorage.getItem('qalmotype_visitor_id');
  const isNewVisitor = !visitorId;
  if (!visitorId) {
    visitorId = 'v_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    localStorage.setItem('qalmotype_visitor_id', visitorId);
  }

  let sessionId = sessionStorage.getItem('qalmotype_session_id');
  if (!sessionId) {
    sessionId = 's_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    sessionStorage.setItem('qalmotype_session_id', sessionId);
  }

  // Detect Device & Browser
  function detectDevice() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'Tablet';
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) return 'Mobile';
    return 'Desktop';
  }

  function detectBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox/')) return 'Firefox';
    if (ua.includes('Edg/')) return 'Edge';
    if (ua.includes('Chrome/')) return 'Chrome';
    if (ua.includes('Safari/')) return 'Safari';
    return 'Other';
  }

  const device = detectDevice();
  const browser = detectBrowser();
  let sessionStartTime = Date.now();
  let sessionDuration = 0;
  let currentAction = 'Editing Assignment';

  // Geolocation cache (City, Country)
  let geoData = {
    city: 'Detecting...',
    country: 'Global',
    countryCode: 'UN',
    region: ''
  };

  try {
    const cachedGeo = localStorage.getItem(STORAGE_KEY_GEO);
    if (cachedGeo) {
      const parsed = JSON.parse(cachedGeo);
      if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
        geoData = parsed.data;
      }
    }
  } catch (e) {}

  // Fetch Free Geolocation if not cached
  async function resolveGeolocation() {
    if (geoData.city !== 'Detecting...') return;
    try {
      const res = await fetch('https://freeipapi.com/api/json');
      if (res.ok) {
        const json = await res.json();
        geoData = {
          city: json.cityName || json.regionName || 'Karachi',
          country: json.countryName || 'Pakistan',
          countryCode: json.countryCode || 'PK',
          region: json.regionName || ''
        };
        localStorage.setItem(STORAGE_KEY_GEO, JSON.stringify({
          data: geoData,
          timestamp: Date.now()
        }));
      }
    } catch (err) {
      // Fallback based on timezone
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const cityGuess = tz.split('/')[1] ? tz.split('/')[1].replace(/_/g, ' ') : 'London';
      geoData = {
        city: cityGuess,
        country: 'International',
        countryCode: 'UN',
        region: tz
      };
    }
  }

  // 2. Heartbeat & Active Real-Time Presence
  function updateHeartbeat() {
    sessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
    try {
      let activeSessions = JSON.parse(localStorage.getItem(STORAGE_KEY_ACTIVE) || '{}');
      const now = Date.now();

      // Clean up dead sessions (> 45s without ping)
      for (const id in activeSessions) {
        if (now - activeSessions[id].lastPing > 45000) {
          delete activeSessions[id];
        }
      }

      // Update current session
      activeSessions[sessionId] = {
        sessionId,
        visitorId,
        isNewVisitor,
        city: geoData.city,
        country: geoData.country,
        countryCode: geoData.countryCode,
        device,
        browser,
        action: currentAction,
        duration: sessionDuration,
        lastPing: now,
        startTime: sessionStartTime
      };

      localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(activeSessions));
      updateDailyRollup();
    } catch (e) {
      console.warn('Telemetry heartbeat storage error:', e);
    }
  }

  // 3. Daily & Historical Analytics Rollup
  function updateDailyRollup() {
    try {
      const today = new Date().toISOString().split('T')[0];
      let dailyMap = JSON.parse(localStorage.getItem(STORAGE_KEY_DAILY) || '{}');
      if (!dailyMap[today]) {
        dailyMap[today] = {
          date: today,
          visits: 0,
          uniqueVisitors: 0,
          newVisitors: 0,
          returningVisitors: 0,
          totalDuration: 0,
          exports: { pdf: 0, png: 0, zip: 0 },
          cities: {},
          devices: { Desktop: 0, Mobile: 0, Tablet: 0 }
        };
      }

      // Check if session already recorded for today's visit count
      const sessionCountedKey = 'qalmotype_session_recorded_' + sessionId;
      if (!sessionStorage.getItem(sessionCountedKey)) {
        dailyMap[today].visits++;
        if (isNewVisitor) {
          dailyMap[today].newVisitors++;
        } else {
          dailyMap[today].returningVisitors++;
        }
        dailyMap[today].devices[device] = (dailyMap[today].devices[device] || 0) + 1;
        sessionStorage.setItem(sessionCountedKey, 'true');
      }

      // Update city counts
      if (geoData.city && geoData.city !== 'Detecting...') {
        dailyMap[today].cities[geoData.city] = (dailyMap[today].cities[geoData.city] || 0) + 1;
      }

      // Update duration incrementally
      dailyMap[today].totalDuration += 10;
      localStorage.setItem(STORAGE_KEY_DAILY, JSON.stringify(dailyMap));
    } catch (e) {}
  }

  // 4. Feature & Export Event Logger
  function trackEvent(eventName, meta = {}) {
    currentAction = meta.action || eventName;
    updateHeartbeat();

    try {
      const today = new Date().toISOString().split('T')[0];
      let dailyMap = JSON.parse(localStorage.getItem(STORAGE_KEY_DAILY) || '{}');
      if (dailyMap[today]) {
        if (eventName === 'pdf_export') dailyMap[today].exports.pdf++;
        if (eventName === 'png_export') dailyMap[today].exports.png++;
        if (eventName === 'zip_export') dailyMap[today].exports.zip++;
        localStorage.setItem(STORAGE_KEY_DAILY, JSON.stringify(dailyMap));
      }

      // Store in event log stream
      let logs = JSON.parse(localStorage.getItem(STORAGE_KEY_LOGS) || '[]');
      logs.unshift({
        id: 'evt_' + Date.now().toString(36),
        time: new Date().toISOString(),
        event: eventName,
        city: geoData.city,
        country: geoData.country,
        device,
        meta
      });
      // Keep at most 200 events
      if (logs.length > 200) logs = logs.slice(0, 200);
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
    } catch (e) {}
  }

  // 5. Apply Remote Config & Feature Flags
  function checkRemoteConfig() {
    try {
      const configStr = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (!configStr) return;
      const config = JSON.parse(configStr);

      // Maintenance / Announcement Banner
      if (config.announcementText && config.showAnnouncement) {
        let banner = document.getElementById('qalmotype-admin-announcement');
        if (!banner) {
          banner = document.createElement('div');
          banner.id = 'qalmotype-admin-announcement';
          banner.style.cssText = 'background: linear-gradient(90deg, #6366f1, #06b6d4); color:#fff; text-align:center; padding:7px 12px; font-size:12px; font-weight:600; z-index:99999; position:relative; box-shadow:0 2px 8px rgba(0,0,0,0.15);';
          document.body.prepend(banner);
        }
        banner.innerHTML = `<i class="fa-solid fa-bullhorn"></i> ${config.announcementText}`;
      } else {
        const banner = document.getElementById('qalmotype-admin-announcement');
        if (banner) banner.remove();
      }

      // Full Maintenance Mode Screen
      if (config.maintenanceMode) {
        let mScreen = document.getElementById('qalmotype-maintenance-screen');
        if (!mScreen) {
          mScreen = document.createElement('div');
          mScreen.id = 'qalmotype-maintenance-screen';
          mScreen.style.cssText = 'position:fixed;inset:0;background:#090d16;color:#fff;z-index:9999999;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;font-family:"Plus Jakarta Sans",sans-serif;';
          mScreen.innerHTML = `
            <div style="width:72px;height:72px;background:rgba(99,102,241,0.15);border:1px solid #6366f1;border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:32px;color:#818cf8;margin-bottom:20px;">
              <i class="fa-solid fa-wrench"></i>
            </div>
            <h1 style="font-size:26px;font-weight:800;margin-bottom:10px;">Qalmotype Studio is Under Maintenance</h1>
            <p style="font-size:14px;color:#94a3b8;max-width:480px;line-height:1.6;margin-bottom:24px;">We are currently upgrading our handwritten rendering servers and LaTeX math engines. We will be back online shortly!</p>
            <span style="font-size:12px;color:#64748b;">Administrator? Press <b>Ctrl + Alt + A</b> to access portal.</span>
          `;
          document.body.appendChild(mScreen);
        }
      } else {
        const mScreen = document.getElementById('qalmotype-maintenance-screen');
        if (mScreen) mScreen.remove();
      }

      // Feature Flag: Handwriting Cloner
      const clonerCard = document.getElementById('clone-panel-card');
      if (clonerCard && config.disableCloner !== undefined) {
        clonerCard.style.display = config.disableCloner ? 'none' : 'block';
      }
    } catch (e) {}
  }

  // Initialize lifecycle
  window.addEventListener('DOMContentLoaded', async () => {
    await resolveGeolocation();
    updateHeartbeat();
    checkRemoteConfig();

    // Check for pending AI assignment pushed from admin sandbox
    const pendingText = localStorage.getItem('qalmotype_pending_assignment');
    if (pendingText) {
      const txtEl = document.getElementById('input-text');
      if (txtEl) {
        txtEl.value = pendingText;
        txtEl.dispatchEvent(new Event('input'));
        localStorage.removeItem('qalmotype_pending_assignment');
      }
    }

    // Heartbeat every 12 seconds
    setInterval(updateHeartbeat, 12000);
    // Periodically re-check feature flags
    setInterval(checkRemoteConfig, 10000);
  });

  window.addEventListener('beforeunload', () => {
    try {
      let activeSessions = JSON.parse(localStorage.getItem(STORAGE_KEY_ACTIVE) || '{}');
      delete activeSessions[sessionId];
      localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(activeSessions));
    } catch (e) {}
  });

  // Global API
  window.QalmotypeTelemetry = {
    trackEvent,
    getSessionId: () => sessionId,
    getVisitorId: () => visitorId,
    getGeo: () => geoData,
    setAction: (action) => {
      currentAction = action;
      updateHeartbeat();
    }
  };
})();
