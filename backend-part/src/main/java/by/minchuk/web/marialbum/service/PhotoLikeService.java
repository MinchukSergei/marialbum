package by.minchuk.web.marialbum.service;

import by.minchuk.web.marialbum.dto.PhotoLike;
import by.minchuk.web.marialbum.exception.ItemNotFoundException;

public interface PhotoLikeService {
    void togglePhotoLike(PhotoLike photoLike) throws ItemNotFoundException;
}
