import { filter } from 'lodash';

export const searchAndFilter = (array, filterValue) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    if (filterValue) {
        return filter(array, (ele) => {
            for (const key in ele) {
                if (typeof ele[key] == 'string') {
                    if (ele[key].toLowerCase().indexOf(filterValue.toLowerCase()) !== -1) {
                        return true
                    }
                }
            }
            return false
        });
    }
    return stabilizedThis.map((el) => el[0]);
}