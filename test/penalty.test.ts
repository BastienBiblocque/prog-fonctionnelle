import { describe, it, expect } from "bun:test";
import { updateScore, randomShot } from "../src/penalty.ts";

describe("Penalty shootout simulation", () => {
    it("should update score correctly", () => {
        let score = { teamA: 0, teamB: 0 };
        score = updateScore(score, true, false);
        expect(score.teamA).toBe(1);
        expect(score.teamB).toBe(0);
    });

    it("should correctly simulate a random shot", () => {
        const shotResult = randomShot();
        expect(typeof shotResult).toBe("boolean");
    });
});
