"use client";
import React, { useState, useEffect } from "react";
import styles from "./InputDesign.module.css";
import SearchBar from "./SearchBar";
import PlayerCard from "./PlayerCard";
import CreatePlayerForm from "./CreatePlayerForm";
import { usePlayer } from "../../context/PlayerContext.jsx";
import { useRouter } from "next/navigation";
import PieChartIcon from "../Icons/PieChartIcon";

function InputDesign() {
    const { players} = usePlayer();
    const [searchTerm, setSearchTerm] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setIsAdmin(payload.role === "admin");
        } catch (e) {
          setIsAdmin(false);
        }
      }
    }, []);

  const handleStatsClick = () => {
    router.push("/full-list");
  };

  const handleStatisticsClick = () => {
    router.push("/statistics");
  };

  const handleFilesClick = () => {
    router.push("/files");
  };

  const handleTestNetworkClick = () => {
    router.push("/test-network");
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
            <div className={styles.headerButtons}>
              <button
                className={styles.filesButton}
                onClick={handleFilesClick}
                aria-label="Manage files"
              >
                Files
              </button>
              <button
                className={styles.statisticsButton}
                onClick={handleStatisticsClick}
                aria-label="View statistics"
              >
                <PieChartIcon className={styles.statisticsIcon} />
              </button>
              <button
                className={styles.testNetworkButton}
                onClick={handleTestNetworkClick}
                aria-label="Test network status"
              >
                Test Network
              </button>
            </div>
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
              <span>View All Players</span>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
            </footer>
          </section>

          <section>
            <h2 className={styles.sectionHeading}>Create a Player</h2>
            <CreatePlayerForm />
            {isAdmin && (
              <button
                style={{
                  marginTop: 24,
                  marginLeft: 24,
                  padding: "12px 24px",
                  background: "#6b1ec5",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                onClick={() => router.push("/admin/monitored-users")}
              >
                View Monitored Users
              </button>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default InputDesign;
