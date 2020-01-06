interface Address {
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
  address?: Address;
  memberSince?: string;
  favoriteActivity?: string;
}


