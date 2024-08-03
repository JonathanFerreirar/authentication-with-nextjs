export class httpClient {
  constructor(url, options = {}) {
    this.url = url;
    this.options = options;
  }

  async request() {
    try {
      const response = await fetch(this.url, {
        ...this.options,
        headers: {
          "Content-Type": "application/json",
          ...this.options.headers,
        },
        body: this.options.body && JSON.stringify(this.options.body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonResult = await response.json();
      return {
        ok: response.ok,
        data: jsonResult.data,
      };
    } catch (error) {
      throw new Error(`Error in httpClient request: ${error.message}`);
    }
  }
}
