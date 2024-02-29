# Use the official Python image as the base image
FROM python:3.11.5
# Install Poetry
RUN python -m pip install poetry
# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY pyproject.toml poetry.lock ./
RUN poetry config virtualenvs.create false --local

# Install dependencies
RUN poetry update
RUN poetry install --no-root

# Copy the project code to the working directory
COPY . /app/

# Run the Django development server
CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
# Expose the port the app runs on
EXPOSE 8000
