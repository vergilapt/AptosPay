/**
 * Check Page is Loaded in Telegram
 */
export const IsTelegram = typeof window != 'undefined' && !!window?.TelegramWebviewProxy;

/**
 * Check Page has Open Link
 */
export const HasOpenLink =
  typeof window != 'undefined' && !!window?.Telegram?.WebApp?.openTelegramLink;

/**
 * Immigrated for telegram post event and open internal link
 */
export const isIframe =
  typeof window != 'undefined' && window?.parent != null && window != window?.parent;

function postEvent(eventType: any, callback: any, eventData: any) {
  if (!callback) {
    callback = function () {};
  }
  if (eventData === undefined) {
    eventData = '';
  }
  console.log('[Telegram.WebView] > postEvent', eventType, eventData);

  if (window?.TelegramWebviewProxy !== undefined) {
    window?.TelegramWebviewProxy.postEvent(eventType, JSON.stringify(eventData));
    callback();
  } else if (isIframe) {
    try {
      var trustedTarget = 'https://web.telegram.org';
      // For now we don't restrict target, for testing purposes
      trustedTarget = '*';
      window?.parent.postMessage(
        JSON.stringify({ eventType: eventType, eventData: eventData }),
        trustedTarget,
      );
      callback();
    } catch (e) {
      callback(e);
    }
  } else {
    callback({ notAvailable: true });
  }
}

export const openTelegramLink = function (url: any) {
  if (typeof window != 'undefined' && !!window?.Telegram?.WebApp?.openTelegramLink) {
    window?.Telegram?.WebApp?.openTelegramLink(url);
    return;
  }

  let a: any = document.createElement('A');
  a.href = url;
  if (a.protocol != 'http:' && a.protocol != 'https:') {
    console.error('[Telegram.WebApp] Url protocol is not supported', url);
    throw Error('WebAppTgUrlInvalid');
  }
  if (a.hostname != 't.me') {
    console.error('[Telegram.WebApp] Url host is not supported', url);
    throw Error('WebAppTgUrlInvalid');
  }
  var path_full = a.pathname + a.search;

  postEvent('web_app_open_tg_link', false, { path_full: path_full });
};

export const ErrorMessage = (error: any) => {
  return error?.response?.errors?.[0]?.message || error.message || error;
};

