# Build React Client
FROM node:20-alpine AS client-build
WORKDIR /client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Build Java Spring Boot Server
FROM maven:3.9.6-eclipse-temurin-17 AS server-build
WORKDIR /server
COPY server-java/pom.xml .
RUN mvn dependency:go-offline
COPY server-java/src ./src
# Copy built React client files to Spring Boot static resources folder
COPY --from=client-build /client/dist ./src/main/resources/static
RUN mvn clean package -DskipTests

# Final Stage: Run the Jar file
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=server-build /server/target/*.jar app.jar
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app.jar"]
