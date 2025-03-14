class Calculator {
  public sun(x: number, y: number) {
    return x + y;
  }
}

describe("testes da classe calculator", () => {
  test("Deve retornar 10 quando eu somar 2 numeros", () => {
    const sut = new Calculator();

    const result = sut.sun(5, 5);

    expect(result).toBeDefined();
    expect(result).toBe(10);
    expect(result).toBeGreaterThan(0);
  });
});
