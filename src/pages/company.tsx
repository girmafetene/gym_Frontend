import { useEffect, useState } from "react";
 
import { Company } from "../types/category";
import { apiService } from "../api/apiService";
 
const Companys = () => {
    
    const [CompanyList, setCompanyList] = useState<Company[]>([])

     
    const GetCompany = () => {
      apiService
        .getAll(
          `Company`
        )
        .then((response) => {
           const companyData: Company = response.data;
           setCompanyList(companyData as unknown as Company[]);
           //console.log(companyData);
        });
    };
  
     useEffect(() => {
      GetCompany();
    }, []);
     
  return (
   
    <div className="px-5">
      { CompanyList?.map(company => (
      <div className="lg:flex w-full py-1 space-x-2" key={company?.id}>
        <div  className="w-full">
        <a key={company?.id} href="#" className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  <div >
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       {company?.name} ({company?.displayName})
     </h5>
     <p className="font-normal text-gray-700 dark:text-gray-400">
       Industry: {company?.industry}
     </p>
     <p className="text-sm text-gray-500">
      Contact: {company?.contact1}, {company?.contact2}
    </p>
     <p className="text-sm text-gray-500">
       Location: {company?.location}
     </p>
     <p className="text-xs text-gray-400 mt-2">
       Created by {company?.createdBy} on {new Date(company?.createdAt).toLocaleDateString()}
     </p>
     <p className="text-xs text-green-600 mt-1">
       Status: {company?.isActive ? 'Active' : 'Inactive'}
     </p>
   </div>

    </a>
        </div>
        <div className="w-full">
        <a key={company?.id} href="#" className="block  w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  <div className="justify-center items-center">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       {company?.name} ({company?.displayName})
     </h5>
     <p className="font-normal text-gray-700 dark:text-gray-400">
       TIN: {company?.tin}
     </p>
     <p className="text-sm text-gray-500">
      Remark: {company?.remark},
    </p>
  
   </div>

    </a>
        </div>
      </div>
     
  ))}

    </div>
  )
}

export default Companys
