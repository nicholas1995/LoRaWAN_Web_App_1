const ACL = {
    Iot_Network_Admin:
        {
            users: {
                read: 'Self',
                update: 'Self',
            },
            networks: {
                read: 'All',
                update: 'All',
                delete: 'All',
                create: 'All'
            },
            sub_networks: {
                read: 'All',
                update: 'All',
                delete: 'All',
                create: 'All'
            },
            devices: {
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
            service_profiles: {
                read: 'All'
            },
            device_profiles: {
                read: 'All'
            }
        },
    Software_Admin:
        {
            users: {
                read: 'All',
                update: 'All',
                delete: 'All',
                create: 'All'
            }, 
            sub_networks: {
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
            users: {
                read: 'Self',
                update: 'Self',
            }, 
            sub_networks: {
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
            users: {
                read: 'Self',
                update: 'Self',
            }, 
            end_device_data: {
                read: 'Self'
            }
        }
    
};
module.exports = ACL;
