# Use the official Python image as the base image
FROM python:3.11.5

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY pyproject.toml poetry.lock /app/

# Install Poetry
RUN python -m pip install poetry

# Add Poetry to the PATH environment variable
ENV PATH="${PATH}:/root/.poetry/bin"

# Install dependencies
RUN poetry install

# Copy the project code to the working directory
COPY . /app/

# Expose the port the app runs on
EXPOSE 8000

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
