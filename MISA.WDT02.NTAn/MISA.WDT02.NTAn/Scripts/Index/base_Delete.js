class baseDelete extends baseAdd {
    constructor() {
        super();
        this.initEvent2();
    }
  
    initEvent2() {
        //các action khi click vào 1 hàng
        $(document).on('click', 'tbody tr', function () {
            $(this).toggleClass('selected');
            //cài đặt trạng thái cho các nút thêm sửa xóa
            var num = $('.selected').length;
                switch (num) {
                    case 0: $('.more').attr('disabled', 'disabled');
                        $('.fix').attr('disabled', 'disabled');
                        $('.delete').attr('disabled', 'disabled'); break;
                    case 1: $('.more').removeAttr('disabled', 'disabled');
                        $('.fix').removeAttr('disabled', 'disabled');
                        $('.delete').removeAttr('disabled', 'disabled'); break;
                    default: $('.more').attr('disabled', 'disabled');
                        $('.fix').attr('disabled', 'disabled'); break;
                }
        });
        //cảnh báo khi xóa 1 bản ghi
        $(document).on('click', '.delete', this.showWarnBeforeDel.bind(this));
        //click nút CÓ trong cảnh báo xóa
        $(document).on('click', '.canhbaoxoa3', this.deleteCustomers.bind(this));
        //click nút KHÔNG trong cảnh báo xóa
        $(document).on('click', '.canhbaoxoa4', this.noDeleteCustomers.bind(this));
    }
    //hàm hiện cảnh báo xóa
    showWarnBeforeDel() {
        var selectedNum = $('.selected').length;
        if (selectedNum == 0);
        if (selectedNum == 1) {
            //lấy ra mã khách hàng và tên khách hàng và đưa vào ô cảnh báo
            //---lây
            $('.selected').attr('id', 'selectedRow');
            var row = $('#selectedRow');
            var makhachhang = row.data('MaKhachHang');
            var tenkhachhang = row.data('TenKhachHang');
            //---đưa vào ô cảnh báo
            $('.canhbaoxoa2').text('Bạn có chắc chắn muốn xóa khách hàng << ' + makhachhang + ' - ' + tenkhachhang + ' >> không ?');
            $('#canhbaoxoa').dialog({
                modal: true,
                height: 125,
                width: 400,
                title: "CUKCUK - Quản lý nhà hàng"
            });
        }
        if (selectedNum>1) {
            $('.canhbaoxoa2').text('Bạn có chắc chắn muốn xóa những Khách hàng đã chọn không ?');
            $('#canhbaoxoa').dialog({
                modal: true,
                height: 125,
                width: 400,
                title: "CUKCUK - Quản lý nhà hàng"
            });
        }        
    }
    //hàm xóa khách hàng
    deleteCustomers() {
            var me = this;
            var listID = [];
            var listRow = $('.selected');
            $.each(listRow, function (index, item) {
                var id = $(item).data('KhachHangID');
                listID.push(id);
            });
            $.ajax({
                method: 'DELETE',
                url: '/customers',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(listID),
                success: function (res) {
                    if (res.Success) {
                        me.loadData();
                        $('#canhbaoxoa').dialog('close');
                    } else
                        alert(res.Message);
                }
            });
    }
    //hàm không xóa khách hàng
    noDeleteCustomers() {
        $('#canhbaoxoa').dialog('close');
    }
    
   
}