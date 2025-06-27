// Enhanced Properties Data with Multiple Images and Map Coordinates
const properties = [
    {
        id: 1,
        type: 'apartment',
        title: 'Двустаен апартамент в центъра',
        price: '€ 342,800',
        location: 'София, Център, ул. Витоша',
        area: '73 кв.м',
        floor: 'Етаж 2/6',
        rooms: '1 спалня',
        bathrooms: '1 баня',
        description: 'Светъл двустаен апартамент с отлична локация в сърцето на София.',
        badge: 'Спешно',
        featured: true,
        images: [
            'images/property_images/property1.png',
            'images/property_images/property2.png',
            'images/property_images/property3.png',
            'images/property_images/property4.png'
        ],
        coordinates: [42.6977, 23.3219] // Sofia Center
    },
    {
        id: 2,
        type: 'apartment',
        title: 'Тристаен апартамент',
        price: '€ 750/месец',
        location: 'София, Център, бул. Дондуков',
        area: '95 кв.м',
        floor: 'Етаж 2/4',
        rooms: '2 спални',
        bathrooms: '1 баня',
        description: 'Просторен тристаен апартамент в престижна сграда с лифт. Идеален за семейство или офис.',
        badge: 'Под наем',
        featured: true,
        images: [
            'images/property_images/property2.png',
            'images/property_images/property1.png',
            'images/property_images/property4.png',
            'images/property_images/property3.png'
        ],
        coordinates: [42.6964, 23.3264]
    },
    {
        id: 3,
        type: 'apartment',
        title: 'Двустаен в нова сграда',
        price: '€ 207,000',
        location: 'София, Красно село',
        area: '74 кв.м',
        floor: 'Етаж 2/6',
        rooms: '1 спалня',
        bathrooms: '1 баня',
        description: 'Нов двустаен апартамент в качествена сграда с паркинг и зелени площи. Отлична инвестиция.',
        badge: 'Ново',
        featured: true,
        images: [
            'images/property_images/property3.png',
            'images/property_images/property1.png',
            'images/property_images/property2.png',
            'images/property_images/property4.png'
        ],
        coordinates: [42.6506, 23.2819]
    },
    {
        id: 4,
        type: 'land',
        title: 'Парцел за строителство',
        price: '€ 89,899',
        location: 'гр. Костинброд, кв. Маслово',
        area: '2570 кв.м',
        floor: 'Регулиран',
        rooms: 'Ток/Вода',
        bathrooms: 'Асфалт',
        description: 'Голям регулиран парцел с отлична локация за жилищно строителство. Всички комуникации наблизо.',
        badge: 'Парцел',
        featured: true,
        images: [
            'images/property_images/property4.png',
            'images/property_images/property3.png',
            'images/property_images/property1.png'
        ],
        coordinates: [42.8167, 23.2167]
    },
    {
        id: 5,
        type: 'apartment',
        title: 'Тристаен в Студентски град',
        price: '1,400 лв./месец',
        location: 'София, Студентски град',
        area: '90 кв.м',
        floor: 'Етаж 2/6',
        rooms: '2 спални',
        bathrooms: '1 гараж',
        description: 'Обзаведен тристаен апартамент в близост до университетите. Включен гараж и мазе.',
        badge: 'Студентски',
        featured: true,
        images: [
            'images/property_images/property2.png',
            'images/property_images/property4.png',
            'images/property_images/property1.png',
            'images/property_images/property3.png'
        ],
        coordinates: [42.6553, 23.3397]
    },
    {
        id: 6,
        type: 'apartment',
        title: 'Двустаен в Обеля',
        price: '€ 129,800',
        location: 'София, Обеля 2',
        area: '68 кв.м',
        floor: 'Етаж 6/8',
        rooms: '1 спалня',
        bathrooms: '1 баня',
        description: 'Реновиран двустаен апартамент с панорамна гледка към планината. Добра транспортна свързаност.',
        badge: 'Панел',
        featured: true,
        images: [
            'images/property_images/property1.png',
            'images/property_images/property3.png',
            'images/property_images/property2.png'
        ],
        coordinates: [42.7289, 23.3094]
    },
    {
        id: 7,
        type: 'house',
        title: 'Еднофамилна къща',
        price: '€ 450,000',
        location: 'София, Бояна',
        area: '180 кв.м',
        floor: '2 етажа',
        rooms: '4 спални',
        bathrooms: '2 бани',
        description: 'Луксозна еднофамилна къща с двор и гараж. Тиха локация с отлична инфраструктура.',
        badge: 'Луксозна',
        featured: true,
        images: [
            'images/property_images/property4.png',
            'images/property_images/property1.png',
            'images/property_images/property2.png',
            'images/property_images/property3.png'
        ],
        coordinates: [42.6392, 23.2667]
    },
    {
        id: 8,
        type: 'commercial',
        title: 'Търговски обект',
        price: '€ 1,200/месец',
        location: 'София, Център',
        area: '120 кв.м',
        floor: 'Партер',
        rooms: 'Витрина',
        bathrooms: 'Складове',
        description: 'Търговски обект на централна улица с голяма витрина. Подходящ за различни дейности.',
        badge: 'Търговски',
        featured: true,
        images: [
            'images/property_images/property1.png',
            'images/property_images/property4.png',
            'images/property_images/property3.png'
        ],
        coordinates: [42.6950, 23.3253]
    },
    {
        id: 9,
        type: 'apartment',
        title: 'Четиристаен апартамент',
        price: '€ 520,000',
        location: 'София, Лозенец',
        area: '140 кв.м',
        floor: 'Етаж 5/6',
        rooms: '3 спални',
        bathrooms: '2 бани',
        description: 'Просторен четиристаен апартамент в престижен квартал. Високи тавани и качествена конструкция.',
        badge: 'Престижен',
        featured: true,
        images: [
            'images/property_images/property3.png',
            'images/property_images/property1.png',
            'images/property_images/property2.png',
            'images/property_images/property4.png'
        ],
        coordinates: [42.6722, 23.3308]
    },
    {
        id: 10,
        type: 'house',
        title: 'Вила с басейн',
        price: '€ 890,000',
        location: 'София, Драгалевци',
        area: '280 кв.м',
        floor: '3 етажа',
        rooms: '5 спални',
        bathrooms: '3 бани',
        description: 'Луксозна вила с басейн и панорамна гледка. Голям двор с ландшафтна градина.',
        badge: 'Вила',
        featured: true,
        images: [
            'images/property_images/property1.png',
            'images/property_images/property2.png',
            'images/property_images/property3.png',
            'images/property_images/property4.png'
        ],
        coordinates: [42.6167, 23.2583]
    },
    {
        id: 11,
        type: 'apartment',
        title: 'Едностаен в Младост',
        price: '€ 145,000',
        location: 'София, Младост 1',
        area: '45 кв.м',
        floor: 'Етаж 3/8',
        rooms: 'Студио',
        bathrooms: '1 баня',
        description: 'Компактен едностаен апартамент с модерен дизайн. Отлично за млади хора или инвестиция.',
        badge: 'Младежки',
        featured: true,
        images: [
            'images/property_images/property2.png',
            'images/property_images/property3.png',
            'images/property_images/property1.png'
        ],
        coordinates: [42.7031, 23.2369]
    },
    {
        id: 12,
        type: 'apartment',
        title: 'Тристаен с тераса',
        price: '€ 385,000',
        location: 'София, Витоша',
        area: '115 кв.м',
        floor: 'Етаж 7/8',
        rooms: '2 спални',
        bathrooms: '2 бани',
        description: 'Просторен апартамент с голяма тераса и гледка към Витоша. Паркомясто включено.',
        badge: 'Тераса',
        featured: true,
        images: [
            'images/property_images/property3.png',
            'images/property_images/property4.png',
            'images/property_images/property2.png',
            'images/property_images/property1.png'
        ],
        coordinates: [42.6722, 23.3308]
    },
    {
        id: 13,
        type: 'house',
        title: 'Двуетажна къща',
        price: '€ 275,000',
        location: 'гр. Ботевград',
        area: '150 кв.м',
        floor: '2 етажа',
        rooms: '3 спални',
        bathrooms: '2 бани',
        description: 'Нова двуетажна къща с голям двор. Идеална за семейство търсещо спокойствие.',
        badge: 'Извънградска',
        featured: true,
        images: [
            'images/property_images/property4.png',
            'images/property_images/property2.png',
            'images/property_images/property3.png'
        ],
        coordinates: [42.9167, 23.7833]
    },
    {
        id: 14,
        type: 'apartment',
        title: 'Мезонет в центъра',
        price: '€ 650,000',
        location: 'София, Център, ул. Граф Игнатиев',
        area: '165 кв.м',
        floor: 'Етаж 5-6/6',
        rooms: '3 спални',
        bathrooms: '2 бани',
        description: 'Уникален мезонет на два етажа с висококачествени материали и дизайнерски интериор.',
        badge: 'Мезонет',
        featured: true,
        images: [
            'images/property_images/property1.png',
            'images/property_images/property3.png',
            'images/property_images/property4.png',
            'images/property_images/property2.png'
        ],
        coordinates: [42.6964, 23.3219]
    },
    {
        id: 15,
        type: 'commercial',
        title: 'Офис сграда',
        price: '€ 1,850,000',
        location: 'София, Бизнес Парк',
        area: '850 кв.м',
        floor: '4 етажа',
        rooms: 'Офиси',
        bathrooms: 'Обзаведени',
        description: 'Модерна офис сграда с отлична локация. Напълно оборудвана и готова за ползване.',
        badge: 'Инвестиция',
        featured: true,
        images: [
            'images/property_images/property2.png',
            'images/property_images/property1.png',
            'images/property_images/property4.png'
        ],
        coordinates: [42.6508, 23.3833]
    },
    {
        id: 16,
        type: 'land',
        title: 'Парцел в планински район',
        price: '€ 45,000',
        location: 'Витоша, с. Железница',
        area: '1200 кв.м',
        floor: 'Неурбанизиран',
        rooms: 'Неурбанизиран',
        bathrooms: 'Планински',
        description: 'Парцел с красива гледка към Витоша, подходящ за почивна къща.',
        badge: 'Планински',
        featured: false,
        images: [
            'images/property_images/property4.png',
            'images/property_images/property3.png'
        ],
        coordinates: [42.5833, 23.1833]
    }
];

// For backward compatibility, also create mapProperties from the same data
const mapProperties = properties.map(property => ({
    id: property.id,
    type: property.type,
    title: property.title,
    price: property.price,
    location: property.location,
    area: property.area,
    rooms: property.rooms,
    coordinates: property.coordinates,
    description: property.description
}));