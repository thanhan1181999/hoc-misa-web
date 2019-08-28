using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Entities;
using MISA.WDT02.NTAn;
using BL;
using DL;
using MISA.WDT02.NTAn.Properties;
using System.Threading.Tasks;

namespace MISA.WDT02.NTAn
{
    public class KhachHangsController : ApiController
    {
        private MISAWDT02NTAnContext db = new MISAWDT02NTAnContext();
        private KhachHangBL _KhachHangBL = new KhachHangBL();
        private KhachHangDL _KhachHangDL = new KhachHangDL();

        /// lấy dữ liệu đã phân trang
        [Route("customers/{pageIndex}/{pageSize}")]
        [HttpGet]
        public async Task<AjaxResult> GetCustomersByPaging([FromUri]int pageIndex, int pageSize)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult.Data = _KhachHangBL.GetCustomersByPaging(pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.getError;
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }

        /// lấy độ dài của bảng dữ liệu
        [Route("customers/length")]
        [HttpGet]
        public int GetCustomersLength()
        {
            return _KhachHangDL.GetCustomersLength();
        }

        /// xóa 1 hoặc nhiều khách hàng
        [Route("customers")]
        [HttpDelete]
        public AjaxResult deleteCustomers([FromBody]List<Guid> _refids)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _KhachHangDL.DelMul(_refids);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.getError;
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }


        //lấy thông tin 1 khách hàng qua id
        [Route("customers/{id}")]
        [HttpGet]
        public AjaxResult getCustomersById([FromUri]Guid id)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult.Data = _KhachHangDL.GetKhachHangID(id);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.getError;
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }

        //them khách hàng
        [Route("customers")]
        [HttpPost]
        public AjaxResult addCustomers([FromBody]KhachHang _obj)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _KhachHangDL.Add(_obj);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.addError;
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }

        //Sửa khách hàng
        [Route("customers")]
        [HttpPut]
        public AjaxResult putCustomer([FromBody]KhachHang kh)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _KhachHangDL.UpdateCustomer(kh);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.putError;
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }

        /// lấy dữ liệu đã phân trang
        [Route("customers/search/{field}/{value}")]
        [HttpGet]
        public async Task<AjaxResult> search([FromUri]string field, string value)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult.Data = _KhachHangBL.FilterData(field,value);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.getError;
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }
    }
}