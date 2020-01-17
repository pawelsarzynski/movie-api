export interface FromDtoMapper<Dto, Domain> {
  fromDtoToDomain(dto: Dto): Domain;
}

export interface FromDomainMapper<Dto, Domain> {
  fromDomainToDto(domain: Domain): Dto;
}

export interface Mapper<Dto, Domain>
  extends FromDtoMapper<Dto, Domain>,
    FromDomainMapper<Dto, Domain> {}
