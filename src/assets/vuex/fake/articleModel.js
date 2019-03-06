import {replaceObject} from 'assets/js/utils/formatHandlers';


export default {
    state: {
        language: 'zh_tw',
        publications: [
            { id: 1, title: 'PSA美醫指南第一期', dateTime: '2018-12-21 22:11:18', author: 'PSA No.3', image: 'static/images/articles/shutterstock_60149740.jpg' },
            { id: 2, title: 'PSA美醫指南第二期', dateTime: '2018-12-21 22:11:18', author: '八爪博士', image: 'static/images/articles/shutterstock_60149740.jpg' },
            { id: 3, title: 'PSA美醫指南第三期', dateTime: '2018-12-21 22:11:18', author: '好教授', image: 'static/images/articles/shutterstock_11783656.jpg' },
        ],
        articles: [
            { id: 1, publication_id: 1, title: '皮膚雷射及雙波長拉皮 ND:YAG 雷射治療黑眼圈療效評估', dateTime: '2018-12-21 22:11:18', author: 'PSA No.3', image: 'static/images/articles/shutterstock_60149740.jpg' },
            { id: 2, publication_id: 1, title: '皮膚雷射及雙波長拉皮 ND:YAG 雷射治療黑眼圈療效評估', dateTime: '2018-12-21 22:11:18', author: '八爪博士', image: 'static/images/articles/shutterstock_60149740.jpg' },
            { id: 3, publication_id: 1, title: '黑眼圈療效評估', dateTime: '2018-12-21 22:11:18', author: '好教授', image: 'static/images/articles/shutterstock_11783656.jpg' },
            { id: 4, publication_id: 2, title: '皮膚雷射及雙波長拉皮 ND:YAG 雷射治療黑眼圈療效評估', dateTime: '2018-12-21 22:11:18', author: '八爪博士', image: 'static/images/articles/shutterstock_60149740.jpg' },
            { id: 5, publication_id: 2, title: '黑眼圈療效評估', dateTime: '2018-12-21 22:11:18', author: '好教授', image: 'static/images/articles/shutterstock_11783656.jpg' },
        ],
        
    },

    getters: {
        
    },

    actions: {
        
    },

    mutations: {
        
    },
    
};
