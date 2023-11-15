var me = 'Bruce Wayne'

function greetMe(){
    console.log('Hello, ' + me + '!')
}
me = 'Batman'
greetMe()

function sendRequest(){
    var requestId = '123'
    $.ajax({
        url: '/myUrl',
        success: function(response){
            alert('Request ' + requestId + ' returned')
        }
    })
}