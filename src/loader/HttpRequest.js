import axios from 'axios';
class HttpRequest {
    constructor() {

    }
    get = function(url, param, onComplete = null, onError = null) {
        axios.get(
            url,
            {
                params: param
            }
        ).then (
            function (response) {
                console.log(response);
                if (onComplete) {
                    onComplete(response.data);
                }
            }
        ).catch (
            function (error) {
                console.log(error);
                if (onError) {
                    onError(error);
                }
            }
        )
    }

    post(url, param, onComplete = null, onError = null) {
        axios.post(
            url,
            param
        ).then (
            function (response) {
                console.log(response);
                if (onComplete) {
                    onComplete(response.data);
                }
            }
        ).catch (
            function (error) {
                console.log(error);
                if (onError) {
                    onError(error);
                }
            }
        )
    }
}
export let request = new HttpRequest();
