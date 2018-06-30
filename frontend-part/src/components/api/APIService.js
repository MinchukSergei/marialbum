import errorImage from './error.jpg';

const VK = window.VK;

export default class APIService {
    static VK_API_VERSION = '5.78';
    static GROUP_ID = 167275521;
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
        let me = this,
            params = {
                group_id: APIService.GROUP_ID,
                fields: ['description', 'crop_photo'],
                version: APIService.VK_API_VERSION
            };

        VK.api("groups.getById", params, function ({response: {0: group}}) {
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
        let me = this,
            params = {
                owner_id: -APIService.GROUP_ID,
                album_ids: albumId,
                version: APIService.VK_API_VERSION
            };

        if (!Number.isInteger(+albumId)) {
            me.handleError();
            return;
        }

        VK.api("photos.getAlbums", params, function ({response: {0: album}}) {
            if (album === undefined) {
                me.handleError();
                return;
            }
            let id = -APIService.GROUP_ID + '_' + album.thumb_id;

            me.getPhotos(id, function (photos) {
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
        });
    }

    getAlbums() {
        let me = this,
            ids = [],
            params = {
                owner_id: -APIService.GROUP_ID,
                version: APIService.VK_API_VERSION
            };

        VK.api("photos.getAlbums", params, function ({response: albumsResponse}) {
            let albums = albumsResponse.map((album) => {
                return {
                    id: album.aid,
                    thumbId: album.thumb_id,
                    title: album.title,
                    description: album.description,
                    size: album.size
                };
            });

            ids = albums.map((album) => -APIService.GROUP_ID + '_' + album.thumbId);

            me.getPhotos(ids, function (photos) {
                photos.forEach((photo, i) => {
                    albums[i].thumb = photo.imageSrc;
                });

                me.component.setState({
                    contentItems: albums,
                    isLoading: false
                })
            });
        });
    }

    getPosts(albumId) {
        let me = this,
            params = {
                owner_id: -APIService.GROUP_ID,
                album_id: albumId,
                extended: 1,
                version: APIService.VK_API_VERSION
            };

        VK.api("photos.get", params, function ({response: postsResponse}) {
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
        });
    }

    getPhotos(ids, callback, size) {
        let params = {
            photos: ids,
            version: APIService.VK_API_VERSION
        };

        VK.api("photos.getById", params, function ({response: photos}) {
            photos = photos.map((photo) => {
                return {
                    id: photo.pid,
                    imageSrc: APIService.getAppropriateImage(photo, size)
                };
            });

            if (callback) {
                callback(photos);
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