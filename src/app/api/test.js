// Enable coverage reporting
const { createCoverageMap } = require('istanbul-lib-coverage');
const { createContext } = require('istanbul-lib-report');
const { create } = require('istanbul-reports');
const coverageMap = createCoverageMap({});

const API_BASE_URL = 'http://localhost:3000/api/players';

async function apiCall(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  const data = await response.json();
  return { status: response.status, data };
}

async function runTests() {
  console.log('🧪 Starting API Tests...\n');

  try {
    // Test GET all players
    const { status: getStatus, data: allPlayers } = await apiCall('');
    console.log(`Status: ${getStatus}`);
    console.log(`Found ${allPlayers.length} players\n`);

    // Test filtering
    const { data: filteredPlayers } = await apiCall('?position=GK');
    console.log(`Found ${filteredPlayers.length} goalkeepers\n`);

    // Test sorting
    const { data: sortedPlayers } = await apiCall('?sort=rating');
    console.log('Top 3 players by rating:');
    sortedPlayers.slice(0, 3).forEach(player => {
      console.log(`${player.name}: ${player.rating}`);
    });
    console.log('');

    // Test POST
    const newPlayer = {
      name: "Test Player",
      position: "ST",
      rating: "8.5",
      number: "99",
      age: "25",
      goals: "0",
      image: "https://example.com/image.jpg",
      image1: "/test1.png",
      image2: "/test2.png"
    };
    const { status: postStatus, data: createdPlayer } = await apiCall('', 'POST', newPlayer);
    console.log(`Status: ${postStatus}`);
    console.log('Created player:', createdPlayer.name, '\n');

    // Test PATCH
    const update = {
      id: createdPlayer.id,
      rating: "9.0"
    };
    const { status: patchStatus, data: updatedPlayer } = await apiCall('', 'PATCH', update);
    console.log(`Status: ${patchStatus}`);
    console.log('Updated rating:', updatedPlayer.rating, '\n');

    // Test DELETE
    const { status: deleteStatus } = await apiCall(`?id=${createdPlayer.id}`, 'DELETE');
    console.log(`Status: ${deleteStatus}\n`);

    console.log('✅ All tests completed successfully!');

    // Generate coverage report
    const context = createContext({
      dir: './coverage',
      coverageMap
    });

    const reports = ['text', 'lcov'];
    reports.forEach(reporter => {
      create(reporter, {}).execute(context);
    });

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run tests
runTests(); 