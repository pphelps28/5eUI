"use strict"
const params = ['_id', 'index', 'url', 'count', 'results', 'desc', 'category', 'actions', 'skills', 'bonus']
const queryExceptions = ['classes-spells', 'classes-features', 'classes-levels']
$(document).ready(function () {
    $(".input-field").click(function (event) {
        let apiExt = event.target.id
        $("#display").empty()
        let sanitizedEntry = $(this)[0].value.toLowerCase().trim().split(' ').join('-')
        $.ajax(
            {
                statusCode: {
                    404: function () {
                        $("#display").append(`<div class="four-O-four">That knowledge is out of my reach...<div>`)
                        setTimeout(() => {
                            $("#display").empty()
                            $("#display").append(`<div>Press enter on an empty input to see the full list...</div>`)

                        }, 1500);
                    }
                },
                url: !queryExceptions.includes(apiExt) ? `https://www.dnd5eapi.co/api/${apiExt}/${sanitizedEntry}` : `https://www.dnd5eapi.co/api/${apiExt.split('-')[0]}/${sanitizedEntry}/${apiExt.split('-')[1]}`,
                success: function (data) {
                    data = flattenObject(data)
                    let props = Object.keys(data).filter(e => !params.includes(e))
                    props = props.filter(e => !e.includes('url'))
                    props = props.filter(e => !e.includes('index'))
                    for (let p of props) {
                        let val = data[p]
                        $("#display").append(`<div class="list-item" id=""><div class="category">${sanitize(p)} </div> ${val}</div>`)
                    }
                }
            }
        )
        $(this)[0].value = ""

    })
    $(".input-field").keydown(function (event) {
        let apiExt = event.target.id
        if (event.keyCode == 13) {
            $("#display").empty()
            let sanitizedEntry = $(this)[0].value.toLowerCase().trim().split(' ').join('-')
            $.ajax(
                {
                    statusCode: {
                        404: function () {
                            $("#display").append(`<div class="four-O-four">That knowledge is out of my reach...<div>`)
                            setTimeout(() => {
                                $("#display").empty()
                                $("#display").append(`<div>Press enter on an empty input to see the full list...</div>`)

                            }, 1500);
                        }
                    },
                    url: !queryExceptions.includes(apiExt) ? `https://www.dnd5eapi.co/api/${apiExt}/${sanitizedEntry}` : `https://www.dnd5eapi.co/api/${apiExt.split('-')[0]}/${sanitizedEntry}/${apiExt.split('-')[1]}`,
                    success: function (data) {
                        data = flattenObject(data)
                        let props = Object.keys(data).filter(e => !params.includes(e))
                        props = props.filter(e => !e.includes('url'))
                        props = props.filter(e => !e.includes('index'))
                        for (let p of props) {
                            let val = data[p]
                            $("#display").append(`<div class="list-item" id=""><div class="category">${sanitize(p)} </div> ${val}</div>`)
                        }
                    }
                }
            )
            $(this)[0].value = ""
        }
    })

    function sanitize(str) {
        for (let prop of params) {
            if (str.includes(prop)) {
                return " "
            }
        }
        return (str[0].toUpperCase() + str.slice(1).toLowerCase()).split('_').join(' ').split('.')[0]
    }

    const flattenObject = function (ob) {
        var toReturn = {};

        for (var i in ob) {
            if (!ob.hasOwnProperty(i)) continue;

            if ((typeof ob[i]) == 'object') {
                var flatObject = flattenObject(ob[i]);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) continue;

                    toReturn[i + '.' + x] = flatObject[x];
                }
            } else {
                toReturn[i] = ob[i];
            }
        }
        return toReturn;
    };

})

////////////////////////classes, races, subclasses, all more complicated queries/////////////////




