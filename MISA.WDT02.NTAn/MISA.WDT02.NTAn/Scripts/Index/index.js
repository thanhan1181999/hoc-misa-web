$(document).ready(function () {
    //khi click vào add hiện dialog
    $('.add').click(function () {
        $('input[add-fieldname]').removeClass('borderRed');
        $('.validate-icon').removeClass('display');
        $('.validate-icon-1').removeClass('display');
        $('.validate-icon-2').removeClass('display');
        $('#dialog').dialog({
            modal: true,
            height: 330,
            width: 675,
            title: "Thêm mới khách hàng"
        });

    })
    //khi click vào fix hiện dialog-fix
    $('.fix').click(function () {
        $('input[fix-fieldname]').removeClass('borderRed');
        $('.validate-icon').removeClass('display');
        $('.validate-icon-1').removeClass('display');
        $('.validate-icon-2').removeClass('display');
        $('#dialog-fix').dialog({
            modal: true,
            height: 330,
            width: 675,
            title: "khách hàng"
        });
    })
    //hiện gợi ý ngày tháng khi nhập ngày sinh
    $('#dialog .special-input').datepicker();
    //hiện title làm gợi ý bằng định dạng jquery ui
    $(document).tooltip();
   
    
    //khởi tạo base để load dữ liệu

    var s = new search();
    
});