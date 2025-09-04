import { NextRequest, NextResponse } from 'next/server'

interface BalanceRequest {
  cardNumber: string
  pin: string
}

interface BalanceResponse {
  success: boolean
  balance?: number
  error?: string
}

// Mock gift card data (in production, this would connect to a payment processor)
const mockGiftCards = [
  { cardNumber: '1234567890123456', pin: '1234', balance: 45.67 },
  { cardNumber: '2345678901234567', pin: '5678', balance: 123.45 },
  { cardNumber: '3456789012345678', pin: '9012', balance: 0.00 },
  { cardNumber: '4567890123456789', pin: '3456', balance: 75.00 },
  { cardNumber: '5678901234567890', pin: '7890', balance: 250.00 },
]

export async function POST(request: NextRequest) {
  try {
    const body: BalanceRequest = await request.json()
    const { cardNumber, pin } = body

    // Validate input
    if (!cardNumber || !pin) {
      return NextResponse.json({
        success: false,
        error: 'Card number and PIN are required'
      }, { status: 400 })
    }

    if (cardNumber.length < 10 || cardNumber.length > 16) {
      return NextResponse.json({
        success: false,
        error: 'Please enter a valid card number (10-16 digits)'
      }, { status: 400 })
    }

    if (pin.length !== 4) {
      return NextResponse.json({
        success: false,
        error: 'PIN must be exactly 4 digits'
      }, { status: 400 })
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check against mock data
    const card = mockGiftCards.find(
      c => c.cardNumber === cardNumber && c.pin === pin
    )

    if (!card) {
      return NextResponse.json({
        success: false,
        error: 'Invalid card number or PIN. Please check your information and try again.'
      }, { status: 404 })
    }

    // Return balance
    return NextResponse.json({
      success: true,
      balance: card.balance
    })

  } catch (error) {
    console.error('Gift card balance check error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'An error occurred while checking your balance. Please try again.'
    }, { status: 500 })
  }
}

// Handle GET requests for testing
export async function GET() {
  return NextResponse.json({
    message: 'Gift Card Balance API',
    endpoint: 'POST /api/gift-cards/balance',
    testCards: [
      { cardNumber: '1234567890123456', pin: '1234', balance: '$45.67' },
      { cardNumber: '2345678901234567', pin: '5678', balance: '$123.45' },
      { cardNumber: '4567890123456789', pin: '3456', balance: '$75.00' },
    ]
  })
}
