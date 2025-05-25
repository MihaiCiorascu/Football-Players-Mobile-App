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
  const [players, setPlayers] = useState([]);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  const fetchPlayers = async (page = 1) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/players?page=${page}&limit=${PLAYERS_PER_PAGE}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      const data = await response.json();
      console.log('Fetched players:', data);
      setPlayers(data.players);
      setTotalPlayers(data.total);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    fetchPlayers(1);

    // Initialize WebSocket connection
    const newSocket = io(
      process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001',
      {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      }
    );

    setSocket(newSocket);

    // Set up event listeners
    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
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

  const addPlayer = async (playerData) => {
    try {
      // Format the data according to the schema requirements
      const formattedData = {
        name: playerData.name,
        number: parseInt(playerData.number),
        age: parseInt(playerData.age),
        position: playerData.position,
        rating: 5.0
      };

      // Get the JWT token from localStorage (or however you store it)
      const token = localStorage.getItem('token');

      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formattedData),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || responseData.details || 'Failed to add player');
      }

      const newPlayer = responseData.player;
      // Update the players list
      setPlayers(prevPlayers => {
        const updatedPlayers = [newPlayer, ...prevPlayers];
        return updatedPlayers;
      });
      setTotalPlayers(prev => prev + 1);
      return newPlayer;
    } catch (error) {
      console.error('Error in addPlayer:', error);
      throw error;
    }
  };

  const updatePlayer = async (id, updatedFields) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/players?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error('Failed to update player');
      }

      const updatedPlayer = await response.json();
      // Refresh the current page to show the updated player
      await fetchPlayers(currentPage);
      return updatedPlayer;
    } catch (error) {
      console.error('Error updating player:', error);
      throw error;
    }
  };

  const deletePlayer = async (id) => {
    try {
      const response = await fetch(`/api/players?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete player');
      }

      // Refresh the current page to update the list
      await fetchPlayers(currentPage);
    } catch (error) {
      console.error('Error deleting player:', error);
      throw error;
    }
  };

  const loadMorePlayers = async () => {
    if (currentPage * PLAYERS_PER_PAGE >= totalPlayers) return;
    
    setLoading(true);
    try {
      await fetchPlayers(currentPage + 1);
    } finally {
      setLoading(false);
    }
  };

  const hasMorePlayers = () => {
    return currentPage * PLAYERS_PER_PAGE < totalPlayers;
  };

  return (
    <PlayerContext.Provider value={{ 
      players, 
      totalPlayers,
      addPlayer, 
      updatePlayer, 
      deletePlayer,
      loadMorePlayers,
      hasMorePlayers,
      loading,
      currentPage,
      fetchPlayers
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
