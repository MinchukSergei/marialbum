const koaRouter = require('koa-router');
const koaRequest = require('koa-http-request');

const router = new koaRouter({prefix: '/api'});
const accessToken = process.env.VK_ACCESS_TOKEN;
const GROUP_ID = 167275521;

router.use(koaRequest({host: 'https://api.vk.com/method'}));

router.get('/header', async (ctx, next) => {
    ctx.state.vkResponse = await ctx.get('/groups.getById', createParams({
        group_id: GROUP_ID,
        fields: ['description', 'crop_photo']
    }));
    next();
});

router.get('/header/:albumId', async (ctx, next) => {
    let albumId = ctx.params.albumId;
    if (!albumIdIsValid(albumId)) {
        return;
    }
    ctx.state.vkResponse = await ctx.get('/photos.getAlbums', createParams({
        owner_id: -GROUP_ID,
        album_ids: albumId
    }));
    next();
});

router.get('/album', async (ctx, next) => {
    ctx.state.vkResponse = await ctx.get('/photos.getAlbums', createParams({
        owner_id: -GROUP_ID,
    }));
    next();
});

router.get('/album/:albumId', async (ctx, next) => {
    let albumId = ctx.params.albumId;
    if (!albumIdIsValid(albumId)) {
        return;
    }
    ctx.state.vkResponse = await ctx.get('/photos.get', createParams({
        owner_id: -GROUP_ID,
        album_id: albumId,
        extended: 1
    }));
    next();
});

router.get('/photos', async (ctx, next) => {
    let ids = ctx.query.ids;
    if (!ids) {
        return;
    } else {
        if (!Array.isArray(ids)) {
            ids = [ids];
        }
        ids = ids.map(id => {
            return -GROUP_ID + '_' + id;
        });
    }
    ctx.state.vkResponse = await ctx.get('/photos.getById', createParams({
        photos: ids,
        owner_id: -GROUP_ID,
    }));
    next();
});

router.use(ctx => ctx.body = ctx.state.vkResponse);

const createParams = function (params) {
    return Object.assign(params, {
        access_token: accessToken,
        version: 5.78
    });
};

const albumIdIsValid = function (albumId) {
    albumId = +albumId;
    return albumId && Number.isInteger(albumId);
};

exports.router = router;



