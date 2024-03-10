"""Add created_at column for note and user tables

Revision ID: 420761e2ca2e
Revises: 06db5fb2b958
Create Date: 2024-03-10 18:33:02.306629

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '420761e2ca2e'
down_revision: Union[str, None] = '06db5fb2b958'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('note', sa.Column('created_at', sa.DateTime(),
                  nullable=False, server_default=sa.func.now()))
    op.add_column('user', sa.Column('created_at', sa.DateTime(),
                  nullable=False, server_default=sa.func.now()))


def downgrade() -> None:
    op.drop_column('user', 'created_at')
    op.drop_column('note', 'created_at')
