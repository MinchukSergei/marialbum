package by.minchuk.web.marialbum.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document
public class PhotoAlbum implements Post {
    @Id
    private String id;
    private String previewPhotoId;
    @DBRef(lazy = true)
    private List<PostItem> posts;
    private String name;
    private String description;
    private Date dateCreation;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPreviewPhotoId() {
        return previewPhotoId;
    }

    public void setPreviewPhotoId(String previewPhotoId) {
        this.previewPhotoId = previewPhotoId;
    }

    public List<PostItem> getPosts() {
        return posts;
    }

    public void setPosts(List<PostItem> posts) {
        this.posts = posts;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }
}
