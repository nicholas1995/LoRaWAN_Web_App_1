const ACL = {
    Iot_Network_Admin:
        {
            networks: {
                read: 'All',
                update: 'All',
                delete: 'All',
                create: 'All'
            },
            subnetworks: {
                read: 'All',
                update: 'All',
                delete: 'All',
                create: 'All'
            },
            end_devices: {
                read: 'All',
                update: 'All',
                delete: 'All',
                create: 'All'
            },
            gateways: {
                read: 'All',
                update: 'All',
                delete: 'All',
                create: 'All'
            },
            end_device_data: {
                read: 'All',
                export: 'All'
            },
        },
    Software_Admin:
        {
            users: {
                read: 'All',
                update: 'All',
                delete: 'All',
                create: 'All'
            },
            subnetworks: {
                read: 'All'
            },
            end_devices: {
                read: 'All'
            },
            gateways: {
                read: 'All'
            },
            end_device_data: {
                read: 'All',
                export: 'All'
            }
        },
    Analyst:
        {
            subnetworks: {
                read: 'All'
            },
            end_devices: {
                read: 'All'
            },
            gateways: {
                read: 'All'
            },
            end_device_data: {
                read: 'All',
                export: 'All'
            }
        },
    Fisher:
        {
            end_device_data: {
                read: 'Self'
            }
        }
    
};
module.exports = ACL;
