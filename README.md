##  Order-Delivery-System-Microservices-Architecture

### Food delivery system 
- Food ordering and food delivery platform for the online customers. 
- Facilitate door-to-door delivery

### Main actors of the system 
 - Customers/consumers 
 - Restaurant  
 - Drivers 
 - Stripe  
 
 ### Architecture

![Desktop](https://github.com/abdibedaso/Order-Delivery-System-Microservices-Architecture/blob/main/public/img/1_eNE5TT2S8XPuOzd7XEsDtg.gif)

### Functional Requirements 
- Customers can  
  - Search for restaurants based on the restaurant name and menu items 
  - Place an order  
  - Receive notifications about the status of an order once placed 
  - Track the status of the order on the app 
  - Pay for the order. 

- Restaurant can 
  - Create their profile (onboarding) and create/refresh/add new menu items, 
  - Update the status of order  

- Driver can  
  - Receive notifications about the available orders in the area, from which they can choose. 
  - Know when the order is available for pickup. 

### Non-Functional Requirements 
- Latency: Hungry users will not like to wait to see the menu/ restaurant details, so the search functionality should be very fast. The ordering experience should also not have high latency and must be seamless and fast.  
- Availability: High availability is desirable for the best experience of a customer and the restaurants that are processing the order 
- High Throughput: The system should be able to handle high peak load without problems or failures. 

### Back off envelope calculation  

- Let's assume we are getting users from 25M area codes 
  - On average, each area code can have 100 restaurants. 
  - Each restaurant can have 15 dishes that can be served. 
  - Total records of dishes = 25M * 100 * 15 = 37.5B 
  - Number of customers: 100M 
- If each customer on an average places 2 orders every day, number of orders in a day = 200M 
- The peak time of orders will vary usually based on the day of the week. 
  For example, weekends might have more orders than on weekdays. Peak times could be somewhere around noon or at dinner time in each region. 
- In general, the searching of menus/restaurants will be read-heavy and the ordering functionality will be write-heavy.


### Technologies
<span align="left">
  <a href="https://www.java.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="40" height="40"/> </a>
  <a href="https://spring.io/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" alt="spring" width="40" height="40"/> </a>
  <a href="https://kafka.apache.org/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/apache_kafka/apache_kafka-icon.svg" alt="kafka" width="40" height="40"/> </a>
  <a href="https://www.rabbitmq.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/rabbitmq/rabbitmq-icon.svg" alt="rabbitMQ" width="40" height="40"/> </a>
  <a href="https://www.nginx.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg" alt="nginx" width="40" height="40"/> </a>
    <a href="https://developer.android.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/android/android-original-wordmark.svg" alt="android" width="40" height="40"/> </a>
  <a href="https://flutter.dev" target="_blank"> <img src="https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg" alt="flutter" width="40" height="40"/> </a></a>
    <a href="https://www.mysql.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a>
    <a href="https://www.mongodb.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a>
    <a href="https://cassandra.apache.org/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/apache_cassandra/apache_cassandra-icon.svg" alt="cassandra" width="40" height="40"/> </a>
    <a href="https://kubernetes.io" target="_blank"> <img src="https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg" alt="kubernetes" width="40" height="40"/> </a>
    <a href="https://istio.com" target="_blank" rel="noreferrer"> <img src="https://istio.io/latest/img/logo.png" alt="istio" width="40" height="40"/> </a>
    <a href="https://cloud.google.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" alt="gcp" width="40" height="40"/> </a>
  <a href="https://www.docker.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a>
  <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a>
  <a href="https://postman.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a>
    <a href="https://grafana.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg" alt="grafana" width="40" height="40"/> </a><a href="https://keyclock.com" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redhat/redhat-original.svg" alt="keyclock" width="40" height="40"/> </a>
    
### Deployment

![Desktop](https://github.com/abdibedaso/Order-Delivery-System-Microservices-Architecture/blob/main/public/img/dep.png)

### Security

![Desktop](https://github.com/abdibedaso/Order-Delivery-System-Microservices-Architecture/blob/main/public/img/sec1.png)
![Desktop](https://github.com/abdibedaso/Order-Delivery-System-Microservices-Architecture/blob/main/public/img/sec2.jpg)

### UI

![Desktop](https://github.com/abdibedaso/Order-Delivery-System-Microservices-Architecture/blob/main/public/img/1.PNG)
![Desktop](https://github.com/abdibedaso/Order-Delivery-System-Microservices-Architecture/blob/main/public/img/2.PNG)
![Desktop](https://github.com/abdibedaso/Order-Delivery-System-Microservices-Architecture/blob/main/public/img/3.PNG)

