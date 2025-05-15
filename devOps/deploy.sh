#!/usr/bin/env bash
set -e

# Variables
REPO=aswinkarki        # Replace 'yourhub' with your actual Docker Hub username/org
TAG=latest
SERVICES=(frontend api db)

# Authenticate with Docker Hub
echo "Logging into Docker Hub..."
docker login

# Build, Tag, and Push each service
for SERVICE in "${SERVICES[@]}"; do
  IMG="$REPO/$SERVICE:$TAG"
  echo "Processing $SERVICE..."

  # Remove existing image if exists
  if docker image inspect "$IMG" > /dev/null 2>&1; then
    echo "Removing existing image $IMG..."
    docker rmi -f "$IMG"
  fi

  # Build the Docker image
  echo "Building $IMG..."
  docker build -t "$IMG" -f "DevOps/Dockerfile.$SERVICE" "./$SERVICE"

  # Push the Docker image
  echo "Pushing $IMG to Docker Hub..."
  docker push "$IMG"
done

# Pull and Deploy using docker-compose
echo "Pulling images and deploying containers with Docker Compose..."
#!/bin/bash
docker compose -f devOps/docker-compose.yml build
docker compose -f devOps/docker-compose.yml up -d


# Cleanup
echo "Cleaning up unused Docker resources..."
docker system prune -f

echo "Deployment complete!"
