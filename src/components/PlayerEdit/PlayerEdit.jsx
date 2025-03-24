"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePlayer } from "C:/Users/Mihai/football-players-web/src/context/PlayerContext.jsx";
import styles from "./PlayerEdit.module.css";

export default function PlayerEdit({ params }) {
  const { players, updatePlayer } = usePlayer();
  const router = useRouter();
  const player = players.find(p => p.id === parseInt(params.id));

  if (!player) {
    return <div>Player not found</div>;
  }

  const [newPlayerName, setNewPlayerName] = useState(player.name);
  const [newPlayerNumber, setNewPlayerNumber] = useState(player.number || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePlayer(player.id, newPlayerName, newPlayerNumber);
    alert("Player data updated!");
    router.push("/full-list");
  };

  return (
    <div className={styles.pageWrapper}>
      <link
        href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700;800&family=League+Gothic&display=swap"
        rel="stylesheet"
      />
      <div className={styles.boxContainer}>
        <main className={styles.container}>
          <section className={styles.frame}>
            <img
              src="/messi2.png"
              className={styles.headerImage}
              alt="Player profile header"
            />

            <form className={styles.formContainer} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="playerName" className={styles.label}>
                  Player Name
                </label>
                <input
                  id="playerName"
                  type="text"
                  className={styles.input}
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="playerNumber" className={styles.label}>
                  Jersey Number
                </label>
                <input
                  id="playerNumber"
                  type="number"
                  className={styles.input}
                  value={newPlayerNumber}
                  onChange={(e) => setNewPlayerNumber(e.target.value)}
                  min="1"
                  max="99"
                  required
                />
              </div>

              <button type="submit" className={styles.saveButton}>
                SAVE CHANGES
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}