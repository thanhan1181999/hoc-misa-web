class baseFix extends baseDelete {
    constructor() {
        super();
        this.initEvent3();
    }
    initEvent3() {
        $(document).on('click', '#dialog-fix .dlg-cat-fix', this.fixData.bind(this));
        $(document).on('click', '#dialog-fix .dlg-catVaThem-fix', this.fixData1.bind(this));
        $(document).on('click', '#dialog-fix .dlg-huybo-fix', function () {
            $('#dialog-fix').dialog('close');
        });
        $(document).on('click', '.fix', this.showOneCustomerInfor.bind(this));
    }
    //click vào nút cất
    fixData() {
        var bool = this.checkBeforeFix();
        var list = $('input[fix-fieldname]');
        if (bool) {
            var me = this;
            var listinput = $('#dialog-fix input[fix-fieldname]');
            var object = {};
            $.each(listinput, function (index, item) {
                var fixfiledname = $(this).attr('fix-fieldname');
                object[fixfiledname] = $(this).val();
            });
            var id = $('.selected').data('KhachHangID');
            object['KhachHangID'] = id;
            debugger
            //call ajax
            $.ajax({
                method: 'PUT',
                url: '/customers',
                contentType: 'application/json; charset=utf-8',
                dataType:"json",
                data: JSON.stringify(object),
                success: function (res) {
                    if (res.Success) {
                        $('#dialog-fix').dialog('close');
                        $.each(listinput, function (index, item) {
                            debugger
                            $(this).val("");
                        });
                        me.loadData();
                        $('.more').attr('disabled', 'disabled');
                        $('.fix').attr('disabled', 'disabled');
                        $('.delete').attr('disabled', 'disabled');
                    } else alert(res.Message);
                },
                error: function (res) {
                        alert(res.Message);
                }
            });
        }
    }
    //click vào nút cất và thêm
    fixData1() {
        var bool = this.checkBeforeFix();
        var list = $('input[fix-fieldname]');
        if (bool) {
            var me = this;
            var listinput = $('#dialog-fix input[fix-fieldname]');
            var object = {};
            $.each(listinput, function (index, item) {
                var fixfiledname = $(this).attr('fix-fieldname');
                object[fixfiledname] = $(this).val();
            });
            var id = $('.selected').data('KhachHangID');
            object['KhachHangID'] = id;
            debugger
            //call ajax
            $.ajax({
                method: 'PUT',
                url: '/customers',
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                data: JSON.stringify(object),
                success: function (res) {
                    if (res.Success) {
                        $.each(listinput, function (index, item) {
                            debugger
                            $(this).val("");
                        });
                        me.loadData();
                        $('.more').attr('disabled', 'disabled');
                        $('.fix').attr('disabled', 'disabled');
                        $('.delete').attr('disabled', 'disabled');
                    } else alert(res.Message);
                },
                error: function (res) {
                    alert(res.Message);
                }
            });
        }
    }
    //validate trc khi thêm
    checkBeforeFix() {
        var list = $('input[fix-fieldname]');
        var bool = 1;
        $.each(list, function (index, item) {
            var filed = $(this).attr('fix-fieldname');
            var value = $(this).val();

            switch (filed) {
                case "MaKhachHang": if (value == "") {
                    $(this).addClass('borderRed');
                    $('.validate-icon').addClass('display');
                    bool = 0;
                } else { $(this).removeClass('borderRed'); $('.validate-icon').removeClass('display'); }
                    break;
                case "TenKhachHang": if (value == "") {
                    $(this).addClass('borderRed');
                    $('.validate-icon-1').addClass('display');
                    bool = 0;
                } else { $(this).removeClass('borderRed'); $('.validate-icon-1').removeClass('display'); }
                    break;
                case "SoDienThoai": if (value == "") {
                    $(this).addClass('borderRed');
                    $('.validate-icon-2').addClass('display');
                    bool = 0;
                } else { $(this).removeClass('borderRed'); $('.validate-icon-2').removeClass('display'); }
                    break;
                //case "ngaysinh": if (value != "" && $.type(value) != "date") {
                //    $(this).addClass('borderRed');
                //    bool = 0;
                //} else $(this).removeClass('borderRed');
                // break;
            }

        })
        if (bool == 1) return true; else return false;
    }
    //hiện dữ liệu được chọn( lấy từ database bằng id) ra dialog
    showOneCustomerInfor() {
        //lấy dữ liệu của 1 đối tượng bằng id
        var id = $('.selected').data('KhachHangID');
        var data = [];
        $.ajax({
            method: 'GET',
            url: '/customers/' + id,
            contentType: 'application/json; charset=utf-8',
            async: false,
            success: function (res) {
                if (res.Success) data = res.Data;
                else {
                    alert(res.Message);
                }
            },
            error: function (res) {
                alert(res.Message);
            }
        })
        //
        var me = this;
        //đưa giá trị của đối tượng vào các ô input
        var inputs = $('#dialog-fix input[fix-fieldname]');
        $.each(inputs, function (index, item) {
            debugger    
            var field = item.getAttribute('fix-fieldname');
            var value=data[field];
            var type = $.type(value);
            if (type == 'date') value = value.formatddMMyyyy(); 
            $(this).val(data[field]);
        });

        //hiện dialog fix
        $('#dialog-fix').dialog({
            modal: true,
            height: 330,
            width: 675,
            title: "khách hàng"
        });
    }
   
}