import { httpClient } from "../infra/http-client";
import { tokenService } from "./token-service";

export const URL = process.env.NEXT_PUBLIC_URL_API;

export class authService {
  constructor(url) {
    this.url = url;
  }

  async login({ username, password }) {
    const login = new httpClient(`${this.url}/login`, {
      method: "POST",
      body: { username, password },
    });
    const token = new tokenService();

    const { data } = await login.request();

    token.save(data.access_token);

    return { data };
  }
}
