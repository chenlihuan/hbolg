function serializeToJson(form) {
    var result = {};
    // [{name: 'email', value: '用户输入的内容'}]
    var f = form.serializeArray();
    f.forEach(item => {
        result[item.name] = item.value;
    });
    return result;
}

// function serializeToJson(form) {
//     var result = {};
//     var f = form.serializeArray();
//     f.forEach(function (item) {
//         result[item.name] = item.value;
//     });
//     return result
// }