using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class KhachHang
    {
        public Guid KhachHangID { get; set; }
        public string MaKhachHang { get; set; }
        public string TenKhachHang { get; set; }
        public string NhomKhachHang { get; set; }
        public decimal SoDienThoai { get; set; }
        public DateTime NgaySinh { get; set; }
        public string TenCongTy { get; set; }
        public decimal MaSoThue { get; set; }
        public string DiaChi { get; set; }
        public string Email { get; set; }
        public string GhiChu { get; set; }

    }
}
