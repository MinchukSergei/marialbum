package by.minchuk.web.marialbum.controller;

import by.minchuk.web.marialbum.dto.PhotoItem;
import by.minchuk.web.marialbum.repository.PhotoItemRepository;
import by.minchuk.web.marialbum.util.RequestResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TestRestController {
    @Autowired
    private PhotoItemRepository photoItemRepository;

    @RequestMapping(value = "/generate", method = RequestMethod.GET)
    public RequestResponse generatePhotos() {
        RequestResponse requestResponse = RequestResponse.createSuccessResponse();
        List<PhotoItem> photoItems = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            PhotoItem photoItem = new PhotoItem();
            photoItem.setName("hui" + i);
            photoItem.setLikes((long) i);
            photoItems.add(photoItem);
        }
        photoItemRepository.saveAll(photoItems);
        return requestResponse;
    }

    @RequestMapping(value = "/photos", method = RequestMethod.GET)
    public RequestResponse<List<PhotoItem>> getPhotos() {
        RequestResponse<List<PhotoItem>> requestResponse = RequestResponse.createSuccessResponse();
        List<PhotoItem> photoItems = photoItemRepository.findAll();
        requestResponse.getRequestData().put("photos", photoItems);
        return requestResponse;
    }
}
