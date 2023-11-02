# Use an official Python runtime as the base image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

RUN apt-get update && apt-get -y install libpq-dev gcc

# Install any needed packages specified in requirements.txt
RUN pip install pandas openpyxl python-dotenv sqlalchemy psycopg2

# Make port 80 available to the world outside this container
# EXPOSE 80

# Define environment variable (if you have any to define)
# ENV NAME World

# Run your script when the container launches
# CMD ["python", "ingest.py"]
