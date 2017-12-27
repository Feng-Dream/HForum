$(function () {
    $("#logout").click(function () {
        layer.confirm('确定退出系统吗？', {icon: 3, title: '提示', scrollbar: false, offset: ['auto']}, function (index) {
            window.location.href = "user/logout";
            layer.close(index);
        });
    });
});
