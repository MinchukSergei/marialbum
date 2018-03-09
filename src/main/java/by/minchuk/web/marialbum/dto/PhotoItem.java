package by.minchuk.web.marialbum.dto;

import org.springframework.data.annotation.Id;

public class PhotoItem {
    @Id
    private String id;
    private String name;
    private Long likes;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getLikes() {
        return likes;
    }

    public void setLikes(Long likes) {
        this.likes = likes;
    }
}
