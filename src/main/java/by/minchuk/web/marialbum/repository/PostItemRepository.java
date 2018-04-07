package by.minchuk.web.marialbum.repository;

import by.minchuk.web.marialbum.dto.PostItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostItemRepository extends MongoRepository<PostItem, String> {

}
