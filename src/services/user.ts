import { User } from "../types";
import { client } from "../utils/HTTPClient";

export function getUsers() {
  return client.get<User[]>("/users")
  .then(users =>  users.slice(0, 3));
}
