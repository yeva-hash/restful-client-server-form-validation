import {$host} from './index';

export const createBicycle = async(bicycle) => {
    const {data} = await $host.post('admin/bicycle', bicycle)
    return data;
}

export const getBicycles = async(bicycle) => {
    const {data} = await $host.get('admin/bicycle', bicycle)
    return data;
}

export const updateStatus = async({ID, status}) => {
    const {data} = await $host.patch('admin/bicycle/' + ID, {status})
    return data;
}

export const deleteBicycle = async(ID) => {
    const {data} = await $host.delete('admin/bicycle/' + ID)
    return data;
}
