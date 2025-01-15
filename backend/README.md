The backend for this application follows a multi-tier structure. 

1. Routers: this folder contains api endpoints, which, when requested, calls a method within a service.
2. Services: the primary business logic. In instances where information from the database is needed, the service class will call a method within the repository layer. 
3. Repository: this is the data access layer, this code in these files are used to interact with the database. 
4. Models: This folder contains classes that are used to define the structure of the observations of database tables. 
5. Schemas: classes in this folder are used for data validation and serialization. 
6. Database: just defines database configurations, may move stuff like schemas and models into here, not sure yet. 



