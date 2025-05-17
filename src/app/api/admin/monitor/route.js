import { NextResponse } from 'next/server';
import { Player, Log, User, MonitoredUser } from "../../../../models";
import { auth } from "../../auth/[...nextauth]/route";
import sequelize from "../../../../config/database.js";
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { count = 100 } = await request.json();

    // Ensure database connection
    await sequelize.authenticate();

    // Create a new suspicious user
    const username = `suspicious_user_${Date.now()}`;
    const passwordHash = await bcrypt.hash('password123', 10);
    
    const suspiciousUser = await User.create({
      username,
      passwordHash,
      role: 'user'
    });

    // Add user to monitored users
    await MonitoredUser.create({
      userId: suspiciousUser.id,
      reason: 'Suspicious activity detected - rapid player creation',
      detectedAt: new Date()
    });

    // Create multiple players in quick succession
    const players = [];
    for (let i = 0; i < count; i++) {
      const player = await Player.create({
        name: `Attack Player ${i}`,
        age: Math.floor(Math.random() * 30) + 18,
        position: 'CF',
        number: 10,
        age: 37,
        goals: 0,
        image: 'https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2Fdde248022a08ce177cea0ae2341e3eb74eb577bfa408c8d125ba1b93b21acd80',
        image1: '/messi1.png',
        image2: '/messi2.png',
        userId: suspiciousUser.id,
      });

      // Log each creation
      await Log.create({
        userId: suspiciousUser.id,
        action: "CREATE",
        entity: "Player",
        entityId: player.id,
        details: `Created player during attack simulation`,
      });

      players.push(player);
    }

    return NextResponse.json({ 
      message: "Attack simulation completed",
      createdUser: {
        id: suspiciousUser.id,
        username: suspiciousUser.username
      },
      createdPlayers: players.length 
    });
  } catch (error) {
    console.error("Attack simulation error:", error);
    return NextResponse.json({ 
      message: "Failed to simulate attack", 
      error: error.message 
    }, { status: 500 });
  }
} 