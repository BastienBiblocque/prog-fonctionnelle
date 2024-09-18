type Score = {
    teamA: number;
    teamB: number;
};

type HistoryEntry = {
    shotNumber: number;
    score: Score;
    resultA: number; // 1 for scored, 0 for missed
    resultB: number;
};

// Fonction pure pour simuler un tir
export const randomShot = (): boolean => Math.random() > 0.5;

// Fonction pure pour mettre à jour le score
export const updateScore = (score: Score, teamAshot: boolean, teamBshot: boolean): Score => ({
    teamA: score.teamA + (teamAshot ? 1 : 0),
    teamB: score.teamB + (teamBshot ? 1 : 0),
});

// Fonction récursive pour simuler une séance de tirs
const simulatePenalties = (
    currentScore: Score = { teamA: 0, teamB: 0 },
    history: HistoryEntry[] = [],
    shotNumber: number = 1
): HistoryEntry[] => {
    if (shotNumber > 5 && currentScore.teamA !== currentScore.teamB) {
        return history; // Fin de la simulation
    }

    const teamAshot = randomShot();
    const teamBshot = randomShot();
    const newScore = updateScore(currentScore, teamAshot, teamBshot);

    const newHistory: HistoryEntry = {
        shotNumber,
        score: newScore,
        resultA: teamAshot ? 1 : 0,
        resultB: teamBshot ? 1 : 0,
    };

    // Scénario de victoire anticipée
    if (shotNumber >= 5 && Math.abs(newScore.teamA - newScore.teamB) > 0) {
        return [...history, newHistory];
    }

    // Appel récursif
    return simulatePenalties(newScore, [...history, newHistory], shotNumber + 1);
};

// Fonction pour afficher l'historique (effet de bord isolé)
const displayHistory = (history: HistoryEntry[], finalScore: Score) => {
    history.forEach((entry) => {
        console.log(
            `Tir ${entry.shotNumber} | Score : ${entry.score.teamA}/${entry.score.teamB} (équipe A : ${entry.resultA}, équipe B : ${entry.resultB})`
        );
    });

    console.log(`Victoire : Équipe ${finalScore.teamA > finalScore.teamB ? 'A' : 'B'}`);
};

// Simulation complète
const main = () => {
    const history = simulatePenalties();
    const finalScore = history[history.length - 1].score;
    displayHistory(history, finalScore);
};

main();
