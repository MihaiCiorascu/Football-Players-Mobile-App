"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePlayer } from "../../../../context/PlayerContext.jsx";
import styles from "./PlayerEdit.module.css";

export default function PlayerEdit({ params }) {
  const { id } = React.use(params); // Unwrap params Promise
  const { players, updatePlayer } = usePlayer();
  const router = useRouter();
  const player = players.find(p => p.id === parseInt(id));

  if (!player) {
    return <div>Player not found</div>;
  }

  const positions = ["ST", "CF", "LW", "RW", "LM", "RM", "CAM", "CM", "CDM", "LB", "RB", "CB", "GK"];
  const [newPlayerName, setNewPlayerName] = useState(player.name);
  const [newPlayerNumber, setNewPlayerNumber] = useState(player.number || "");
  const [newPosition, setNewPosition] = useState(player.position || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePlayer(player.id, {
      name: newPlayerName,
      number: parseInt(newPlayerNumber),
      position: newPosition
    });
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
          <div className={styles.frame}>
            <img
              src={player.image2}
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

              <div className={styles.formGroup}>
                <label htmlFor="position" className={styles.label}>
                  Position
                </label>
                <select
                  id="position"
                  className={styles.input}
                  value={newPosition}
                  onChange={(e) => setNewPosition(e.target.value)}
                  required
                >
                  <option value="">Select a Position</option>
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className={styles.saveButton}>
                SAVE CHANGES
              </button>
            </form>
          </div>
      </div>
    </div>
  );
}