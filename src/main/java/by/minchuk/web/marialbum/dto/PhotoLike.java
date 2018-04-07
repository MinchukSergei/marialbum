package by.minchuk.web.marialbum.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@CompoundIndexes({
        @CompoundIndex(name = "photo_fingerprint", def = "{'photoId' : 1, 'userFingerPrint' : 1}")
})
public class PhotoLike {
    @Id
    private String id;
    private String photoId;
    private String userFingerPrint;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPhotoId() {
        return photoId;
    }

    public void setPhotoId(String photoId) {
        this.photoId = photoId;
    }

    public String getUserFingerPrint() {
        return userFingerPrint;
    }

    public void setUserFingerPrint(String userFingerPrint) {
        this.userFingerPrint = userFingerPrint;
    }
}
