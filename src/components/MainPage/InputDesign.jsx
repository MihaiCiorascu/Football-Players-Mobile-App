"use client";
import React, { useState } from "react";
import styles from "./InputDesign.module.css";
import SearchBar from "./SearchBar";
import PlayerCard from "./PlayerCard";
import CreatePlayerForm from "./CreatePlayerForm";
import { usePlayer } from "C:/Users/Mihai/football-players-web/src/context/PlayerContext.jsx";
import { useRouter } from "next/navigation";
import PieChartIcon from "../Icons/PieChartIcon";

function InputDesign() {
    const { players} = usePlayer();
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

  const handleStatsClick = () => {
    router.push("/full-list");
  };

  const handleStatisticsClick = () => {
    router.push("/statistics");
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredPlayers = players
    .filter(player =>
      player.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div className={styles.pageWrapper}>
      <link
        href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700;800&family=League+Gothic&display=swap"
        rel="stylesheet"
      />
      <div className={styles.boxContainer}>
        <main className={styles.container}>
          <header className={styles.header}>
            <div>
              <p className={styles.greeting}>Hello!</p>
              <h1 className={styles.welcomeHeading}>Welcome Back!</h1>
            </div>
            <button
              className={styles.statisticsButton}
              onClick={handleStatisticsClick}
              aria-label="View statistics"
            >
              <PieChartIcon className={styles.statisticsIcon} />
            </button>
          </header>

          <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />

          <section>
            <h2 className={styles.sectionHeading}>
              Recent Player Performances
            </h2>
            <div className={styles.performanceContainer}>
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player, index) => (
                  <PlayerCard
                    key={index}
                    id={player.id}
                    image={player.image}
                    name={player.name}
                    position={player.position}
                    rating={player.rating}
                    ratingColor={player.ratingColor}
                  />
                ))
              ) : (
                <p className={styles.noResults}>No players found matching "{searchTerm}"</p>
              )}
            </div>

            <footer
              className={styles.statsFooter}
              onClick={handleStatsClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleStatsClick();
                }
              }}
            >
              See full stats
            </footer>
          </section>

          <section>
            <h2 className={styles.sectionHeading}>Create a Player</h2>
            <CreatePlayerForm />
          </section>
        </main>
      </div>
    </div>
  );
}

export default InputDesign;
