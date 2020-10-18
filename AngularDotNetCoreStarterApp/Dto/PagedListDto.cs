using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetCoreStarterApp.Dto
{
    public class PagedListDto<T>
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalElements { get; set; }
        public List<T> Items { get; set; }
    }
}
