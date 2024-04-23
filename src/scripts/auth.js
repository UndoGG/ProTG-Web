import {deleteCookie, readCookie} from "@/scripts/cookie.js";

export async function loadAuthCookies() {
    let auth = null

    const urlSearchParams = new URLSearchParams(window.location.search);
      if (urlSearchParams.get('clear') === 'true') {deleteCookie('auth')}

      const authCookie = readCookie('auth')
      if (authCookie != null) {
        auth = authCookie
      }

      return auth
}
