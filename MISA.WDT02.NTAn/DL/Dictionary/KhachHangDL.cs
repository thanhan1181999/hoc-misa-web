using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;

namespace DL
{
    public class KhachHangDL
    {
        private MISAWDT02NTAnContext db = new MISAWDT02NTAnContext();
        //hàm lấy ra tất cả dữ liệu
        public IEnumerable<KhachHang> GetCustomers()
        {
            return db.KhachHangs;
        }

        //hàm cho ra số bản ghi trong database
        public int GetCustomersLength()
        {
            return db.KhachHangs.Count();
        }

        //Hàm thực hiện việc xóa dữ liệu phiếu thu
        public void DelMul(List<Guid> _ids)
        {
            foreach (var _id in _ids)
            {
                var _Item = db.KhachHangs.Where(p => p.KhachHangID == _id).FirstOrDefault();
                db.KhachHangs.Remove(_Item);
            }
            db.SaveChanges();
        }

        //hàm thêm dữ liệu
        public void Add(KhachHang _obj)
        {
            _obj.KhachHangID = Guid.NewGuid();
            db.KhachHangs.Add(_obj);
            db.SaveChanges();
        }

        //Hàm thực hiện lấy thông tin KH theo ID
        public KhachHang GetKhachHangID(Guid id)
        {
            var item = db.KhachHangs.Where(p => p.KhachHangID == id).FirstOrDefault();
            return item;
        }

        //Hàm thực hiện việc sửa dữ liệu khách hàng
        public void UpdateCustomer(KhachHang _kh)
        {
            
            var find = db.KhachHangs.Where(p => p.KhachHangID == _kh.KhachHangID).FirstOrDefault();
                find.MaKhachHang = _kh.MaKhachHang;
                find.TenKhachHang = _kh.TenKhachHang;
                find.NhomKhachHang = _kh.NhomKhachHang;
                find.SoDienThoai = _kh.SoDienThoai;
                find.NgaySinh = _kh.NgaySinh;
                find.TenCongTy = _kh.TenCongTy;
                find.MaSoThue = _kh.MaSoThue;
                find.Email = _kh.Email;
                find.DiaChi = _kh.DiaChi;
                find.GhiChu = _kh.GhiChu;
                db.SaveChanges();
        }

    }
}
