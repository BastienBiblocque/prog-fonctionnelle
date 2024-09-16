import { expect, test } from "bun:test";

function sum(a: number, b: number): number {
    return a + b;
}

test("addition de 2 + 3 = 5", () => {
    expect(sum(2, 3)).toBe(5);
});

test("addition de 1 + 1 = 2", () => {
    expect(sum(1, 1)).toBe(2);
});
