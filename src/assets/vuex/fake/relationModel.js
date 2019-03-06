import {replaceObject} from 'assets/js/utils/formatHandlers';


export default {
    state: {
        catalogs: [
            { id: 1, name: 'hot', display: '推薦商品', parent: 0 },
            { id: 2, name: 'equipment', display: '醫美儀器', parent: 0 },
            { id: 3, name: 'consumable', display: '醫美耗材', parent: 0 },
            { id: 4, name: 'second', display: '二手商品', parent: 0 },
            { id: 5, name: 'maintenance', display: '醫美保養品', parent: 0 },
            { id: 6, name: 'new', display: '新品專區', parent: 0 },
            { id: 7, name: 'discount', display: '折扣專區', parent: 0 },
            { id: 8, name: 'primary', display: '專屬特惠', parent: 0 },
            { id: 9, name: 'event', display: '活動專區', parent: 0 },
            { id: 10, name: 'brand', display: '品牌專區', parent: 0 },
            { id: 11, name: 'others', display: '其他分類', parent: 0 },
            { id: 12, name: 'equipment-1', display: '醫美儀器-SUB', parent: 2 },
            { id: 13, name: 'equipment-2', display: '醫美儀器-SUB2', parent: 2 },
            { id: 14, name: 'equipment-3', display: '醫美儀器-SUB3', parent: 2 },
            { id: 15, name: 'equipment-1-1', display: '醫美儀器-SUB-SUB', parent: 12 },
            { id: 16, name: 'equipment-1-2', display: '醫美儀器-SUB-SUB2', parent: 12 },
        ],
        events: [],
        brands: [
            { id: 1, name: 'ellanse', display: 'ELLANSE', image: 'static/images/brands/img_brand01@2x.png', info: '上海沪鸽齿科材料有限公司办公室地址位于中国第一大城市，中国的经济、金融中心上海，上海市浦东新区新金桥路1295号2号楼3层，公司成立以来发展迅速，业务不断发展壮大我公司主要经营义齿，我们有最好的产品和专业的销售和技术团队，公司是上海医疗器械加工公司行业内知名企业。' },
            { id: 2, name: 'utims', display: 'UTIMS', image: 'static/images/brands/img_brand02@2x.png', info: '上海沪鸽齿科材料有限公司办公室地址位于中国第一大城市，中国的经济、金融中心上海，上海市浦东新区新金桥路1295号2号楼3层，公司成立以来发展迅速，业务不断发展壮大我公司主要经营义齿，我们有最好的产品和专业的销售和技术团队，公司是上海医疗器械加工公司行业内知名企业。' },
            { id: 3, name: 'body-jet-evo', display: 'Body-jet*evo', image: 'static/images/brands/img_brand03@2x.png', info: '佛山市碧盈医疗器材有限公司是一家经广东省食品药品监督管理局批准及注册的专业生产精密牙科医疗器材的高新技术型企业。公司成立于2005年，注册商标为碧盈beingfoshan。' },
            { id: 4, name: 're-o', display: 'ELLANSE', image: 'static/images/brands/img_brand04@2x.png', info: '佛山市碧盈医疗器材有限公司是一家经广东省食品药品监督管理局批准及注册的专业生产精密牙科医疗器材的高新技术型企业。公司成立于2005年，注册商标为碧盈beingfoshan。' },
            { id: 5, name: 'restylane', display: 'Restylane', image: 'static/images/brands/img_brand05@2x.png', info: '佛山市碧盈医疗器材有限公司是一家经广东省食品药品监督管理局批准及注册的专业生产精密牙科医疗器材的高新技术型企业。公司成立于2005年，注册商标为碧盈beingfoshan。' },
            { id: 6, name: 'juvederm', display: 'Juvederm', image: 'static/images/brands/img_brand06@2x.png', info: '佛山市碧盈医疗器材有限公司是一家经广东省食品药品监督管理局批准及注册的专业生产精密牙科医疗器材的高新技术型企业。公司成立于2005年，注册商标为碧盈beingfoshan。' },
        ],
        catalogToProduct: [
            { id: 1, catalog: 1, product: 1},
            { id: 2, catalog: 2, product: 3},
            { id: 3, catalog: 2, product: 4},
            { id: 4, catalog: 2, product: 5},
            { id: 5, catalog: 2, product: 6},
            { id: 6, catalog: 2, product: 7},
            { id: 7, catalog: 3, product: 7},
            { id: 8, catalog: 3, product: 8},
            { id: 9, catalog: 4, product: 8},
            { id: 10, catalog: 4, product: 9},
            { id: 11, catalog: 4, product: 10},
            { id: 12, catalog: 4, product: 11},
            { id: 13, catalog: 5, product: 8},
            { id: 14, catalog: 5, product: 9},
            { id: 15, catalog: 5, product: 10},
            { id: 16, catalog: 5, product: 11},
            { id: 17, catalog: 6, product: 8},
            { id: 18, catalog: 6, product: 9},
            { id: 19, catalog: 6, product: 10},
            { id: 20, catalog: 6, product: 11},
            { id: 21, catalog: 7, product: 8},
            { id: 22, catalog: 7, product: 9},
            { id: 23, catalog: 7, product: 10},
            { id: 24, catalog: 7, product: 11},
            { id: 25, catalog: 8, product: 8},
            { id: 26, catalog: 8, product: 9},
            { id: 27, catalog: 8, product: 10},
            { id: 28, catalog: 8, product: 11},
            { id: 29, catalog: 9, product: 12},
            { id: 30, catalog: 10, product: 12},
            { id: 31, catalog: 10, product: 13},
        ],
    },

    getters: {
        getCatalogsByParentId: state => id => {
            return id
                ? state.catalogs.filter(e => e.parent === id)
                : state.catalogs.filter(e => e.parent === 0);
        },
        getSubCatalogsById: (state, getters) => (id, isIncludeSelf) => {
            const map = {};
            const catalogs = state.catalogs;
            catalogs.map(e => {
                if (map[e.parent]) {
                    map[e.parent].push(e);
                } else {
                    map[e.parent] = [e];
                }
            });
            let ids = isIncludeSelf ? [id] : [];
            ids = ids.concat(map[id]);
            console.log(ids);

            
        },
        getProductIdsByCatalogId: state => (id, isIncludeSubset) => {
            if (!id) { throw 'Vuex Getter [ getProductIdsByCatalogId ] doesnt has rightful param'; }
            let ids = [];
            if (isIncludeSubset) {
                ids = [];
            } else {
                ids = state.catalogToProduct.filter(e => e.catalog === id).map(e => e.product);
            }
            return ids;
        },
    },

    actions: {
        
    },

    mutations: {
        
    },
    
};
