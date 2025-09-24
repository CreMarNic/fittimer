#!/bin/bash
set -e

echo "Building Fittimer application..."

# Install Maven if not present
if ! command -v mvn &> /dev/null; then
    echo "Installing Maven..."
    apt-get update && apt-get install -y maven
fi

# Build the application
echo "Running Maven build..."
mvn clean package -DskipTests

echo "Build completed successfully!"
