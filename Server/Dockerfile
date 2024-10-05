FROM python:3.9-slim

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /venv

ENV PATH="/venv/bin:$PATH"

RUN pip install --no-cache-dir -r requirements.txt


EXPOSE 8000

ENV STORE_ID=0
ENV HOST="db" 
ENV DATABASE="postgres"
ENV USER="postgres"
ENV PASS="postgres"
ENV SECRET="postgres"
ENV ALGORITHM="HS256"

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
