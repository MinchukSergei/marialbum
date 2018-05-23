package by.minchuk.web.marialbum.service;

import by.minchuk.web.marialbum.dto.PostItem;
import by.minchuk.web.marialbum.exception.ItemNotFoundException;

public interface PostItemService {
    PostItem save(PostItem postItem);
    PostItem edit(PostItem postItem) throws ItemNotFoundException;
    void delete(String id) throws ItemNotFoundException;
}
