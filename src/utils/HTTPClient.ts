const BASE_URL = "https://mate.academy/students-api";
const DEFAULT_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
};

const handleResponse = (res: Response) => {
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const client = {
  get<T>(url: string): Promise<T> {
    return fetch(BASE_URL + url).then(handleResponse);
  },
  post<T>(url: string, data: any): Promise<T> {
    return fetch(BASE_URL + url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: DEFAULT_HEADERS,
    }).then(handleResponse);
  },
  patch<T>(url: string, data: any): Promise<T> {
    return fetch(BASE_URL + url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: DEFAULT_HEADERS,
    }).then(handleResponse);
  },
  delete<T>(url: string): Promise<T> {
    return fetch(BASE_URL + url, { method: "DELETE" }).then(handleResponse);
  },
};
