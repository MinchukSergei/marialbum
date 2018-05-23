package by.minchuk.web.marialbum.config;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;

@Configuration
public class SpringGridFsConfiguration extends AbstractMongoConfiguration {
    @Value("${spring.data.mongodb.host}")
    private String host;

    @Value("${spring.data.mongodb.port}")
    private int port;

    @Value("${spring.data.mongodb.database}")
    private String database;

    @Value("${spring.data.mongodb.username}")
    private String username;

    @Value("${spring.data.mongodb.password}")
    private String password;

    @Override
    public MongoClient mongoClient() {
        ServerAddress serverAddress = new ServerAddress(host, port);
        MongoCredential mongoCredential = MongoCredential.createCredential(username, database, password.toCharArray());
        MongoClientOptions mongoClientOptions = MongoClientOptions.builder().build();
        return new MongoClient(serverAddress, mongoCredential, mongoClientOptions);
    }

    @Override
    protected String getDatabaseName() {
        return database;
    }

    @Bean
    public GridFsTemplate gridFsTemplate() throws Exception {
        return new GridFsTemplate(mongoDbFactory(), mappingMongoConverter());
    }

//    @Override
//    public MongoDbFactory mongoDbFactory() {
//        MongoCredential userCredentials = MongoCredential.createCredential(username, database, password.toCharArray());
//        MongoDbFactory mongoDbFactory = new SimpleMongoDbFactory();
//        return new SimpleMongoDbFactory()
//    }

//    @Override
//    public MongoClient mongoClient() {
//        return new MongoClient(host, port);
//    }
}
