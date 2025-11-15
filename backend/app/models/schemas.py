"""
Pydantic models for request/response schemas
"""

from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from datetime import datetime
from enum import Enum


class ContractLanguage(str, Enum):
    CPP = "cpp"


class NetworkType(str, Enum):
    TESTNET = "testnet"
    MAINNET = "mainnet"


class DeploymentStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    FAILED = "failed"


class IssueSeverity(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    INFO = "info"


# AI Code Generation
class GenerateRequest(BaseModel):
    prompt: str = Field(..., description="Natural language description of the smart contract")
    template: Optional[str] = Field(None, description="Template to base the contract on")
    additional_context: Optional[str] = Field(None, description="Additional context or requirements")

    class Config:
        json_schema_extra = {
            "example": {
                "prompt": "Create a decentralized voting contract with time limits and delegate voting",
                "template": "voting",
                "additional_context": "Should support multiple proposals and prevent double voting"
            }
        }


class GenerateResponse(BaseModel):
    success: bool
    code: str
    explanation: str
    suggestions: List[str]
    estimated_complexity: str
    execution_time: float


# Security Auditing
class AuditRequest(BaseModel):
    code: str = Field(..., description="Smart contract code to audit")
    contract_name: Optional[str] = Field(None, description="Name of the contract")

    class Config:
        json_schema_extra = {
            "example": {
                "code": "#include <qubic.h>\n\nstruct VotingContract { ... }",
                "contract_name": "VotingContract"
            }
        }


class Issue(BaseModel):
    severity: IssueSeverity
    category: str
    line: int
    column: int
    message: str
    fix: Optional[str] = None
    code_snippet: Optional[str] = None


class AuditResponse(BaseModel):
    success: bool
    score: int = Field(..., ge=0, le=100, description="Security score from 0-100")
    issues: List[Issue]
    summary: str
    recommendations: List[str]
    execution_time: float
    passed: bool = Field(..., description="Whether the contract passed the audit (score >= 80)")


# Smart Contract
class SmartContract(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    code: str
    language: ContractLanguage = ContractLanguage.CPP
    version: str = "1.0.0"
    author: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    compiled: bool = False
    deployed: bool = False
    deployment_address: Optional[str] = None
    network: Optional[NetworkType] = None


class CreateContractRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    code: str
    author: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "MyVotingContract",
                "description": "A decentralized voting contract",
                "code": "#include <qubic.h>\n\n...",
                "author": "developer@example.com"
            }
        }


class UpdateContractRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    code: Optional[str] = None


# Deployment
class IPOConfig(BaseModel):
    total_supply: int = Field(..., gt=0)
    price_per_share: float = Field(..., gt=0)
    sale_start: datetime
    sale_end: datetime


class DeployRequest(BaseModel):
    contract_id: str
    network: NetworkType = NetworkType.TESTNET
    ipo_config: Optional[IPOConfig] = None

    class Config:
        json_schema_extra = {
            "example": {
                "contract_id": "contract_123",
                "network": "testnet",
                "ipo_config": None
            }
        }


class Deployment(BaseModel):
    id: str
    contract_id: str
    network: NetworkType
    address: str
    transaction_hash: str
    timestamp: datetime
    status: DeploymentStatus
    gas_used: int = 0  # Always 0 for Qubic (feeless)
    ipo_config: Optional[IPOConfig] = None
    error_message: Optional[str] = None


class DeployResponse(BaseModel):
    success: bool
    deployment: Optional[Deployment] = None
    message: str
    execution_time: float


# Testing
class TestScenario(BaseModel):
    name: str
    description: Optional[str] = None
    inputs: dict
    expected_outputs: dict


class TestRequest(BaseModel):
    contract_id: str
    scenarios: List[TestScenario]


class TestResult(BaseModel):
    scenario_name: str
    passed: bool
    actual_output: dict
    error_message: Optional[str] = None
    execution_time: float


class TestResponse(BaseModel):
    success: bool
    total_tests: int
    passed_tests: int
    failed_tests: int
    results: List[TestResult]
    overall_execution_time: float


# Templates
class Template(BaseModel):
    id: str
    name: str
    description: str
    category: str
    code: str
    example_usage: str
    difficulty: Literal["beginner", "intermediate", "advanced"]


# Statistics
class ContractStats(BaseModel):
    total_contracts: int
    deployed_contracts: int
    average_security_score: float
    total_deployments: int
    total_tests_run: int


# Error Response
class ErrorResponse(BaseModel):
    error: str
    message: str
    details: Optional[dict] = None
