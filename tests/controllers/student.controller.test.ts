import supertest from "supertest";
import { createApp } from "../../src/server";
import { TypeStudent } from "../../src/types";
import repository from "../../src/database/prisma.connection";

describe("Testes integrados para criação de um aluno via api.", () => {
  afterAll(async () => {
    await repository.assessment.deleteMany();
    await repository.student.deleteMany();
  });

  it("Deve retornar 400 caso o campo nome não seja informado.", async () => {
    const sut = createApp();

    const result = await supertest(sut).post("/students").send({
      email: "patrick@algo.com",
      password: "asd",
      age: 20,
      type: TypeStudent.Registered,
    });

    expect(result).toBeDefined();
    expect(result).toHaveProperty("ok", false);
    expect(result.status).toEqual(400);
    expect(result.body).toBeDefined();
    expect(result.body.message).toBe("Preencha todos os campos obrigatórios");
  });

  it("Deve retornar 201 quando o estudante for criado com succeso.", async () => {
    const sut = createApp();

    const result = await supertest(sut).post("/students").send({
      name: "Miranda",
      email: "Miranda@algo.com",
      password: "asd",
      age: 20,
      type: TypeStudent.Registered,
    });

    expect(result).toBeDefined();
    expect(result).toHaveProperty("ok", true);
    expect(result.status).toEqual(201);
    expect(result.body).toBeDefined();
    expect(result.body.message).toBe("Aluno criado com sucesso.");
  });
});
