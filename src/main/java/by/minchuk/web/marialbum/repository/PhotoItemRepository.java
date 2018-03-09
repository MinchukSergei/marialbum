package by.minchuk.web.marialbum.repository;

import by.minchuk.web.marialbum.dto.PhotoItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PhotoItemRepository extends MongoRepository<PhotoItem, String> {

}
