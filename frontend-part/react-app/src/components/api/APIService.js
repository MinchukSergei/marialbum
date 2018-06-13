const VK = window.VK;

export default class APIService {
    static VK_API_VERSION = '5.78';
    static GROUP_ID = 167275521;

    constructor(appComponent) {
        this.appComponent = appComponent;
    }

    load() {
        this.getGroupMainInfo();
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
                headerPhoto: group.crop_photo.photo.src_xxxbig,
                name: group.name,
                description: group.description,
                isLoading: false
            };
            me.appComponent.setState({
                mainGroupInfo
            })
        });
    }
}