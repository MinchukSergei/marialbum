package by.minchuk.web.marialbum.controller;

import by.minchuk.web.marialbum.dto.PhotoItem;
import by.minchuk.web.marialbum.repository.PhotoItemRepository;
import by.minchuk.web.marialbum.util.GlobalConstants;
import by.minchuk.web.marialbum.util.RequestResponse;
import com.mongodb.MongoClient;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@RestController
public class TestRestController {
    @Autowired
    private PhotoItemRepository photoItemRepository;

    @Autowired
    private GridFsTemplate gridFsTemplate;

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

    @RequestMapping(value = "/savePhotos", method = RequestMethod.GET)
    public RequestResponse saveImages() throws FileNotFoundException {
        RequestResponse requestResponse = RequestResponse.createSuccessResponse();
        for (int i = 0; i < 4; i++) {
            InputStream inputStream = new FileInputStream("C:\\Users\\Sergey\\Dropbox\\programming\\MariAlbum\\src\\main\\resources\\images\\" + i + ".jpg");
            gridFsTemplate.store(inputStream, RandomStringUtils.randomAlphanumeric(GlobalConstants.IMAGE_RANDOM_NAME_LENGHT));
        }
        return requestResponse;
    }

    @RequestMapping(value = "/image/{filename}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getImage(@PathVariable("filename") String filename) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setCacheControl(CacheControl.noCache().getHeaderValue());
        HttpStatus httpStatus = HttpStatus.OK;
        GridFSFile fsFile = gridFsTemplate.findOne(new Query().addCriteria(Criteria.where("filename").is(filename)));
        if (fsFile == null) {
            httpStatus = HttpStatus.NOT_FOUND;
            return new ResponseEntity<>(null, headers, httpStatus);
        }
        GridFsResource gridFsResource = gridFsTemplate.getResource(fsFile.getFilename());
        InputStream inputStream = gridFsResource.getInputStream();
        byte[] image = IOUtils.toByteArray(inputStream);
        return new ResponseEntity<>(image, headers, httpStatus);
    }
}
