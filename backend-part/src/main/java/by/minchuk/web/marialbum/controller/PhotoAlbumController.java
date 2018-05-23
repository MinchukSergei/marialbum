package by.minchuk.web.marialbum.controller;

import by.minchuk.web.marialbum.dto.PhotoAlbum;
import by.minchuk.web.marialbum.service.PhotoAlbumService;
import by.minchuk.web.marialbum.util.ExceptionLabels;
import by.minchuk.web.marialbum.util.RequestResponse;
import by.minchuk.web.marialbum.exception.ItemNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/album")
public class PhotoAlbumController {

    @Autowired
    private PhotoAlbumService photoAlbumService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public RequestResponse<List<PhotoAlbum>> getAllPhotoAlbums() {
        RequestResponse<List<PhotoAlbum>> requestResponse = RequestResponse.createSuccessResponse();

        List<PhotoAlbum> photoAlbums = photoAlbumService.getPhotoAlbums();
        requestResponse.getRequestData().put("photoAlbum", photoAlbums);
        return requestResponse;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public RequestResponse<PhotoAlbum> getAlbumById(@PathVariable("id") String id) {
        RequestResponse<PhotoAlbum> requestResponse = RequestResponse.createSuccessResponse();

        try {
            PhotoAlbum photoAlbum = photoAlbumService.getPhotoAlbumById(id);
            requestResponse.getRequestData().put("photoAlbum", photoAlbum);
        } catch (ItemNotFoundException e) {
            requestResponse.setSuccess(false);
            requestResponse.getExceptions().put("photoalbum.not.found", ExceptionLabels.PHOTOALBUM_NOT_FOUND);
        }

        return requestResponse;
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public RequestResponse<PhotoAlbum> addAlbum(@RequestBody PhotoAlbum photoAlbum) {
        RequestResponse<PhotoAlbum> requestResponse = RequestResponse.createSuccessResponse();

        photoAlbum = photoAlbumService.save(photoAlbum);
        requestResponse.getRequestData().put("photoAlbum", photoAlbum);

        return requestResponse;
    }

    @RequestMapping(value = "/", method = RequestMethod.PATCH)
    public RequestResponse<PhotoAlbum> editAlbum(@RequestBody PhotoAlbum photoAlbum) {
        RequestResponse<PhotoAlbum> requestResponse = RequestResponse.createSuccessResponse();

        try {
            photoAlbum = photoAlbumService.edit(photoAlbum);
            requestResponse.getRequestData().put("photoAlbum", photoAlbum);
        } catch (ItemNotFoundException e) {
            requestResponse.setSuccess(false);
            requestResponse.getExceptions().put("photoalbum.not.found", ExceptionLabels.PHOTOALBUM_NOT_FOUND);
        }

        return requestResponse;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public RequestResponse<Void> deleteAlbum(@PathVariable("id") String id) {
        RequestResponse<Void> requestResponse = RequestResponse.createSuccessResponse();

        try {
            photoAlbumService.delete(id);
        } catch (ItemNotFoundException e) {
            requestResponse.setSuccess(false);
            requestResponse.getExceptions().put("photoalbum.not.found", ExceptionLabels.PHOTOALBUM_NOT_FOUND);
        }

        return requestResponse;
    }
}
