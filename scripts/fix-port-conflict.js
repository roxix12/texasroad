#!/usr/bin/env node

/**
 * Fix port conflicts by killing processes using ports 3001-3005
 * This script ensures clean startup of the development server
 */

const { execSync } = require('child_process');

function killProcessOnPort(port) {
  try {
    console.log(`🔍 Checking for processes on port ${port}...`);
    
    // Find processes using the port
    const result = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
    
    if (result.trim()) {
      console.log(`🛑 Found processes on port ${port}, attempting to kill...`);
      
      // Kill all Node.js processes
      execSync('taskkill /F /IM node.exe /T', { stdio: 'ignore' });
      
      console.log(`✅ Killed processes on port ${port}`);
    } else {
      console.log(`✅ Port ${port} is free`);
    }
  } catch (error) {
    console.log(`✅ Port ${port} is free or no conflicts found`);
  }
}

function main() {
  console.log('🚀 Fixing port conflicts for development server...\n');
  
  // Check and fix common development ports
  const ports = [3001, 3002, 3003, 3004, 3005];
  
  ports.forEach(port => {
    killProcessOnPort(port);
  });
  
  console.log('\n✅ Port conflict resolution complete!');
  console.log('💡 You can now run: npm run dev');
}

if (require.main === module) {
  main();
}

module.exports = { killProcessOnPort };
