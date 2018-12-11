# js-ajax-upload-file

利用 XMLHttpRequest 2.x 版本支持的 FormData 格式，支持ajax 文件上上传功能。

# 参数

##  action:String
上传文件的url地址
##  onProgress:Function
上传进度回调方法
##  onSuccess:Function
上传成功回调方法
##  onError:Function
上传失败回调方法
##  data:Object
额外的参数
##  filename:String
上传文件名称
##  file: File
上传的文件对象
##  withCredentials: Boolean
是否开启跨域
##  headers:Object
请求头部信息
