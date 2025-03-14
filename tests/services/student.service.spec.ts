import { StudentService } from "../../src/services/student.service";
import { TypeStudent } from "../../src/types";

import { prismaMock } from "../config/prisma.mock";

import * as dotenv from "dotenv";
dotenv.config();

describe("Testes de unitários do StudentServe", () => {
  let sut: StudentService;
  beforeEach(() => {
    sut = new StudentService();
    jest.clearAllMocks();
  });

  it("Deve retornar (200) quando listar os estudantes", async () => {
    // const sut = new StudentService();

    prismaMock.student.findMany.mockResolvedValue([
      {
        id: "1",
        name: "Patrick",
        email: "Patrick@algo.com",
        password: "asd",
        age: 25,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4NDI2YjM3LWJhYjktNGUyZC05YzU1LTdhMzc5N2EwMjNmMCIsImlhdCI6MTczOTkyNTA1NX0.9WQ1_FImFLlSbWX0kv5yiB5LPhXcsgvarGkg1FRWZ-E",
        type: "F",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "1",
        name: "Renner",
        email: "Renner@algo.com",
        password: "asd",
        age: 25,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4NDI2YjM3LWJhYjktNGUyZC05YzU1LTdhMzc5N2EwMjNmMCIsImlhdCI6MTczOTkyNTA1NX0.9WQ1_FImFLlSbWX0kv5yiB5LPhXcsgvarGkg1FRWZ-E",
        type: "F",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const result = await sut.getAllStudents();

    expect(result).toBeDefined();
    expect(result).toHaveProperty("success");
    expect(result?.success).toBe(true);

    expect(result).toHaveProperty("code", 200);
    expect(result).toHaveProperty("message", "Alunos listados com sucesso");

    expect(result).toHaveProperty("data");
    expect(result.data).toBeDefined();
  });

  it("Deve retornar (201) quando um usuario for criado com sucesso.", async () => {
    // const sut = new StudentService();

    prismaMock.student.create.mockResolvedValue({
      id: "08426b37-bab9-4e2d-9c55-7a3797a023f0",
      name: "Patrick",
      email: "Patrick@algo.com",
      password: "asd",
      age: 25,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4NDI2YjM3LWJhYjktNGUyZC05YzU1LTdhMzc5N2EwMjNmMCIsImlhdCI6MTczOTkyNTA1NX0.9WQ1_FImFLlSbWX0kv5yiB5LPhXcsgvarGkg1FRWZ-E",
      type: "F",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await sut.createStudent({
      id: "1",
      name: "Patrick",
      email: "Patrick@algo.com",
      password: "asd",
      type: TypeStudent.Formed,
      age: 25,
    });

    expect(result).toBeDefined();
    expect(result).toHaveProperty("success");
    expect(result?.success).toBe(true);

    expect(result).toHaveProperty("code", 201);

    expect(result).toHaveProperty("message", "Aluno criado com sucesso.");

    expect(result).toHaveProperty("data");
    expect(result?.data).toBeDefined();

    expect(result).not.toBeNull();
  });

  it("Deve rertonar (200) quando encontrar o usuario pelo id", async () => {
    // const sut = new StudentService();

    prismaMock.student.findUnique.mockResolvedValue({
      id: "08426b37-bab9-4e2d-9c55-7a3797a023f0",
      name: "Patrick",
      email: "Patrick@algo.com",
      password: "asd",
      age: 25,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4NDI2YjM3LWJhYjktNGUyZC05YzU1LTdhMzc5N2EwMjNmMCIsImlhdCI6MTczOTkyNTA1NX0.9WQ1_FImFLlSbWX0kv5yiB5LPhXcsgvarGkg1FRWZ-E",
      type: "F",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await sut.getStudentById(
      "08426b37-bab9-4e2d-9c55-7a3797a023f0"
    );

    expect(result).toBeDefined();
    expect(result).toHaveProperty("success");
    expect(result?.success).toBe(true);

    expect(result).toHaveProperty("code", 200);
    expect(result).toHaveProperty("message", "Aluno encontrado com sucesso.");

    expect(result).toHaveProperty("data");
    expect(result?.data).toBeDefined();

    expect(result).not.toBeNull();
  });

  it("Deve retornar (200) quando o estudante for atualizado com sucesso", async () => {
    // const sut = new StudentService();

    prismaMock.student.update.mockResolvedValue({
      id: "1",
      name: "Patrick",
      email: "Patrick@algo.com",
      password: "asd",
      age: 25,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4NDI2YjM3LWJhYjktNGUyZC05YzU1LTdhMzc5N2EwMjNmMCIsImlhdCI6MTczOTkyNTA1NX0.9WQ1_FImFLlSbWX0kv5yiB5LPhXcsgvarGkg1FRWZ-E",
      type: "F",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await sut.updateStudent({
      id: "1",
      name: "Patrick",
      email: "Patrick@algo.com",
    });

    expect(result).toBeDefined();
    expect(result).toHaveProperty("success");
    expect(result?.success).toBe(true);

    expect(result).toHaveProperty("code", 200);
    expect(result).toHaveProperty("message", "Aluno atualizado com sucesso.");

    expect(result).toHaveProperty("data");
    expect(result?.data).toBeDefined();

    expect(result).not.toBeNull();

    expect(result?.data).toHaveProperty("id", "1");
    expect(result?.data).toHaveProperty("name", "Patrick");
    expect(result?.data).toHaveProperty("email");
    expect(result?.data).toHaveProperty("age");
  });

  it("Deve retornar (200) quando o estudante for deletado com sucesso", async () => {
    // const sut = new StudentService();

    prismaMock.student.delete.mockResolvedValue({
      id: "1",
      name: "Patrick",
      email: "Patrick@algo.com",
      password: "asd",
      age: 25,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4NDI2YjM3LWJhYjktNGUyZC05YzU1LTdhMzc5N2EwMjNmMCIsImlhdCI6MTczOTkyNTA1NX0.9WQ1_FImFLlSbWX0kv5yiB5LPhXcsgvarGkg1FRWZ-E",
      type: "F",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await sut.deleteStudent("1");

    expect(result).toBeDefined();
    expect(result).toHaveProperty("success");
    expect(result?.success).toBe(true);

    expect(result).toHaveProperty("code", 200);
    expect(result).toHaveProperty("message", "aluno deletado com sucesso");

    expect(result).toHaveProperty("data");
    expect(result?.data).toBeDefined();

    expect(result).not.toBeNull();

    expect(result?.data).toHaveProperty("id");
    expect(result?.data).toHaveProperty("name");
    expect(result?.data).toHaveProperty("email");
    expect(result?.data).toHaveProperty("age");
    expect(result?.data).toHaveProperty("type");
    expect(result?.data).toHaveProperty("token");

    expect(result?.data.token).toContain("eyJ");
  });
});
