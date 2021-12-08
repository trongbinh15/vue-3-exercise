import { User } from "../models/user.model";
import http from "./http-commom";
class UserService {
  getAll() {
    return http.get<User[]>("/users");
  }
  getDetail(id: string) {
    return http.get<User>(`/users/${id}`);
  }
  getUserByEmail(email: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      const all = await this.getAll();
      const user = all.data.find((x) => x.email === email);
      if (user) {
        resolve(user);
      } else {
        reject("User not found");
      }
    });
  }
  addOne(info: User) {
    return http.post<User>(`/users`, info);
  }
  updateOne(info: User) {
    return http.put<User>(`/users/${info.id}`, info);
  }
  deleteOne(id: string) {
    return http.delete(`/users/${id}`);
  }
}

export default new UserService();
