document.addEventListener("DOMContentLoaded", () => {
    "use strict"; 


    const form = document.querySelector('form'),
          formItem = form.querySelectorAll('.body__form-block-item'),
          formBlock = document.querySelector('.body__form-block'),
          btn = document.querySelector('.btn'),
          check = form.querySelector('.body__form-block-personal-check');
    
    const pass = form.querySelector('.pass'),
          passRep = form.querySelector('.pass_rep');

    const NameReg = /^[A-Za-zА-Яа-я]{2,15}$/,
          MailReg =  /[A-Za-z0-9-_]{1,}@[A-Za-z0-9-_]{1,}\.[a-z]{2,4}/,
          PassReg = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,16}/;

    let checkStat = false;



 //   sendingData------------------------------------

    let sendingData = function(num){
        
        formItem.forEach((el)=>{
            if(el.value !== "" && el.nextSibling.nextSibling.textContent == '' && checkStat == true){
                num = num + 1;
            }
        });
        if(num === 6){
            let formDate = new FormData(formBlock);
            let obj = {}; 
            formDate.forEach(function(value, key){ 
                obj[key] = value;
            });
            
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {'Content-type': 'application/json; charet=utf-8'}
            })
                .then(response => response.text())
                .then(json => console.log(json));
        }
    };



 //    chesk------------------------------------------
    check.addEventListener('click', ()=> {
        if(checkStat == false){
            checkStat = true;
        }else{
            checkStat = false;
        }
    });


 //    input------------------------------------------

    btn.addEventListener("click", (event) => {
        event.preventDefault();
        
        formItem.forEach((item) => {
            if(item.value == ""){
                item.nextSibling.nextSibling.textContent = '- Поле обязательное для заполнения';
            }else{

                if(item.name == 'name'){
                    if(!NameReg.test(item.value)){
                        item.nextSibling.nextSibling.textContent = '- Не корректно введенное Имя'; 
                    }else{
                        item.nextSibling.nextSibling.textContent = ''; 
                    }
                }
                if(item.name == 'surname'){
                    if(!NameReg.test(item.value)){
                        item.nextSibling.nextSibling.textContent = '- Не корректно введенная Фамилия'; 
                    }else{
                        item.nextSibling.nextSibling.textContent = ''; 
                    }
                }
                if(item.name == 'email'){
                    if(!MailReg.test(item.value)){
                        item.nextSibling.nextSibling.textContent = '- Пожалуйста введите Е-mail в соответствии с форматом: name@domen.ru'; 
                    }else{
                        item.nextSibling.nextSibling.textContent = ''; 
                    }
                }
                if(item.name == 'password'){
                    if(!PassReg.test(item.value)){
                        item.nextSibling.nextSibling.textContent = '- Пароль должен состоять хотя бы из 8 знаков, содержать минимум одну цифру, один символ и одну заглавную и строчную буквы'; 
                    }else{
                        item.nextSibling.nextSibling.textContent = ''; 
                    }
                }
                if(item.name == 'repeat-password'){
                    if(pass.value !== passRep.value){
                        item.nextSibling.nextSibling.textContent = '- Пароли не совпадают';  
                    }else{
                        item.nextSibling.nextSibling.textContent = ''; 
                    }
                }
                if(item.name == 'date'){
                    let now = new Date();
                    let birthDay = new Date(item.value);
                    if(((now - birthDay)/31536000000) >= 18){
                        item.nextSibling.nextSibling.textContent = '';
                    }else{
                        item.nextSibling.nextSibling.textContent = '- Регистрация доступна только для лиц старше 18 лет'; 
                    }
                }
            } 
        });
        let number = 0;
            sendingData(number);
    });
});