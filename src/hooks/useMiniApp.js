// src/hooks/useEitaaSDK.js
// هوک کامل برای مینی‌اپ ایتا
// مستندات: https://developer.eitaa.com/docs/Develop/JsSDK
// آبجکت SDK: window.Eitaa.WebApp

import { useEffect, useCallback, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────
// دسترسی ایمن به SDK
// ─────────────────────────────────────────────────────────
function getWebApp() {
  return window?.Eitaa?.WebApp ?? null;
}

export function isInsideEitaa() {
  return !!getWebApp();
}

// ─────────────────────────────────────────────────────────
// هوک اصلی
// ─────────────────────────────────────────────────────────
export function useEitaaSDK({ onBackButton } = {}) {
  const wa = getWebApp();
  const onBackRef = useRef(onBackButton);

  // همیشه آخرین callback رو نگه می‌داریم
  useEffect(() => {
    onBackRef.current = onBackButton;
  });

  // ─── State ──────────────────────────────────────────────
  const [colorScheme, setColorScheme] = useState(wa?.colorScheme ?? 'light');
  const [isExpanded, setIsExpanded] = useState(wa?.isExpanded ?? false);
  const [viewportHeight, setViewportHeight] = useState(
    wa?.viewportStableHeight ?? window.innerHeight
  );

  // ─── INIT ────────────────────────────────────────────────
  useEffect(() => {
    if (!wa) return;

    try {
      // ۱. اطلاع به ایتا که اپ آماده است — loading را مخفی می‌کند
      wa.ready();

      // ۲. گسترش به تمام ارتفاع صفحه
      if (!wa.isExpanded) {
        wa.expand();
      }
      setIsExpanded(true);

      // ۳. تنظیم رنگ‌های پیش‌فرض هدر و بکگراند (سفید / خاکستری روشن)
      wa.setHeaderColor('#ffffff');
      wa.setBackgroundColor('#f8fafc');

      // ۴. غیرفعال کردن swipe عمودی چون با اسکرول اپ تداخل دارد
      wa.disableVerticalSwipes?.();

    } catch (e) {
      console.warn('[Eitaa] init error:', e);
    }
  }, []);

  // ─── Back Button ────────────────────────────────────────
  useEffect(() => {
    if (!wa) {
      // خارج از ایتا: browser popstate
      const onPop = () => onBackRef.current?.();
      window.history.pushState({ eitaaBack: true }, '');
      window.addEventListener('popstate', onPop);
      return () => window.removeEventListener('popstate', onPop);
    }

    const handler = () => onBackRef.current?.();

    try {
      wa.BackButton.onClick(handler);
      wa.BackButton.show();
    } catch (e) {
      console.warn('[Eitaa] BackButton error:', e);
    }

    return () => {
      try {
        wa.BackButton.offClick(handler);
        wa.BackButton.hide();
      } catch (e) {}
    };
  }, []);

  // ─── Events ─────────────────────────────────────────────
  useEffect(() => {
    if (!wa) return;

    // تغییر تم (روز/شب)
    const onThemeChanged = function () {
      setColorScheme(this.colorScheme);
    };

    // تغییر ارتفاع viewport
    const onViewportChanged = function ({ isStateStable }) {
      if (isStateStable) {
        setViewportHeight(this.viewportStableHeight);
        setIsExpanded(this.isExpanded);
      }
    };

    wa.onEvent('themeChanged', onThemeChanged);
    wa.onEvent('viewportChanged', onViewportChanged);

    return () => {
      wa.offEvent('themeChanged', onThemeChanged);
      wa.offEvent('viewportChanged', onViewportChanged);
    };
  }, []);

  // ─── Public API ─────────────────────────────────────────

  const close = useCallback(() => {
    wa?.close?.();
  }, []);

  const showAlert = useCallback((message, callback) => {
    if (wa?.showAlert) {
      wa.showAlert(message, callback);
    } else {
      alert(message);
      callback?.();
    }
  }, []);

  const showConfirm = useCallback((message, callback) => {
    if (wa?.showConfirm) {
      wa.showConfirm(message, callback);
    } else {
      const ok = confirm(message);
      callback?.(ok);
    }
  }, []);

  const showPopup = useCallback((params, callback) => {
    if (wa?.showPopup) {
      wa.showPopup(params, callback);
    } else {
      // fallback ساده در مرورگر
      alert(params.message);
      callback?.('close');
    }
  }, []);

  const openLink = useCallback((url, options) => {
    if (wa?.openLink) {
      wa.openLink(url, options);
    } else {
      window.open(url, '_blank');
    }
  }, []);

  const openEitaaLink = useCallback((url) => {
    wa?.openEitaaLink?.(url);
  }, []);

  // Haptic — با fallback ایمن
  const hapticImpact = useCallback((style = 'light') => {
    // style: light | medium | heavy | rigid | soft
    try { wa?.HapticFeedback?.impactOccurred(style); } catch (e) {}
  }, []);

  const hapticNotification = useCallback((type = 'success') => {
    // type: success | error | warning
    try { wa?.HapticFeedback?.notificationOccurred(type); } catch (e) {}
  }, []);

  const hapticSelection = useCallback(() => {
    try { wa?.HapticFeedback?.selectionChanged(); } catch (e) {}
  }, []);

  const setHeaderColor = useCallback((color) => {
    try { wa?.setHeaderColor?.(color); } catch (e) {}
  }, []);

  const setBackgroundColor = useCallback((color) => {
    try { wa?.setBackgroundColor?.(color); } catch (e) {}
  }, []);

  const setBottomBarColor = useCallback((color) => {
    try { wa?.setBottomBarColor?.(color); } catch (e) {}
  }, []);

  const enableClosingConfirmation = useCallback(() => {
    try { wa?.enableClosingConfirmation?.(); } catch (e) {}
  }, []);

  const disableClosingConfirmation = useCallback(() => {
    try { wa?.disableClosingConfirmation?.(); } catch (e) {}
  }, []);

  const requestFullscreen = useCallback(() => {
    try { wa?.requestFullscreen?.(); } catch (e) {}
  }, []);

  const exitFullscreen = useCallback(() => {
    try { wa?.exitFullscreen?.(); } catch (e) {}
  }, []);

  const isVersionAtLeast = useCallback((version) => {
    return wa?.isVersionAtLeast?.(version) ?? false;
  }, []);

  // ─── اطلاعات کاربر ──────────────────────────────────────
  const user = wa?.initDataUnsafe?.user ?? null;
  const initData = wa?.initData ?? '';
  const platform = wa?.platform ?? 'browser';
  const version = wa?.version ?? null;
  const themeParams = wa?.themeParams ?? {};

  return {
    // وضعیت
    isEitaa: !!wa,
    colorScheme,      // 'light' | 'dark'
    isExpanded,
    viewportHeight,
    platform,
    version,
    themeParams,

    // اطلاعات کاربر (فقط داخل ایتا)
    user,
    initData,

    // متدها
    close,
    showAlert,
    showConfirm,
    showPopup,
    openLink,
    openEitaaLink,
    setHeaderColor,
    setBackgroundColor,
    setBottomBarColor,
    enableClosingConfirmation,
    disableClosingConfirmation,
    requestFullscreen,
    exitFullscreen,
    isVersionAtLeast,

    // Haptic
    hapticImpact,
    hapticNotification,
    hapticSelection,

    // دسترسی مستقیم به SDK در صورت نیاز
    _wa: wa,
  };
}