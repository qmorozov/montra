import axios, { AxiosResponse } from 'axios';
import store from '@services/store/app-store';
import { GlobalSlice } from '@services/store/global.store';

export abstract class ApiService {
  protected static readonly baseUrl = 'https://aleksandrboichuk.site/v1';
  protected static readonly xApiKey = 'aTuSUfo2tgawQ8f8ku43mfze526Tc';

  private static buildHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-api-key': this.xApiKey,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  protected static async get<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await this.sendRequest<T>(() =>
      axios.get<T>(url, { headers: this.buildHeaders() })
    );
    return this.handleResponse<T>(response);
  }

  protected static async post<T>(endpoint: string, data: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await this.sendRequest<T>(() =>
      axios.post<T>(url, data, { headers: this.buildHeaders() })
    );
    return this.handleResponse<T>(response);
  }

  protected static async put<T>(endpoint: string, data: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await this.sendRequest<T>(() =>
      axios.put<T>(url, data, { headers: this.buildHeaders() })
    );
    return this.handleResponse<T>(response);
  }

  protected static async delete<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await this.sendRequest<T>(() =>
      axios.delete<T>(url, { headers: this.buildHeaders() })
    );
    return this.handleResponse<T>(response);
  }

  private static buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  private static async sendRequest<T>(
    requestFunction: () => Promise<AxiosResponse<T>>
  ): Promise<AxiosResponse<T>> {
    try {
      return await requestFunction();
    } catch (error: any) {
      if (
        error.response.status === 401 &&
        error.response.data.message === 'Unauthorized'
      ) {
        store.dispatch(GlobalSlice.actions.setRefreshToken(true));

        return requestFunction();
      }
      throw error;
    }
  }

  private static handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  protected static async getWithToken<T>(
    endpoint: string,
    token: string
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await this.sendRequest<T>(() =>
      axios.get<T>(url, { headers: this.buildHeaders(token) })
    );
    return this.handleResponse<T>(response);
  }

  protected static async postWithToken<T>(
    endpoint: string,
    token: string,
    data?: any
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await this.sendRequest<T>(() =>
      axios.post<T>(url, data, { headers: this.buildHeaders(token) })
    );
    return this.handleResponse<T>(response);
  }

  protected static async putWithToken<T>(
    endpoint: string,
    data: any,
    token: string
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await this.sendRequest<T>(() =>
      axios.put<T>(url, data, { headers: this.buildHeaders(token) })
    );
    return this.handleResponse<T>(response);
  }

  protected static async deleteWithToken<T>(
    endpoint: string,
    token: string
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await this.sendRequest<T>(() =>
      axios.delete<T>(url, { headers: this.buildHeaders(token) })
    );
    return this.handleResponse<T>(response);
  }
}
