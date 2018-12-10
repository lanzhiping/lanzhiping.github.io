function request(method, url, data) {
    const xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    return new Promise((resolve, reject) => {
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            }
        };
        xhttp.onerror = reject;
        xhttp.send(data ? JSON.stringify(data) : undefined);
    })
}

function trackView() {
    request(
        'POST',
        'https://zhiping-analytics.herokuapp.com/trackView',
        { time: new Date().toLocaleString('zh') }
    )
}

const analytics = {
    trackView
};

export default analytics;
