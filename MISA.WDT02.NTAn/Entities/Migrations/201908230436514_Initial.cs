namespace Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.KhachHangs",
                c => new
                    {
                        KhachHangID = c.Guid(nullable: false),
                        MaKhachHang = c.String(),
                        TenKhachHang = c.String(),
                        NhomKhachHang = c.String(),
                        SoDienThoai = c.Decimal(nullable: false, precision: 18, scale: 2),
                        NgaySinh = c.DateTime(nullable: false),
                        TenCongTy = c.String(),
                        MaSoThue = c.Decimal(nullable: false, precision: 18, scale: 2),
                        DiaChi = c.String(),
                        Email = c.String(),
                        GhiChu = c.String(),
                    })
                .PrimaryKey(t => t.KhachHangID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.KhachHangs");
        }
    }
}
