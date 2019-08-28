using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class TheThanhVien
    {
        public Guid TheThanhVienID;
        public Guid KhachHangID { get; set; }
        public string MaTheThanhVien { get; set; }
        public string HangThe { get; set; }
        public decimal SoTienNo { get; set; }
    }
}
