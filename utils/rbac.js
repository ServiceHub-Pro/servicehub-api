export const permissions = [
    {
        role: 'customer',
        actions: [
            'get_service',
            'get_allservices',
            'get_profile',
            'update_profile'
        ]
    },

    {
        role: 'provider',
        actions: [
            'count_services',
            'add_service',
            'update_service',
            'get_service',
            'get_allservices',
            'delete_service',
            'update_profile',
            'get_profile'

        ]
    }
]