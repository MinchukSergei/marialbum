package by.minchuk.web.marialbum.service.impl;

import by.minchuk.web.marialbum.dto.PhotoLike;
import by.minchuk.web.marialbum.dto.PostItem;
import by.minchuk.web.marialbum.repository.PhotoLikeRepository;
import by.minchuk.web.marialbum.repository.PostItemRepository;
import by.minchuk.web.marialbum.service.PhotoLikeService;
import by.minchuk.web.marialbum.exception.ItemNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PhotoLikeServiceImpl implements PhotoLikeService {
    @Autowired
    private PhotoLikeRepository photoLikeRepository;

    @Autowired
    private PostItemRepository postItemRepository;

    @Override
    public void togglePhotoLike(PhotoLike photoLike) throws ItemNotFoundException {
        Optional<PhotoLike> photoLikeOptional = photoLikeRepository.findByPhotoIdAndFingerPrint(photoLike.getPhotoId(), photoLike.getFingerPrint());
        Optional<PostItem> postItemOptional = postItemRepository.findById(photoLike.getPhotoId());

        if (!postItemOptional.isPresent() || !postItemOptional.get().getRemoved()) {
            throw new ItemNotFoundException();
        }

        if (photoLikeOptional.isPresent()) {
            photoLikeRepository.delete(photoLikeOptional.get());
        } else {
            photoLike.setId(null);
            photoLikeRepository.save(photoLike);
        }
    }
}
