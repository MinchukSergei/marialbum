package by.minchuk.web.marialbum.service;

import by.minchuk.web.marialbum.dto.PhotoAlbum;
import by.minchuk.web.marialbum.exception.ItemNotFoundException;

import java.util.List;


public interface PhotoAlbumService {
    List<PhotoAlbum> getPhotoAlbums();
    PhotoAlbum getPhotoAlbumById(String id) throws ItemNotFoundException;
    PhotoAlbum save(PhotoAlbum photoAlbum);
    PhotoAlbum edit(PhotoAlbum photoAlbum) throws ItemNotFoundException;
    void delete(String id) throws ItemNotFoundException;
}
