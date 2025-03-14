import supertest from "supertest";

import { createApp } from "../../src/server";
import repository from "../../src/database/prisma.connection";
import { TypeStudent } from "../../src/types";

describe("Listar avaliações.", () => {
  let sut: any;
  beforeAll(() => {
    sut = createApp();
  });

  afterAll(async () => {
    await repository.assessment.deleteMany();
    await repository.student.deleteMany();
  });

  it("Deve retornar 401 quando o token não for fornecido", async () => {
    const result = await supertest(sut).get("/students/any_id/assessments");

    expect(result.status).toEqual(401);
    expect(result.body.message).toBe("Token não informado");
    expect(result.body).toHaveProperty("success", false);
  });

  it("Deve retornar 401 quando o token for invalido", async () => {
    const result = await supertest(sut)
      .get("/students/any_id/assessments")
      .set("Authorization", "any_token");

    expect(result.status).toEqual(401);
    expect(result.body.message).toBe("Token invalido");
    expect(result.body).toHaveProperty("success", false);
  });

  it("Deve retornar 200 quando o listar avaliações com sucesso", async () => {
    await supertest(sut).post("/students").send({
      name: "Miranda",
      email: "test@algo.com",
      password: "asd",
      age: 20,
      type: TypeStudent.Registered,
    });

    const login = await supertest(sut).post("/login").send({
      email: "test@algo.com",
      password: "asd",
    });

    expect(login.body.success).toBe(true);

    const result = await supertest(sut)
      .get(`/students/${login.body.data.id}/assessments`)
      .set("Authorization", login.body.data.token);

    expect(result.status).toEqual(200);
    expect(result.body.message).toBe("Avaliações listadas com sucesso!");
    expect(result.body.success).toBe(true);
    expect(result.body).toHaveProperty("data");
    expect(result.body.data).toBeDefined();
  });
});

describe("Cadastrar Avaliações", () => {
  let sut: any;
  beforeAll(() => {
    sut = createApp();
  });

  afterAll(async () => {
    await repository.assessment.deleteMany();
    await repository.student.deleteMany();
  });

  it("Deve retornar 401 quando o token não for fornecido", async () => {
    const result = await supertest(sut)
      .post("/students/any_id/assessments")
      .send({
        discipline: "React",
        grade: 8,
      });

    expect(result.status).toEqual(401);
    expect(result.body.message).toBe("Token não informado");
    expect(result.body).toHaveProperty("success", false);
  });

  it("Deve retornar 401 quando o token for invalido", async () => {
    const result = await supertest(sut)
      .post("/students/any_id/assessments")
      .send({
        discipline: "React",
        grade: 8,
      })
      .set("Authorization", "any_token");

    expect(result.status).toEqual(401);
    expect(result.body.message).toBe("Token invalido");
    expect(result.body).toHaveProperty("success", false);
  });

  it("Deve retornar 201 quando o criar avaliações com sucesso", async () => {
    await supertest(sut).post("/students").send({
      name: "Miranda",
      email: "test@algo.com",
      password: "asd",
      age: 20,
      type: TypeStudent.Registered,
    });

    const login = await supertest(sut).post("/login").send({
      email: "test@algo.com",
      password: "asd",
    });

    expect(login.body.success).toBe(true);
    expect(login.body.data).toBeDefined();

    const result = await supertest(sut)
      .post(`/students/${login.body.data.id}/assessments`)
      .send({
        discipline: "React",
        grade: 8,
      })
      .set("Authorization", login.body.data.token);

    expect(result.status).toEqual(201);
    expect(result.body.message).toBe("Avaliação criada com sucesso.");
    expect(result.body.success).toBe(true);
    expect(result.body.data).toBeDefined();
  });

  it("Deve retornar 500 quando ocorrer um erro de servidor.", async () => {
    await supertest(sut).post("/students").send({
      name: "Miranda",
      email: "error@algo.com",
      password: "asd",
      age: 20,
      type: TypeStudent.Registered,
    });

    const login = await supertest(sut).post("/login").send({
      email: "error@algo.com",
      password: "asd",
    });

    jest.spyOn(repository.assessment, "create").mockImplementationOnce(() => {
      throw new Error("Erro interno inesperado");
    });

    const result = await supertest(sut)
      .post(`/students/${login.body.data.id}/assessments`)
      .send({
        discipline: "React",
        grade: 8,
      })
      .set("Authorization", login.body.data.token);

    expect(result.status).toEqual(500);
    expect(result.body.success).toBe(false);
    expect(result.body.message).toBe("Erro ao listar");
  });
});
