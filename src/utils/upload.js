import {getAction, uploadAction} from "@/api/manage";
import {FILE_STORAGE_MODE} from "@/store/mutation-types";


const fileMode = FILE_STORAGE_MODE;

/**
 * 上传文件
 * @param file
 * @param filetype 文件类型 [0:通用]
 * @param progress
 * @param filetype 文件来源
 * @returns {Promise<unknown>}
 */
export async function uploadFile(file, filetype, progress, source = 0) {
    return new Promise(function (resolve, reject) {
        let filename = file.name;
        let ext;
        let m = filename.match(/\.([^.]+)$/);
        ext = m != null && m.length > 0 ? m[1] : '';

        console.log('file upload')

        if (fileMode == 1) {
            let formData = new FormData();
            formData.append('file', file);
            formData.append('source', source);
            uploadAction('/manager/common/upload/uploadFile', formData, progress).then((res) => {
                if (!res.success) throw res;
                resolve(res.result);
            }).catch((e) => {
                reject(e);
            })
        } else if (fileMode == 2) {
            getAction('/manager/common/upload/genStorageConfig', {fileType: filetype, ext: ext}).then((res) => {
                if (!res.success) throw res;
                let data = res.result;

                let url = data.url;
                let policy = data.postPolicy;

                let formData = new FormData();
                formData.append('OSSAccessKeyId', policy.accessId);
                formData.append('signature', policy.signature);
                formData.append('policy', policy.policy);
                formData.append('key', policy.path);
                formData.append('success_action_status', '200');
                formData.append('file', file);
                uploadAction(data.host, formData, progress).then((res) => {
                    resolve({url: url});
                }).catch((e) => {
                    reject(e);
                })
            }).catch((e) => {
                reject(e);
            })
        }


    });
}
