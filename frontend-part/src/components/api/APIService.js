import request from 'request';
import errorImage from './error.jpg';

export default class APIService {
    static URL_PREFIX = 'http://server.marialbum.com/api';
    static IMAGE_SIZES = {
        xxxbig: 0,
        xxbig: 1,
        xbig: 2,
        big: 3,
        medium: 4,
        small: 5
    };

    constructor(component) {
        this.component = component;
    }

    getGroupHeaderInfo() {
        let me = this;

        request(APIService.URL_PREFIX + "/header", function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                const {0: group} = JSON.parse(body).response;

                let headerInfo = {
                    headerPhoto: APIService.getAppropriateImage(group.crop_photo.photo, APIService.IMAGE_SIZES.xxxbig),
                    name: group.name,
                    description: group.description,
                    isLoading: false
                };

                me.component.setState({
                    headerInfo: headerInfo,
                    isLoading: false
                });
            }
        });
    }

    handleError() {
        let me = this;
        let headerInfo = {
            headerPhoto: errorImage,
            name: '404 not found',
            description: 'back to the main page',
            isLoading: false
        };

        me.component.setState({
            headerInfo: headerInfo,
            isLoading: false
        });
    }

    getAlbumHeaderInfo(albumId) {
        let me = this;

        if (!Number.isInteger(+albumId)) {
            me.handleError();
            return;
        }

        request(APIService.URL_PREFIX + "/header/" + albumId, function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                const {0: album} = JSON.parse(body).response;

                if (album === undefined) {
                    me.handleError();
                    return;
                }

                me.getPhotos(album.thumb_id, function (photos) {
                    let headerInfo = {
                        headerPhoto: photos[0].imageSrc,
                        name: album.title,
                        description: album.description,
                        isLoading: false
                    };

                    me.component.setState({
                        headerInfo: headerInfo,
                        isLoading: false
                    });
                }, APIService.IMAGE_SIZES.xxxbig);
            }
        });
    }

    getAlbums() {
        let me = this,
            ids = [];

        request(APIService.URL_PREFIX + "/album", function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                const {response: albumsResponse} = JSON.parse(body);

                let albums = albumsResponse.map((album) => {
                    return {
                        id: album.aid,
                        thumbId: album.thumb_id,
                        title: album.title,
                        description: album.description,
                        size: album.size
                    };
                });

                ids = albums.map((album) => album.thumbId);

                me.getPhotos(ids, function (photos) {
                    photos.forEach((photo, i) => {
                        albums[i].thumb = photo.imageSrc;
                    });

                    me.component.setState({
                        contentItems: albums,
                        isLoading: false
                    })
                });
            }
        });
    }

    getPosts(albumId) {
        let me = this;

        if (!Number.isInteger(+albumId)) {
            me.component.setState({
                contentItems: [],
                isLoading: false
            });
            return;
        }

        request(APIService.URL_PREFIX + "/album/" + albumId, function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                const {response: postsResponse} = JSON.parse(body);

                if (postsResponse === undefined) {
                    me.component.setState({
                        contentItems: [],
                        isLoading: false
                    });
                    return;
                }
                let posts = postsResponse.map((post) => {
                    let postSummary = APIService.getPostSummary(post);

                    return {
                        id: post.pid,
                        date: post.created,
                        title: postSummary.title,
                        description: postSummary.description,
                        size: post.size,
                        latitude: post.lat,
                        longitude: post.long,
                        image: APIService.getAppropriateImage(post, APIService.IMAGE_SIZES.xxxbig),
                        likes: post.likes.count
                    };
                });

                me.component.setState({
                    contentItems: posts,
                    isLoading: false
                });
            }
        });
    }

    getPhotos(ids, callback, size) {
        request({
            url: APIService.URL_PREFIX + "/photos",
            qs: {ids: ids},
            useQuerystring: true
        }, function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                const {response: photosResponse} = JSON.parse(body);
                const photos = photosResponse.map((photo) => {
                    return {
                        id: photo.pid,
                        imageSrc: APIService.getAppropriateImage(photo, size)
                    };
                });

                if (callback) {
                    callback(photos);
                }
            }
        });
    }

    static getPostSummary(post) {
        let textArr = post.text ? post.text.split('<br>') : [];
        return {
            title: textArr[0],
            description: textArr.splice(1).join(' ')
        };
    }

    static getAppropriateImage(imageObject, prioritySize = APIService.IMAGE_SIZES.xbig) {
        let sizePriority = ['src_xxxbig', 'src_xxbig', 'src_xbig', 'src_big', 'src', 'src_small'],
            imageSize = sizePriority.slice(prioritySize).find(function (size) {
                return imageObject[size] !== undefined;
            });
        return imageObject[imageSize];
    }
}