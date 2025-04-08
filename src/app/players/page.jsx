'use client';
import React, { useEffect, useRef, useCallback } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import styles from './players.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function PlayersPage() {
  const { players, loadMorePlayers, hasMorePlayers, loading, totalPlayers } = usePlayer();
  const observer = useRef();

  // Last element ref callback for infinite scroll
  const lastPlayerElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMorePlayers()) {
        loadMorePlayers();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMorePlayers, loadMorePlayers]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Back
        </Link>
        <h1>Players List ({totalPlayers})</h1>
      </div>
      
      <div className={styles.container}>
        {players.map((player, index) => (
          <div 
            key={player.id}
            ref={index === players.length - 1 ? lastPlayerElementRef : null}
            className={styles.playerCard}
          >
            <div className={styles.playerImage}>
              <Image
                src={player.image}
                alt={player.name}
                width={200}
                height={200}
                priority={index < 4}
              />
            </div>
            <div className={styles.playerInfo}>
              <h2>{player.name}</h2>
              <p>Position: {player.position}</p>
              <p className={styles.rating} style={{ 
                color: player.ratingColor || (
                  parseFloat(player.rating) >= 8.0 ? 'green' :
                  parseFloat(player.rating) >= 6.0 ? 'yellow' : 'red'
                )
              }}>
                Rating: {player.rating}
              </p>
              <p>Number: {player.number}</p>
              <p>Age: {player.age}</p>
              <p>Goals: {player.goals}</p>
            </div>
          </div>
        ))}
        {loading && <div className={styles.loading}>Loading more players...</div>}
      </div>
    </div>
  );
} 