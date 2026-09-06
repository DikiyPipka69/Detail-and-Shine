"""Pydantic schemas — request/response validation."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=3, max_length=40)
    service: str = Field(default="full", max_length=40)
    preferred_date: Optional[str] = Field(default=None, max_length=10)
    message: str = Field(default="", max_length=500)


class LeadOut(LeadCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
