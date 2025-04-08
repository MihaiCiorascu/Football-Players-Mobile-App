"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePlayer } from "@/context/PlayerContext";
import styles from "./FullList.module.css";
import SearchBar from "./SearchBar";
import PlayerCard from "./PlayerCard";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FullList = () => {
  const { players, deletePlayer } = usePlayer();
  const [displayedPlayers, setDisplayedPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const observer = useRef();
  const LIMIT = 10;
  const router = useRouter();

  // Update displayed players when players or search term changes
  useEffect(() => {
    const filteredPlayers = searchTerm
      ? players.filter(player => 
        player.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      : players;

    const start = 0;
    const end = offset + LIMIT;
    const newDisplayedPlayers = filteredPlayers.slice(start, end);
    
    setDisplayedPlayers(newDisplayedPlayers);
    setHasMore(end < filteredPlayers.length);
  }, [players, searchTerm, offset]);

  // Reset pagination when search term changes
  useEffect(() => {
    setOffset(0);
    setHasMore(true);
  }, [searchTerm]);

  // Intersection Observer callback
  const lastPlayerElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePlayers();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const loadMorePlayers = () => {
    setLoading(true);
    setTimeout(() => {
      setOffset(prev => prev + LIMIT);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (value) => {
    console.log('Search term changed:', value);
    setSearchTerm(value);
  };

  const handleDeletePlayer = (id) => {
    deletePlayer(id);
    setDisplayedPlayers(prev => prev.filter(player => player.id !== id));
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

            <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />

            <section>
              <h2 className={styles.sectionHeading}>Recent Player Performances</h2>
              <div className={styles.performanceContainer}>
                {displayedPlayers.length > 0 ? (
                  displayedPlayers.map((player, index) => {
                    // Convert all ratings to numbers for comparison
                    const ratings = displayedPlayers.map(p => parseFloat(p.rating));
                    const maxRating = Math.max(...ratings);
                    const minRating = Math.min(...ratings);
                    const currentRating = parseFloat(player.rating);
                    
                    const isHighest = currentRating === maxRating;
                    const isLowest = currentRating === minRating;
                    const highlight = isHighest ? "highest" : isLowest ? "lowest" : null;

                    console.log(`Player: ${player.name}, Rating: ${currentRating}, Highlight: ${highlight}`); // Debug log

                    return (
                      <div
                        key={player.id}
                        ref={index === displayedPlayers.length - 1 ? lastPlayerElementRef : null}
                      >
                        <PlayerCard 
                          player={player} 
                          onDelete={() => handleDeletePlayer(player.id)}
                          highlight={highlight}
                        />
                      </div>
                    );
                  })
                ) : (
                  <p className={styles.noResults}>
                    {searchTerm ? `No players found matching "${searchTerm}"` : "No players found"}
                  </p>
                )}
              </div>
            </section>

            {loading && <div className={styles.loading}>Loading more players...</div>}
            {error && <div className={styles.error}>{error}</div>}
            {!hasMore && !loading && displayedPlayers.length > 0 && (
              <div className={styles.endMessage}>No more players to load</div>
            )}

            <button
              className={styles.goBackButton}
              onClick={() => router.push('/')}
              aria-label="Go back to main page"
            >
              GO BACK
            </button>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FullList;

