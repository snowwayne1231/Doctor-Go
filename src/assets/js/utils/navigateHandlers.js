
export function getPathByNewsData(data){
    const value = data.link_value;
    const type = data.link_type;
    if (value && type) {
        switch (parseInt(type, 10)) {
        case 1: // 1 => '商品連結',
            return `/product/${value}`;
        case 2: // 2 => '商品品牌連結',
            return `/productbrand/${value}`;
        case 3: // 3 => '商品分類連結',
            return `/productlistfilter/${value}`;
        case 4: // 4 => '文章連結',
            return `/article/${value}`;
        case 5: // 5 => '其他',
            return value;
        default:
        }
    }
    return '/';
    
}



