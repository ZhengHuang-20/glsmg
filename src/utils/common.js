import {message, Modal} from 'ant-design-vue'
import router from "@/router";

export function formatDate(str) {
    return str ? str.split(' ')[0] : '';
}


export function text2html(txt) {
    return txt ? ('<p>' + (txt.replace(/( |\t)/g, '&nbsp').replace(/\n/g, '</p><p>')) + '</p>') : '';
}


function getDomain(domain) {
    if (!domain) return '';
    if (domain.indexOf('http') !== 0) domain = location.protocol + '//' + domain.replace(/^\/\//, '')
    return domain.replace(/\/$/, '')
}

/**
 * 给url增加域名
 * @param domain
 * @param url
 * @returns {string}
 */
export function addDomainToUrl(domain, url) {
    if (!url || url.indexOf('http') === 0 || url.indexOf('//') === 0) return url;
    domain = getDomain(domain)
    url = url.replace(/^\//, '')
    return `${domain}/${url}`
}

/**
 * 移除url中的域名
 * @param domain
 * @param url
 * @returns {*}
 */
export function removeDomainToUrl(domain, url) {
    if (!url) return url;
    return url.replace(getDomain(domain), '')
}

/**
 *
 * @param domain
 * @param html
 * @returns {*}
 */
export function addDomainToHtmlUrl(domain, html) {
    if (!html) return html;

    domain = getDomain(domain)
    let eles = ['img', 'a', 'oembed', 'iframe', 'video', 'source']
    let regex = /<(img|a|oembed|iframe|video|source) [^>]*(src|url|href)=(['"])([^'"]+)?(\3)/ig
    // 所有符合的path
    const urls = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
        let s = match[4];
        // 如果带域名continue
        if (s.indexOf('http') === 0 || s.indexOf('//') === 0) continue;
        if (!urls.includes(s)) {
            s = s.substring(0, 1) === '/' ? s : '/' + s;
            urls.push(s);
        }
    }
    if (urls.length === 0) return html;

    html = html.replace(/</g, '\n<').replace(/>/g, '>\n');

    let es = html.replace(/</g, '\n<').split('\n');
    for (let i = 0; i < es.length; i++) {
        let e = es[i];
        // 如果是<开头的元素
        if (e && e.substring(0, 1) === '<') {
            let m = e.match(/<([^ ]+)/i)
            // 如果是符合的html元素
            if (m && eles.includes(m[1].toLowerCase())) {
                for (let n = 0; n < urls.length; n++) {
                    const url = urls[n];
                    let e1 = e.replace(url, domain + url)
                    if (e1.length !== e.length) {
                        es[i] = e1;
                        break;
                    }
                }
            }
        }
    }
    return es.join('')
}

export function removeDomainToHtmlUrl(domain, html) {
    domain = getDomain(domain)

    let eles = ['img', 'a', 'oembed', 'iframe', 'video', 'source']
    html = html.replace(/</g, '\n<').replace(/>/g, '>\n');

    let es = html.replace(/</g, '\n<').split('\n');
    for (let i = 0; i < es.length; i++) {
        let e = es[i];
        // 如果是<开头的元素
        if (e && e.substring(0, 1) === '<') {
            let m = e.match(/<([^ ]+)/i)
            // 如果是符合的html元素
            if (m && eles.includes(m[1].toLowerCase())) {
                let e1 = e.replace(domain, '')
                if (e1.length !== e.length) es[i] = e1;
            }
        }
    }
    return es.join('')
}

/**
 * promise缓存
 */
export const PromiseCache = {
    __map: new Map(),
    put: function (key, promise) {
        this.__map.set(key, promise);
    },
    get: function (key) {
        return this.__map.get(key)
    },
    has: function (key) {
        return this.__map.has(key)
    },
    remove: function (key) {
        return this.__map.delete(key)
    },
    promise: function (key, promise, cache = true) {
        if (cache && this.has(key)) return this.get(key);
        this.put(key, promise);
        promise.finally(() => {
            if (this.has(key)) {
                this.remove(key);
            }
        })
    }
}

export function errorCallback(e) {
    if (e._toast === false) return;
    message.error(e.message ? e.message : '请求失败，请重试');
}


export function loginConfirm(content) {
    content = content || '没有登录，现在去登录吗？'
    Modal.confirm({
        icon: () => {
        },
        title: '登录确认',
        content: content,
        okText: '登录',
        cancelText: '取消',
        onOk: () => {
            router.push({path: '/login'})
        },
        onCancel: () => {
        }
    });
}
