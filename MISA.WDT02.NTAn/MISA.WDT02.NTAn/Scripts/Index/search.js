class search extends baseFix{
    constructor() {
        super();
        this.search();
    }
    search() {

        $(document).on('click', '#search-data', this.action.bind(this));
    }
    action() {
      
        var filed = $('.selectsearch option:selected').val();
        var value = $('#search-value').val();
        $.ajax({
            method: 'GET',
            url: '/customers/search/' + filed + '/' + value,
            dataType: "json",
            beforeSend: function () {
                $('#load-data').show();
                $('.main-table').hide();
            },
            success(res) {
                var data = res.Data;
                var fields = $('.main-table th[fieldname]');
                //xóa hết dữ liệu bảng cũ
                $('.main-table tbody').empty();
                //chèn dữ liệu vào bảng
                $.each(data, function (index, item) {
                    var rowhtml = $('<tr></tr>').data('KhachHangID', item["KhachHangID"]);
                    rowhtml.data('MaKhachHang', item["MaKhachHang"]);
                    rowhtml.data('TenKhachHang', item["TenKhachHang"]);
                    $.each(fields, function (fieldindex, fielditem) {
                        var fieldname = fielditem.getAttribute('fieldname');
                        var value = item[fieldname];
                        var cls = 'text-left';
                        //định dạng dữ liệu
                        if (fieldname === "ngaysinh") {
                            value = new date(value);
                        }
                        var type = $.type(value);
                        switch (type) {
                            case "date": value = value.formatddMMyyyy();
                                cls = 'text-center';
                                break;
                            case "number": value = value.formatMoney();
                                cls = 'text-right';
                                break;
                        }
                        //thêm từng ô td vào 1 hàng tr
                        if (fieldname === "ThanhVien5Food" || fieldname === "TheoDoi") {
                            rowhtml.append('<td class="text-center">' + '<input type="checkbox">' + '</td>');
                        } else
                            if (fieldname === "MaTheThanhVien" || fieldname === "HangThe" || fieldname === "SoTienNo") {
                                rowhtml.append('<td class ="' + fieldname + '"></td>');
                            } else
                                rowhtml.append('<td fieldname = "{1}">{0}</td>'.format(value, fieldname));
                    });
                    //thêm 1 hàng tr vừa được load dữ liệu, vào tbody
                    $('.main-table tbody').append(rowhtml);
                });
                $('#load-data').hide();
                $('.main-table').show();
            },
            error() {
                alert("lỗi search");
            }
        });
    }
}