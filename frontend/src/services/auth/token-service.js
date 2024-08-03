import nookies from "nookies";

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
const ON_YEAR = 1 * 60 * 60 * 24 * 365.25;

export class tokenService {
  constructor(ctx = null) {
    this.ctx = ctx;
  }

  save(accessToken) {
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);
    globalThis?.sessionStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);

    nookies.set(this.ctx, ACCESS_TOKEN_KEY, accessToken, {
      maxAge: ON_YEAR,
      path: "/",
    });
  }
  get() {
    const cookies = nookies.get(this.ctx);
    return cookies[ACCESS_TOKEN_KEY] || null;
  }
  delete() {
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY);
    globalThis?.sessionStorage?.removeItem(ACCESS_TOKEN_KEY);
    nookies.destroy(ctx, ACCESS_TOKEN_KEY);
  }
}
