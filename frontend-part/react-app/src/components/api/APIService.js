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

    constructor(appComponent) {
        this.appComponent = appComponent;
    }

    load() {
        // this.getGroupMainInfo();
        // this.getAlbums();
        this.getPosts(254672524);
    }

    getGroupMainInfo() {
        let me = this,
            params = {
                group_id: APIService.GROUP_ID,
                fields: ['description', 'crop_photo'],
                version: APIService.VK_API_VERSION
            };

        VK.api("groups.getById", params, function ({response: {0: group}}) {
            let headerInfo = {
                headerPhoto: me.getAppropriateImage(group.crop_photo.photo, APIService.IMAGE_SIZES.xxxbig),
                name: group.name,
                description: group.description,
                isLoading: false
            };

            me.appComponent.setState({
                headerInfo: headerInfo
            })
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

                me.appComponent.setState({
                    contentData: {
                        contentItems: albums,
                        isLoading: false
                    }
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
                    image: me.getAppropriateImage(post, APIService.IMAGE_SIZES.xxxbig),
                    likes: post.likes.count
                };
            });

            me.appComponent.setState({
                contentData: {
                    contentItems: posts,
                    isLoading: false
                }
            })
        });
    }

    static getPostSummary(post) {
        let textArr = post.text ? post.text.split('<br>') : [];
        return {
            title: textArr[0],
            description: textArr[1]
        };
    }

    getPhotos(ids, callback) {
        let me = this,
            params = {
                photos: ids,
                version: APIService.VK_API_VERSION
            };

        VK.api("photos.getById", params, function ({response: photos}) {
            photos = photos.map((photo) => {
                return {
                    id: photo.pid,
                    imageSrc: me.getAppropriateImage(photo)
                };
            });

            if (callback) {
                callback(photos);
            }
        });
    }

    getAppropriateImage(imageObject, prioritySize = APIService.IMAGE_SIZES.xbig) {
        let sizePriority = ['src_xxxbig', 'src_xxbig', 'src_xbig', 'src_big', 'src', 'src_small'],
            imageSize = sizePriority.slice(prioritySize).find(function (size) {
                return imageObject[size] !== undefined;
            });
        return imageObject[imageSize];
    }
}