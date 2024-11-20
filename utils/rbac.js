export const permissions = [
    {
        role: 'user',
        actions: [
            'get_service',
            'get_allservices',
            'get_profile',
            'update_profile',
            'add_booking',
            'get_user_bookings'
        ]
    },

    {
        role: 'provider',
        actions: [
            'count_services',
            'add_service',
            'update_service',
            'get_oneservice',
            'get_allservices',
            'delete_service',
            'update_profile',
            'get_profile',
            'get_provider_bookings',
            'get_booking_count'

        ]
    }
]