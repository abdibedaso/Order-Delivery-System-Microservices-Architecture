FROM openjdk:16-jdk-alpine
ENV APP_FILE keycloak-springboot-0.0.1-SNAPSHOT.jar
ENV APP_HOME /usr/app
EXPOSE 8000
COPY target/*.jar $APP_HOME/
WORKDIR $APP_HOME
ENTRYPOINT ["sh", "-c"]
CMD ["exec java -jar $APP_FILE"]