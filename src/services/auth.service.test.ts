// import { AuthService } from "../../src/services/auth.service";

// describe("Testes de login no service de autenticação,", () => {
//   it("Deve retornar falha (401) quando o usuario não existe no banco de dados", async () => {
//     // 1 sut
//     const authService = new AuthService();

//     // chamar o metodo
//     const result = await authService.login({
//       email: "pati@algo",
//       password: "asd",
//     });

//     // validações
//     expect(result).toBeDefined();
//     expect(result).toHaveProperty("success");
//     expect(result?.success).toBe(false);

//     expect(result).toHaveProperty("code", 401);
//     expect(result).toHaveProperty("message", "Credenciais invalidas");

//     expect(result).not.toHaveProperty("data");
//     expect(result?.data).toBeUndefined();

//     expect(result).not.toBeNull();
//   });
// });

// describe("Testes de login no service de autenticação,", () => {
//   it("Deve retornar sucesso (200) quando o usuario existe no banco de dados", async () => {
//     // 1 sut
//     const authService = new AuthService();

//     // chamar o metodo
//     const result = await authService.login({
//       email: "Patrick@algo.com",
//       password: "asd",
//     });

//     // validações
//     expect(result).toBeDefined();
//     expect(result).toHaveProperty("success");
//     expect(result?.success).toBe(true);

//     expect(result).toHaveProperty("code", 200);
//     expect(result).toHaveProperty("message", "Login realizado com sucesso.");

//     expect(result).toHaveProperty("data");
//     expect(result?.data).toBeDefined();

//     expect(result).not.toBeNull();

//     expect(result?.data).toHaveProperty("id");
//     expect(result?.data).toHaveProperty("name");
//     expect(result?.data).toHaveProperty("email");
//     expect(result?.data).toHaveProperty("age");
//     expect(result?.data).toHaveProperty("type");
//     expect(result?.data).toHaveProperty("token");

//     expect(result?.data.token).toContain("eyJ");
//   });
// });
