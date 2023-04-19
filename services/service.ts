import { API_URL } from "@env";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Entity } from "../types/entity";

function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export default class Service<T extends Entity> {
  private axios: AxiosInstance;

  constructor(endpoint: string) {
    this.axios = axios.create({
      baseURL: API_URL + "/" + endpoint,
      timeout: 2000,
    });
  }

  async get(id: string): Promise<AxiosResponse<T>> {
    await sleep(300);
    return await this.axios.get(`/${id}`);
  }

  async list(): Promise<AxiosResponse<T[]>> {
    await sleep(300);
    return await this.axios.get("/");
  }

  async delete(id: string): Promise<AxiosResponse<T>> {
    await sleep(300);
    return await this.axios.delete(`/${id}`);
  }

  async insert(entity: Omit<T, "id">): Promise<AxiosResponse<T>> {
    await sleep(300);
    return await this.axios.post("/", entity);
  }

  async update(entity: T): Promise<AxiosResponse<T>> {
    await sleep(300);
    return await this.axios.put(`/${entity.id}`, entity);
  }
}
