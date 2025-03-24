"use client";
import React from "react";
import styles from "./NewPlayerStats.module.css";

const PlayerHeader = ({
  firstName,
  lastName,
  playerNumber,
  playerImageUrl
}) => {
  return (
    <header className={styles.playerHeader}>
      <div className={styles.headerContent}>
        <h1 className={styles.playerName}>
          <span>{firstName}</span>
          <br />
          <span>{lastName}</span>
        </h1>
        <p className={styles.playerNumber}>#{playerNumber}</p>
      </div>
      <img
        src={playerImageUrl}
        alt="Player silhouette"
        className={styles.playerImage}
      />
    </header>
  );
};

export default PlayerHeader;
