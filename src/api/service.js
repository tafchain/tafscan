import axios from 'axios';

const service = axios.create( {
    // 请求地址和网页地址不同
    baseURL: "",
    timeout: 10000,
    headers: { 'Content-type': 'application/json' }
} );
service.interceptors.request.use(
    config => {
        config.data = JSON.stringify( config.data )
        return config
    },
    error => {
        console.log( error, 'err' );
        return Promise.reject( error );
    }
);
service.interceptors.response.use(
    response => {
        const res = response.data;
        if ( response.status !== 200 ) {
            console.log( '!=200 response', response )
            return Promise.reject( res.msg || 'error' );
        }
        return res;
    },
    error => {
        console.log( error, 'error' );
        return Promise.reject( error );
    }
);
let map = {
    100102: '请求失败'
}
const throwError = (code)=> {
    alert(map[code])
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get( url, params ) {
    return new Promise( ( resolve, reject ) => {
        service
            .get(url, {
                params: params,
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post( url, params = {} ) {
    return new Promise( ( resolve, reject ) => {
        service
            .post( url, params )
            .then( ( res ) => {
                if (res.code == 0) resolve( res );
                else throwError(res.code)
            } )
            .catch( ( err ) => {
                reject( err );
            } );
    } );
}

