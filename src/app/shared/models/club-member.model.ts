interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

export interface IClubMember {
  id: number;
  firstName: string;
  lastName: string;
  address?: IAddress;
  memberSince?: string;
  favoriteActivity?: string;
}

