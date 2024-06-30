"""Starting from scratch

Revision ID: 06db5fb2b958
Revises: 
Create Date: 2024-03-10 17:02:58.306223

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '06db5fb2b958'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_index(op.f('ix_note_id'), 'note', ['id'], unique=False)
    op.create_index(op.f('ix_user_id'), 'user', ['id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_user_id'), table_name='user')
    op.drop_index(op.f('ix_note_id'), table_name='note')
