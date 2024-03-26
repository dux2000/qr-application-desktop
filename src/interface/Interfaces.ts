export interface CustomerDto {
    id: number; // Assuming ID is an integer, adjust if it's a different type
    fullName: string
    clothes: ClothesDto[];
    contacts: ContactDto[];
}

export interface ProductDto {
    id: string,
    name: string,
    description: string,
    status: StatusDto,
    created: string,
    updated: string,
    currentUser: UserReferenceDto,
    customer: {id: number},
    characteristics: CharacteristicDto[]
}

export interface CharacteristicDto {
    code: string,
    globalCode: string,
    value: string
}
export interface ClothesDto {
    id: number; // Assuming ID is an integer, adjust if it's a different type
    name: string;
    size: string;
    color: string;
    status: StatusDto;
}

export interface ContactDto {
    id: number; // Assuming ID is an integer, adjust if it's a different type
    type: string;
    contactInfo: string;
}

export interface StatusDto {
    code: string;
    description: string;
}

export interface UserDto {
    id: number;
    username: string;
    fullName: string;
    role: string
}

export interface UserReferenceDto {
    id: string,
    fullName: string,
    role: string
}
export interface UserInterface {
    id : number,
    username: string,
    fullName: string,
    error: string,
    isLoggedIn: boolean,
}

export interface SearchRequest {
    searchFilter: SearchFilter,
    page: number,
    size: number
}

export interface SearchFilter {
    searchCriteria: SearchCriteria[],
    logicalOperator: string,
    subFilters?: SearchFilter[]
}

export interface SearchCriteria {
    filterKey: string,
    value?: any,
    operation: string
}

export interface SearchResponse<T> {
    data: T[],
    total: number
}