// Table data
export interface Table {
    id: string;
    title: string;
    description: string;
    timestamp: string;
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
