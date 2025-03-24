"use client";
import React, { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState([
    {
      id: 1,
      image: "https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2Fdde248022a08ce177cea0ae2341e3eb74eb577bfa408c8d125ba1b93b21acd80",
      image1: "/messi1.png",
      image2: "/messi2.png",
      name: "Lionel Messi",
      position: "CF",
      rating: "8.7",
      number: "10",
      age: "37",
      goals: "851",
    },
    {
      id: 2,
      image: "https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2F3466aecfdafcf7165fa5d1540bb46d20dffad75fafa265495ded188b0d7299a3",
      name: "Paulo Dybala",
      image1: "/dybala1.png",
      image2: "/dybala2.png",
      position: "CAM",
      rating: "8.1",
      number: "21",
      age: "31",
      goals: "200",
    },
    {
      id: 3,
      image: "https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2F2a5b6f4961a76265d01cc3235fd2eefce7ce23c60d7194c0e7f5de5afe4aff42",
      name: "Cristiano Ronaldo",
      image1: "/cristiano1.png",
      image2: "/cristiano2.png",
      position: "ST",
      rating: "7.9",
      number: "7",
      age: "40",
      goals: "925",
    },
    {
      id: 4,
      image: "https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2Fd5463b11cd2f1ab183d2750d1d50f6d64909092cfe3206096fc9c061252e30b2",
      name: "Lamine Yamal",
      image1: "/yamal1.png",
      image2: "/yamal2.png",
      position: "RW",
      rating: "9.4",
      number: "19",
      age: "17",
      goals: "22",
    },
    {
      id: 5,
      image: "https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2F23aef36b2afc9bc198b4eece02395cc8e3319f547b66d21bddeab5f66f783970",
      name: "Pedri",
      image1: "/pedri1.png",
      image2: "/pedri2.png",
      position: "CM",
      rating: "9.0",
      number: "8",
      age: "22",
      goals: "27",
    },
    {
      id: 6,
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6f42d19d337d35a53e290fc9f121ede2b8f322a28f4059e746fb20f1a7b96889?placeholderIfAbsent=true&apiKey=6c19a84570cc4b7ebcefc63534859305",
      name: "Radu Dragusin",
      image1: "/dragusin1.png",
      image2: "/dragusin2.png",
      position: "CB",
      rating: "7.3",
      number: "3",
      age: "23",
      goals: "7",
    },
    {
      id: 7,
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4f91d6d34742cc282e1a75b7630953d2ae8d76178960254d98aa02ea53ee2596?placeholderIfAbsent=true&apiKey=6c19a84570cc4b7ebcefc63534859305",
      name: "Florinel Coman",
      image1: "/florinel1.png",
      image2: "/florinel2.png",
      position: "LM",
      rating: "8.4",
      number: "9",
      age: "26",
      goals: "75",
    }
  ]);

  const [deletedPlayer, setDeletedPlayer] = useState(null);

  const updatePlayer = (id, newName, newNumber, newPosition) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, name: newName, number: newNumber, position: newPosition } : player
      )
    );
  };

  const deletePlayer = (id) => {
    const playerToDelete = players.find((player) => player.id === id);
    if (playerToDelete) {
      setDeletedPlayer(playerToDelete); // Store deleted player
      setPlayers(players.filter((player) => player.id !== id)); // Remove from list
    }
  };

  const undoDelete = () => {
    if (deletedPlayer) {
      setPlayers((prev) => [...prev, deletedPlayer]); // Restore deleted player
      setDeletedPlayer(null); // Clear undo state
    }
  };

  const addPlayer = (newPlayer) => {
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]); // Add player at end
  };

  return (
    <PlayerContext.Provider value={{ players, updatePlayer, deletePlayer, undoDelete, deletedPlayer, addPlayer}}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
