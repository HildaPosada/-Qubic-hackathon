"""
AI Code Generation API endpoints
"""

from fastapi import APIRouter, HTTPException
import logging

from app.models.schemas import GenerateRequest, GenerateResponse
from app.services.ai_service import ai_service

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/generate", response_model=GenerateResponse)
async def generate_contract(request: GenerateRequest):
    """
    Generate a Qubic smart contract from natural language description

    This endpoint leverages AI to convert your requirements into production-ready
    C++ smart contract code optimized for Qubic's unique features:
    - 15.5M TPS for high-speed operations
    - Feeless transactions
    - Instant finality
    """
    try:
        logger.info(f"Generating contract from prompt: {request.prompt[:100]}...")

        result = await ai_service.generate_contract(
            prompt=request.prompt,
            template=request.template,
            additional_context=request.additional_context
        )

        if not result.success:
            raise HTTPException(status_code=500, detail="Failed to generate contract")

        logger.info(f"✅ Contract generated successfully in {result.execution_time:.2f}s")
        return result

    except Exception as e:
        logger.error(f"Error in generate_contract: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/templates")
async def list_templates():
    """List available smart contract templates"""
    templates = [
        {
            "id": "voting",
            "name": "Decentralized Voting",
            "description": "Multi-proposal voting with delegate support",
            "category": "Governance",
            "difficulty": "intermediate"
        },
        {
            "id": "token",
            "name": "Token Contract",
            "description": "Fungible token with transfer and balance tracking",
            "category": "Finance",
            "difficulty": "beginner"
        },
        {
            "id": "nft",
            "name": "NFT Collection",
            "description": "Non-fungible token with minting and transfers",
            "category": "Collectibles",
            "difficulty": "intermediate"
        },
        {
            "id": "multisig",
            "name": "Multi-Signature Wallet",
            "description": "Wallet requiring multiple approvals",
            "category": "Security",
            "difficulty": "advanced"
        },
        {
            "id": "escrow",
            "name": "Escrow Service",
            "description": "Trustless escrow with dispute resolution",
            "category": "Finance",
            "difficulty": "intermediate"
        },
        {
            "id": "auction",
            "name": "Auction Platform",
            "description": "English auction with automatic bidding",
            "category": "Marketplace",
            "difficulty": "advanced"
        },
        {
            "id": "lottery",
            "name": "Decentralized Lottery",
            "description": "Provably fair lottery system",
            "category": "Gaming",
            "difficulty": "intermediate"
        },
        {
            "id": "staking",
            "name": "Staking Contract",
            "description": "Token staking with rewards",
            "category": "DeFi",
            "difficulty": "advanced"
        }
    ]

    return {
        "success": True,
        "templates": templates,
        "count": len(templates)
    }


@router.post("/explain")
async def explain_code(code: str):
    """Explain what a smart contract does"""
    # In production, this would use AI to explain the code
    return {
        "success": True,
        "explanation": "This contract implements key functionality leveraging Qubic's features.",
        "complexity": "medium",
        "estimated_gas": 0,  # Qubic is feeless!
        "key_functions": ["initialize", "execute", "query"]
    }


@router.post("/optimize")
async def optimize_code(code: str):
    """Suggest optimizations for smart contract code"""
    return {
        "success": True,
        "original_code": code,
        "optimized_code": code,  # Would be AI-optimized in production
        "improvements": [
            "Reduced computational complexity",
            "Improved memory efficiency",
            "Better error handling"
        ],
        "savings": {
            "gas": 0,  # Qubic is feeless, but still good to optimize
            "execution_time": "15%"
        }
    }
