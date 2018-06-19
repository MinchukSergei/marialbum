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
        this.getGroupMainInfo();
        this.getAlbums();
    }

    getGroupMainInfo() {
        let me = this,
            params = {
                group_id: APIService.GROUP_ID,
                fields: ['description', 'crop_photo'],
                version: APIService.VK_API_VERSION
            };

        VK.api("groups.getById", params, function ({response: {0: group}}) {
            let mainGroupInfo = {
                headerPhoto: me.getAppropriateImage(group.crop_photo.photo, APIService.IMAGE_SIZES.xxxbig),
                name: group.name,
                description: group.description,
                isLoading: false
            };

            me.appComponent.setState({
                mainGroupInfo: mainGroupInfo
            })
        });
    }

    getAlbums() {
        let me = this,
            ids = [],
            params = {
                owner_id: -APIService.GROUP_ID,
                version: APIService.VK_API_VERSION,
                need_covers: 1
            };

        VK.api("photos.getAlbums", params, function ({response: albumsResp}) {
            let albums = albumsResp.map((album) => {
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
                let albumsData = {
                    albums: albums,
                    isLoading: false
                };

                me.appComponent.setState({
                    contentData: albumsData
                })
            });
        });
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