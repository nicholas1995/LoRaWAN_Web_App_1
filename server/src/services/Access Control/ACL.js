const ACL = {
  Iot_Network_Admin: {
    users: {
      read: "Self",
      update: "Self"
    },
    networks: {
      read: "All",
      update: "All",
      delete: "All",
      create: "All"
    },
    sub_networks: {
      read: "All",
      update: "All",
      delete: "All",
      create: "All"
    },
    vessels: {
      read: "All",
      update: "All",
      delete: "All",
      create: "All"
    },
    devices: {
      read: "All",
      update: "All",
      delete: "All",
      create: "All"
    },
    device: {
      read: "All"
    },
    gateways: {
      read: "All",
      update: "All",
      delete: "All",
      create: "All"
    },
    gateway_statistics: {
      read: "All"
    },
    device_data: {
      read: "All",
      export: "All"
    },
    service_profiles: {
      read: "All",
      update: "All",
      delete: "All",
      create: "All"
    },
    device_profiles: {
      read: "All",
      update: "All",
      delete: "All",
      create: "All"
    },
    network_servers: {
      read: "All"
    },
    gateway_profiles: {
      read: "All"
    },
    error_logs: {
      read: "All"
    }
  },
  Software_Admin: {
    users: {
      read: "All",
      update: "All",
      delete: "All",
      create: "All"
    },
    networks: {
      read: "All"
    },
    sub_networks: {
      read: "All"
    },
    vessels: {
      read: "All"
    },
    devices: {
      read: "All"
    },
    gateways: {
      read: "All"
    },
    device_data: {
      read: "All",
      export: "All"
    },
    gateway_statistics: {
      read: "All"
    },
    error_logs: {
      read: "All"
    }
  },
  Analyst: {
    users: {
      read: "Self",
      update: "Self"
    },
    networks: {
      read: "All"
    },
    sub_networks: {
      read: "All"
    },
    vessels: {
      read: "All"
    },
    devices: {
      read: "All"
    },
    gateways: {
      read: "All"
    },
    device_data: {
      read: "All",
      export: "All"
    },
    gateway_statistics: {
      read: "All"
    }
  },
  Fisher: {
    users: {
      read: "Self",
      update: "Self"
    },
    vessels: {
      read: "Self"
    },
    devices: {
      read: "Self"
    },
    device_data: {
      read: "Self",
      export: "Self"
    }
  }
};
module.exports = ACL;
