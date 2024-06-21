export interface CustomerDto {
    id: number; // Assuming ID is an integer, adjust if it's a different type
    fullName: string
    clothes: ClothesDto[];
    contacts: ContactDto[];
}

export interface CustomerReferenceDto {
    id: number,
    fullName: string
}
export interface ProductCommand {
    name: string,
    description: string,
    status?: string,
    type: string,
    currentUserId?: number,
    customerId: number,
    characteristics: CharacteristicDto[]
}
export interface ProductDto {
    id: string,
    name: string,
    description: string,
    status: StatusDto,
    type: ProductTypeDto,
    created: string,
    createdBy: UserReferenceDto,
    updated: string,
    updatedBy: UserReferenceDto,
    currentUser: UserReferenceDto,
    customer: CustomerReferenceDto,
    characteristics: CharacteristicDto[]
}

export interface ProductTypeDto {
    code: string,
    name: string
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
    name: string;
}

export interface UserDto {
    id: number;
    username: string;
    fullName: string;
    types: UserTypeDto[],
    update: boolean
}

export interface UserTypeDto {
    code: string,
    name: string

}
export interface UserReferenceDto {
    id: string,
    fullName: string,
}
export interface UserInterface {
    id : number,
    username: string,
    fullName: string,
    error?: string,
    isLoggedIn?: boolean,
    update: boolean,
    types?: UserTypeDto[],
    password?: string
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
