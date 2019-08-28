class baseAdd extends base{
    constructor() {
        super();
        this.initEvent1();
    }
    initEvent1() {
        $(document).on('click', '#dialog .dlg-cat', this.add.bind(this));
        $(document).on('click', '#dialog .dlg-catVaThem', this.add1.bind(this));
        $(document).on('click', '#dialog .dlg-huybo', function () {
            debugger
            $('#canhbaohuybo').dialog({
                modal: true,
                height: 125,
                width: 400,
                title: "CUKCUK - Quản lý nhà hàng"
            });
        });
       
        //khi click vào hủy bỏ, có 3 nút sau:
        //co
        $(document).on('click', '.canhbaohuybo5', this.add.bind(this) );
        //không
        $(document).on('click', '.canhbaohuybo3', function () {
            $('#canhbaohuybo').dialog('close');
            $('#dialog').dialog('close');
        });
        //hủy bỏ
        $(document).on('click', '.canhbaohuybo4', function () {
            $('#canhbaohuybo').dialog('close');
        });
        //Khi nhập nếu đúng sẽ tự động mất cảnh báo
        $(document).on('keyup', '#makhachhang-add', function () {
            var x = $(this).val();
            if (x != "") {
                $(this).removeClass('borderRed'); $('.validate-icon').removeClass('display');
            }
        });
        $(document).on('keyup', '#tenkhachhang-add', function () {
            var x = $(this).val();
            if (x != "") {
                $(this).removeClass('borderRed'); $('.validate-icon-1').removeClass('display');
            }
        });
        $(document).on('keyup', '#sodienthoai-add', function () {
            var x = $(this).val();
            if (x != "") {
                $(this).removeClass('borderRed'); $('.validate-icon-2').removeClass('display');
            }
        });
    }
    //click vào nút cất
    add() {
        $('#canhbaohuybo').dialog();
        $('#canhbaohuybo').dialog('close');
        var bool = this.checkBeforeAdd();
        var list = $('input[add-fieldname]');
        if (bool) {
            var me = this;
            var listinput = $('#dialog input[add-fieldname]');           
            var object = {};
            $.each(listinput, function (index, item) {              
                var addfiledname = $(this).attr('add-fieldname');
                object[addfiledname] = $(this).val();
            });
            if (object["NgaySinh"] === "")
                object["NgaySinh"] = new Date().formatddMMyyyy();
            debugger
            //call ajax
            $.ajax({
                method: 'POST',
                url: '/customers',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(object),
                success: function (res) {
                    debugger
                    if (res.Success) {
                        $('#dialog').dialog('close');
                        $.each(listinput, function (index, item) {
                            $(this).val("");
                        });
                        me.loadData();
                    } else
                            alert(res.Message);
                }, error: function (res) {
                    alert(res.Message);
                }
            });            
        }
    }
    //click vào nút cất và thêm
    add1() {
       

        var bool = this.checkBeforeAdd();
        var list = $('input[add-fieldname]');
        if (bool) {
            var me = this;
            var listinput = $('#dialog input[add-fieldname]');
            var object = {};
            $.each(listinput, function (index, item) {
                var addfiledname = $(this).attr('add-fieldname');
                object[addfiledname] = $(this).val();
            });
            if (object["NgaySinh"] === "")
                object["NgaySinh"] = new Date().formatddMMyyyy();
            debugger
            //call ajax
            $.ajax({
                method: 'POST',
                url: '/customers',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(object),
                success: function (res) {
                    debugger
                    if (res.Success) {
                        $.each(listinput, function (index, item) {
                            $(this).val("");
                        });
                        $('#dialog').dialog();
                        me.loadData();
                    } else
                        alert(res.Message);
                }, error: function (res) {
                    alert(res.Message);
                }
            });
        }


    }
    //validate trc khi thêm
    checkBeforeAdd() {        
        var list = $('input[add-fieldname]');
        var bool = 1;
        $.each(list, function (index, item) {
            var filed = $(this).attr('add-fieldname');
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
                case "DienThoaiDiDong": if (value == "") {
                    $(this).addClass('borderRed');
                    $('.validate-icon-2').addClass('display');
                    bool = 0;
                } else { $(this).removeClass('borderRed'); $('.validate-icon-2').removeClass('display');}
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
}