function form () {
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');
// contact form
        let form2 = document.querySelector("#form");
        let input2 = form2.getElementsByTagName('input');

        form2.addEventListener('submit', function(event) {
            event.preventDefault();
            form2.appendChild(statusMessage);
            let formData2 = new FormData(form2);
            
            function postData(data) {
                return new Promise(function(resolve, reject ){
                    let request2 = new XMLHttpRequest();
                    request2.open('POST', 'server.php');
                    request2.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    let obj = {};
                    formData2.forEach(function(value, key) {
                        obj[key] = value;
                    });
            
                    let json = JSON.stringify(obj);
            
                    request2.addEventListener('readystatechange', function() {
                        if (request2.readyState < 4) {
                            resolve();
                        } else if (request2.readyState === 4) {
                            if(request2.status == 200 && request2.status < 3 ) {
                                resolve();
                            }
                            else{
                                reject();
                            }
                        } 
                    });
                    request2.send(json);
                });
           } //End PostData

        function clearInput() {
           for (let i = 0; i < input2.length; i++) {
            input2[i].value = '';
            }
        }

           postData(formData2) 
           .then(() => statusMessage.innerHTML = message.loading)
           .then(() => statusMessage.innerHTML = message.success)

           .catch(() => statusMessage.innerHTML = message.failure);

        });
}

module.exports = form;