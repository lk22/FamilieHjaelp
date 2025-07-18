

import { useState, useEffect } from 'react';

export default function useStorageQuery() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch or compute data here
    }, []);

    return data;
}
        