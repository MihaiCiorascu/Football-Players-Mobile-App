"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import io from 'socket.io-client';

const PlayerContext = createContext();

const defaultPlayers = [
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
];

const PLAYERS_PER_PAGE = 200;

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState([...defaultPlayers]);
  const [socket, setSocket] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize WebSocket connection
    const newSocket = io('http://localhost:3001', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(newSocket);

    // Set up event listeners
    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
      newSocket.emit('getInitialPlayers');
    });

    newSocket.on('initialPlayers', (initialPlayers) => {
      console.log('Received initial players:', initialPlayers.length);
      if (initialPlayers && initialPlayers.length > 0) {
        setPlayers(prevPlayers => {
          const existingIds = new Set(prevPlayers.map(p => p.id));
          const newPlayers = initialPlayers.filter(p => !existingIds.has(p.id));
          return [...prevPlayers, ...newPlayers];
        });
      }
    });

    newSocket.on('newPlayer', (newPlayer) => {
      console.log('New player received:', newPlayer);
      setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const addPlayer = (player) => {
    setPlayers(prevPlayers => [...prevPlayers, player]);
  };

  const updatePlayer = (id, updatedData) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === id ? { ...player, ...updatedData } : player
      )
    );
  };

  const deletePlayer = (id) => {
    setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== id));
  };

  const getPaginatedPlayers = () => {
    const startIndex = 0;
    const endIndex = currentPage * PLAYERS_PER_PAGE;
    return players.slice(startIndex, endIndex);
  };

  const loadMorePlayers = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoading(false);
    }, 1000);
  };

  const hasMorePlayers = () => {
    return currentPage * PLAYERS_PER_PAGE < players.length;
  };

  return (
    <PlayerContext.Provider value={{ 
      players: getPaginatedPlayers(), 
      totalPlayers: players.length,
      addPlayer, 
      updatePlayer, 
      deletePlayer,
      loadMorePlayers,
      hasMorePlayers,
      loading
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
