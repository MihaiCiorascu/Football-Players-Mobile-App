"use client";

import React, { useState } from "react";
import { usePlayer } from "C:/Users/Mihai/football-players-web/src/context/PlayerContext.jsx";
import styles from "./FullList.module.css";
import SearchBar from "./SearchBar";
import PlayerCard from "./PlayerCard";
import { useRouter } from "next/navigation";

function FullList() {
  const { players, deletePlayer } = usePlayer();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const getPlayerHighlight = (player) => {
    if (!filteredPlayers.length) return "";

    const playerRatings = filteredPlayers.map(p => parseFloat(p.rating));
    const highestRating = Math.max(...playerRatings);
    const lowestRating = Math.min(...playerRatings);

    if (parseFloat(player.rating) === highestRating) return "highest";
    if (parseFloat(player.rating) === lowestRating) return "lowest";


    return "";
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className={styles.pageWrapper}>
      <link
        href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700;800&family=League+Gothic&display=swap"
        rel="stylesheet"
      />
      <div className={styles.boxContainer}>
        <div className={styles.frame}>
          <main className={styles.container}>
            <header>
              <p className={styles.greeting}>Hello!</p>
              <h1 className={styles.welcomeHeading}>Welcome Back!</h1>
            </header>

            <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />

            <section>
              <h2 className={styles.sectionHeading}>Recent Player Performances</h2>
              <div className={styles.performanceContainer}>
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      onDelete={() => deletePlayer(player.id)}
                      highlight={getPlayerHighlight(player)}
                    />
                  ))
                ) : (
                  <p className={styles.noResults}>No players found matching "{searchTerm}"</p>
                )}
              </div>
            </section>

            <button
              className={styles.goBackButton}
              onClick={handleGoBack}
              aria-label="Go back to main page"
            >
              GO BACK
            </button>
          </main>
        </div>
      </div>
    </div>
  );
}

export default FullList;

