let a ='gfhjgfhjgh';
let b = 'dfgsd';

let new_devices = ['1','2','3'];
let current_devices = [{ email: 'test@test.tt', device_eui: '1' },
{ email: 'test@test.tt', device_eui: '2' },
    { email: 'test@test.tt', device_eui: '3' }];
async function compare_fisher_devices(new_devices, current_devices) {
    console.log(new_devices, current_devices);
    try {
        let accounted_for = [];
        let to_delete = [];

        for (let i = 0; i < new_devices.length; i++) {
            for (let j = 0; j < current_devices.length; j++) {
                if (new_devices[i] == current_devices[j].device_eui) {
                    //Device account for
                    accounted_for.push(new_devices[i]);
                }
                else {
                    //New device
                }
            }
        }
        console.log(accounted_for)
        for (let i = 0; i < accounted_for.length; i++) {
            for (let j = 0; j < current_devices.length; j++) {
                if (accounted_for[i] == current_devices[j].device_eui) {
                    console.log(accounted_for[i] , current_devices[j].device_eui);
                    let index = current_devices.device_eui.indexOf(1);
                    console.log(index);
                    to_delete.push(current_devices[j].device_eui);
                }
            }
        }
        console.log('to delete' + to_delete);
    } catch (err) {
        console.log(err);
    }
}

compare_fisher_devices(new_devices, current_devices);
console.log('hello');