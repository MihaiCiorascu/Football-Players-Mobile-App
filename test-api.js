import fetch from 'node-fetch';

async function testEndpoints() {
  try {
    console.log('Testing /api/players-stats endpoint...');
    const statsResponse = await fetch('http://localhost:3000/api/players-stats');
    const statsData = await statsResponse.json();
    console.log('Stats response:', statsData);

    console.log('\nTesting /api/players endpoint...');
    const playersResponse = await fetch('http://localhost:3000/api/players');
    const playersData = await playersResponse.json();
    console.log('Players response:', playersData);
  } catch (error) {
    console.error('Error testing endpoints:', error);
  }
}

testEndpoints(); 