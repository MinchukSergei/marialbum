package by.minchuk.web.marialbum.service.impl;

import by.minchuk.web.marialbum.dto.PostItem;
import by.minchuk.web.marialbum.exception.ItemNotFoundException;
import by.minchuk.web.marialbum.repository.PostItemRepository;
import by.minchuk.web.marialbum.service.PostItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;

@Service
public class PostItemServiceImpl implements PostItemService {
    @Autowired
    private PostItemRepository postItemRepository;

    @Override
    public PostItem save(PostItem postItem) {
        postItem.setId(null);
        postItem.setPhotoLikes(null);
        postItem.setRemoved(false);
        postItem.setDateCreation(Calendar.getInstance().getTime());
        return postItemRepository.save(postItem);
    }

    @Override
    public PostItem edit(PostItem postItem) throws ItemNotFoundException {
        if (postItem.getId() == null) {
            postItem = save(postItem);
        } else {
            getPostItem(postItem.getId());
            postItem = postItemRepository.save(postItem);
        }

        return postItem;
    }

    @Override
    public void delete(String id) throws ItemNotFoundException {
        if (id == null) {
            return;
        }

        PostItem postItem = getPostItem(id);
        postItem.setRemoved(true);
        postItemRepository.save(postItem);
    }

    private PostItem getPostItem(String id) throws ItemNotFoundException {
        Optional<PostItem> postItemOptional = postItemRepository.findById(id);

        if (!postItemOptional.isPresent() || postItemOptional.get().getRemoved()) {
            throw new ItemNotFoundException();
        } else {
            return postItemOptional.get();
        }
    }
}
