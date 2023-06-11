import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_URL } from "@env";
import { Entity } from "../types/entity";
import storage from "../storage/auth";

function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export abstract class Service {
  protected axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
    });
  }
}

const getHeaders = async () => {
  const auth = await storage.read();
  return auth ? { Authorization: `Bearer ${auth.token}` } : {};
};

export class CrudService<T extends Entity> extends Service {
  constructor(endpoint: string) {
    super();
    this.axios.defaults.baseURL = API_URL + "/" + endpoint;
  }

  async get(id: number): Promise<AxiosResponse<T>> {
    await sleep(300);
    const headers = await getHeaders();
    return await this.axios.get(`/${id}`, { headers });
  }

  async list(): Promise<AxiosResponse<T[]>> {
    await sleep(300);
    const headers = await getHeaders();
    return await this.axios.get("/", { headers });
  }

  async delete(id: number): Promise<AxiosResponse<T>> {
    await sleep(300);
    const headers = await getHeaders();
    return await this.axios.delete(`/${id}`, { headers });
  }

  async insert(entity: Omit<T, "id">): Promise<AxiosResponse<T>> {
    await sleep(300);
    const headers = await getHeaders();
    return await this.axios.post("/", entity, { headers });
  }

  async update(entity: T): Promise<AxiosResponse<T>> {
    await sleep(300);
    const headers = await getHeaders();
    return await this.axios.put(`/${entity.id}`, entity, { headers });
  }
}
