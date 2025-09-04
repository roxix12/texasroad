#!/usr/bin/env node

/**
 * Test Gift Card API Functionality
 * 
 * This script tests the gift card balance checking API to ensure
 * it's working properly before deployment.
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'

const testCases = [
  {
    name: 'Valid Card #1',
    cardNumber: '1234567890123456',
    pin: '1234',
    expectedBalance: 45.67,
    shouldSucceed: true
  },
  {
    name: 'Valid Card #2',
    cardNumber: '2345678901234567',
    pin: '5678',
    expectedBalance: 123.45,
    shouldSucceed: true
  },
  {
    name: 'Valid Card #3 (Zero Balance)',
    cardNumber: '3456789012345678',
    pin: '9012',
    expectedBalance: 0.00,
    shouldSucceed: true
  },
  {
    name: 'Invalid Card Number',
    cardNumber: '9999999999999999',
    pin: '1234',
    expectedBalance: null,
    shouldSucceed: false
  },
  {
    name: 'Invalid PIN',
    cardNumber: '1234567890123456',
    pin: '9999',
    expectedBalance: null,
    shouldSucceed: false
  },
  {
    name: 'Short Card Number',
    cardNumber: '123456',
    pin: '1234',
    expectedBalance: null,
    shouldSucceed: false
  },
  {
    name: 'Short PIN',
    cardNumber: '1234567890123456',
    pin: '12',
    expectedBalance: null,
    shouldSucceed: false
  }
]

async function testGiftCardAPI() {
  console.log('🎁 Testing Gift Card API Functionality')
  console.log('===================================')
  console.log(`Testing against: ${siteUrl}`)
  console.log('')

  let passedTests = 0
  let totalTests = testCases.length

  for (const testCase of testCases) {
    console.log(`🧪 Testing: ${testCase.name}`)
    console.log(`   Card: ${testCase.cardNumber}`)
    console.log(`   PIN: ${testCase.pin}`)

    try {
      const response = await fetch(`${siteUrl}/api/gift-cards/balance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardNumber: testCase.cardNumber,
          pin: testCase.pin,
        }),
      })

      const data = await response.json()

      if (testCase.shouldSucceed) {
        if (data.success && data.balance === testCase.expectedBalance) {
          console.log(`   ✅ PASSED - Balance: $${data.balance}`)
          passedTests++
        } else {
          console.log(`   ❌ FAILED - Expected balance $${testCase.expectedBalance}, got:`, data)
        }
      } else {
        if (!data.success) {
          console.log(`   ✅ PASSED - Correctly rejected: ${data.error}`)
          passedTests++
        } else {
          console.log(`   ❌ FAILED - Should have been rejected but succeeded:`, data)
        }
      }

    } catch (error) {
      console.log(`   ❌ FAILED - Network error: ${error.message}`)
    }

    console.log('')
  }

  console.log('📊 Test Results')
  console.log('===============')
  console.log(`Passed: ${passedTests}/${totalTests}`)
  console.log(`Success Rate: ${Math.round((passedTests/totalTests) * 100)}%`)

  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Gift card API is working correctly.')
    process.exit(0)
  } else {
    console.log('⚠️ Some tests failed. Please check the implementation.')
    process.exit(1)
  }
}

async function testGiftCardPageAccess() {
  console.log('\n🌐 Testing Gift Card Page Access')
  console.log('===============================')

  try {
    const response = await fetch(`${siteUrl}/gift-cards`)
    
    if (response.ok) {
      console.log('✅ Gift card page is accessible')
      console.log(`   Status: ${response.status}`)
      console.log(`   URL: ${siteUrl}/gift-cards`)
    } else {
      console.log('❌ Gift card page is not accessible')
      console.log(`   Status: ${response.status}`)
    }
  } catch (error) {
    console.log('❌ Failed to access gift card page')
    console.log(`   Error: ${error.message}`)
  }
}

async function runTests() {
  await testGiftCardPageAccess()
  await testGiftCardAPI()
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().catch(console.error)
}

module.exports = { testGiftCardAPI, testGiftCardPageAccess }
