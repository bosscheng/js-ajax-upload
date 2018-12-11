/*
* author: wancheng
* date: 12/11/18
* desc: upload file by ajax XMLHttpRequest2.x
*/


!(function () {

    function getBody(xhr) {
        const text = xhr.responseText || xhr.response;
        if (!text) {
            return text;
        }

        try {
            return JSON.parse(text);
        }
        catch (e) {
            return text;
        }
    }

    function getError(action, options, xhr) {
        let msg;
        if (xhr.response) {
            msg = `${xhr.response.error || xhr.response}`;
        } else if (xhr.responseText) {
            msg = `${xhr.responseText}`;
        } else {
            msg = `fail to post ${action} ${xhr.status}`;
        }

        const err = new Error(msg);
        err.status = xhr.status;
        err.method = 'post';
        err.url = action;
        return err;
    }

    /**
     *
     * @param options
     *          action:String 上传文件的url地址
     *          onProgress:Function 上传进度回调方法
     *          onSuccess:Function 上传成功回调方法
     *          onError:Function  上传失败回调方法
     *          data:Object  额外的参数
     *          filename:String 上传文件名称
     *          file: File  上传的文件对象
     *          withCredentials: Boolean 是否开启跨域
     *          headers:Object 请求头部信息
     * @returns {*}
     */

    function upload(options) {
        options = options || {};
        if (typeof XMLHttpRequest === 'undefined') {
            return;
        }

        const xhr = new XMLHttpRequest();
        const action = options.action; // url

        if (xhr.upload) {
            // on progress
            xhr.upload.onprogress = function (e) {
                if (e.total > 0) {
                    e.percent = e.loaded / e.total * 100;
                }
                options.onProgress(e);
            }
        }

        const formData = new FormData();

        //
        if (options.data) {
            Object.keys(options.data).forEach((key) => {
                formData.append(key, options.data[key]);
            });
        }

        formData.append(options.filename, options.file, options.file.name);

        xhr.onerror = function (e) {
            options.onError(e);
        };

        xhr.onload = function () {
            if (xhr.status < 200 || xhr.status >= 300) {
                return options.onError(getError(action, options, xhr));
            }

            options.onSuccess(getBody(xhr));
        };

        xhr.open('post', action, true);

        if (options.withCredentials && 'withCredentials' in xhr) {
            xhr.withCredentials = true;
        }

        const headers = options.headers || {};

        for (let item in headers) {
            if (headers.hasOwnProperty(item) && headers[item] !== null) {
                xhr.setRequestHeader(item, headers[item]);
            }

        }

        xhr.send();

        return xhr;
    }
})();
