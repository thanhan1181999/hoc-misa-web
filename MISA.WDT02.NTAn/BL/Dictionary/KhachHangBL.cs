using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
using DL;

namespace BL
{
    public class KhachHangBL
    {
        private MISAWDT02NTAnContext db = new MISAWDT02NTAnContext();
        private KhachHangDL _KhachHangDL = new KhachHangDL();
        //hàm lấy dữ liệu phân trang
        public IEnumerable<KhachHang> GetCustomersByPaging(int pageIndex,int pageSize)
        {
            var _customer = _KhachHangDL.GetCustomers();
            _customer = _customer.OrderBy(p => p.KhachHangID)
                .Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return _customer;
        }
        //Hàm thực hiện việc lấy dữ liệu khách hàng theo giá trị 1 trường
        public IEnumerable<KhachHang> FilterData(string field, string value)
        {
            switch (field)
            {
                case "MaKhachHang":
                    var x = db.KhachHangs.Where(p => p.MaKhachHang.Contains(value));return x;
                    break;
                case "TenKhachHang":
                    var y = db.KhachHangs.Where(p => p.TenKhachHang.Contains(value));return y;
                    break;
            }
            return null;
        }
    }
}
