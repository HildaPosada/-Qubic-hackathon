"""
Deployment API endpoints
"""

from fastapi import APIRouter, HTTPException
import logging
import time
import uuid
from datetime import datetime

from app.models.schemas import (
    DeployRequest,
    DeployResponse,
    Deployment,
    DeploymentStatus,
    NetworkType
)
from app.utils.config import settings

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/deploy/testnet", response_model=DeployResponse)
async def deploy_to_testnet(request: DeployRequest):
    """
    Deploy smart contract to Qubic testnet

    Features:
    - Instant finality (no waiting for confirmations!)
    - Feeless deployment (zero gas costs)
    - 15.5M TPS for immediate transaction processing
    """
    return await _deploy_contract(request, NetworkType.TESTNET)


@router.post("/deploy/mainnet", response_model=DeployResponse)
async def deploy_to_mainnet(request: DeployRequest):
    """
    Deploy smart contract to Qubic mainnet

    ⚠️ WARNING: This deploys to production blockchain!
    Ensure thorough testing on testnet first.
    """
    return await _deploy_contract(request, NetworkType.MAINNET)


async def _deploy_contract(request: DeployRequest, network: NetworkType) -> DeployResponse:
    """Internal deployment function"""
    start_time = time.time()

    try:
        logger.info(f"Deploying contract {request.contract_id} to {network}")

        if settings.MOCK_MODE:
            logger.info("🎭 MOCK MODE: Simulating deployment")

            # Simulate deployment (instant thanks to Qubic!)
            deployment = Deployment(
                id=str(uuid.uuid4()),
                contract_id=request.contract_id,
                network=network,
                address=f"QUBIC{uuid.uuid4().hex[:40].upper()}",
                transaction_hash=f"0x{uuid.uuid4().hex}",
                timestamp=datetime.now(),
                status=DeploymentStatus.CONFIRMED,
                gas_used=0,  # Qubic is feeless!
                ipo_config=request.ipo_config
            )

            # Simulate instant finality (but add small delay for realism)
            time.sleep(0.5)

            execution_time = time.time() - start_time

            return DeployResponse(
                success=True,
                deployment=deployment,
                message=f"✅ Contract deployed to {network} successfully! "
                       f"Address: {deployment.address}. "
                       f"Thanks to Qubic's instant finality, your contract is live immediately!",
                execution_time=execution_time
            )

        else:
            # Real deployment logic would go here
            # This would use Qubic SDK to actually deploy to the blockchain

            # For now, return mock response with note
            raise HTTPException(
                status_code=501,
                detail="Real Qubic deployment not yet implemented. Use MOCK_MODE=true for demo."
            )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Deployment failed: {e}", exc_info=True)

        execution_time = time.time() - start_time

        return DeployResponse(
            success=False,
            deployment=None,
            message=f"Deployment failed: {str(e)}",
            execution_time=execution_time
        )


@router.get("/deployments/{deployment_id}")
async def get_deployment(deployment_id: str):
    """Get deployment details by ID"""
    # Mock deployment for demo
    return {
        "success": True,
        "deployment": {
            "id": deployment_id,
            "status": "confirmed",
            "address": f"QUBIC{uuid.uuid4().hex[:40].upper()}",
            "network": "testnet",
            "timestamp": datetime.now().isoformat(),
            "gas_used": 0  # Feeless!
        }
    }


@router.get("/deployments")
async def list_deployments(contract_id: str = None, network: str = None):
    """List all deployments with optional filters"""
    # Mock deployments for demo
    deployments = [
        {
            "id": str(uuid.uuid4()),
            "contract_id": contract_id or "contract_1",
            "network": network or "testnet",
            "address": f"QUBIC{uuid.uuid4().hex[:40].upper()}",
            "status": "confirmed",
            "timestamp": datetime.now().isoformat()
        }
    ]

    return {
        "success": True,
        "deployments": deployments,
        "count": len(deployments)
    }


@router.post("/compile")
async def compile_contract(code: str):
    """
    Compile C++ smart contract code

    In production, this would use the Qubic compiler.
    For demo, we simulate successful compilation.
    """
    try:
        if not code or len(code.strip()) == 0:
            raise HTTPException(status_code=400, detail="Code cannot be empty")

        # Mock compilation
        logger.info("🎭 MOCK MODE: Compiling contract")
        time.sleep(0.3)  # Simulate compilation time

        return {
            "success": True,
            "compiled": True,
            "bytecode": f"0x{uuid.uuid4().hex * 4}",
            "size_bytes": len(code),
            "warnings": [],
            "errors": [],
            "message": "✅ Compilation successful!"
        }

    except Exception as e:
        logger.error(f"Compilation failed: {e}")
        return {
            "success": False,
            "compiled": False,
            "errors": [str(e)],
            "message": "Compilation failed"
        }
