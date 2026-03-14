// ========================
// SCRIPT DO SITE - ROLETAS
// ========================

// Elementos principais
const spinBtn = document.getElementById("spin-btn");
const wheelCanvas = document.getElementById("wheel-canvas");
const resultDisplay = document.getElementById("result-display");
const resultValue = document.getElementById("result-value");
const resultLabel = document.getElementById("result-label");
const statTotal = document.getElementById("stat-total");
const statBest = document.getElementById("stat-best");
const statAccumulated = document.getElementById("stat-accumulated");
const historyList = document.getElementById("history-list");
const rankingList = document.getElementById("ranking-list");

let totalSpins = 0;
let totalAccumulated = 0;
let bestPrize = 0;

// Prêmios e probabilidades
const prizes = [
  { label: "$100", value: 100, chance: 75 },
  { label: "$50.000", value: 50000, chance: 12 },
  { label: "$1 Bilhão", value: 1000000000, chance: 10 },
  { label: "$100 Trilhões", value: 100000000000, chance: 2 },
  { label: "$1 Quatrilhão", value: 1000000000000, chance: 1 }
];

// Gera número aleatório ponderado
function getRandomPrize() {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const prize of prizes) {
    cumulative += prize.chance;
    if (rand <= cumulative) return prize;
  }
  return prizes[0];
}

// Atualiza estatísticas na sidebar
function updateStats(prize) {
  totalSpins++;
  totalAccumulated += prize.value;
  if (prize.value > bestPrize) bestPrize = prize.value;

  statTotal.textContent = totalSpins;
  statBest.textContent = `$${bestPrize.toLocaleString()}`;
  statAccumulated.textContent = `$${totalAccumulated.toLocaleString()}`;
}

// Adiciona ao histórico
function addHistory(user, prize) {
  const div = document.createElement("div");
  div.className = "history-item flex justify-between py-1 px-2 rounded-lg";
  div.textContent = `${user} ganhou ${prize.label}`;
  historyList.prepend(div);
}

// Atualiza ranking (simples,
