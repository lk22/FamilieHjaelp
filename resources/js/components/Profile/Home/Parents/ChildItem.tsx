import React from 'react'

import {type Child} from '@/types/Profile/Parents/types'

export default function ChildItem({child}: {child: Child}) {
    return (
        <>
            <div className="border rounded-lg p-4 mb-4">
                <h3 className="text-xl font-bold mb-2">{child.name}</h3>
                <p className="text-gray-600">Alder: {child.age}</p>
                <p className="text-gray-600">Skole: {child.school}</p>
            </div>
        </>
    );
}