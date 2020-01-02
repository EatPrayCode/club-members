export interface IClubMember {
  id: number,
  firstName: string,
  lastName: string,
  address1?: string,
  address2?: string,
  city?: string,
  state?: string,
  zipCode?: string,
  phoneNumber?: string,
  memberSince?: string,
  favoriteActivity?: string
}