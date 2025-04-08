import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

let players = [
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
    ratingColor: "green"
  },
  {
    id: 2,
    image: "https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2F3466aecfdafcf7165fa5d1540bb46d20dffad75fafa265495ded188b0d7299a3",
    image1: "/dybala1.png",
    image2: "/dybala2.png",
    name: "Paulo Dybala",
    position: "CAM",
    rating: "8.1",
    number: "21",
    age: "31",
    goals: "200",
    ratingColor: "green"
  },
  {
    id: 3,
    image: "https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2F2a5b6f4961a76265d01cc3235fd2eefce7ce23c60d7194c0e7f5de5afe4aff42",
    image1: "/cristiano1.png",
    image2: "/cristiano2.png",
    name: "Cristiano Ronaldo",
    position: "ST",
    rating: "7.9",
    number: "7",
    age: "40",
    goals: "925",
    ratingColor: "yellow"
  },
  {
    id: 4,
    image: "https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2Fd5463b11cd2f1ab183d2750d1d50f6d64909092cfe3206096fc9c061252e30b2",
    image1: "/yamal1.png",
    image2: "/yamal2.png",
    name: "Lamine Yamal",
    position: "RW",
    rating: "9.4",
    number: "19",
    age: "17",
    goals: "22",
    ratingColor: "green"
  },
  {
    id: 5,
    image: "https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2F23aef36b2afc9bc198b4eece02395cc8e3319f547b66d21bddeab5f66f783970",
    image1: "/pedri1.png",
    image2: "/pedri2.png",
    name: "Pedri",
    position: "CM",
    rating: "9.0",
    number: "8",
    age: "22",
    goals: "27",
    ratingColor: "green"
  }
];

const playerSchema = {
  name: { 
    type: 'string', 
    required: true, 
    minLength: 2, 
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/ // Only letters and spaces
  },
  position: { 
    type: 'string', 
    required: true, 
    enum: ["ST", "CF", "LW", "RW", "LM", "RM", "CAM", "CM", "CDM", "LB", "RB", "CB", "GK"]
  },
  rating: { 
    type: 'string', 
    required: true, 
    pattern: /^\d+(\.\d{1})?$/ // One decimal place
  },
  number: { 
    type: 'string', 
    required: true, 
    pattern: /^\d{1,2}$/
  },
  age: { 
    type: 'string', 
    required: true, 
    pattern: /^\d{1,2}$/
  },
  goals: { 
    type: 'string', 
    required: true, 
    pattern: /^\d+$/
  },
  image: { 
    type: 'string', 
    required: true, 
    pattern: /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i
  },
  image1: { 
    type: 'string', 
    required: true,
    pattern: /^\/.+\.(jpg|jpeg|png|gif)$/i
  },
  image2: { 
    type: 'string', 
    required: true,
    pattern: /^\/.+\.(jpg|jpeg|png|gif)$/i
  }
};

function validatePlayer(data, isUpdate = false) {
  const errors = [];
  
  for (const [field, rules] of Object.entries(playerSchema)) {
    if (isUpdate && !(field in data)) continue;
    
    const value = data[field];
    
    if (rules.required && !value) {
      errors.push(`${field} is required`);
      continue;
    }
    
    if (value) {
      if (rules.type === 'string' && typeof value !== 'string') {
        errors.push(`${field} must be a string`);
      }
      if (rules.type === 'number' && typeof value !== 'number') {
        errors.push(`${field} must be a number`);
      }
      
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters`);
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`${field} must be at most ${rules.maxLength} characters`);
      }
      
      if (rules.min !== undefined && value < rules.min) {
        errors.push(`${field} must be at least ${rules.min}`);
      }
      if (rules.max !== undefined && value > rules.max) {
        errors.push(`${field} must be at most ${rules.max}`);
      }
      
      if (rules.pattern && !rules.pattern.test(value.toString())) {
        errors.push(`${field} format is invalid`);
      }
      
      if (rules.enum && !rules.enum.includes(value)) {
        errors.push(`${field} must be one of: ${rules.enum.join(', ')}`);
      }
    }
  }
  
  return errors;
}

function getRatingColor(rating) {
  const numRating = parseFloat(rating);
  if (numRating >= 8.0) return 'green';
  if (numRating >= 6.0) return 'yellow';
  return 'red';
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const position = searchParams.get('position');
  const sort = searchParams.get('sort');
  const id = searchParams.get('id');

  let filteredPlayers = [...players];

  if (position) {
    filteredPlayers = filteredPlayers.filter(player => player.position === position);
  }

  if (sort) {
    filteredPlayers.sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'age') return a.age - b.age;
      if (sort === 'goals') return b.goals - a.goals;
      return 0;
    });
  }

  if (id) {
    const player = filteredPlayers.find(p => p.id === parseInt(id));
    return player 
      ? NextResponse.json(player, { headers: corsHeaders })
      : NextResponse.json({ error: 'Player not found' }, { status: 404, headers: corsHeaders });
  }

  return NextResponse.json(filteredPlayers, { headers: corsHeaders });
}

export async function POST(request) {
  try {
    const newPlayer = await request.json();
    
    const errors = validatePlayer(newPlayer);
    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400, headers: corsHeaders }
      );
    }
    
    const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
    const playerToAdd = {
      ...newPlayer,
      id: newId,
      ratingColor: getRatingColor(newPlayer.rating)
    };
    
    players.push(playerToAdd);
    
    return NextResponse.json(playerToAdd, { 
      status: 201,
      headers: corsHeaders 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid player data' },
      { status: 400, headers: corsHeaders }
    );
  }
}

export async function PATCH(request) {
  try {
    const updates = await request.json();
    const { id, ...updateData } = updates;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Player ID is required' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    const errors = validatePlayer(updateData, true);
    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400, headers: corsHeaders }
      );
    }
    
    const playerIndex = players.findIndex(p => p.id === id);
    if (playerIndex === -1) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404, headers: corsHeaders }
      );
    }
    
    if (updateData.rating) {
      updateData.ratingColor = getRatingColor(updateData.rating);
    }
    
    players[playerIndex] = {
      ...players[playerIndex],
      ...updateData,
    };
    
    return NextResponse.json(players[playerIndex], { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid update data' },
      { status: 400, headers: corsHeaders }
    );
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id'));
  
  if (!id) {
    return NextResponse.json(
      { error: 'Player ID is required' },
      { status: 400, headers: corsHeaders }
    );
  }
  
  const playerIndex = players.findIndex(p => p.id === id);
  if (playerIndex === -1) {
    return NextResponse.json(
      { error: 'Player not found' },
      { status: 404, headers: corsHeaders }
    );
  }
  
  const deletedPlayer = players[playerIndex];
  players.splice(playerIndex, 1);
  
  return NextResponse.json(deletedPlayer, { headers: corsHeaders });
}
