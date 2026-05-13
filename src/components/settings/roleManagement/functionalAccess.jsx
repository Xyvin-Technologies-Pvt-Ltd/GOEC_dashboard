import { Controller } from "react-hook-form";

import { allPermissions } from "./role";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PinkSwitch } from "../../../ui/PinkSwitch";

const headers = ["Permissions", "View", "Modify"];

function FunctionalAccess({ control, datas, isUpdate }) {
  return (
    <div className="max-h-[300px] overflow-y-auto">
      <div className="overflow-x-auto rounded-lg bg-[#121212]">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {headers.map((header) => (
                <TableHead
                  key={header}
                  className="whitespace-nowrap text-[#b5b8c5] first-letter:uppercase"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {allPermissions.map((permission, index) => (
              <TableRow key={permission.id} className="border-[#333] even:bg-[#242424]">
                <TableCell className="text-[#b5b8c5]">
                  {permission.name}
                  <Controller
                    name={`functionalPermissions.${index}.functionName`}
                    control={control}
                    defaultValue={permission.id}
                    render={({ field }) => <input type="hidden" {...field} />}
                  />
                </TableCell>
                {permission.permissionArray.map((item) => (
                  <TableCell key={item.label} className="text-[#b5b8c5]">
                    <Controller
                      name={`functionalPermissions.${index}.${item.label}`}
                      control={control}
                      defaultValue={isUpdate ? datas.includes(item.value) : false}
                      render={({ field }) => (
                        <PinkSwitch
                          color="secondary"
                          {...field}
                          defaultChecked={isUpdate ? datas.includes(item.value) : false}
                        />
                      )}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default FunctionalAccess;
