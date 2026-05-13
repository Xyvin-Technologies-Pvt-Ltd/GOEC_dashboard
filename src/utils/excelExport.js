import  * as FileSaver from 'file-saver';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';


const dataHeader = [{
   rfidTag:'',
   SerialNumber:'',
   expiry:''
}]

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8'
const fileExtention = '.xlsx'


export const exportRFIDSampleFile = async ()=>{
   const ws =XLSX.utils.json_to_sheet(dataHeader)
   const wb = {Sheets: {'data':ws},SheetNames: ['data']}
   const excelBuffer = XLSX.write(wb,{bookType:'xlsx',type:'array'})
   const data = new Blob([excelBuffer],{type:fileType})
   FileSaver.saveAs(data, `sampleRFIDList${fileExtention}`)
   toast.success("Downloaded")
}


export const exportExcelData = async (datas,fileName="ExcelData")=>{
   const ws =XLSX.utils.json_to_sheet(datas)
   const wb = {Sheets: {'data':ws},SheetNames: ['data']}
   const excelBuffer = XLSX.write(wb,{bookType:'xlsx',type:'array'})
   const data = new Blob([excelBuffer],{type:fileType})
   FileSaver.saveAs(data, `${fileName}${fileExtention}`)
   toast.success("Downloaded")
}
