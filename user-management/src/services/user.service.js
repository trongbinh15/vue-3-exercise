import http from "./http-commom";
class UserService {
  getAll() {
    return http.get("/users");
  }
  getDetail(id) {
    return http.get(`/users/${id}`);
  }
  getUserByEmail(email) {
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
  addOne(info) {
    return http.post(`/users`, info);
  }
  updateOne(info) {
    return http.put(`/users/${info.id}`, info);
  }
  deleteOne(id) {
    return http.delete(`/users/${id}`);
  }
}

export default new UserService();
