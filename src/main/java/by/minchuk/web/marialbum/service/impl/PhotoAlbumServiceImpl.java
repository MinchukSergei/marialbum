package by.minchuk.web.marialbum.service.impl;

import by.minchuk.web.marialbum.dto.PhotoAlbum;
import by.minchuk.web.marialbum.exception.ItemNotFoundException;
import by.minchuk.web.marialbum.repository.PhotoAlbumRepository;
import by.minchuk.web.marialbum.service.PhotoAlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Service
public class PhotoAlbumServiceImpl implements PhotoAlbumService {
    @Autowired
    private PhotoAlbumRepository photoAlbumRepository;


    @Override
    public List<PhotoAlbum> getPhotoAlbums() {
        return photoAlbumRepository.findAllByRemovedIsFalse();
    }

    @Override
    public PhotoAlbum getPhotoAlbumById(String id) throws ItemNotFoundException {
        return id == null ? null : getPhotoAlbum(id);
    }

    @Override
    public PhotoAlbum save(PhotoAlbum photoAlbum) {
        photoAlbum.setId(null);
        photoAlbum.setRemoved(false);
        photoAlbum.setPosts(null);
        photoAlbum.setDateCreation(Calendar.getInstance().getTime());
        return photoAlbumRepository.save(photoAlbum);
    }

    @Override
    public PhotoAlbum edit(PhotoAlbum photoAlbum) throws ItemNotFoundException {
        if (photoAlbum.getId() == null) {
            photoAlbum = save(photoAlbum);
        } else {
            getPhotoAlbum(photoAlbum.getId());
            photoAlbum = photoAlbumRepository.save(photoAlbum);
        }

        return photoAlbum;
    }

    @Override
    public void delete(String id) throws ItemNotFoundException {
        if (id == null) {
            return;
        }

        PhotoAlbum photoAlbum = getPhotoAlbum(id);
        photoAlbum.setRemoved(true);
        photoAlbumRepository.save(photoAlbum);
    }

    private PhotoAlbum getPhotoAlbum(String id) throws ItemNotFoundException {
        Optional<PhotoAlbum> photoAlbumOptional = photoAlbumRepository.findById(id);

        if (!photoAlbumOptional.isPresent() || photoAlbumOptional.get().getRemoved()) {
            throw new ItemNotFoundException();
        } else {
            return photoAlbumOptional.get();
        }
    }
}
