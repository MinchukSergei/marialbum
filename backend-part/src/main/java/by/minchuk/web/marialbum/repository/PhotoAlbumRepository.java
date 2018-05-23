package by.minchuk.web.marialbum.repository;

import by.minchuk.web.marialbum.dto.PhotoAlbum;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoAlbumRepository extends MongoRepository<PhotoAlbum, String> {
    List<PhotoAlbum> findAllByRemovedIsFalse();
}
