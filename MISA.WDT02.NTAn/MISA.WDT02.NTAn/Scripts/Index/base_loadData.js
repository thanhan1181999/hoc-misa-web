class base {
    constructor() {
        this.loadData();
        this.initEvent();
    }
    loadData() {
        var pageIndex = $('.page-index').val();
        var pageSize = $('.page-size option:selected').val();
          ////kiểm tra pageindex nhỏ hơn 0 sẽ gán =0 
        if (pageIndex <= 0) {          
            pageIndex = 1;
            $('.page-index').val(1);
        }
        
        //kiểm tra pageIndex có trống không
        if (pageIndex == "") $('.page-index').addClass("canhbao");
        //cập nhật trạng thái thanh phân trang-------------------------------------------------------------------
        //cập nhật để biết hiện tại chia làm bao nhiêu trang
        var length = this.getLength();
            var text;//text là số số trang           
            if (length % pageSize == 0) {
                text = length / pageSize;
            } else text = ((length - length % pageSize) / pageSize + 1);
            $('#pag-text').data('page-number', text);
            $('#pag-text').text('trên ' + text);
        //kiểm tra xem số pageIndex có lớn hơn số trang không, nếu có sẽ hiện trang cuối cùng
        if (pageIndex > $('#pag-text').data('page-number')) {
            pageIndex = $('#pag-text').data('page-number');           
            $('.page-index').val(text);
        }
        //kiểm tra pagesize lớn hơn độ dài dữ liệu
        if (pageSize > length) pageSize = length;
        //cập nhật trạng thái button có disabled không
        if (pageIndex == 1) {
            if (text == 1) {
                $('.trang').attr("disabled", "disabled"); 
            }
            else {
                $('.trang').removeAttr('disabled');
                $('.trangdau,.trangtruoc').attr("disabled", "disabled");
            }
        }
        else if (pageIndex == text) {
            $('.trang').removeAttr('disabled');
            $('.trangsau,.trangcuoi').attr("disabled", "disabled");
        } 
        else $('.trang').removeAttr('disabled');
        //cập nhật trạng thái div góc phải dưới cùng "hiển thị 1-20 kết quả"
        $('.page-info').text('Hiển thị ' + pageSize
            + ' trên ' + length + ' kết quả ');
        //nếu pageindex không rỗng sẽ thực hiện call ajax lấy dữ liệu
        if (pageIndex != "") {
            $('.page-index').removeClass("canhbao");
            $.ajax({
                method: 'GET',
                url: '/customers/' + pageIndex + '/' + pageSize,
                dataType: "json",
                beforeSend: function () {
                    $('#load-data').show();
                    $('.main-table').hide();
                },
                success: function (res) {
                    if (res.Success) {
                        var data = res.Data;
                        //-------------------------------------------------------------------------------------------------------                   
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
                        //cập nhật lại trạng thái bảng
                        $('#load-data').hide();
                        $('.main-table').show();
                    }
                    else {
                        alert(res.Message);
                    }
                }
            });
        }
    };
    //phân trang
    initEvent() {
        //nhập 1 pageindex mới
        $(document).on('keyup', '.page-index', this.pagingData.bind(this));
        //nhập 1 pagesize mới
        $(document).on('change', '.page-size', this.loadData.bind(this));
        //nhấn nút trang đầu tiên
        $(document).on('click', '.trangdau', this.firstPage.bind(this));
        //nhấn nút trang trước
        $(document).on('click', '.trangtruoc', this.prePage.bind(this));
        //nhấn nút trang sau
        $(document).on('click', '.trangsau', this.nextPage.bind(this));
        //nhấn nút trang cuối
        $(document).on('click', '.trangcuoi', this.endPage.bind(this));
        //nhấn vào load lại data
        $(document).on('click', '.reload', this.loadData.bind(this));
    };
    //hàm nhấn số trang và ấn enter, load lại data
    pagingData(event) {
        if (event.keyCode === 13) {
            this.loadData();
        }
    }
    //hàm lấy length dữ liệu
    getLength() {
        var length;
        $.ajax({
            method: 'GET',
            url: '/customers/length',
            async: false,
            dataType: "json",
            success: function (res) {
              
                length = res;
            },
            error: function (res) {
            }
        });
        return length;
    }
    //sự kiện thực hiện khi nhấn nút trang đầu tiên
    firstPage() {
        $('.page-index').val(1);
        this.loadData();
    }
    //sự kiện thực hiện khi nhấn nút trang trước
    prePage() {
        var x = $('.page-index').val();
        $('.page-index').val(x - 1);
        this.loadData();
    }
    //sự kiện thực hiện khi nhấn nút trang sau
    nextPage() {
        var x = $('.page-index').val();
        x = Number(x);
        $('.page-index').val(x + 1);
        this.loadData();
    }
    //sự kiện thực hiện khi nhấn nút trang cuối
    endPage() {
        $('.page-index').val( $('#pag-text').data('page-number') );
        this.loadData();
    }

 
}