package by.minchuk.web.marialbum.controller;

import by.minchuk.web.marialbum.dto.PhotoLike;
import by.minchuk.web.marialbum.dto.PostItem;
import by.minchuk.web.marialbum.exception.ItemNotFoundException;
import by.minchuk.web.marialbum.service.PhotoLikeService;
import by.minchuk.web.marialbum.service.PostItemService;
import by.minchuk.web.marialbum.util.ExceptionLabels;
import by.minchuk.web.marialbum.util.RequestResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post")
public class PostItemController {
    @Autowired
    private PostItemService postItemService;

    @Autowired
    private PhotoLikeService photoLikeService;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public RequestResponse<PostItem> addPost(@RequestBody PostItem postItem) {
        RequestResponse<PostItem> requestResponse = RequestResponse.createSuccessResponse();

        postItem = postItemService.save(postItem);
        requestResponse.getRequestData().put("postItem", postItem);

        return requestResponse;
    }

    @RequestMapping(value = "/", method = RequestMethod.PATCH)
    public RequestResponse<PostItem> editAlbum(@RequestBody PostItem postItem) {
        RequestResponse<PostItem> requestResponse = RequestResponse.createSuccessResponse();

        try {
            postItem = postItemService.edit(postItem);
            requestResponse.getRequestData().put("postItem", postItem);
        } catch (ItemNotFoundException e) {
            requestResponse.setSuccess(false);
            requestResponse.getExceptions().put("post.not.found", ExceptionLabels.POST_NOT_FOUND);
        }

        return requestResponse;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public RequestResponse<Void> deleteAlbum(@PathVariable("id") String id) {
        RequestResponse<Void> requestResponse = RequestResponse.createSuccessResponse();

        try {
            postItemService.delete(id);
        } catch (ItemNotFoundException e) {
            requestResponse.setSuccess(false);
            requestResponse.getExceptions().put("post.not.found", ExceptionLabels.POST_NOT_FOUND);
        }

        return requestResponse;
    }

    @RequestMapping(value = "/like", method = RequestMethod.POST)
    public RequestResponse<Void> getAlbumById(@RequestBody PhotoLike photoLike) {
        RequestResponse<Void> requestResponse = RequestResponse.createSuccessResponse();

        try {
            photoLikeService.togglePhotoLike(photoLike);
        } catch (ItemNotFoundException e) {
            requestResponse.setSuccess(false);
            requestResponse.getExceptions().put("post.not.found", ExceptionLabels.POST_NOT_FOUND);
        }

        return requestResponse;
    }
}
