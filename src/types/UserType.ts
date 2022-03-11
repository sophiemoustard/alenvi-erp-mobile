export type UserType = {
  _id: string,
  identity: { firstname: string, lastname: string, birthDate?: string },
  local?: { email?: string },
  picture?: { link: string },
  company?: { name: string },
  contact?: { phone?: string, primaryAddress?: { fullAddress: string, street: string, zipCode: string, city: string } },
  contracts?: [{ _id: string, startDate: string, endDate: string }],
  followUp?: { environment?: string },
  administrative?: { transportInvoice?: { transportType?: string } },
}

export type AuxiliaryType = {
  _id: UserType['_id'],
  identity: UserType['identity'],
  contact? : UserType['contact'],
  picture?: UserType['picture'],
  contracts?: UserType['contracts'],
  administrative?: UserType['administrative'],
}

export type CustomerType = {
  _id: UserType['_id'],
  identity: UserType['identity'],
  followUp : { environment: string, objectives: string, misc: string },
  contact: UserType['contact'] & { accessCodes?: string },
  referentAuxiliary? : UserType,
  company : string,
}

export type FormattedUserType = UserType & { formattedIdentity: string }
