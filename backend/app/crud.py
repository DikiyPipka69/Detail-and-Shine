"""CRUD layer — direct database operations."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app import models, schemas


def get_leads(db: Session) -> list[models.Lead]:
    stmt = select(models.Lead).order_by(models.Lead.id.desc())
    return list(db.scalars(stmt).all())


def get_lead(db: Session, lead_id: int) -> models.Lead | None:
    return db.get(models.Lead, lead_id)


def create_lead(db: Session, payload: schemas.LeadCreate) -> models.Lead:
    lead = models.Lead(**payload.model_dump())
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead


def delete_lead(db: Session, lead: models.Lead) -> None:
    db.delete(lead)
    db.commit()
