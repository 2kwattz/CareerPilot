$(document).ready(function () {

    $.ajax({
        type: 'get',
        url: 'https://www.universal-tutorial.com/api/getaccesstoken',
        success: function (data) {
            $('#loader').hide();
            getCountry(data.auth_token)
        },

        beforeSend:function(){
            console.log("API Request Sent\n");
            $('#loader').show();

        },

        error: function (error) {
            console.log(error);
        },

        headers: {
            "Accept": "application/json",
            "api-token": "zkTcHaexqv7TswTRgPnFBWRxGZiocBent68owHAll77aTG6qw1mzVtje9STzcIQrhz8",
            "user-email": "prakashbhatia1970@gmail.com"
        }
    })

    function getCountry(auth_token) {

        $.ajax({
            type: 'get',
            url: 'https://www.universal-tutorial.com/api/countries',
            success: function (data) {
                getState(auth_token)
            },

            

            error: function (error) {
                console.log(error);
            },

            headers: {
                "Authorization": "Bearer " + auth_token,
                "Accept": "application/json",

            }
        })

        function getState(auth_token) {

            let countryName = 'India';

            $.ajax({
                type: 'get',
                url: 'https://www.universal-tutorial.com/api/states/' + countryName,
                success: function (data) {
                    getCity(auth_token)
                },

                error: function (error) {
                    console.log(error);
                },

                headers: {
                    "Authorization": "Bearer " + auth_token,
                    "Accept": "application/json",

                }
            })

        }

        function getCity(auth_token) {

            let stateName = 'Gujarat'

            $.ajax({

                type: 'get',
                url: 'https://www.universal-tutorial.com/api/cities/' + stateName,
                success: function (data) {
                    console.log(data);
                },

                error: function (error) {
                    console.log(error);
                },

                headers: {
                    "Authorization": "Bearer " + auth_token,
                    "Accept": "application/json"
                }
            })
        }

    }

});



