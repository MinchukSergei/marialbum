package by.minchuk.web.marialbum.controller;

import by.minchuk.web.marialbum.dto.PhotoLike;
import by.minchuk.web.marialbum.dto.PostItem;
import by.minchuk.web.marialbum.repository.PhotoLikeRepository;
import by.minchuk.web.marialbum.repository.PostItemRepository;
import by.minchuk.web.marialbum.util.GlobalConstants;
import by.minchuk.web.marialbum.util.RequestResponse;
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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class TestRestController {
    @Autowired
    private PostItemRepository postItemRepository;

    @Autowired
    private PhotoLikeRepository photoLikeRepository;

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @RequestMapping(value = "/generate", method = RequestMethod.GET)
    public RequestResponse generatePosts() throws ParseException {
        RequestResponse<Void> requestResponse = RequestResponse.createSuccessResponse();
        List<PostItem> postItems = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            PostItem postItem = new PostItem();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/mm/yyyy");
            postItem.setDate(simpleDateFormat.parse("21/01/2018"));
            postItem.setDateCreation(new Date());
            postItem.setDescription("description" + i);
            postItem.setName("name" + i);
            postItem.setPlace("borisov" + i);
            PhotoLike photoLike = new PhotoLike();
            photoLike.setPhotoId("photoId");
            photoLike.setUserFingerPrint("gauno_jopa");
            photoLike = photoLikeRepository.save(photoLike);
            postItem.setPhotoLikes(Collections.singletonList(photoLike));
            postItems.add(postItem);
        }
        postItemRepository.saveAll(postItems);
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
