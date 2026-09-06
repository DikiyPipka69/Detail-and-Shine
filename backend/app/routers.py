"""API routes.

The submission endpoint is public — anyone visiting the landing page can
send a booking request. Viewing and managing leads requires an admin
token, so competitors or random visitors can't read other customers'
contact details.
"""

import os

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/api/leads", tags=["leads"])

# In production, set the ADMIN_TOKEN environment variable to something
# private. This fallback exists only so the demo works out of the box.
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "changeme")


def require_admin(x_admin_token: str = Header(..., alias="X-Admin-Token")) -> None:
    if x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid admin token")


@router.post("", response_model=schemas.LeadOut, status_code=201)
def create_lead(payload: schemas.LeadCreate, db: Session = Depends(get_db)):
    return crud.create_lead(db, payload)


@router.get("", response_model=list[schemas.LeadOut], dependencies=[Depends(require_admin)])
def list_leads(db: Session = Depends(get_db)):
    return crud.get_leads(db)


@router.delete("/{lead_id}", status_code=204, response_model=None, dependencies=[Depends(require_admin)])
def delete_lead(lead_id: int, db: Session = Depends(get_db)):
    lead = crud.get_lead(db, lead_id)
    if lead is None:
        raise HTTPException(status_code=404, detail="Lead not found")
    crud.delete_lead(db, lead)
