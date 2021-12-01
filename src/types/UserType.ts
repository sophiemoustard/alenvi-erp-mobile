export interface UserType {
  _id: string,
  identity: { firstname: string, lastname: string },
  local: { email: string },
  picture?: { link: string },
  company?: { name: string },
  contact?: { phone: string, primaryAddress: { fullAddress: string, street: string, zipCode: string, city: string } },
  contracts: [{ _id: string, startDate: Date, endDate: Date }],
}
