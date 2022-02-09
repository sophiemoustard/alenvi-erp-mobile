export type UserType = {
  _id: string,
  identity: { firstname: string, lastname: string },
  local: { email: string },
  picture?: { link: string },
  company?: { name: string },
  contact?: { phone: string, primaryAddress: { fullAddress: string, street: string, zipCode: string, city: string } },
  contracts?: [{ _id: string, startDate: string, endDate: string }],
}

export type AuxiliaryType = {
  _id: UserType['_id'],
  identity: UserType['identity'],
  picture?: UserType['picture'],
  contracts?: UserType['contracts'],
}

export type CustomerType = {
  _id: UserType['_id'],
  identity: { firstname: string, lastname: string, birthDate: string },
  followUp : { environment: string, objectives: string },
  contact: UserType['contact'],
}
