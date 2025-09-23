import {type Child} from '@/types/Profile/Parents/types'
import ChildItem from '@/components/Profile/Home/Parents/ChildItem'

export default function ChildsList() {
    const children: Child[] = [
        {id: 1, name: 'Emma', age: 8, school: 'Skole A'},
        {id: 2, name: 'Lucas', age: 10, school: 'Skole B'}
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Børn</h2>
            {
                children.map((child) => (
                    <div key={child.id}>
                        <ChildItem child={child} />
                    </div>
                ))
            }
        </div>
    );
}